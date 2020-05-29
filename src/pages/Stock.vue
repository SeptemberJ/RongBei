<template>
  <div class="Stock">
    <el-row>
      <el-col :span="24" class="TextAlignL">
        <h2 style="color: #666;">安全库存</h2>
      </el-col>
      <el-col :span="24">
        <el-form ref="conditionForm" :model="conditionForm" label-position="left" label-width="70px">
          <el-row>
            <el-col :span="4">
              <el-form-item label="年份">
                <el-date-picker style="width: 100%;"
                  v-model="conditionForm.year"
                  size="mini"
                  type="year"
                  placeholder="请选择">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="4" :offset="1">
              <el-form-item label="开始月份">
                <el-select v-model="conditionForm.begin_month" placeholder="请选择" size="mini">
                  <el-option
                    v-for="item in 12"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4" :offset="1">
              <el-form-item label="结束月份">
                <el-select v-model="conditionForm.end_month" placeholder="请选择" size="mini">
                  <el-option
                    v-for="item in 12"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4" :offset="1">
              <el-form-item label="短缺">
                <el-select v-model="conditionForm.fshort" placeholder="请选择" size="mini">
                  <el-option
                    v-for="item in shortCondition"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4" class="TextAlignR" style="margin-top: 7px;">
              <el-button size="mini" type="primary" @click="search">查询</el-button>
              <el-button size="mini" type="success" @click="exportExcel">导出</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
      <el-col :span="24" style="width: 100%;height: 4px; border-bottom: 1px dashed #ccc;">
      </el-col>
      <el-col :span="24" class="MarginT_20">
        <el-table id="out-table"
          :data="stockList"
          v-loading="listLoading"
          style="width: 100%">
          <!-- @selection-change="handleSelectionChange" -->
          <!-- <el-table-column
            type="selection"
            width="55">
          </el-table-column> -->
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            property="fnumber"
            label="物料代码"
            width="150"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            property="fname"
            label="物料名称"
            width="150"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            property="fmodelAfter"
            label="规格型号"
            width="150"
            show-overflow-tooltip>
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
            width="130">
          </el-table-column>
          <el-table-column v-if="monthShowArray[2]"
            property="2"
            label="2月"
            width="130">
          </el-table-column>
          <el-table-column v-if="monthShowArray[3]"
            property="3"
            label="3月"
            width="130">
          </el-table-column>
          <el-table-column v-if="monthShowArray[4]"
            property="4"
            label="4月"
            width="130">
          </el-table-column>
          <el-table-column v-if="monthShowArray[5]"
            property="5"
            label="5月"
            width="130">
          </el-table-column>
          <el-table-column v-if="monthShowArray[6]"
            property="6"
            label="6月"
            width="130">
          </el-table-column>
          <el-table-column v-if="monthShowArray[7]"
            property="7"
            label="7月"
            width="130">
          </el-table-column>
          <el-table-column v-if="monthShowArray[8]"
            property="8"
            label="8月"
            width="130">
          </el-table-column>
          <el-table-column v-if="monthShowArray[9]"
            property="9"
            label="9月"
            width="130">
          </el-table-column>
          <el-table-column v-if="monthShowArray[10]"
            property="10"
            label="10月"
            width="130">
          </el-table-column>
          <el-table-column v-if="monthShowArray[11]"
            property="11"
            label="11月"
            width="130">
          </el-table-column>
          <el-table-column v-if="monthShowArray[12]"
            property="12"
            label="12月"
            width="130">
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
          <el-table-column
            property="zaitu"
            label="在途数量"
            width="120">
          </el-table-column>
          <el-table-column
            property="fbillno"
            label="订单号"
            width="120">
          </el-table-column>
          <el-table-column
            property="FName"
            label="供应商"
            width="300">
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
          :page-size="10"
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
      ifshort: 2,
      shortCondition: [
        {
          label: '全部',
          value: 1
        },
        {
          label: '短缺',
          value: 0
        }
      ],
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
        end_month: '',
        fshort: 1
      },
      propertyArray: [],
      curPage: 1,
      sum: 0,
      // selectedOrder: [] // 需导出的数据
      stockListAll: [], // 导出的全部数据
      ifCanExport: false // 全部导出数据是否加载完成
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
      // 将之前的全部数据和可导出状态初始化
      this.stockListAll = []
      this.ifCanExport = false
      // 初始化12个月份的column显示
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
      // 拼接接口所需的条件字符串
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
      // 获取分页数据
      this.getStockList(monthString.substr(1), monthStringArray.substr(1), property)
      // 获取不分页数据供导出Excel
      this.getAllListNoPage(monthString.substr(1), monthStringArray.substr(1), property)
    },
    getStockList (Month1String, MonthString, property) {
      this.listLoading = true
      this.propertyArray = property
      this.Http.get('monthStockList', {year: (this.conditionForm.year).getFullYear(), month: MonthString, month1: Month1String, number: 10, page_num: this.curPage, fshort: this.conditionForm.fshort}
      ).then(res => {
        switch (res.data.code) {
          case 1:
            res.data.itemstocklist.map((item, idx) => {
              if (item.ztorderlist.length > 0) {
                item.ztorderlist.map((order, idxo) => {
                  if (idxo === 0) {
                    order.fname = item.fname
                    order.fnumber = item.fnumber
                    order.funit = item.funit
                    order.FSecInv = item.FSecInv
                    order.fqty = item.fqty
                    order.fmodelAfter = item.fmodel === '0' ? '' : item.fmodel
                    order.duanque = (item.FSecInv - item.fqty) <= 0 ? 0 : (item.FSecInv - item.fqty)
                    property.map((pro) => {
                      order[pro] = item[pro] ? item[pro] : ''
                    })
                  } else {
                    order.fname = ''
                    order.fnumber = ''
                    order.funit = ''
                    order.FSecInv = ''
                    order.fqty = ''
                    order.fmodelAfter = ''
                    order.duanque = ''
                    property.map((pro) => {
                      order[pro] = ''
                    })
                  }
                  this.stockList.push(order)
                })
              } else {
                item.fmodelAfter = item.fmodel === '0' ? '' : item.fmodel
                item.duanque = (item.FSecInv - item.fqty) <= 0 ? 0 : (item.FSecInv - item.fqty)
                property.map((pro) => {
                  item[pro] = item[pro] ? item[pro] : ''
                })
                this.stockList.push(item)
              }
            })
            // this.stockList = res.data.itemstocklist.map((item, idx) => {
            //   item.FName = item.month.FName
            //   item.fmodel = item.month.fmodel === '0' ? '' : item.month.fmodel
            //   item.funit = item.month.funit
            //   item.fqty = item.month.fqty
            //   item.FSecInv = item.month.FSecInv
            //   item.FNumber = item.month.FNumber
            //   item.duanque = (item.month.fqty - item.month.FSecInv) >= 0 ? 0 : (item.month.fqty - item.month.FSecInv)
            //   property.map((pro) => {
            //     item[pro] = item[pro] ? item[pro] : ''
            //   })
            //   return item
            // })
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
    getAllListNoPage (Month1String, MonthString, property) {
      this.propertyArray = property
      this.Http.get('daochumonthStockList', {year: (this.conditionForm.year).getFullYear(), month: MonthString, month1: Month1String}
      ).then(res => {
        switch (res.data.code) {
          case 1:
            res.data.itemstocklist.map((item, idx) => {
              if (item.ztorderlist.length > 0) {
                item.ztorderlist.map((order, idxo) => {
                  order.fname = item.fname
                  order.fnumber = item.fnumber
                  order.funit = item.funit
                  order.FSecInv = item.FSecInv
                  order.fqty = item.fqty
                  order.fmodelAfter = item.fmodel === '0' ? '' : item.fmodel
                  order.duanque = (item.FSecInv - item.fqty) <= 0 ? 0 : (item.FSecInv - item.fqty)
                  property.map((pro) => {
                    order[pro] = item[pro] ? item[pro] : ''
                  })
                  this.stockListAll.push(order)
                })
              } else {
                item.fmodelAfter = item.fmodel === '0' ? '' : item.fmodel
                item.duanque = (item.FSecInv - item.fqty) <= 0 ? 0 : (item.FSecInv - item.fqty)
                // 若无供应商则默认字段为空显示
                item.zaitu = ''
                item.FName = ''
                item.fbillno = ''
                property.map((pro) => {
                  item[pro] = item[pro] ? item[pro] : ''
                })
                this.stockListAll.push(item)
              }
              return item
            })
            this.ifCanExport = true
            // this.stockListAll = res.data.itemstocklist.map((item, idx) => {
            //   item.FName = item.month.fname
            //   item.fmodel = item.month.fmodel === '0' ? '' : item.month.fmodel
            //   item.funit = item.month.funit
            //   item.fqty = item.month.fqty
            //   item.FSecInv = item.month.FSecInv
            //   item.FNumber = item.month.fnumber
            //   item.duanque = (item.month.FSecInv - item.month.fqty) <= 0 ? 0 : (item.month.FSecInv - item.month.fqty)
            //   property.map((pro) => {
            //     item[pro] = item[pro] ? item[pro] : ''
            //   })
            //   return item
            // })
            // this.ifCanExport = true
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
    handleCurrentChange () {
      this.sureFilter()
    },
    handleSelectionChange (selection) {
      let tempChoosed = []
      selection.map((Order, idx) => {
        let obj = {
          FNumber: Order.FNumber,
          FName: Order.FName,
          fmodel: Order.fmodel,
          funit: Order.funit,
          1: Order[1],
          2: Order[2],
          3: Order[3],
          4: Order[4],
          5: Order[5],
          6: Order[6],
          7: Order[7],
          8: Order[8],
          9: Order[9],
          10: Order[10],
          11: Order[11],
          12: Order[12],
          fqty: Order.fqty,
          FSecInv: Order.FSecInv,
          duanque: Order.duanque
        }
        tempChoosed.push(obj)
      })
      this.selectedOrder = tempChoosed
    },
    // 导出
    exportExcel () {
      // if (this.stockList.length === 0) {
      //   this.$message({
      //     message: '请先查询所需的数据再进行导出！',
      //     type: 'warning'
      //   })
      //   return false
      // }
      if (!this.ifCanExport) {
        this.$message({
          message: '正在加载数据请稍后再次操作！',
          type: 'warning'
        })
        return false
      }
      require.ensure([], () => {
        const { exportJsonToExcel } = require('../vendor/Export2Excel.js')
        const tHeader = ['物料代码', '物料名称', '规格型号', '单位']
        const filterVal = ['fnumber', 'Fname', 'fmodel', 'funit']
        let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        arr.map(pro => {
          if (this.monthShowArray[pro]) {
            tHeader.push(pro + '月')
            filterVal.push(pro)
          }
        })
        const data = this.formatJson(filterVal.concat('fqty', 'FSecInv', 'duanque', 'zaitu', 'fbillno', 'FName'), this.stockListAll)
        exportJsonToExcel(tHeader.concat('现有库存', '安全库存', '短缺', '在途数量', '订单号', '供应商'), data, '安全库存')
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  }
}
</script>

<style lang="less" scoped>
@Padding: 24px;
.Stock{
  width: calc(100% - 2*@Padding);
  background: #fff;
  padding: 0 @Padding @Padding @Padding;
  margin-top: @Padding;
}
</style>
