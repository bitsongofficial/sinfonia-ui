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

	public merkledrop = (id: number) =>
		this.instance.get<ChainData<"merkledrop", BitsongMerkledrop>>(
			`bitsong/merkledrop/v1beta1/markledrops/${id}`
		)
}
