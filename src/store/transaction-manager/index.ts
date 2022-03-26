import useConfig from "@/store/config"
import useAuth from "@/store/auth"
import { amountIBCFromCoin, amountFromCoin } from "@/common/numbers"
import { TransactionManager } from "@/signing/transaction-manager"
import { LockableDurationWithApr, Token, Transaction } from "@/types"
import { Coin } from "@cosmjs/proto-signing"
import { acceptHMRUpdate, defineStore } from "pinia"

export interface TransactionManagerState {
	loading: boolean
	transactions: Transaction[]
}

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

						console.log(tsx)
					}
				}
			} catch (error) {
				console.error(error)
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

					console.log(tsx)
				}
			} catch (error) {
				console.error(error)
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

					console.log(tsx)
				}
			} catch (error) {
				console.error(error)
				throw error
			} finally {
				this.loading = false
			}
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
