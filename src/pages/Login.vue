<template>
	<div class="wrap">
    <div class="Login">
      <div class="MarginB_20"><h2 class="ColorWhite" style="letter-spacing: .34em;">用户登陆</h2></div>
      <el-form :model="Form" :rules="rules" ref="Form" label-width="0px" class="demo-ruleForm">
        <el-form-item label="" prop="accountName">
          <el-input v-model="Form.accountName" placeholder="用户名" clearable></el-input>
        </el-form-item>
        <el-form-item label="" prop="accountPsd">
          <el-input v-model="Form.accountPsd" type="password" placeholder="密码" clearable></el-input>
        </el-form-item>
        <el-button type="primary" :loading="btLoading" class="bt" @click="Login('Form')">登陆</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import {setCookie} from '../util/utils'
import {send} from '../util/send'
import CryptoJS from 'crypto-js'
export default {
  name: 'Login',
  data () {
    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    var validatePsd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      Form: {
        accountName: 'admin', // admin
        accountPsd: '123456' // 123456
      },
      rules: {
        accountName: [
          { validator: validateName, trigger: 'change' }
        ],
        accountPsd: [
          { validator: validatePsd, trigger: 'change' }
        ]
      }

    }
  },
  computed: {
    ...mapState({
      btLoading: state => state.btLoading
    })
  },
  methods: {
    ...mapActions([
      'unitUserInfo',
      'toggleLoadingBt'
    ]),
    Login (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.sureLogin()
        } else {
          this.$message({
            message: '请输入用户名或密码!',
            type: 'warning'
          })
          return false
        }
      })
    },
    // 登陆
    sureLogin () {
      this.toggleLoadingBt(true)
      this.Http.post('userLogin?account=' + this.Form.accountName + '&password=' + this.Form.accountPsd, {account: this.Form.accountName, password: this.Form.accountPsd}
      ).then(res => {
        switch (res.data.code) {
          case 1:
            let cookieStr = CryptoJS.HmacSHA256((this.Form.accountName + this.Form.accountPsd).toString(), '14a808c40bba58c2c')
            setCookie('RB_14a808c40bba58c2c', cookieStr, 6)
            let Info = res.data.memberInfo
            this.unitUserInfo({name: Info.name, id: Info.ID})
            this.$router.push({name: 'Home'})
            this.toggleLoadingBt(false)
            break
          default:
            this.$message({
              message: res.data.message + '!',
              type: 'error'
            })
            this.toggleLoadingBt(false)
        }
      }).catch((error) => {
        this.toggleLoadingBt(false)
        console.log(error)
      })
    },
    sureLogin2 () {
      send({
        name: 'userLogin?account2=' + this.Form.accountName + '&password=' + this.Form.accountPsd,
        method: 'POST',
        data: {
        }
      }).then(res => {
      }).catch((res) => {
        console.log(res)
      })
    }
  }
}
</script>
<style lang="less" scoped>
.wrap{
  width: 100vw;
  height: 100vh;
  background: url('../../static/images/bg.png') no-repeat center/cover;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  .Login{
    max-width: 388px;
    width: 70%;
    margin: 0 auto;
    background: transparent;
    padding: 16px 32px 32px 32px;
    box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.5);
    .bt{
      width: 100%;
      font-weight: 400;
      letter-spacing: .34em;
    }
  }
}
</style>
