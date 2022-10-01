import { Coin } from "@cosmjs/proto-signing"
import { Token } from "./config"

export interface PoolParams {
	swap_fee: string
	exit_fee: string
	smooth_weight_change_params: string | null
}

export interface OsmosisPoolAsset {
	token: Coin
	weight: string
}

export interface OsmosisPool {
	address: string
	id: string
	pool_params: PoolParams
	future_pool_governor: string
	total_shares: Coin
	pool_assets: OsmosisPoolAsset[]
	total_weight: string
}

export interface OsmosisLock {
	ID: string
	duration: string
	end_time: string
	owner: string
	coins: Coin[]
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

export interface CoinToken extends Coin {
	token?: Token
}

export interface GaugeToken extends Gauge {
	coins: CoinToken[]
	numEpochsPaidOver: number
	filledEpochs: number
	leftEpochs: number
	endTime: string
	apr: string
}

export interface DistributionProportions {
	staking: string
	pool_incentives: string
	developer_rewards: string
	community_pool: string
}

export interface MintParams {
	mint_denom: string
	genesis_epoch_provisions: string
	epoch_identifier: string
	reduction_period_in_epochs: string
	reduction_factor: string
	distribution_proportions: DistributionProportions
}

export interface DistrInfoGauge {
	gauge_id: string
	weight: string
}

export interface DistrInfo {
	total_weight: string
	records: DistrInfoGauge[]
}

export interface OsmosisRoute {
	poolId: string
	tokenOutDenom: string
}

export interface LockedGauge {
	gaugeID: string
	denom: string
	lockSum: string
}
