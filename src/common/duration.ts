import { LockableDuration } from "@/types"
import { intervalToDuration, formatDuration } from "date-fns"
import { parse, toMilliseconds, Duration } from "duration-fns"
import locale from "date-fns/locale/en-US"

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

export const formatDistanceLocale = {
	lessThanXSeconds: "{{count}} sec",
	xSeconds: "{{count}} sec",
	halfAMinute: "30 sec",
	lessThanXMinutes: "{{count}} min",
	xMinutes: "{{count}} min",
	aboutXHours: "{{count}} hrs",
	xHours: "{{count}} hrs",
	xDays: "{{count}} days",
	aboutXWeeks: "{{count}} weeks",
	xWeeks: "{{count}} weeks",
	aboutXMonths: "{{count}} months",
	xMonths: "{{count}} months",
	aboutXYears: "{{count}} years",
	xYears: "{{count}} years",
	overXYears: "{{count}} years",
	almostXYears: "{{count}} years",
}

const formatDistance = (token, count, options) => {
	options = options || {}

	const result = formatDistanceLocale[token].replace("{{count}}", count)

	if (options.addSuffix) {
		if (options.comparison > 0) {
			return "in " + result
		} else {
			return result + " ago"
		}
	}

	return result
}

export const formatDurationLocale = (secs: number | string) => {
	const seconds = parseInt(secs.toString(), 10)
	const interval = intervalToDuration({ start: 0, end: seconds * 1000 })

	return formatDuration(interval, {
		locale: {
			...locale,
			formatDistance,
		},
	})
}

export const formatDurationWithSeparator = (secs: number, separator = ":") => {
	const duration = intervalToDuration({ start: 0, end: secs * 1000 })

	const elements = [duration.minutes, duration.seconds]

	if (duration.hours && duration.hours > 0) {
		elements.unshift(duration.hours)
	}

	return elements.map((value) => `${value}`.padStart(2, "0")).join(separator)
}
