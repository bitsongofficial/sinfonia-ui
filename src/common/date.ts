import {
	parseISO,
	format,
	compareAsc,
	formatDistanceToNowStrict,
} from "date-fns"

const defaultLockEndTime = new Date("0001-01-01T00:00:00Z")

export const formatTimeLocate = (date: string | Date) => {
	return format(new Date(date), "MMM d yyyy, HH:mm aaa")
}

export const unboundingEndTimeStart = (endTime: string) => {
	const endTimeDate = new Date(endTime)

	return compareAsc(endTimeDate, defaultLockEndTime) !== 0
}

export const fromNow = (time: string) => {
	const startDate = new Date(time)

	return formatDistanceToNowStrict(startDate)
}

export const formatEpochDate = (date: string) => {
	const epochDate = parseISO(date)

	return format(epochDate, "d MMM")
}
