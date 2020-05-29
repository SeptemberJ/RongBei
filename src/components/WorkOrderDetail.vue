<template>
  <div class="WorkOrderDetail">
    <el-table
      :data="Detiallist"
      height="100%"
      @row-dblclick="editProcess"
      :header-cell-style="{background:'#494e8f',color:'#ffffff'}"
      :row-class-name="tableRowClassName"
      row-key="id"
      border
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="FEntrySelfY0280"
        label="前后道标志"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="fnumber"
        label="物料代码"
        width="180"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="FName"
        label="物料名称"
        width="180"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="fmodel"
        label="规格"
        width="180"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="danwei"
        label="单位"
        width="80">
      </el-table-column>
      <el-table-column
        prop="fauxqtymust"
        label="计划投料数"
        width="140">
      </el-table-column>
      <el-table-column
        prop="FQty"
        label="可用库存"
        width="140">
      </el-table-column>
      <el-table-column
        prop="qls"
        label="缺料数量"
        width="140">
      </el-table-column>
      <el-table-column
        prop="jsfqty"
        label="即时库存"
        width="140">
      </el-table-column>
      <el-table-column
        prop="yifenpeikucun"
        label="已分配库存"
        width="140">
      </el-table-column>
      <el-table-column
        prop="fbillno"
        label="在途订单号"
        width="130">
      </el-table-column>
      <el-table-column
        prop="fqty"
        label="在途数量"
        width="140">
      </el-table-column>
      <el-table-column
        prop="fdateTxt"
        label="交货日期"
        width="100">
      </el-table-column>
      <el-table-column
        prop="fsupply"
        label="供应商"
        width="180"
        show-overflow-tooltip>
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
    <el-dialog
      title="前后道标志修改"
      :visible.sync="dialogVisible"
      append-to-body
      width="300px">
      <el-select v-model="processType">
        <el-option key="前道" label="前道" value="前道"></el-option>
        <el-option key="后道" label="后道" value="后道"></el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureEdit">确 定</el-button>
      </span>
    </el-dialog>
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
  props: ['OrderId', 'timestamp'],
  data () {
    return {
      dialogVisible: false,
      processType: '',
      fitemid: '',
      Detiallist: []
    }
  },
  created () {
    this.getWorkOrderDetail()
  },
  watch: {
    timestamp: function () {
      this.getWorkOrderDetail()
    },
    dialogVisible: function (newVal) {
      if (!newVal) {
        this.processType = ''
        this.fitemid = ''
      }
    }
  },
  methods: {
    tableRowClassName ({row, rowIndex}) {
      if (row.qls > 0) {
        return 'redDark-row'
      }
      return ''
    },
    editProcess (row) {
      this.fitemid = row.FItemID
      this.dialogVisible = true
    },
    sureEdit () {
      this.Http.post('updatefentryselfy?finterid=' + this.OrderId + '&fitemid=' + this.fitemid + '&FEntrySelfY0280=' + this.processType
      ).then(res => {
        switch (res.data.code) {
          case 1:
            this.$message({
              message: '修改成功!',
              type: 'success'
            })
            this.getWorkOrderDetail()
            this.dialogVisible = false
            break
          default:
            this.$message({
              message: '修改失败!',
              type: 'error'
            })
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    getWorkOrderDetail () {
      this.Detiallist = []
      this.Http.get('sckgorderDetailList', {finterid: this.OrderId}
      ).then(res => {
        switch (res.data.code) {
          case 1:
            this.Detiallist = res.data.orderDetiallist.map((item, idx) => {
              // 行首id
              item.id = idx
              if (item.orders && item.orders.length > 0 && item.qls > 0) {
                item.children1 = []
                item.orders.map((items, idxs) => {
                  items.id = idx + '-' + idxs
                  // 重组children与行首字段相同
                  items.fnumber = item.fnumber && idxs === 0 ? item.fnumber : '' // 物料代码
                  items.FName = item.FName && idxs === 0 ? item.FName : '' // 物料名称
                  items.fmodel = item.fmodel && idxs === 0 ? item.fmodel : '' // 规格
                  items.danwei = item.danwei && idxs === 0 ? item.danwei : '' // 单位
                  items.FQty = (item.FQty || item.FQty === 0) && idxs === 0 ? item.FQty : '' // 库存
                  items.fauxqtymust = (item.fauxqtymust || item.fauxqtymust === 0) && idxs === 0 ? item.fauxqtymust : '' // 计划投料数
                  items.qls = (item.qls || item.qls === 0) && idxs === 0 ? item.qls : '' // 缺料数
                  items.jsfqty = (item.jsfqty || item.jsfqty === 0) && idxs === 0 ? item.jsfqty : '' // 即时库存
                  items.fdateTxt = secondToFormat(items.fdate.time)
                  items.yifenpeikucun = (item.yifenpeikucun || item.yifenpeikucun === 0) && idxs === 0 ? item.yifenpeikucun : '' // 已分配库存

                  // 缺料的第一行信息都补充完整
                  if (idxs === 0) {
                    item.fbillno = items.fbillno
                    item.fqty = items.fqty
                    item.fdateTxt = secondToFormat(items.fdate.time)
                    item.fsupply = items.fsupply
                    item.fuser = items.fuser
                    item.yuqidays = items.yuqidays
                  } else {
                    // 添加children
                    item.children1.push(items)
                  }
                })
                // return item
              } else {
                item.fbillno = ''
                item.fqty = ''
                item.fdateTxt = ''
                item.fsupply = ''
                item.fuser = ''
                item.yuqidays = ''
                // return item
              }
              return item
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
    },
    getWorkOrderDetail2 () {
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
