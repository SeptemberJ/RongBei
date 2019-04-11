<template>
  <div class="Stock">
    <el-row>
      <el-col :span="24" class="MarginB_10">
        <el-form ref="conditionForm" :model="conditionForm" label-width="80px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="开始日期">
                <el-date-picker style="width: 100%;"
                  v-model="conditionForm.begin_date"
                  type="month"
                  placeholder="选择开始日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="截止日期">
                <el-date-picker style="width: 100%;"
                  v-model="conditionForm.end_date"
                  type="month"
                  placeholder="选择截止日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
      <el-col :span="24" class="MarginB_20">
        <el-button type="primary" @click="sureFilter">确定筛选</el-button>
      </el-col>
      <el-col :span="24" style="width: 100%;height: 10px; border-bottom: 1px dashed #ccc;">
      </el-col>
      <el-col :span="24" class="MarginT_20">
        <el-table
          :data="orderList"
          style="width: 100%">
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            property="wldm"
            label="物料代码"
            width="90">
          </el-table-column>
          <el-table-column
            property="wlmc"
            label="物料名称">
          </el-table-column>
          <el-table-column
            property="ggxh"
            label="规格型号">
          </el-table-column>
          <el-table-column
            property="danwei"
            label="单位"
            width="50">
          </el-table-column>
          <!-- month -->
          <el-table-column
            property="xykc"
            label="现有库存"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            property="aqkc"
            label="安全库存"
            width="100">
          </el-table-column>
          <el-table-column
            property="duanque"
            label="短缺"
            width="120">
          </el-table-column>
          <!-- <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handleEdit(scope.$index, scope.row)">查看</el-button>
            </template>
          </el-table-column> -->
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import { mapState, mapActions } from 'vuex'
// import {dateToFormat} from '../util/utils'
export default {
  name: 'Stock',
  data () {
    return {
      orderList: [
        {
          wldm: 'DM19287',
          wlmc: '商品一',
          ggxh: '15*300*500',
          danwei: '件',
          xykc: '1200',
          aqkc: '890',
          duanque: '12'
        }
      ],
      dialogTableVisible: false,
      detailInfo: {},
      conditionForm: {
        begin_date: '',
        end_date: ''
      }
    }
  },
  computed: {
  },
  components: {
  },
  created () {
  },
  methods: {
    sureFilter () {
      if (!this.conditionForm.begin_date || !this.conditionForm.end_date) {
        this.$message({
          message: '请选择开始和截止日期!',
          type: 'warning'
        })
        return false
      }
      var startYear = (this.conditionForm.begin_date).getFullYear() + 1 // 起始年份
      var endYear = (this.conditionForm.end_date).getFullYear() + 1 // 截止年份
      var startMonth = (this.conditionForm.begin_date).getMonth() + 1 // 起始月份
      var endMonth = (this.conditionForm.end_date).getMonth() + 1 // 截止月份
      var temp = [] // 月份list
      if (this.conditionForm.begin_date > this.conditionForm.end_date) {
        this.$message({
          message: '截止日期不能早于开始日期!',
          type: 'warning'
        })
        return false
      }
      // 跨年
      if (startYear !== endYear) {
        if (endMonth >= startMonth) {
          this.$message({
            message: '间隔不能超过一年!',
            type: 'warning'
          })
          return false
        } else {
          let preMonth = []
          let nextMonth = []
          for (let i = startMonth; i <= 12; i++) {
            preMonth.push(i)
          }
          for (let i = 1; i <= endMonth; i++) {
            nextMonth.push(i)
          }
          console.log('preMonth', preMonth)
          console.log('nextMonth', nextMonth)
          console.log(preMonth.concat(nextMonth))
        }
      }
      // 不跨年
      if (startYear === endYear) {
        for (let i = 0; i <= endMonth - startMonth; i++) {
          temp.push(startMonth + i)
        }
        console.log('temp', temp)
      }
    },
    sureFilter2 () {
      var startYear = (this.conditionForm.begin_date).getFullYear() + 1 // 起始年份
      var endYear = (this.conditionForm.end_date).getFullYear() + 1 // 截止年份
      var startMonth = (this.conditionForm.begin_date).getMonth() + 1 // 起始月份
      var endMonth = (this.conditionForm.end_date).getMonth() + 1 // 截止月份
      var jiange = (this.conditionForm.end_date - this.conditionForm.begin_date) / 1000 / 86400 + 1 // 间隔天数
      var temp = [] // 月份list
      if (this.conditionForm.begin_date > this.conditionForm.end_date) {
        this.$message({
          message: '截止日期不能早于开始日期!',
          type: 'warning'
        })
        return false
      }
      if (jiange > 366) {
        this.$message({
          message: '间隔不能超过一年!',
          type: 'warning'
        })
        return false
      }
      if (startYear !== endYear) {
        // 跨年
        let preMonth = []
        let nextMonth = []
        for (let i = startMonth; i <= 12; i++) {
          preMonth.push(i)
        }
        for (let i = 1; i <= endMonth; i++) {
          nextMonth.push(i)
        }
        setTimeout(() => {
          console.log('preMonth', preMonth)
          console.log('nextMonth', nextMonth)
          console.log(preMonth.concat(nextMonth))
        }, 2000)
      }
      if (startYear === endYear) {
        // 不跨年
        for (let i = 0; i <= endMonth - startMonth; i++) {
          temp.push(startMonth + i)
        }
        setTimeout(() => {
          console.log('temp', temp)
        }, 2000)
      }
      // if (startMonth < endMonth) {
      //   let preMonth = []
      //   let nextMonth = []
      //   // 跨年
      //   for (let i = startMonth; i <= 12; i++) {
      //     preMonth.push(i)
      //   }
      //   for (let i = 1; i <= endMonth; i++) {
      //     nextMonth.push(i)
      //   }
      //   temp.concat(preMonth, nextMonth)
      //   console.log(temp)
      // } else {
      //   // 不跨年
      //   for (let i = 1; i <= startMonth - endMonth; i++) {
      //     temp.push(i)
      //   }
      //   setTimeout(() => {
      //     console.log('temp', temp)
      //   }, 2000)
      // }
    }
    // getOrderList () {
    //   let DATA = {}
    //   if (this.conditionForm.fbillno) {
    //     DATA.fbillno = this.conditionForm.fbillno
    //   }
    //   if (this.conditionForm.khname) {
    //     DATA.khname = this.conditionForm.khname
    //   }
    //   if (this.conditionForm.wlname) {
    //     DATA.wlname = this.conditionForm.wlname
    //   }
    //   if (this.conditionForm.fmodel) {
    //     DATA.fmodel = this.conditionForm.fmodel
    //   }
    //   if (this.conditionForm.begin_date) {
    //     if (!this.conditionForm.end_date) {
    //       this.$message({
    //         message: '请选择截止日期!',
    //         type: 'warning'
    //       })
    //       return false
    //     }
    //     DATA.begin_date = dateToFormat(this.conditionForm.begin_date)
    //   }
    //   if (this.conditionForm.end_date) {
    //     DATA.end_date = dateToFormat(this.conditionForm.end_date)
    //   }
    //   this.Http.get('orderList', DATA
    //   ).then(res => {
    //     switch (res.data.code) {
    //       case 1:
    //         this.orderList = res.data.orderlist
    //         break
    //       default:
    //         this.$message({
    //           message: res.data.message + '!',
    //           type: 'error'
    //         })
    //     }
    //   }).catch((error) => {
    //     console.log(error)
    //   })
    // }
  }
}
</script>

<style lang="less" scoped>
@Padding: 24px;
.Stock{
  width: calc(100% - 2*@Padding);
  background: #fff;
  padding: @Padding;
  margin-top: @Padding;
}
</style>
