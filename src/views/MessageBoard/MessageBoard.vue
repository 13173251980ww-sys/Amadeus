<script setup>
import { ref, computed } from 'vue'

const pageSize = 8
const currentPage = ref(1)

// 静态示例数据（回滚到静态留言板）
const commentList = ref([
  { id: 1, username: 'Alice', time: '2026-01-01 10:00', content: '第一条示例留言：你好，这是一个静态示例。', iconurl: '' },
  { id: 2, username: 'Bob', time: '2026-01-02 11:12', content: '第二条示例留言：前端很有趣！', iconurl: '' },
  { id: 3, username: 'Carol', time: '2026-01-03 09:30', content: '第三条示例留言：祝你编码愉快！', iconurl: '' },
  { id: 4, username: 'Dave', time: '2026-01-04 14:05', content: '第四条示例留言：这是静态数据。', iconurl: '' },
  { id: 5, username: 'Eve', time: '2026-01-05 16:22', content: '第五条示例留言：页面看起来很棒。', iconurl: '' },
  { id: 6, username: 'Frank', time: '2026-01-06 08:45', content: '第六条示例留言：测试内容 A', iconurl: '' },
  { id: 7, username: 'Grace', time: '2026-01-07 12:00', content: '第七条示例留言：测试内容 B', iconurl: '' },
  { id: 8, username: 'Heidi', time: '2026-01-08 18:30', content: '第八条示例留言：测试内容 C', iconurl: '' },
  { id: 9, username: 'Ivan', time: '2026-01-09 07:10', content: '第九条示例留言：第九条', iconurl: '' },
  { id: 10, username: 'Judy', time: '2026-01-10 20:20', content: '第十条示例留言：第十条', iconurl: '' },
  { id: 11, username: 'Ken', time: '2026-01-11 13:13', content: '第十一条示例留言：第十一条', iconurl: '' },
  { id: 12, username: 'Leo', time: '2026-01-12 09:09', content: '第十二条示例留言：第十二条', iconurl: '' },
  { id: 13, username: 'Mia', time: '2026-01-13 21:21', content: '第十三条示例留言：第十三条', iconurl: '' },
  { id: 14, username: 'Nina', time: '2026-01-14 06:06', content: '第十四条示例留言：第十四条', iconurl: '' },
  { id: 15, username: 'Oscar', time: '2026-01-15 15:15', content: '第十五条示例留言：第十五条', iconurl: '' },
  { id: 16, username: 'Peggy', time: '2026-01-16 17:17', content: '第十六条示例留言：第十六条', iconurl: '' },
  { id: 17, username: 'Quinn', time: '2026-01-17 19:19', content: '第十七条示例留言：第十七条', iconurl: '' },
  { id: 18, username: 'Rita', time: '2026-01-18 08:08', content: '第十八条示例留言：第十八条', iconurl: '' }
])

const total = computed(() => commentList.value.length)

const pagedItems = computed(() => commentList.value.slice((currentPage.value - 1) * pageSize, currentPage.value * pageSize))

function handlePageChange(page) {
  currentPage.value = page
}
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
            backgroundImage: item.iconurl ? `url(${item.iconurl})` : 'none',
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

      <!-- 分页控件：使用 Element Plus 的 el-pagination，保持视觉样式容器类名不变 -->
      <div class="mb-pagination" aria-label="留言分页">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="total"
          v-model:current-page="currentPage"
          @current-change="handlePageChange"
        />
      </div>

      <footer class="mb-footer">共有 {{ total }} 条留言</footer>
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
/* 给 Element Plus 分页做最小调整，避免空规则警告 */
.el-pager li, .el-pager li.active a{ padding: 0; }

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
}
</style>