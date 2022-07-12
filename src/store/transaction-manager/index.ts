import useBank from "@/store/bank"
import usePools from "@/store/pools"
import useConfig from "@/store/config"
import useAuth from "@/store/auth"
import usePrices from "@/store/prices"
import useMerkledrops from "@/store/merkledrops"
import { TransactionManager } from "@/signing/transaction-manager"
import {
	LockableDurationWithApr,
	OsmosisRoute,
	SwapPool,
	Token,
	Transaction,
	TransactionStatus,
	TransactionType,
} from "@/types"
import { Coin } from "@cosmjs/proto-signing"
import { acceptHMRUpdate, defineStore } from "pinia"
import { DeliverTxResponse } from "@cosmjs/stargate"
import { notifyError, notifySuccess, notifyLoading } from "@/common"
import ChainClient from "@/services/chain-client"

export interface TransactionManagerState {
	loadingSign: boolean
	loadingBroadcasting: boolean
	transactions: Transaction[]
}

const pollingTime = 5000
let subscription

const useTransactionManager = defineStore("transactionManager", {
	state: (): TransactionManagerState => ({
		loadingSign: false,
		loadingBroadcasting: false,
		transactions: [],
	}),
	actions: {
		// IBC Transfer from Token to Osmosis or viceversa
		async sendIbcTokens(
			senderAddress: string,
			recipientAddress: string,
			from: Token,
			to: Token,
			transferAmount?: Coin
		) {
			this.loadingSign = true

			let loader

			try {
				if (window.keplr) {
					const signer = await window.keplr.getOfflineSignerOnlyAmino(from.chainID)
					const manager = new TransactionManager(signer, from)
					let sourceChannel = ""

					if (from.ibcEnabled) {
						sourceChannel = from.ibc.osmosis.destChannelId
					} else {
						sourceChannel = to.ibc.osmosis.sourceChannelId
					}

					if (transferAmount) {
						let txId

						manager.on("ontxsigned", () => {
							loader = notifyLoading(
								"Transaction Broadcasting",
								"Waiting for transaction to be included in the block"
							)

							txId = this.addBroadcastingTx(
								from,
								TransactionType.SEND_IBC_TOKENS,
								loader
							)

							this.loadingBroadcasting = true
						})

						manager.on("ontxbroadcasted", (txs: DeliverTxResponse) => {
							if (txId) {
								this.updateTx(txId, txs)
							}

							this.loadingBroadcasting = false
						})

						manager.on("onerror", (error: any) => {
							if (loader) {
								loader()
							}

							if (txId) {
								this.updateTx(txId, undefined, TransactionStatus.FAILED)
							}

							notifyError("Transaction Failed", (error as Error).message)

							this.loadingBroadcasting = false
							this.loadingSign = false
						})

						manager.sendIbcTokens(
							senderAddress,
							recipientAddress,
							transferAmount,
							sourceChannel
						)
					}
				}
			} catch (error) {
				console.error(error)

				if (loader) {
					loader()
				}

				notifyError("Transaction Failed", (error as Error).message)
				throw error
			} finally {
				this.loadingSign = false
				this.loadingBroadcasting = false
			}
		},
		async lockTokens(duration: LockableDurationWithApr, coins: Coin[]) {
			const authStore = useAuth()
			const configStore = useConfig()

			let loader

			try {
				this.loadingSign = true
				const osmosisToken = configStore.osmosisToken

				if (window.keplr && osmosisToken && authStore.osmosisAddress) {
					const signer = await window.keplr.getOfflineSignerOnlyAmino(
						osmosisToken.chainID
					)

					const manager = new TransactionManager(signer, osmosisToken)
					let txId

					manager.on("ontxsigned", () => {
						loader = notifyLoading(
							"Transaction Broadcasting",
							"Waiting for transaction to be included in the block"
						)

						txId = this.addBroadcastingTx(
							osmosisToken,
							TransactionType.LOCK_TOKENS,
							loader
						)

						this.loadingBroadcasting = true
					})

					manager.on("ontxbroadcasted", (txs: DeliverTxResponse) => {
						if (txId) {
							this.updateTx(txId, txs)
						}

						this.loadingBroadcasting = false
					})

					manager.on("onerror", (error: any) => {
						if (loader) {
							loader()
						}

						if (txId) {
							this.updateTx(txId, undefined, TransactionStatus.FAILED)
						}

						notifyError("Transaction Failed", (error as Error).message)

						this.loadingBroadcasting = false
						this.loadingSign = false
					})

					manager.lockTokens(authStore.osmosisAddress, duration.duration, coins)
				}
			} catch (error) {
				console.error(error)

				if (loader) {
					loader()
				}

				notifyError("Transaction Failed", (error as Error).message)
				throw error
			} finally {
				this.loadingSign = false
				this.loadingBroadcasting = false
			}
		},
		async joinPool(poolId: string, shareOutAmount: string, tokenInMaxs: Coin[]) {
			const authStore = useAuth()
			const configStore = useConfig()
			const osmosisToken = configStore.osmosisToken

			let loader

			try {
				this.loadingSign = true

				if (window.keplr && osmosisToken && authStore.osmosisAddress) {
					const signer = await window.keplr.getOfflineSignerOnlyAmino(
						osmosisToken.chainID
					)

					const manager = new TransactionManager(signer, osmosisToken)

					let txId

					manager.on("ontxsigned", () => {
						loader = notifyLoading(
							"Transaction Broadcasting",
							"Waiting for transaction to be included in the block"
						)

						txId = this.addBroadcastingTx(
							osmosisToken,
							TransactionType.JOIN_POOL,
							loader
						)

						this.loadingBroadcasting = true
					})

					manager.on("ontxbroadcasted", (txs: DeliverTxResponse) => {
						if (txId) {
							this.updateTx(txId, txs)
						}

						this.loadingBroadcasting = false
					})

					manager.on("onerror", (error: any) => {
						if (loader) {
							loader()
						}

						if (txId) {
							this.updateTx(txId, undefined, TransactionStatus.FAILED)
						}

						notifyError("Transaction Failed", (error as Error).message)

						this.loadingBroadcasting = false
						this.loadingSign = false
					})

					manager.joinPool(
						authStore.osmosisAddress,
						poolId,
						shareOutAmount,
						tokenInMaxs
					)
				}
			} catch (error) {
				console.error(error)

				if (loader) {
					loader()
				}

				notifyError("Transaction Failed", (error as Error).message)
				throw error
			} finally {
				this.loadingSign = false
				this.loadingBroadcasting = false
			}
		},
		async joinSwapExternAmountIn(
			poolId: string,
			tokenIn: Coin,
			shareOutMinAmount: string
		) {
			const authStore = useAuth()
			const configStore = useConfig()

			let loader

			try {
				this.loadingSign = true
				const osmosisToken = configStore.osmosisToken

				if (window.keplr && osmosisToken && authStore.osmosisAddress) {
					const signer = await window.keplr.getOfflineSignerOnlyAmino(
						osmosisToken.chainID
					)

					const manager = new TransactionManager(signer, osmosisToken)

					let txId

					manager.on("ontxsigned", () => {
						loader = notifyLoading(
							"Transaction Broadcasting",
							"Waiting for transaction to be included in the block"
						)

						txId = this.addBroadcastingTx(
							osmosisToken,
							TransactionType.JOIN_SWAP_EXTERN_AMOUNT_IN,
							loader
						)

						this.loadingBroadcasting = true
					})

					manager.on("ontxbroadcasted", (txs: DeliverTxResponse) => {
						if (txId) {
							this.updateTx(txId, txs)
						}

						this.loadingBroadcasting = false
					})

					manager.on("onerror", (error: any) => {
						if (loader) {
							loader()
						}

						if (txId) {
							this.updateTx(txId, undefined, TransactionStatus.FAILED)
						}

						notifyError("Transaction Failed", (error as Error).message)

						this.loadingBroadcasting = false
						this.loadingSign = false
					})

					manager.joinSwapExternAmountIn(
						authStore.osmosisAddress,
						poolId,
						tokenIn,
						shareOutMinAmount
					)
				}
			} catch (error) {
				console.error(error)

				if (loader) {
					loader()
				}

				notifyError("Transaction Failed", (error as Error).message)
				throw error
			} finally {
				this.loadingSign = false
				this.loadingBroadcasting = false
			}
		},
		async exitPool(poolId: string, shareInAmount: string, tokenOutMins: Coin[]) {
			const authStore = useAuth()
			const configStore = useConfig()

			let loader

			try {
				this.loadingSign = true
				const osmosisToken = configStore.osmosisToken

				if (window.keplr && osmosisToken && authStore.osmosisAddress) {
					const signer = await window.keplr.getOfflineSignerOnlyAmino(
						osmosisToken.chainID
					)

					const manager = new TransactionManager(signer, osmosisToken)

					let txId

					manager.on("ontxsigned", () => {
						loader = notifyLoading(
							"Transaction Broadcasting",
							"Waiting for transaction to be included in the block"
						)

						txId = this.addBroadcastingTx(
							osmosisToken,
							TransactionType.EXIT_POOL,
							loader
						)

						this.loadingBroadcasting = true
					})

					manager.on("ontxbroadcasted", (txs: DeliverTxResponse) => {
						if (txId) {
							this.updateTx(txId, txs)
						}

						this.loadingBroadcasting = false
					})

					manager.on("onerror", (error: any) => {
						if (loader) {
							loader()
						}

						if (txId) {
							this.updateTx(txId, undefined, TransactionStatus.FAILED)
						}

						notifyError("Transaction Failed", (error as Error).message)

						this.loadingBroadcasting = false
						this.loadingSign = false
					})

					manager.exitPool(
						authStore.osmosisAddress,
						poolId,
						shareInAmount,
						tokenOutMins
					)
				}
			} catch (error) {
				console.error(error)

				if (loader) {
					loader()
				}

				notifyError("Transaction Failed", (error as Error).message)
				throw error
			} finally {
				this.loadingSign = false
				this.loadingBroadcasting = false
			}
		},
		async swapExactAmountIn(
			routes: SwapPool[],
			tokenIn: Coin,
			tokenOutMinAmount: string,
			from: Token,
			fromAmount: string,
			to: Token,
			toAmount: string
		) {
			const authStore = useAuth()
			const configStore = useConfig()

			let loader

			try {
				this.loadingSign = true
				const osmosisToken = configStore.osmosisToken

				if (window.keplr && osmosisToken && authStore.osmosisAddress) {
					const signer = await window.keplr.getOfflineSignerOnlyAmino(
						osmosisToken.chainID
					)

					const manager = new TransactionManager(signer, osmosisToken)

					const osmosisRoutes: OsmosisRoute[] = routes.map((route) => ({
						poolId: route.pool.id,
						tokenOutDenom: route.out,
					}))

					let txId

					manager.on("ontxsigned", () => {
						loader = notifyLoading(
							"Transaction Broadcasting",
							"Waiting for transaction to be included in the block"
						)

						txId = this.addBroadcastingTx(
							osmosisToken,
							TransactionType.SWAP_EXACT_AMOUNT_IN,
							loader,
							from,
							fromAmount,
							to,
							toAmount
						)

						this.loadingBroadcasting = true
					})

					manager.on("ontxbroadcasted", (txs: DeliverTxResponse) => {
						if (txId) {
							this.updateTx(txId, txs)
						}

						this.loadingBroadcasting = false
					})

					manager.on("onerror", (error: any) => {
						if (loader) {
							loader()
						}

						if (txId) {
							this.updateTx(txId, undefined, TransactionStatus.FAILED)
						}

						notifyError("Transaction Failed", (error as Error).message)

						this.loadingBroadcasting = false
						this.loadingSign = false
					})

					manager.swapExactAmountIn(
						authStore.osmosisAddress,
						osmosisRoutes,
						tokenIn,
						tokenOutMinAmount
					)
				}
			} catch (error) {
				console.error(error)

				if (loader) {
					loader()
				}

				notifyError("Transaction Failed", (error as Error).message)
				throw error
			} finally {
				this.loadingSign = false
				this.loadingBroadcasting = false
			}
		},
		async beginUnlocking(id: string) {
			const authStore = useAuth()
			const configStore = useConfig()

			let loader

			try {
				this.loadingSign = true
				const osmosisToken = configStore.osmosisToken

				if (window.keplr && osmosisToken && authStore.osmosisAddress) {
					const signer = await window.keplr.getOfflineSignerOnlyAmino(
						osmosisToken.chainID
					)

					const manager = new TransactionManager(signer, osmosisToken)

					let txId

					manager.on("ontxsigned", () => {
						loader = notifyLoading(
							"Transaction Broadcasting",
							"Waiting for transaction to be included in the block"
						)

						txId = this.addBroadcastingTx(
							osmosisToken,
							TransactionType.BEGIN_UNLOCKING,
							loader
						)

						this.loadingBroadcasting = true
					})

					manager.on("ontxbroadcasted", (txs: DeliverTxResponse) => {
						if (txId) {
							this.updateTx(txId, txs)
						}

						this.loadingBroadcasting = false
					})

					manager.on("onerror", (error: any) => {
						if (loader) {
							loader()
						}

						if (txId) {
							this.updateTx(txId, undefined, TransactionStatus.FAILED)
						}

						notifyError("Transaction Failed", (error as Error).message)

						this.loadingBroadcasting = false
						this.loadingSign = false
					})

					manager.beginUnlocking(authStore.osmosisAddress, id)
				}
			} catch (error) {
				console.error(error)
				loader()
				notifyError("Transaction Failed", (error as Error).message)
				throw error
			} finally {
				this.loadingSign = false
				this.loadingBroadcasting = false
			}
		},
		async merkledropClaim(
			merkledropId: number,
			index: number,
			amount: string,
			proofs: string[]
		) {
			const authStore = useAuth()
			const configStore = useConfig()

			let loader

			try {
				this.loadingSign = true
				const bitsongToken = configStore.bitsongToken

				if (window.keplr && bitsongToken && authStore.bitsongAddress) {
					const signer = await window.keplr.getOfflineSignerAuto(
						bitsongToken.chainID
					)

					const manager = new TransactionManager(signer, bitsongToken)

					let txId

					manager.on("ontxsigned", () => {
						loader = notifyLoading(
							"Transaction Broadcasting",
							"Waiting for transaction to be included in the block"
						)

						txId = this.addBroadcastingTx(
							bitsongToken,
							TransactionType.MERKLEDROP_CLAIM,
							loader
						)

						this.loadingBroadcasting = true
					})

					manager.on("ontxbroadcasted", (txs: DeliverTxResponse) => {
						if (txId) {
							this.updateTx(txId, txs)
						}

						this.loadingBroadcasting = false
					})

					manager.on("onerror", (error: any) => {
						if (loader) {
							loader()
						}

						if (txId) {
							this.updateTx(txId, undefined, TransactionStatus.FAILED)
						}

						notifyError("Transaction Failed", (error as Error).message)

						this.loadingBroadcasting = false
						this.loadingSign = false
					})

					manager.merkledropClaim(
						authStore.bitsongAddress,
						merkledropId,
						index,
						amount,
						proofs
					)
				}
			} catch (error) {
				console.error(error)
				loader()
				notifyError("Transaction Failed", (error as Error).message)
				throw error
			} finally {
				this.loadingSign = false
				this.loadingBroadcasting = false
			}
		},
		addBroadcastingTx(
			from: Token,
			type: TransactionType,
			notify: () => void,
			fromSwap?: Token,
			fromAmount?: string,
			toSwap?: Token,
			toAmount?: string
		) {
			const id = `tx-${Date.now()}-${Math.random()}`
			const transactions = [...this.transactions]

			transactions.unshift({
				id,
				from,
				status: TransactionStatus.BROADCASTING,
				type,
				fromSwap,
				fromAmount,
				toSwap,
				toAmount,
				notify,
				time: new Date().getTime(),
			})

			this.transactions = transactions.slice(0, 10)

			this.clearSubscription()

			return id
		},
		updateTx(
			id: string,
			tx: DeliverTxResponse | undefined,
			status = TransactionStatus.PENDING
		) {
			const transactions = [...this.transactions].map((transaction) => {
				if (transaction.id === id) {
					return {
						...transaction,
						tx,
						status,
					}
				}

				return transaction
			})

			this.transactions = transactions

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

						if (transaction.tx) {
							requests.push(chainClient.tx(transaction.tx.transactionHash))
						}
					}

					const responses = await Promise.all(requests)

					transactions = transactions.map((transaction) => {
						const tx = transaction.tx

						if (tx) {
							const response = responses.find(
								(el) => el.transactionHash === tx.transactionHash
							)
							let status = TransactionStatus.SUCCESS

							if (response) {
								if (transaction.notify) {
									transaction.notify()
								}

								if (response.code === 404) {
									status = TransactionStatus.FAILED

									notifyError("Transaction Failed", "Request Rejected, try later.")
								} else {
									const url = `${transaction.from.explorerURL}txs/${transaction.tx?.transactionHash}`
									notifySuccess("Transaction Successful", undefined, {
										text: "View Explorer",
										url,
									})
									const poolsStore = usePools()
									const bankStore = useBank()
									const pricesStore = usePrices()
									const merkledropsStore = useMerkledrops()
									const authStore = useAuth()

									setTimeout(() => {
										pricesStore.init()
										poolsStore.init()
										bankStore.init()
										bankStore.loadBalances()

										if (merkledropsStore.merkledrops.length > 0) {
											merkledropsStore.loadAirdrops(authStore.bitsongAddress)
										}
									}, 2000)
								}

								return {
									...transaction,
									status,
								}
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
	getters: {
		swapTransactions: ({ transactions }) => {
			return transactions.filter(
				(transaction) => transaction.type === TransactionType.SWAP_EXACT_AMOUNT_IN
			)
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
