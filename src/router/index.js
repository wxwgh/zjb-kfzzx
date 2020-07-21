import Vue from 'vue'
import VueRouter from 'vue-router'
import MapServer from '../views/MapServer.vue'
import DataServer from '../views/DataServer.vue'

//解决错误Error: Avoided redundant navigation to current location 此报错解释为路由重复
const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

const routes = [
  {
    path: '/mapserver',
    name: 'MapServer',
    component: MapServer
  },
  {
    path: '/dataserver',
    name: 'DataServer',
    component: DataServer
  }
]

const router = new VueRouter({
  routes
})

export default router
