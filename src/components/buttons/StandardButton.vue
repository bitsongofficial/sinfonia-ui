<script setup lang="ts">
	defineProps<{
		withIcon?: boolean,
	}>()
</script>

<template>
	<q-btn
		flat
		rounded
		:class="(withIcon ? 'btn-with-icon ' : '') + 'fs-12 text-weight-medium q-py-12 q-px-22 bg-gradient text-capitalize light:text-white'"
	>
		<slot></slot>
	</q-btn>
</template>
