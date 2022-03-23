import { Coin } from '@cosmjs/proto-signing'

export interface PoolParams {
	swapFee: string
	exitFee: string
	smoothWeightChangeParams: string | null
}

export interface OsmosisPoolAsset {
	token: Coin;
	weight: string;
}

export interface OsmosisPool {
	address: string
	id: string
	poolParams: PoolParams
	future_pool_governor: string
	totalShares: Coin
	poolAssets: OsmosisPoolAsset[]
	totalWeight: string;
}

export interface IncentivizedPool {
	gauge_id: string
	lockable_duration: string
	pool_id: string
}

export interface Epoch {
	identifier: string
	start_time: string
	duration: string
	current_epoch: string
	current_epoch_start_time: string
	epoch_counting_started: boolean
	current_epoch_start_height: string
}

export interface GaugeDistribution {
	denom: string
	duration: string
	lock_query_time: string
	timestamp: string
}

export interface Gauge {
	coins: Coin[]
	distribute_to: GaugeDistribution
	distributed_coins: Coin[]
	filled_epochs: string
	id: string
	is_perpetual: boolean
	num_epochs_paid_over: string
	start_time: string
}