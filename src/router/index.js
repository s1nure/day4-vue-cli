import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/HomeView.vue'
import ExchangeRates from '../components/ExchangeRates.vue'
import StudentInfo from '../components/StudentInfo.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/student-info/:id',
    name: 'StudentInfo',
    props: true,
    component: StudentInfo

  },
  {
    path: '/exchange-rates',
    name: 'ExchangeRates',
    component: ExchangeRates

  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
