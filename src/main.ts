import { createApp } from "vue"
import { createPinia } from "pinia"
import { Quasar, Notify, Dialog } from "quasar"
import { createPersistedStatePlugin } from "pinia-plugin-persistedstate-2"
import { createRouter, createWebHistory } from "vue-router"
import "@/common/validation"
import VueGtag from "vue-gtag"
import VueCountdown from "@chenfengyuan/vue-countdown"
import Plugin from "@storipress/apollo-vue-devtool"

// Import Quasar css
import "quasar/src/css/index.sass"
import "./css/main.scss"

import App from "./App.vue"

import routes, { disabledRoutes } from "@/configs/routes"

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
	document.title = "Sinfonia"

	if (disabledRoutes) {
		if (to.name !== "Playground") {
			return { name: "Playground" }
		}
	}

	return true
})

const app = createApp(App)

app.use(
	VueGtag,
	{
		appName: import.meta.env.VITE_GA_APP_NAME,
		pageTrackerScreenviewEnabled: true,
		config: { id: import.meta.env.VITE_GA_MEASUREMENT_ID },
	},
	router
)

app.use(Quasar, {
	plugins: {
		Dialog,
		Notify,
	},
	config: {
		framework: {
			cssAddon: true,
		},
		notify: {
			iconSize: "28px",
			html: true,
		},
	},
})

const pinia = createPinia()

pinia.use(createPersistedStatePlugin())

app.use(pinia)

app.use(router)

app.use(Plugin)

app.component(VueCountdown.name, VueCountdown)

app.mount("#app")
