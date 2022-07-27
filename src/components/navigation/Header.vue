<script setup lang="ts">
import { RouterLink } from "vue-router"
import { useQuasar } from "quasar"
import { resolveIcon, balancedCurrency } from "@/common"
import { formatDistanceToNow } from "date-fns"
import { externalWebsites } from "@/configs/config"
import { computed, ref } from "vue"
import useBank from "@/store/bank"
import Logo from "@/components/Logo.vue"
import StandardButton from "@/components/buttons/StandardButton.vue"
import Drawer from "@/components/navigation/Drawer.vue"
import WalletAddress from "@/components/WalletAddress.vue"
import Breadcrumb from "@/components/navigation/Breadcrumb.vue"
import Spinner from "@/components/Spinner"
import Title from "@/components/typography/Title.vue"
import useAuth from "@/store/auth"
import useTransactionManager from "@/store/transaction-manager"

const $q = useQuasar()
const bankStore = useBank()
const authStore = useAuth()
const transactionStore = useTransactionManager()

const expanded = ref(false)

const isProduction = import.meta.env.VITE_MODE

const previewSwapTransactions = computed(() =>
	transactionStore.swapTransactions.slice(0, 5)
)

const otherSwapTransactions = computed(() =>
	transactionStore.swapTransactions.slice(5, 10)
)
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
				<div
					class="notification-wrapper column items-center justify-center position-relative cursor-pointer q-mr-32"
					:class="{
						active: transactionStore.loading,
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
							v-if="transactionStore.swapTransactions.length === 0"
						>
							No transactions yet.
						</p>

						<template v-else>
							<q-item
								v-for="(tx, index) in previewSwapTransactions"
								:key="index"
								:href="
									tx.tx
										? `${externalWebsites.mintscan}${tx.from.coinGeckoId}/txs/${tx.tx.transactionHash}`
										: undefined
								"
								:clickable="tx.tx !== undefined"
								target="_blank"
								class="row items-center justify-between w-full !opacity-100"
							>
								<span
									class="fs-12 !leading-18 text-white"
									v-if="tx.status === 'broadcasting' || tx.status === 'pending'"
									:class="{
										'text-white': tx.status === 'broadcasting' || tx.status === 'pending',
										'text-gray': tx.status !== 'broadcasting' && tx.status !== 'pending',
									}"
								>
									You’re swapping {{ balancedCurrency(tx.fromAmount ?? 0) }}
									{{ tx.fromSwap?.symbol }} in {{ balancedCurrency(tx.toAmount ?? 0) }}
									{{ tx.toSwap?.symbol }}
								</span>
								<span
									class="fs-12 !leading-18 text-gray hover:text-white"
									v-else-if="tx.status === 'success'"
								>
									You swapped {{ balancedCurrency(tx.fromAmount ?? 0) }}
									{{ tx.fromSwap?.symbol }} in {{ balancedCurrency(tx.toAmount ?? 0) }}
									{{ tx.toSwap?.symbol }}
								</span>
								<span class="fs-12 !leading-18 text-gray hover:text-white" v-else>
									Error swapping {{ balancedCurrency(tx.fromAmount ?? 0) }}
									{{ tx.fromSwap?.symbol }} in {{ balancedCurrency(tx.toAmount ?? 0) }}
									{{ tx.toSwap?.symbol }}
								</span>

								<Spinner
									v-if="tx.status === 'broadcasting' || tx.status === 'pending'"
									class="!w-16 !h-16 q-ml-12"
								/>

								<span
									class="fs-10 text-weight-medium text-right opacity-40 q-ml-12 min-w-60"
									v-else
								>
									{{ formatDistanceToNow(new Date(tx.time)) }}
								</span>
							</q-item>
							<q-slide-transition v-if="otherSwapTransactions.length > 0">
								<div v-show="expanded">
									<q-item
										v-for="(tx, index) in otherSwapTransactions"
										:key="index"
										:href="
											tx.tx
												? `${externalWebsites.mintscan}${tx.from.coinGeckoId}/txs/${tx.tx.transactionHash}`
												: undefined
										"
										:clickable="tx.tx !== undefined"
										target="_blank"
										class="row items-center justify-between w-full !opacity-100"
									>
										<span
											class="fs-12 !leading-18 text-white"
											v-if="tx.status === 'broadcasting' || tx.status === 'pending'"
											:class="{
												'text-white':
													tx.status === 'broadcasting' || tx.status === 'pending',
												'text-gray':
													tx.status !== 'broadcasting' && tx.status !== 'pending',
											}"
										>
											You’re swapping {{ balancedCurrency(tx.fromAmount ?? 0) }}
											{{ tx.fromSwap?.symbol }} in {{ balancedCurrency(tx.toAmount ?? 0) }}
											{{ tx.toSwap?.symbol }}
										</span>
										<span
											class="fs-12 !leading-18 text-gray hover:text-white"
											v-else-if="tx.status === 'success'"
										>
											You swapped {{ balancedCurrency(tx.fromAmount ?? 0) }}
											{{ tx.fromSwap?.symbol }} in {{ balancedCurrency(tx.toAmount ?? 0) }}
											{{ tx.toSwap?.symbol }}
										</span>
										<span class="fs-12 !leading-18 text-gray hover:text-white" v-else>
											Error swapping {{ balancedCurrency(tx.fromAmount ?? 0) }}
											{{ tx.fromSwap?.symbol }} in {{ balancedCurrency(tx.toAmount ?? 0) }}
											{{ tx.toSwap?.symbol }}
										</span>

										<Spinner
											v-if="tx.status === 'broadcasting' || tx.status === 'pending'"
											class="!w-16 !h-16 q-ml-12"
										/>

										<span
											class="fs-10 text-weight-medium text-right opacity-40 q-ml-12 min-w-60"
											v-else
										>
											{{ formatDistanceToNow(new Date(tx.time)) }}
										</span>
									</q-item>
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
