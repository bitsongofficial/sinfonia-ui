<script setup lang="ts">
import { RouterView } from "vue-router"
</script>

<template>
	<router-view v-slot="{ Component }">
		<Transition name="fade" mode="out-in">
			<component :is="Component"></component>
		</Transition>
	</router-view>
</template>
