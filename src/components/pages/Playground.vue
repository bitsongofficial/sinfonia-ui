<script setup lang="ts">
import { resolveIcon } from "@/common/resolvers"
import { TableColumn } from "@/types"
import { computed, onMounted, ref } from "vue"
import LargeButton from "@/components/buttons/LargeButton.vue"
import Title from "@/components/typography/Title.vue"
import LightTable from "@/components/LightTable.vue"
import useTwitter from "@/store/twitter"
import useAuth from "@/store/auth"

const twitterStore = useTwitter()
const authStore = useAuth()

const accountColumns: TableColumn[] = [
	{
		name: "index",
		label: "",
		align: "left",
		field: "",
	},
	{
		name: "user",
		label: "",
		align: "left",
		field: "",
	},
	{
		name: "account",
		label: "",
		align: "center",
		field: "account",
	},
	{
		name: "address",
		label: "Wallet",
		field: "address",
		align: "right",
	},
]

const searchFocussed = ref(false)
const searchValue = ref("")

const searchActive = computed(() => {
	return searchValue.value.length > 0 || searchFocussed.value
})

const authors = computed(() => {
	const search = searchValue.value.toLocaleLowerCase()

	return twitterStore.authors.filter(
		(author) =>
			author.name.toLowerCase().includes(search) ||
			author.username.toLowerCase().includes(search) ||
			author.address.toLowerCase().includes(search)
	)
})

const twitterLink = computed(() => {
	let messagge = `👉 #smashdatestnet of #Sinfonia, the #music #FanToken App powered by @BitSongOfficial on @osmosiszone 
 
🥁 Let’s play it!`

	if (authStore.bitsongAddress) {
		messagge = messagge.concat(`\n${authStore.bitsongAddress}`)
	} else {
		messagge = messagge.concat(`\n[fill here with your testnet wallet address]`)
	}

	messagge = messagge.concat(`\n${import.meta.env.VITE_PLAYGROUND_TWEET_URL}`)

	return `https://twitter.com/intent/tweet?text=${encodeURIComponent(messagge)}`
})

const onTwitterClick = () => {
	window.open(twitterLink.value, "_blank")
}

const focussed = (e) => {
	searchFocussed.value = true
}

const guideUrl = import.meta.env.VITE_PLAYGROUND_GUIDE_URL

onMounted(() => {
	twitterStore.loadAuthors()
})
</script>

<template>
	<div class="row q-col-gutter-x-xl q-mb-62">
		<div class="flex column items-start col-8 col-md-5">
			<Title class="q-mb-50">Playground</Title>
			<div class="flex items-center fs-21 text-weight-medium q-mb-28">
				<p>Twitter Race</p>
			</div>
			<div class="q-mb-40 flex row">
				<p>
					<span class="opacity-40 fs-16 !leading-24">
						Welcome to Sinfonia incentivized Testnet! Each participant might be able
						to get great rewards in BTSG and FanTokens simply playing with the
						platform.
					</span>
					<a
						:href="guideUrl"
						target="_blank"
						class="fs-18 text-weight-medium flex inline items-center q-ml-8"
					>
						<span class="q-mr-12">Read the official announcement</span>
						<q-icon
							class="text-primary"
							size="12px"
							:name="resolveIcon('arrow-right', 14, 14)"
						></q-icon>
					</a>
				</p>
			</div>
			<div class="flex q-mb-42">
				<div class="fs-16 !leading-20 text-weight-medium q-mb-none">
					<p>Prizes</p>
				</div>
				<p
					class="q-mb-none q-mt-none fs-21 !leading-28 q-ml-42 text-gradient text-weight-medium"
				>
					· $ 25,000 in BTSG<br />
					· 1% of the Loyalty Program of the first batch on Sinfonia Testnet
				</p>
			</div>

			<LargeButton fit :padding-x="32" :padding-y="18" @click="onTwitterClick">
				<div class="flex items-center">
					<span class="q-mr-20"> Post on Twitter </span>
					<q-icon size="20px" :name="resolveIcon('twitter', 30, 30)"></q-icon>
				</div>
			</LargeButton>
		</div>
		<div class="col-8 col-md-3 gt-sm">
			<img
				src="@/assets/images/icons/twitter_gradient.svg"
				alt="twitter"
				class="full-width full-height"
			/>
		</div>
	</div>
	<div class="flex items-center justify-between q-mb-36">
		<p class="fs-18 font-weight-medium">Eligible Accounts</p>
		<div
			@click="focussed"
			@focusout="searchFocussed = false"
			:class="'relative-position cursor-pointer group'"
		>
			<div
				class="absolute-full bg-white rounded-30 opacity-5 shadow-md group-hover:opacity-15"
			></div>
			<div class="flex items-center q-px-28 q-py-14">
				<q-input
					class="q-mr-4 min-size-input"
					input-class="q-py-0"
					hide-bottom-space
					borderless
					v-show="searchActive"
					v-model="searchValue"
					dense
				/>
				<q-icon size="13px" :name="resolveIcon('search', 13, 13)"></q-icon>
			</div>
		</div>
	</div>
	<LightTable
		:columns="accountColumns"
		:rows="authors"
		hide-header
		:loading="twitterStore.loading"
	>
		<template v-slot:body-cell-index="props">
			<q-td :props="props">
				<span class="opacity-40">
					{{ props.rowIndex + 1 }}
				</span>
			</q-td>
		</template>
		<template v-slot:body-cell-user="slotProps">
			<q-td :props="slotProps">
				<div class="row items-center no-wrap">
					<q-avatar size="30px" class="q-mr-22 bg-gradient">
						<img
							v-if="slotProps.row.profileImageUrl"
							:src="slotProps.row.profileImageUrl"
							:alt="slotProps.row.name[0]"
						/>
						<p class="text-weight-medium fs-12 text-uppercase" v-else>
							{{ slotProps.row.name[0] }}
						</p>
					</q-avatar>
					<p class="text-weight-medium fs-15">
						{{ slotProps.row.name }}
					</p>
				</div>
			</q-td>
		</template>
		<template v-slot:body-cell-account="slotProps">
			<q-td :props="slotProps">
				<span class="opacity-40"> @{{ slotProps.row.username }} </span>
			</q-td>
		</template>
	</LightTable>
</template>
