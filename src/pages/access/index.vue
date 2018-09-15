<template>
  <div class="login-background">
    <el-card class="access-card">
      <el-tabs v-model="activeForm" type="card">
        <el-tab-pane label="登录" name="login"></el-tab-pane>
        <el-tab-pane label="注册" name="signup"></el-tab-pane>
      </el-tabs>
      <div>
        <login-form v-if="activeForm === 'login'" />
        <signup-form v-if="activeForm === 'signup'" />
      </div>
    </el-card>
  </div>
</template>

<script>
import LoginForm from './login.vue'
import SignupForm from './signup.vue'
export default {
  name: 'access',
  data () {
    return {
      activeForm: 'login'
    }
  },
  components: {
    LoginForm,
    SignupForm
  }
}
</script>

<style>
.login-background{
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-color: #fafafa;
}
.access-card{
  width: 40%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%)
}
</style>
