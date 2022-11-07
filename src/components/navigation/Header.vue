<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router"
import { useQuasar } from "quasar"
import { resolveIcon } from "@/common"
import { computed, ref } from "vue"
import useBank from "@/store/bank"
import Logo from "@/components/Logo.vue"
import StandardButton from "@/components/buttons/StandardButton.vue"
import Drawer from "@/components/navigation/Drawer.vue"
import WalletAddress from "@/components/WalletAddress.vue"
import IconButton from "@/components/buttons/IconButton.vue"
import Breadcrumb from "@/components/navigation/Breadcrumb.vue"
import Spinner from "@/components/Spinner"
import Title from "@/components/typography/Title.vue"
import useAuth from "@/store/auth"
import useTransactionManager from "@/store/transaction-manager"
import TransactionItem from "./TransactionItem.vue"

const $q = useQuasar()
const route = useRoute()
const bankStore = useBank()
const authStore = useAuth()
const transactionStore = useTransactionManager()

const code = parseInt(import.meta.env.VITE_BS721_CODE_ID, 10)

const expanded = ref(false)

const isProduction = import.meta.env.VITE_MODE

const previewSwapTransactions = computed(() =>
	transactionStore.transactions.slice(0, 5)
)

const otherSwapTransactions = computed(() =>
	transactionStore.transactions.slice(5, 10)
)

const fantoken = computed(() => route.name === "Fantoken")
</script>
<template>
	<div v-if="$q.screen.gt.md" class="row justify-between items-center">
		<div
			class="full-width !w-xs-1/3 q-px-xs-0 !w-sm-1/4 !w-md-1/6 self-end fixed-xs z-10 left-0 bottom-0"
		>
			<RouterLink to="/fantokens">
				<Logo></Logo>
			</RouterLink>
		</div>

		<div
			class="row items-center justify-between full-width q-ml-auto !w-xs-2/3 !w-sm-3/4 !w-md-5/6"
		>
			<Breadcrumb />

			<div class="settings flex items-center no-wrap">
				<div>
					<IconButton
						icon="add"
						width="12"
						height="12"
						class="text-white fs-14 q-mr-32 w-36"
						:to="`/nfts/${code}/create`"
						:solid="true"
					/>
				</div>
				<div
					class="notification-wrapper column items-center justify-center position-relative cursor-pointer q-mr-32"
					:class="{
						active: transactionStore.loading,
						fantoken,
					}"
					@click="transactionStore.notificationUnread = false"
				>
					<div class="notification-icon">
						<q-icon
							class="text-primary-light"
							size="18px"
							:name="resolveIcon('bell', 18, 18)"
						/>

						<q-badge
							class="bg-gradient small-notification-badge"
							floating
							rounded
							v-if="transactionStore.notificationUnread"
						/>
					</div>

					<Spinner class="notification-spinner" />

					<q-menu
						class="notification-menu"
						anchor="bottom middle"
						self="top middle"
						:offset="[0, 32]"
						:class="{
							fantoken,
						}"
					>
						<div
							class="row items-center justify-between q-pb-16 q-mb-14 border-bottom-white-10 light:border-bottom-secondary-10"
						>
							<Title :font-size="16">Notifications</Title>

							<StandardButton
								class="q-px-12 q-py-2 min-h-18"
								color="dark-30"
								no-padding
								text-transform="lowercase"
								@click="transactionStore.reset"
							>
								clear all
							</StandardButton>
						</div>
						<p
							class="text-white opacity-50 fs-14 text-center q-pt-10 q-pb-14"
							v-if="transactionStore.transactions.length === 0"
						>
							No transactions yet.
						</p>

						<template v-else>
							<TransactionItem
								v-for="(tx, index) in previewSwapTransactions"
								:key="index"
								:transaction="tx"
							/>
							<q-slide-transition v-if="otherSwapTransactions.length > 0">
								<div v-show="expanded">
									<TransactionItem
										v-for="(tx, index) in otherSwapTransactions"
										:key="index"
										:transaction="tx"
									/>
								</div>
							</q-slide-transition>

							<div
								class="w-46 h-21 rounded shadow-20 bg-primary-dark light:opacity-20 cursor-pointer q-ml-auto q-mr-auto"
								@click="expanded = !expanded"
								v-if="otherSwapTransactions.length > 0"
							>
								<div
									class="hover:bg-white-20 full-height rounded full-width flex justify-center items-center"
								>
									<q-icon
										:class="'fs-10 light:text-white ' + (expanded ? 'rotate-180' : '')"
										:name="resolveIcon('dropdown', 11, 7)"
									></q-icon>
								</div>
							</div>
						</template>
					</q-menu>
				</div>
				<div>
					<StandardButton
						v-if="isProduction === 'testnet' && authStore.session"
						:disable="bankStore.loadingFaucet"
						@click="bankStore.getFaucet"
						with-icon
						:icon="resolveIcon('coin', 24, 24)"
						class="bg-gradient-primary-pink fs-14 q-ml-30 q-mr-30"
					>
						Get BTSG
					</StandardButton>
				</div>
				<WalletAddress></WalletAddress>
			</div>
		</div>
	</div>
	<Drawer v-else></Drawer>
</template>
