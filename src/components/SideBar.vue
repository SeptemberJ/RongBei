<template>
  <div class="SideBar">
    <!-- #545c64  #001529-->
    <el-menu :default-active="menuIdx" class="el-menu-vertical-demo" @select="changeMenu" background-color="#001529" text-color="hsla(0,0%,100%,.65)" :collapse="isCollapse">
     <!--  <el-menu-item index="0">
        <img style="width:30px;height:30px;margin:0 auto;" src="../../static/images/Logo.png">
        <span slot="title" style="padding-left: 10px;font-size:24px;color:#fff;font-weight:bold;"></span>
      </el-menu-item> -->
      <div style="width: 100%;height:50px;display:flex;align-items:center;justify-content: center;">
        <!-- <img style="width:30px;height:30px;" src="../../static/images/Logo.png"> -->
        <span slot="title" style="padding-left: 10px;font-size:16px;color:#fff;font-weight:bold;">MES-SYSTEM</span>
      </div>
      <!-- <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">订单列表</span>
      </el-menu-item> -->
      <el-menu-item index="2">
        <i class="el-icon-news"></i>
        <span slot="title">安全库存</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-tickets"></i>
        <span slot="title">生产工单</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-share"></i>
        <span slot="title">产品预测分析</span>
      </el-menu-item>
      <!-- <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-third-dingdan2"></i>
          <span slot="title">订单管理</span>
        </template>
        <el-menu-item index="1-1">订单列表</el-menu-item>
      </el-submenu> -->
    </el-menu>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'SideBar',
  props: ['isCollapse'],
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      menuIdx: state => state.menuIdx
    })
  },
  methods: {
    ...mapActions([
      'changeMenuIdx',
      'changeModuleIdx'
    ]),
    changeMenu (index, keyPath) {
      // console.log(index, keyPath)
      this.changeModuleIdx(keyPath[0])
      if (index === '0') { // 点击Logo显示主界面
        this.changeMenuIdx('1')
      } else {
        this.changeMenuIdx(index)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.SideBar{
  height: 100%;
  .el-menu-item{
    text-align: left;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
}
</style>
