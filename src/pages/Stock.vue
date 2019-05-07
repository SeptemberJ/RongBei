<template>
  <div class="Stock">
    <el-row>
      <el-col :span="24" class="TextAlignL MarginB_20">
        <h2 style="color: #666;">安全库存</h2>
      </el-col>
      <el-col :span="24" class="MarginB_10">
        <el-form ref="conditionForm" :model="conditionForm" label-position="left" label-width="80px">
          <el-row>
            <el-col :span="6">
              <el-form-item label="年份">
                <el-date-picker style="width: 100%;"
                  v-model="conditionForm.year"
                  type="year"
                  placeholder="选择年份">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="1">
              <el-form-item label="开始月份">
                <el-select v-model="conditionForm.begin_month" placeholder="请选择开始月份">
                  <el-option
                    v-for="item in 12"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="1">
              <el-form-item label="结束月份">
                <el-select v-model="conditionForm.end_month" placeholder="请选择结束月份">
                  <el-option
                    v-for="item in 12"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4" class="TextAlignR">
              <el-button type="primary" @click="search">查询</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
      <el-col :span="24" style="width: 100%;height: 10px; border-bottom: 1px dashed #ccc;">
      </el-col>
      <el-col :span="24" class="MarginT_20">
        <el-table
          :data="stockList"
          v-loading="listLoading"
          style="width: 100%">
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            property="FNumber"
            label="物料代码"
            width="120">
          </el-table-column>
          <el-table-column
            property="FName"
            label="物料名称">
          </el-table-column>
          <el-table-column
            property="fmodel"
            label="规格型号">
          </el-table-column>
          <el-table-column
            property="funit"
            label="单位"
            width="50">
          </el-table-column>
          <!-- month -->
          <el-table-column v-if="monthShowArray[1]"
            property="1"
            label="1月"
            width="60">
          </el-table-column>
          <el-table-column v-if="monthShowArray[2]"
            property="2"
            label="2月"
            width="60">
          </el-table-column>
          <el-table-column v-if="monthShowArray[3]"
            property="3"
            label="3月"
            width="60">
          </el-table-column>
          <el-table-column v-if="monthShowArray[4]"
            property="4"
            label="4月"
            width="60">
          </el-table-column>
          <el-table-column v-if="monthShowArray[5]"
            property="5"
            label="5月"
            width="60">
          </el-table-column>
          <el-table-column v-if="monthShowArray[6]"
            property="6"
            label="6月"
            width="60">
          </el-table-column>
          <el-table-column v-if="monthShowArray[7]"
            property="7"
            label="7月"
            width="60">
          </el-table-column>
          <el-table-column v-if="monthShowArray[8]"
            property="8"
            label="8月"
            width="60">
          </el-table-column>
          <el-table-column v-if="monthShowArray[9]"
            property="9"
            label="9月"
            width="60">
          </el-table-column>
          <el-table-column v-if="monthShowArray[10]"
            property="10"
            label="10月"
            width="60">
          </el-table-column>
          <el-table-column v-if="monthShowArray[11]"
            property="11"
            label="11月"
            width="60">
          </el-table-column>
          <el-table-column v-if="monthShowArray[12]"
            property="12"
            label="12月"
            width="60">
          </el-table-column>
          <!-- month -->
          <el-table-column
            property="fqty"
            label="现有库存"
            width="100">
          </el-table-column>
          <el-table-column
            property="FSecInv"
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
      <el-col :span="24" class="TextAlignR MarginT_20" v-if="stockList.length > 1">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="curPage"
          :page-size="15"
          layout="prev, pager, next, jumper"
          :total="sum">
        </el-pagination>
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
      listLoading: false,
      stockList: [],
      monthShowArray: {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false,
        11: false,
        12: false
      },
      dialogTableVisible: false,
      detailInfo: {},
      conditionForm: {
        year: '',
        begin_month: '',
        end_month: ''
      },
      propertyArray: [],
      curPage: 1,
      sum: 0
    }
  },
  computed: {
  },
  components: {
  },
  created () {
  },
  methods: {
    sureFilter3 () {
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
    },
    search () {
      this.curPage = 1
      this.sureFilter()
    },
    sureFilter () {
      if (!this.conditionForm.year || !this.conditionForm.begin_month || !this.conditionForm.end_month) {
        this.$message({
          message: '请将筛选条件选择完整!',
          type: 'warning'
        })
        return false
      }
      if (this.conditionForm.begin_month > this.conditionForm.end_month) {
        this.$message({
          message: '结束月份不能早于开始月份!',
          type: 'warning'
        })
        return false
      }
      this.monthShowArray = {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false,
        11: false,
        12: false
      }
      let monthString = ''
      let monthStringArray = ''
      let property = []
      let monthCount = this.conditionForm.end_month - this.conditionForm.begin_month + 1
      for (let i = 0; i < monthCount; i++) {
        monthString = monthString + ',' + (this.conditionForm.begin_month + i)
        monthStringArray = monthStringArray + ',[' + (this.conditionForm.begin_month + i) + ']'
        property.push(this.conditionForm.begin_month + i)
        this.monthShowArray[this.conditionForm.begin_month + i] = true
      }
      this.getStockList(monthString.substr(1), monthStringArray.substr(1), property)
    },
    getStockList (Month1String, MonthString, property) {
      this.listLoading = true
      this.propertyArray = property
      this.Http.get('monthStockList', {year: (this.conditionForm.year).getFullYear(), month: MonthString, month1: Month1String, number: 15, page_num: this.curPage}
      ).then(res => {
        switch (res.data.code) {
          case 1:
            this.stockList = res.data.itemstocklist.map((item, idx) => {
              item.FName = item.month.FName
              item.fmodel = item.month.fmodel
              item.funit = item.month.funit
              item.fqty = item.month.fqty
              item.FSecInv = item.month.FSecInv
              item.FNumber = item.month.FNumber
              item.duanque = item.month.fqty - item.month.FSecInv
              property.map((pro) => {
                item[pro] = item[pro] ? item[pro] : ''
              })
              return item
            })
            this.listLoading = false
            this.sum = res.data.stockCount
            break
          default:
            this.$message({
              message: res.data.message + '!',
              type: 'error'
            })
            this.listLoading = false
        }
      }).catch((error) => {
        console.log(error)
        this.listLoading = false
      })
    },
    handleCurrentChange () {
      this.sureFilter()
    }
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
