import OsmosisClient from './osmosis-client';
import ConfigClient from './config-client';
import { AssetListConfig } from '@/types';
import BitsongClient from './bitsong-client';

export default class SinfoniaClient {
  private assetListsConfig?: AssetListConfig
	private osmosisClient?: OsmosisClient
	private bitsongClient?: BitsongClient
	private configClient: ConfigClient

  public constructor(configUrl: string) {
    this.configClient = new ConfigClient(configUrl)
  }

	public pools = async () => {
    try {
      if (this.osmosisClient) {
        const response = await this.osmosisClient.pools({ 'pagination.limit': '750' })

        return response.data.pools
      }
    } catch (error) {
      console.error(error)
      throw error
    }

    return []
  }

	public assetLists = async () => {
    try {
      const response = await this.configClient.assetLists()

      this.assetListsConfig = {
        ...response.data,
        fantokens: response.data.fantokens.map(fantoken => ({
          ...response.data.bitsongToken,
          ...fantoken,
        }))
      }

      this.osmosisClient = new OsmosisClient(this.assetListsConfig.osmosisToken.apiURL)
      this.bitsongClient = new BitsongClient(this.assetListsConfig.bitsongToken.apiURL)

      return this.assetListsConfig
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  public balances = async (bitsongAddress: string, osmosisAddress: string) => {
    try {
      if (this.bitsongClient && this.osmosisClient) {
        const [bitsongResponse, osmosisResponse] = await Promise.all([
          this.bitsongClient.bankBalances(bitsongAddress),
          this.osmosisClient.bankBalances(osmosisAddress)
        ])

        return [
          ...bitsongResponse.data.balances,
          ...osmosisResponse.data.balances
        ]
      }
    } catch (error) {
      console.error(error)
      throw error
    }

    return []
  }

  get allowedIbcDenomOsmosis() {
    const assetListsConfig = this.assetListsConfig

    if (assetListsConfig) {
      const denoms: string[] = []

      denoms.push(assetListsConfig.bitsongToken.ibc.osmosis.destDenom)
      denoms.push(assetListsConfig.osmosisToken.ibc.osmosis.destDenom)

      for (const token of assetListsConfig.tokens) {
        denoms.push(token.ibc.osmosis.destDenom)
      }

      for (const fantoken of assetListsConfig.fantokens) {
        denoms.push(fantoken.ibc.osmosis.destDenom)
      }

      return denoms
    }

    return []
  }

  get allowedFantokenDenom() {
    const assetListsConfig = this.assetListsConfig

    if (assetListsConfig) {
      const denoms: string[] = []

      for (const fantoken of assetListsConfig.fantokens) {
        const coinLookup = fantoken.coinLookup.find(
          (coin) => coin.viewDenom === fantoken.symbol
        );

        if (coinLookup && coinLookup.fantokenDenom) {
          denoms.push(coinLookup.fantokenDenom)
        }
      }

      return denoms
    }

    return []
  }
}
