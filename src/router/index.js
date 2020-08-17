import Vue from 'vue'
import VueRouter from 'vue-router'
import MapServer from '../views/MapServer.vue'
import DataServer from '../views/DataServer.vue'
import MapView from '../views/MapView.vue'
import DataView from '../views/DataView.vue'

// 解决错误Error: Avoided redundant navigation to current location 此报错解释为路由重复
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (location) {
  return originalReplace.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

const routes = [
  {
    path: '/mapserver',
    name: 'MapServer',
    component: MapServer
  },
  {
    path: '/mapview',
    name: 'MapView',
    component: MapView
  },
  {
    path: '/dataserver',
    name: 'DataServer',
    component: DataServer
  },
  {
    path: '/dataview',
    name: 'DataView',
    component: DataView
  }

]

const router = new VueRouter({
  routes
})
export default router
