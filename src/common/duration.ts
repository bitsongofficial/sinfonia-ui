import { LockableDuration } from '@/types'
import { intervalToDuration } from 'date-fns'
import { toMilliseconds } from 'duration-fns'

export const mapLockableDuration = (durationStr: string): LockableDuration => {
	const duration = parseInt(durationStr.replace('s', '')) // Seconds
	const days = intervalToDuration({ start: 0, end: duration * 1000 }).days ?? 0

	return {
		rawDuration: durationStr,
		duration,
		milliseconds: toMilliseconds({ seconds: duration }),
		readableDuration: `${days} ${days <= 1 ? 'day' : 'days'} unbonding`
	}
}
