import Wrapper from "@/components/pages/Wrapper.vue"
import Dex from "@/components/pages/Dex.vue"
import Pools from "@/components/pages/Pools.vue"
import Assets from "@/components/pages/Assets.vue"
import Swap from "@/components/pages/Swap.vue"
import Pool from "@/components/pages/Pool.vue"
import FanToken from "@/components/pages/FanToken.vue"

const routes = [
	{
		path: "/fantokens",
		component: Wrapper,
		children: [
			{ path: "", component: Dex },
			{ path: ":id", component: FanToken },
		],
	},
	{ path: "/swap", component: Swap },
	{
		path: "/pools",
		component: Wrapper,
		children: [
			{ path: "", component: Pools },
			{ path: ":id", component: Pool },
		],
	},
	{ path: "/assets", component: Assets },
	{
		path: "/",
		redirect: "/fantokens",
	},
]

export default routes
