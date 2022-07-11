import { fromBech32 } from "@cosmjs/encoding"

export const isValidAddress = (
	address: string,
	requiredPrefix: string
): boolean => {
	try {
		const { prefix, data } = fromBech32(address)

		if (prefix !== requiredPrefix) {
			return false
		}

		return data.length === 20
	} catch {
		return false
	}
}

export const formatShortAddress = (address: string | undefined, end = 4) => {
	if (!address) {
		return "Address Not Found"
	}

	const splitted = address.split("1")

	return `${splitted.shift() ?? ""}1...${address.slice(-end)}`
}
