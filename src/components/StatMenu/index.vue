<template>
    <el-row>
      <el-col :span="4"></el-col>
      <el-col :span="16"></el-col>
      <el-col :span="4">
        <div class="small pt-avatar"></div>
      </el-col>
    </el-row>
</template>
<script>
export default {
  name: 'top-stat-menu'
}
</script>
<style>
  .pt-avatar.small{
    width: 24px;
    height: 24px;
    /* background-size: cover;
    background-attachment: fixed; */
    background-image: url(https://avatars3.githubusercontent.com/u/22167673?s=460&v=4)
  }
</style>
