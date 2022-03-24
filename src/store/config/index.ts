import { sinfoniaClient } from '@/services'
import { AssetListConfig, Token, TokenBalance } from '@/types'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { BigNumber } from 'bignumber.js'
import { compact, reduce } from 'lodash'
import useBank from '@/store/bank'
import { Coin } from '@cosmjs/proto-signing'
import { balancedCurrency, currency } from '@/common/numbers'

export interface ConfigState {
  loading: boolean
  assetsConfig?: AssetListConfig
}

const useConfig = defineStore('config', {
  state: (): ConfigState => ({
    loading: false,
    assetsConfig: undefined,
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
    bitsongToken: ({ assetsConfig }): Token | undefined => assetsConfig ? assetsConfig.bitsongToken : undefined,
    osmosisToken: ({ assetsConfig }): Token | undefined => assetsConfig ? assetsConfig.osmosisToken : undefined,
    rawFantokens: ({ assetsConfig }): Token[] => assetsConfig ? assetsConfig.fantokens : [],
    fantokens (): TokenBalance[] {
      const bankStore = useBank()

      return this.rawFantokens.map(fantoken => {
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
          price: '0.15',
          marketCap: circulatingSupply.multipliedBy('0.15').toString(),
          circulatingSupply: circulatingSupply.toString(),
          totalMintedTokens: totalMintedTokens.toString(),
          totalBurnedTokens: totalBurnedTokens.toString()
        }
      })
    },
    tokens: ({ assetsConfig }) => assetsConfig ? assetsConfig.tokens : [],
    allTokens (): Token[] {
      return compact([
        this.bitsongToken,
        this.osmosisToken,
        ...this.tokens,
        ...this.rawFantokens
      ])
    },
    allMainTokens (): Token[] {
      return compact([
        this.bitsongToken,
        this.osmosisToken,
        ...this.tokens,
      ])
    },
    findTokenByIBCDenom () {
      return (denom: string) => this.allTokens.find(token => {
        if (!token.ibcEnabled) {
          const coinLookup = token.coinLookup.find(
            (coin) => coin.viewDenom === token.symbol
          )

          if (coinLookup) {
            return coinLookup.chainDenom === denom
          }

          return undefined
        }

        return token.ibc.osmosis.destDenom === denom
      })
    }
  },
  persistedState: {
		persist: false,
	}
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useConfig, import.meta.hot))
}

export default useConfig
