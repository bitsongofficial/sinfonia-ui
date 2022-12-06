<script setup lang="ts">
import { RouterView } from "vue-router"
import { PodcastExplore, Me } from "@/graphql"
import { useQuery } from "@vue/apollo-composable"
useQuery(Me)
</script>

<template>
	<router-view v-slot="{ Component }">
		<Transition name="fade" mode="out-in">
			<component :is="Component"></component>
		</Transition>
	</router-view>
</template>
