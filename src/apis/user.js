
import httpInstance from "@/utils/http.js";

export const loginApi=({username,password})=>{
    return httpInstance({
        url:'/user/login',
        method:'post',
        data:{
            username,
            password
        }
    })
}