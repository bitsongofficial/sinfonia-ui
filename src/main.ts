import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedStatePlugin } from 'pinia-plugin-persistedstate-2'
import { Quasar, Dialog } from 'quasar'
import {createRouter, createWebHashHistory} from 'vue-router'

// Import Quasar css
import 'quasar/src/css/index.sass'
import './css/main.scss'

import App from './App.vue'

import routes from '@/configs/routes'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: function(to, from, savedPosition) {
    if (to.hash) {

      return { el: to.hash }
    }
  },
})

const app = createApp(App)

app.use(Quasar, {
  plugins: {
    Dialog,
  },
  config: {
    framework: {
      cssAddon: true,
    },
  },
})

const pinia = createPinia()

pinia.use(createPersistedStatePlugin())

app.use(pinia)

app.use(router)

app.mount('#app')
