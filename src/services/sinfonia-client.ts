import OsmosisClient from "./osmosis-client"
import ConfigClient from "./config-client"
import BitsongClient from "./bitsong-client"
import {
	AssetListConfig,
	BitsongMerkledrop,
	ChainData,
	ContractWithDetails,
	NftTokenInfo,
	OsmosisPool,
} from "@/types"
import { AxiosResponse } from "axios"
import { Coin } from "@cosmjs/proto-signing"
import { mapTokensWithDefaults, tokenWithDefaults } from "@/common"
import ChainClient from "./chain-client"
import { compact } from "lodash"
import {
	TokensResponse,
	NftInfoResponse,
} from "@bitsongjs/contracts/dist/codegen/BS721Base.types"

export default class SinfoniaClient {
	private assetListsConfig?: AssetListConfig
	private osmosisClient?: OsmosisClient
	private bitsongClient?: BitsongClient
	private configClient: ConfigClient

	public constructor(configUrl: string) {
		this.configClient = new ConfigClient(configUrl)
	}

	public contractInfo = async (address: string) => {
		try {
			const bitsongClient = this.bitsongClient

			if (bitsongClient) {
				const response = await bitsongClient.contractInfo(address)

				return response.data
			}
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	public contractHistory = async <T = any>(address: string) => {
		try {
			const bitsongClient = this.bitsongClient

			if (bitsongClient) {
				const response = await bitsongClient.contractHistory<T>(address)

				return {
					...response.data,
					address,
				}
			}
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	public contractWithDetails = async <T = any>(address: string) => {
		try {
			const bitsongClient = this.bitsongClient

			if (bitsongClient) {
				const detailsResponse = await this.contractInfo(address)
				const historyResponse = await this.contractHistory<T>(address)

				if (!detailsResponse) {
					return undefined
				}

				return {
					...detailsResponse.result,
					history: historyResponse,
				}
			}
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	public contractsWithDetails = async <T = any>(
		codeId: number
	): Promise<ContractWithDetails<T>[] | undefined> => {
		try {
			const bitsongClient = this.bitsongClient

			if (bitsongClient) {
				const response = await bitsongClient.contracts(codeId)
				const contracts = response.data.result ? response.data.result : []

				const responses = compact(
					await Promise.all(
						contracts.map((address) => this.contractWithDetails<T>(address))
					)
				)

				return responses
			}
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	public contracts = async (codeId: number) => {
		try {
			if (this.bitsongClient) {
				const response = await this.bitsongClient.contracts(codeId)

				return response.data
			}
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	public nftInfo = async (address: string, tokenId: string) => {
		try {
			if (this.bitsongClient) {
				const response =
					await this.bitsongClient.contractSmartQuery<NftInfoResponse>(address, {
						nft_info: {
							token_id: tokenId,
						},
					})

				return {
					...response.data.data,
					token_id: tokenId,
				}
			}
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	public nfts = async (address: string): Promise<NftTokenInfo[] | undefined> => {
		try {
			if (this.bitsongClient) {
				const allTokensResponse =
					await this.bitsongClient.contractSmartQuery<TokensResponse>(address, {
						all_tokens: {},
					})

				console.log(allTokensResponse.data)

				const nftsInfoRequests = allTokensResponse.data.data.tokens.map((tokenId) =>
					this.nftInfo(address, tokenId)
				)

				console.log(nftsInfoRequests)

				const nftsInfoResponses = compact(await Promise.all(nftsInfoRequests))

				return nftsInfoResponses
			}
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	public bitsongBlocks = async (block?: string) => {
		try {
			if (this.bitsongClient) {
				const response = await this.bitsongClient.blocks(block)

				return response.data
			}
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	public merkledropClaimed = async (
		id: number,
		index: number
	): Promise<boolean> => {
		try {
			if (this.bitsongClient) {
				const response = await this.bitsongClient.merkledropClaimed(id, index)

				return response.data.is_claimed
			}
		} catch (error) {
			console.error(error)
			throw error
		}

		return true
	}

	public merkledrops = async (ids: number[]): Promise<BitsongMerkledrop[]> => {
		try {
			if (this.bitsongClient) {
				const requests: Promise<
					AxiosResponse<ChainData<"merkledrop", BitsongMerkledrop>>
				>[] = []

				for (const id of ids) {
					requests.push(this.bitsongClient.merkledrop(id))
				}

				const merkledropsResponse = await Promise.all(requests)

				return merkledropsResponse.map((el) => el.data.merkledrop)
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
				const requests: Promise<AxiosResponse<ChainData<"amount", Coin>>>[] = []

				for (const fantokenDenom of this.allowedFantokenDenom) {
					requests.push(this.bitsongClient.supplyByDenom(fantokenDenom))
				}

				const supplyResponses = await Promise.all(requests)

				return supplyResponses.map((el) => el.data.amount)
			}
		} catch (error) {
			console.error(error)
			throw error
		}

		return []
	}

	public lockableDurations = async () => {
		try {
			if (this.osmosisClient) {
				const response = await this.osmosisClient.lockableDurations()

				return response.data.lockable_durations
			}
		} catch (error) {
			console.error(error)
			throw error
		}

		return []
	}

	public epochProvisions = async () => {
		try {
			if (this.osmosisClient) {
				const response = await this.osmosisClient.epochProvisions()

				return response.data.epoch_provisions
			}
		} catch (error) {
			console.error(error)
			throw error
		}

		return "0"
	}

	public poolIncentivesDistrInfo = async () => {
		try {
			if (this.osmosisClient) {
				const response = await this.osmosisClient.poolIncentivesDistrInfo()

				return response.data.distr_info
			}
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	public epochs = async () => {
		try {
			if (this.osmosisClient) {
				const response = await this.osmosisClient.epochs()

				return response.data.epochs
			}
		} catch (error) {
			console.error(error)
			throw error
		}

		return []
	}

	public mintParams = async () => {
		try {
			if (this.osmosisClient) {
				const response = await this.osmosisClient.mintParams()

				return response.data.params
			}
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	public incentivizedPools = async () => {
		try {
			if (this.osmosisClient && this.assetListsConfig) {
				const response = await this.osmosisClient.incentivizedPools()

				return response.data.incentivized_pools.filter((pool) =>
					this.allowedPoolIDs.includes(pool.pool_id)
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
				const requests: Promise<AxiosResponse<ChainData<"pool", OsmosisPool>>>[] =
					[]

				for (const pool of this.assetListsConfig.pools) {
					requests.push(this.osmosisClient.poolDetails(pool.id))
				}

				const poolResponses = await Promise.all(requests)

				return poolResponses.map((el) => el.data.pool)
			}
		} catch (error) {
			console.error(error)
			throw error
		}

		return []
	}

	public extraGauges = async () => {
		try {
			const response = await this.configClient.extraGauges()

			return response.data
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	public extraGaugesDetails = async (ids: string[]) => {
		try {
			if (this.osmosisClient) {
				const gaugeRequests = ids.map((id) => this.osmosisClient?.gaugeById(id))
				const responses = await Promise.all(gaugeRequests)

				return compact(responses.map((response) => response?.data.gauge))
			}
		} catch (error) {
			console.error(error)
			throw error
		}

		return []
	}

	public lockedGaugesByIds = async (ids: string[]) => {
		try {
			if (this.osmosisClient) {
				const lockedGaugeRequests = ids.map((id) =>
					this.osmosisClient?.lockedByGaugeId(id)
				)
				const responses = await Promise.all(lockedGaugeRequests)

				return compact(responses)
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
				fantokens: mapTokensWithDefaults(response.data.fantokens).map(
					(fantoken) => ({
						...response.data.bitsongToken,
						...fantoken,
					})
				),
			}

			this.osmosisClient = new OsmosisClient(
				this.assetListsConfig.osmosisToken.apiURL
			)
			this.bitsongClient = new BitsongClient(
				this.assetListsConfig.bitsongToken.apiURL
			)

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
				const [
					bitsongResponse,
					osmosisResponse,
					lockedCoinsResponse,
					lockedLongerDurationResponse,
				] = await Promise.all([
					this.bitsongClient.bankBalances(bitsongAddress),
					this.osmosisClient.bankBalances(osmosisAddress),
					this.osmosisClient.accountLockedCoins(osmosisAddress),
					this.osmosisClient.accountLockedLongerDuration(osmosisAddress),
				])

				return {
					osmosisBalance: osmosisResponse.data.balances,
					bitsongBalance: bitsongResponse.data.balances.filter((el) =>
						this.allowedFantokenDenom.includes(el.denom)
					),
					fantokensBalance: bitsongResponse.data.balances.filter((el) =>
						this.allowedFantokenDenom.includes(el.denom)
					),
					lockedCoinsBalance: lockedCoinsResponse.data.coins,
					lockedLongerDuration: lockedLongerDurationResponse.data.locks,
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

			const bitsongLookup = assetListsConfig.bitsongToken.coinLookup.find(
				(coin) => coin.viewDenom === assetListsConfig.bitsongToken.symbol
			)

			if (bitsongLookup) {
				denoms.push(bitsongLookup.chainDenom)
			}

			for (const fantoken of assetListsConfig.fantokens) {
				const coinLookup = fantoken.coinLookup.find(
					(coin) => coin.viewDenom === fantoken.symbol
				)

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
			return assetListsConfig.pools.map((el) => el.id)
		}

		return []
	}
}
