import { MenuItem } from "@/types"
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import { externalWebsites } from "./config"

export const disabledRoutes =
	import.meta.env.VITE_PLAYGROUND_DISABLE_ROUTES === "true"

export const disabledTransactions =
	import.meta.env.VITE_TRANSACTIONS_DISABLE === "true"

export const disabledPlayground =
	import.meta.env.VITE_PLAYGROUND_DISABLE === "true"

export const disabledAirdrops = import.meta.env.VITE_AIRDROPS_DISABLE === "true"
export const disabledPodcasts = import.meta.env.VITE_PODCASTS_DISABLE === "true"

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
		path: "/faucet",
		name: "Faucet",
		component: () => import("@/components/pages/Faucet.vue"),
		meta: {
			title: "Faucet",
		},
	},
	{
		path: "/nfts",
		name: "CollectionsWrapper",
		component: () => import("@/components/pages/Wrapper.vue"),
		meta: {
			title: "NFTs",
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
			{
				path: ":address/id/:tokenId",
				name: "NFTDetails",
				component: () => import("@/components/pages/collections/NFT.vue"),
				meta: {
					title: "NFT",
				},
			},
			{
				path: ":address/mint",
				name: "MintNFT",
				component: () => import("@/components/pages/collections/MintNFT.vue"),
				meta: {
					title: "Mint",
				},
			},
		],
	},
	{
		path: "/podcasts",
		name: "PodcastsWrapper",
		component: () => import("@/components/pages/Wrapper.vue"),
		meta: {
			title: "Podcasts",
		},
		children: [
			{
				path: ":codeId?",
				name: "Podcasts",
				component: () => import("@/components/pages/podcasts/Podcasts.vue"),
				meta: {
					breadcrumbHide: true,
				},
			},
			{
				path: ":codeId/create",
				name: "CreatePodcast",
				component: () => import("@/components/pages/podcasts/CreatePodcast.vue"),
				meta: {
					title: "Create Podcast",
				},
			},
			{
				path: ":address/details",
				name: "PodcastDetails",
				component: () => import("@/components/pages/podcasts/Podcast.vue"),
				meta: {
					title: "Podcast",
				},
			},
			{
				path: ":address/create-episode",
				name: "CreatePodcastEpisode",
				component: () => import("@/components/pages/podcasts/CreateEpisode.vue"),
				meta: {
					title: "Create Episode",
				},
			},
			{
				path: ":address/episode/:tokenId",
				name: "PodcastEpisode",
				component: () => import("@/components/pages/podcasts/Episode.vue"),
				meta: {
					title: "Episode",
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
		icon: { name: "box", width: 24, height: 24 },
		label: "Collections",
		path: "/nfts",
		disabled: disabledRoutes,
	},
]

if (!disabledPodcasts) {
	menuItems.push({
		icon: { name: "headphones", width: 24, height: 24 },
		label: "Podcasts",
		path: "/podcasts",
		disabled: disabledRoutes,
	})
}

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

const router = createRouter({
	history: createWebHistory(),
	routes,
	scrollBehavior: function (to) {
		if (to.hash.length > 0) {
			return { el: to.hash }
		}

		const app = document.getElementById("app")

		if (app) {
			app.scrollTop = 0
		}

		return { left: 0, top: 0 }
	},
})

router.beforeEach((to) => {
	if (to.meta.title) {
		document.title = to.meta.title
	} else {
		document.title = "Sinfonia"
	}

	if (disabledRoutes) {
		if (to.name !== "Playground") {
			return { name: "Playground" }
		}
	}

	return true
})

export { routes, router }
