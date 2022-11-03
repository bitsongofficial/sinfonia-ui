<script setup lang="ts">
import { BitsongCollection } from "@/types"

defineProps<{
	collection: BitsongCollection
}>()
</script>

<template>
	<div class="row justify-between">
		<div class="column w-full">
			<div class="row items-center justify-between relative-position">
				<div class="row items-center">
					<p
						class="fs-21 !leading-24 text-weight-medium text-capitalize"
						v-if="collection.init"
					>
						{{ collection.init.name }}
					</p>
				</div>
			</div>
		</div>
	</div>
</template>
