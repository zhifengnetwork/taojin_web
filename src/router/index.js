import Vue from 'vue'
import Router from 'vue-router'
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
    // 购买道具
    {
      path: '/buy_item',
      name: 'buy_item',
      component: () => import('@/pages/home/buy_item'),
    },
    // 奖金池
    {
      path: '/bonus',
      name: 'bonus',
      component: () => import('@/pages/home/bonus'),
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
    // 个人资料
    {
      path: '/user_info',
      name: 'user_info',
      component: () => import('@/pages/user/user_info'),
    },
    // 我的订单
    {
      path: '/my_order',
      name: 'my_order',
      component: () => import('@/pages/user/my_order'),
    },


    // 账号余额
    {
      path: '/balance',
      name: 'balance',
      component: () => import('@/pages/user/balance'),
    },
    // 提现
    {
      path: '/withdraw',
      name: 'withdraw',
      component: () => import('@/pages/user/withdraw'),
    },
    // 添加支付宝账号
    {
      path: '/withdraw_alipay',
      name: 'withdraw_alipay',
      component: () => import('@/pages/user/withdraw_alipay'),
    },
    // 添加银行卡账号
    {
      path: '/withdraw_bank',
      name: 'withdraw_bank',
      component: () => import('@/pages/user/withdraw_bank'),
    },
    // 提现明细
    {
      path: '/withdraw_record',
      name: 'withdraw_record',
      component: () => import('@/pages/user/withdraw_record'),
    },
    // 提现-账单明细
    {
      path: '/withdraw_bill',
      name: 'withdraw_bill',
      component: () => import('@/pages/user/withdraw_bill'),
    },



    // 糖果
    {
      path: '/sugar',
      name: 'sugar',
      component: () => import('@/pages/user/sugar'),
    },
    // 赠送糖果
    {
      path: '/sugar_give',
      name: 'sugar_give',
      component: () => import('@/pages/user/sugar_give'),
    },
    // 赠送记录
    {
      path: '/sugar_record',
      name: 'sugar_record',
      component: () => import('@/pages/user/sugar_record'),
    },


    // 货币
    {
      path: '/currency',
      name: 'currency',
      component: () => import('@/pages/user/currency'),
    },
    // 货币-兑换
    {
      path: '/currency_convert',
      name: 'currency_convert',
      component: () => import('@/pages/user/currency_convert'),
    },
    // 货币-赠送
    {
      path: '/currency_give',
      name: 'currency_give',
      component: () => import('@/pages/user/currency_give'),
    },
    // 货币-挂卖
    {
      path: '/currency_sell',
      name: 'currency_sell',
      component: () => import('@/pages/user/currency_sell'),
    },
    // 中奖记录
    {
      path: '/prize',
      name: 'prize',
      component: () => import('@/pages/user/prize'),
    },
    // 我的推广
    {
      path: '/promotion',
      name: 'promotion',
      component: () => import('@/pages/user/promotion'),
    },
  ]
})
