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
	TransactionPayload,
	TransactionStatus,
	TransactionType,
} from "@/types"
import { Coin } from "@cosmjs/proto-signing"
import { acceptHMRUpdate, defineStore } from "pinia"
import { DeliverTxResponse } from "@cosmjs/stargate"
import { notifyError, notifySuccess } from "@/common"
import ChainClient from "@/services/chain-client"

export interface TransactionManagerState {
	loadingSign: boolean
	loadingBroadcasting: boolean
	transactions: Transaction[]
	notificationUnread: boolean
}

const pollingTime = 5000
let subscription

const useTransactionManager = defineStore("transactionManager", {
	state: (): TransactionManagerState => ({
		loadingSign: false,
		loadingBroadcasting: false,
		transactions: [],
		notificationUnread: false,
	}),
	actions: {
		// IBC Transfer from Token to Osmosis or viceversa
		async sendIbcTokens(
			senderAddress: string,
			recipientAddress: string,
			from: Token,
			to: Token,
			transferAmount: Coin,
			transferToken: Token
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
							txId = this.addBroadcastingTx({
								from,
								to,
								type: TransactionType.SEND_IBC_TOKENS,
								fromAmount: transferAmount.amount,
								transferToken,
							})

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

						await manager.sendIbcTokens(
							senderAddress,
							recipientAddress,
							transferAmount,
							sourceChannel
						)
					}
				}
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
						txId = this.addBroadcastingTx({
							from: osmosisToken,
							type: TransactionType.LOCK_TOKENS,
							gammAmount: coins[0].amount,
						})

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

					await manager.lockTokens(
						authStore.osmosisAddress,
						duration.duration,
						coins
					)
				}
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
						txId = this.addBroadcastingTx({
							from: osmosisToken,
							type: TransactionType.JOIN_POOL,
							poolId,
						})

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

					await manager.joinPool(
						authStore.osmosisAddress,
						poolId,
						shareOutAmount,
						tokenInMaxs
					)
				}
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
						txId = this.addBroadcastingTx({
							from: osmosisToken,
							type: TransactionType.JOIN_SWAP_EXTERN_AMOUNT_IN,
						})

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

					await manager.joinSwapExternAmountIn(
						authStore.osmosisAddress,
						poolId,
						tokenIn,
						shareOutMinAmount
					)
				}
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
						txId = this.addBroadcastingTx({
							from: osmosisToken,
							type: TransactionType.EXIT_POOL,
							poolId,
						})

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

					await manager.exitPool(
						authStore.osmosisAddress,
						poolId,
						shareInAmount,
						tokenOutMins
					)
				}
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
						txId = this.addBroadcastingTx({
							from: osmosisToken,
							type: TransactionType.SWAP_EXACT_AMOUNT_IN,
							fromSwap: from,
							fromAmount,
							toSwap: to,
							toAmount,
						})

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

					await manager.swapExactAmountIn(
						authStore.osmosisAddress,
						osmosisRoutes,
						tokenIn,
						tokenOutMinAmount
					)
				}
			} finally {
				this.loadingSign = false
				this.loadingBroadcasting = false
			}
		},
		async beginUnlocking(id: string, poolId: string) {
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
						txId = this.addBroadcastingTx({
							from: osmosisToken,
							type: TransactionType.BEGIN_UNLOCKING,
							poolId,
						})

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

					await manager.beginUnlocking(authStore.osmosisAddress, id)
				}
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
					const signer = await window.keplr.getOfflineSignerOnlyAmino(
						bitsongToken.chainID
					)

					const manager = new TransactionManager(signer, bitsongToken)

					let txId

					manager.on("ontxsigned", () => {
						txId = this.addBroadcastingTx({
							from: bitsongToken,
							type: TransactionType.MERKLEDROP_CLAIM,
							merkledropId,
						})

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

					await manager.merkledropClaim(
						authStore.bitsongAddress,
						merkledropId,
						index,
						amount,
						proofs
					)
				}
			} finally {
				this.loadingSign = false
				this.loadingBroadcasting = false
			}
		},
		addBroadcastingTx({
			type,
			from,
			to,
			notify,
			fromSwap,
			fromAmount,
			toSwap,
			toAmount,
			poolId,
			gammAmount,
			transferToken,
			merkledropId,
		}: TransactionPayload) {
			const id = `tx-${Date.now()}-${Math.random()}`
			const transactions = [...this.transactions]

			transactions.unshift({
				id,
				from,
				to,
				status: TransactionStatus.BROADCASTING,
				type,
				fromSwap,
				fromAmount,
				toSwap,
				toAmount,
				notify,
				poolId,
				gammAmount,
				transferToken,
				merkledropId,
				time: new Date().getTime(),
			})

			this.transactions = transactions.slice(0, 10)
			this.notificationUnread = true

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
		reset() {
			this.clearSubscription()
			this.transactions = []
		},
	},
	getters: {
		swapTransactions: ({ transactions }) => {
			return transactions.filter(
				(transaction) => transaction.type === TransactionType.SWAP_EXACT_AMOUNT_IN
			)
		},
		pendingTransactions: ({ transactions }) => {
			return transactions.filter(
				(transaction) => transaction.status === TransactionStatus.PENDING
			)
		},
		loading({ loadingBroadcasting }) {
			const pendingTransactions = this.pendingTransactions as Transaction[]

			return pendingTransactions.length > 0 || loadingBroadcasting
		},
		loadingAndSign({ loadingSign }) {
			const loading = this.loading as boolean

			return loading || loadingSign
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
