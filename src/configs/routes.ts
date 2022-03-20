import Dex from "@/components/pages/Dex.vue"
import Pools from "@/components/pages/Pools.vue"
import Assets from "@/components/pages/Assets.vue"
import Swap from "@/components/pages/Swap.vue"
import Pool from "@/components/pages/Pool.vue"
import FanToken from "@/components/pages/FanToken.vue"

const routes = [
    { path: '/', component: Dex },
    { path: '/swap', component: Swap },
    { path: '/pools', component: Pools },
    { path: '/assets', component: Assets },
    { path: '/pool/:id', component: Pool },
    { path: '/token/:id', component: FanToken },
]

export default routes