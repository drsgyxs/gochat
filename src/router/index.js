import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '../layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home,
      },
    ],
  },
  {
    path: '/signin',
    name: 'Signin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Signin.vue'),
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/Signup.vue'),
  },
  {
    path: '/rooms/:roomId',
    name: 'room',
    component: () => import('../views/Room'),
    props: true,
  },
  {
    path: '/account',
    redirect: '/account/profile',
    component: Layout,
    children: [
      {
        path: 'profile',
        name: 'UserProfile',
        component: () => import('@/views/Profile'),
      },
    ],
  },
]

const router = new VueRouter({
  routes,
})

export default router
