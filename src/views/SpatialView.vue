<template>
  <el-container class="container">
    <el-header >
      <h1>{{name}}</h1>
    </el-header>
    <el-main>
      <el-table id="spatialview_table" :data="datas" border :tree-props="{children: 'children'}" max-height="500" row-key="id" :row-style="rowStyle" :cell-style="columnStyle">
        <el-table-column prop="type" align="center" label="标题/字段名" min-width="30%" show-overflow-tooltip></el-table-column>
        <el-table-column prop="value" align="center" label="描述/地址" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作/类型" align="center" min-width="20%">
          <template v-slot:default="scope">
            <el-button style="color: #409EFF;" type="text" @click="copy(scope.row)" v-if="scope.row.isShow">[复制URL]</el-button>
            <span v-else>{{scope.row.param_type}}</span>
          </template>
        </el-table-column>
      </el-table>
      <Editor></Editor>
    </el-main>
  </el-container>
</template>

<script>
  import Editor from '@/components/Editor.vue'
  let message;
  export default {
    name: 'SpatialView',
    components: {
      Editor
    },
    methods: {
      open(row, column, cell, event) {

      },
      columnStyle() {
        return {
          padding: '0'
        }
      },
      rowStyle() {
        return {
          height: '40px'
        }
      },
      copy(row) {
        const _this = this
        this.$copyText(row.value).then(function (e) {
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
    },
    data() {
      // 获取数据
      const data = JSON.parse(localStorage.getItem('spatialParam'))
      let children = [];
      for (let i = 0; i < data.params.length; i++) {
        let temp = {};
        temp.id = this.$UUID();
        temp.type = data.params[i].param_name;
        temp.value = data.params[i].param_discription;
        temp.param_type=data.params[i].param_type;
        temp.isShow = false;
        children.push(temp);
      }
      return {
        name: data.service_name,
        datas: [{
            id: this.$UUID(),
            type: '服务描述',
            value: data.service_desc,
            isShow:true
          },
          {
            id: this.$UUID(),
            type: '服务地址',
            value: data.url,
            isShow:true
          },
          {
            id: this.$UUID(),
            type: '参数示例',
            value: JSON.stringify(data.param_example),
            isShow:true,
            children: children
          }
        ],
      }
    }
  }
</script>

<style lang="less">
#spatialview_table{
  width:70%;
}
</style>
