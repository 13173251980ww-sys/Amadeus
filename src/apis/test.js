import httpInstance from "@/utils/http.js";

export const testApi=()=>{
    return httpInstance({
        url:'/test',
        method:'get',
    })
}