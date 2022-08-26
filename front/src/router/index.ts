import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import PerformancesView from '../views/PerformancesView.vue'
import TeamItem from '../views/TeamItem.vue'
import HelpView from '../views/HelpView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/help',
    name: 'help',
    component: HelpView
  },
  {
    name: 'total',
    path: '/total/:username',
    component: () => import('../views/TotalView.vue'),
    props: true
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/teams/:userid',
    name: 'teams',
    component: () => import('../views/TeamsView.vue'),
    props: true
  },
  {
    path: '/performances/:id',
    name: 'performances',
    component: PerformancesView,
    props: true
  },
  {
    path: '/members/:id',
    component: TeamItem
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
