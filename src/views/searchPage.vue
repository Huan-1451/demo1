<!--
 * @Description:  
 * @Author: Zhao Huanhuan
 * @Date: 2024-04-04 21:37:09
 * @LastEditTime: 2024-04-07 18:26:44
-->
<template>
  <div class="search-container">
    <global-header title="搜索"></global-header>
    <van-search v-model="value" shape="round" placeholder="请输入搜索关键词" @search="onSearch" />

    <!-- 搜索结果 -->
    <van-list></van-list>

    <!-- 商品推荐 -->
    <goods-list class="list" :module="'search'" />
  </div>
</template>

<script setup>
import GlobalHeader from '@/components/GlobalHeader';
import GoodsList from '@/components/GoodsList';
import { ref } from 'vue';
const value = ref('');
const onSearch = () => {};
</script>

<style lang="scss" scoped>
.search-container {
  height: 100vh;
}
</style>
