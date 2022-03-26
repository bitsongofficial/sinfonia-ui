export enum SessionType {
	KEPLR = "keplr",
	EXTENSION = "extension",
	EXPLORE = "explore",
}

export interface Session {
	sessionType: SessionType
	addresses: string[]
}
