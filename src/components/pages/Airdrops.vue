<script setup lang="ts">
import { resolveIcon, balancedCurrency } from "@/common"
import { TableColumn } from "@/types"
import { computed, ref } from "vue"
import Title from "@/components/typography/Title.vue"
import LightTable from "@/components/LightTable.vue"
import StandardButton from "@/components/buttons/StandardButton.vue"
import useConfig from "@/store/config"

const configStore = useConfig()

const airdropColumns: TableColumn[] = [
	{
		name: "drop",
		label: "drop",
		align: "left",
		field: "drop",
	},
	{
		name: "amount",
		label: "amount",
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
		name: "sender",
		label: "sender",
		field: "sender",
		align: "right",
	},
	{
		name: "datetime",
		label: "datetime",
		field: "datetime",
		align: "right",
	},
	{
		name: "actions",
		label: "",
		align: "right",
		field: "actions",
	},
]

const data = [
	{
		drop: "Name",
		amount: "200000",
		denom: "clay",
		claimed: "90.00 %",
		sender: "bitsong2uet ... vwzsjq",
		datetime: "Dec 2 2023, 08:31 am",
		claim: true,
	},
	{
		drop: "Name 2",
		amount: "200000",
		denom: "clay",
		claimed: "96.57 %",
		sender: "bitsong2uet ... vwzsjq",
		datetime: "Dec 2 2023, 08:31 am",
		claim: false,
	},
	{
		drop: "Name 3",
		amount: "200000",
		denom: "clay",
		claimed: "96.57 %",
		sender: "bitsong2uet ... vwzsjq",
		datetime: "Dec 2 2023, 08:31 am",
		claim: false,
	},
	{
		drop: "Name 4",
		amount: "200000",
		denom: "clay",
		claimed: "92.00 %",
		sender: "bitsong2uet ... vwzsjq",
		datetime: "Dec 2 2023, 08:31 am",
		claim: false,
	},
	{
		drop: "Name 5",
		amount: "200000",
		denom: "clay",
		claimed: "92.00 %",
		sender: "bitsong2uet ... vwzsjq",
		datetime: "Dec 2 2023, 08:31 am",
		claim: false,
	},
	{
		drop: "Name 6",
		amount: "200000",
		denom: "clay",
		claimed: "92.00 %",
		sender: "bitsong2uet ... vwzsjq",
		datetime: "Dec 2 2023, 08:31 am",
		claim: false,
	},
	{
		drop: "Name 7",
		amount: "200000",
		denom: "clay",
		claimed: "92.00 %",
		sender: "bitsong2uet ... vwzsjq",
		datetime: "Dec 2 2023, 08:31 am",
		claim: false,
	},
	{
		drop: "Name 8",
		amount: "200000",
		denom: "clay",
		claimed: "92.00 %",
		sender: "bitsong2uet ... vwzsjq",
		datetime: "Dec 2 2023, 08:31 am",
		claim: false,
	},
	{
		drop: "Name 9",
		amount: "200000",
		denom: "clay",
		claimed: "92.00 %",
		sender: "bitsong2uet ... vwzsjq",
		datetime: "Dec 2 2023, 08:31 am",
		claim: false,
	},
	{
		drop: "Name 10",
		amount: "200000",
		denom: "clay",
		claimed: "92.00 %",
		sender: "bitsong2uet ... vwzsjq",
		datetime: "Dec 2 2023, 08:31 am",
		claim: false,
	},
]

const searchFocussed = ref(false)
const searchValue = ref("")

const searchActive = computed(() => {
	return searchValue.value.length > 0 || searchFocussed.value
})

const focussed = () => {
	searchFocussed.value = true
}
</script>

<template>
	<Title class="q-mb-32">Airdrops</Title>
	<div class="row items-start justify-between q-mb-30">
		<div class="flex items-center col-8 col-md-6 col-lg-5">
			<p class="fs-16 opacity-40 font-weight-medium !leading-24">
				Adam Clay is a Barbadian-Italian singer, producer, DJ, and author of many
				international hits, among which the best-known is undoubtedly Born Again
				(Babylonia). Recognized as a dance music.
			</p>
		</div>
		<div
			@click="focussed"
			@focusout="searchFocussed = false"
			class="relative-position cursor-pointer group col-auto"
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
				<q-icon size="15px" :name="resolveIcon('search', 13, 13)"></q-icon>
			</div>
		</div>
	</div>
	<LightTable :columns="airdropColumns" :rows="data" alternative row-key="drop">
		<template v-slot:body-cell-drop="slotProps">
			<q-td class="author-column" :props="slotProps">
				<div class="row items-center no-wrap">
					<q-avatar size="40px" class="q-mr-26">
						<img
							src="https://raw.githubusercontent.com/bitsongofficial/assetlists/testnet/logos/clay.png"
							alt="Clay"
						/>
					</q-avatar>
					<p class="text-weight-medium fs-14 table-text-contained q-px-2">
						{{ slotProps.row.drop }}
					</p>
				</div>
			</q-td>
		</template>
		<template v-slot:body-cell-amount="slotProps">
			<q-td :props="slotProps">
				<p class="text-weight-medium fs-14">
					{{ balancedCurrency(slotProps.row.amount, 3) }}
					<span class="fs-13 opacity-40 text-uppercase q-ml-12">{{
						slotProps.row.denom
					}}</span>
				</p>
			</q-td>
		</template>
		<template v-slot:body-cell-claimed="slotProps">
			<q-td :props="slotProps">
				<p class="fs-14">
					{{ slotProps.row.claimed }}
				</p>
			</q-td>
		</template>
		<template v-slot:body-cell-sender="slotProps">
			<q-td :props="slotProps">
				<p class="fs-14 opacity-40">
					{{ slotProps.row.sender }}
				</p>
			</q-td>
		</template>
		<template v-slot:body-cell-datetime="slotProps">
			<q-td :props="slotProps">
				<p class="fs-14 opacity-40">
					{{ slotProps.row.datetime }}
				</p>
			</q-td>
		</template>
		<template v-slot:body-cell-actions="slotProps">
			<q-td :props="slotProps">
				<StandardButton label="Claim" no-padding v-if="slotProps.row.claim" />
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
