import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/HomeView.vue'
import ExchangeRates from '../components/ExchangeRates.vue'
import StudentInfo from '../components/StudentInfo.vue'
import Login from "../components/LoginComponent.vue"
import store from "../store/index.js"

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: '/student-info/:id',
    name: 'StudentInfo',
    props: true,
    component: StudentInfo,
    meta: { requiresAuth: true },
  },
  {
    path: '/exchange-rates',
    name: 'ExchangeRates',
    component: ExchangeRates  
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
      if(store.getters.getUser === null) {
          next({
              path: '/login',
              query: { redirect: to.fullPath }
          })
      } else {
          next()
      }
  } else {
      next()
  }
})


export default router
