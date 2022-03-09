import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar } from 'quasar'

// Import Quasar css
import 'quasar/src/css/index.sass'
import './css/main.scss'

import App from './App.vue'

const app = createApp(App)

app.use(Quasar, {
  plugins: {},
})

app.use(createPinia())

app.mount('#app')
