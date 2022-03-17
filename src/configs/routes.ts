import Dex from "@/components/pages/Dex.vue"
import Pools from "@/components/pages/Pools.vue"
import Assets from "@/components/pages/Assets.vue"
import Swap from "@/components/pages/Swap.vue"
import Pool from "@/components/pages/Pool.vue"

const routes = [
    { path: '/', component: Dex },
    { path: '/swap', component: Swap },
    { path: '/pools', component: Pools },
    { path: '/assets', component: Assets },
    { path: '/pool/:id', component: Pool },
]

export default routes