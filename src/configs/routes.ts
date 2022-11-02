import { MenuItem } from "@/types"
import { RouteRecordRaw } from "vue-router"
import { externalWebsites } from "./config"

export const disabledRoutes =
	import.meta.env.VITE_PLAYGROUND_DISABLE_ROUTES === "true"

export const disabledTransactions =
	import.meta.env.VITE_TRANSACTIONS_DISABLE === "true"

export const disabledPlayground =
	import.meta.env.VITE_PLAYGROUND_DISABLE === "true"

export const disabledAirdrops = import.meta.env.VITE_AIRDROPS_DISABLE === "true"

const routes: RouteRecordRaw[] = [
	{
		path: "/",
		redirect: "/assets",
	},
	/* {
		path: "/fantokens",
		component: () => import("@/components/pages/Wrapper.vue"),
		meta: {
			title: "Fantokens",
		},
		children: [
			{
				path: "",
				component: () => import("@/components/pages/Dex.vue"),
				name: "Fantokens Dex",
				meta: {
					breadcrumbHide: true,
				},
			},
			{
				path: ":id",
				component: () => import("@/components/pages/FanToken.vue"),
				name: "Fantoken",
			},
		],
	},
	{
		path: "/swap",
		name: "Swap",
		component: () => import("@/components/pages/Swap.vue"),
		props: (route) => ({
			from: route.query.from ?? "BTSG",
			to: route.query.to ?? "CLAY",
		}),
		meta: {
			title: "Swap",
		},
	}, */
	/* {
		path: "/pools",
		component: () => import("@/components/pages/Wrapper.vue"),
		meta: {
			title: "Pools",
		},
		children: [
			{
				path: "",
				name: "Pools",
				component: () => import("@/components/pages/Pools.vue"),
				meta: {
					breadcrumbHide: true,
				},
			},
			{
				path: ":id",
				name: "Pool",
				component: () => import("@/components/pages/Pool.vue"),
			},
		],
	}, */
	{
		path: "/assets",
		name: "Assets",
		component: () => import("@/components/pages/Assets.vue"),
		meta: {
			title: "Assets",
		},
	},
	{
		path: "/collections",
		name: "CollectionsWrapper",
		component: () => import("@/components/pages/Wrapper.vue"),
		meta: {
			title: "Collections",
		},
		children: [
			{
				path: ":codeId?",
				name: "Collections",
				component: () => import("@/components/pages/collections/Collections.vue"),
				meta: {
					breadcrumbHide: true,
				},
			},
			{
				path: ":codeId/create",
				name: "CreateCollection",
				component: () =>
					import("@/components/pages/collections/CreateCollection.vue"),
				meta: {
					title: "Create Collection",
				},
			},
			{
				path: ":address/details",
				name: "CollectionDetails",
				component: () => import("@/components/pages/collections/Collection.vue"),
				meta: {
					title: "Collection",
				},
			},
		],
	},
	/* {
		path: "/airdrops",
		name: "Airdrops",
		component: () => import("@/components/pages/Airdrops.vue"),
		meta: {
			title: "Airdrops",
		},
	}, */
	{
		path: "/:pathMatch(.*)",
		redirect: "/404",
	},
	{
		path: "/404",
		name: "NotFound",
		component: () => import("@/components/pages/NotFound.vue"),
		meta: {
			title: "404",
		},
	},
]

export const menuItems: MenuItem[] = [
	/* {
		icon: { name: "refresh", width: 21, height: 17 },
		label: "Swap",
		path: "/swap",
		disabled: disabledRoutes,
	}, */
	/* {
		icon: { name: "list", width: 19, height: 13 },
		label: "FanTokens",
		path: "/fantokens",
		disabled: disabledRoutes,
	}, */
	/* {
		icon: { name: "stack", width: 17, height: 17 },
		label: "Pools",
		path: "/pools",
		disabled: disabledRoutes,
	}, */
	{
		icon: { name: "suitcase", width: 18, height: 16 },
		label: "Assets",
		path: "/assets",
		disabled: disabledRoutes,
	},
	{
		icon: { name: "list", width: 19, height: 13 },
		label: "Collections",
		path: "/collections",
		disabled: disabledRoutes,
	},
]

/* if (!disabledAirdrops) {
	menuItems.push({
		icon: { name: "airdrop", width: 20, height: 22 },
		label: "Airdrops",
		path: "/airdrops",
		disabled: disabledRoutes,
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
		component: () => import("@/components/pages/PlaygroundWIP.vue"),
		meta: {
			title: "Playground",
		},
	})
}

if (!disabledTransactions) {
	menuItems.push({
		icon: { name: "swap", width: 21, height: 16 },
		label: "Transactions",
		path: `${externalWebsites.mintscan}bitsong/txs`,
		isLink: true,
	})
} */

export default routes
