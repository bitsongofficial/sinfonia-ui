export interface LockableDuration {
	rawDuration: string
	duration: number
	milliseconds: number
	readableDuration: string
}

export interface LockableDurationWithApr extends LockableDuration {
	apr: string
}