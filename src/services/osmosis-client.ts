import {
	ChainPaginationResponse,
	ChainPaginationParams,
	ChainData,
	OsmosisPool,
	Epoch,
	Gauge,
	IncentivizedPool,
	OsmosisLock,
	MintParams,
	DistrInfo,
} from "@/types"
import { Coin } from "@cosmjs/proto-signing"
import ChainClient from "./chain-client"

export default class OsmosisClient extends ChainClient {
	public constructor(url: string) {
		super(url)
	}

	public pools = (params: ChainPaginationParams) =>
		this.instance.get<ChainPaginationResponse<"pools", OsmosisPool[]>>(
			"osmosis/gamm/v1beta1/pools",
			{ params }
		)

	public poolDetails = (poolID: string) =>
		this.instance.get<ChainData<"pool", OsmosisPool>>(
			`osmosis/gamm/v1beta1/pools/${poolID}`
		)

	public epochs = () =>
		this.instance.get<ChainData<"epochs", Epoch[]>>(
			"osmosis/epochs/v1beta1/epochs"
		)

	public poolIncentivesDistrInfo = () =>
		this.instance.get<ChainData<"distr_info", DistrInfo>>(
			"osmosis/pool-incentives/v1beta1/distr_info"
		)

	public accountLockedCoins = (address: string) =>
		this.instance.get<ChainData<"coins", Coin[]>>(
			`osmosis/lockup/v1beta1/account_locked_coins/${address}`
		)

	public accountLockedLongerDuration = (address: string) =>
		this.instance.get<ChainData<"locks", OsmosisLock[]>>(
			`osmosis/lockup/v1beta1/account_locked_longer_duration/${address}`
		)

	public epochProvisions = () =>
		this.instance.get<ChainData<"epoch_provisions", string>>(
			"osmosis/mint/v1beta1/epoch_provisions"
		)

	public lockableDurations = () =>
		this.instance.get<ChainData<"lockable_durations", string[]>>(
			"osmosis/pool-incentives/v1beta1/lockable_durations"
		)

	public gaugeById = (gaugeID: string) =>
		this.instance.get<ChainData<"gauge", Gauge>>(
			`osmosis/incentives/v1beta1/gauge_by_id/${gaugeID}`
		)

	public incentivizedPools = () =>
		this.instance.get<ChainData<"incentivized_pools", IncentivizedPool[]>>(
			"osmosis/pool-incentives/v1beta1/incentivized_pools"
		)

	public mintParams = () =>
		this.instance.get<ChainData<"params", MintParams>>(
			"/osmosis/mint/v1beta1/params"
		)
}
