import { ChainPaginationResponse, ChainPaginationParams } from "@/types"
import { BitsongFantoken } from "@/types/bitsong"
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
}
