<script setup lang="ts">
import { formatShortAddress, isValidContractAddress } from "@/common"
import useConfig from "@/store/config"
import Title from "@/components/typography/Title.vue"
import Spinner from "@/components/Spinner"
import useNFT from "@/store/nft"
import useSettings from "@/store/settings"
import { computed, onMounted, onUnmounted, watch } from "vue"
import { useRoute, useRouter, RouterLink } from "vue-router"
import useClipboard from "@/hooks/useClipboard"

const route = useRoute()
const router = useRouter()
const configStore = useConfig()
const settingsStore = useSettings()
const NFTStore = useNFT()

const address = route.params.address as string
const tokenId = route.params.tokenId as string

const collection = computed(() => NFTStore.collection(address))
const nft = computed(() => NFTStore.nft(tokenId))

onMounted(() => {
	if (
		!address ||
		(configStore.bitsongToken &&
			!isValidContractAddress(address, configStore.bitsongToken.addressPrefix))
	) {
		router.replace({ name: "NotFound" })
	} else {
		if (!collection.value) {
			NFTStore.loadCollection(address)
		}

		if (!nft.value) {
			NFTStore.loadNFTs(address)
		}
	}
})

const nftWatcher = watch(
	() => nft.value,
	(currentNFT) => {
		if (currentNFT && currentNFT.metadata) {
			document.title = `${currentNFT.metadata.name} NFT`

			settingsStore.breadcrumbPageTitle = currentNFT.metadata.name
			settingsStore.breadcrumbPrepend = [
				{
					label: collection.value?.init?.name ?? "",
					to: `/collections/${collection.value?.address}/details`,
				},
			]
		}
	},
	{ immediate: true }
)

onUnmounted(() => {
	nftWatcher()
	settingsStore.breadcrumbPrepend = []
})

const { onCopy } = useClipboard()
</script>

<template>
	<div class="text-white text-weight-medium">
		<template v-if="!NFTStore.loadingNFTs">
			<div class="column q-mb-32">
				<RouterLink
					:to="`/collections/${collection.address}/details`"
					v-if="collection"
					class="q-mb-16 row items-center"
				>
					<q-avatar class="q-mr-12" size="32px">
						<img class="border-white-2" :src="collection.metadata?.image" />
					</q-avatar>
					<Title :font-size="21" class="q-mr-32">{{ collection.init?.name }}</Title>
				</RouterLink>
				<Title :font-size="32" class="q-mr-32 q-mb-16">{{
					nft?.metadata?.name
				}}</Title>

				<p class="text-dark cursor-pointer" @click="onCopy(collection?.creator)">
					<span class="opacity-40 light:opacity-100">Created by</span>
					{{ formatShortAddress(collection?.creator) }}
				</p>
			</div>
			<div class="grid grid-cols-12 grid-gap-24">
				<div class="col-span-12 col-span-md-5 col-start-md-4 q-mb-32">
					<img class="w-full" :src="nft?.metadata?.image" />
				</div>
				<div class="col-span-12" v-if="nft && nft.metadata">
					<div class="q-mb-64" v-if="nft.metadata.description">
						<Title :font-size="24" class="q-mb-16">Description</Title>

						<p class="opacity-50">{{ nft.metadata.description }}</p>
					</div>
					<div
						class="q-mb-64"
						v-if="nft.metadata.attributes && nft.metadata.attributes.length > 0"
					>
						<Title :font-size="24" class="q-mb-16">Attributes</Title>

						<div v-for="attribute in nft.metadata.attributes" class="column q-mb-16">
							<Title :font-size="21" class="q-mb-12">{{ attribute.trait_type }}</Title>
							<p class="opacity-50">{{ attribute.value }}</p>
						</div>
					</div>
				</div>
			</div>
		</template>
		<Spinner v-else class="!w-50 !h-50 q-mx-auto" />
	</div>
</template>
