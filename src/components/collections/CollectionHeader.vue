<script setup lang="ts">
import { BitsongCollection } from "@/types"

defineProps<{
	collection: BitsongCollection
}>()
</script>

<template>
	<div class="row justify-between q-px-20 q-pb-20">
		<div class="column w-full">
			<div class="row items-center justify-between relative-position">
				<div class="row items-center">
					<q-avatar class="-q-mt-10">
						<img class="border-white-2" :src="collection.metadata?.image" />
					</q-avatar>
					<p
						class="fs-21 !leading-24 text-weight-medium text-capitalize q-ml-24 q-mt-12"
						v-if="collection.init"
					>
						{{ collection.init.name }}
					</p>
				</div>
			</div>
		</div>
	</div>
</template>
