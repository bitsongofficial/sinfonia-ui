import { createApp } from "vue"
import { createPinia } from "pinia"
import { Quasar, Notify, Dialog } from "quasar"
import { createPersistedStatePlugin } from "pinia-plugin-persistedstate-2"
import { createRouter, createWebHashHistory } from "vue-router"
import VueGtag from "vue-gtag"

// Import Quasar css
import "quasar/src/css/index.sass"
import "./css/main.scss"

import App from "./App.vue"

import routes from "@/configs/routes"

const router = createRouter({
	history: createWebHashHistory(),
	routes,
	scrollBehavior: function (to) {
		if (to.hash) {
			return { el: to.hash }
		}
	},
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

app.mount("#app")
