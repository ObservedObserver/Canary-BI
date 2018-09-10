<template>
  <div>
    <el-container class="banner-page">
      <el-header>
        Phantom Tiger
      </el-header>
      <el-main class="banner-segment">
        <img src="//powerbicdn.azureedge.net/cvt-d6431fcc8bafcfb914f233b33206ee2aa0f89088a3dce2aac8f31d0f60cf390d/pictures/pages/powerbi-desktop-hero.gif?636718490568034631" alt="">
        <div class="banner-content">
          <h1>Phantom BI</h1>
          <p>服务于工业大数据自主分析，基于自由和开放的交互理念，让分析师更专注于数据背后的故事。</p>
          <div>
            <el-button type="primary" round @click="goAnalysis">开始使用</el-button>
          </div>
        </div>
      </el-main>
      <el-container class="rotate-segment"></el-container>
    </el-container>
    <el-container class="banner-intro">
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'intro-page',
  data () {
    return {
      menuItems: ['基本介绍', '教程文档', '设计理念']
    }
  },
  methods: {
    goAnalysis () {
      this.$router.push('/analysis')
    }
  }
}
</script>

<style scoped>
html body{
  margin: 0px!important;
  padding: 0px;
}
.banner-page{
  padding: 0.5rem 10%;
}
  .banner-content {
    margin-top: 100px;
    width: 48%;
    min-width: 500px;
    max-width: 400px;
    min-height: 320px;
    color: #0d1a26;
  }
  .banner-content h1 {
    font-size: 68px;
    font-weight: 600;
    line-height: 76px;
    margin: 8px 0px 28px;
  }
  .banner-content p {
    font-size: 20px;
    line-height: 40px;
    color: #314659;
  }
  .banner-segment {
    position: relative;
    overflow: hidden;
  }
  .banner-segment img {
    position: absolute;
    z-index: -1;
    left: 40%;
  }
  /* .rotate-segment{
    position: absolute;
    bottom: -20px;
    background: linear-gradient(72deg, #096dd9, #1890ff);
    transform: rotate(-4deg);
    min-height: 200px;
  } */
  .banner-intro{
    margin-top: 100px;
    background: linear-gradient(72deg, #096dd9, #1890ff);
    min-height: 400px;
  }
</style>
