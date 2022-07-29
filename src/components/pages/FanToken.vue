<script setup lang="ts">
import {
	balancedCurrency,
	percentage,
	percentageRange,
	smallNumber,
} from "@/common/numbers"
import {
	computed,
	ComputedGetter,
	onMounted,
	onUnmounted,
	ref,
	watch,
} from "vue"
import { TableColumn } from "@/types/table"
import { Pool, FantokenTab } from "@/types"
import { useRoute, useRouter } from "vue-router"
import Tabs from "@/components/Tabs.vue"
import ImagePair from "@/components/ImagePair.vue"
import InfoCard from "@/components/cards/InfoCard.vue"
import CardWithHeader from "@/components/cards/CardWithHeader.vue"
import PercentageWithImage from "@/components/infographics/PercentageWithImage.vue"
import LargeButton from "@/components/buttons/LargeButton.vue"
import Socials from "@/components/Socials.vue"
import LightTable from "@/components/LightTable.vue"
import usePools from "@/store/pools"
import useConfig from "@/store/config"
import useBank from "@/store/bank"
import BigNumber from "bignumber.js"
import useMailchimp from "@/store/mailchimp"
import useSettings from "@/store/settings"

const poolsStore = usePools()
const bankStore = useBank()
const configStore = useConfig()
const settingsStore = useSettings()
const mailchimpStore = useMailchimp()
const route = useRoute()
const router = useRouter()
const id = route.params["id"] as string

const fantoken = computed(() => configStore.findFantokenByDenom(id))

const fantokenWatcher = watch(
	() => fantoken.value,
	(current) => {
		if (current) {
			document.title = `${current.symbol} | ${current.name}'s Fantoken`

			settingsStore.breadcrumbPageTitle = current.name
		}
	},
	{ immediate: true }
)

const fantokensWatcher = watch(
	() => configStore.rawFantokens,
	(rawFantokens) => {
		if (rawFantokens.length > 0 && !configStore.loading) {
			if (!fantoken.value) {
				router.replace({
					name: "NotFound",
				})
			}
		}
	},
	{
		immediate: true,
	}
)

const balance = computed(() => {
	if (fantoken.value) {
		return bankStore.balanceBySymbol(fantoken.value.symbol)
	}

	return undefined
})

const fantokenPools = computed(() => {
	if (fantoken.value) {
		return poolsStore.poolsBySymbol(fantoken.value.symbol)
	}

	return []
})

const poolsStats = computed(() => {
	const stats = {
		liquidity: "0",
		maxApr: "0",
		avgApr: "0",
		bonded: "0",
		bondedFiat: "0",
		avgWeight: "0",
	}

	for (const fantokenPool of fantokenPools.value) {
		stats.liquidity = new BigNumber(stats.liquidity)
			.plus(fantokenPool.liquidity)
			.toString()

		stats.maxApr = BigNumber.max(fantokenPool.APR, stats.maxApr).toString()
		stats.avgApr = new BigNumber(stats.avgApr).plus(fantokenPool.APR).toString()

		const coins = fantokenPool.coins.filter(
			(coin) => coin.token.coinDenom === fantoken.value?.ibc.osmosis.destDenom
		)

		for (const coin of coins) {
			stats.bonded = new BigNumber(stats.bonded).plus(coin.token.amount).toString()
			const bondendFiat = new BigNumber(stats.bonded).multipliedBy(
				fantoken.value?.price ?? 0
			)
			stats.bondedFiat = new BigNumber(stats.bondedFiat)
				.plus(bondendFiat)
				.toString()
		}
	}

	stats.avgApr = new BigNumber(stats.avgApr)
		.div(fantokenPools.value.length)
		.toString()

	return stats
})

const bondedAmount = computed(() => {
	if (balance.value) {
		return new BigNumber(poolsStats.value.bonded)
			.div(balance.value.circulatingSupply ?? "1")
			.toNumber()
	}

	return 0
})

const bondedPercentage = computed(() =>
	new BigNumber(bondedAmount.value).multipliedBy(100).toNumber()
)

const tabs = computed(() => {
	const links: FantokenTab[] = [{ name: "analytics", label: "Analytics" }]

	if (fantokenPools.value.length > 0) {
		links.push({ name: "pools", label: "Pools" })
	}

	links.push({ label: "Social", name: "social" })

	if (fantoken.value) {
		const airdrop = fantoken.value.airdrop
		const whitepaper = fantoken.value.whitepaper

		if (airdrop) {
			links.push({ label: "Airdrop", url: airdrop.url })
		}

		if (whitepaper) {
			links.push({ label: "Whitepaper", url: whitepaper.url })
		}
	}

	return links
})

const stats = ["Price", "Gain"]
const selectedStat = ref(stats[0])

const email = ref("")
const newsletter = ref(false)

const poolsColumns = computed<TableColumn[]>(() => [
	{
		name: "id",
		align: "left",
		label: "",
		field: "id",
		sortable: true,
		headerClasses: "w-5",
		classes: "w-5",
	},
	{
		name: "tokenPair",
		align: "left",
		label: fantoken.value?.symbol + " Pools",
		field: "name",
		sortable: true,
	},
	{
		name: "apr",
		label: "APR",
		field: (row: Pool) => row.APR,
		sortable: true,
		format: (val: any) => `${percentage(val)} %`,
	},
	{
		name: "liquidity",
		label: "Liquidity",
		field: (row: Pool) => row.liquidity,
		sortable: true,
		format: (val: any) => `${balancedCurrency(val)} $`,
	},
	{
		name: "my_liquidity",
		label: "My Liquidity",
		field: (row: Pool) => row.userLiquidity,
		sortable: true,
		format: (val: any) => `${balancedCurrency(val)} $`,
	},
	{
		name: "my_bonding",
		label: "My Bonding",
		field: (row: Pool) => row.bonded,
		sortable: true,
		format: (val: any) => `${balancedCurrency(val)} $`,
	},
])

const topImageStyle = computed(
	() =>
		`background: linear-gradient(360deg, #220D32 3.59%, rgba(34, 13, 50, 0) 176.73%), url(${
			fantoken.value?.media?.hero ?? ""
		});`
)

const topImageStyleLight = computed(
	() =>
		`background: linear-gradient(360deg, #F0EDF2 3.59%, rgba(240, 237, 242, 0) 100.73%), url(${
			fantoken.value?.media?.hero ?? ""
		});`
)

const compositionGraphStyle = ref({ width: "0" })
const heightRef = ref<HTMLElement | null>(null)

const setSize = () => {
	if (heightRef.value) {
		compositionGraphStyle.value.width = heightRef.value.offsetHeight + "px"
		return true
	}
	return false
}

const untilSetSize = () => {
	const res = setSize()
	if (!res) {
		setTimeout(untilSetSize, 200)
	}
}

onMounted(() => {
	window.addEventListener("resize", setSize)
	untilSetSize()
})

onUnmounted(() => {
	window.removeEventListener("resize", setSize)
	fantokenWatcher()
	fantokensWatcher()
})

const subscribeMailchimp = () => {
	if (fantoken.value && fantoken.value.socials) {
		mailchimpStore.subscribeMailchimp(
			email.value,
			fantoken.value.socials.mailchimpID
		)
	}
}

const onSwapClick = () => {
	if (fantokenPools.value) {
		const pool = [...fantokenPools.value].shift()

		if (pool) {
			const coins = [...pool.coins]
			const fromCoin = coins.shift()
			const toCoin = coins.shift()

			if (fromCoin && toCoin) {
				router.push(`/swap?from=${fromCoin.token.symbol}&to=${toCoin.token.symbol}`)
			}
		}
	}
}
</script>

<template>
	<div class="text-white text-weight-medium" v-if="fantoken">
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
						<img :src="fantoken.logos.default" :alt="fantoken.name" />
					</q-avatar>
					<div class="text-center-xs">
						<p class="text-dark q-mb-18 fs-21">
							{{ fantoken.name }}
						</p>
						<p class="fs-60 q-mb-20 text-weight-bold">{{ fantoken.symbol }}</p>
						<div class="flex column-xs row items-center-xs items-end justify-center">
							<div class="flex column q-mb-xs-14">
								<p class="text-dark fs-16 text-uppercase q-mb-16">Price</p>
								<p class="fs-32">$ {{ smallNumber(fantoken.price ?? "0") }}</p>
							</div>
							<LargeButton
								:padding-x="30"
								:padding-y="14"
								class="q-ml-xs-0 q-ml-46"
								fit
								@click="onSwapClick"
							>
								Swap Tokens
							</LargeButton>
						</div>
					</div>
				</div>
			</div>
			<div class="col-8 col-md-4 column items-end items-center-xs">
				<div class="flex">
					<div class="column items-end items-center-xs">
						<p
							class="fs-24 text-dark text-weight-medium q-mb-14 text-capitalize text-right"
							v-if="balance"
						>
							My Tokens
						</p>
						<p class="fs-44 q-mb-24 text-weight-medium" v-if="balance">
							{{ balancedCurrency(balance.available ?? "0") }} {{ fantoken.symbol }}
						</p>
						<p
							class="fs-16 text-dark text-weight-medium q-mb-10 text-capitalize text-right"
							v-if="balance"
						>
							value
						</p>
						<p class="fs-32 text-weight-medium text-right q-mb-33" v-if="balance">
							{{ balancedCurrency(balance.availableFiat ?? "0") }} $
						</p>
					</div>
				</div>
			</div>
		</div>
		<Tabs :options="tabs">
			<template v-slot:info> </template>
			<template v-slot:analytics>
				<div class="q-mb-52">
					<p class="fs-16 opacity-30 q-mb-24">Tokenomics</p>
					<div class="row q-col-gutter-xl">
						<div class="col-8 col-md-4 col-lg-2 overflow-down">
							<InfoCard :header="`${fantoken.symbol} CIRCULATING`" class="q-py-34">
								{{ balancedCurrency(balance?.circulatingSupply ?? "0") }}
							</InfoCard>
						</div>
						<div class="col-8 col-md-4 col-lg-2 overflow-down">
							<InfoCard header="MARKET CAP" class="q-py-34">
								{{ balancedCurrency(balance?.marketCap ?? "0") }} $
							</InfoCard>
						</div>
					</div>
				</div>
				<div class="q-mb-52">
					<p class="fs-16 opacity-30 q-mb-24">Pool Stats</p>
					<div class="row q-col-gutter-xl">
						<div class="col-8 col-md-4 col-lg-2">
							<InfoCard header="LIQUIDITY" class="q-py-34">
								{{ balancedCurrency(poolsStats.liquidity) }} $
							</InfoCard>
						</div>
						<div class="col-8 col-md-4 col-lg-2">
							<InfoCard header="MAX APR" class="q-py-34">
								{{ percentageRange(poolsStats.maxApr) }} %
							</InfoCard>
						</div>
						<div class="col-8 col-md-4 col-lg-2">
							<InfoCard header="AVG APR" class="q-py-34">
								{{ percentageRange(poolsStats.avgApr) }} %
							</InfoCard>
						</div>
					</div>
				</div>
				<div class="row q-col-gutter-xl">
					<div class="col-8 col-lg-4">
						<p class="fs-16 opacity-30 q-mb-24">Bonding</p>
						<div class="row q-col-gutter-xl">
							<div class="col-8 col-lg-4">
								<div ref="heightRef">
									<CardWithHeader header="bonded tokens" class="q-py-34">
										<div class="flex justify-between items-center text-center q-mb-20">
											<p class="fs-18">
												{{ balancedCurrency(poolsStats.bonded) }}
											</p>
											<p class="fs-10 opacity-50">
												{{ fantoken.symbol }}
											</p>
										</div>
										<div class="flex justify-between items-center text-center q-mb-26">
											<p class="fs-18">{{ balancedCurrency(poolsStats.bondedFiat) }} $</p>
										</div>
										<div class="flex">
											<PercentageWithImage
												:value="bondedPercentage"
												:image="fantoken.logos.default"
												class="q-mr-20"
											></PercentageWithImage>
											<div class="text-weight-medium">
												<p class="fs-12 text-uppercase q-mb-10 opacity-50">% bonded</p>
												<p class="fs-18">{{ percentageRange(bondedAmount) }}%</p>
											</div>
										</div>
									</CardWithHeader>
								</div>
							</div>
							<div class="col-8 col-lg-4 flex justify-center items-center">
								<div :style="compositionGraphStyle">
									<PercentageWithImage
										alt-style
										full
										class="full-width full-height--15"
										imageSize="48px"
										:thickness="0.35"
										:image="fantoken.logos.default"
										:value="bondedPercentage"
									>
									</PercentageWithImage>
								</div>
							</div>
						</div>
					</div>
				</div>
			</template>
			<template v-slot:pools v-if="fantokenPools.length > 0">
				<LightTable
					:rows="fantokenPools"
					:columns="poolsColumns"
					no-background
					class="q-px-0 q-py-0 table-no-padding"
					@row-click="
						(_, row) => {
							$router.push(`/pools/${row.id}`)
						}
					"
				>
					<template v-slot:body-cell-id="slotProps">
						<q-td :props="slotProps">
							<div class="flex no-wrap items-center">
								<span class="opacity-40 q-mr-10">
									{{ slotProps.row.id }}
								</span>
							</div>
						</q-td>
					</template>
					<template v-slot:body-cell-tokenPair="slotProps">
						<q-td :props="slotProps">
							<div class="flex no-wrap items-center">
								<ImagePair
									:coins="slotProps.row.coins"
									class="q-mr-30"
									:size="30"
									:smaller-size="24"
									:offset="[0, 0]"
									inline
								/>
								<p class="fs-14 text-weight-medium">
									<template v-for="(coin, index) of slotProps.row.coins" :key="index">
										{{ coin.token.symbol
										}}{{ index === slotProps.row.coins.length - 1 ? "" : " · " }}
									</template>
								</p>
							</div>
						</q-td>
					</template>
				</LightTable>
			</template>
			<template v-slot:social>
				<q-form class="row q-pt-18 q-col-gutter-x-md" @submit="subscribeMailchimp">
					<div class="col-8 col-md-2 column justify-between">
						<p class="fs-24 q-mb-24">
							Be the first on <br />
							every new drop.
						</p>
						<p class="fs-18 opacity-50 gt-sm">Follow me on socials</p>
					</div>
					<div class="col-8 col-md-4">
						<q-input
							v-model="email"
							type="email"
							label="Type your email address"
							class="q-field--highlighted q-mb-22 opacity-30 fs-18 input-top-attached"
						/>
						<q-checkbox
							v-model="newsletter"
							label="I agree to receive Bitsong Newsletter"
							class="fs-12 text-weight-regular q-mb-54 q-mb-sm-14"
						/>
						<div class="lt-md q-mb-20 flex justify-center">
							<LargeButton
								fit
								type="submit"
								:disable="mailchimpStore.loading || !newsletter"
							>
								Get notified
							</LargeButton>
						</div>
						<template v-if="fantoken.socials">
							<p class="fs-18 opacity-50 lt-md q-mb-8">Follow me on socials</p>
							<Socials :socials="fantoken.socials.links"></Socials>
						</template>
					</div>
					<div class="col-8 col-md-2 flex justify-end">
						<div class="gt-sm">
							<LargeButton
								fit
								type="submit"
								:disable="mailchimpStore.loading || !newsletter"
							>
								Get notified
							</LargeButton>
						</div>
					</div>
				</q-form>
			</template>
		</Tabs>
	</div>
</template>
