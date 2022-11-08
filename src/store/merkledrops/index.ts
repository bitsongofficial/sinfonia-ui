import { acceptHMRUpdate, defineStore } from "pinia"
import apolloClient, {
	merkledropsWithProofsByAddress,
	merkledropsList,
} from "@/services/sinfonia-gql"
import {
	Merkledrop,
	MerkledropProof,
	MerkledropWithProof,
	MerkledropsWithProofsByAddress,
	BitsongMerkledrop,
} from "@/types"
import { sinfoniaClient } from "@/services"
import Decimal from "decimal.js"
import { BlockResponse } from "@cosmjs/launchpad"
import { add, sub } from "date-fns"
import { formatTimeLocate } from "@/common"
import useConfig from "@/store/config"

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
		async loadAirdrops(address?: string) {
			try {
				this.loading = true

				const {
					data: { merkledrops, merkledropProofs },
				} = await apolloClient.query<MerkledropsWithProofsByAddress>({
					query: address ? merkledropsWithProofsByAddress : merkledropsList,
					variables: {
						address: address,
					},
				})

				const merkledropIds = merkledrops.map(
					(merkledrop) => merkledrop.merkledrop_id
				)

				this.bitsongBlock = await sinfoniaClient.bitsongBlocks()
				const merkledropsDetails = await sinfoniaClient.merkledrops(merkledropIds)
				const proofs: MerkledropProof[] = []

				for (const proof of merkledropProofs ?? []) {
					const isClaimed = await sinfoniaClient.merkledropClaimed(
						proof.merkledrop_id,
						proof.index
					)

					proofs.push({
						...proof,
						claimed: isClaimed,
					})
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
