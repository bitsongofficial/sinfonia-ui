import { LockableDuration } from "@/types"
import { intervalToDuration, formatDuration } from "date-fns"
import { parse, toMilliseconds, Duration } from "duration-fns"

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

export const epochIdentifierToDuration = (
	epochIdentifier: string,
	epochs: string | number = "1"
): Duration => {
	switch (epochIdentifier) {
		case "hour":
		case "second":
		case "minute":
			return parse(`PT${epochs}${epochIdentifier.charAt(0).toUpperCase()}`)
		default:
			return parse(`P${epochs}${epochIdentifier.charAt(0).toUpperCase()}`)
	}
}
