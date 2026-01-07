<script setup>
import {ref, computed, onMounted} from 'vue'
import {useCommentStores} from "@/stores/useCommentStores.js";
import {storeToRefs} from "pinia";
const commentStore = useCommentStores()

const {getCommentData}=commentStore;
const {commentList,total}=storeToRefs(commentStore);

const pageSize = 8

const currentPage = ref(1)


//items.slice(起始索引,结束索引) 返回一个新的数组，包含从起始索引到结束索引（不包括结束索引）之间的所有元素。
const pagedItems = computed(() => commentList.value.slice((currentPage.value - 1) * pageSize, currentPage.value * pageSize))

function goto(page) {
  //边界检测
  if (page < 1) page = 1
  if (page > pageCount) page = pageCount

  currentPage.value = page
}
function prev() { goto(currentPage.value - 1) }
function next() { goto(currentPage.value + 1) }

onMounted(async ()=>{
  await getCommentData();
})
</script>

<template>
  <div class="MessageBoard-page">
    <div class="mb-container">
      <header class="mb-header">
        <h1>留言板</h1>
        <p class="mb-sub">欢迎留言|´・ω・)ノ</p>
      </header>

      <section class="mb-new">
        <div class="avatar">你</div>
        <div class="input-wrap">
          <input class="mb-input" placeholder="留下你的消息...." disabled />
          <button class="submit-btn" title="发布" disabled>
            <!-- 小箭头图标（字符占位） -->
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12h14M13 5l6 7-6 7" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </section>

      <section class="mb-list">
        <article class="mb-item" v-for="item in pagedItems" :key="item.id">
          <div class="item-avatar"
            :style="{
            backgroundImage: `url(${item.iconurl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat:  'no-repeat'
            }"
          ></div>
          <div class="item-body">
            <div class="item-meta">
              <span class="author">{{ item.username }}</span>
              <span class="dot">·</span>
              <span class="time">{{ item.time }}</span>
            </div>
            <div class="item-content">{{ item.content }}</div>
          </div>
        </article>
      </section>

      <!-- 分页控件 -->
      <nav class="mb-pagination" aria-label="留言分页">
        <button class="nav-btn" @click="prev" :disabled="currentPage === 1">上一页</button>

        <ul class="page-list">
          <li v-for="p in pageCount" :key="p">
            <button
              class="page-num"
              :class="{ active: p === currentPage }"
              @click="goto(p)"
              :aria-current="p === currentPage ? 'page' : null"
            >
              {{ p }}
            </button>
          </li>
        </ul>

        <button class="nav-btn" @click="next" :disabled="currentPage === pageCount">下一页</button>
      </nav>

      <footer class="mb-footer">共有 {{ total.value }} 条留言</footer>
    </div>
  </div>
</template>

<style scoped>
/* 主题色 & 布局 */
.MessageBoard-page{
  min-height: 100vh;
  padding: 48px 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  background: black url('@/assets/background/bg_02.jpg') no-repeat center top;
  background-size: cover;
  color: #eaeaea;
  -webkit-font-smoothing: antialiased;
}

.mb-container{
  width: 980px;
  max-width: calc(100% - 40px);
  background: linear-gradient(180deg, #070707 0%, #0f0f0f 100%);
  border: 1px solid rgba(255,255,255,0.04);
  border-radius: 14px;
  padding: 28px;
  box-shadow: none; /* 容器不需要明显投影 */
  color: #efefef;
}

.mb-header{
  margin-bottom: 18px;
}
.mb-header h1{
  margin: 0 0 6px 0;
  font-size: 28px;
  letter-spacing: 0.6px;
  color: #FFD27A; /* 暗金色高亮 */
}
.mb-sub{
  margin: 0;
  color: rgba(255,255,255,0.55);
  font-size: 13px;
}

/* 新留言输入区 */
.mb-new{
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 10px 0 22px 0;
}
.avatar{
  min-width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg,#b98f2b,#8a6015);
  color: #0b0b0b;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  box-shadow: inset 0 -2px 0 rgba(0,0,0,0.18);
}
.input-wrap{
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
}
.mb-input{
  flex: 1;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.06);
  background: rgba(255,255,255,0.02);
  color: #efefef;
  outline: none;
  font-size: 14px;
}
.mb-input::placeholder{
  color: rgba(255,255,255,0.35);
}
.submit-btn{
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(90deg,#b86f0b,#ffd27a);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: not-allowed;
  box-shadow: 0 2px 6px rgba(0,0,0,0.45);
  padding: 6px;
}
.submit-btn svg{ display:block; }

/* 留言列表 */
.mb-list{
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  margin-bottom: 18px;
}
.mb-item{
  display: flex;
  gap: 14px;
  padding: 14px;
  border-radius: 10px;
  background: linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0.005));
  border: 1px solid rgba(255,255,255,0.02);
}
.item-avatar{
  min-width: 52px;
  height: 52px;
  border-radius: 50%;
  background: rgba(255,255,255,0.06);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}
.item-body{
  flex: 1;
}
.item-meta{
  font-size: 12px;
  color: rgba(255,255,255,0.55);
  margin-bottom: 6px;
}
.item-meta .author{
  color: #ffd27a;
  font-weight: 600;
}
.item-content{
  color: rgba(255,255,255,0.92);
  line-height: 1.6;
  font-size: 15px;
  margin-bottom: 10px;
}

/* 分页样式 */
.mb-pagination{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin: 12px 0 18px 0;
}
.nav-btn{
  background: transparent;
  border: 1px solid rgba(255,255,255,0.06);
  color: rgba(255,255,255,0.85);
  padding: 6px 10px;
  border-radius: 8px;
  cursor: pointer;
}
.nav-btn:disabled{ opacity: 0.35; cursor: default }

.page-list{
  list-style: none;
  display: flex;
  gap: 8px;
  padding: 0;
  margin: 0;
}
.page-num{
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.03);
  color: rgba(255,255,255,0.75);
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
}
.page-num.active{
  background: linear-gradient(90deg,#b86f0b,#ffd27a);
  color: #0b0b0b;
  font-weight: 700;
  box-shadow: 0 2px 6px rgba(0,0,0,0.35);
}

.mb-footer{
  text-align: center;
  color: rgba(255,255,255,0.45);
  font-size: 13px;
  padding-top: 6px;
  border-top: 1px dashed rgba(255,255,255,0.02);
}

/* 响应 */
@media (max-width: 640px){
  .mb-container{ padding: 18px; }
  .mb-header h1{ font-size: 22px; }
  .item-content{ font-size: 14px; }
  .page-list{ gap: 6px }
  .page-num{ padding: 6px 8px }
}
</style>