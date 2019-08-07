import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home'
import Login from '@/pages/login/Login'
import Register from '@/pages/login/Register'
import Reset from '@/pages/login/Reset'
import Rank from '@/pages/rank/Rank'
import Deal from '@/pages/deal/Deal'
import Ueal from '@/pages/user/User'
Vue.use(Router)

export default new Router({
  routes: [
    /**
		 * 登录
		 */
    {
      path: '/Login',
      name: 'Login',
      component: () => import('@/pages/login/Login'),
    },
    // 注册
    {
      path: '/Register',
      name: 'Register',
      component: () => import('@/pages/login/Register'),
    },
    // 忘记密码
    {
      path: '/Reset',
      name: 'Reset',
      component: () => import('@/pages/login/Reset'),
    },

    // 重定向
    {
      path: '*',
      redirect: '/Home'
    },
    // 首页
    {
      path: '/Home',
      name: 'Home',
      component: () => import('@/pages/home/Home'),
    },


    // 排名
    {
      path: '/Rank',
      name: 'Rank',
      component: () => import('@/pages/rank/Rank'),
    },


    // 挂卖
    {
      path: '/Deal',
      name: 'Deal',
      component: () => import('@/pages/deal/Deal'),
    },


    // 我的
    {
      path: '/User',
      name: 'User',
      component: () => import('@/pages/user/User'),
    },
  ]
})
