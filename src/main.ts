import { createApp } from "vue"
import { createPinia } from "pinia"
import { Quasar, Notify, Dialog } from "quasar"
import { createPersistedStatePlugin } from "pinia-plugin-persistedstate-2"
import "@/common/validation"
import VueGtag from "vue-gtag"
import VueCountdown from "@chenfengyuan/vue-countdown"
import Plugin from "@storipress/apollo-vue-devtool"

// Import Quasar css
import "quasar/src/css/index.sass"
import "./css/main.scss"

import App from "./App.vue"

import { router } from "@/configs/routes"

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
