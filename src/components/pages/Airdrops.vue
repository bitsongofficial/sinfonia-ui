<script setup lang="ts">
import {
	resolveIcon,
	balancedCurrency,
	percentage,
	formatShortAddress,
} from "@/common"
import { MerkledropWithProof, TableColumn } from "@/types"
import { computed, onMounted, onUnmounted, ref, watch } from "vue"
import { useQuasar } from "quasar"
import { until } from "@vueuse/core"
import Title from "@/components/typography/Title.vue"
import LightTable from "@/components/LightTable.vue"
import StandardButton from "@/components/buttons/StandardButton.vue"
import AirdropCard from "@/components/cards/AirdropCard.vue"
import useMerkledrops from "@/store/merkledrops"
import useConfig from "@/store/config"
import useAuth from "@/store/auth"
import useTransactionManager from "@/store/transaction-manager"

const merkledrops = useMerkledrops()
const authStore = useAuth()
const transactionManagerStore = useTransactionManager()
const configStore = useConfig()
const $q = useQuasar()

const airdropColumns: TableColumn[] = [
	{
		name: "name",
		label: "drop",
		align: "left",
		field: "name",
	},
	{
		name: "amount",
		label: "total amount",
		align: "center",
		field: "amount",
	},
	{
		name: "claimed",
		label: "claimed",
		field: "claimed",
		align: "center",
	},
	{
		name: "owner",
		label: "sender",
		field: "owner",
		align: "right",
	},
	{
		name: "endTime",
		label: "due date",
		field: "endTime",
		align: "right",
	},
	{
		name: "actions",
		label: "",
		align: "right",
		field: "actions",
	},
]

const searchFocussed = ref(false)
const searchValue = ref("")

const searchActive = computed(() => {
	return searchValue.value.length > 0 || searchFocussed.value
})

const bitsongToken = computed(() => configStore.bitsongToken)

const focussed = () => {
	searchFocussed.value = true
}

onMounted(async () => {
	await until(bitsongToken).toBeTruthy()

	merkledrops.loadAirdrops(authStore.bitsongAddress)
})

const addressWatcher = watch(
	() => authStore.bitsongAddress,
	(address, oldAddress) => {
		if (address !== oldAddress) {
			merkledrops.loadAirdrops(address)
		}
	}
)

const onClaim = (merkledrop: MerkledropWithProof) => {
	if (merkledrop.proof) {
		transactionManagerStore.merkledropClaim(
			merkledrop.merkledrop_id,
			merkledrop.proof?.index,
			merkledrop.proof.amount.toString(),
			merkledrop.proof?.proof
		)
	}
}

onUnmounted(() => {
	addressWatcher()
})
</script>

<template>
	<div>
		<div class="row items-center justify-between q-mb-28 q-mb-md-32">
			<Title>Airdrops</Title>
			<div
				@click="focussed"
				@focusout="searchFocussed = false"
				class="relative-position cursor-pointer group col-auto"
				v-if="$q.screen.lt.lg && $q.screen.gt.xs"
			>
				<div
					class="absolute-full bg-white rounded-30 opacity-5 light:opacity-100 shadow-md light:shadow-10"
				></div>
				<div class="flex items-center q-px-28 q-py-14">
					<q-input
						class="q-mr-4 min-size-input"
						input-class="q-py-0"
						hide-bottom-space
						borderless
						v-show="searchActive"
						v-model="searchValue"
						:debounce="1000"
						dense
					/>
					<q-icon
						size="15px"
						:name="resolveIcon('search', 13, 13)"
						class="opacity-40"
					></q-icon>
				</div>
			</div>
		</div>
		<div class="row items-start justify-between q-mb-30">
			<div class="flex items-center col-8 col-md-6 col-lg-5">
				<p class="fs-16 opacity-40 text-weight-medium !leading-24">
					Artists, Record Labels, Festivals and Clubs are waiting for you!<br />Discover
					free giveaways of FanTokens to the community.
				</p>
			</div>
			<div
				@click="focussed"
				@focusout="searchFocussed = false"
				class="relative-position cursor-pointer group col-auto"
				v-if="$q.screen.gt.md"
			>
				<div
					class="absolute-full bg-white rounded-30 opacity-5 light:opacity-100 shadow-md light:shadow-10"
				></div>
				<div class="flex items-center q-px-28 q-py-14">
					<q-input
						class="q-mr-4 min-size-input"
						input-class="q-py-0"
						hide-bottom-space
						borderless
						v-show="searchActive"
						v-model="searchValue"
						:debounce="1000"
						dense
					/>
					<q-icon
						size="15px"
						:name="resolveIcon('search', 13, 13)"
						class="opacity-40"
					></q-icon>
				</div>
			</div>
		</div>

		<div
			class="relative-position cursor-pointer group col-auto q-mt-48 q-mb-30"
			v-if="$q.screen.lt.sm"
		>
			<div
				class="absolute-full bg-white rounded-30 opacity-5 light:opacity-100 shadow-md light:shadow-10"
			></div>
			<div class="flex items-center q-px-28 q-py-14">
				<q-input
					class="q-mr-4 min-size-input flex-1"
					input-class="q-py-0"
					hide-bottom-space
					borderless
					v-model="searchValue"
					:debounce="1000"
					dense
					placeholder="Search"
				/>
				<q-icon
					size="15px"
					:name="resolveIcon('search', 13, 13)"
					class="opacity-40"
				></q-icon>
			</div>
		</div>

		<LightTable
			:columns="airdropColumns"
			:rows="merkledrops.merkledropsWithProofs"
			:loading="merkledrops.loading"
			alternative
			row-key="drop"
			v-if="$q.screen.gt.md"
		>
			<template v-slot:body-cell-name="slotProps">
				<q-td class="author-column" :props="slotProps">
					<div class="row items-center no-wrap">
						<q-avatar size="40px" class="q-mr-26">
							<img :src="slotProps.row.image" :alt="slotProps.row.name" />
						</q-avatar>
						<p class="text-weight-medium fs-14 table-text-contained q-px-2">
							{{ slotProps.row.name }}
						</p>
					</div>
				</q-td>
			</template>
			<template v-slot:body-cell-amount="slotProps">
				<q-td :props="slotProps">
					<p class="text-weight-medium fs-14">
						{{ balancedCurrency(slotProps.row.amount, 3) }}
						<span class="fs-13 opacity-40 text-uppercase q-ml-12">{{
							slotProps.row.symbol
						}}</span>
					</p>
				</q-td>
			</template>
			<template v-slot:body-cell-claimed="slotProps">
				<q-td :props="slotProps">
					<p class="fs-14" v-if="slotProps.row.owner">
						{{ percentage(slotProps.row.claimedPercentage) }} %
					</p>
					<p class="fs-14" v-else>100 %</p>
				</q-td>
			</template>
			<template v-slot:body-cell-owner="slotProps">
				<q-td :props="slotProps">
					<p class="fs-14 opacity-40">
						{{ formatShortAddress(slotProps.row.owner, 6) }}
					</p>
				</q-td>
			</template>
			<template v-slot:body-cell-endtime="slotProps">
				<q-td :props="slotProps">
					<p class="fs-14 opacity-40">
						{{ slotProps.row.endTime }}
					</p>
				</q-td>
			</template>
			<template v-slot:body-cell-actions="slotProps">
				<q-td :props="slotProps">
					<q-btn
						v-if="!slotProps.row.owner"
						outline
						rounded
						color="white"
						label="Completed"
						disable
						class="q-px-22 text-secondry-390 btn-outline-minimal light:before:border-2 light:hover:helper-white text-capitalize"
					/>
					<q-btn
						v-else-if="!slotProps.row.active"
						outline
						rounded
						color="white"
						label="Expired"
						disable
						class="q-px-22 text-secondry-390 btn-outline-minimal light:before:border-2 light:hover:helper-white text-capitalize"
					/>
					<q-btn
						v-else-if="!slotProps.row.proof"
						outline
						rounded
						color="white"
						label="Not Eligible"
						disable
						class="q-px-22 text-secondry-390 btn-outline-minimal light:before:border-2 light:hover:helper-white text-capitalize"
					/>
					<StandardButton
						label="Claim"
						no-padding
						v-else-if="!slotProps.row.proof.claimed"
						@click="onClaim(slotProps.row)"
						:disable="
							transactionManagerStore.loadingBroadcasting ||
							transactionManagerStore.loadingSign
						"
					/>
					<q-btn
						v-else
						outline
						rounded
						color="white"
						label="Claimed"
						disable
						class="q-px-22 text-secondry-390 btn-outline-minimal light:before:border-2 light:hover:helper-white text-capitalize"
					/>
				</q-td>
			</template>
		</LightTable>
		<div class="row grid-gap-32" v-else>
			<AirdropCard
				v-for="(airdrop, index) of merkledrops.merkledropsWithProofs"
				:key="index"
				:airdrop="airdrop"
				class="flex-100 flex-between-md-half"
			/>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.twitter-image {
	right: 88px;

	img {
		max-width: 270px;
	}
}

.author-column {
	width: 300px;
	max-width: 300px;
}
</style>
