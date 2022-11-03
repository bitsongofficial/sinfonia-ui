<script setup lang="ts">
import useConfig from "@/store/config"
import useNFT from "@/store/nft"
import useSettings from "@/store/settings"
import Spinner from "@/components/Spinner"
import Card from "@/components/cards/Card.vue"
import IconButton from "@/components/buttons/IconButton.vue"
import Title from "@/components/typography/Title.vue"
import NFTCard from "@/components/cards/NFTCard.vue"
import LargeButton from "@/components/buttons/LargeButton.vue"
import { formatShortAddress, isValidContractAddress } from "@/common"
import { computed, onMounted, onUnmounted, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import useClipboard from "@/hooks/useClipboard"

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

const { onCopy } = useClipboard()
</script>

<template>
	<div class="text-white text-weight-medium" v-if="collection">
		<div class="w-full position-relative q-mb-60">
			<q-img
				class="w-full rounded-20"
				:src="collection.metadata?.cover"
				ratio="16/9"
				alt="Cover"
				title="Cover"
				width="100%"
				height="300px"
			/>

			<img
				class="absolute-bottom !left-24 !-bottom-24 border-white-2 w-126 h-126 rounded-full object-cover z-1"
				:src="collection.metadata?.image"
			/>
		</div>
		<div class="q-mb-40 grid grid-cols-12 gap-24">
			<div class="col-span-12 col-span-md-7">
				<Title :font-size="32" class="q-mb-16">{{ collection?.init?.name }}</Title>

				<p class="text-dark q-mb-16">
					<span class="opacity-40 light:opacity-100">Created by</span>
					{{ formatShortAddress(collection.creator) }}
				</p>

				<Title
					v-if="collection.metadata && collection.metadata.description"
					:font-size="18"
					class="q-mb-32"
					>{{ collection.metadata.description }}</Title
				>

				<LargeButton
					:padding-x="30"
					:padding-y="14"
					fit
					:to="`/collections/${address}/mint`"
				>
					Mint NFT
				</LargeButton>
			</div>
			<div class="col-span-12 col-span-md-3 col-start-md-10">
				<Card
					:padding="30"
					:transparency="5"
					shadow="none"
					class="full-width text-white transition-all light:bg-white full-height !flex column justify-between no-wrap"
				>
					<div class="column">
						<p class="fs-12 text-weight-medium opacity-40 q-pb-10">Items</p>
						<p class="fs-16 !leading-20 text-weight-medium work-break-all">
							{{ NFTStore.nfts.length }}
						</p>
					</div>
					<q-separator class="q-my-16 opacity-50" />
					<div class="column">
						<p class="fs-12 !leading-14 text-weight-medium opacity-40 q-pb-10">
							Address
						</p>
						<div class="row justify-between">
							<p class="fs-16 !leading-20 text-weight-medium work-break-all">
								{{ formatShortAddress(collection.address) }}
							</p>

							<IconButton
								icon="copy"
								width="20"
								height="20"
								class="text-primary-light fs-16"
								v-if="collection"
								@click="onCopy(collection?.address)"
							/>
						</div>
					</div>
				</Card>
			</div>
		</div>

		<Spinner v-if="NFTStore.loadingNFTs" class="!w-50 !h-50 q-mx-auto" />

		<div
			v-else
			class="grid grid-cols-min-xs-1 grid-cols-2 grid-cols-md-3 grid-cols-lg-4 grid-gap-30 q-mb-74"
		>
			<RouterLink
				v-for="(nft, index) in NFTStore.bitsongNFTs"
				:key="index"
				:to="`/collections/${address}/details/nft/${nft.token_id}`"
				class="block full-height"
			>
				<NFTCard :nft="nft" />
			</RouterLink>
		</div>
	</div>
	<Spinner v-else-if="NFTStore.loading" class="!w-50 !h-50 q-mx-auto" />
</template>
