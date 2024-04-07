<!--
 * @Description:  首页
 * @Author: Zhao Huanhuan
 * @Date: 2024-03-19 14:54:32
 * @LastEditTime: 2024-04-06 18:54:20
-->
<template>
  <div class="container">
    <Search />

    <!-- banner -->
    <Swiper :list="state.swiperList" />

    <!-- 宫格区 -->
    <van-grid :column-num="5">
      <van-grid-item v-for="(item, index) in state.iconsList" :key="index" :icon="item.Img" :text="item.Value" />
    </van-grid>

    <!-- 商品列表 -->
    <goods-list class="list" :module="'home'" />
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import Search from '@/components/Search';
import Swiper from '@/components/Swiper';
import GoodsList from '@/components/GoodsList';
import { commonStore } from '@/store/index';
const mainStore = commonStore();
const state = reactive({
  swiperList: [],
  iconsList: [],
});

onMounted(async () => {
  getHomeMod();
});

// 获取首页模块数据
const getHomeMod = async () => {
  const data = await mainStore.getHomeMod();
  state.swiperList = data.find((i) => i.Name === 'Bnner').modList || [];
  state.iconsList = data.find((i) => i.Name === 'Icons').modList || [];
};
</script>

<style lang="scss" scoped>
.container {
  > div:not(:nth-child(2), :first-child) {
    margin-top: 24px;
  }
  ::v-deep {
    .van-list {
      .van-grid-item {
        padding: 14px;
      }
    }
  }
  .list {
    min-height: 50vh;
  }
}
</style>
