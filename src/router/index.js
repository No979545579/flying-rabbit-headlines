import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import NotFound from '@/views/404'
Vue.use(VueRouter)
const router = new VueRouter({
  // 路由配置对象
  // 关键选项：routes 作用：配置路由规则
  routes: [{
    path: '/',
    component: Home,
    children: [{
      path: '/',
      component: Welcome
    }]
  }, {
    path: '/login',
    component: Login
  }, {
    path: '*',
    component: NotFound
  }]
})
export default router
