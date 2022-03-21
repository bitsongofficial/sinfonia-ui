import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar } from 'quasar'
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
  plugins: {},
  config: {
    framework: {
      cssAddon: true,
    },
  },
})

app.use(createPinia())

app.use(router)

app.mount('#app')
