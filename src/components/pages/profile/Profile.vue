<script setup lang="ts">
import Title from "@/components/typography/Title.vue"
import { formatShortAddress } from "@/common"
import useAuth from "@/store/auth"

const authStore = useAuth()
</script>

<template>
	<div class="text-white text-weight-medium">
		<div class="w-full position-relative q-mb-60">
			<q-img
				class="w-full rounded-20"
				:src="`https://pimg.sinfonia.zone/1345x300/https://bas-cdn.com/ipfs/QmVRX5JuS8gPG8Hca8bPPauRLkHVjVM1bS8kmRkAoks48R`"
				ratio="16/9"
				alt="Cover"
				title="Cover"
				width="100%"
				height="300px"
			/>

			<img
				class="absolute-bottom !left-24 !-bottom-24 border-white-2 w-126 h-126 rounded-full object-cover z-1"
				:src="`https://pimg.sinfonia.zone/125x125/https://bas-cdn.com/ipfs/QmVRX5JuS8gPG8Hca8bPPauRLkHVjVM1bS8kmRkAoks48R`"
			/>
		</div>
		<div class="q-mb-40 grid grid-cols-12 gap-24">
			<div class="col-span-12 col-span-md-7">
				<Title :font-size="32" class="q-mb-16">{{
					formatShortAddress(authStore.bitsongAddress)
				}}</Title>
			</div>
		</div>
	</div>
</template>
