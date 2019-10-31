import Axios from 'axios'
import qs from 'qs'

// Add a request interceptor
Axios.interceptors.request.use(function (config) {
    // console.log(config,"请求拦截器");

    //全局 API 添加token验证
    // config.data.token=localStorage.getItem('info')?JSON.parse(localStorage.getItem('info')).token:null
    // console.log(config.data)
    let data=qs.stringify(config.data);
    config.data=data;
    // console.log(config);
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
 
// Add a response interceptor
Axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });

export default Axios; //整体抛出
