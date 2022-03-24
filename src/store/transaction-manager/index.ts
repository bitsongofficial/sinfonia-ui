import { amountIBCFromCoin, amountFromCoin } from '@/common/numbers'
import { TransactionManager } from '@/signing/transaction-manager'
import { Token, Transaction } from '@/types'
import { Coin } from '@cosmjs/proto-signing'
import { acceptHMRUpdate, defineStore } from 'pinia'

export interface TransactionManagerState {
	loading: boolean
	transactions: Transaction[]
}

const useTransactionManager = defineStore('transactionManager', {
	state: (): TransactionManagerState => ({
		loading: false,
		transactions: []
	}),
	actions: {
		// IBC Transfer from Token to Osmosis or viceversa
		async sendIbcTokens(senderAddress: string, recipientAddress: string, from: Token, to: Token, amount: string) {
      try {
        this.loading = true

				if (window.keplr) {
					const signer = await window.keplr.getOfflineSignerOnlyAmino(from.chainID)
					const manager = new TransactionManager(signer, from)
					let transferAmount: Coin | undefined = undefined
					let sourceChannel = ''

					if (from.ibcEnabled) {
						sourceChannel = from.ibc.osmosis.destChannelId
						transferAmount = amountFromCoin(amount, from)
					} else {
						sourceChannel = to.ibc.osmosis.sourceChannelId
						transferAmount = amountIBCFromCoin(amount, to)
					}

					if (transferAmount) {
						let sourceChannel = ''

						if (from.ibcEnabled) {
							sourceChannel = from.ibc.osmosis.destChannelId
						} else {
							sourceChannel = to.ibc.osmosis.sourceChannelId
						}

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
	},
  persistedState: {
		persist: true,
		includePaths: ['transactions']
	}
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useTransactionManager, import.meta.hot))
}

export default useTransactionManager