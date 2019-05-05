<template>
  <div class="OrderList">
    <el-row>
      <el-col :span="24" class="MarginB_10">
        <el-form ref="conditionForm" :model="conditionForm" label-width="80px">
          <el-row>
            <!-- <el-col :span="6">
              <el-form-item label="任务单号">
                <el-input v-model="conditionForm.fbillno" clearable placeholder="请输入任务单号"></el-input>
              </el-form-item>
            </el-col> -->
            <el-col :span="8">
              <el-form-item label="计划号">
                <el-input v-model="conditionForm.FText" clearable placeholder="请输入计划号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开始日期">
                <el-date-picker style="width: 100%;"
                  v-model="conditionForm.begin_date"
                  type="date"
                  placeholder="选择开始日日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="截止日期">
                <el-date-picker style="width: 100%;"
                  v-model="conditionForm.end_date"
                  type="date"
                  placeholder="选择截止日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="物品名称">
                <el-input v-model="conditionForm.wlname" clearable  placeholder="请输入物品名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="客户">
                <el-input v-model="conditionForm.khname" clearable  placeholder="请输入客户"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="规格">
                <el-input v-model="conditionForm.fmodel" clearable  placeholder="请输入规格"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
      <el-col :span="24" class="MarginB_20">
        <el-button type="primary" @click="getOrderList">查询</el-button>
        <el-button type="default" @click="reset">清空</el-button>
      </el-col>
      <el-col :span="24" style="width: 100%;height: 10px; border-bottom: 1px dashed #ccc;">
      </el-col>
      <el-col :span="24" class="MarginT_20">
        <el-table
          :data="orderList"
          style="width: 100%">
          <el-table-column
            type="index"
            width="40">
          </el-table-column>
          <el-table-column
            property="wcstatusTxt"
            label="状态"
            width="50">
          </el-table-column>
          <el-table-column
            property="FBillNo"
            label="任务单号">
          </el-table-column>
          <!-- <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handleEdit(scope.$index, scope.row)">查看</el-button>
            </template>
          </el-table-column> -->
          <el-table-column
            property="FName"
            label="客户">
          </el-table-column>
          <el-table-column
            property="fqty"
            label="数量"
            width="50">
          </el-table-column>
          <el-table-column
            property="danwei"
            label="单位"
            width="50">
          </el-table-column>
          <el-table-column
            property="wlname"
            label="产品名称"
            width="80">
            <!-- show-overflow-tooltip -->
          </el-table-column>
          <el-table-column
            property="FText"
            label="计划号"
            width="80">
          </el-table-column>
          <el-table-column
            property="FNOTE"
            label="合同号"
            width="70">
          </el-table-column>
          <el-table-column
            property="fmodel"
            label="型号"
            width="90">
          </el-table-column>
          <el-table-column
            property="fdate3Txt"
            label="交货期"
            width="90">
          </el-table-column>
          <el-table-column
            property="wcgongxu"
            label="进度"
            width="60">
          </el-table-column>
          <el-table-column
            property="yuqidays"
            label="延期天数"
            width="60">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handleEdit(scope.$index, scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-dialog title="详情" :visible.sync="dialogTableVisible" fullscreen class="detailDialog">
      <Detail :TitleInfo="detailInfo"/>
    </el-dialog>
  </div>
</template>

<script>
import Detail from '../components/Detail.vue'
// import { mapState, mapActions } from 'vuex'
import {dateToFormat, secondToFormat} from '../util/utils'
export default {
  name: 'OrderList',
  data () {
    return {
      orderList: [],
      dialogTableVisible: false,
      detailInfo: {},
      conditionForm: {
        // fbillno: '',
        FText: '',
        khname: '',
        wlname: '',
        fmodel: '',
        begin_date: '',
        end_date: ''
      }
    }
  },
  computed: {
  },
  components: {
    Detail
  },
  created () {
    this.getOrderList()
  },
  methods: {
    reset () {
      this.conditionForm = {
        fbillno: '',
        khname: '',
        wlname: '',
        fmodel: '',
        begin_date: '',
        end_date: ''
      }
      this.getOrderList()
    },
    getOrderList () {
      let DATA = {}
      // if (this.conditionForm.fbillno) {
      //   DATA.fbillno = this.conditionForm.fbillno
      // }FText
      if (this.conditionForm.FText) {
        DATA.FText = this.conditionForm.FText
      }
      if (this.conditionForm.khname) {
        DATA.khname = this.conditionForm.khname
      }
      if (this.conditionForm.wlname) {
        DATA.wlname = this.conditionForm.wlname
      }
      if (this.conditionForm.fmodel) {
        DATA.fmodel = this.conditionForm.fmodel
      }
      if (this.conditionForm.begin_date) {
        if (!this.conditionForm.end_date) {
          this.$message({
            message: '请选择截止日期!',
            type: 'warning'
          })
          return false
        }
        DATA.begin_date = dateToFormat(this.conditionForm.begin_date)
      }
      if (this.conditionForm.end_date) {
        DATA.end_date = dateToFormat(this.conditionForm.end_date)
      }
      this.Http.get('orderList', DATA
      ).then(res => {
        switch (res.data.code) {
          case 1:
            this.orderList = res.data.orderlist.map((item) => {
              item.wcstatusTxt = item.wcstatus === 0 ? '正常订单' : (item.wcstatus === 1 ? '已经完成' : '延期')
              item.fdate3Txt = secondToFormat(item.FDate3.time)
              return item
            })
            console.log(this.orderList)
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
    handleEdit (idx, row) {
      console.log(row)
      this.dialogTableVisible = true
      this.detailInfo = row
    },
    handleDelete () {
    }
  }
}
</script>

<style lang="less" scoped>
@Padding: 24px;
.OrderList{
  width: calc(100% - 2*@Padding);
  background: #fff;
  padding: @Padding;
  margin-top: @Padding;
}
</style>
