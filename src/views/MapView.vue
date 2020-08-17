<template>
  <el-container class="container">
    <el-header>
      <h1>{{name}}</h1>
    </el-header>
    <el-main>
      <el-table :data="datas" :show-header=false max-height="166" row-key="1" :row-style="rowStyle" :cell-style="columnStyle">
        <el-table-column prop="type" label="类型" width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="value" label="值" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" prop="link">
          <template slot-scope="scope">
            <el-button style="color: #409EFF;" type="text" @click="copy(scope.row)">[复制URL]</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div id="mapParent">
        <transition name="slide">
          <div id="editorParent" v-if="flag">
            <div id="editorHeader">
              <span>源代码编辑器</span>
              <span class="el-icon-refresh-left" @click="reset">重置</span>
              <span class="el-icon-video-play" @click="initMap">运行</span>
            </div>
            <editor id="editor" v-model="content" @init="editorInit" lang="html" theme="chrome" width="100%" height="100%"></editor>
          </div>
        </transition>
        <el-button id="editorButton" type="primary" @click="isShow" icon="el-icon-edit" circle v-if="!flag"></el-button>
        <el-button id="editorButton" type="primary" @click="isShow" icon="el-icon-rank" circle v-else="flag"></el-button>
      </div>
    </el-main>
  </el-container>
</template>

<script>
  let message;
  export default {
    name: 'MapView',
    components: {
      editor: require("vue2-ace-editor")
    },
    methods: {
      editorInit() {
        require('brace/ext/language_tools') //language extension prerequsite...
        require('brace/mode/html')
        require('brace/mode/javascript') //language
        require('brace/mode/less')
        require('brace/theme/chrome')
        require('brace/snippets/javascript') //snippet
        let editor = ace.edit("editor");
        //启用自动换行
        editor.getSession().setUseWrapMode(true);
      },
      reset(){
        this.content=this.$store.state.editor_data[0];
      },
      //初始化地图
      initMap(){
        if($("#map")){
          $("#map").remove();
        }
        let html = '<iframe id="map" name="map"></iframe>';
        $("#mapParent").append(html);
        let dom = document.getElementById("map").contentWindow.document;
        dom.open();
        dom.write(this.content);
        dom.close();
      },
      isShow(){
        if(this.flag){
          this.flag=false;
        }else{
          this.flag=true;
        }
      },
      copy(row) {
        let _this = this;
        this.$copyText(row.value).then(function (e) {
          if (message) {
            message.close();
          }
          message = _this.$message({
            message: '复制成功',
            type: 'success',
            center: true,
          });
        })
      },
      columnStyle() {
        return {
          "padding": "0"
        }
      },
      rowStyle() {
        return {
          "height": "30px"
        }
      }
    },
    mounted() {
      //获取数据
      let content = JSON.parse(localStorage.getItem("mapParam")).html;
      //初始化地图
      if($("#map")){
        $("#map").remove();
      }
      let html = '<iframe id="map" name="map"></iframe>';
      $("#mapParent").append(html);
      let dom = document.getElementById("map").contentWindow.document;
      dom.open();
      dom.write(content);
      dom.close();
    },
    data() {
      //获取数据
      let data = JSON.parse(localStorage.getItem("mapParam")).data;
      let content =JSON.parse(localStorage.getItem("mapParam")).html;
      let name;
      if (data.layer_tree_height === 2) {
        name=data.mid_node
      }else{
        name=data.tail_node
      }
      return {
        name: name,
        datas: [{
            type: "rest",
            value: data.rest + "/{参数}"
          },
          {
            type: "wmts_china",
            value: data.wmts_china
          },
          {
            type: "wmts100",
            value: data.wmts100
          },
          {
            type: "param",
            value: data.params
          }
        ],
        content:content,
        flag:false
      }
    }
  }
</script>

<style lang="less">
  #mapParent {
    position: relative;
    margin-top: 10px;
    width: 100%;
    height: 73%;
    overflow: hidden;
    border: 1px solid #EBEEF5;
  }

  #map {
    width: 100%;
    height: 100%;
  }

  #editorParent {
    position: absolute;
    height: 100%;
    width: 40%;
    top:0;
    left:0;
    margin-left: 1px;
    margin-top: 1px;
    border: 1px solid #EBEEF5;
    background-color: #fff;
    //伸缩盒子
    display: flex;
    // 决定主轴的方向
    flex-direction: column;
    justify-content:start;
  }
  #editorHeader{
    position: relative;
    line-height: 45px;
    font-size: 14px;
    box-shadow: 0px 1px 0px #888888;
    z-index:1000000
  }
  #editorHeader>span:nth-child(1){
    margin-left: 5%;
  }
  #editorHeader>span:nth-child(2){
    margin-left: 58%;
    color:#409eff;
    cursor: pointer;
  }
  #editorHeader>span:nth-child(3){
    margin-left: 2%;
    color:#409eff;
    cursor: pointer;
  }
  #editor{
    position: relative;
    width: 100%;
    height: 100%;
  }
  #editorButton{
    position: absolute;
    right: 0;
    margin-top: 10px;
    margin-right: 10px;
  }
  //进入过渡 开始状态
  .slide-enter{
    transform: translateX(-100%);
  }
  //进入过渡 生效时的状态
  .slide-enter-active {
    transition: all .3s ease;
  }
  //进入过渡 结束状态
  .slide-enter-to {
    transform: translateX(0);
  }

  //离开过渡 开始状态
  .slide-leave{
    transform: translateX(0);
  }
  //离开过渡 生效时的状态
  .slide-leave-active {
    transition: all .3s ease;
  }
  //离开过渡 结束状态
  .slide-leave-to{
    transform: translateX(-100%);
  }
</style>
