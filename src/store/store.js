import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 创建一个store仓库,使用export公开，其他地方可引用
const store =  new Vuex.Store({
    //strict:true,//严格模式
    // 状态(一般保存数据)
    state:{
         token:sessionStorage.getItem('token')
    },

    // mutations 类似事件
    mutations:{
     updateToken(state, token) {
          state.token = token
     }
    },
    //获取共享数据
    getters:{
         
     },
  });
  
  export default store;