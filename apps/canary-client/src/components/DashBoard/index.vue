<template>
  <div>
    <div v-if="display === 0">
      <div class="board-center-header">
        <el-button @click="initDialog" type="primary" icon="el-icon-plus" size="small">新建仪表盘</el-button>
      </div>
      <el-table :data="dashBoardList">
        <el-table-column
          prop="title"
          label="标题"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">进入</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="Dashboard Info" :visible.sync="showDialog">
        <el-form>
          <el-form-item label="title">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addBoard">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <dash-board v-if="display === 1" :boardIndex="boardIndex" @gotoCenter="display = 0" />
  </div>
</template>
<script>
import DashBoard from './dashboard.vue'
export default {
  name: 'dash-board-center',
  components: {
    DashBoard
  },
  data () {
    return {
      boardIndex: 0,
      display: 0,
      showDialog: false,
      form: {
        title: 'new dashboard'
      }
    }
  },
  computed: {
    dashBoardList () {
      return this.$store.state.dashBoardList
    }
  },
  methods: {
    handleEdit (index, row) {
      this.boardIndex = index
      this.display = 1
    },
    handleDelete (index, row) {
    },
    addBoard () {
      this.showDialog = false
      // this.$store.commit('addDashBoard', this.form)
      this.$store.dispatch('addDashBoard', this.form)
    },
    initDialog () {
      this.form.title = 'new dashboard'
      this.showDialog = true
    }
  }
}
</script>
<style scoped>
.board-center-header{
  padding: 0.4rem;
}
</style>
