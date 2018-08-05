import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.prototype.$odooUrl = 'http://159.69.33.63:8069'
Vue.prototype.$odooDb = 'proto-odoo11-zdc01'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  return Router
}
