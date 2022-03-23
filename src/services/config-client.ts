import HttpClient from './http-client';
import { AssetListConfig, ExtraGaugeList } from '@/types';

export default class ConfigClient extends HttpClient {
  public constructor(url: string) {
    super(url)
  }

  public assetLists = () => this.instance.get<AssetListConfig>('assetlist.json')

  public extraGauges = () => this.instance.get<ExtraGaugeList>('extragauge.json')
}
