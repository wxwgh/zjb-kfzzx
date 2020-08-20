<template>
  <el-container class="container">
    <el-header >
      <h1>{{name}}</h1>
    </el-header>
    <el-main>
      <el-table id="mapview_table" :data="datas" border :tree-props="{children: 'children'}" :show-header=false max-height="500" row-key="id" :row-style="rowStyle" :cell-style="columnStyle">
        <el-table-column prop="type" align="center" label="类型" min-width="30%" show-overflow-tooltip></el-table-column>
        <el-table-column prop="value" align="center" label="值" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" align="center" min-width="20%" prop="link">
          <template slot-scope="scope">
            <el-button style="color: #409EFF;" type="text" @click="copy(scope.row)">[复制URL]</el-button>
          </template>
        </el-table-column>
      </el-table>
      <Editor></Editor>
    </el-main>
  </el-container>
</template>

<script>
import Editor from '@/components/Editor.vue'

let message
export default {
  name: 'MapView',
  components: {
    Editor
  },
  methods: {
    copy (row) {
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
    columnStyle () {
      return {
        padding: '0'
      }
    },
    rowStyle () {
      return {
        height: '40px'
      }
    }
  },
  data () {
    // 获取数据
    const data = JSON.parse(localStorage.getItem('mapParam'));
    let paramValue;
    let children=[];
    for(let i=0;i<data.params.length;i++){
      for(let key in data.params[i]){
        if(i===0){
          paramValue="{"+key+"}";
        }
        let temp={};
        temp.id=this.$UUID();
        temp.type =data.params[i][key];
        temp.value = key;
        children.push(temp);
      }
    }
    return {
      name: data.tail_node,
      datas: [
        {
          id:this.$UUID(),
          type: '服务描述',
          value: data.service_desc
        },
        {
          id:this.$UUID(),
          type: '平台格式',
          value: this.$store.state.map_host+data.rest + '/{参数}'
        },
        {
          id:this.$UUID(),
          type: 'OGC格式',
          value: this.$store.state.map_host+data.wmts100
        },
        {
          id:this.$UUID(),
          type: '参数示例',
          value: paramValue,
          children:children
        }
      ],
    }
  }
}
</script>

<style lang="less">
  #mapview_table{
    width:70%;
  }
</style>
