<!--
 * @Description:  
 * @Author: Zhao Huanhuan
 * @Date: 2024-04-06 18:26:27
 * @LastEditTime: 2024-04-07 17:13:45
-->
<template>
  <div class="detail-container">
    <global-header title="商品详情"></global-header>
    <div class="content">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in state.goodsInfo.goodsImgs" :key="index">
          <img :src="item" alt="" />
        </van-swipe-item>
      </van-swipe>

      <div class="info">
        <div class="info-name">{{ state.goodsInfo.goodsName }}</div>
        <div class="stepper-box">
          <span class="info-prece">{{ state.goodsInfo.goodsMarketPrice }}元</span>
          <van-stepper v-model="state.value" />
        </div>
      </div>

      <div class="detail">
        <h4>商品详情</h4>
        <img v-for="(img, index) in state.goodsInfo.goodsDesc" :key="index" :src="img" />
      </div>
    </div>

    <van-action-bar placeholder>
      <van-action-bar-icon icon="chat-o" text="客服" dot />
      <van-action-bar-icon v-if="state.cartNum" icon="cart-o" text="购物车" :badge="state.cartNum" />
      <van-action-bar-icon v-else icon="cart-o" text="购物车" />
      <van-action-bar-button type="warning" text="加入购物车" @click="addCart" />
      <van-action-bar-button type="danger" text="立即购买" @click="onBuy" />
    </van-action-bar>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import { getGoodsDetail } from '@/api/goods';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
const state = reactive({
  goodsInfo: {},
  cartNum: 0,
  goodsId: route.query.goodsId,
  value: 1,
});

onMounted(() => {
  queryGoodsList();
});

const queryGoodsList = async () => {
  const data = await getGoodsDetail(state.goodsId);
  state.goodsInfo = data.data;
};
const addCart = () => {};
const onBuy = () => {
  router.push({ name: 'CreateOrder', query: { buyNum: state.value, goodsPrice: state.goodsInfo.goodsMarketPrice } });
};
</script>

<style lang="scss" scoped>
.detail-container {
}

.info {
  padding: 24px;
  background: #fff;
  .info-prece {
    color: #cc0101;
  }
  .stepper-box {
    display: flex;
    justify-content: space-between;
  }
}
.detail {
  background: #fff;
  text-align: center;
  padding: 24px 0;
  img {
    width: 100%;
    height: auto;
  }
}
.my-swipe {
  img {
    width: 100%;
    height: 500px;
  }
}
</style>
