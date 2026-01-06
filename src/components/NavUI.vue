<script setup>
defineProps({
  current:{
    type:String
  }
})
</script>

<template>
  <el-menu
      :default-active="current"
      class="el-menu-demo"
      mode="horizontal"
      router
      style="height: auto"
  >
    <div style="flex: 0.9"/>
    <el-menu-item index="/">首页</el-menu-item>
    <el-menu-item index="/blog">博客</el-menu-item>
    <el-menu-item index="/frindLink" >友情链接</el-menu-item>
    <el-menu-item index="/messageBoard">留言板</el-menu-item>
  </el-menu>
</template>

<style scoped>
  /* 作用于组件根 el-menu 组件（我们在模板上设置了 .el-menu-demo） */
  .el-menu-demo{
    background-color: #0b0b0b;
    border-bottom: none;
    box-shadow: none;
    padding: 6px 12px;
    display: flex;
    align-items: center;
  }

  /* 使用 ::v-deep 以穿透 scoped 样式并命中 Element 内部生成的 .el-menu-item */
  .el-menu-demo ::v-deep .el-menu-item{
    color: #b8860b; /* 暗金色 */
    margin: 0 10px;
    transition: color .18s ease, transform .12s ease;
    font-weight: 500;
  }
  .el-menu-demo ::v-deep .el-menu-item:hover{
    color: #ffd66b; /* 高亮的浅金 */
    /* 与激活项一致的轻微透明背景（黑色底上用半透明白，视觉柔和） */
    background-color: rgba(255,255,255,0.03);
    transform: translateY(-2px);
  }


</style>