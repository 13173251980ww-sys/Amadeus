<!-- File: `src/views/Home/Home.vue` -->
<script setup>
import { chatWithAiApi, getHotDataApi } from "@/apis/ai.js";
import { onMounted, ref, computed } from "vue";
import KeyWordPieChart from "@/views/Home/Components/KeyWordPieChart.vue";

const input = ref('');
const output = ref('');
const postMessage = () => {
  output.value = '';
  chatWithAiApi({
    message: input.value,
    onmessage(chunk) {
      output.value += chunk;
    },
  });
};

const hotList = ref([]);
const apiResultRef = ref(null); // 保存原始接口返回（供子组件使用）

const pieApiResult = computed(() => apiResultRef.value || null);

async function loadHotData(){
  try{
    const res =await getHotDataApi();
    const payload=res.data;

    apiResultRef.value={data:{keyword: payload.keyword}};

    hotList.value=payload.data.slice(0,10);
  }catch (err){
    console.log("获取热点数据失败",err);
    hotList.value=[];
    apiResultRef.value=null;
  }
}

onMounted(async () => {
  await loadHotData();
});
</script>

<template>
  <div class="home-page">
    <div class="banner"></div>

    <div class="chat">
      <h2 class="chat-title">Amadeus</h2>
      <div class="chat-main">
        <div class="chat-ask">
          <el-input v-model="input" placeholder="与牧濑红莉栖对话..." class="chat-input"></el-input>
          <button class="submit-circle" type="button" @click="postMessage">
            <svg class="submit-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
              <path d="M4 12h10" stroke="#000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" />
              <path d="M13 6l7 6-7 6" stroke="#000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" />
            </svg>
          </button>
        </div>
        <div class="chat-show">{{output}}</div>
      </div>
    </div>

    <div class="ranking">
      <div class="wrap">
        <div class="ranking-item-top">
          <h6 class="ranking-item-title">热度排行</h6>
          <ul class="hotArticle">
            <li v-for="(item, idx) in hotList" :key="idx" class="hot-item">
              <div class="left">
                <div class="rank" :class="{ 'top1': idx===0, 'top2': idx===1, 'top3': idx===2 }">
                  <span class="rank-num">{{ idx + 1 }}</span>
                </div>
                <div class="title-wrap">
                  <a class="title" :href="item.url" target="_blank" rel="noopener">{{ item.title }}</a>
                </div>
              </div>
              <div class="topic">{{ item.topic }}</div>
            </li>
          </ul>
        </div>
        <div class="ranking-item-bottom">
          <KeyWordPieChart :apiResult="pieApiResult" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 保留原样式（省略重复注释） */
.date{ color: #9aa0a6; font-size: 13px; min-width: 110px; text-align: right; }
.source{ color: #9aa0a6; margin-left: 0; font-size: 13px; }
.hotArticle{ list-style: none; padding: 0; margin: 0; max-height: 100%; overflow: hidden; }
.hot-item{ display: flex; justify-content: space-between; align-items: center; padding: 6px 6px; border-bottom: 1px solid #f0f2f5; color: rgb(51,51,51); }
.left{ display: flex; align-items: center; gap: 12px; overflow: hidden; }
.rank{ width: 28px; height: 28px; border-radius: 50%; background: #f3f5f7; display: flex; align-items: center; justify-content: center; flex: 0 0 28px; font-weight: 600; color: #4b5563; box-shadow: 0 1px 2px rgba(0,0,0,0.04); font-size: 14px; }
.rank.top1{ background: linear-gradient(180deg,#ffd89b,#ffb86b); color:#8a3a00 }
.rank.top2{ background: linear-gradient(180deg,#e6edf7,#d0dff0); color:#2b4a77 }
.rank.top3{ background: linear-gradient(180deg,#f3e6dc,#e6c7b0); color:#6b3b1a }
.title-wrap{ display:flex; flex-direction:column; min-width:0 }
.title{ font-size:15px; color: rgb(51,51,51); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:620px; text-decoration:none }
.topic{ color: rgb(102,102,102); font-size:13px; min-width: 110px; text-align: right }
.ranking-item-top{ width: 1082px; height: 365px; overflow: hidden; background: rgb(246,249,251); color: rgb(51,51,51); padding: 8px 12px; box-sizing: border-box;margin-bottom: 80px}
.ranking-item-top .hotArticle{ height: calc(365px - 36px - 16px); overflow: hidden }
.ranking-item-bottom{ width: 1082px; background: rgb(246,249,251);}
.home-page{ min-height: 100vh; padding-bottom: 30vh }
.banner{ position: absolute; width: 100%; height: 450px; background-size: cover; background-image: url("@/assets/background/banner.png"); z-index: -1; }
.banner:after{ display: block; position: absolute; content: ""; bottom: -50px; z-index:2; width:100%; height: 88px; background-image: url("@/assets/background/banner-wave.png"); background-size: 100% 100%; }
.chat{ margin: 0 auto 280px; padding: 40px; border-radius: 8px; height: 280px; }
.chat-main{ display: flex; flex-direction: column; align-items: center; }
.chat-title { text-align: center; margin-bottom: 20px; font-size: 24px; font-weight: bold; background: linear-gradient(90deg, #d35400 0%, #b8860b 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
.chat-ask{ width: 780px; display: flex; margin-bottom: 10px; position: relative; }
.chat-input{ background: #f9f9f9; }
.chat-show{ width: 780px; min-height: 150px; padding: 12px; background:rgb(28,28,28); border: 1px solid #ddd; border-radius: 4px; white-space: pre-wrap; }
.submit-circle { position: absolute; right: 10px; top: 450%; transform: translateY(-50%); width: 36px; height: 36px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; border: none; background: linear-gradient(90deg, #d35400 0%, #b8860b 100%); color: transparent; font-weight: 700; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.12); transition: transform 0.15s ease, filter 0.15s ease; font-size: 18px; line-height: 1; }
.ranking{ margin: 0 auto; border-radius: 8px; height: auto; }
.wrap{ width: auto; margin: 0 auto; gap: 30px; max-width:1082px ; }
</style>
