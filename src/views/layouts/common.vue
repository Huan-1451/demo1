<!--
 * @Description:  
 * @Author: Zhao Huanhuan
 * @Date: 2024-03-21 15:33:09
 * @LastEditTime: 2024-04-07 17:31:23
-->
<template>
  <div class="home-container">
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" replace to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="shop-collect-o" replace to="/goodsNavList">发现</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" :badge="num" replace to="/cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact-o" replace to="/userIndex">我的</van-tabbar-item>
    </van-tabbar>

    <div class="layout-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { cartStore } from '@/store/index';
const mainStore = cartStore();
import { useRoute } from 'vue-router';
const route = useRoute();
const active = ref(0);
const num = ref(0);

onMounted(async () => {
  setActive(route.path);
  await mainStore.updateCart();
  num.value = mainStore.count;
});

watch(
  () => route.path, // 监听路由路径的变化
  (newPath) => {
    // 路由变化时的逻辑处理
    setActive(newPath);
  },
);

const setActive = (path) => {
  console.log(path);
  switch (path) {
    case '/home':
      active.value = 0;
      break;
    case '/goodsNavList':
      active.value = 1;

      break;
    case '/cart':
      active.value = 2;
      break;
    case '/userIndex':
      active.value = 3;
      break;
  }
};
</script>
<style lang="scss">
.home-container {
  padding-bottom: 130px;
  box-sizing: border-box;
}
</style>
