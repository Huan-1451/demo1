<!--
 * @Description:  
 * @Author: Zhao Huanhuan
 * @Date: 2024-03-21 13:13:57
 * @LastEditTime: 2024-04-07 18:44:08
-->
<template>
  <div class="login-container">
    <global-header title="登录"></global-header>
    <div class="login-box">
      <van-tabs v-model:active="active" @click-tab="onClickTab">
        <van-tab title="密码登录">
          <van-form @submit="onSubmit">
            <van-field
              v-model="state.phoneNumber"
              name="phoneNumber"
              label="手机号"
              placeholder="手机号"
              :rules="[{ required: true, message: '请输入手机号' }]"
            />
            <van-field
              v-model="state.password"
              type="password"
              name="password"
              label="密码"
              placeholder="密码"
              :rules="[{ required: true, message: '请输入密码' }]"
            />
            <div style="margin: 16px">
              <div class="link-register" @click="toggle('register')">立即注册</div>
              <van-button round block color="#1baeae" native-type="submit">登录</van-button>
            </div>
          </van-form>
        </van-tab>
        <van-tab title="手机登录">
          <van-form @submit="onSubmit">
            <van-field
              v-model="state.phoneNumber1"
              name="phoneNumber1"
              label="手机号"
              placeholder="手机号"
              :rules="[{ required: true, message: '请输入手机号' }]"
            />
            <!-- <van-field
              v-model="state.password1"
              type="password"
              name="password1"
              label="密码"
              placeholder="密码"
              :rules="[{ required: true, message: '请输入密码' }]"
            /> -->
            <van-field v-model="state.verify" center clearable label="验证码" placeholder="输入验证码">
              <template #button>
                <vue-img-verify ref="verifyRef" />
              </template>
            </van-field>
            <div style="margin: 16px">
              <div class="link-login" @click="toggle('login')">已有登录账号</div>
              <van-button round block native-type="submit">注册</van-button>
            </div>
          </van-form>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script setup>
// import GlobalHeader from '@/components/GlobalHeader';
import { ref, reactive } from 'vue';
const active = ref(0);
const state = reactive({
  phoneNumber: '',
  phoneNumber1: '',
  password: '',
  verify: '',
});
const onClickTab = () => {};
const onSubmit = () => {};
const toggle = () => {};
</script>
<style lang="scss">
.login-container {
  width: 100%;
  height: 100vh;
  position: relative;
  .login-box {
    width: 80%;
    // height: 600px;
    background: #fff;
    border-radius: 24px;
    position: absolute;
    overflow: hidden;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
