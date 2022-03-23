import { Coin } from '@cosmjs/proto-signing';
import { sinfoniaClient } from '@/services'
import { acceptHMRUpdate, defineStore } from 'pinia'
import useAuth from '@/store/auth'
import useConfig from '@/store/config';
import { ChainBalance, TokenBalance } from '@/types';
import { compact, reduce } from 'lodash';
import { toViewDenom } from '@/common/numbers';
import { BigNumber } from 'bignumber.js';

export interface BankState {
  loading: boolean
  osmosisBalance: Coin[]
  bitsongBalance: Coin[]
  fantokensBalance: Coin[]
  lockedCoinsBalance: Coin[]
  totalMintedFantokens: Coin[]
  totalBurnedFantokens: Coin[]
}

const useBank = defineStore('bank', {
  state: (): BankState => ({
    loading: false,
    osmosisBalance: [],
    bitsongBalance: [],
    fantokensBalance: [],
    lockedCoinsBalance: [],
    totalMintedFantokens: [],
    totalBurnedFantokens: []
  }),
  actions: {
    async init() {
      try {
        this.loading = true

        this.totalMintedFantokens = await sinfoniaClient.totalMintedFantokens()
        this.totalBurnedFantokens = await sinfoniaClient.totalBurnedFantokens()
      } catch (error) {
        console.error(error)
        throw error;
      } finally {
        this.loading = false;
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
          }
				}
      } catch (error) {
        console.error(error)
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
  getters: {
    balances(): TokenBalance[] {
      const configStore = useConfig()

      return configStore.allTokens.map(token => {
        let osmosisChain: ChainBalance | undefined = undefined
        let bitsongChain: ChainBalance | undefined = undefined
        const chains: ChainBalance[] = []

        const coinLookup = token.coinLookup.find(
          (coin) => coin.viewDenom === token.symbol
        )

        if (coinLookup) {
          const osmosisBalance = this.osmosisBalance.find(coin => {
            if (token.ibcEnabled) {
              return coin.denom === token.ibc.osmosis.destDenom
            }

            return coin.denom === coinLookup.chainDenom
          })
  
          const bitsongBalance = this.bitsongBalance.find(
            coin => coin.denom === coinLookup.chainDenom
          )

          if (osmosisBalance && configStore.osmosisToken) {
            const osmosisAvailable = toViewDenom(osmosisBalance.amount, coinLookup.chainToViewConversionFactor)
            const osmosisBonded = toViewDenom('0', coinLookup.chainToViewConversionFactor)
            const osmosisTotal = new BigNumber(osmosisAvailable).plus(osmosisBonded)

            osmosisChain = {
              name: configStore.osmosisToken.name,
              symbol: configStore.osmosisToken.symbol,
              logos: configStore.osmosisToken.logos,
              total: osmosisTotal.toString(),
              available: osmosisAvailable.toString(),
              bonded: osmosisBonded.toString()
            }

            chains.push(osmosisChain)
          }

          if (bitsongBalance) {
            const osmosisAvailable = toViewDenom(bitsongBalance.amount, coinLookup.chainToViewConversionFactor)
            const osmosisBonded = toViewDenom('0', coinLookup.chainToViewConversionFactor)
            const osmosisTotal = new BigNumber(osmosisAvailable).plus(osmosisBonded)

            bitsongChain = {
              name: token.name,
              symbol: token.symbol,
              logos: token.logos,
              total: osmosisTotal.toString(),
              available: osmosisAvailable.toString(),
              bonded: osmosisBonded.toString()
            }

            chains.push(bitsongChain)
          }
        }

        const available = reduce<ChainBalance, BigNumber>(chains, (all, balance) => {
          return all.plus(balance.available ?? '0')
        }, new BigNumber('0')).toString()
        const bonded = reduce<ChainBalance, BigNumber>(chains, (all, balance) => {
          return all.plus(balance.bonded ?? '0')
        }, new BigNumber('0')).toString()
        const total = new BigNumber(available).plus(bonded).toString()

        return {
          ...token,
          total,
          available,
          bonded,
          chains
        }
      })
    },
    total() {
      const balances = this.balances as TokenBalance[]

      return reduce<TokenBalance, BigNumber>(balances, (all, balance) => {
        return all.plus(balance.total ?? '0')
      }, new BigNumber('0')).toString()
    },
    bonded() {
      const balances = this.balances as TokenBalance[]

      return reduce<TokenBalance, BigNumber>(balances, (all, balance) => {
        return all.plus(balance.bonded ?? '0')
      }, new BigNumber('0')).toString()
    },
    available() {
      const balances = this.balances as TokenBalance[]

      return reduce<TokenBalance, BigNumber>(balances, (all, balance) => {
        return all.plus(balance.available ?? '0')
      }, new BigNumber('0')).toString()
    },
  },
  persistedState: {
		persist: false,
	}
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBank, import.meta.hot))
}

export default useBank
