<script setup>

import LayoutFooter from "@/views/Layout/Components/LayoutFooter.vue";
import LayoutFixed from "@/views/Layout/Components/LayoutFixed.vue";
import LayoutHeader from "@/views/Layout/Components/LayoutHeader.vue";
import Bread from "@/views/Layout/Components/Bread.vue";

</script>

<template>
  <LayoutFixed/>
  <el-container class="layout-shell">
    <LayoutHeader/>
    <el-main>
      <Bread/>
    </el-main>
    <el-main>
      <RouterView/>
    </el-main>
    <el-footer>
      <LayoutFooter/>
    </el-footer>
  </el-container>
</template>

<style scoped>
.layout-shell {
  min-height: 100vh;
  background: #fffbfb;
}
</style>