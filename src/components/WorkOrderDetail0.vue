<template>
  <div class="WorkOrderDetail">
    <el-table
      :data="Detiallist"
      height="100%"
      :row-class-name="tableRowClassName"
      border
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="fnumber"
        label="物料代码"
        width="180">
      </el-table-column>
      <el-table-column
        prop="FName"
        label="物料名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="fmodel"
        label="规格"
        width="180">
      </el-table-column>
      <el-table-column
        prop="danwei"
        label="单位"
        width="80">
      </el-table-column>
      <el-table-column
        prop="fauxqtymust"
        label="计划投料数"
        width="110">
      </el-table-column>
      <el-table-column
        prop="FQty"
        label="可用库存"
        width="110">
      </el-table-column>
      <el-table-column
        prop="qls"
        label="缺料数量"
        width="100">
      </el-table-column>
      <el-table-column
        prop="jsfqty"
        label="即时库存"
        width="110">
      </el-table-column>
      <el-table-column
        prop="yifenpeikucun"
        label="已分配库存"
        width="110">
      </el-table-column>
      <el-table-column
        prop="fbillno"
        label="在途订单号"
        width="120">
      </el-table-column>
      <el-table-column
        prop="fqty"
        label="在途数量"
        width="80">
      </el-table-column>
      <el-table-column
        prop="fdateTxt"
        label="交货日期"
        width="100">
      </el-table-column>
      <el-table-column
        prop="fsupply"
        label="供应商"
        width="180">
      </el-table-column>
      <el-table-column
        prop="fuser"
        label="制单人"
        width="100">
      </el-table-column>
      <el-table-column
        prop="yuqidays"
        label="延期天数"
        width="80">
      </el-table-column>
    </el-table>
    <!-- <table border="0" id="table" style="width: 100%;" ref="print">
      <thead>
        <tr>
          <th>序号</th>
          <th>物料代码</th>
          <th>物料名称</th>
          <th>规格</th>
          <th>计划投料数</th>
          <th>可用库存</th>
          <th>缺料数量</th>
          <th>即时库存</th>
          <th>已分配库存</th>
          <th>在途订单号</th>
          <th>在途数量</th>
          <th>交货日期</th>
          <th>供应商</th>
          <th>制单人</th>
          <th>延期天数</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order, idx) in Detiallist" :key="idx" :class="[order.qls > 0 ? 'bgRed' : '']">
          <td>{{idx + 1}}</td>
          <td>{{order.fnumber}}</td>
          <td>{{order.FName}}</td>
          <td>{{order.fmodel}}</td>
          <td>{{order.fauxqtymust}}</td>
          <td>{{order.FQty}}</td>
          <td>{{order.qls}}</td>
          <td>{{order.jsfqty}}</td>
          <td>{{order.yifenpeikucun}}</td>
          <td>{{order.fbillno}}</td>
          <td>{{order.fqty}}</td>
          <td>{{order.fdateTxt}}</td>
          <td>{{order.fsupply}}</td>
          <td>{{order.fuser}}</td>
          <td>{{order.yuqidays}}</td>
        </tr>
      </tbody>
    </table> -->
  </div>
</template>
<script>
import Vue from 'vue'
import Print from '../plugs/print'
import {secondToFormat} from '../util/utils'
Vue.use(Print)
// import { mapState, mapActions } from 'vuex'
export default {
  name: 'WorkOrderDetail',
  props: ['OrderId'],
  data () {
    return {
      Detiallist: []
    }
  },
  created () {
    this.getWorkOrderDetail()
  },
  watch: {
    OrderId: function () {
      this.getWorkOrderDetail()
    }
  },
  methods: {
    tableRowClassName ({row, rowIndex}) {
      if (row.qls > 0) {
        return 'redDark-row'
      }
      return ''
    },
    getWorkOrderDetail () {
      this.Detiallist = []
      this.Http.get('sckgorderDetailList', {finterid: this.OrderId}
      ).then(res => {
        switch (res.data.code) {
          case 1:
            let temp = res.data.orderDetiallist
            temp.map((item) => {
              if (item.orders && item.orders.length > 0 && item.qls > 0) {
                item.orders.map((items, idx) => {
                  items.fnumber = item.fnumber && idx === 0 ? item.fnumber : '' // 物料代码
                  items.FName = item.FName && idx === 0 ? item.FName : '' // 物料名称
                  items.fmodel = item.fmodel && idx === 0 ? item.fmodel : '' // 规格
                  items.danwei = item.danwei && idx === 0 ? item.danwei : '' // 单位
                  items.FQty = (item.FQty || item.FQty === 0) && idx === 0 ? item.FQty : '' // 库存
                  items.fauxqtymust = (item.fauxqtymust || item.fauxqtymust === 0) && idx === 0 ? item.fauxqtymust : '' // 计划投料数
                  items.qls = (item.qls || item.qls === 0) && idx === 0 ? item.qls : '' // 缺料数
                  items.jsfqty = (item.jsfqty || item.jsfqty === 0) && idx === 0 ? item.jsfqty : '' // 即时库存
                  items.yifenpeikucun = (item.yifenpeikucun || item.yifenpeikucun === 0) && idx === 0 ? item.yifenpeikucun : '' // 已分配库存
                  items.fdateTxt = secondToFormat(items.fdate.time)
                  this.Detiallist.push(items)
                })
              } else {
                this.Detiallist.push(
                  {
                    fnumber: item.fnumber,
                    FName: item.FName,
                    fmodel: item.fmodel,
                    danwei: item.danwei,
                    FQty: item.FQty,
                    fauxqtymust: item.fauxqtymust,
                    qls: item.qls,
                    jsfqty: item.jsfqty,
                    yifenpeikucun: item.yifenpeikucun
                  }
                )
              }
            })
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
    }
  }
}
</script>
<style lang="less" scoped>
/**
.WorkOrderDetail2{
  height: 400px;
  overflow-y: scroll;
}
**/
.WorkOrderDetail{
  height: 100%;
  background: pink;
}
th{
  padding:1px 4px;
  height: 20px;
  border-right: 1px solid #999;
  font-weight: normal !important;
  white-space:nowrap;
}
td{
  padding:1px 4px;
  min-height: 25px;
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
  /**
  position: relative;
  **/
}
/**
tbody{
  width: 100%;
  display: block;
  height: 300px;
  overflow-y:scroll;
  position: absolute;
  top: 0;
  left: 0;
}
**/
</style>
