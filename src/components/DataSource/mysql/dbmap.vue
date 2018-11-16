<template>
  <el-card>
    <el-container>
      <el-aside style="width: 200px; padding: 0.36rem">
        <el-select v-model="mysql.database" placeholder="请选择">
          <el-option
            v-for="db in databases"
            :key="db.Database"
            :label="db.Database"
            :value="db.Database">
          </el-option>
        </el-select>
      </el-aside>
      <el-main>

      </el-main>
    </el-container>
  </el-card>
</template>

<script>
export default {
  name: 'mysqlMap',
  
}
</script>
