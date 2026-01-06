import {ref} from "vue"
import {useRoute} from "vue-router";
import {watch} from "vue";

//逻辑封装
export function useRoutePath(){
    const route=useRoute();
    const current =ref("");
    current.value=route.path;

    watch(
        ()=>route.path,
        (newPath)=>{
            current.value=newPath
        },
        {immediate:true}
    )

    return current;
}