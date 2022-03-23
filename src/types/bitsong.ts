import { DenomUnit } from './chain'

export interface BitsongFantokenMetaData {
	description: string
	denom_units: DenomUnit[]
	base: string
	display: string
	name: string
	symbol: string
}

export interface BitsongFantoken {
	name: string
	max_supply: string
	mintable: boolean
	owner: string
	meta_data: BitsongFantokenMetaData	
}
