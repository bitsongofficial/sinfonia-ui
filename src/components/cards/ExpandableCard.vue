<script setup lang="ts">
import Card from "./Card.vue"
import { ref } from "vue"
import { resolveIcon } from "@/common/resolvers"

withDefaults(
	defineProps<{
		expandable: boolean
	}>(),
	{
		expandable: true,
	}
)

const expanded = ref(false)
</script>

<template>
	<Card>
		<q-card-section>
			<slot></slot>
		</q-card-section>

		<q-slide-transition>
			<div v-show="expanded">
				<q-card-section class="text-subitle2">
					<slot name="extra"></slot>
				</q-card-section>
			</div>
		</q-slide-transition>
		<div class="flex justify-center" v-if="expandable">
			<q-card-actions>
				<div
					class="w-46 h-21 rounded shadow-20 bg-primary-dark light:opacity-20 cursor-pointer"
					@click="expanded = !expanded"
				>
					<div
						class="hover:bg-white-20 full-height rounded full-width flex justify-center items-center"
					>
						<q-icon
							:class="'fs-10 light:text-white ' + (expanded ? 'rotate-180' : '')"
							:name="resolveIcon('dropdown', 11, 7)"
						></q-icon>
					</div>
				</div>
			</q-card-actions>
		</div>
	</Card>
</template>
