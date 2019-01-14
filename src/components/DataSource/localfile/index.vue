<template>
  <div>
    <div class="drop-area"
      @dragenter="dragenter"
      @dragover="dragover"
      @drop="drop">
      {{dropbox.content}}
    </div>
      <el-row v-for="file in dropbox.files" :key="file.name">
        <el-col :span="12">{{file.name}}</el-col>
        <el-col :span="12">{{file.size/1024}}KB</el-col>
      </el-row>
      <div style="margin-bottom: 1rem">
        <el-button type="danger" @click="updateDB">Set</el-button>
      </div>
      <div>
        <el-button @click="loadData">loadData</el-button>
      </div>
  </div>
</template>
<script>
export default {
  name: 'local-file',
  props: ['dsIndex', 'mode', 'fileIndex'],
  data () {
    return {
      dropbox: {
        content: 'Drop your file here(json, csv, txt)',
        files: []
      }
    }
  },
  created () {
    if (this.dataSourceObj.foreignDB !== null) {
      let { file } = this.dataSourceObj.foreignDB
      this.dropbox.files.push(file)
    }
  },
  computed: {
    dataSourceObj () {
      return this.$store.state.database.dataSource[this.$props.dsIndex]
    }
  },
  methods: {
    loadData () {
      // this.$store.commit('initState', ['currentAPI', 'page'])
      this.$emit('updateDataSource')
      this.$store.dispatch('loadFileData', {
        dsIndex: this.dsIndex
      })
    },
    updateDB () {
      if (this.dataSourceObj.foreignDB === null) {
        this.$store.commit('createLocalFile', {
          file: this.dropbox.files[0],
          dsIndex: this.dsIndex
        })
        // let foreignDB = this.$store.state.database.fileDB[this.$store.state.database.fileDB.length - 1]
        // this.$store.commit('linkDB', {dsIndex: this.dsIndex, foreignDB})
      } else {
        this.$store.commit('updateLocalFile', {
          file: this.dropbox.files[0],
          dsIndex: this.dsIndex
        })
      }
      // debugger
      // this.$store.dispatch('importUploadData', {
      //   file: this.dropbox.files[0]
      // })
    },
    dragover (e) {
      e.stopPropagation()
      e.preventDefault()
    },
    dragenter (e) {
      e.stopPropagation()
      e.preventDefault()
    },
    drop (e) {
      e.stopPropagation()
      e.preventDefault()
      let dt = e.dataTransfer
      this.dropbox.files = dt.files
      console.log(dt.files)
    }
  }
}
</script>
<style scoped>
  .drop-area{
    width: 100%;
    height: 160px;
    border-radius: 16px;
    border: 1px dashed grey;
    text-align: center;
    line-height: 160px;
    margin-bottom: 1rem;
  }
</style>
