import { sinfoniaClient } from '@/services'
import { AssetListConfig, TokenBalance } from '@/types'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { BigNumber } from 'bignumber.js'
import { reduce } from 'lodash'
import useBank from '@/store/bank'
import { Coin } from '@cosmjs/proto-signing'
import { balancedCurrency } from '@/common/numbers'

export interface ConfigState {
  loading: boolean
  assetsConfig?: AssetListConfig
}

const useConfig = defineStore('config', {
  state: (): ConfigState => ({
    loading: false,
  }),
  actions: {
    async init() {
      try {
        this.loading = true

        this.assetsConfig = await sinfoniaClient.assetLists()
      } catch (error) {
        console.error(error)
        throw error
      } finally {
        this.loading = false
      }
    },
  },
  getters: {
    bitsongToken: ({ assetsConfig }) => assetsConfig ? assetsConfig.bitsongToken : undefined,
    osmosisToken: ({ assetsConfig }) => assetsConfig ? assetsConfig.osmosisToken : undefined,
    fantokens: ({ assetsConfig }): TokenBalance[] => {
      const bankStore = useBank()
      const data = assetsConfig ? assetsConfig.fantokens : []

      return data.map(fantoken => {
        const coinLookup = fantoken.coinLookup.find(
          (coin) => coin.viewDenom === fantoken.symbol
        )

        let circulatingSupply = new BigNumber('0')
        let totalMintedTokens = new BigNumber('0')
        let totalBurnedTokens = new BigNumber('0')

        if (coinLookup) {
          const totalBurnedFantokens = bankStore.totalBurnedFantokens.filter(
            el => el.denom === coinLookup.fantokenDenom
          )

          const totalMintedFantokens = bankStore.totalMintedFantokens.filter(
            el => el.denom === coinLookup.fantokenDenom
          )

          totalBurnedTokens = reduce<Coin, BigNumber>(totalBurnedFantokens, (all, burned) => {
            return all.plus(burned.amount)
          }, new BigNumber('0')).multipliedBy(coinLookup.chainToViewConversionFactor)

          totalMintedTokens = reduce<Coin, BigNumber>(totalMintedFantokens, (all, minted) => {
            return all.plus(minted.amount)
          }, new BigNumber('0')).multipliedBy(coinLookup.chainToViewConversionFactor)

          circulatingSupply = totalMintedTokens.minus(totalBurnedTokens)
        }

        return {
          ...fantoken,
          circulatingSupply: balancedCurrency(circulatingSupply.toNumber()),
          totalMintedTokens: balancedCurrency(totalMintedTokens.toNumber()),
          totalBurnedTokens: balancedCurrency(totalBurnedTokens.toNumber())
        }
      })
    },
    tokens: ({ assetsConfig }) => assetsConfig ? assetsConfig.tokens : [],
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useConfig, import.meta.hot))
}

export default useConfig
