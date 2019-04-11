<template>
  <div class="Detail">
    <!-- <el-button size="small" class="MarginB_20" type="primary" icon="el-icon-printer" @click="Print" style="float:right;">打印</el-button> -->
    <!-- <button @click="doPrintJB">IE打印</button> -->
    <table border="0" id="table" style="width: 100%;" ref="print">
      <thead>
        <tr>
          <th width="65%" style="padding: 0px;">
            <table width="100%" class="NoLeftBorder NoTopBorder">
              <thead>
                <tr>
                  <th style="width:100px;">计划号</th>
                  <th style="width:300px;">{{TitleInfo.FText}}</th>
                  <th style="width:100px;">日期</th>
                  <th style="width:200px;">{{TitleInfo.FDateStr}}</th>
                  <th style="width:100px;">客户</th>
                  <th style="width:300px;">{{TitleInfo.FName}}</th>
                  <th style="width:100px;">合同号</th>
                  <th style="width:200px;">{{TitleInfo.FNOTE}}</th>
                  <th style="width:100px;">单位</th>
                  <th style="width:100px;">{{TitleInfo.danwei}}</th>
                  <th style="width:100px;">交货日期</th>
                  <th style="width:200px;border-right: 0px solid #000;">{{TitleInfo.FDate3Str}}</th>
                </tr>
              </thead>
            </table>
          </th>
          <th width="35%" style="padding: 0px;">
            <table width="100%" class="NoLeftBorder NoTopBorder">
              <thead>
                <tr>
                  <th style="width:100px;">产品名称</th>
                  <th style="width:300px;">{{TitleInfo.wlname}}</th>
                  <th style="width:100px;">规格型号</th>
                  <th style="width:300px;">{{TitleInfo.fmodel}}</th>
                  <!-- <th style="width:100px;">产品图号</th>
                  <th style="width:300px;"></th> -->
                  <th style="width:100px;">数量</th>
                  <th style="width:100px;">{{TitleInfo.fqty}}</th>
                  <!-- <th style="width:100px;">喷涂</th>
                  <th style="width:300px;"></th> -->
                </tr>
              </thead>
            </table>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td rowspan="2" class="NoTopBorder">零件技术管制制单</td>
          <td class="NoTopBorder">生产进度计划</td>
        </tr>
        <tr>
          <!-- “黄色”表示“标记”， -->
          <td>注：需要填写制单人，开工日期，完工日期；进度计划用颜色填充，“蓝色”表示“预计”，“绿色”表示“完成”，“红色”表示“严重延期”</td>
        </tr>
        <tr>
          <!-- left -->
          <td style="padding: 0px;"  valign="top">
            <table width="100%" class="NoLeftBorder NoTopBorder">
              <thead>
                <tr>
                  <th style="min-width:20px">序号</th>
                  <th width="20px">0</th>
                  <th width="20px">1</th>
                  <th width="20px">2</th>
                  <th width="20px">3</th>
                  <th width="20px">4</th>
                  <th width="20px">5</th>
                  <th width="20px">6</th>
                  <th width="20px">7</th>
                  <th width="20px">8</th>
                  <th style="min-width:30px">最终级</th>
                  <th width="200px">零件号</th>
                  <th style="min-width:80px">零件名称</th>
                  <th style="min-width:50px">材质代码</th>
                  <th style="min-width:80px">品名</th>
                  <th style="min-width:80px">规格</th>
                  <th style="min-width:30px">单套数量</th>
                  <th style="min-width:30px">下单数量</th>
                  <th style="min-width:30px">实际数量</th>
                  <th style="min-width:80px">类别</th>
                  <th style="min-width:80px">材质</th>
                  <th width="100px">厚</th>
                  <th width="100px">长</th>
                  <th width="100px">宽</th>
                  <th width="100px">比重</th>
                  <th width="100px">单位</th>
                  <th width="100px">用量</th>
                  <th width="100px">重量</th>
                  <th style="min-width:30px">激光切割</th>
                  <th width="100px">数控</th>
                  <th width="100px">压铆</th>
                  <th width="100px">折弯</th>
                  <th width="100px">焊接</th>
                  <th width="100px">打磨</th>
                  <th width="100px">喷涂</th>
                  <th width="100px">点胶</th>
                  <th width="100px">装配</th>
                  <th width="100px">包装</th>
                  <th style="min-width:30px">喷涂面积</th>
                  <th style="min-width:80px">备注</th>
                </tr>
              </thead>
              <!-- dataList -->
              <tbody>
                <tr v-for="(leftItem, idx) in lingJianList" :key="idx">
                  <td style="min-width:20px">{{idx + 1}}</td>
                  <td width="20px">{{leftItem.F0 == 1 ? '√' : ''}}</td>
                  <td width="20px">{{leftItem.F1 == 1 ? '√' : ''}}</td>
                  <td width="20px">{{leftItem.F2 == 1 ? '√' : ''}}</td>
                  <td width="20px">{{leftItem.F3 == 1 ? '√' : ''}}</td>
                  <td width="20px">{{leftItem.F4 == 1 ? '√' : ''}}</td>
                  <td width="20px">{{leftItem.F5 == 1 ? '√' : ''}}</td>
                  <td width="20px">{{leftItem.F6 == 1 ? '√' : ''}}</td>
                  <td width="20px">{{leftItem.F7 == 1 ? '√' : ''}}</td>
                  <td width="20px">{{leftItem.F8 == 1 ? '√' : ''}}</td>
                  <td width="20px">{{leftItem.F_zzj == 1 ? '√' : ''}}</td>
                  <td width="200px">{{leftItem.Fnumber}}</td>
                  <td style="min-width:80px">{{leftItem.Fname}}</td>
                  <td style="min-width:50px">{{leftItem.Fcz_dm}}</td>
                  <td style="min-width:80px">{{leftItem.Fpinming}}</td>
                  <td style="min-width:80px">{{leftItem.Fmodel}}</td>
                  <td style="min-width:30px">{{leftItem.fdtQty}}</td>
                  <td style="min-width:30px">{{leftItem.fxdQty}}</td>
                  <td style="min-width:30px">{{leftItem.fsjQty}}</td>
                  <td width="100px">{{leftItem.fgzb_lbname}}</td>
                  <td width="100px">{{leftItem.fgzb_cz_wk}}</td>
                  <td width="100px">{{leftItem.fgzb_hou}}</td>
                  <td width="100px">{{leftItem.fgzb_chang}}</td>
                  <td width="100px">{{leftItem.fgzb_kuang}}</td>
                  <td width="100px">{{leftItem.fgzb_bz}}</td>
                  <td width="100px">{{leftItem.Fcz_unit}}</td>
                  <td width="100px">{{leftItem.Fcz_yongl}}</td>
                  <td width="100px">{{leftItem.fgzb_zhongl}}</td>
                  <td style="min-width:30px">{{leftItem.fgzb_A01}}</td>
                  <td width="100px">{{leftItem.fgzb_A02}}</td>
                  <td width="100px">{{leftItem.fgzb_A03}}</td>
                  <td width="100px">{{leftItem.fgzb_A04}}</td>
                  <td width="100px">{{leftItem.fgzb_A05}}</td>
                  <td width="100px">{{leftItem.fgzb_A06}}</td>
                  <td width="100px">{{leftItem.fgzb_A07}}</td>
                  <td width="100px">{{leftItem.fgzb_A08}}</td>
                  <td width="100px">{{leftItem.fgzb_A09}}</td>
                  <td width="100px">{{leftItem.fgzb_A010}}</td>
                  <!-- <td width="100px">{{leftItem.fgzb_A011}}</td>
                  <td width="100px">{{leftItem.fgzb_A012}}</td> -->
                  <td width="100px">{{leftItem.Fptmj}}</td>
                  <td style="min-width:80px">{{leftItem.Fbeizhu}}</td>
                </tr>
              </tbody>
            </table>
          </td>
          <!-- right -->
          <td style="padding: 0px;" valign="top">
            <table width="100%" class="NoLeftBorder NoTopBorder">
              <thead>
                <tr>
                  <th style="min-width:80px">工作内容</th>
                  <th width="80px" style="min-width:40px">主要负责人</th>
                  <!-- <th width="50px" style="min-width:40px">次要负责人</th> -->
                  <th width="50px" style="min-width:40px">计划完成日期</th>
                  <th width="50px" style="min-width:40px">实际完成日期</th>
                  <!-- <th style="min-width:30px">进度确认</th> -->
                  <th v-for="(day, idx) in dayList" :key="idx" style="min-width:15px;border-bottom: 1px solid #000;">{{day}}</th>
                  <!-- <th style="min-width:80px">备注</th> -->
                </tr>
              </thead>
              <!-- dataList -->
              <tbody>
                <tr v-for="(rightItem, idx) in gongXuList" :key="idx">
                  <td width="80px" style="min-width:50px" :title="rightItem.jobContent" :class="{'colorBlue': rightItem.colorType == 1, 'colorGreen': rightItem.colorType == 2, 'colorRed': rightItem.colorType == 3, 'NoWrap': true}">{{rightItem.gongzuo}}</td>
                  <td width="80px" style="min-width:40px">{{rightItem.zhiyuan}}</td>
                  <td width="50px" style="min-width:40px">{{rightItem.finishedDate_yq ? rightItem.finishedDate_yq : ''}}</td>
                  <td width="50px" style="min-width:40px">{{rightItem.finishedDate_sj ? rightItem.finishedDate_sj : ''}}</td>
                  <!-- <td style="min-width:30px">{{rightItem.ifChecked ? '是' : '否'}}</td> -->
                  <td v-for="(day, idx) in rightItem.list" :key="idx" style="min-width:15px" :class="{'bgBlue': day.ifIn && day.colorType == 1, 'bgGreen': day.ifIn && day.colorType == 2, 'bgRed': day.ifIn && day.colorType == 3}">{{day.day}}</td>
                  <!-- <td style="min-width:80px">beizhu</td> -->
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Vue from 'vue'
import Print from '../plugs/print'
import {secondToFormat} from '../util/utils'
Vue.use(Print)
// import { mapState, mapActions } from 'vuex'
export default {
  name: 'Detail',
  props: ['TitleInfo'],
  data () {
    return {
      dateStart: '',
      dateEnd: '',
      dayList: [],
      lingJianList: [],
      gongXuList: []
    }
  },
  computed: {
  },
  watch: {
    'TitleInfo.FID': function () {
      this.getDetail()
    }
  },
  created () {
    this.TitleInfo.FDateStr = secondToFormat(this.TitleInfo.FDate.time)
    this.TitleInfo.FDate3Str = secondToFormat(this.TitleInfo.FDate3.time)
    // 获取详情
    this.getDetail()
  },
  methods: {
    doPrintJB () {
      var bdhtml = window.document.body.innerHTML
      var printhtml = window.document.getElementById('table').innerHTML
      window.document.body.innerHTML = printhtml
      window.print()
      window.document.body.innerHTML = bdhtml
      return false
    },
    Print () {
      this.$print(this.$refs.print)
    },
    getDetail () {
      this.Http.get('orderdetailList', {fid: this.TitleInfo.FID, wlname: this.TitleInfo.wlname}
      ).then(res => {
        switch (res.data.code) {
          case 1:
            // 补足左边
            if (res.data.lingjianlist.length < res.data.gongxulist.length) {
              const cha = res.data.gongxulist.length - res.data.lingjianlist.length
              for (let i = 0; i < cha; i++) {
                res.data.lingjianlist.push({
                  F0: 0,
                  F1: 0,
                  F2: 0,
                  F3: 0,
                  F4: 0,
                  F5: 0,
                  F6: 0,
                  F7: 0,
                  F8: 0,
                  F_zzj: 0,
                  Fnumber: '',
                  Fname: '',
                  Fcz_dm: '',
                  Fpinming: '',
                  Fmodel: '',
                  fdtQty: '',
                  fxdQty: '',
                  fsjQty: '',
                  fgzb_lbname: '',
                  fgzb_cz_wk: '',
                  fgzb_hou: '',
                  fgzb_chang: '',
                  fgzb_kuang: '',
                  fgzb_bz: '',
                  Fcz_unit: '',
                  Fcz_yongl: '',
                  fgzb_zhongl: '',
                  fgzb_A01: '',
                  fgzb_A02: '',
                  fgzb_A03: '',
                  fgzb_A04: '',
                  fgzb_A05: '',
                  fgzb_A06: '',
                  fgzb_A07: '',
                  fgzb_A08: '',
                  fgzb_A09: '',
                  fgzb_A010: '',
                  fgzb_A011: '',
                  fgzb_A012: '',
                  Fptmj: '',
                  Fbeizhu: ''
                })
              }
            }
            //
            this.lingJianList = res.data.lingjianlist
            this.gongXuList = res.data.gongxulist
            // 项目总的day list
            let tempArray = {}
            if (res.data.gongxulist[0].FDate && res.data.gongxulist[0].FDate3) {
              tempArray = this.getAllDayString(secondToFormat(res.data.gongxulist[0].FDate.time), secondToFormat(res.data.gongxulist[0].FDate3.time))
              this.dayList = tempArray.dayArray
              // 右侧日期渲染
              res.data.gongxulist.map(item => {
                item.list = []
                if (item.FDate1) {
                  item.finishedDate_yq = secondToFormat(item.FDate1.time)
                  // 每行的开始结束day list
                  const dateArrayItem = this.getAllDayString(secondToFormat(item.FDate.time), secondToFormat(item.FDate1.time)).dateArray
                  tempArray.dateArray.map((itemW, idx) => {
                    if (dateArrayItem.indexOf(itemW) !== -1) {
                      item.list.push({ifIn: true, day: itemW.substring(8, 10)})
                    } else {
                      item.list.push({ifIn: false, day: itemW.substring(8, 10)})
                    }
                    // 颜色判断
                    if (item.FDate2) {
                      item.finishedDate_sj = secondToFormat(item.FDate2.time)
                      if (item.FDate2.time > item.FDate1.time) {
                        // 延期
                        item.list[idx].colorType = 3
                        item.colorType = 3
                      } else {
                        // 完成
                        item.list[idx].colorType = 2
                        item.colorType = 2
                      }
                    } else {
                      // 预计
                      item.list[idx].colorType = 1
                      item.colorType = 1
                    }
                  })
                } else {
                  tempArray.dateArray.map((itemW, idx) => {
                    item.list.push({ifIn: false, day: ''})
                  })
                }
              })
            } else {
              // 清空之前数据
              this.dayList = []
            }
            // -----------------------------------------------
            // 有fdate1
            // if (res.data.gongxulist[0].FDate1) {
            //   // 每个的日期
            //   res.data.gongxulist.map(item => {
            //     item.finishedDate_yq = secondToFormat(res.data.gongxulist[0].FDate1.time)
            //     item.list = []
            //     const dateArrayItem = this.getAllDayString(secondToFormat(res.data.gongxulist[0].FDate.time), secondToFormat(res.data.gongxulist[0].FDate1.time)).dateArray
            //     tempArray.dateArray.map((itemW, idx) => {
            //       if (dateArrayItem.indexOf(itemW) !== -1) {
            //         item.list.push({ifIn: true, day: itemW.substring(8, 10)})
            //       } else {
            //         item.list.push({ifIn: false, day: itemW.substring(8, 10)})
            //       }
            //     })
            //     // 判断颜色
            //     res.data.gongxulist[0].FDate2
            //   })
            // }
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
    getAllDayString (begin, end) {
      /* eslint no-extend-native: ["error", { "exceptions": ["Date"] }] */
      Date.prototype.format = function () {
        var s = ''
        var mouth = (this.getMonth() + 1) >= 10 ? (this.getMonth() + 1) : ('0' + (this.getMonth() + 1))
        var day = this.getDate() >= 10 ? this.getDate() : ('0' + this.getDate())
        s += this.getFullYear() + '-' // 获取年份
        s += mouth + '-' // 获取月份
        s += day // 获取日
        return (s) // 返回日期
      }
      var arr = []
      var dayArray = []
      var ab = begin.split('-')
      var ae = end.split('-')
      var db = new Date()
      db.setUTCFullYear(ab[0], ab[1] - 1, ab[2])
      var de = new Date()
      de.setUTCFullYear(ae[0], ae[1] - 1, ae[2])
      var unixDb = db.getTime() - 24 * 60 * 60 * 1000
      var unixDe = de.getTime() - 24 * 60 * 60 * 1000
      for (var k = unixDb; k <= unixDe;) {
        k = k + 24 * 60 * 60 * 1000
        arr.push((new Date(parseInt(k))).format())
        dayArray.push((new Date(parseInt(k))).getDate())
      }
      return {dateArray: arr, dayArray: dayArray}
    }
  }
}
</script>

<style lang="less" scoped>
@Padding: 24px;
.Detail{
  width: 100%;
  height: 90vh;
  /*
  width: 1000px;
  width: calc(100% - 2*@Padding);
  overflow-x: scroll;
  margin-top: @Padding;
  padding: 0 @Padding;
  */
  overflow-x: scroll;
  background: #fff;
}
th{
  padding:1px;
  height: 20px;
  border-right: 1px solid #999;
  font-weight: normal !important;
  white-space:nowrap;
}
td{
  height: 25px;
  border:0px solid #999;
  border-top: 1px solid #999;
  border-right: 1px solid #999;
  font-weight: normal !important;
  white-space:nowrap;
}
table{
  padding:0;
  min-height: 25px;
  line-height: 25px;
  border-collapse: collapse;
  border:1px solid #999;
}
</style>
