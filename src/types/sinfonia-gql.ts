export interface MerkledropResponse {
	merkledrops: Merkledrop[]
}

export interface Merkledrop {
	merkledrop_id: number
	denom: string
	amount: number
	start_height: number
	end_height: number
	name: string
	image: string
	uri: string
}

export interface MerkledropProof {
	merkledrop_id: number
	address: string
	index: number
	proofs: string[]
	amount: number // User amount claim
	claimed?: boolean
}

export interface MerkledropWithDetails extends Merkledrop{
	details?: MerkledropProof
}

export interface MerkledropWithProof extends Merkledrop {
	claimedPercentage: string
	claimed: string
	endTime: string
	active: boolean
	symbol: string
	owner?: string
	proof?: MerkledropProof
}

export interface MerkledropsWithProofsByAddress {
	merkledrops: Merkledrop[]
	merkledropProofs?: MerkledropProof[]
}
