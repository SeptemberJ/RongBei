<template>
  <div class="WarnPrint">
    <!-- <table id="table" border="0" width="100%">
      <thead>
        <tr>
          <th style="width:50px;padding-bottom: 15px;color:#909399;font-size:14px;border-bottom:1px solid #EBEEF5;">序号</th>
          <th class="tableColumn">质量原因</th>
          <th class="tableColumn">解决方案</th>
          <th class="tableColumn">解决人</th>
          <th class="tableColumn">解决时间</th>
          <th style="min-width:300px;padding-bottom: 15px;padding-bottom: 15px;line-height:23px;color:#909399;font-size:14px;border-bottom:1px solid #EBEEF5;">图片</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in yjList" :key="idx">
          <td style="width:50px;border-bottom:1px solid #EBEEF5;">{{idx + 1}}</td>
          <td style="width:150px;border-bottom:1px solid #EBEEF5;">{{item.reason}}</td>
          <td style="width:150px;border-bottom:1px solid #EBEEF5;">{{item.fanfa}}</td>
          <td style="width:150px;border-bottom:1px solid #EBEEF5;">{{item.fpeople}}</td>
          <td style="width:150px;border-bottom:1px solid #EBEEF5;">{{item.ftime}}</td>
          <td style="min-width:300px;border-bottom:1px solid #EBEEF5;">
            <img class="MarginR_10" v-for="(img, idx) in item.imgList" :key="idx" :src="imgPreUrl + img" width="70" height="70" style="display:inline-block;"/>
          </td>
        </tr>
      </tbody>
    </table> -->
    <el-table id="table"
      :data="yjList"
      style="width: 100%">
      <el-table-column
      type="index"
      width="50">
      </el-table-column>
      <el-table-column
        prop="reason"
        label="质量原因"
        width="150"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="fanfa"
        label="解决方案"
        width="150"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="fpeople"
        label="解决人"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="ftime"
        label="解决时间"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="image" label="图片">
        <template slot-scope="scope">
          <img class="MarginR_10" v-for="(img, idx) in scope.row.imgList" :key="idx" :src="imgPreUrl + img" width="70" height="70" style="display:inline-block;"/>
        </template>
      </el-table-column>
    </el-table>
    <section class="MarginT_20">
      <el-button type="" size="mini" @click="back">返 回</el-button>
      <el-button type="primary" size="mini" @click="print">打 印</el-button>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'WarnPrint',
  props: ['curWarnFShortNumber', 'timestamp'],
  data () {
    return {
      yjList: []
    }
  },
  computed: {
    ...mapState({
      imgPreUrl: state => state.imgPreUrl
    })
  },
  created () {
    this.getWarnList()
  },
  watch: {
    timestamp: function () {
      this.getWarnList()
    }
  },
  methods: {
    getWarnList () {
      this.Http.get('yujingList', {fshortnumber: this.curWarnFShortNumber}
      ).then(res => {
        switch (res.data.code) {
          case 1:
            this.yjList = res.data.yujinglist.map(item => {
              item.imgList = item.newpic.split(',')
              return item
            })
            // this.yjList[1] = this.yjList[0]
            break
          default:
            this.$message({
              message: res.data.message + '!',
              type: 'error'
            })
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    back () {
      this.$emit('closePrint')
    },
    print () {
      var tableToPrint = document.getElementById('table') // 要打印的表格
      var newWin = window.open('') // 打开新的窗口
      newWin.document.write(tableToPrint.outerHTML) // 将表格添加进新的窗口
      newWin.document.close() // 在IE浏览器中必须加这一句
      newWin.focus() // 在IE浏览器中必须加这一句
      newWin.print() // 打印
      newWin.close() // 关闭窗口
    }
  }
}
</script>

<style lang="less" scoped>
.tableColumn{
  width:50px;
  padding-bottom: 15px;
  line-height:23px;
  color:#909399;
  font-size:14px;
  border-bottom:1px solid #EBEEF5;
}
</style>
