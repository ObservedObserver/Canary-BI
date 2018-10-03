<template>
  <div class="intro-page">
    <el-container class="banner-page">
      <el-header>
        <div class="banner-header">
          <img src="//avatars0.githubusercontent.com/u/35953084?s=200&v=4" alt="">
        </div>
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
    </el-container>
    <el-container class="banner-intro">
      <div class="body-segment">
        <h1>强大的端计算能力</h1>
        <p>只需一款普通的笔记本电脑、平板或智能手机，便可以在不依托服务器的情况下完成上百万条数据的多维分析。</p>
      </div>
    </el-container>
    <el-container>
      <el-footer class="banner-footer">
        <el-row>
          <el-col :span="6">
            <h3>帮助</h3>
            <p>联系我们</p>
            <p>加入灵虎</p>
          </el-col>
        </el-row>
      </el-footer>
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
.intro-page{
  background-color: #ffffff;
  z-index: -2;
}
.banner-page{
  padding: 0.5rem 10%;
}
.banner-header{
  height: 60px;
  overflow: hidden;
}
.banner-header img{
  position: absolute;
  transform: translateY(-40%)
}
  .banner-content {
    margin-top: 100px;
    width: 48%;
    min-width: 300px;
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
    padding: 4rem;
  }
  .body-segment{
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 100px;
    width: 48%;
    min-width: 500px;
    max-width: 400px;
    min-height: 320px;
    color: #ffffff;
    text-align: center;
  }
  .body-segment h1 {
    font-size: 38px;
    line-height: 46px;
    margin: 8px 0px 28px;
    font-weight: 300;
  }
  .body-segment p {
    font-size: 20px;
    line-height: 36px;
    color: #fafafa;
    font-weight: 300;
  }
  .banner-footer{
    background-color: #262626;
    color: #e8e8e8;
    font-weight: 200;
    padding: 2rem 8rem;
    min-height: 180px;
  }
</style>
