<!--
 * @Description:  
 * @Author: Zhao Huanhuan
 * @Date: 2024-04-04 21:40:36
 * @LastEditTime: 2024-04-06 16:48:40
-->
<template>
  <div class="header-container">
    <van-nav-bar left-arrow fixed :title="title" @click-left="onClickLeft" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
defineProps({ title: { type: String, default: '商城' } });
const router = useRouter();
const onClickLeft = () => {
  router.back();
};
</script>

<style lang="scss" scoped>
.header-container {
  height: 100px;
  color: #333;
  ::v-deep {
    .van-icon {
      color: #333;
    }
  }
}
</style>
