<script setup lang="ts">
import Spinner from "@/components/Spinner"
import Title from "@/components/typography/Title.vue"
</script>

<template>
	<div
		class="flex column items-center justify-center bg-secondary-80 window-width window-height fixed top-0 left-0 z-99999"
	>
		<Spinner class="!w-50 !h-50 q-mx-auto" />
		<Title class="q-mt-32">Loading...</Title>
	</div>
</template>
