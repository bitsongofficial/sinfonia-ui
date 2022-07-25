<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue"
import { TokenBalance } from "@/types"
import { useRoute, useRouter } from "vue-router"
import { resolveIcon } from "@/common/resolvers"
import Card from "@/components/cards/Card.vue"
import Title from "@/components/typography/Title.vue"
import Swapper from "@/components/inputs/Swapper.vue"
import useTransactionManager from "@/store/transaction-manager"

const transactionManagerStore = useTransactionManager()
const router = useRouter()
const route = useRoute()

const props = withDefaults(
	defineProps<{
		from: string
		to: string
	}>(),
	{
		from: "BTSG",
		to: "CLAY",
	}
)

let coin1 = ref<TokenBalance | null>(null)
let coin2 = ref<TokenBalance | null>(null)

const boxesStyle = ref({ height: "0" })
const heightRef = ref<{ element: HTMLElement } | null>(null)

const setSize = () => {
	if (heightRef.value && heightRef.value.element) {
		boxesStyle.value.height =
			(heightRef.value.element.clientHeight - 122) / 2 + "px"
	}
}

onMounted(() => {
	window.addEventListener("resize", setSize)
	setSize()
})

onUnmounted(() => {
	window.removeEventListener("resize", setSize)
})

const swapperTokenChange = () => {
	let from = props.from
	let to = props.to

	if (coin1.value) {
		from = coin1.value.symbol
	}

	if (coin2.value) {
		to = coin2.value.symbol
	}

	router.replace({ ...route, query: { from, to } })
}
</script>
<template>
	<div class="text-weight-medium">
		<div class="grid grid-cols-8">
			<div class="col-span-12 col-span-md-4 col-start-md-2">
				<div class="max-w-600 q-ml-auto q-mr-auto q-mr-md-none">
					<Title class="q-mb-24">Swap Tokens</Title>
					<div class="flex row no-wrap items-start q-mb-24">
						<q-icon :name="resolveIcon('info', 15, 15)" size="15px" color="primary" />
						<p
							class="fs-14 !leading-18 q-ml-20 q-mt-none opacity-50 text-white text-weight-regular"
						>
							Remember to move your funds from the BitSong chain to the Osmosis chain
							to have them available on Sinfonia.
						</p>
					</div>
					<Card
						ref="heightRef"
						:padding="0"
						class="q-px-12 q-pt-32 q-pb-20 q-pa-sm-20 q-pa-md-36"
						transparency="5"
					>
						<Swapper
							:default-from="from"
							:default-to="to"
							v-model:coin1="coin1"
							v-model:coin2="coin2"
							@update:coin1="swapperTokenChange"
							@update:coin2="swapperTokenChange"
						/>
					</Card>
				</div>
			</div>
		</div>
	</div>
</template>
