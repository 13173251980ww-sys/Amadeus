<script setup>
  import {chatWithAiApi} from "@/apis/ai.js";
  import {getHotDataApi} from "@/apis/ai.js"
  import {onMounted, ref} from "vue";
  import KeyWordPieChart from "@/views/Home/Components/KeyWordPieChart.vue";

  const input=ref('');
  const output=ref('');
  const postMessage=()=>{
    output.value = ''

    chatWithAiApi({
      message:input.value,
      onmessage(chunk){
        output.value+=chunk;
      },
    })
  }

  const hotList = ref([]);

  const CACHE_KEY = 'hotListCache_v1';
  const TTL = 24 * 60 * 60 * 1000; // 24 小时

  async function loadHotData() {
    const raw = localStorage.getItem(CACHE_KEY);
    let parsed = null;
    if (raw) {
      try { parsed = JSON.parse(raw); } catch (e) { parsed = null; }
    }

    // 如果缓存存在且未过期，直接使用缓存
    if (parsed && parsed.timestamp && (Date.now() - parsed.timestamp) < TTL && Array.isArray(parsed.data)) {
      hotList.value = parsed.data.slice(0, 10);
      return;
    }

    // 否则发起请求并更新缓存
    try {
      const res = await getHotDataApi();
      const data = (res && res.data && Array.isArray(res.data)) ? res.data.slice(0, 10) : [];
      hotList.value = data;
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data: hotList.value }));
      } catch (e) {
        // 如果 storage 写入失败（例如无权限或满），忽略，不影响页面
        console.error('set cache failed', e);
      }
    } catch (err) {
      console.error('getHotDataApi failed', err);
      // 请求失败时如果有旧缓存（即使已过期）可以回退使用
      if (parsed && Array.isArray(parsed.data)) {
        hotList.value = parsed.data.slice(0, 10);
      } else {
        hotList.value = []; // 无缓存且请求失败则清空
      }
    }
  }

  onMounted(async ()=>{
    await loadHotData();
  })
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
              <!-- 横线 -->
              <path d="M4 12h10" stroke="#000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" />
              <!-- 箭头 -->
              <path d="M13 6l7 6-7 6" stroke="#000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" />
            </svg>
          </button>
        </div>
        <div class="chat-show">{{output}}</div>
      </div>
    </div>

    <div class="ranking">
      <div class="wrap">
        <div class="ranking-item-left">
          <h6 class="ranking-item-title">热度排行</h6>
          <ul class="hotArticle">
            <!-- render 10 test items -->
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
        <div class="ranking-item-right">
          <h6 class="ranking-item-title">关键词</h6>
          <KeyWordPieChart/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .date{ /* not used anymore but kept to avoid breaking other selectors */
    color: #9aa0a6;
    font-size: 13px;
    min-width: 110px;
    text-align: right;
  }

  .source{ /* not used, kept */
    color: #9aa0a6;
    margin-left: 0;
    font-size: 13px;
  }

  /* list styles (limited and safe) */
  .hotArticle{
    list-style: none;
    padding: 0;
    margin: 0;
    max-height: 100%;
    overflow: hidden; /* no scrollbar */
  }

  .hot-item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 6px; /* reduced so 10 items fit in 365px */
    border-bottom: 1px solid #f0f2f5;
    color: rgb(51,51,51); /* required color */
  }

  .left{
    display: flex;
    align-items: center;
    gap: 12px;
    overflow: hidden;
  }

  .rank{
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: #f3f5f7;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 28px;
    font-weight: 600;
    color: #4b5563;
    box-shadow: 0 1px 2px rgba(0,0,0,0.04);
    font-size: 14px;
  }

  .rank.top1{ background: linear-gradient(180deg,#ffd89b,#ffb86b); color:#8a3a00 }
  .rank.top2{ background: linear-gradient(180deg,#e6edf7,#d0dff0); color:#2b4a77 }
  .rank.top3{ background: linear-gradient(180deg,#f3e6dc,#e6c7b0); color:#6b3b1a }

  .title-wrap{ display:flex; flex-direction:column; min-width:0 }
  .title{ font-size:15px; color: rgb(51,51,51); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:620px; text-decoration:none }

  /* topic placed on the right column */
  .topic{ color: rgb(102,102,102); font-size:13px; min-width: 110px; text-align: right }

  .ranking-item-left{
    width: 782px; /* required width */
    height: 365px; /* required height */
    overflow: hidden; /* no scrollbar */
    background: rgb(246,249,251); /* required background */
    color: rgb(51,51,51); /* required text color */
    padding: 8px 12px; /* small inner padding to match visual */
    box-sizing: border-box;
  }

  /* ensure list area fits under header (36px) */
  .ranking-item-left .hotArticle{ height: calc(365px - 36px - 16px); /* header + padding */ overflow: hidden }

  .ranking-item-right{ width: 300px }

  /* avoid footer overlap by reserving bottom space on page */
  .home-page{ min-height: 100vh; padding-bottom: 30vh }

  /* keep existing banner/chat/footer styles unchanged */
  .banner{
    position: absolute;
    width: 100%;
    height: 450px;
    background-size: cover;
    background-image: url("@/assets/background/banner.png");
    z-index: -1;
  }
  
  .banner:after{
    display: block;
    position: absolute;
    content: "";
    bottom: -50px;
    z-index:2;
    width:100%;
    height: 88px;
    background-image: url("@/assets/background/banner-wave.png");
    background-size: 100% 100%;

  }
  
  .chat{
      margin: 0 auto 280px;
      padding: 40px;
      border-radius: 8px;
      height: 280px;
    }

  .chat-main{
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .chat-title {
    text-align: center;
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: bold;

    /* 渐变文字填充 */
    background: linear-gradient(90deg, #d35400 0%, #b8860b 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .chat-ask{
    width: 780px;
    display: flex;
    margin-bottom: 10px;
    position: relative;
  }

  .chat-input{
    background: #f9f9f9;
  }

  .chat-show{
    width: 780px;
    min-height: 150px;
    padding: 12px;
    background:rgb(28,28,28);
    border: 1px solid #ddd;
    border-radius: 4px;
    white-space: pre-wrap; /* 保持换行格式 */
  }

  .submit-circle {
    position: absolute;
    right: 10px;
    top: 450%;
    transform: translateY(-50%);
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    /* 左->右 暗橙 到 暗金 渐变 */
    background: linear-gradient(90deg, #d35400 0%, #b8860b 100%);
    color: transparent; /* 使用 SVG 作为图标，文本颜色隐藏 */
    font-weight: 700; /* 保留字体加粗（若使用文本作为回退） */
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0,0,0,0.12);
    transition: transform 0.15s ease, filter 0.15s ease;
    font-size: 18px;
    line-height: 1;
  }

  .submit-icon {
    width: 16px;
    height: 16px;
    display: block;
  }

  .submit-circle:hover {
    transform: translateY(-50%) scale(1.04);
    filter: brightness(0.95);
  }

  .submit-circle:active {
    transform: translateY(-50%) scale(0.98);
  }

  .ranking{
    margin: 0 auto;
    border-radius: 8px;
    height: 280px;
  }

  .wrap{
    width: auto;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    gap: 30px;

    max-width:1082px ;
  }

  .ranking-item-left{
    width: 782px; /* required width */
    height: 365px; /* required height */
    overflow: hidden; /* no scrollbar */
    background: rgb(246,249,251); /* required background */
    color: rgb(51,51,51); /* required text color */
    padding: 8px 12px; /* small inner padding to match visual */
    box-sizing: border-box;
  }

  /* ensure list area fits under header (36px) */
  .ranking-item-left .hotArticle{ height: calc(365px - 36px - 16px); /* header + padding */ overflow: hidden }

  .ranking-item-right{
    width: 300px;
  }
</style>
