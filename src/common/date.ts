import { parseISO, format } from "date-fns"

export const formatEpochDate = (date: string) => {
    const epochDate = parseISO(date)

    return format(epochDate, 'd MMM')
}