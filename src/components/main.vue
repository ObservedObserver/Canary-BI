<template lang="html">
  <div class="vis-main-board">
    <menu-board></menu-board>
    <operators-board></operators-board>
  </div>
</template>

<script>
import OperatorsBoard from '@/components/Operators/main.vue'
import MenuBoard from '@/components/Menu/menu.vue'
export default {
  name: 'main-board',
  components: {
    OperatorsBoard,
    MenuBoard
  }
}
</script>

<style lang="css">
.vis-main-board{
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
}
::-webkit-scrollbar{
    width: 4px;
    height: 4px;
    background-color: rgba(0,0,0,0);
}
/*定义滚动条的轨道，内阴影及圆角*/
::-webkit-scrollbar-track{
    border-radius: 2px;
    background-color: rgba(0,0,0,0);
}
/*定义滑块，内阴影及圆角*/
::-webkit-scrollbar-thumb{
    /*width: 10px;*/
    height: 20px;
    border-radius: 2px;
    -webkit-box-shadow: inset 0 0 2px rgba(0,0,0,0.2);
    background-color: rgba(255,255,255,0.5);
}
</style>
