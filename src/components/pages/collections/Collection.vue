<script setup lang="ts">
import useConfig from "@/store/config"
import useNFT from "@/store/nft"
import useSettings from "@/store/settings"
import Tabs from "@/components/Tabs.vue"
import CollectionSocials from "@/components/CollectionSocials.vue"
import Title from "@/components/typography/Title.vue"
import NFTCard from "@/components/cards/NFTCard.vue"
import LargeButton from "@/components/buttons/LargeButton.vue"
import { isValidContractAddress } from "@/common"
import { computed, onMounted, onUnmounted, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import { FantokenTab } from "@/types"

const route = useRoute()
const router = useRouter()
const configStore = useConfig()
const settingsStore = useSettings()
const NFTStore = useNFT()

const address = route.params.address as string

const collection = computed(() => NFTStore.collection(address))

const collectionWatcher = watch(
	() => NFTStore.collection(address),
	(collection) => {
		if (collection && collection.init) {
			document.title = `${collection.init.name} Collection`

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
		NFTStore.loadNFTs(address)
	}
})

onUnmounted(() => {
	collectionWatcher()
})

const topImageStyle = computed(
	() =>
		`background: linear-gradient(360deg, #220D32 3.59%, rgba(34, 13, 50, 0) 176.73%), url(${
			collection.value?.metadata?.cover ?? ""
		});`
)

const topImageStyleLight = computed(
	() =>
		`background: linear-gradient(360deg, #F0EDF2 3.59%, rgba(240, 237, 242, 0) 100.73%), url(${
			collection.value?.metadata?.cover ?? ""
		});`
)

const tabs = computed(() => {
	const links: FantokenTab[] = [{ name: "nfts", label: "NFTs" }]

	links.push({ name: "details", label: "Details" })

	links.push({ name: "social", label: "Social" })

	return links
})
</script>

<template>
	<div class="text-white text-weight-medium" v-if="collection">
		<div
			class="absolute-top full-width -z-1 hv-3/5 !bg-cover !bg-center"
			:style="$q.dark.isActive ? topImageStyle : topImageStyleLight"
		>
			<div
				class="absolute left-0 top-99 full-width window-height main-page-background-helper"
			></div>
		</div>
		<div class="row q-mb-70">
			<div class="col-8 col-md-4">
				<div class="flex q-mb-60 items-start items-center-xs column-xs">
					<q-avatar size="120px" class="q-mr-40 q-mr-xs-0 q-mb-14">
						<img :src="collection?.metadata?.image" :alt="collection?.init?.name" />
					</q-avatar>
					<div class="text-center-xs">
						<p class="text-dark q-mb-18 fs-21">
							{{ collection?.init?.name }}
						</p>
						<p class="fs-60 q-mb-20 text-weight-bold">
							{{ collection?.init?.symbol }}
						</p>
						<div class="flex column-xs row items-center-xs items-end justify-center">
							<div class="flex column q-mb-xs-14">
								<p class="text-dark fs-16 text-uppercase q-mb-16">NFTs</p>
								<p class="fs-32">{{ NFTStore.nfts.length }}</p>
							</div>
							<LargeButton
								:padding-x="30"
								:padding-y="14"
								class="q-ml-xs-0 q-ml-46"
								fit
								:to="`/collections/${address}/mint`"
							>
								Mint NFT
							</LargeButton>
						</div>
					</div>
				</div>
			</div>
		</div>
		<Tabs :options="tabs">
			<template v-slot:nfts>
				<div>
					<Spinner v-if="NFTStore.loadingNFTs" class="!w-50 !h-50 q-mx-auto" />
					<div
						v-else
						class="grid grid-cols-min-xs-1 grid-cols-2 grid-cols-md-3 grid-cols-lg-4 grid-gap-30 q-mb-74"
					>
						<RouterLink
							v-for="(nft, index) in NFTStore.nfts"
							:key="index"
							:to="`/collections/${address}/details/nft/${nft.token_id}`"
							class="block full-height"
						>
							<NFTCard :nft="nft" />
						</RouterLink>
					</div>
				</div>
			</template>
			<template
				v-slot:social
				v-if="collection.metadata && collection.metadata.external_urls"
			>
				<div class="row q-pt-18 q-col-gutter-x-md">
					<div class="col-8 col-md-2 column justify-between">
						<p class="fs-18 opacity-50 gt-sm">Follow on socials</p>
					</div>
					<div
						class="col-8 col-md-4"
						v-if="collection.metadata && collection.metadata.external_urls"
					>
						<p class="fs-18 opacity-50 lt-md q-mb-8">Follow on socials</p>
						<CollectionSocials :external-links="collection.metadata.external_urls" />
					</div>
				</div>
			</template>
			<template v-slot:details>
				<div v-if="collection.metadata">
					<Title :font-size="24">Description</Title>
					<Title class="text-dark q-mt-16" :font-size="16">{{
						collection.metadata.description
					}}</Title>
				</div>
			</template>
		</Tabs>
	</div>
</template>
