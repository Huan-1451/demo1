<!--
 * @Description:  
 * @Author: Zhao Huanhuan
 * @Date: 2024-04-04 18:53:00
 * @LastEditTime: 2024-04-06 18:46:47
-->
<template>
  <div>
    <van-list
      v-model:loading="loading"
      :finished="finished"
      :lazy-render="true"
      :immediate-check="false"
      offset="500"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-grid :column-num="2">
        <van-grid-item v-for="(item, index) in state.goodsList" :key="index" :icon="item.goodsPicture" @click="onItem">
          <template #text>
            <div>
              <div class="prod_name">{{ item.title }}</div>
              <div class="prod_price">{{ item.goodsMarketPrice }}元</div>
            </div>
          </template>
        </van-grid-item>
      </van-grid>
    </van-list>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { getGoodsList } from '@/api/goods';

const props = defineProps({ goodsType: { type: String, default: '' } });
const router = useRouter();
const loading = ref(false);
const finished = ref(false);
const pageNum = ref(1);

const state = reactive({ goodsList: [] });
onMounted(async () => {
  getList();
});

const onLoad = () => {
  getList();
};

// 获取首页列表数据
const getList = async () => {
  const res = await getGoodsList({ pageNum: pageNum.value, pageSize: 10, goodsType: props.goodsType });
  loading.value = false;
  if (res?.status === 200 && res.data) {
    pageNum.value += 1;
    state.goodsList = state.goodsList.concat(res.data);
    if (res.data.length < 10) {
      finished.value = true;
    }
  }
};

const onItem = (item) => {
  router.push({ name: 'goodsDetail', params: { goodsId: item.goodsId } });
};
</script>

<style lang="scss" scoped>
.van-list {
  ::v-deep {
    .van-icon__image {
      width: 240px;
      height: 300px;
    }
    .van-grid-item__content--center {
      justify-content: flex-start;
      border-radius: 16px;
    }
  }
  .prod_price {
    color: red;
  }
}
</style>
