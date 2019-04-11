<template>
  <div class="TopBar">
    <el-row class="Information">
      <el-col :span="4" class="TextAlignL" v-if="pathName != 'Information'">
        <span  v-if="isCollapse && !isMobile" class="CursorPointer" @click="showAside">
          <svg viewBox="64 64 896 896" class="" data-icon="menu-unfold" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"></path></svg>
        </span>
        <span v-if="!isCollapse && !isMobile" class="CursorPointer" @click="hideAside">
          <svg viewBox="64 64 896 896" class="" data-icon="menu-fold" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM115.4 518.9L271.7 642c5.8 4.6 14.4.5 14.4-6.9V388.9c0-7.4-8.5-11.5-14.4-6.9L115.4 505.1a8.74 8.74 0 0 0 0 13.8z"></path></svg>
        </span>
      </el-col>
      <el-col :span="pathName == 'Information' ? 24 : 20" class="TextAlignR">
        你好，{{userName}}
        <span class="CursorPointer" @click="LogOut"><i class="fa fa-sign-out" title="退出"></i></span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import {clearCookie} from '../util/utils'
export default {
  name: 'TopBar',
  props: ['isCollapse', 'isMobile'],
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      userName: state => state.userName,
      pathName: state => state.pathName
    })
  },
  methods: {
    ...mapActions([
      'hideNotice'
    ]),
    LogOut () {
      this.$confirm('此操作将退出当前登陆的账户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.clear('vuex-along')
        this.$router.push({name: 'Login'})
        clearCookie('RB_14a808c40bba58c2c')
      }).catch((err) => {
        console.log(err)
      })
    },
    showAside () {
      this.$emit('toggleAside', false)
    },
    hideAside () {
      this.$emit('toggleAside', true)
    }
  }
}
</script>

<style lang="less" scoped>
.TopBar{
  width: calc(100% - 40px);
  height: 64px;
  padding: 0 20px;
  line-height: 64px;
  text-align: right;
  diaplay: block;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08)
}
</style>
