import Axios from 'axios'
import router from '@/router'
// 本地 || 线上请求前缀
var root = process.env.API_ROOT;
const axios = Axios.create();
import { Dialog } from 'vant';
import { Toast } from 'vant';
let cancel ,promiseArr = {} 



/*设置 axios拦截器*/
//拦截器的作用是判断token的问题

axios.interceptors.request.use(
	config => {
		//请求之前重新拼装url
		config.url = root + config.url;
		config.withCredentials = true // 允许携带token ,这个是解决跨域产生的相关问题
		config.timeout = 1000 // 超时时间
		var token = window.localStorage.getItem("token");
		
		if(token) {
			config.headers = {
				'token': token,
				// 'Content-Type': 'application/x-www-form-urlencoded'
			}
		}
		//发起请求时，取消掉当前正在进行的相同请求
		if (promiseArr[config.url]) {
			promiseArr[config.url]('操作取消')
			promiseArr[config.url] = cancel
		} else {
			promiseArr[config.url] = cancel
		}
		return config
	},
	error => {
		console.log(error)
		return Promise.reject(error)
	}
)


// http response 拦截器  (token出现问题) //响应拦截器即--------异常-----处理
axios.interceptors.response.use(
	response => {


		// console.log('拦截器');
		if(response.data['status'] < 0) {
			console.log('拦截器-状态');
			
			Toast(response.data['msg'])
				//window.localStorage.setItem("token",null);
			
				// router.replace({  	
				// 	path: '/index',
				// })
		}

		 //console.log('拦截器-正常');
		return response;
	},
	error => {

		console.log('-------error----------')
		console.log(error.response)
		console.log('-------error----------')

		if(error.response.status == 401){
			
			window.localStorage.removeItem("token");
			window.localStorage.setItem("reg","reg");
			window.location.href = document.location.protocol+'//'+window.location.host;
			// Dialog.alert({
			// 	message: error.response.data['msg']
			// }).then(() => {
			// 	window.localStorage.removeItem("token");
			// 	window.location.href = document.location.protocol+'//'+window.location.host;
			// 	router.replace({  	
			// 		path: '/index',
			// 	})
			// })

		}else{

			Dialog.alert({

				message: '接口报错'
			}).then(() => {
				//window.localStorage.setItem("token",null);
				// router.replace({  	
				// 	path: '/index',
				// })
			})
		}
	
		// console.log(Promise.reject(error.response.data))
		return Promise.reject(error.response.data)
	}
);
	
	
export default axios;