<template>
  <el-form>
    <el-form-item label="用户名" label-position="right" label-width="68px">
      <el-input></el-input>
    </el-form-item>
    <el-form-item label="密码" label-position="right" label-width="68px">
      <el-input></el-input>
    </el-form-item>
    <el-form-item label="密码" label-position="right" label-width="68px">
      <el-input></el-input>
    </el-form-item>
    <el-form-item label="邮箱" label-position="right" label-width="68px">
      <el-input></el-input>
    </el-form-item>
    <el-form-item label="手机号码" label-position="right" label-width="68px">
      <el-input></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">注册</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'signup'
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
