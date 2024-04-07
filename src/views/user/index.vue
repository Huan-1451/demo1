<template>
  <div class="user-container">
    <van-nav-bar>
      <template #left>
        <div class="user">
          <img class="user-icon" src="@/assets/images/user.png" alt="" />
          <div v-if="state.isLogin" class="user-desc">
            <span>ID：123234</span>
            <span class="user-desc-name">个性签名：{{ '专注中……' }}</span>
          </div>
          <div v-else>点击登录</div>
        </div>
      </template>
      <template #right>
        <van-grid :column-num="2">
          <van-grid-item icon="setting-o" text="设置" @click.stop="onSet" />
          <van-grid-item icon="service-o" text="客服" />
        </van-grid>
      </template>
    </van-nav-bar>

    <div class="order">
      <van-cell-group>
        <van-cell title="我的订单" is-link value="全部" to="/order/orderIndex"> </van-cell>
      </van-cell-group>
      <van-grid :column-num="5">
        <van-grid-item icon="bill-o" text="待付款" @click="onOrder(0)" />
        <van-grid-item icon="send-gift-o" text="待发货" @click="onOrder(1)" />
        <van-grid-item icon="gift-card-o" text="待收货" @click="onOrder(2)" />
        <van-grid-item icon="comment-circle-o" text="待评价" @click="onOrder(3)" />
        <van-grid-item icon="cash-back-record-o" text="退款/售后" @click="onOrder(4)" />
      </van-grid>
    </div>
    <div class="user-list">
      <van-cell title="个人信息" is-link to="/user/address" />
      <van-cell title="账号管理" is-link to="/user/address" />
      <van-cell title="账号安全" is-link to="/user/address" />
      <van-cell title="支付设置" is-link />
      <van-cell title="关于我们" is-link />
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import { getUserInfo } from '@/api/user';
import { useRouter } from 'vue-router';
const router = useRouter();
const state = reactive({
  user: {},
  isLogin: true,
});

onMounted(async () => {
  const { data } = await getUserInfo();
  state.user = data;
  // state.isLogin = false;
});

const onSet = () => {};
const onOrder = (status) => {
  router.push({ name: 'OrderIndex', query: { status } });
};
</script>

<style lang="scss" scoped>
.user-container {
  height: 90vh;
  font-size: 28px;
  ::v-deep {
    .van-nav-bar__content {
      height: 180px;
      .van-icon {
        font-size: 40px;
        color: #333;
      }
      .van-nav-bar__right {
        padding: 0;
      }
    }
    .van-grid-item__content:after {
      border: none;
    }
  }

  .user {
    display: flex;
    align-items: center;
    height: 100%;
    &-icon {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin-right: 40px;
    }
    &-desc {
      width: 350px;
      display: flex;
      flex-direction: column;
      text-align: left;
      &-name {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-align: start;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
    }
  }

  .order {
    margin: 24px 0;
  }
}
</style>
