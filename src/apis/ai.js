import {streamFetch} from '@/utils/streamFetch.js'

export const chatWithAiApi=({message,onmessage})=>{
    return streamFetch({
        url: 'http://localhost:8080/ai/chat',
        method: 'POST',
        body:message,
        onmessage
    })
}