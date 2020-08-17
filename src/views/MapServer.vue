<template>
  <el-container class="container">
    <el-header>
      <h1>地图服务列表</h1>
    </el-header>
    <el-main>
      <el-table border :data="datas"  @cell-click="jump_page" :cell-style="cell_highlight" height="100%" style="width: 100%" row-key="1" :span-method="arraySpanMethod">
        <el-table-column prop="root_node" label="一级目录" show-overflow-tooltip></el-table-column>
        <el-table-column prop="mid_node" label="二级目录" show-overflow-tooltip></el-table-column>
        <el-table-column prop="tail_node" label="三级目录" show-overflow-tooltip></el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>

  export default{
    name: 'MapServer',
    methods: {
      open(row, column, cell, event) {

      },
      arraySpanMethod({ row, column, rowIndex, columnIndex }){
        if(columnIndex===0){
          if(row.root_row&&row.root_row>1){
            return [row.root_row,1]
          }else if(row.root_row&&row.root_row===1){
            return [1,1]
          }else{
            return [0,0]
          }
        }
        if(columnIndex===1){
          if(row.mid_row&&row.mid_row>1){
            return [row.mid_row,1]
          }else if(row.mid_row&&row.mid_row===1){
            return [1,1]
          }else{
            return [0,0]
          }
        }

      },
      cell_highlight({ row, column, rowIndex, columnIndex }){
        if(row.layer_tree_height===2&&columnIndex===1){
          return {
            "color":"#409eff",
            "cursor":"pointer"
          }
        }else if(row.layer_tree_height===3&&columnIndex===2){
          return {
            "color":"#409eff",
            "cursor":"pointer"
          }
        }
      },
      jump_page(row, column, cell, event){
        if(cell.style.cssText==="color: rgb(64, 158, 255); cursor: pointer;"){
          //页面路由传递参数
          // this.$router.push({
          //   //路径
          //   path:'/mapview',
          //   //组件名称
          //   name:'MapView',
          //   //传递的参数
          //   params:{
          //     data:row,
          //     html:this.$store.state.editor_data
          //   }
          // });
          this.$router.push({
            path:'/mapview'
          })
          let param = {
            data:row,
            html:this.$store.state.editor_data[0]
          }
          //将数据存储在客户端
          localStorage.setItem("mapParam",JSON.stringify(param));
        }
      }
    },
    data() {
      return {
        datas:this.$store.state.map_list
      }
    }
  }
</script>

<style lang="less">

</style>
