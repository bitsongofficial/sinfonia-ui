import { acceptHMRUpdate, defineStore } from "pinia"
import {
	Merkledrop,
	MerkledropProof,
	MerkledropWithProof,
	BitsongMerkledrop,
	MerkledropResponse,
	MerkledropWithDetails,
} from "@/types"
import { sinfoniaClient } from "@/services"
import Decimal from "decimal.js"
import { BlockResponse } from "@cosmjs/launchpad"
import { add, sub } from "date-fns"
import { formatTimeLocate, validateIPFSURI } from "@/common"
import useConfig from "@/store/config"
import { getIPFSFile } from "@/services/ipfs"
import { compact } from "lodash"

export interface MerkleDropsState {
	loading: boolean
	merkledrops: Merkledrop[]
	merkledropsDetails: BitsongMerkledrop[]
	merkledropProofs: MerkledropProof[]
	bitsongBlock?: BlockResponse
}

const useMerkledrops = defineStore("merkledrops", {
	state: (): MerkleDropsState => ({
		loading: false,
		merkledrops: [],
		merkledropsDetails: [],
		merkledropProofs: [],
	}),
	actions: {
		async loadProof(address: string, merkledrop: Merkledrop): Promise<MerkledropProof | undefined> {
			try {
				const CID = validateIPFSURI(merkledrop.uri)

				if (CID) {
					const response = await getIPFSFile<MerkledropProof>(`${CID}/${address}.json`)

					return ({
						...response.result,
						merkledrop_id: merkledrop.merkledrop_id
					})
				}
			} catch (error) {
				console.error(error)
				return undefined
			}
		},
		async loadAirdrops(address?: string) {
			try {
				this.loading = true

				let merkledrops: MerkledropWithDetails[] = []
				let merkledropProofs: MerkledropProof[] = []

				const response = await getIPFSFile<MerkledropResponse>(import.meta.env.VITE_AIRDROPS_CID)

				merkledrops = response.result.merkledrops

				if (address) {
					const requests = response.result.merkledrops.map(merkledrop => this.loadProof(address, merkledrop))
					const responses = (await Promise.allSettled(requests)).filter(result => result.status === "fulfilled")

					// @ts-ignore
					merkledropProofs = responses.map((result) => result.value)
					merkledropProofs = compact(merkledropProofs)
				}

				const merkledropIds = merkledrops.map(
					(merkledrop) => merkledrop.merkledrop_id
				)

				this.bitsongBlock = await sinfoniaClient.bitsongBlocks()
				const merkledropsDetails = await sinfoniaClient.merkledrops(merkledropIds)
				const proofs: MerkledropProof[] = []

				for (const proof of merkledropProofs) {
					if (proof) {
						const isClaimed = await sinfoniaClient.merkledropClaimed(
							proof.merkledrop_id,
							proof.index
						)
	
						proofs.push({
							...proof,
							merkledrop_id: proof.merkledrop_id,
							claimed: isClaimed,
						})
					}
				}

				this.merkledropsDetails = merkledropsDetails
				this.merkledropProofs = proofs
				this.merkledrops = merkledrops
			} catch (error) {
				console.error(error)
				throw error
			} finally {
				this.loading = false
			}
		},
	},
	getters: {
		merkledropsWithProofs: ({
			merkledrops,
			merkledropsDetails,
			merkledropProofs,
			bitsongBlock,
		}): MerkledropWithProof[] => {
			const configStore = useConfig()

			return merkledrops.map((merkledrop) => {
				const proof = merkledropProofs.find(
					(merkledropProof) =>
						merkledropProof.merkledrop_id === merkledrop.merkledrop_id
				)

				const details = merkledropsDetails.find(
					(merkledropsDetail) =>
						merkledropsDetail.id === merkledrop.merkledrop_id.toString()
				)

				const claimed = new Decimal(details ? details.claimed : "0")
				const owner = details ? details.owner : ""
				const total = new Decimal(merkledrop.amount)
				let endTime = ""
				let active = true
				let symbol = ""

				if (details) {
					const token = configStore.findTokenByDenom(details.denom)

					if (token) {
						symbol = token.symbol
					}
				}

				if (claimed.eq(total)) {
					// If we reach the max distribution, we can disable claim functionality
					active = false
				}

				if (bitsongBlock) {
					const lastHeight = new Decimal(bitsongBlock.block.header.height)
					const endHeight = new Decimal(merkledrop.end_height)
					const lastTime = new Date(bitsongBlock.block.header.time)
					const estimatedBlockTime = new Decimal(
						import.meta.env.VITE_ESTIMATED_BLOCK_TIME ?? "6020"
					) // ms

					if (lastHeight.gt(endHeight)) {
						// If the latest block of the chain is greater then the endHeight, we must disable claim functionality
						active = false
					} else {
						const offsetHeight = endHeight.minus(lastHeight)
						const offsetTime = offsetHeight.mul(estimatedBlockTime.div(1000)) // seconds time diff
						let endTimeDate = new Date()

						if (!offsetHeight.lt(0)) {
							endTimeDate = add(lastTime, { seconds: offsetTime.toNumber() })
						} else {
							endTimeDate = sub(lastTime, { seconds: offsetTime.toNumber() })
						}

						endTime = formatTimeLocate(endTimeDate)
					}
				}

				return {
					...merkledrop,
					endTime,
					active,
					symbol,
					proof,
					owner,
					amount: total.mul(1e-6).toNumber(),
					claimed: claimed.toString(),
					claimedPercentage: claimed.div(total).toString(),
				}
			})
		},
	},
	persistedState: {
		persist: false,
	},
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useMerkledrops, import.meta.hot))
}

export default useMerkledrops
