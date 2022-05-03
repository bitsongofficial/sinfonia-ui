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
		align: "center",
	},
	{
		name: "valid",
		label: "",
		align: "center",
		field: "valid",
	},
]

const searchFocussed = ref(false)
const searchValue = ref("")

const searchActive = computed(() => {
	return searchValue.value.length > 0 || searchFocussed.value
})

const authorsWithIndex = computed(() =>
	twitterStore.authors
		.map((author, index) => ({
			...author,
			index: index + 1,
		}))
		.reverse()
)

const authors = computed(() => {
	const search = searchValue.value.toLocaleLowerCase()

	return authorsWithIndex.value.filter(
		(author) =>
			author.name.toLowerCase().includes(search) ||
			author.username.toLowerCase().includes(search) ||
			author.address.toLowerCase().includes(search)
	)
})

const validAuthors = computed(
	() => authorsWithIndex.value.filter((author) => author.valid).length
)

const addressAlreadyRegistered = computed(() => {
	return (
		twitterStore.authors.find(
			(author) => author.address === authStore.bitsongAddress
		) !== undefined
	)
})

const twitterLink = computed(() => {
	let messagge = `👉 #smashdatestnet of @sinfoniazone, the #music #FanToken App powered by @BitSongOfficial on @osmosiszone 
 
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
const playgroundStartTime = computed(() => {
	if (import.meta.env.VITE_PLAYGROUND_START_DATE) {
		const currentTime = new Date().getTime()
		const playgroundTime = new Date(
			import.meta.env.VITE_PLAYGROUND_START_DATE
		).getTime()

		return playgroundTime - currentTime
	}
})

onMounted(() => {
	twitterStore.loadAuthors()
})

const pagination = ref({
	page: 1,
	rowsPerPage: 50,
})

const maxPages = computed(() =>
	Math.ceil(authors.value.length / pagination.value.rowsPerPage)
)
</script>

<template>
	<div class="row q-col-gutter-x-xl q-mb-62 position-relative">
		<div class="flex column items-start col-12">
			<Title class="q-mb-50">Playground</Title>
			<vue-countdown
				v-if="playgroundStartTime"
				:time="playgroundStartTime"
				v-slot="{ days, hours, minutes, seconds }"
				class="fs-60 text-gradient text-weight-medium q-mb-50"
			>
				{{ days }} days {{ hours }} hrs {{ minutes }} mins {{ seconds }}s
			</vue-countdown>
		</div>
		<div class="flex column items-start col-8 col-md-5">
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
					· 1% of the Loyalty Program of the first 10 FanTokens
				</p>
			</div>

			<LargeButton
				fit
				:padding-x="32"
				:padding-y="18"
				@click="onTwitterClick"
				:disabled="addressAlreadyRegistered"
			>
				<div class="flex items-center">
					<span class="q-mr-20" v-if="!addressAlreadyRegistered">
						Post on Twitter
					</span>
					<span class="q-mr-20" v-else> Address Already Registered </span>
					<q-icon size="20px" :name="resolveIcon('twitter', 30, 30)"></q-icon>
				</div>
			</LargeButton>
		</div>
		<div
			class="twitter-image col-8 col-md-3 gt-sm absolute-center-right justify-end flex"
		>
			<img
				src="@/assets/images/icons/twitter_gradient.svg"
				alt="twitter"
				class="full-width"
			/>
		</div>
	</div>
	<div class="flex items-center justify-between q-mb-36">
		<div class="flex items-center row">
			<p class="fs-18 font-weight-medium">Registered Accounts</p>
			<p class="fs-18 font-weight-medium q-ml-20">
				{{ twitterStore.totalAuthors }}
			</p>
			<p class="fs-18 font-weight-medium text-primary q-ml-64">Eligible</p>
			<p class="fs-18 font-weight-medium text-primary q-ml-12">
				{{ validAuthors }}
			</p>
		</div>
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
		v-model:pagination="pagination"
		:hide-bottom="false"
	>
		<template v-slot:body-cell-index="props">
			<q-td :props="props">
				<span class="opacity-40">
					{{ props.row.index }}
				</span>
			</q-td>
		</template>
		<template v-slot:body-cell-user="slotProps">
			<q-td class="author-column" :props="slotProps">
				<div class="row items-center no-wrap">
					<q-avatar size="30px" class="q-mr-22 bg-gradient">
						<img
							v-if="slotProps.row.profileImageUrl"
							:src="slotProps.row.profileImageUrl"
							:alt="slotProps.row.name[0]"
						/>
						<p
							class="text-weight-medium fs-12 text-uppercase table-text-contained"
							v-else
						>
							{{ slotProps.row.name[0] }}
						</p>
					</q-avatar>
					<p class="text-weight-medium fs-15 table-text-contained">
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
		<template v-slot:body-cell-valid="slotProps">
			<q-td :props="slotProps">
				<div
					class="flex justify-center q-py-12 q-px-16 fs-12 text-weight-medium bg-gradient text-capitalize light:text-white"
					v-if="slotProps.row.valid"
				>
					<div class="flex items-center text-center">Eligible</div>
				</div>
				<div
					class="flex justify-center q-py-12 q-px-16 fs-12 text-weight-medium bg-white-custom text-capitalize light:text-white"
					v-else
				>
					<div class="flex items-center text-center">Not Eligible</div>
				</div>
			</q-td>
		</template>
		<template v-slot:bottom="scope">
			<div class="flex row full-width justify-end items-center q-mt-16 q-mb-28">
				<q-btn
					color="white"
					round
					dense
					flat
					:disable="scope.isFirstPage"
					@click="scope.prevPage"
					class="pagination-btn q-mr-4"
				>
					<q-icon
						class="rotate-90 pagination-btn-icon"
						:name="resolveIcon('keyboard-arrow-down', 10, 6)"
					></q-icon>
				</q-btn>

				<q-pagination
					v-model="pagination.page"
					color="white"
					active-color="primary-dark"
					text-color="white"
					:max="maxPages"
					:max-pages="5"
					size="sm"
				/>

				<q-btn
					color="white"
					round
					dense
					flat
					:disable="scope.isLastPage"
					@click="scope.nextPage"
					class="pagination-btn q-ml-4"
				>
					<q-icon
						class="rotate-270 pagination-btn-icon"
						:name="resolveIcon('keyboard-arrow-down', 10, 6)"
					></q-icon>
				</q-btn>
			</div>
		</template>
	</LightTable>
</template>

<style lang="scss" scoped>
.twitter-image {
	right: 120px;

	img {
		max-width: 285px;
	}
}

.author-column {
	width: 200px;
	max-width: 200px;
}
</style>
