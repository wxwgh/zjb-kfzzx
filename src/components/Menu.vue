<template>
  <el-menu default-active="/mapserver" id="menu" router>
    <el-menu-item index="/mapserver">
      <i class="el-icon-location"></i>
      <span slot="title">地图服务</span>
    </el-menu-item>
    <el-menu-item index="/dataserver">
      <i class="el-icon-menu"></i>
      <span slot="title">数据服务</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'Menu',
  props: {

  },
  methods: {

  }
}
</script>

<style scoped lang="less">

</style>
