<template>
  <el-menu default-active="1" id="menu" router>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>服务列表</span>
      </template>
      <el-menu-item index="/mapserver">地图服务</el-menu-item>
      <el-menu-item index="/dataserver">数据服务</el-menu-item>
      <el-menu-item index="1-3">三维服务</el-menu-item>
      <el-menu-item index="1-4">空间分析服务</el-menu-item>
    </el-submenu>
    <el-menu-item index="2">
      <i class="el-icon-menu"></i>
      <span slot="title">数据管理</span>
    </el-menu-item>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-document"></i>
        <span>示例程序</span>
      </template>
      <el-menu-item index="3-1">地图范例</el-menu-item>
      <el-menu-item index="3-2">数据范例</el-menu-item>
      <el-menu-item index="3-3">三维范例</el-menu-item>
      <el-menu-item index="3-4">空间分析范例</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: 'Menu',
  props: {

  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped lang="less">

</style>
