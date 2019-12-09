import Vue from 'vue'
import VueRouter from 'vue-router'
import Analytics from '@/components/Analytics.vue'
import Students from '@/components/studentManagement.vue'
import Login from '@/views/login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/admin/analytics',
    name: 'Analytics',
    component: Analytics
  },
  {
    path: '/admin/student/management',
    name: 'Students',
    component: Students
  }

]

const router = new VueRouter({
  routes
})

export default router
