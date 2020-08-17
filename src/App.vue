<template>
  <div id="app">
    <el-container class="container">
      <el-aside id="aside">
        <Menu></Menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>

  </div>
</template>

<script>
// @ is an alias to /src
import Menu from '@/components/Menu.vue'

export default {
  name: 'App',
  components: {
    Menu
  }
}
</script>
<style lang="less">
.G-WH {
  width: 100%;
  height: 100%;
}
/* 初始化环境 */
html,body{
  height:100%;
  width:100%;
  overflow:hidden;
  -webkit-user-select:none;
  font-size: 16px;
  color: #2c3e50;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
body{margin:0;padding:0;background:#fff;}
body img{border:none;margin:0;padding:0;}
div, h1, h2, h3, h4, p, form, label, input, textarea, img, span{margin:0;padding:0;word-break:break-all;word-wrap:break-word;}
ul{margin:0;padding:0;list-style-type:none;font-size:0;line-height:0;word-break:break-all;word-wrap:break-word;}
dl,dt,dd{margin:0;padding:0;border:0;}
// .spacer{clear:both;font-size:0;line-height:0;}
a{color:#5f6477;text-decoration:none;}
a:hover{color:#5f6477;text-decoration:none;}
:focus{outline:0;}
input,select{font-family:"微软雅黑";}

/* 设置滚动条的样式 */
::-webkit-scrollbar{
	width:5px;
	height:5px;
}
/* 滚动槽 */
::-webkit-scrollbar-track {
	box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
	border-radius:10px;
	background-color: #ddd;
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
	border-radius:10px;
	height:5px;
	background:#777;
}

#app {
  .G-WH();
}

.container{
  .G-WH();
}
#aside{
  height:100%;
  border-right:solid 1px #ccc;
}
</style>
