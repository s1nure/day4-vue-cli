import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/HomeView.vue'
import ExchangeRates from '../components/ExchangeRates.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
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
