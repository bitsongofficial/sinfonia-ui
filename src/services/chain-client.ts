import HttpClient from './http-client';
import { ChainError, ChainResponse } from '@/types';
import { Coin } from '@cosmjs/proto-signing';
import { AxiosError } from 'axios';

export default class ChainApi extends HttpClient {
  public constructor(url: string) {
    super(url)
  }

  public bankBalances = (address: string) => this.instance.get<ChainResponse<Coin[]>>(`bank/balances/${address}`)

  protected _handleError = (error: AxiosError<ChainError>) => Promise.reject(error);
}
