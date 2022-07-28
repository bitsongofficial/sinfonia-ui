<script setup lang="ts">
import LargeButton from "@/components/buttons/LargeButton.vue"
</script>

<template>
	<div class="grid grid-cols-12 gap-40">
		<div
			class="col-span-12 col-start-md-4 col-span-md-5 flex items-center column"
		>
			<q-img
				class="q-mt-md-34 q-mb-48 opacity-90 max-w-316 full-width"
				src="@/assets/images/cup.png"
				alt="404 Not Found"
				title="404 Not Found"
				width="316px"
				height="316px"
				no-spinner
			/>

			<h1 class="fs-36 !leading-42 text-weight-medium text-center q-mt-0 q-mb-32">
				I'm coming home, I'm<br />coming home
			</h1>

			<p
				class="fs-16 !leading-24 opacity-40 text-center q-mb-62 white-space-pre-line"
			>
				Nothing to do here at moment, more prizes coming soon!<br />Stay updated
			</p>

			<div class="flex justify-center">
				<LargeButton fit class="q-px-64 q-py-22" to="/pools">
					Go to Pools List
				</LargeButton>
			</div>
		</div>
	</div>
</template>
