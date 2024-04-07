<!--
 * @Description:  
 * @Author: Zhao Huanhuan
 * @Date: 2024-04-01 23:06:06
 * @LastEditTime: 2024-04-07 17:28:49
-->
<template>
  <div class="cart-container">
    <div v-if="state.cartList.length" class="cart-body">
      <!-- 收货信息 -->
      <div class="address">
        <van-cell is-link icon="logistics">
          <template #title>
            <div class="van-ellipsis">
              {{ `配送至：${state.defaultAddress.address}` }}
            </div>
          </template>
        </van-cell>
      </div>

      <!-- 购物车商品 -->
      <van-checkbox-group v-model="state.result" class="cart" @change="groupChange">
        <van-swipe-cell v-for="item in state.cartList" :key="item.goodsId">
          <div class="goods-box">
            <van-checkbox :name="item.goodsId" />
            <van-card
              :price="item.goodsPrice"
              :desc="item.goodsName"
              :title="item.title"
              :thumb="item.goodsSmallImg"
              @click="onDetail"
            >
              <template #num>
                <van-stepper v-model="item.quantity" async-change @change="onChange" />
              </template>
            </van-card>
          </div>
          <template #right>
            <van-button square text="删除" type="danger" class="delete-button" @click="deleteGoods(item.goodsId)" />
          </template>
        </van-swipe-cell>
      </van-checkbox-group>

      <!-- 下单 -->
      <van-submit-bar :price="totalAmount" button-text="提交订单" @submit="onSubmit">
        <van-checkbox v-model:checked="state.checkAll" @click="allCheck">全选</van-checkbox>
      </van-submit-bar>
    </div>

    <div v-else class="empty">
      <img class="empty-cart" src="https://s.yezgea02.com/1604028375097/empty-car.png" alt="空购物车" />
      <div class="title">购物车空空如也</div>
      <van-button round color="rgb(240, 78, 35)" type="primary" block @click="goTo">前往选购</van-button>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { getAddressList } from '@/api/user';
import { getCartList, deleteCartItem, modifyCart } from '@/api/cart';
import { cartStore } from '@/store/index';
import { showLoadingToast, closeToast } from 'vant';
const mainStore = cartStore();
const router = useRouter();
const state = reactive({
  cartList: [],
  defaultAddress: {},
  checkAll: true,
  result: [], // 选中的商品id
});

onMounted(() => {
  queryAddress();
  queryCartList();
});

// 计算总金额
const totalAmount = computed(() => {
  let sum = 0;
  let list = state.cartList.filter((item) => state.result.includes(item.goodsId));
  list.forEach((item) => {
    sum += item.quantity * item.goodsPrice;
  });
  return sum * 100;
});

// 获取收货地址
const queryAddress = async () => {
  const { data = [] } = await getAddressList();
  state.defaultAddress = data.find((i) => i.isDefault);
};
// 获取购物车商品
const queryCartList = async () => {
  const data = await getCartList();
  const list = data?.data || [];
  state.cartList = list;
  state.result = list.map((item) => item.goodsId);
};
const goTo = () => {
  router.push('/goodsNavList');
};
const onSubmit = () => {
  router.push({ name: 'ConfirmOrder' });
};

const groupChange = (result) => {
  console.log(result, 'result');
  if (result.length == state.cartList.length) {
    state.checkAll = true;
  } else {
    state.checkAll = false;
  }
  state.result = result;
};

// 修改商品数量
const onChange = async (value, detail) => {
  if (state.cartList.find((item) => item.goodsId == detail.goodsId)?.quantity == value) return;
  showLoadingToast({ message: '修改中...', forbidClick: true });
  const params = {
    goodsId: detail.goodsId,
    goodsCount: value,
  };
  await modifyCart(params);

  state.cartList.forEach((item) => {
    if (item.goodsId == detail.goodsId) {
      item.quantity = value;
    }
  });
  closeToast();
};

const onDetail = (item) => {
  router.push({ name: 'goodsDetail', params: { goodsId: item.goodsId } });
};

// 全选
const allCheck = () => {
  if (!state.checkAll) {
    state.result = state.cartList.map((i) => i.goodsId);
  } else {
    state.result = [];
  }
};

// 删除商品
const deleteGoods = async (id) => {
  await deleteCartItem(id);
  mainStore.updateCart();
  queryCartList();
};
</script>

<style lang="scss">
.cart-container {
  height: 100vh;
  position: relative;
  .cart-header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    line-height: 44px;
    padding: 0 10px;
    color: #252525;
    background: #fff;
    border-bottom: 1px solid #dcdcdc;
    .cart-name {
      font-size: 14px;
    }
  }
  .cart-body {
    // margin: 16px 0 100px 0;
    // padding-left: 10px;
  }

  .address {
    width: 100%;
    .van-cell__title {
      width: 70%;
    }
  }
  .cart {
    margin-top: 16px;
    background: #fff;
    ::v-deep {
    }
    .goods-box {
      padding-left: 16px;
      width: 100%;
      display: flex;
      align-items: center;
      .van-checkbox {
        flex-shrink: 0;
      }
      .van-card {
        background: #fff;
        width: 0;
        flex: 1;
      }
    }
  }

  .van-submit-bar {
    bottom: 105px;
  }
  .empty {
    width: 50%;
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    .empty-cart {
      width: 150px;
      margin-bottom: 20px;
    }
    .van-icon-smile-o {
      font-size: 50px;
    }
    .title {
      font-size: 32px;
      margin-bottom: 20px;
    }
    .van-button {
      font-size: 36px;
    }
  }

  .goods-card {
    margin: 0;
    background-color: #fff;
  }

  .delete-button {
    height: 100%;
  }
}
</style>
