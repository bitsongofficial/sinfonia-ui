import { LockableDuration } from "@/types"
import { intervalToDuration, formatDuration } from "date-fns"
import { toMilliseconds } from "duration-fns"

export const mapLockableDuration = (durationStr: string): LockableDuration => {
	const duration = parseInt(durationStr.replace("s", "")) // Seconds

	return {
		rawDuration: durationStr,
		duration,
		milliseconds: toMilliseconds({ seconds: duration }),
		readableDuration: formatDuration(
			intervalToDuration({ start: 0, end: duration * 1000 })
		),
	}
}
