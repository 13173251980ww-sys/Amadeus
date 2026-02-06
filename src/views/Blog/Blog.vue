<script setup>
import { ref } from 'vue'

const posts = ref([
  { id: 1, title: '欢迎来到我的博客', excerpt: '关于此博客的简单介绍', url: 'https://blog.csdn.net/amadeusCristina/article/details/157068783?spm=1001.2014.3001.5501' },
  { id: 2, title: '前端', excerpt: '关于前端的一些知识点', url: 'https://blog.csdn.net/amadeusCristina/article/details/157068831?spm=1001.2014.3001.5501' },
  { id: 3, title: '后端', excerpt: '关于后端的一些知识点', url: '#' },
  { id: 4, title: '部署', excerpt: '关于后端的一些知识点', url: '#' },
  { id: 5, title: 'unity游戏开发',excerpt: '关于游戏开发的一些知识点', url: '#' },
])
</script>

<template>
  <div class="blog-page">
    <div class="container">
      <section class="posts">
        <h1 class="page-title">博客</h1>
        <div class="posts-list">
          <article class="post" v-for="post in posts" :key="post.id">
            <a class="post-link" :href="post.url" target="_blank" rel="noopener noreferrer">
              <h2 class="post-title">{{ post.title }}</h2>
              <p class="post-excerpt">{{ post.excerpt }}</p>
            </a>
          </article>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.blog-page{
  background: black url('@/assets/background/bg_02.jpg') no-repeat center top;
  background-size: cover;
  min-height: 100vh;
  padding: 40px 20px;
  box-sizing: border-box;
}

.container{
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

.posts{
  flex: 1 1 auto;
}

.page-title{
  color: #fff;
  margin-bottom: 18px;
}

.posts-list{
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

.post{
  background: rgba(0,0,0,0.4);
  border: 1px solid rgba(0,0,0,0.06);
  padding: 16px;
  border-radius: 8px;
}

.post-link{
  display: block;
  color: #e6eef0;
  text-decoration: none;
  transition: color 160ms ease, transform 160ms ease;
}
.post-link:hover{
  color: #2e8b57;
}

.post-title{
  margin: 0 0 8px 0;
  font-size: 18px;
}
.post-excerpt{
  margin: 0;
  color: rgba(230,238,240,0.85);
}

.friend-links h3{
  margin: 0 0 12px 0;
  color: #fff;
}

.friend-links ul{
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

:deep(a){
  text-decoration: none;
  transition: color 160ms ease;
}
:deep(a):hover{
  color: #2e8b57;
}
</style>
