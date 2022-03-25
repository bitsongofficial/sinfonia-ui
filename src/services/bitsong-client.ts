import {
	ChainPaginationResponse,
	ChainPaginationParams,
	ChainData,
} from '@/types';
import { BitsongFantoken } from '@/types/bitsong';
import { Coin } from '@cosmjs/proto-signing';
import ChainClient from './chain-client';

export default class BitsongClient extends ChainClient {
	public constructor(url: string) {
		super(url);
	}

	public fantokens = (params: ChainPaginationParams) => this.instance.get<ChainPaginationResponse<'tokens', BitsongFantoken[]>>(
		'bitsong/fantoken/v1beta1/fantokens',
		{ params }
	)

	public totalBurnedFantokens = () => this.instance.get<ChainData<'burned_coins', Coin[]>>(
		'bitsong/fantoken/v1beta1/total_burn',
	)
}
