<script setup lang="ts">
	defineProps<{
		withIcon?: boolean,
		noPadding?: boolean,
	}>()
</script>

<template>
	<q-btn
		flat
		rounded
		:class="(withIcon ? 'btn-with-icon ' : '') + (noPadding ? '' : 'q-py-12 q-px-22 ') + 'fs-12 text-weight-medium bg-gradient text-capitalize light:text-white'"
	>
		<slot></slot>
	</q-btn>
</template>
