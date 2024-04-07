<!--
 * @Description:  登录
 * @Author: Zhao Huanhuan
 * @Date: 2024-03-30 15:33:09
 * @LastEditTime: 2024-04-07 20:50:09
-->
<template>
  <global-header title="登录"></global-header>
  <div class="login-container">
    <div class="login">
      <van-tabs v-if="noRegister" v-model:active="active">
        <van-tab title="密码登录">
          <div>
            <van-form @submit="onSubmit">
              <van-cell-group inset>
                <van-field v-model="state.tel" type="tel" name="tel" label="手机号" />
                <van-field
                  v-model="state.password"
                  type="password"
                  name="password"
                  label="密码"
                  placeholder="请输入密码"
                  :rules="[{ required: true, message: '请输入密码' }]"
                />
              </van-cell-group>
              <div style="margin: 16px">
                <van-button round block type="primary" native-type="submit"> 登录 </van-button>
              </div>
            </van-form>
          </div>
        </van-tab>
        <van-tab title="短信登录">
          <van-form @submit="onSubmit">
            <van-cell-group inset>
              <van-field v-model="state.tel" type="tel" name="tel" label="手机号" />
              <van-field
                v-model="state.sms"
                center
                clearable
                name="sms"
                label="短信验证码"
                placeholder="请输入短信验证码"
              >
                <template #button>
                  <van-button size="small" type="primary" @click="onSMSCode">发送验证码</van-button>
                </template>
              </van-field>
            </van-cell-group>
            <div style="margin: 16px">
              <van-button round block type="primary" native-type="submit"> 登录 </van-button>
            </div>
          </van-form>
        </van-tab>
      </van-tabs>

      <van-form v-else @submit="onRegister">
        <van-cell-group inset>
          <van-field
            v-model="password"
            type="password"
            required
            name="设置密码"
            label="设置密码"
            placeholder="密码包含数字、字母或特殊符号"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <van-field
            v-model="password"
            type="password"
            required
            name="密码"
            label="再输入一次"
            placeholder="密码包含数字、字母或特殊符号"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </van-cell-group>
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit"> 提交 </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue';
import { loginApi, registerApi, sendSms } from '@/api/login';
import { showNotify } from 'vant';
import { useRouter } from 'vue-router';
const router = useRouter();
const state = reactive({
  tel: '',
  password: '',
  sms: '',
});
const noRegister = ref(true);
const active = ref(0);

const onSubmit = async (values) => {
  console.log(values, 'values');
  try {
    const { Code } = await loginApi(values);
    if (Code === 1) {
      // 没注册，去设置密码
      noRegister.value = true;
    } else {
      // 登录成功，返回上级
      router.back();
    }
  } catch (err) {
    console.error(err);
  }
};

const onRegister = async (values) => {
  try {
    const { Message, Code } = await registerApi(values);
    if (Code === 1) {
      // 注册成功，2000毫秒后自动返回上级
      showNotify({ type: 'success', message: Message });
      setTimeout(() => {
        router.back();
      }, 2000);
    } else {
      showNotify({ type: 'danger', message: Message });
    }
  } catch (err) {
    console.error(err);
  }
};

const onSMSCode = () => {
  sendSms();
};
</script>

<style lang="scss" scoped>
.login-container {
  padding: 250px 32px;
}
.login {
  text-align: center;
  background: #fff;
  border-radius: 32px;
  padding: 32px 0;
}
.yzm {
  display: flex;
  .yzm-btn {
    flex-shrink: 0;
  }
}
::v-deep {
  .van-cell-group--inset {
    margin: 0;
  }
}
</style>
