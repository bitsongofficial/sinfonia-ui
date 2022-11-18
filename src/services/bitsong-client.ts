import {
	BitsongFantoken,
	BitsongMerkledrop,
	ChainPaginationResponse,
	ChainPaginationParams,
	ChainData,
} from "@/types"
import ChainClient from "./chain-client"

export default class BitsongClient extends ChainClient {
	public constructor(url: string) {
		super(url)
	}

	public fantokens = (params: ChainPaginationParams) =>
		this.instance.get<ChainPaginationResponse<"tokens", BitsongFantoken[]>>(
			"bitsong/fantoken/v1beta1/fantokens",
			{ params }
		)

	public merkledrop = async (id: number) => {
		try {
			const response = await this.instance.get<ChainData<"merkledrop", BitsongMerkledrop>>(
				`bitsong/merkledrop/v1beta1/markledrops/${id}`
			)

			return response
		} catch (error) {
			return undefined
		}
	}

	public merkledropClaimed = (id: number, index: number) =>
		this.instance.get<ChainData<"is_claimed", boolean>>(
			`/bitsong/merkledrop/v1beta1/markledrops/${id}/index_claimed/${index}`
		)
}
