import { Token } from './config'

export interface TokenBalance extends Token {
	total: string
	available: string
	bonded: string
}
