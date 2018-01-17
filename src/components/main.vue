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
</style>
