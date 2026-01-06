<script lang="ts" setup>
  import {useRoutePath} from "@/composables/useRoutePath"

  const current =useRoutePath();

  import NavUI from "@/components/NavUI.vue";
</script>

<template>
  <NavUI :current="current"/>
</template>

<style scoped>

</style>



