import useConfig from "@/store/config"
import { onUnmounted, watch } from "vue"

const onAppReady = (fn: () => void) => {
	const configStore = useConfig()

	const watchAssetsConfig = watch(
		() => configStore.assetsConfig,
		(assetConfig, oldAssetConfig) => {
			if (oldAssetConfig === undefined && assetConfig) {
				fn()
			}
		},
		{
			immediate: true,
		}
	)

	onUnmounted(() => {
		watchAssetsConfig()
	})
}

export default onAppReady
