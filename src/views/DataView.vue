<template>
  <el-container class="container">
    <el-header id="header">
      <h1>{{display_name}}({{name}})</h1>
    </el-header>
    <el-main>
      <el-table id="map_table" :data="datas" border height="100%">
        <el-table-column prop="field_name" min-width="40%" align="center" label="字段" show-overflow-tooltip></el-table-column>
        <el-table-column prop="display_name" min-width="40%" align="center" label="中文名" show-overflow-tooltip></el-table-column>
        <el-table-column prop="remark" align="center" label="备注" show-overflow-tooltip></el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
let message;
export default {
  name: 'DataView',
  methods: {},
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
