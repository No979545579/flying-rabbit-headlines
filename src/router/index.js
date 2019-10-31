import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import NotFound from '@/views/404'
import local from '@/utils/local'
import Article from '@/views/article'
import Fans from '@/views/fans'
import Image from '@/views/image'
import Publish from '@/views/publish'
import Setting from '@/views/setting'
import Comment from '@/views/comment'

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
    }, {
      path: '/article',
      component: Article
    }, {
      path: '/fans',
      component: Fans
    }, {
      path: '/image',
      component: Image
    }, {
      path: '/publish',
      component: Publish
    }, {
      path: '/setting',
      component: Setting
    }, {
      path: '/comment',
      component: Comment
    }]
  }, {
    path: '/login',
    component: Login
  }, {
    path: '*',
    component: NotFound
  }]
})
// 路由导航守卫（前置导航守卫）
router.beforeEach((to, from, next) => {
  const user = local.getUser()
  if (to.path !== '/login' && !user) return next('/login')
  next()
})
export default router
