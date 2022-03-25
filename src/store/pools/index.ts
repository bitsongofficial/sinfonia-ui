import { compact } from 'lodash';
import { sinfoniaClient } from '@/services'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { DistrInfo, Epoch, Gauge, IncentivizedPool, MintParams, OsmosisPool, Pool } from '@/types'
import { mapPools, mapLockableDuration } from '@/common'
import useBank from '@/store/bank'
import useConfig from '@/store/config';

export interface PoolsState {
  loading: boolean
  loadingGauges: boolean
  rawPools: OsmosisPool[]
  incentivizedPools: IncentivizedPool[]
  mintParams?: MintParams
  distrInfo?: DistrInfo
  epochs: Epoch[]
  rawLockableDurations: string[]
  extraGauges: Gauge[]
  epochProvisions: string
}

const usePools = defineStore('pools', {
  state: (): PoolsState => ({
    loading: false,
    loadingGauges: false,
    rawPools: [],
    incentivizedPools: [],
    mintParams: undefined,
    distrInfo: undefined,
    epochs: [],
    rawLockableDurations: [],
    extraGauges: [],
    epochProvisions: '0'
  }),
  actions: {
    async init() {
      try {
        this.loading = true

        this.loadGauges()

        const [
          rawPools,
          incentivizedPools,
          lockableDurations,
          mintParams,
          epochs,
          distrInfo,
          epochProvisions
        ] = await Promise.all([
          sinfoniaClient.pools(),
          sinfoniaClient.incentivizedPools(),
          sinfoniaClient.lockableDurations(),
          sinfoniaClient.mintParams(),
          sinfoniaClient.epochs(),
          sinfoniaClient.poolIncentivesDistrInfo(),
          sinfoniaClient.epochProvisions()
        ])

				this.rawPools = rawPools
				this.incentivizedPools = incentivizedPools
				this.rawLockableDurations = lockableDurations
				this.mintParams = mintParams
				this.epochs = epochs
				this.distrInfo = distrInfo
				this.epochProvisions = epochProvisions
      } catch (error) {
        console.error(error)
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async loadGauges() {
      const configStore = useConfig()

      try {
        this.loadingGauges = true

        const ids = configStore.extraGaugeIds
        this.extraGauges = await sinfoniaClient.extraGaugesDetails(ids)
      } catch (error) {
        console.error(error)
        throw error
      } finally {
        this.loadingGauges = false
      }
    }
  },
	getters: {
		pools({ rawPools }): Pool[] {
			return compact(mapPools(rawPools))
		},
    myPools(): Pool[] {
      const bankStore = useBank()

			return this.pools.filter(pool => {
        const gammIds = bankStore.allGamms.filter(el => el.denom === `gamm/pool/${pool.id}`)

        return gammIds.length > 0
      })
		},
    poolById() {
      return (id: string) => this.pools.find(pool => pool.id === id)
    },
    incentivizedPoolById() {
      return (id: string) => this.incentivizedPools.find(pool => pool.pool_id === id)
    },
    incentivizedPoolByIdAndDuration() {
      return (id: string, duration: string) => this.incentivizedPools.find(
        pool => pool.pool_id === id && pool.lockable_duration === duration
      )
    },
    lockableDuration({ rawLockableDurations }) {
      return rawLockableDurations
        .map(duration => mapLockableDuration(duration))
        .sort((left, right) => {
          return left.duration > right.duration ? 1 : -1;
        });
    },
    epochByIdentifier() {
      return (identifier: string) => this.epochs.find(
        epoch => epoch.identifier === identifier
      )
    },
    extraGaugeByPoolIdAndDuration({ extraGauges }) {
      return (id: string, duration: string) => extraGauges.filter(
        gauge =>
          gauge.distribute_to.denom === `gamm/pool/${id}`
          &&
          gauge.distribute_to.duration === duration
      )
    },
	},
  persistedState: {
		persist: false,
	}
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePools, import.meta.hot))
}

export default usePools
