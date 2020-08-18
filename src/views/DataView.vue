<template>
  <el-container class="container">
    <el-header>
      <h1>{{display_name}}({{name}})</h1>
    </el-header>
    <el-main>
      <el-table :data="datas" border height="100%" row-key="1">
        <el-table-column prop="field_name" width="200" align="center" label="字段" show-overflow-tooltip></el-table-column>
        <el-table-column prop="display_name" width="200" align="center" label="中文名" show-overflow-tooltip></el-table-column>
        <el-table-column prop="remark" align="center" label="备注" show-overflow-tooltip></el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
let message
export default {
  name: 'DataView',
  methods: {},
  mounted () {
    // console.log(this.$route.params);
  },
  data () {
    const data = JSON.parse(localStorage.getItem('dataParam'))
    return {
      name: data.table_name,
      display_name: data.display_name,
      datas: data.fields
    }
  }
}
</script>

<style lang="less">
</style>
