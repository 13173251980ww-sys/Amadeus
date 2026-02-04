import {streamFetch} from '@/utils/streamFetch.js'
import httpInstance from "@/utils/http.js";

export const chatWithAiApi=({message,onmessage})=>{
    return streamFetch({
        url: import.meta.env.VITE_API_BASE_URL+'/ai/chat',
        method: 'POST',
        body:message,
        onmessage
    })
}

export const getHotDataApi=()=>{
    return httpInstance({
        url:import.meta.env.VITE_API_BASE_URL+'/ai/hot',
        method:'get',
    })
}

