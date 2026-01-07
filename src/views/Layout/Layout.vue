<script setup>

import LayoutFooter from "@/views/Layout/Components/LayoutFooter.vue";
import LayoutFixed from "@/views/Layout/Components/LayoutFixed.vue";
import LayoutHeader from "@/views/Layout/Components/LayoutHeader.vue";

</script>

<template>
  <LayoutFixed/>
  <LayoutHeader/>

  <RouterView/>

  <LayoutFooter/>
</template>

<style scoped>

</style>