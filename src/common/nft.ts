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

export const IPFSRegex = /ipfs:\/\/(.{46})/

export const validateIPFSURI = (str: string) => {
	let m: RegExpExecArray | null

	if ((m = IPFSRegex.exec(str)) !== null) {
		return m.pop()
	}
}

export const fromIPFSURIToHttps = (uri: string) => {
	const CID = validateIPFSURI(uri)

	if (CID) {
		return `${import.meta.env.VITE_IPFS_SERVER_URL}ipfs/${CID}`
	}

	return uri
}