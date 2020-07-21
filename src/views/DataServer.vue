<template>
  <el-container class="container">
    <el-header>
      <h1>数据服务列表</h1>
    </el-header>
    <el-main>
      <div id="datalink">
        <span>注:具体数据库表请到<span>数据管理</span>下进行查看</span>
      </div>
      <el-table id="datatable" :data="tableData" border height="95%" style="width: 100%" :span-method="objectSpanMethod">
        <el-table-column prop="name" label="服务名称" show-overflow-tooltip ></el-table-column>
        <el-table-column prop="url" label="服务地址" show-overflow-tooltip></el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'DataServer',
  methods:{
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if(row.index){
            return {
              rowspan: row.index[0],
              colspan: row.index[1]
            };
        }else{
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    }
  },
  data: function () {
    return {
      tableData: [
        {
          id: this.UUID(),
          name: 'xy',
          type:"rest",
          index:[2,1],
          url:"http://127.0.0.1:8090/rest"
        },
        {
          id: this.UUID(),
          name: 'xy',
          type:"wmts",
          url: "http://127.0.0.1:8090/wmts"
        },
        {
          id: this.UUID(),
          name: 'zv',
          type:"rest",
          index:[2,1],
          url: "http://localhost:8090/rest"
        },
        {
          id: this.UUID(),
          name: 'zv',
          type:"wmts",
          url: "http://localhost:8090/wmts"
        }
      ]
    }
  }
}
</script>

<style lang="less">
@color:#0074D9;
@line-height:24px;
@cursor:pointer;
#datalink{
  width: 100%;
  line-height: 24px;
  font-size: 12px;
  text-align: right;
}
#datalink>span>span{
  color: @color;
  cursor: @cursor;
}
// #datatable tbody tr:hover>td {
//   background-color:#ffffff!important;
// }
</style>
