import { createRouter, createWebHistory } from 'vue-router'

const Layout = () => import('../layout/layout.vue')
const Home = () => import('../views/home/home.vue')
const Route = () => import('../views/route/route.vue')

const routes: [] = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        component: Home
      },
      {
        path: '/route/:route_id',
        component: Route
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})


export default router
