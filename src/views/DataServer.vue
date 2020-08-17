<template>
  <el-container class="container">
    <el-header>
      <h1>数据服务列表</h1>
    </el-header>
    <el-main>
      <el-table :data="staticData" border height="146" row-key="1"  style="width: 100%" :span-method="arraySpanMethod">
        <el-table-column prop="name" label="服务名称" show-overflow-tooltip ></el-table-column>
        <el-table-column prop="url" label="服务地址" show-overflow-tooltip></el-table-column>
      </el-table>
      <h2>数据库表</h2>
      <el-table :data="datas" @cell-click="jump_page" border height="72%" row-key="1111" :cell-style="cell_highlight" style="width: 100%">
        <el-table-column prop="table_name" label="表名" show-overflow-tooltip ></el-table-column>
        <el-table-column prop="display_name" label="数据库表(中文)" show-overflow-tooltip></el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'DataServer',
  methods:{
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if(row.root_row){
            return [row.root_row,1]
        }else{
          return [0,0]
        }
      }
    },
    cell_highlight({ row, column, rowIndex, columnIndex }){
      if(columnIndex===1){
        return {
          "color":"#409eff",
          "cursor":"pointer"
        }
      }
    },
    jump_page(row, column, cell, event){
      if(cell.style.cssText==="color: rgb(64, 158, 255); cursor: pointer;"){
        this.$router.push({
          path:'/dataview'
        });
        localStorage.setItem("dataParam",JSON.stringify(row));
      }
    }
  },
  data: function () {
    return {
      staticData: [
        {
          name:"data-cim",
          root_row:2,
          url:"http://172.16.201.109:18090/iserver/iservices/data/rest"
        },
        {
          name: 'data-cim',
          url:"http://172.16.201.109:18090/iserver/iservices/data/wfs"
        },
      ],
      datas:this.$store.state.data_list
    }
  }
}
</script>

<style lang="less">

h2{
  font-size: 16px;
  font-weight:normal;
  margin-top:10px;
  margin-bottom: 10px;
}
</style>
