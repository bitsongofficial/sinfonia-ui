import useBank from "@/store/bank"
import usePools from "@/store/pools"
import useConfig from "@/store/config"
import useAuth from "@/store/auth"
import { amountIBCFromCoin, amountFromCoin } from "@/common/numbers"
import { TransactionManager } from "@/signing/transaction-manager"
import {
	LockableDurationWithApr,
	OsmosisRoute,
	SwapPool,
	SwapRoute,
	Token,
	Transaction,
	TransactionStatus,
} from "@/types"
import { Coin } from "@cosmjs/proto-signing"
import { acceptHMRUpdate, defineStore } from "pinia"
import { DeliverTxResponse } from "@cosmjs/stargate"
import { notifyError, notifySuccess } from "@/common"
import ChainClient from "@/services/chain-client"

export interface TransactionManagerState {
	loading: boolean
	transactions: Transaction[]
}

const pollingTime = 5000
let subscription: NodeJS.Timeout

const useTransactionManager = defineStore("transactionManager", {
	state: (): TransactionManagerState => ({
		loading: false,
		transactions: [],
	}),
	actions: {
		// IBC Transfer from Token to Osmosis or viceversa
		async sendIbcTokens(
			senderAddress: string,
			recipientAddress: string,
			from: Token,
			to: Token,
			amount: string
		) {
			try {
				this.loading = true

				if (window.keplr) {
					const signer = await window.keplr.getOfflineSignerOnlyAmino(from.chainID)
					const manager = new TransactionManager(signer, from)
					let transferAmount: Coin | undefined = undefined
					let sourceChannel = ""

					if (from.ibcEnabled) {
						sourceChannel = from.ibc.osmosis.destChannelId
						transferAmount = amountFromCoin(amount, from)
					} else {
						sourceChannel = to.ibc.osmosis.sourceChannelId
						transferAmount = amountIBCFromCoin(amount, to)
					}

					if (transferAmount) {
						const tsx = await manager.sendIbcTokens(
							senderAddress,
							recipientAddress,
							transferAmount,
							sourceChannel
						)

						this.addPendingTx(tsx, from)
					}
				}
			} catch (error) {
				console.error(error)
				notifyError("Transaction Failed", (error as Error).message)
				throw error
			} finally {
				this.loading = false
			}
		},
		async lockTokens(duration: LockableDurationWithApr, coins: Coin[]) {
			const authStore = useAuth()
			const configStore = useConfig()

			try {
				this.loading = true

				if (window.keplr && configStore.osmosisToken && authStore.osmosisAddress) {
					const signer = await window.keplr.getOfflineSignerAuto(
						configStore.osmosisToken.chainID
					)
					const manager = new TransactionManager(signer, configStore.osmosisToken)

					const tsx = await manager.lockTokens(
						authStore.osmosisAddress,
						duration.duration,
						coins
					)

					this.addPendingTx(tsx, configStore.osmosisToken)
				}
			} catch (error) {
				console.error(error)
				notifyError("Transaction Failed", (error as Error).message)
				throw error
			} finally {
				this.loading = false
			}
		},
		async joinPool(poolId: string, shareOutAmount: string, tokenInMaxs: Coin[]) {
			const authStore = useAuth()
			const configStore = useConfig()

			try {
				this.loading = true

				if (window.keplr && configStore.osmosisToken && authStore.osmosisAddress) {
					const signer = await window.keplr.getOfflineSignerAuto(
						configStore.osmosisToken.chainID
					)
					const manager = new TransactionManager(signer, configStore.osmosisToken)

					const tsx = await manager.joinPool(
						authStore.osmosisAddress,
						poolId,
						shareOutAmount,
						tokenInMaxs
					)

					this.addPendingTx(tsx, configStore.osmosisToken)
				}
			} catch (error) {
				console.error(error)
				notifyError("Transaction Failed", (error as Error).message)
				throw error
			} finally {
				this.loading = false
			}
		},
		async joinSwapExternAmountIn(
			poolId: string,
			tokenIn: Coin,
			shareOutMinAmount: string
		) {
			const authStore = useAuth()
			const configStore = useConfig()

			try {
				this.loading = true

				if (window.keplr && configStore.osmosisToken && authStore.osmosisAddress) {
					const signer = await window.keplr.getOfflineSignerAuto(
						configStore.osmosisToken.chainID
					)
					const manager = new TransactionManager(signer, configStore.osmosisToken)

					const tsx = await manager.joinSwapExternAmountIn(
						authStore.osmosisAddress,
						poolId,
						tokenIn,
						shareOutMinAmount
					)

					this.addPendingTx(tsx, configStore.osmosisToken)
				}
			} catch (error) {
				console.error(error)
				notifyError("Transaction Failed", (error as Error).message)
				throw error
			} finally {
				this.loading = false
			}
		},
		async exitPool(poolId: string, shareInAmount: string, tokenOutMins: Coin[]) {
			const authStore = useAuth()
			const configStore = useConfig()

			try {
				this.loading = true

				if (window.keplr && configStore.osmosisToken && authStore.osmosisAddress) {
					const signer = await window.keplr.getOfflineSignerAuto(
						configStore.osmosisToken.chainID
					)
					const manager = new TransactionManager(signer, configStore.osmosisToken)

					const tsx = await manager.exitPool(
						authStore.osmosisAddress,
						poolId,
						shareInAmount,
						tokenOutMins
					)

					this.addPendingTx(tsx, configStore.osmosisToken)
				}
			} catch (error) {
				console.error(error)
				notifyError("Transaction Failed", (error as Error).message)
				throw error
			} finally {
				this.loading = false
			}
		},
		async swapExactAmountIn(
			routes: SwapPool[],
			tokenIn: Coin,
			tokenOutMinAmount: string
		) {
			const authStore = useAuth()
			const configStore = useConfig()

			try {
				this.loading = true

				if (window.keplr && configStore.osmosisToken && authStore.osmosisAddress) {
					const signer = await window.keplr.getOfflineSignerAuto(
						configStore.osmosisToken.chainID
					)

					const manager = new TransactionManager(signer, configStore.osmosisToken)

					const osmosisRoutes: OsmosisRoute[] = routes.map((route) => ({
						poolId: route.pool.id,
						tokenOutDenom: route.out,
					}))

					const tsx = await manager.swapExactAmountIn(
						authStore.osmosisAddress,
						osmosisRoutes,
						tokenIn,
						tokenOutMinAmount
					)

					this.addPendingTx(tsx, configStore.osmosisToken)
				}
			} catch (error) {
				console.error(error)
				notifyError("Transaction Failed", (error as Error).message)
				throw error
			} finally {
				this.loading = false
			}
		},
		async beginUnlocking(id: string) {
			const authStore = useAuth()
			const configStore = useConfig()

			try {
				this.loading = true

				if (window.keplr && configStore.osmosisToken && authStore.osmosisAddress) {
					const signer = await window.keplr.getOfflineSignerAuto(
						configStore.osmosisToken.chainID
					)
					const manager = new TransactionManager(signer, configStore.osmosisToken)

					const tsx = await manager.beginUnlocking(authStore.osmosisAddress, id)

					this.addPendingTx(tsx, configStore.osmosisToken)
				}
			} catch (error) {
				console.error(error)
				notifyError("Transaction Failed", (error as Error).message)
				throw error
			} finally {
				this.loading = false
			}
		},
		addPendingTx(tsx: DeliverTxResponse, from: Token) {
			this.transactions.push({
				tx: tsx,
				from,
				status: TransactionStatus.PENDING,
			})

			this.clearSubscription()
			this.subscribe()
		},
		subscribe() {
			subscription = setInterval(async () => {
				let transactions = [...this.transactions]
				const pendingTransactions = transactions.filter(
					(transaction) => transaction.status === TransactionStatus.PENDING
				)

				if (pendingTransactions.length > 0) {
					const requests: Promise<Partial<DeliverTxResponse>>[] = []

					for (const transaction of pendingTransactions) {
						const chainClient = new ChainClient(transaction.from.apiURL)

						requests.push(chainClient.tx(transaction.tx.transactionHash))
					}

					const responses = await Promise.all(requests)

					transactions = transactions.map((transaction) => {
						const response = responses.find(
							(el) => el.transactionHash === transaction.tx.transactionHash
						)
						let status = TransactionStatus.SUCCESS

						if (response) {
							if (response.code === 404) {
								status = TransactionStatus.FAILED

								notifyError("Transaction Failed", "Request Rejected, try later.")
							} else {
								notifySuccess("Transaction Successful", "View Explorer")
								const poolsStore = usePools()
								const bankStore = useBank()

								poolsStore.init()
								bankStore.loadBalances()
							}

							return {
								...transaction,
								status,
							}
						}

						return {
							...transaction,
						}
					})

					this.transactions = transactions
				} else {
					this.clearSubscription()
				}
			}, pollingTime)
		},
		clearSubscription() {
			clearInterval(subscription)
		},
	},
	persistedState: {
		persist: true,
		includePaths: ["transactions"],
	},
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useTransactionManager, import.meta.hot))
}

export default useTransactionManager
