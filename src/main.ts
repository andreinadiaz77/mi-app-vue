/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

import * as Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
// Components
import App from './App.vue'

// Composables
// import { createApp } from 'vue'

const app = Vue.createApp(App)
app.use(VueAxios,axios)
app.use(VueSweetalert2)
app.component('VueDatePicker', VueDatePicker);

registerPlugins(app)

app.mount('#app')

