export type Social =
	| "instagram"
	| "facebook"
	| "website"
	| "twitter"
	| "spotify"

export interface FantokenSocialLink {
	type: Social
	url: string
}

export interface FantokenSocial {
	mailchimpID: string
	links: FantokenSocialLink[]
}

export interface FantokenMedia {
	hero: string
}

export interface FantokenContentBlock {
	title: string
	content: string
}

export interface FantokenUseCases extends FantokenContentBlock {
	cases: FantokenContentBlock[]
}

export interface FantokenTokenomicsQuantity extends FantokenContentBlock {
	percentage: string
}

export interface FantokenTokenomics {
	title: string
	totalSupply: string
	initialMarketCap: string
	quantities: FantokenTokenomicsQuantity[]
	vestingTokens: string
}

export interface FantokenRoadmapEntry {
	title: string
	time: string
	events: Partial<FantokenContentBlock>[]
}

export interface FantokenRoadmap {
	list: FantokenRoadmapEntry[]
}

export interface FantokenWhitePaper {
	biography: FantokenContentBlock
	project: FantokenContentBlock
	useCases: FantokenUseCases[]
	tokenomics: FantokenTokenomics
	roadmap: FantokenRoadmap
}
