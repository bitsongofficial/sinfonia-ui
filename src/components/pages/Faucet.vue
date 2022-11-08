<script setup lang="ts">
import Title from "@/components/typography/Title.vue"
</script>

<template>
	<div>
		<div class="row q-mb-62 position-relative">
			<Title class="q-mb-32 col-12">Get testnet faucet tokens</Title>

			<p class="fs-18 opacity-50 q-mb-16 col-12">
				You can request tokens from the official
				<a
					class="text-weight-medium flex inline items-center text-primary"
					href="https://discord.bitsong.io/"
					target="_blank"
					>BitSong Discord</a
				>
				server by sending the following message on the #testnet-faucet channel:
			</p>

			<pre
				class="flex items-center justify-start bg-white-10 rounded-5 q-pa-10 q-mb-32 col-12 col-md-6"
			>
!faucet address</pre
			>

			<p class="fs-18 opacity-50 q-mb-16 col-12">
				Then you can check that your balance fo your wallet account by typing the
				command:
			</p>

			<pre
				class="flex items-center justify-start bg-white-10 rounded-5 q-pa-10 q-mb-32 col-12 col-md-6"
			>
bitsongd query bank balances $(bitsongd keys show -a mywallet)</pre
			>
		</div>
	</div>
</template>
