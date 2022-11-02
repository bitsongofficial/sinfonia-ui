<script setup lang="ts">
import { isValidContractAddress } from "@/common"
import useConfig from "@/store/config"
import useNFT from "@/store/nft"
import useSettings from "@/store/settings"
import { onMounted, onUnmounted, watch } from "vue"
import { useRoute, useRouter } from "vue-router"

const route = useRoute()
const router = useRouter()
const configStore = useConfig()
const settingsStore = useSettings()
const NFTStore = useNFT()

const address = route.params.address as string

const collectionWatcher = watch(
	() => NFTStore.collection(address),
	(collection) => {
		if (collection && collection.init) {
			settingsStore.breadcrumbPageTitle = collection.init.name
		}
	},
	{ immediate: true }
)

onMounted(() => {
	if (
		!address ||
		(configStore.bitsongToken &&
			!isValidContractAddress(address, configStore.bitsongToken.addressPrefix))
	) {
		router.replace({ name: "NotFound" })
	} else {
		NFTStore.loadCollection(address)
	}
})

onUnmounted(() => {
	collectionWatcher()
})
</script>

<template>
	<div>ciao</div>
</template>
