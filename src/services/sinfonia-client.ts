import OsmosisClient from './osmosis-client'
import ConfigClient from './config-client'
import BitsongClient from './bitsong-client'
import { AssetListConfig, ChainData, IncentivizedPool, OsmosisPool } from '@/types'
import { AxiosResponse } from 'axios'
import { Coin } from '@cosmjs/proto-signing'
import { mapTokensWithDefaults, tokenWithDefaults } from '@/common'
import ChainClient from './chain-client'

export default class SinfoniaClient {
  private assetListsConfig?: AssetListConfig
	private osmosisClient?: OsmosisClient
	private bitsongClient?: BitsongClient
	private configClient: ConfigClient

  public constructor(configUrl: string) {
    this.configClient = new ConfigClient(configUrl)
  }

  public totalBurnedFantokens = async () => {
    try {
      if (this.bitsongClient) {
        const response = await this.bitsongClient.totalBurnedFantokens()

        return response.data.burned_coins
      }
    } catch (error) {
      console.error(error)
      throw error
    }

    return []
  }

  public totalMintedFantokens = async (): Promise<Coin[]> => {
    try {
      if (this.bitsongClient && this.assetListsConfig) {
        const requests: Promise<AxiosResponse<ChainData<'amount', Coin>>>[] = []

        for (const fantokenDenom of this.allowedFantokenDenom) {
          requests.push(this.bitsongClient.supplyByDenom(fantokenDenom))
        }

        const supplyResponses = await Promise.all(requests)

        return supplyResponses.map(el => el.data.amount)
      }
    } catch (error) {
      console.error(error)
      throw error
    }

    return []
  }

  public incentivizedPools = async () => {
    try {
      if (this.osmosisClient && this.assetListsConfig) {
        const response = await this.osmosisClient.incentivizedPools()

        return response.data.incentivized_pools.filter(
          pool => this.allowedPoolIDs.includes(pool.pool_id)
        )
      }
    } catch (error) {
      console.error(error)
      throw error
    }

    return []
  }

	public pools = async (): Promise<OsmosisPool[]> => {
    try {
      if (this.osmosisClient && this.assetListsConfig) {
        const requests: Promise<AxiosResponse<ChainData<"pool", OsmosisPool>>>[] = []

        for (const pool of this.assetListsConfig.pools) {
          requests.push(this.osmosisClient.poolDetails(pool.id))
        }

        const poolResponses = await Promise.all(requests)

        return poolResponses.map(el => el.data.pool)
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
        bitsongToken: tokenWithDefaults(response.data.bitsongToken),
        osmosisToken: tokenWithDefaults(response.data.osmosisToken),
        tokens: mapTokensWithDefaults(response.data.tokens),
        fantokens: mapTokensWithDefaults(response.data.fantokens).map(fantoken => ({
          ...response.data.bitsongToken,
          ...fantoken
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

  public balance = async (address: string, url: string) => {
    try {
      const chainClient = new ChainClient(url)
      const response = await chainClient.bankBalances(address)

      return response.data.balances
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  public balances = async (bitsongAddress: string, osmosisAddress: string) => {
    try {
      if (this.bitsongClient && this.osmosisClient && this.assetListsConfig) {
        const [bitsongResponse, osmosisResponse, lockedCoinsResponse, lockedLongerDurationResponse] = await Promise.all([
          this.bitsongClient.bankBalances(bitsongAddress),
          this.osmosisClient.bankBalances(osmosisAddress),
          this.osmosisClient.accountLockedCoins(osmosisAddress),
          this.osmosisClient.accountLockedLongerDuration(osmosisAddress)
        ])

        return {
          osmosisBalance: osmosisResponse.data.balances,
          bitsongBalance: bitsongResponse.data.balances.filter(
            el => !this.allowedFantokenDenom.includes(el.denom)
          ),
          fantokensBalance: bitsongResponse.data.balances.filter(
            el => this.allowedFantokenDenom.includes(el.denom)
          ),
          lockedCoinsBalance: lockedCoinsResponse.data.coins,
          lockedLongerDuration: lockedLongerDurationResponse.data.locks
        }
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  get allowedIbcDenomOsmosis() {
    const assetListsConfig = this.assetListsConfig

    if (assetListsConfig) {
      const denoms: string[] = []

      denoms.push(assetListsConfig.bitsongToken.ibc.osmosis.destDenom)

      const coinLookup = assetListsConfig.osmosisToken.coinLookup.find(
        (coin) => coin.viewDenom === assetListsConfig.osmosisToken.symbol
      )

      if (coinLookup) {
        denoms.push(coinLookup.viewDenom)
      }

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

  get allowedPoolIDs() {
    const assetListsConfig = this.assetListsConfig

    if (assetListsConfig) {
      return assetListsConfig.pools.map(el => el.id)
    }

    return []
  }
}
