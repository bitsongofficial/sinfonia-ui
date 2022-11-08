<script lang="ts" setup>
import {
	ref,
	getCurrentInstance,
	onMounted,
	computed,
	toRef,
	watch,
	onUnmounted,
} from "vue"
import {
	onClickOutside,
	useElementBounding,
	useMediaQuery,
	usePointerSwipe,
	useSwipe,
} from "@vueuse/core"
import { useVueFuse } from "vue-fuse"
import { Token, TokenBalance } from "@/types"
import Title from "@/components/typography/Title.vue"
import CoinSelectItem from "./CoinSelectItem.vue"
import useSettings from "@/store/settings"
import { useQuasar } from "quasar"

const settingsStore = useSettings()
const $q = useQuasar()

const props = defineProps<{
	modelValue: boolean
	option: TokenBalance | null
	options: TokenBalance[]
}>()

const baseOffset = 124
const topOffset = ref(baseOffset)
const menu = ref<HTMLDivElement>()
const header = ref<HTMLDivElement>()
const selectParent = ref<HTMLDivElement>()

const isMediumScreen = useMediaQuery("(min-width: 1239px)")
const isMobileScreen = useMediaQuery("(max-width: 768px)")

const { lengthY, isSwiping } = useSwipe(header, {
	threshold: 0,
	onSwipe() {
		if (lengthY.value < 0) {
			const distance = Math.abs(lengthY.value)

			topOffset.value = baseOffset + distance
		} else {
			topOffset.value = baseOffset
		}
	},
	onSwipeEnd() {
		if (
			lengthY.value < 0 &&
			Math.abs(lengthY.value) / document.body.offsetWidth >= 0.5
		) {
			emit("update:modelValue", false)
			topOffset.value = baseOffset
		} else {
			topOffset.value = baseOffset
		}
	},
})

const { left, width } = useElementBounding(selectParent)

const options = toRef(props, "options")

const { search, resultsRaw, results } = useVueFuse(options, {
	useExtendedSearch: true,
	keys: [
		{
			name: "name",
			weight: 0.8,
		},
		{
			name: "symbol",
			weight: 0.2,
		},
	],
})

const searchValue = ref("")

const optionsFiltered = computed(() =>
	searchValue.value.length === 0 ? options.value : results.value
)

const emit = defineEmits<{
	(e: "update:modelValue", value: boolean): void
	(e: "update:option", value: TokenBalance): void
}>()

const openWatcher = watch(
	() => props.modelValue,
	(open) => {
		document.body.classList.toggle("overflow-hidden", open)
		document.body.classList.toggle("overscroll-behavior-y-contain", open)
	}
)

const onSearchChange = (value: string | number | null) => {
	if (value) {
		search.value = `'${value}`
	}
}

const onSelection = (coin: TokenBalance) => {
	emit("update:option", coin)
	emit("update:modelValue", false)
	settingsStore.setRecentTokenSelection(coin)
}

const onRecentSelect = (coin: Token) => {
	const token = options.value.find((el) => el.symbol === coin.symbol)

	if (token) {
		onSelection(token)
	}
}

onClickOutside(menu, () => {
	if (props.modelValue) {
		emit("update:modelValue", false)
	}
})

onMounted(() => {
	const element = getCurrentInstance()?.parent?.vnode.el

	if (element) {
		selectParent.value = element as HTMLDivElement
	}
})

onUnmounted(() => {
	openWatcher()
})

const menuPosition = computed(() => {
	if (isMobileScreen.value) {
		return {
			top: props.modelValue ? `${topOffset.value}px` : "100%",
			transition: !isSwiping.value ? "all 250ms ease-in-out" : "",
		}
	} else if (!isMediumScreen.value) {
		return {
			left: "50%",
			top: "50%",
			transform: "translate(-50%, -50%)",
		}
	}

	return {
		left: `${left.value}px`,
		top: "50%",
		transform: `translate(${width.value + 82}px, calc(50px - 50%))`,
	}
})
</script>

<template>
	<Teleport to="body">
		<div
			class="backdrop"
			:class="{
				open: modelValue,
			}"
		></div>
		<div
			ref="menu"
			class="coin-select-menu light:bg-gray-900 column no-wrap"
			:class="{
				open: modelValue,
			}"
			:style="menuPosition"
		>
			<div class="col-auto q-px-20" ref="header">
				<div class="notch"></div>
				<Title :font-size="18" class="q-mb-24 q-px-8"> Select Token </Title>

				<div class="relative-position group q-mt-24 q-mt-md-none q-mb-24">
					<div
						class="absolute-full bg-white rounded-30 opacity-5 light:opacity-100 shadow-md"
					></div>
					<div class="flex items-center q-px-24 q-py-12">
						<q-input
							class="full-width min-size-input"
							input-class="q-py-0 full-width"
							hide-bottom-space
							borderless
							v-model="searchValue"
							@update:modelValue="onSearchChange"
							:debounce="200"
							placeholder="Search Tokens"
							dense
						/>
					</div>
				</div>
			</div>

			<div class="overflow-overlay col q-px-20">
				<p
					class="fs-15 !leading-19 q-mb-20 opacity-30 q-px-6"
					v-if="settingsStore.recentTokenSelections.length > 0"
				>
					Recent
				</p>

				<div
					class="row items-center grid-gap-12 q-mb-24 q-pl-2 q-pr-16"
					v-if="settingsStore.recentTokenSelections.length > 0"
				>
					<q-avatar
						size="48px"
						class="cursor-pointer"
						v-for="(token, index) in settingsStore.recentTokenSelections"
						:key="index"
						@click="onRecentSelect(token)"
					>
						<img :src="token.logos.default" :alt="token.name" />
					</q-avatar>
				</div>

				<div class="row items-center justify-between q-pl-6 q-pr-10 q-mb-24">
					<p class="fs-15 !leading-19 opacity-30">Tokens</p>

					<p class="fs-13 !leading-16 opacity-30">Available</p>
				</div>

				<div class="column grid-gap-18 no-wrap q-px-10 q-pb-38">
					<p class="fs-14 text-center" v-if="optionsFiltered.length === 0">
						No tokens available
					</p>

					<TransitionGroup name="fade">
						<CoinSelectItem
							v-for="option in optionsFiltered"
							:coin="option"
							:key="option.symbol"
							@click="onSelection"
						/>
					</TransitionGroup>
				</div>
			</div>
		</div>
	</Teleport>
</template>

<style lang="scss" scroped>
.coin-select-menu {
	background: $primary-dark-700;
	box-shadow: 0px 0px 20px rgb(20 20 46 / 20%);
	border-radius: 20px;
	width: 356px;
	height: calc(100% - 120px);
	max-height: 580px;
	position: fixed;
	opacity: 0;
	transition: opacity 250ms ease-in-out;
	pointer-events: none;
	z-index: 40;
	overflow: hidden;

	&.open {
		opacity: 1;
		pointer-events: all;
	}

	@media screen and (max-width: 768px) {
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
		left: 0;
		transform: unset;
		width: 100%;
		max-height: 100%;
		height: calc(100% - 124px);
	}
}

.notch {
	margin-bottom: 38px;

	@media screen and (max-width: 768px) {
		margin-top: 10px;
		height: 3px;
		width: 124px;
		margin-left: auto;
		margin-right: auto;
		background: $white;
		opacity: 0.1;
	}
}

.backdrop {
	position: fixed;
	z-index: 21;
	width: 100%;
	height: 100%;
	background: transparentize($color: $primary-dark-400, $amount: 0.2);
	top: 0;
	left: 0;
	opacity: 0;
	transition: opacity 250ms ease-in-out;
	pointer-events: none;

	&.open {
		opacity: 1;
		pointer-events: all;
	}
}
</style>
