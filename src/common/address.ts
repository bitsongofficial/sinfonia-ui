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
