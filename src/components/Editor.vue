<template>
  <div id="mapParent">
    <transition name="slide">
      <div id="editorParent" v-if="flag">
        <div id="editorHeaderParent">
          <div id="editorHeader">
            <div>
              <span>源代码编辑器</span>
            </div>
            <div>
              <span class="el-icon-refresh-left" @click="reset">重置</span>&nbsp&nbsp
              <span class="el-icon-video-play" @click="initMap">运行</span>
            </div>
          </div>
        </div>
        <editor id="editor" v-model="content" @init="editorInit" lang="html" theme="chrome" width="100%" height="100%"></editor>
      </div>
    </transition>
    <el-button id="editorButton" type="primary" @click="isShow" icon="el-icon-edit" circle v-if="!flag"></el-button>
    <el-button id="editorButton" type="primary" @click="isShow" icon="el-icon-rank" circle v-else-if="flag"></el-button>
  </div>
</template>

<script>
  export default {
    name: 'Editor',
    props: {

    },
    components: {
      editor: require('vue2-ace-editor')
    },
    data() {
      // 获取数据
      let content= this.$store.state.editor_data[0];

      return {
        content: content,
        flag: false
      }
    },
    mounted() {
      // 初始化地图
      if ($('#map')) {
        $('#map').remove()
      }
      const html = '<iframe id="map" name="map"></iframe>'
      $('#mapParent').append(html)
      const dom = document.getElementById('map').contentWindow.document
      dom.open()
      dom.write(this.content)
      dom.close()
    },
    methods: {
      editorInit() {
        require('brace/ext/language_tools') // language extension prerequsite...
        require('brace/mode/html')
        require('brace/mode/javascript') // language
        require('brace/mode/less')
        require('brace/theme/chrome')
        require('brace/snippets/javascript') // snippet
        const editor = ace.edit('editor')
        // 启用自动换行
        editor.getSession().setUseWrapMode(true)
      },
      reset() {
        this.content = this.$store.state.editor_data[0]
      },
      // 初始化地图
      initMap() {
        if ($('#map')) {
          $('#map').remove()
        }
        const html = '<iframe id="map" name="map"></iframe>'
        $('#mapParent').append(html)
        const dom = document.getElementById('map').contentWindow.document
        dom.open()
        dom.write(this.content)
        dom.close()
      },
      isShow() {
        if (this.flag) {
          this.flag = false
        } else {
          this.flag = true
        }
      },
    }
  }
</script>

<style lang="less">
  #mapParent {
    position: relative;
    margin-top: 10px;
    width: 100%;
    // margin-left:15%;
    height: 72%;
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
    top: 0;
    left: 0;
    margin-left: 1px;
    margin-top: 1px;
    border: 1px solid #EBEEF5;
    background-color: #fff;
    //伸缩盒子
    display: flex;
    // 决定主轴的方向
    flex-direction: column;
    justify-content: start;
  }
  #editorHeaderParent{
    width: 100%;
    line-height: 45px;
    box-shadow: 0px 1px 0px #888888;
    z-index: 1000000;
  }
  #editorHeader {
    position: relative;
    width:90%;
    margin-left: 5%;
    line-height: 45px;
    font-size: 14px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  #editorHeader>div:nth-child(2)>span{
    color: #409eff;
    cursor: pointer;
  }

  #editor {
    position: relative;
    width: 100%;
    height: 100%;
  }

  #editorButton {
    position: absolute;
    right: 0;
    margin-top: 10px;
    margin-right: 10px;
  }

  //进入过渡 开始状态
  .slide-enter {
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
  .slide-leave {
    transform: translateX(0);
  }

  //离开过渡 生效时的状态
  .slide-leave-active {
    transition: all .3s ease;
  }

  //离开过渡 结束状态
  .slide-leave-to {
    transform: translateX(-100%);
  }
</style>
