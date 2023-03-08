import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _6a1a5f97 = () => interopDefault(import('../pages/inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _0bd383e9 = () => interopDefault(import('../pages/login/index.vue' /* webpackChunkName: "pages/login/index" */))
const _5230cb39 = () => interopDefault(import('../pages/register/index.vue' /* webpackChunkName: "pages/register/index" */))
const _3fbc307f = () => interopDefault(import('../pages/trang-chu/index.vue' /* webpackChunkName: "pages/trang-chu/index" */))
const _394a46a7 = () => interopDefault(import('../pages/trang-chu/_id.vue' /* webpackChunkName: "pages/trang-chu/_id" */))
const _edaa4262 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _6a1a5f97,
    name: "inspire"
  }, {
    path: "/login",
    component: _0bd383e9,
    name: "login"
  }, {
    path: "/register",
    component: _5230cb39,
    name: "register"
  }, {
    path: "/trang-chu",
    component: _3fbc307f,
    name: "trang-chu"
  }, {
    path: "/trang-chu/:id?",
    component: _394a46a7,
    name: "trang-chu-id"
  }, {
    path: "/",
    component: _edaa4262,
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
