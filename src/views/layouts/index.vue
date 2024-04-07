<!--
 * @Description:  
 * @Author: Zhao Huanhuan
 * @Date: 2024-03-21 13:13:57
 * @LastEditTime: 2024-04-06 18:13:10
-->
<template>
  <div class="layout-content">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'AppLayout',
};
</script>
<style lang="scss">
.layout-content {
  height: 100vh;
}
</style>
