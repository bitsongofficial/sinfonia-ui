<script setup lang="ts">
import { resolveIcon, balancedCurrencyFixed } from "@/common"
import { TableColumn } from "@/types"
import { computed, onMounted, ref } from "vue"
import Title from "@/components/typography/Title.vue"
import CardWithIcon from "@/components/cards/CardWithIcon.vue"
import LightTable from "@/components/LightTable.vue"
import useTwitter from "@/store/twitter"
import useConfig from "@/store/config"

const twitterStore = useTwitter()
const configStore = useConfig()

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
		name: "balance",
		label: "Balance",
		field: "balance",
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

const authorsWithIndex = computed(() => {
	const offset =
		Math.ceil(twitterStore.totalAccounts / twitterStore.totalPages) *
		(twitterStore.currentPage - 1)

	return twitterStore.leaderboardMap.map((author, index) => ({
		...author,
		index: index + offset + 1,
	}))
})

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
	twitterStore.loadLeaderboard()
})

const pagination = computed(() => ({
	page: 1,
	pagesNumber: twitterStore.totalPages,
	rowsPerPage: 50,
}))

const currentPage = ref(1)

const onRequest = (page: string) => {
	twitterStore.loadLeaderboard(parseInt(page))
}

const onSearch = (search: string | number | null) => {
	currentPage.value = 1
	const searchStr = search ? search.toString() : ""

	twitterStore.loadLeaderboard(1, searchStr.replaceAll("@", ""))
}

const prevPage = () => {
	currentPage.value -= 1

	twitterStore.loadLeaderboard(currentPage.value)
}

const nextPage = () => {
	currentPage.value += 1

	twitterStore.loadLeaderboard(currentPage.value)
}

const bitsongCoinLookup = computed(() => {
	const bitsongToken = configStore.bitsongToken

	if (bitsongToken) {
		const coinLookup = bitsongToken.coinLookup.find(
			(coin) => coin.viewDenom === bitsongToken.symbol
		)

		return coinLookup
	}
})
</script>

<template>
	<div class="row q-mb-48 position-relative">
		<div class="flex column items-start col-8">
			<Title class="q-mb-68">Playground</Title>
			<vue-countdown
				v-if="playgroundStartTime"
				:time="playgroundStartTime"
				v-slot="{ days, hours, minutes, seconds }"
				class="fs-48 text-gradient text-weight-medium q-mb-38"
			>
				{{ days }} days {{ hours }} hrs {{ minutes }} mins {{ seconds }}s
			</vue-countdown>
		</div>
		<div class="flex column items-start col-8 col-md-5">
			<p class="fs-16 !leading-24">
				<span class="opacity-40">
					Welcome to Sinfonia incentivized Testnet! Each participant might be able to
					get great rewards in BTSG and FanTokens simply playing with the platform.
				</span>
				<a
					:href="guideUrl"
					target="_blank"
					class="fs-18 text-weight-medium flex inline items-center"
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
	<div class="flex row items-center justify-between q-mb-34">
		<p class="fs-18 font-weight-medium">Rules</p>

		<!-- <p class="fs-16 font-weight-medium">
			<span class="opacity-50 q-mr-20">Snapshot</span>May 21 2022, 11:30 am
		</p> -->
	</div>
	<div class="row text-weight-medium q-col-gutter-xl q-mb-60">
		<div class="col-8 !w-md-1/3">
			<CardWithIcon header="1. Remove Liquidity">
				<p class="fs-14 !leading-24 opacity-50 q-pr-32">
					Unbond and Remove Liquidity from your Pools and Swap your Fan Token to
					BTSG.
				</p>

				<template v-slot:icons>
					<div class="row items-center">
						<q-icon
							color="primary"
							size="18px"
							:name="resolveIcon('stack', 17, 17)"
						/>
						<span class="fs-16 text-weight-medium q-mx-10 opacity-50">+</span>
						<q-icon
							color="primary"
							size="18px"
							:name="resolveIcon('refresh', 21, 17)"
						/>
					</div>
				</template>
			</CardWithIcon>
		</div>
		<div class="col-8 !w-md-1/3">
			<CardWithIcon header="2. Transfer your BTSG">
				<p class="fs-14 !leading-24 opacity-50 q-pr-32">
					Transfer BTSG from the Osmosis testnet chain to the BitSong testnet chain.
				</p>

				<template v-slot:icons>
					<q-icon
						color="primary"
						size="18px"
						:name="resolveIcon('suitcase', 18, 16)"
					/>
				</template>
			</CardWithIcon>
		</div>
		<div class="col-8 !w-md-1/3">
			<CardWithIcon header="3. You are a winner if">
				<p class="fs-14 !leading-24 opacity-50 q-pr-32">
					Your final balance is greater than the initial 10,000 BTSG.
				</p>

				<template v-slot:icons>
					<q-icon
						color="primary"
						size="18px"
						:name="resolveIcon('trophy', 22, 18)"
					/>
				</template>
			</CardWithIcon>
		</div>
	</div>
	<div class="flex items-center justify-between q-mb-36">
		<div class="flex items-center row">
			<p class="fs-18 font-weight-medium">Leaderboard</p>
		</div>
		<!-- <div
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
					@update:model-value="onSearch"
					:debounce="1000"
					dense
				/>
				<q-icon size="13px" :name="resolveIcon('search', 13, 13)"></q-icon>
			</div>
		</div> -->
	</div>
	<LightTable
		:columns="accountColumns"
		:rows="authorsWithIndex"
		row-key="address"
		hide-header
		:loading="twitterStore.loading"
		v-model:pagination="pagination"
		no-data-label="Leaderboard of winners (or not) will be available only after the end of the competition."
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
					<p
						class="text-weight-medium fs-15 table-text-contained"
						:class="{
							'opacity-20': !slotProps.row.valid,
						}"
					>
						{{ slotProps.row.name }}
					</p>
				</div>
			</q-td>
		</template>
		<template v-slot:body-cell-account="slotProps">
			<q-td :props="slotProps">
				<a
					:class="{
						'opacity-20': !slotProps.row.valid,
						'opacity-40': slotProps.row.valid,
					}"
					:href="'https://twitter.com/' + slotProps.row.username"
					target="_blank"
				>
					@{{ slotProps.row.username }}
				</a>
			</q-td>
		</template>
		<template v-slot:body-cell-address="props">
			<q-td :props="props">
				<p
					class="fs-14 text-weight-medium"
					:class="{
						'opacity-20': !props.row.valid,
						'opacity-50': props.row.valid,
					}"
				>
					{{ props.row.address }}
				</p>
			</q-td>
		</template>
		<template v-slot:body-cell-balance="slotProps">
			<q-td :props="slotProps">
				<p
					class="text-center"
					v-if="configStore.bitsongToken && bitsongCoinLookup"
					:class="{
						'opacity-20': !slotProps.row.valid,
					}"
				>
					{{ balancedCurrencyFixed(slotProps.row.balance.amount, 3) }}
					{{ configStore.bitsongToken?.symbol }}
				</p>
			</q-td>
		</template>
		<template v-slot:body-cell-valid="slotProps">
			<q-td :props="slotProps">
				<div
					class="flex justify-center q-py-12 q-px-16 fs-12 text-weight-medium border-gradient-primary text-capitalize text-white"
					v-if="slotProps.row.valid"
				>
					<div class="flex items-center text-center">Eligible</div>
				</div>
				<div
					class="flex justify-center q-py-12 q-px-16 fs-12 text-weight-medium bg-white-custom text-capitalize text-white light:bg-secondary-opacity-10"
					v-else
				>
					<div class="flex items-center text-center">Not Eligible</div>
				</div>
			</q-td>
		</template>
		<template v-slot:bottom>
			<div class="flex row full-width justify-end items-center q-mt-16 q-mb-28">
				<q-btn
					color="white"
					round
					dense
					flat
					:disable="!twitterStore.hasPrevPage"
					@click="prevPage"
					class="pagination-btn q-mr-4"
				>
					<q-icon
						class="rotate-90 pagination-btn-icon"
						:name="resolveIcon('keyboard-arrow-down', 10, 6)"
					></q-icon>
				</q-btn>

				<q-pagination
					v-model="currentPage"
					@update:model-value="onRequest"
					color="white"
					active-color="primary-dark"
					text-color="white"
					:max="twitterStore.totalPages"
					:max-pages="5"
					size="sm"
				/>

				<q-btn
					color="white"
					round
					dense
					flat
					:disable="!twitterStore.hasNextPage"
					@click="nextPage"
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
	right: 88px;

	img {
		max-width: 270px;
	}
}

.author-column {
	width: 200px;
	max-width: 200px;
}
</style>
