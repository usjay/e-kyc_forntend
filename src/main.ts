import './assets/main.css'
import '@fortawesome/fontawesome-free/css/all.css'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core'

import { faFacebookF, faTwitter, faYoutube, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'
library.add( faFacebookF, faTwitter, faYoutube, faInstagram, faLinkedin)
library.add(faFacebook, faTwitter, faInstagram, faLinkedin);
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})


const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router)
app.use(vuetify)
app.mount('#app')
