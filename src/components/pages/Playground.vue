<script setup lang="ts">
	import { resolveIcon } from "@/common/resolvers"
	import Title from "@/components/typography/Title.vue"
import { TableColumn } from "@/types";
import { computed, ref } from "vue";
	import LargeButton from "../buttons/LargeButton.vue"
	import LightTable from "../LightTable.vue"

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
			name: "wallet",
			label: "Wallet",
			field: "address",
			align: "right",
		},
	]

	const newAccount = () => ({
		image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80",
		name: "Adam Clay",
		account: "adamclayreal",
		address: "bitsong1ks762sk0xjn2kud98u085",
	})

	const accounts = [
		newAccount(),
		newAccount(),
		newAccount(),
		newAccount(),
		newAccount(),
	]

	const searchFocussed = ref(false)
	const searchValue = ref("")

	const searchActive = computed(() =>
	{
		console.log(searchFocussed.value)
		return (searchValue.value.length > 0 || searchFocussed.value)
	})

	const focussed = (e) =>
	{
		console.log(e)
		searchFocussed.value = true
	}
</script>

<template>
	<div class="row q-col-gutter-x-xl q-mb-80">
		<div class="col-8 col-md-5">
			<Title class="q-mb-50">Playground</Title>
			<div class="flex items-center fs-21 text-weight-medium q-mb-28">
				<p class="q-mr-40">Twitter Race</p>
				<p class="text-gradient">200,000 CLAY Airdrop</p>
			</div>
			<p class="opacity-40 q-mb-40">
				Adam Clay is a Barbadian-Italian singer, producer, DJ, and author of many international hits, among which the best-known is undoubtedly Born Again (Babylonia). Recognized as a dance music anthem worldwide, the song has been played and supported for more than a decade by the greatest international.
			</p>
			<a href="" class="fs-18 text-weight-medium flex items-center q-mb-45">
				<span class="q-mr-20">Read the guide</span>
				<q-icon class="text-primary" size="12px" :name="resolveIcon('arrow-right', 14, 14)"></q-icon>
			</a>

			<LargeButton
				fit
				:padding-x="32"
				:padding-y="18">
				<div class="flex items-center">
					<span class="q-mr-20">
						Post on Twitter
					</span>
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
		<p class="fs-18 font-weight-medium">
			Eligible Accounts
		</p>
		<div
			@click="focussed"
			@focusout="searchFocussed = false"
			:class="'relative-position cursor-pointer group'"
		>
			<div class="absolute-full bg-white rounded-30 opacity-5 shadow-md group-hover:opacity-15">

			</div>
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
		:rows="accounts"
		hide-header
		:filter="searchValue"
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
					<q-avatar size="30px" class="q-mr-22">
						<img :src="slotProps.row.image" :alt="slotProps.row.name" />
					</q-avatar>
					<p class="text-weight-medium fs-15">
						{{ slotProps.row.name }}
					</p>
				</div>
			</q-td>
		</template>
		<template v-slot:body-cell-account="slotProps">
			<q-td :props="slotProps">
				<span class="opacity-40">
					@{{ slotProps.row.account }}
				</span>
			</q-td>
		</template>
	</LightTable>
</template>