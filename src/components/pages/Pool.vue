<script setup lang="ts">
import ImagePair from "@/components/ImagePair.vue"
import OutlineButton from "@/components/buttons/OutlineButton.vue"
import StandardButton from "@/components/buttons/StandardButton.vue"
import CardWithHeader from "@/components/cards/CardWithHeader.vue"
import PercentageWithImage from "@/components/infographics/PercentageWithImage.vue"
import {
	balancedCurrency,
	percentage,
	toDecimalGamm,
	balancedGamm,
	gtnZero,
} from "@/common/numbers"
import InfoCard from "@/components/cards/InfoCard.vue"
import ExpandableCard from "@/components/cards/ExpandableCard.vue"
import Progress from "@/components/Progress.vue"
import LightTable from "@/components/LightTable.vue"
import BondModal from "@/components/modals/BondModal.vue"
import { TableColumn, LockableDurationWithApr, LockCoin } from "@/types"
import usePools from "@/store/pools"
import { useRoute, useRouter } from "vue-router"
import { computed, onMounted, onUnmounted, ref, watch } from "vue"
import { BigNumber } from "bignumber.js"
import { reduce } from "lodash"
import { Coin } from "@cosmjs/proto-signing"
import { formatEpochDate, unboundingEndTimeStart, fromNow } from "@/common"
import useTransactionManager from "@/store/transaction-manager"
import LiquidityModal from "../modals/LiquidityModal.vue"
import { coinsConfig } from "@/configs/config"
import useAuth from "@/store/auth"
import useConfig from "@/store/config"

const transactionManagerStore = useTransactionManager()
const poolsStore = usePools()
const authStore = useAuth()
const configStore = useConfig()
const route = useRoute()
const id = route.params["id"] as string
const openBondModal = ref(false)
const openAddRemoveModal = ref(false)

const pool = computed(() => poolsStore.poolById(id))

const broadcastingWatcher = watch(
	() => transactionManagerStore.loadingBroadcasting,
	(oldLoading, newLoading) => {
		if (oldLoading !== newLoading) {
			openAddRemoveModal.value = false
			openBondModal.value = false
		}
	}
)

onUnmounted(() => {
	broadcastingWatcher()
})

const lpLiquidity = computed(() => {
	if (pool.value) {
		return new BigNumber(pool.value.userLiquidity)
			.minus(pool.value.bonded)
			.toString()
	}

	return "0"
})

const unbondedCoins = computed(() => {
	let coins: LockCoin[] = []

	if (pool.value) {
		pool.value.lockableDurationApr.forEach((lockableDuration) => {
			coins = [...coins, ...lockableDuration.unbondedCoins]
		})
	}

	return coins
})

const poolTokensName = computed(() =>
	pool.value?.coins.map((coin) => coin.token.symbol).join("/")
)

const bondingsColumn: TableColumn[] = [
	{
		name: "title",
		required: true,
		label: "Unbond Duration",
		align: "left",
		field: (row: LockableDurationWithApr) => row.readableDuration,
		format: (duration: string) => `${duration} unbonding`,
		sortable: false,
	},
	{
		name: "APR",
		align: "right",
		label: "APR",
		field: (row: LockableDurationWithApr) => row.apr,
		sortable: true,
		format: (val: string) => `${percentage(val)} %`,
	},
	{
		name: "total",
		align: "right",
		label: "amount",
		field: (row: LockableDurationWithApr) => {
			let total = new BigNumber("0")

			if (row.bondedCoin) {
				total = total.plus(
					reduce<Coin, BigNumber>(
						row.bondedCoin.coins,
						(all, coin) => {
							return all.plus(coin.amount)
						},
						new BigNumber("0")
					)
				)
			}

			return total.toString()
		},
		format: (val: string) =>
			`${balancedGamm(toDecimalGamm(val))} SINF/${pool.value?.id ?? "0"}`,
		sortable: true,
	},
	{
		name: "unbond",
		align: "right",
		label: "",
		field: "max",
		sortable: false,
	},
]

const unbondingsColumn: TableColumn[] = [
	{
		name: "title",
		required: true,
		label: "Unbond Duration",
		align: "left",
		field: (row: LockCoin) => row.durationMap.readableDuration,
		format: (duration: string) => `${duration} unbonding`,
		sortable: false,
	},
	{
		name: "empty",
		align: "right",
		label: "",
		field: (row: LockCoin) => "",
		format: (duration: string) => `53.`,
		style: "visibility: hidden;",
		sortable: false,
	},
	{
		name: "total",
		align: "right",
		label: "amount",
		field: (row: LockCoin) => {
			let total = new BigNumber("0")

			total = total.plus(
				reduce<Coin, BigNumber>(
					row.coins,
					(all, coin) => {
						return all.plus(coin.amount)
					},
					new BigNumber("0")
				)
			)

			return total.toString()
		},
		format: (val: string) =>
			`${balancedGamm(toDecimalGamm(val))} SINF/${pool.value?.id ?? "0"}`,
		sortable: true,
	},
	{
		name: "time",
		align: "right",
		label: "",
		field: "max",
		sortable: false,
	},
]

const beginUnlocking = (id: string) => {
	transactionManagerStore.beginUnlocking(id)
}

const compositionGraphStyle = ref({ width: "0" })
const heightRef = ref<HTMLElement | null>(null)

const setSize = () => {
	if (heightRef.value) {
		compositionGraphStyle.value.width = heightRef.value.clientHeight - 5 + "px"

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
})
</script>

<template>
	<div class="text-white text-weight-medium" v-if="pool">
		<div class="q-mb-90 flex justify-between justify-sm-center items-center">
			<div class="flex q-mb-sm-30">
				<ImagePair :coins="pool.coins" class="q-mr-20" />
				<h1 class="fs-27">#{{ pool.id }}: {{ poolTokensName }}</h1>
			</div>
			<div class="flex items-center">
				<OutlineButton class="q-mr-12" to="/swap">Swap Tokens</OutlineButton>
				<StandardButton
					@click="openAddRemoveModal = true"
					:disable="!authStore.session"
				>
					Add/Remove Liquidity
				</StandardButton>
			</div>
		</div>
		<div class="row q-col-gutter-xl q-col-gutter-y-lg q-mb-72">
			<div class="col-8 col-md-4 col-xl-2 flex justify-center">
				<div :style="compositionGraphStyle">
					<PercentageWithImage
						class="full-width full-height"
						imageSize="48px"
						:thickness="0.35"
						:icon="{ name: 'bitsong', width: 48, height: 47 }"
						:value="50"
						full
					>
					</PercentageWithImage>
				</div>
			</div>
			<div class="col-8 col-md-4 col-xl-2">
				<div ref="heightRef">
					<CardWithHeader
						header="Pool composition"
						:padding="0"
						class="q-px-30 q-py-20"
					>
						<div
							class="flex justify-between"
							v-for="(coin, index) in pool.coins"
							:key="index"
							:class="{
								'q-mb-48': index !== pool.coins.length - 1,
								'q-pt-24': index === 0,
							}"
						>
							<div class="flex">
								<PercentageWithImage
									class="q-mr-22"
									:image="coin.token.logos.default ?? ''"
									:value="coin.weightPercentage * 100"
									:negative="index % 2 !== 0"
								/>
								<div>
									<p class="fs-21 q-mb-14">
										{{ balancedCurrency(coin.token.amount) }}
									</p>
									<p class="fs-14">{{ percentage(coin.weightPercentage) }} %</p>
								</div>
							</div>
							<p class="fs-12 opacity-50">{{ coin.token.symbol }}</p>
						</div>
					</CardWithHeader>
				</div>
			</div>
			<div class="col-8 col-md-4 col-xl-2 column no-wrap">
				<InfoCard header="Pool liquidity" class="q-mb-27">
					{{ balancedCurrency(pool.liquidity) }} $
				</InfoCard>
				<InfoCard header="Bonded"> {{ balancedCurrency(pool.bonded) }} $ </InfoCard>
			</div>
			<div class="col-8 col-md-4 col-xl-2 column no-wrap">
				<InfoCard header="My liquidity" class="q-mb-27">
					{{ balancedCurrency(pool.userLiquidity) }} $
				</InfoCard>
				<InfoCard header="Swap fee">
					{{ percentage(pool.poolParams.swapFee) }} %
				</InfoCard>
			</div>
		</div>
		<div class="row q-mb-42">
			<div class="col-3">
				<h3 class="fs-21 q-mb-20 q-mt-0">Liquidity Mining</h3>
				<p class="fs-16 opacity-40 !leading-20">
					Liquidity mining is a decentralized finance mechanism wherein participants provide some of their assets into various liquidity pools, from which you are rewarded with tokens and fees.
				</p>
			</div>
			<div class="col-5 column items-end">
				<p class="fs-12 opacity-40 q-mb-8">Available LP Tokens</p>
				<p class="fs-24 q-mb-14">{{ balancedCurrency(lpLiquidity) }} $</p>
				<StandardButton @click="openBondModal = true" :disable="!authStore.session">
					Start Earning
				</StandardButton>
			</div>
		</div>
		<div class="row q-col-gutter-xl items-center q-mb-80">
			<div class="col-8 !w-md-1/3" v-for="unbonding in pool.lockableDurationApr">
				<ExpandableCard
					padding="14"
					transparency="5"
					:expandable="
						unbonding.extraGauges.length > 0 || gtnZero(unbonding.osmosisApr)
					"
				>
					<div class="q-pa-16">
						<p class="fs-12 opacity-30 q-mb-16 text-uppercase">
							{{ unbonding.readableDuration }} unbonding
						</p>
						<div class="q-mb-20">
							<p class="fs-36 q-mb-8">{{ percentage(unbonding.totalApr) }} %</p>
							<div
								class="flex items-center"
								v-if="unbonding.extraGauges.length > 0 || gtnZero(unbonding.osmosisApr)"
							>
								<p class="text-primary fs-14 q-mr-16 text-weight-medium">
									Pools Incentives
								</p>
								<template v-for="gauge in unbonding.extraGauges">
									<q-avatar
										class="q-mr-9"
										size="24px"
										v-for="(coin, index) in gauge.coins"
										:key="index"
									>
										<img :src="coin.token?.logos.default" />
									</q-avatar>
								</template>

								<q-avatar class="q-mr-9" size="24px" v-if="configStore.osmosisToken">
									<img :src="configStore.osmosisToken.logos.default" />
								</q-avatar>
							</div>
						</div>
						<p
							class="fs-12 opacity-40 text-weight-regular q-mb-20 !leading-20"
						>
							Bond Liquidity to earn Fan token Rewards.
						</p>
						<div
							class="flex no-wrap items-center text-weight-medium"
							v-if="unbonding.extraGauges.length > 0"
						>
							<div class="q-mr-21">
								<p class="fs-12 text-uppercase opacity-50 q-mb-8">Start</p>
								<p class="fs-18 text-no-wrap">
									{{ formatEpochDate(unbonding.extraGauges[0].start_time) }}
								</p>
							</div>
							<Progress
								:height="12"
								:value="unbonding.extraGauges[0].filledEpochs"
								:max="unbonding.extraGauges[0].numEpochsPaidOver"
								reverse
							></Progress>
							<div class="q-ml-21">
								<p class="fs-12 text-uppercase text-right opacity-50 q-mb-8">End</p>
								<p class="fs-18 text-no-wrap">
									{{ formatEpochDate(unbonding.extraGauges[0].endTime) }}
								</p>
							</div>
						</div>
					</div>
					<template #extra>
						<div v-for="gauge in unbonding.extraGauges" :key="gauge.id">
							<div
								v-for="(coin, index) in gauge.coins"
								:key="index"
								class="rounded-20 border-primary-light q-pa-18 flex items-center q-mb-6"
							>
								<q-avatar class="q-mr-18" size="25px">
									<img :src="coin.token?.logos.default" alt="" />
								</q-avatar>
								<div class="flex-1">
									<div class="flex no-wrap items-center q-mb-10">
										<p class="fs-14 text-weight-medium text-no-wrap">
											{{ gauge.leftEpochs }} epochs left
										</p>
									</div>
									<div class="flex row wrap justify-between items-center">
										<p class="fs-11 text-white text-uppercase text-weight-medium">
											<span class="opacity-40">Incentive </span>
											{{ balancedCurrency(coin.amount) }}
											{{ coin.token?.fantoken ? "$" : "" }}{{ coin.token?.symbol }}
										</p>
										<div class="flex">
											<p class="fs-11 q-mr-8 opacity-30">APR</p>
											<p>{{ percentage(gauge.apr) }} %</p>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div>
							<div
								v-if="configStore.osmosisToken"
								class="rounded-20 border-primary-light q-pa-18 flex items-center q-mb-6"
							>
								<q-avatar class="q-mr-18" size="25px">
									<img :src="configStore.osmosisToken.logos.default" />
								</q-avatar>
								<div class="flex-1">
									<div class="flex no-wrap items-center q-mb-10">
										<p class="fs-14 text-weight-medium q-mr-30">
											{{ configStore.osmosisToken.symbol }}
										</p>
									</div>
									<div class="flex justify-between items-center">
										<div class="flex">
											<p class="q-mr-12 opacity-30">APR</p>
											<p>{{ percentage(unbonding.osmosisApr) }} %</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</template>
				</ExpandableCard>
			</div>
		</div>
		<p class="fs-18 q-mb-30">My Bonded Assets</p>
		<LightTable
			class="q-mb-88"
			:rows="pool.lockableDurationApr"
			:columns="bondingsColumn"
		>
			<template v-slot:body-cell-unbond="props">
				<q-td :props="props">
					<template v-if="props.row.bondedCoin">
						<span
							class="text-primary text-weight-medium cursor-pointer"
							@click="beginUnlocking(props.row.bondedCoin.ID)"
						>
							Unbond all
						</span>
					</template>
					<span class="text-white opacity-20 text-weight-medium" v-else>
						Unbond all
					</span>
				</q-td>
			</template>
		</LightTable>
		<template v-if="unbondedCoins.length > 0">
			<p class="fs-18 q-mb-30">My Unbondings</p>
			<LightTable :rows="unbondedCoins" :columns="unbondingsColumn">
				<template v-slot:body-cell-time="props">
					<q-td :props="props">
						<span class="text-weight-medium opacity-40">
							{{ fromNow(props.row.end_time) }}
						</span>
					</q-td>
				</template>
			</LightTable>
		</template>

		<BondModal v-model="openBondModal" :pool="pool" />
		<LiquidityModal v-model="openAddRemoveModal" :pool="pool" />
	</div>
</template>
