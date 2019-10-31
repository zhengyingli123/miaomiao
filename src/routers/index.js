import Vue from 'vue'
import Router from 'vue-router'
import movieRouter from './movie'
import cinemaRouter from './cinema'
import mineRouter from './mine'
import adminRouter from './admin'

Vue.use(Router)

export default new Router({
  mode: 'history',
  // base: process.env.BASE_URL, // 从根路径下访问
  base:"miaomiao", // 从miaomiao/ 路径下访问 
  routes: [
    movieRouter,
    cinemaRouter,
    mineRouter,
    adminRouter,
    {
      path : '/*',
      redirect : '/movie'
    }
  ]
})
