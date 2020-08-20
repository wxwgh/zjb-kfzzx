<template>
  <el-container class="container">
    <el-header id="header">
      <h1>地图服务列表</h1>
    </el-header>
    <el-main>
      <el-table id="map_table" border :data="datas" @cell-click="jump_page" :cell-style="cell_highlight" height="100%" row-key="id" :span-method="arraySpanMethod">
        <el-table-column prop="root_node" align="center" min-width="40%" label="服务大类" show-overflow-tooltip></el-table-column>
        <el-table-column prop="mid_node" align="center" min-width="40%" label="服务小类" show-overflow-tooltip></el-table-column>
        <el-table-column prop="tail_node" align="center" min-width="40%" label="服务名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="service_desc" align="center" label="服务描述" show-overflow-tooltip></el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'MapServer',
  methods: {
    open (row, column, cell, event) {

    },
    arraySpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (row.root_row && row.root_row > 1) {
          return [row.root_row, 1]
        } else if (row.root_row && row.root_row === 1) {
          return [1, 1]
        } else {
          return [0, 0]
        }
      }
      if (columnIndex === 1) {
        if (row.mid_row && row.mid_row > 1) {
          return [row.mid_row, 1]
        } else if (row.mid_row && row.mid_row === 1) {
          return [1, 1]
        } else {
          return [0, 0]
        }
      }
    },
    cell_highlight ({ row, column, rowIndex, columnIndex }) {
      if(columnIndex===2){
        return {
          color: '#409eff',
          cursor: 'pointer'
        }
      }
    },
    jump_page (row, column, cell, event) {
      let _this=this;
      if (cell.style.cssText === 'color: rgb(64, 158, 255); cursor: pointer;') {
        this.$axios({
          method: 'get',
          url: 'map.html'
        }).then(function (result) {
          _this.$store.commit('get_editor_text', result.data)
          let data={
            server:row.rest+"/",
            param:"\""+Object.keys(row.params[0])[0]+"\""
          };
          //修改地图模板
          _this.$store.commit("set_editor_text",data);
          _this.$router.push({
            path: '/mapview'
          })
        })
        // 将数据存储在客户端
        localStorage.setItem('mapParam', JSON.stringify(row))
      }
    }
  },
  data () {
    return {
      datas: this.$store.state.map_list
    }
  }
}
</script>

<style lang="less">
#map_table{
  width:70%;
  margin-left:15%;
}
#header{
  text-align: center;
}
</style>
