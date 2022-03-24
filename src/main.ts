import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar, Notify } from 'quasar'
import { createPersistedStatePlugin } from 'pinia-plugin-persistedstate-2'
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
    Notify
  },
  config: {
    framework: {
      cssAddon: true,
    },
    notify: {
      classes: 'bg-notification-background rounded-20 q-pt-20 q-pb-18 q-px-30 min-w-440',
      iconSize: '28px',
      html: true,
    }
  },
})

const pinia = createPinia()

pinia.use(createPersistedStatePlugin())

app.use(pinia)

app.use(router)

app.mount('#app')
