<!--
 * @Description:  
 * @Author: Zhao Huanhuan
 * @Date: 2024-04-04 17:46:03
 * @LastEditTime: 2024-04-07 18:27:51
-->
<template>
  <div class="search-container">
    <div class="search-area">
      <div class="search-content">
        <van-icon name="location-o" />
        <div class="search-box">
          <div class="search-box--on" @click.stop="onSearch"></div>
          <van-search v-model="value" disabled shape="round" placeholder="请输入搜索关键词" />
        </div>
        <span @click="onLogin">登录</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const value = ref('');
const onSearch = () => {
  router.push('/searchPage');
};

const onList = () => {
  router.push('/goodsNavList');
};
const onLogin = () => {
  router.push('/login');
};
</script>

<style lang="scss" scoped>
.search-container {
  height: 116px;
}
.van-icon {
  font-size: 40px;
}
.search-area {
  position: fixed;
  top: 0;
  left: 0;
  height: 100px;
  z-index: 999;
  width: 100%;
}
.search-box {
  flex: 1;
  padding: 0 24px;
  position: relative;
  &--on {
    position: absolute;
    top: 0;
    left: 10%;
    height: 100px;
    width: 80%;
    z-index: 2;
  }
}
.search-content {
  background: rgb(240, 78, 35);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  color: #fff;
  .van-search {
    width: 100%;
    background: inherit;
  }
}
</style>
