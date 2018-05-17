<template lang="html">
  <div class="info-box">
    {{node.text}}
    <chart class="bar-chart" v-if="node.next.length === 0" :options="node.option" />
    <super-chart v-if="node.next.length > 0" v-for="son in node.next" :key="son.text" :node="son" />
  </div>
</template>

<script>
export default {
  name: 'super-chart',
  props: ['node'],
  data () {
    return {
      text: 'haha'
    }
  }
}
</script>

<style lang="css">
.info-box{
  border: 1px solid rgb(147, 147, 147, 0.28);
  border-radius: 1rem;
  padding: 0.6rem;
  margin: 0.4rem;
}
</style>
