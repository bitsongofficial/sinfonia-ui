import HttpClient from './http-client';
import { CoinGeckoPriceResponse } from '@/types'

export default class CoinGeckoClient extends HttpClient {
  public constructor(url: string) {
    super(url)
  }

  public simplePrices = (ids: string[], currencies: string[]) => this.instance.get<CoinGeckoPriceResponse>('simple/price', {
		params: {
			ids: ids.join(','),
			vs_currencies: currencies.join(',')
		}
  })
}
