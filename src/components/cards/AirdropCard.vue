<script setup lang="ts">
import Card from "./Card.vue"
import LargeButton from "@/components/buttons/LargeButton.vue"

defineProps<{
	airdrop: any
}>()
</script>

<template>
	<Card
		class="q-px-24 q-py-32 light:bg-white"
		transparency="5"
		shadow="shadow-none"
		:padding="24"
	>
		<div class="row items-center justify-between q-mb-28">
			<div class="column items-start text-weight-medium">
				<p class="fs-14 !leading-18 q-mb-8 text-gradient text-uppercase">Drop</p>
				<p class="fs-16 !leading-20 text-capitalize">{{ airdrop.name }}</p>
			</div>

			<q-avatar size="45px">
				<img
					src="https://raw.githubusercontent.com/bitsongofficial/assetlists/testnet/logos/clay.png"
					alt="Clay"
				/>
			</q-avatar>
		</div>

		<div class="row grid-gap-32 q-mb-28">
			<div class="column items-start flex-half">
				<p class="fs-14 !leading-18 q-mb-8 opacity-30 text-uppercase">Amount</p>
				<p class="fs-15 !leading-19 text-capitalize">
					{{ airdrop.amount }}

					<span class="opacity-40 q-ml-6 text-uppercase">{{ airdrop.denom }}</span>
				</p>
			</div>
			<div class="column items-start flex-half">
				<p class="fs-14 !leading-18 q-mb-8 opacity-30 text-uppercase">Claimed</p>
				<p class="fs-15 !leading-19 text-capitalize">{{ airdrop.claimed }}</p>
			</div>
		</div>

		<div
			class="column q-mb-36 q-px-22 q-py-24 rounded-20 shadow-20 bg-primary-dark light:bg-gray-800-opacity-50 light:shadow-none"
		>
			<div class="row items-center justify-between q-mb-16">
				<p class="fs-14 !leading-18 opacity-30 text-uppercase">sender</p>
				<p class="fs-15 !leading-19 opacity-60">{{ airdrop.sender }}</p>
			</div>
			<div class="row items-center justify-between">
				<p class="fs-14 !leading-18 opacity-30 text-uppercase">datetime</p>
				<p class="fs-15 !leading-19 opacity-60">{{ airdrop.datetime }}</p>
			</div>
		</div>

		<LargeButton label="Claim" :padding-y="18" v-if="airdrop.claim" />
		<q-btn
			v-else
			outline
			rounded
			color="white"
			label="Claimed"
			disable
			class="q-px-22 q-py-18 fs-16 full-width text-secondry-390 btn-outline-minimal light:before:border-2 light:hover:helper-white text-capitalize"
		/>
	</Card>
</template>
