import { Dictionary } from "lodash"
import {
	FantokenAirdrop,
	FantokenMedia,
	FantokenSocial,
	FantokenWhitePaper,
	FantokenMetadata,
} from "./fantoken"

export type TokenLogo = "default" | "svg" | "png"

export interface BaseToken {
	name: string
	symbol: string
	logos: { [key in TokenLogo]?: string }
}

export interface CoinLookup {
	viewDenom: string
	chainDenom: string
	fantokenDenom?: string
	chainToViewConversionFactor: number
}

export type IBCChain = "osmosis"

export interface IBC {
	sourceChannelId: string
	destChannelId: string
	destDenom: string // IBC Denom on Destination Chain (Ex: Osmosis)
	sourceDenom: string // IBC Denom on Source Chain (Ex: Bitsong)
}

export enum FeeType {
	LOW = "low",
	AVERAGE = "average",
	HIGH = "high",
}

export interface NetworkConfigFeeOption {
	denom: string
	amount: string
	type: FeeType
}

export interface NetworkConfigFee {
	gasEstimate: number
	feeOptions: NetworkConfigFeeOption[]
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
	ibc: { [key in IBCChain]: IBC }
	fees: {
		default: NetworkConfigFee
		[key: string]: NetworkConfigFee
	}
	routes?: {
		poolID: string
	}
	ibcEnabled?: boolean
	fantoken?: boolean
	socials?: FantokenSocial
	media?: FantokenMedia
	airdrop?: FantokenAirdrop
	whitepaper?: FantokenWhitePaper
	metadata?: FantokenMetadata
}

export interface TokenWithAddress extends Token {
	address?: string
}

export interface ConfigVersion {
	major: number
	minor: number
	patch: number
}

export interface ActivePool {
	id: string
}

export interface SwapRoute {
	id: string
	out: string
}

export interface AssetListConfig {
	bitsongToken: Token
	osmosisToken: Token
	tokens: Token[]
	fantokens: Token[]
	pools: ActivePool[]
	routes: Dictionary<Dictionary<SwapRoute[]>>
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
