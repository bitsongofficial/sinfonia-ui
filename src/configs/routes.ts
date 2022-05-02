import { MenuItem } from "@/types"
import Wrapper from "@/components/pages/Wrapper.vue"
import Dex from "@/components/pages/Dex.vue"
import Pools from "@/components/pages/Pools.vue"
import Assets from "@/components/pages/Assets.vue"
import Swap from "@/components/pages/Swap.vue"
import Pool from "@/components/pages/Pool.vue"
import FanToken from "@/components/pages/FanToken.vue"
import Playground from "@/components/pages/Playground.vue"
import { RouteRecordRaw } from "vue-router"
import { externalWebsites } from "./config"

const routes: RouteRecordRaw[] = [
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
		path: "/playground",
		name: "Playground",
		component: Playground,
	},
	{
		path: "/",
		redirect: "/fantokens",
	},
]

export const menuItems: MenuItem[] = [
	{
		icon: { name: "list", width: 19, height: 13 },
		label: "DEx",
		path: "/fantokens",
	},
	{
		icon: { name: "refresh", width: 21, height: 17 },
		label: "Swap",
		path: "/swap",
	},
	{
		icon: { name: "stack", width: 17, height: 17 },
		label: "Pools",
		path: "/pools",
	},
	{
		icon: { name: "suitcase", width: 18, height: 16 },
		label: "Assets",
		path: "/assets",
	},
	/* {
		icon: { name: "swap", width: 21, height: 16 },
		label: "Transactions",
		path: `${externalWebsites.mintscan}bitsong/txs`,
		isLink: true,
	}, */
	{
		icon: { name: "clubs", width: 21, height: 22 },
		label: "Playground",
		path: "/playground",
	},
]

export default routes
