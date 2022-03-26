import { GaugeToken, OsmosisLock } from "./osmosis"
export interface LockableDuration {
	rawDuration: string
	duration: number
	milliseconds: number
	readableDuration: string
}

export interface LockableDurationWithApr extends LockableDuration {
	lockedLonger?: OsmosisLock
	extraGagues: GaugeToken[]
	apr: string
}
