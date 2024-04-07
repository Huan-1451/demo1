<!--
 * @Description:  
 * @Author: Zhao Huanhuan
 * @Date: 2024-04-06 16:40:24
 * @LastEditTime: 2024-04-06 17:27:21
-->
<template>
  <div class="address-box">
    <global-header title="我的地址"></global-header>
    <div class="address-item">
      <van-address-list
        v-model="state.chosenAddressId"
        :list="state.list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
      />
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import { getAddressList } from '@/api/user';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
const state = reactive({
  chosenAddressId: '1',
  list: [],
  from: route?.query?.from ?? '',
});

onMounted(() => {
  init();
});

const init = async () => {
  const { data } = await getAddressList();
  if (!data) {
    state.list = [];
    return;
  }
  state.list = data.map((item) => {
    return {
      id: item.addressId,
      name: item.userName,
      tel: item.userPhone,
      address: item.address,
      isDefault: !!item.defaultFlag,
    };
  });
};

// 前往添加地址页面
const onAdd = () => {
  router.push({ name: 'AddressEdit', query: { type: 'add', from: state.from } });
};
// 前往地址编辑页面
const onEdit = (item) => {
  router.push({ name: 'AddressEdit', query: { type: 'edit', addressId: item.id, from: state.from } });
};
</script>

<style lang="scss" scoped>
.address-box {
  .van-radio__icon {
    display: none;
  }
}
</style>
