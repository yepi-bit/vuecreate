import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
// import store from '@/store'
import { getToken } from '../utils/auth'
// import router from '@/router';

// create an axios instance
let isflag = 0;
const service = axios.create({
    baseURL:  process.env.NODE_ENV === 'development' ? '/' : window.urlconfig.apiUrl || '/', // url = web url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 30000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent
        if (getToken()) {
            // let each request carry token
            // ['X-Token'] is a custom headers key
            // please modify it according to the actual situation
            //if(config.url.split('/').indexOf('web') == -1 || config.url.split('/').indexOf('people') == -1){
            config.headers['Authorization'] = 'Bearer '+ getToken();
            //}
        }
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
/**
 * If you want to get http information such as headers or status
 * Please return  response => response
 */

/**
 * Determine the request status by custom code
 * Here is just an example
 * You can also judge the status by HTTP Status Code
 */
service.interceptors.response.use((response) => {
        const res = response.data
        const headers = response.headers
        let headersInfo = headers['content-type']
        if(headersInfo == 'multipart/form-data'){
            return response
        }
        if(res.status === 'success') { res.code = 0; }
        // if the custom code is not 20000, it is judged as an error.
        return res;

        if (res.code !== 0) {
            /* Message({
              message: res.message || 'Error',
              type: 'error',
              duration: 5 * 1000
            }) */
            //console.log(res.message || 'Error')

            // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;

            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            //console.log(res)
            return res
        }
    },(error) => {

        if(error && error.response){
            console.log(error.response.data)
            if(error.response.data.error === "invalid_token"){
                if(isflag === 0){
                    ElMessageBox.confirm('?????????????????????????????????????????????????????????','??????',{
                        confirmButtonText:'??????',
                        type:'warning',
                        showCancelButton:false,
                        showClose:false,
                        customClass:'btn-center'
                    }).then(()=>{
                        // store.dispatch('user/resetToken');
                        window.location.reload();
                    }).catch(()=>{
                        //
                    });
                }
                isflag++;
            }else if(error.response.data.error === "invalid_grant" && error.response.data.error_description === 'Bad credentials'){
                ElMessage({
                    message:'??????????????????????????????????????????',
                    type: 'error',
                    duration: 3 * 1000
                });
            }else if(error.response.data.error === "unauthorized"){
                ElMessage({
                    message:'?????????????????????????????????????????????',
                    type: 'error',
                    duration: 3 * 1000
                });
            }else if(error.response.data.error === "invalid_grant" && error.response.data.error_description === 'User account is locked'){
                ElMessage({
                    message:'?????????????????????',
                    type: 'error',
                    duration: 3 * 1000
                });
            }
        }
        /* switch(error.response.status){
          case 400: error.message = '????????????';
          break;
          case 401: error.message = '?????????,???????????????';
            removeToken();
            router.push({
              path: '/login',
              query: {
                redirect: router.currentRoute.fullPath
              }
            });

            /* ElMessage({
              message: error.message,
              type: 'error',
              duration: 3 * 1000
            }); */
        //console.log(error.message)

        /*return response;
      break;
      case 403: error.message = '????????????';
      break;
      case 404: error.message = '????????????';
      break;
      case 408: error.message = '????????????';
      break;
      case 500: error.message = '???????????????';
      break;
      case 501: error.message = '???????????????';
      break;
      case 502: error.message = '????????????';
      break;
      case 503: error.message = '???????????????';
      break;
      case 504: error.message = '????????????';
      break;
      case 505: error.message = 'HTTP??????????????????';
      break;
      default:
      error.message = '????????????:${error.response.status}';
    }
  }

  ElMessage({
    message: error.message,
    type: 'error',
    duration: 3 * 1000
  }); */
        //console.log(error.message)


        return Promise.reject(error)
    }
)

export default service
