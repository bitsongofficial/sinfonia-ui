<script setup lang="ts">
import { RouterView } from "vue-router"
import Header from "@/components/navigation/Header.vue"
import SideMenu from "@/components/navigation/SideMenu.vue"
import WalletAddress from "@/components/WalletAddress.vue"
import useBootstrap from "@/hooks/useBootstrap"
import { externalWebsites } from "./configs/config"

const { bootstrap } = useBootstrap()

bootstrap()
</script>

<template>
	<div class="min-h-window-height q-pt-70 q-pb-60 q-pb-xs-150 column">
		<div class="container">
			<div class="column col-grow">
				<Header></Header>
				<div class="no-pointer-events full-width">
					<div
						class="full-width !w-xs-1/3 q-px-xs-0 !w-sm-1/4 !w-md-1/6 self-end fixed-xs z-10 left-0 bottom-0"
					>
						<div class="column justify-end">
							<div
								class="vertical-sm-fixed relative-xs flex-xs items-center-xs justify-end-xs q-mt-vsm-40 top-0 bottom-xs-0 vertical-sm-window-height min-h-fit column justify-center"
							>
								<SideMenu class="all-pointer-events"></SideMenu>
							</div>
							<div
								class="vertical-sm-fixed full-width flex-xs jsutify-center-xs relative-xs no-pointer-events bottom-0 q-mb-40 q-mb-xs-14 q-pt-lg w-fit"
							>
								<a :href="externalWebsites.coingecko" class="all-pointer-events text-center fs-12 text-weight-medium opacity-30 q-mb-15">
									Price Data by CoinGecko
								</a>
								<WalletAddress class="all-pointer-events gt-xs"></WalletAddress>
							</div>
						</div>
					</div>
					<div class="q-ml-auto w-xs-2/3 w-sm-3/4 w-md-5/6 q-pt-74 all-pointer-events">
						<RouterView></RouterView>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style>
#app {
	color: white;
}
</style>
