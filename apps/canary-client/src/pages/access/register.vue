<template>
  <el-form>
    <el-form-item label="用户名" label-position="right" label-width="68px">
      <el-input v-model="username"></el-input>
    </el-form-item>
    <el-form-item label="密码" label-position="right" label-width="68px">
      <el-input v-model="password"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" label-position="right" label-width="68px">
      <el-input v-model="checkPassword"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" label-position="right" label-width="68px">
      <el-input v-model="email"></el-input>
    </el-form-item>
    <el-form-item label="手机号码" label-position="right" label-width="68px">
      <el-input v-model="phone"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="register">注册</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'register',
  data () {
    return {
      form: {
        username: '',
        password: '',
        checkPassword: '',
        email: '',
        phone: ''
      }
    }
  },
  methods: {
    register () {
      this.$store.dispatch('register', this.form)
    }
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
</style>
