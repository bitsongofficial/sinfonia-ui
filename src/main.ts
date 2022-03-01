import { createApp } from 'vue'
import { Quasar } from 'quasar'

// Import Quasar css
import 'quasar/src/css/index.sass'

import App from './App.vue'

const app = createApp(App)

app.use(Quasar, {
  plugins: {},
})

app.mount('#app')
