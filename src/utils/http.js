// axios基础的封装
import axios from 'axios'
import router from "@/router/index.js";
import {ElMessage} from "element-plus";
const httpInstance = axios.create({
    // baseURL:'/api',
    baseURL: 'http://localhost:8080',
    timeout: 5000
})


// 拦截器

// axios请求拦截器
httpInstance.interceptors.request.use(config => {
    // 获取本地存储的token
    const token = localStorage.getItem('token');

    //让每次请求都携带token
    if (token) {
        // token头部
        config.headers['token'] = `${token}`
    }
    return config  // 返回修改后的配置
}, e => Promise.reject(e))

//axios响应式拦截器
httpInstance.interceptors.response.use(response => {
    //成功回调
    return response
}, async error => {
    // 如果响应状态码是401，说明token过期或无效，跳转到登录页面
    // console.log(error.response)
    await router.push('/login')
    ElMessage.error("身份验证失败，请重新登录")
    return Promise.reject(error)
})


export default httpInstance