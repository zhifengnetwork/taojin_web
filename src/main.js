// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import TopHeader from "@/pages/common/header/TopHeader"
import Navigate from "@/pages/common/footer/Navigate"
import Null from "@/pages/common/null/Null"


// 导入vant所有组件
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

import '../static/css/reset.css'

// 配置移动端自适配:安装lib-flexible、安装postcss-px2rem-exclude
import 'lib-flexible/flexible.js'

// 引入axios请求数据
import axios from "./axios/request";
Vue.prototype.$axios = axios

// 引入vuex管理数据
import store from '@/store/store.js'

Vue.config.productionTip = false

Vue.component('TopHeader',TopHeader);
Vue.component('Navigate',Navigate);
Vue.component('Null',Null);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
