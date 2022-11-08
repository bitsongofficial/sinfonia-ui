<script setup lang="ts"></script>

<template>
	<q-btn flat rounded class="text-capitalize">
		<slot></slot>
	</q-btn>
</template>

<style lang="scss" scoped>
.q-btn {
	padding: 0;
	min-height: auto;
	color: transparent;

	&:deep(.q-focus-helper) {
		display: none;
	}
}
</style>
