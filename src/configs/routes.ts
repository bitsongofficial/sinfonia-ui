import Dex from "@/components/pages/Dex.vue"
import Pools from "@/components/pages/Pools.vue"
import Assets from "@/components/pages/Assets.vue"
import Swap from "@/components/pages/Swap.vue"

const routes = [
    { path: '/', component: Dex },
    { path: '/swap', component: Swap },
    { path: '/pools', component: Pools },
    { path: '/assets', component: Assets },
]

export default routes