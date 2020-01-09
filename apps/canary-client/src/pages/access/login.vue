<template>
  <el-form>
    <el-form-item
      label="用户名" label-position="right" label-width="68px">
      <el-input v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item
      label="密码"
      label-position="right" label-width="68px">
      <el-input v-model="form.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="login">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      this.$store.dispatch('login', this.form)
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
