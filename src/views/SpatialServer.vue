<template>
  <el-container class="container">
    <el-header id="header">
      <h1>空间分析服务列表</h1>
    </el-header>
    <el-main>
      <el-table id="map_table" border :data="datas" @cell-click="jump_page" :cell-style="cell_highlight" height="100%" row-key="id">
        <el-table-column prop="service_name" align="center" min-width="40%" label="服务名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="url" align="center"  label="服务地址" show-overflow-tooltip></el-table-column>
        <el-table-column prop="service_desc" min-width="40%" align="center" label="服务描述" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" align="center" min-width="20%" prop="link">
          <template slot-scope="scope">
            <el-button style="color: #409EFF;" type="text" @click="copy(scope.row)">[复制URL]</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
let message;
export default {
  name: 'SpatialServer',
  methods: {
    copy (row) {
      const _this = this
      this.$copyText(row.url).then(function (e) {
        if (message) {
          message.close()
        }
        message = _this.$message({
          message: '复制成功',
          type: 'success',
          center: true
        })
      })
    },
    cell_highlight ({ row, column, rowIndex, columnIndex }) {
      if(columnIndex===0){
        return {
          color: '#409eff',
          cursor: 'pointer'
        }
      }
    },
    jump_page (row, column, cell, event) {
      let _this = this;
      if (cell.style.cssText === 'color: rgb(64, 158, 255); cursor: pointer;') {
        this.$axios({
          method: 'get',
          url: 'spatial.html'
        }).then(function (result) {
          _this.$store.commit('get_editor_text', result.data)
          let data={
            server:row.url,
            param:JSON.stringify(row.param_example)
          };
          //修改地图模板
          _this.$store.commit("set_editor_text",data);
          _this.$router.push({
            path: '/spatialview'
          })
        })
        // 将数据存储在客户端
        localStorage.setItem('spatialParam', JSON.stringify(row))
      }
    }
  },
  data () {
    return {
      datas: this.$store.state.spatial_list
    }
  }
}
</script>

<style lang="less">

</style>
