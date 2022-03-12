import Dex from "@/components/pages/Dex.vue"
import Pools from "@/components/pages/Pools.vue"
import Assets from "@/components/pages/Assets.vue"

const routes = [
    { path: '/', component: Dex },
    { path: '/pools', component: Pools },
    { path: '/assets', component: Assets },
]

export default routes