import { MenuItem } from "@/types"
import Wrapper from "@/components/pages/Wrapper.vue"
import Dex from "@/components/pages/Dex.vue"
import Pools from "@/components/pages/Pools.vue"
import Assets from "@/components/pages/Assets.vue"
import Swap from "@/components/pages/Swap.vue"
import Pool from "@/components/pages/Pool.vue"
import FanToken from "@/components/pages/FanToken.vue"
import Leaderboard from "@/components/pages/Leaderboard.vue"
import Airdrops from "@/components/pages/Airdrops.vue"
import { RouteRecordRaw } from "vue-router"
import { externalWebsites } from "./config"

export const disabledRoutes =
	import.meta.env.VITE_PLAYGROUND_DISABLE_ROUTES === "true"

export const disabledTransactions =
	import.meta.env.VITE_TRANSACTIONS_DISABLE === "true"

export const disabledPlayground =
	import.meta.env.VITE_PLAYGROUND_DISABLE === "true"

const routes: RouteRecordRaw[] = [
	{
		path: "/",
		redirect: "/fantokens",
	},
	{
		path: "/fantokens",
		component: Wrapper,
		children: [
			{
				path: "",
				component: Dex,
				name: "Fantokens Dex",
			},
			{
				path: ":id",
				component: FanToken,
				name: "Fantoken",
			},
		],
	},
	{
		path: "/swap",
		name: "Swap",
		component: Swap,
		props: (route) => ({
			from: route.query.from ?? "BTSG",
			to: route.query.to ?? "CLAY",
		}),
	},
	{
		path: "/pools",
		component: Wrapper,
		children: [
			{
				path: "",
				name: "Pools",
				component: Pools,
			},
			{
				path: ":id",
				name: "Pool",
				component: Pool,
			},
		],
	},
	{
		path: "/assets",
		name: "Assets",
		component: Assets,
	},
	{
		path: "/airdrops",
		name: "Airdrops",
		component: Airdrops,
	},
	{
		path: "/:pathMatch(.*)",
		redirect: "/fantokens",
	},
]

export const menuItems: MenuItem[] = [
	{
		icon: { name: "refresh", width: 21, height: 17 },
		label: "Swap",
		path: "/swap",
		disabled: disabledRoutes,
	},
	{
		icon: { name: "list", width: 19, height: 13 },
		label: "FanTokens",
		path: "/fantokens",
		disabled: disabledRoutes,
	},
	{
		icon: { name: "stack", width: 17, height: 17 },
		label: "Pools",
		path: "/pools",
		disabled: disabledRoutes,
	},
	{
		icon: { name: "suitcase", width: 18, height: 16 },
		label: "Assets",
		path: "/assets",
		disabled: disabledRoutes,
	},
	{
		icon: { name: "airdrop", width: 20, height: 22 },
		label: "Airdrops",
		path: "/airdrops",
		disabled: disabledRoutes,
	},
]

if (!disabledTransactions) {
	menuItems.push({
		icon: { name: "swap", width: 21, height: 16 },
		label: "Transactions",
		path: `${externalWebsites.mintscan}bitsong/txs`,
		isLink: true,
	})
}

if (!disabledPlayground) {
	menuItems.push({
		icon: { name: "clubs", width: 21, height: 22 },
		label: "Playground",
		path: "/playground",
	})

	routes.push({
		path: "/playground",
		name: "Playground",
		component: Leaderboard,
	})
}

export default routes
