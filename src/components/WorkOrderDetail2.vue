<template>
  <div class="WorkOrderDetail">
    <table border="0" id="table" style="width: 100%;" ref="print">
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
    getWorkOrderDetail () {
      this.Detiallist = []
      this.Http.get('sckgorderDetailList', {finterid: this.OrderId}
      ).then(res => {
        switch (res.data.code) {
          case 1:
            let temp = res.data.orderDetiallist
            temp.map((item) => {
              if (item.orders && item.orders.length > 0 && item.qls < 0) {
                item.orders.map((items, idx) => {
                  items.fnumber = item.fnumber && idx === 0 ? item.fnumber : '' // 物料代码
                  items.FName = item.FName && idx === 0 ? item.FName : '' // 物料名称
                  items.fmodel = item.fmodel && idx === 0 ? item.fmodel : '' // 规格
                  items.FQty = item.FQty && idx === 0 ? item.FQty : '' // 库存
                  items.fauxqtymust = item.fauxqtymust && idx === 0 ? item.fauxqtymust : '' // 计划投料数
                  items.qls = item.qls && idx === 0 ? item.qls : '' // 缺料数
                  items.jsfqty = item.jsfqty && idx === 0 ? item.jsfqty : '' // 即时库存
                  items.yifenpeikucun = item.yifenpeikucun && idx === 0 && item.qls < 0 ? item.yifenpeikucun : '' // 已分配库存
                  items.fdateTxt = secondToFormat(items.fdate.time)
                  this.Detiallist.push(items)
                })
              } else {
                this.Detiallist.push(
                  {
                    fnumber: item.fnumber,
                    FName: item.FName,
                    fmodel: item.fmodel,
                    FQty: item.FQty,
                    fauxqtymust: item.fauxqtymust,
                    qls: item.qls

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
.WorkOrderDetail{
  height: 400px;
  overflow-y: scroll;
}
**/
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