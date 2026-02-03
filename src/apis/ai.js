import {streamFetch} from '@/utils/streamFetch.js'

export const chatWithAiApi=({message,onmessage})=>{
    return streamFetch({
        url: import.meta.env.VITE_API_BASE_URL+'/ai/chat',
        method: 'POST',
        body:message,
        onmessage
    })
}