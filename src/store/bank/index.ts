import { Coin } from "@cosmjs/proto-signing"
import { sinfoniaClient } from "@/services"
import { acceptHMRUpdate, defineStore } from "pinia"
import useAuth from "@/store/auth"
import useConfig from "@/store/config"
import { ChainBalance, OsmosisLock, Token, TokenBalance } from "@/types"
import { reduce } from "lodash"
import { toViewDenom } from "@/common/numbers"
import { BigNumber } from "bignumber.js"

export interface BankState {
	loading: boolean
	otherBalance: Coin[]
	osmosisBalance: Coin[]
	bitsongBalance: Coin[]
	fantokensBalance: Coin[]
	lockedCoinsBalance: Coin[]
	totalMintedFantokens: Coin[]
	totalBurnedFantokens: Coin[]
	lockedLongerDuration: OsmosisLock[]
}

const useBank = defineStore("bank", {
	state: (): BankState => ({
		loading: false,
		otherBalance: [],
		osmosisBalance: [],
		bitsongBalance: [],
		fantokensBalance: [],
		lockedCoinsBalance: [],
		totalMintedFantokens: [],
		totalBurnedFantokens: [],
		lockedLongerDuration: [],
	}),
	actions: {
		async init() {
			try {
				this.loading = true

				this.totalMintedFantokens = await sinfoniaClient.totalMintedFantokens()
				this.totalBurnedFantokens = await sinfoniaClient.totalBurnedFantokens()
			} catch (error) {
				console.error(error)
				throw error
			} finally {
				this.loading = false
			}
		},
		async loadBalance(address: string, chainID: string) {
			try {
				const configStore = useConfig()
				const token = configStore.allTokens.find((el) => el.chainID === chainID)
				this.loading = true

				if (token) {
					this.otherBalance = await sinfoniaClient.balance(address, token.apiURL)
				}
			} catch (error) {
				console.error(error)
				throw error
			} finally {
				this.loading = false
			}
		},
		async loadBalances() {
			try {
				const authStore = useAuth()
				const bitsongAddress = authStore.bitsongAddress
				const osmosisAddress = authStore.osmosisAddress
				this.loading = true

				if (bitsongAddress && osmosisAddress) {
					const data = await sinfoniaClient.balances(bitsongAddress, osmosisAddress)

					if (data) {
						this.osmosisBalance = data.osmosisBalance
						this.bitsongBalance = data.bitsongBalance
						this.fantokensBalance = data.fantokensBalance
						this.lockedCoinsBalance = data.lockedCoinsBalance
						this.lockedLongerDuration = data.lockedLongerDuration
					}
				}
			} catch (error) {
				console.error(error)
				throw error
			} finally {
				this.loading = false
			}
		},
	},
	getters: {
		balances(): TokenBalance[] {
			const configStore = useConfig()

			return configStore.allTokens.map((token) => {
				const price = new BigNumber(token.price ?? "0")
				let osmosisChain: ChainBalance | undefined = undefined
				let bitsongChain: ChainBalance | undefined = undefined
				const chains: ChainBalance[] = []

				const coinLookup = token.coinLookup.find(
					(coin) => coin.viewDenom === token.symbol
				)

				if (coinLookup) {
					const osmosisBalance = this.osmosisBalance.find((coin) => {
						if (token.ibcEnabled) {
							return coin.denom === token.ibc.osmosis.destDenom
						}

						return coin.denom === coinLookup.chainDenom
					})

					const bitsongBalance = this.bitsongBalance.find(
						(coin) => coin.denom === coinLookup.chainDenom
					)

					if (osmosisBalance && configStore.osmosisToken) {
						const osmosisAvailable = toViewDenom(
							osmosisBalance.amount,
							coinLookup.chainToViewConversionFactor
						)
						const osmosisTotal = new BigNumber(osmosisAvailable)

						osmosisChain = {
							name: configStore.osmosisToken.name,
							symbol: configStore.osmosisToken.symbol,
							denom: token.ibcEnabled
								? token.ibc.osmosis.sourceDenom
								: coinLookup.chainDenom,
							logos: configStore.osmosisToken.logos,
							total: osmosisTotal.toString(),
							available: osmosisAvailable.toString(),
							totalFiat: price.multipliedBy(osmosisTotal.toString()).toString(),
							availableFiat: price
								.multipliedBy(osmosisAvailable.toString())
								.toString(),
						}

						chains.push(osmosisChain)
					}

					if (bitsongBalance) {
						const bitsongAvailable = toViewDenom(
							bitsongBalance.amount,
							coinLookup.chainToViewConversionFactor
						)
						const bitsongTotal = new BigNumber(bitsongAvailable)

						bitsongChain = {
							name: token.name,
							symbol: token.symbol,
							denom: token.ibc.osmosis.sourceDenom,
							logos: token.logos,
							total: bitsongTotal.toString(),
							available: bitsongAvailable.toString(),
							totalFiat: price.multipliedBy(bitsongTotal.toString()).toString(),
							availableFiat: price
								.multipliedBy(bitsongAvailable.toString())
								.toString(),
						}

						chains.push(bitsongChain)
					}
				}

				const available = reduce<ChainBalance, BigNumber>(
					chains,
					(all, balance) => {
						return all.plus(balance.available ?? "0")
					},
					new BigNumber("0")
				).toString()

				const total = new BigNumber(available).toString()

				return {
					...token,
					total,
					available,
					totalFiat: price.multipliedBy(total).toString(),
					availableFiat: price.multipliedBy(available).toString(),
					chains,
				}
			})
		},
		total() {
			const balances = this.balances as TokenBalance[]

			return reduce<TokenBalance, BigNumber>(
				balances,
				(all, balance) => {
					return all.plus(balance.totalFiat ?? "0")
				},
				new BigNumber("0")
			).toString()
		},
		available() {
			const balances = this.balances as TokenBalance[]

			return reduce<TokenBalance, BigNumber>(
				balances,
				(all, balance) => {
					return all.plus(balance.availableFiat ?? "0")
				},
				new BigNumber("0")
			).toString()
		},
		allGamms({ osmosisBalance, lockedCoinsBalance }) {
			return [...osmosisBalance, ...lockedCoinsBalance]
		},
		allBalances({ bitsongBalance, osmosisBalance, otherBalance }) {
			return [...bitsongBalance, ...osmosisBalance, ...otherBalance]
		},
		lockedLongerByPoolIdAndDuration({ lockedLongerDuration }) {
			return (poolID: string, duration: string): OsmosisLock[] =>
				lockedLongerDuration.filter(
					(lockedLonger) =>
						lockedLonger.coins.filter((coin) => coin.denom === `gamm/pool/${poolID}`)
							.length > 0 && lockedLonger.duration === duration
				)
		},
		allSwappableBalances(): TokenBalance[] {
			const configStore = useConfig()

			if (configStore.assetsConfig) {
				const allowedDenoms = Object.keys(configStore.assetsConfig.routes)

				return this.balances
					.map((token) => {
						let routeDenom = ""

						if (!token.ibcEnabled) {
							const coinLookup = token.coinLookup.find(
								(coin) => coin.viewDenom === token.symbol
							)

							if (coinLookup) {
								routeDenom = coinLookup.chainDenom
							}
						} else {
							routeDenom = token.ibc.osmosis.destDenom
						}

						return {
							...token,
							routeDenom,
						}
					})
					.filter((token) => {
						return allowedDenoms.includes(token.routeDenom)
					})
			}

			return []
		},
		swappableBalancesByRouteDenom() {
			const configStore = useConfig()

			return (from: Token): TokenBalance[] => {
				const coinLookupFrom = from.coinLookup.find(
					(coin) => coin.viewDenom === from.symbol
				)

				const fromDenom = from.ibcEnabled
					? from.ibc.osmosis.destDenom
					: coinLookupFrom?.chainDenom

				if (fromDenom && configStore.assetsConfig) {
					const fromDictionary = configStore.assetsConfig.routes[fromDenom]

					if (fromDictionary) {
						const routeDenoms = Object.keys(fromDictionary)

						return this.allSwappableBalances.filter((balance) =>
							routeDenoms.includes(balance.routeDenom ?? "")
						)
					}
				}

				return []
			}
		},
		balanceBySymbol() {
			return (symbol: string) =>
				this.balances.find((balance) => balance.symbol === symbol)
		},
		osmosisAvailableBalances() {
			return (denoms: string[]) =>
				this.balances.filter((balance) => {
					if (balance.ibcEnabled) {
						return denoms.includes(balance.ibc.osmosis.sourceDenom)
					}

					const coinLookup = balance.coinLookup.find(
						(coin) => coin.viewDenom === balance.symbol
					)

					if (coinLookup) {
						return denoms.includes(coinLookup.chainDenom)
					}

					return false
				})
		},
	},
	persistedState: {
		persist: false,
	},
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useBank, import.meta.hot))
}

export default useBank
