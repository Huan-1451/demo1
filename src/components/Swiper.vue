<!--
 * @Description:  
 * @Author: Zhao Huanhuan
 * @Date: 2024-04-04 18:53:00
 * @LastEditTime: 2024-04-04 21:34:44
-->
<template>
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#1baeae">
    <van-swipe-item v-for="(item, index) in list" :key="index">
      <img :src="item.Img" alt="" @click="goTo(item.Url)" />
    </van-swipe-item>
  </van-swipe>
</template>

<script setup>
// import { ref } from 'vue';

import { useRouter } from 'vue-router';
const router = useRouter();
const props = defineProps({
  list: { type: Array, default: () => [] },
});
console.log(props.list, 'sss');
const goTo = (item) => {
  // 支持跳转营销页面、产品详情、产品列表等页面 query: { from: item.from }
  router.push({ path: item.url });
  // window.open()
};
</script>

<style lang="scss" scoped>
.my-swipe {
  width: 100%;
  height: 300px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
