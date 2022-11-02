export const convertListToMap = (
	list: object[],
	key: string,
	secondKey: string
) => {
	const map = {} as Record<string, string>
	for (const ele of list) {
		map[ele[key]] = ele[secondKey]
	}
	return map
}
