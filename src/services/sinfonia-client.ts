import OsmosisClient from './osmosis-client';
import ConfigClient from './config-client';
import { AssetListConfig } from '@/types';

export default class SinfoniaClient {
	private osmosisClient: OsmosisClient
	private configClient: ConfigClient

  public constructor(osmosisUrl: string, configUrl: string) {
    this.osmosisClient = new OsmosisClient(osmosisUrl)
    this.configClient = new ConfigClient(configUrl)
  }

	public pools = () => this.osmosisClient.pools({ 'pagination.limit': '750' })

	public assetLists = () => this.configClient.assetLists()
}
