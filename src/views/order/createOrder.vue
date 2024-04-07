<!--
 * @Description:  
 * @Author: Zhao Huanhuan
 * @Date: 2024-04-06 19:37:47
 * @LastEditTime: 2024-04-07 12:43:05
-->
<template>
  <div class="confirm-container">
    <global-header title="确认订单"></global-header>

    <div class="address">
      <van-cell is-link icon="location-o">
        <template #title>
          <div>
            <div>{{ state.defaultAddress.userName }}</div>
            <div>{{ state.defaultAddress.address }}</div>
          </div>
        </template>
      </van-cell>
    </div>
    <div class="add-address">
      <van-button plain type="primary" @click="onAddAddress">添加收货地址</van-button>
    </div>
    <div class="goods">
      <van-cell title="某标签"></van-cell>
      <van-card
        :num="state.buyNum"
        :price="state.goodsPrice"
        :desc="state.goodsInfo.goodsName"
        :title="state.goodsInfo.title"
        :thumb="state.goodsInfo.goodsSmallImg"
      />
    </div>

    <van-submit-bar :price="totalAmount" button-text="提交订单" @submit="onSubmit" />
  </div>
</template>

<script setup>
import { reactive, onMounted, computed } from 'vue';
import { getAddressList } from '@/api/user';
import { getGoodsDetail } from '@/api/goods';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
const state = reactive({
  defaultAddress: {},
  goodsInfo: {},
  buyNum: route.query.buyNum,
  goodsPrice: route.query.goodsPrice,
});

onMounted(() => {
  queryAddress();
  queryGoodsList();
});

// 计算总金额
const totalAmount = computed(() => {
  return Number((Number(state.buyNum) * Number(state.goodsPrice)).toFixed(2)) * 100;
});

console.log(totalAmount.value, state.buyNum, state.goodsInfo.goodsMarketPrice, 'totalAmount');

const queryAddress = async () => {
  const { data = [] } = await getAddressList();
  state.defaultAddress = data.find((i) => i.isDefault);
};
const queryGoodsList = async () => {
  const data = await getGoodsDetail(state.goodsId);
  state.goodsInfo = data.data;
};

const onAddAddress = () => {
  router.push({ name: 'Address', query: { from: 'add' } });
};
const onAddress = () => {
  router.push({ name: 'AddressEdit', query: { from: 'add' } });
};
const onSubmit = () => {};
</script>

<style lang="scss" scoped>
.confirm-container {
  .goods-info {
    padding: 24px;
  }
  .address {
    .van-cell {
      align-items: center;
      ::v-deep {
        .van-icon {
          font-size: 40px;
        }
        .van-cell__title {
          padding: 24px;
        }
      }
    }
  }

  .add-address {
    height: 120px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 16px 0;
    .van-button {
      height: 60px;
    }
  }

  .goods {
    background: #fff;
    .van-card {
      background: #fff;
    }
  }
}
</style>
