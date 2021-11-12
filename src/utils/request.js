import axios from 'axios';
// import Cookies from 'js-cookie';
import { requestBaseUrl } from '@/config/index.js';
import token from './token';

import { errorHandle, wait } from '@/utils/index.js';

// 创建一个 axios 实例
const service = axios.create({
  timeout: 5000
});

// 请求拦截器
service.interceptors.request.use(
  async (config) => {
    // console.log('请求拦截器');
    config.url = requestBaseUrl + config.url;
    // 只要有 Token 就带着
    if (token().length > 150) {
      config.headers.Authorization = token();
      // headers: { Authorization: token() }
    }
    return config;
  },
  (error) => {
    // console.log('请求错误');
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // console.log('响应拦截器 response', response.data);
    return response.data;
  },
  (error) => {
    // console.log('响应拦截器 error');
    // console.log('响应拦截器输出 error.response:', error.response);
    if (error.response.status >= 500) {
      console.log('请求失败，服务器发生异常');
      errorHandle('请求失败，服务器发生异常');
      return;
    }

    if (error.response.status >= 400) {
      errorHandle(error.response.data.detail);
      return;
    }

    return Promise.reject(error.response.data);
  }
);

export default service;
