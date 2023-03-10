import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _2ac80a5d = () => interopDefault(import('../pages/inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _14825baf = () => interopDefault(import('../pages/login/index.vue' /* webpackChunkName: "pages/login/index" */))
const _764ed49a = () => interopDefault(import('../pages/register/index.vue' /* webpackChunkName: "pages/register/index" */))
const _220db545 = () => interopDefault(import('../pages/trang-chu/index.vue' /* webpackChunkName: "pages/trang-chu/index" */))
const _5cbb7626 = () => interopDefault(import('../pages/trang-chu/_id.vue' /* webpackChunkName: "pages/trang-chu/_id" */))
const _14b08315 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/inspire",
    component: _2ac80a5d,
    name: "inspire"
  }, {
    path: "/login",
    component: _14825baf,
    name: "login"
  }, {
    path: "/register",
    component: _764ed49a,
    name: "register"
  }, {
    path: "/trang-chu",
    component: _220db545,
    name: "trang-chu"
  }, {
    path: "/trang-chu/:id?",
    component: _5cbb7626,
    name: "trang-chu-id"
  }, {
    path: "/",
    component: _14b08315,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
