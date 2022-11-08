<script setup lang="ts">
import { formatShortAddress, isValidContractAddress } from "@/common"
import useConfig from "@/store/config"
import Title from "@/components/typography/Title.vue"
import NFTPlayer from "@/components/nfts/NFTPlayer.vue"
import Spinner from "@/components/Spinner"
import Card from "@/components/cards/Card.vue"
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
			document.title = `${currentNFT.metadata.name} | ${collection.value?.init?.name} | NFT`

			settingsStore.breadcrumbPageTitle = currentNFT.metadata.name
			settingsStore.breadcrumbPrepend = [
				{
					label: collection.value?.init?.name ?? "",
					to: `/nfts/${collection.value?.address}/details`,
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
					:to="`/nfts/${collection.address}/details`"
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
				<div class="col-span-12 q-mb-32 col-span-md-8 col-start-md-1">
					<NFTPlayer
						v-if="nft?.metadata?.animation_url"
						:src="nft?.metadata?.animation_url"
						:poster="nft?.metadata?.image"
						class="max-h-400"
					/>
					<img
						class="w-full max-h-400 object-contain"
						:src="nft?.metadata?.image"
						v-else
					/>
				</div>
				<div
					class="col-span-12 col-span-md-3 col-start-md-10"
					v-if="
						nft?.metadata &&
						nft.metadata.attributes &&
						nft.metadata.attributes.length > 0
					"
				>
					<Card
						:padding="30"
						:transparency="5"
						shadow="none"
						class="full-width text-white transition-all light:bg-white !flex column justify-between no-wrap"
					>
						<Title :font-size="18" class="q-mb-16">Attributes</Title>
						<template v-for="(attribute, index) of nft.metadata.attributes">
							<div class="column">
								<p class="fs-12 text-weight-medium opacity-40 q-pb-10 text-capitalize">
									{{ attribute.trait_type }}
								</p>
								<p class="fs-16 !leading-20 text-weight-medium work-break-all">
									{{ attribute.value }}
								</p>
							</div>
							<q-separator
								class="q-my-16 opacity-50"
								v-if="index !== nft.metadata.attributes.length - 1"
							/>
						</template>
					</Card>
				</div>
				<div class="col-span-12" v-if="nft && nft.metadata">
					<div class="q-mb-64" v-if="nft.metadata.description">
						<Title :font-size="24" class="q-mb-16">Description</Title>

						<p class="opacity-50">{{ nft.metadata.description }}</p>
					</div>
				</div>
			</div>
		</template>
		<Spinner v-else class="!w-50 !h-50 q-mx-auto" />
	</div>
</template>
