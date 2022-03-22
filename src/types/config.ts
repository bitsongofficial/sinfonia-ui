export type TokenLogo = 'svg' | 'png'

export interface BaseToken {
	name: string
	symbol: string
	logos: { [key in TokenLogo]: string }
	ibcDenom: string // IBC Denom on Osmosis Chain
}

export interface CoinLookup {
	viewDenom: string
	chainDenom: string
	chainToViewConversionFactor: number
}

export interface IBC {
	sourceChannelId: string
	destChannelId: string
	sourceDenom: string
}

export interface Token extends BaseToken {
	chainID: string
	apiURL: string
	rpcURL: string
	explorerURL: string
	minBlockHeight: number
	coinLookup: CoinLookup[]
	addressPrefix: string
	coinGeckoId: string
	coinType: number
	ibc: IBC
	ibcEnabled: boolean
}

export type Social = 'instagram' | 'facebook' | 'website' | 'twitter' | 'spotify'

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

export interface Fantoken extends BaseToken {
	denom: string
	socials: FantokenSocial[]
	media: FantokenMedia
	whitepaper: FantokenWhitePaper
}

export interface ConfigVersion {
	major: number
	minor: number
	patch: number
}

export interface AssetListConfig {
	mainToken: Token
	tokens: Token[]
	fantokens: Fantoken[]
	timestamp: string
	version: ConfigVersion
}

export interface ExtraGauge {
	gaugeId: string
	denom: string
}

export interface ExtraGaugeList {
	[key: string]: ExtraGauge[]
}
