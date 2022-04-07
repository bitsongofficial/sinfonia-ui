import { GaugeToken, OsmosisLock } from "./osmosis"

export interface LockableDuration {
	rawDuration: string
	duration: number
	milliseconds: number
	readableDuration: string
}

export interface LockCoin extends OsmosisLock {
	durationMap: LockableDuration
}

export interface LockableDurationWithApr extends LockableDuration {
	bondedCoin?: OsmosisLock
	unbondedCoins: LockCoin[]
	extraGauges: GaugeToken[]
	osmosisApr: string
	apr: string
	totalApr: string
}
