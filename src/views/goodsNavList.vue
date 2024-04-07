<!--
 * @Description:  
 * @Author: Zhao Huanhuan
 * @Date: 2024-04-05 17:31:58
 * @LastEditTime: 2024-04-06 18:04:14
-->
<template>
  <div class="goods-container">
    <Search />
    <van-tabs v-model:active="active">
      <van-tab v-for="(item, index) in state.navList" :key="index" :title="item.Value" @change="onChange(item)">
        <goods-list :goods-type="goodsType"
      /></van-tab>
    </van-tabs>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import GoodsList from '@/components/GoodsList';
import Search from '@/components/Search';
const active = ref(0);
const goodsType = ref('105');
const state = reactive({
  navList: JSON.parse(localStorage.getItem('goodsTypes')),
});

const onChange = (item) => {
  goodsType.value = item.TypeCode;
};
</script>

<style lang="scss" scoped>
.goods-container {
  position: relative;
  background-color: #fff;

  ::v-deep {
    .van-grid-item {
      padding: 10px;
    }
    .van-tabs__line {
      background-color: rgb(240, 78, 35);
    }
  }
}
</style>
