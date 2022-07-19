<script setup lang="ts">
import { onMounted } from "vue"
import LargeButton from "@/components/buttons/LargeButton.vue"

onMounted(() => {
	document.title = "404 - Page Not Found"
})
</script>

<template>
	<div class="row justify-center">
		<q-img
			class="col-5 col-md-2 q-mt-md-34 q-mb-48"
			src="@/assets/images/microphone.png"
			alt="404 Not Found"
			title="404 Not Found"
			width="316px"
			height="316px"
			no-spinner
		/>

		<h1
			class="col-8 fs-36 !leading-46 font-weight-medium text-center q-mt-0 q-mb-32"
		>
			Ops, something is missing.
		</h1>

		<p
			class="col-8 col-md-4 col-lg-3 fs-16 !leading-24 opacity-40 text-center q-mb-62"
		>
			Adam Clay is a Barbadian-Italian singer, producer, DJ, and author of many
			international hits, among which the best-known is undoubtedly.
		</p>

		<div class="col-8 flex justify-center">
			<LargeButton fit class="q-px-64 q-py-22" to="/pools">
				Go to Pools List
			</LargeButton>
		</div>
	</div>
</template>
