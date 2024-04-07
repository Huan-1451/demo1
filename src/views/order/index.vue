<!--
 * @Description:  
 * @Author: Zhao Huanhuan
 * @Date: 2024-04-06 18:32:24
 * @LastEditTime: 2024-04-07 18:17:21
-->
<template>
  <div class="order-container">
    <global-header title="我的订单"></global-header>
    <van-tabs
      v-model="state.status"
      :color="'red'"
      :title-active-color="'red'"
      class="order-tab"
      @click-tab="onChangeTab"
    >
      <van-tab title="全部" name=""></van-tab>
      <van-tab title="待付款" name="0"></van-tab>
      <van-tab title="待发货" name="1"></van-tab>
      <van-tab title="待收货" name="2"></van-tab>
      <van-tab title="待评价" name="3"></van-tab>
      <van-tab title="退款/售后" name="4"></van-tab>
    </van-tabs>
    <div class="content">
      <van-pull-refresh v-model="state.refreshing" class="order-list-refresh" @refresh="onRefresh">
        <van-list
          v-model:loading="state.loading"
          :immediate-check="false"
          :finished="state.finished"
          finished-text="没有更多了"
          @load="onLoad"
          @offset="10"
        >
          <div v-for="(item, index) in state.list" :key="index" class="order-item-box" @click="goTo(item.orderId)">
            <div class="order-item-title">
              <span>订单时间：{{ item.createTime }}</span>
              <span>{{ item.orderStatus }}</span>
            </div>
            <van-card
              v-for="val in item.orderList"
              :key="val.orderId"
              :num="val.quantity"
              :price="val.sellingPrice"
              desc="全场包邮"
              :title="val.goodsName"
              :thumb="val.goodsSmallImg"
            />
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getOrderList } from '@/api/order';
import { CellGroup } from 'vant';
const router = useRouter();
const route = useRoute();
const state = reactive({
  status: route.query.status || '',
  loading: false,
  finished: false,
  refreshing: false,
  list: [],
  page: 1,
  totalPage: 0,
});
const loadData = async () => {
  const res = await getOrderList({ pageNumber: state.page, status: state.status });
  const data = res?.data || {};
  console.log(data, 'ddd');
  state.list = state.list.concat(data.list || []);
  state.totalPage = data.totalPage;
  state.loading = false;
  if (state.page >= data.totalPage) state.finished = true;
};
onMounted(() => {
  state.status = route.query.status || '';
  onLoad();
  console.log(route.query.status, 'route.query.status');
});
const onChangeTab = ({ name }) => {
  console.log(name, 'name');
  state.status = name;
  onRefresh();
};

const goTo = (id) => {
  router.push({ path: '/order-detail', query: { id } });
};

const onLoad = () => {
  if (!state.refreshing && state.page < state.totalPage) {
    state.page = state.page + 1;
  }
  if (state.refreshing) {
    state.list = [];
    state.refreshing = false;
  }
  loadData();
};

const onRefresh = () => {
  state.refreshing = true;
  state.finished = false;
  state.loading = true;
  state.page = 1;
  onLoad();
};
</script>

<style lang="scss" scoped>
.order-item-box {
  background: #fff;
}
.order-item-title {
  height: 88px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  font-size: 26px;
}
.van-card {
  background: #fff;
}
</style>
