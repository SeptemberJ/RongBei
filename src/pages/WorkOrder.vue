<template>
  <div class="WorkOrder"  v-loading="loadingW">
    <el-row>
      <el-col :span="24" class="TextAlignL">
        <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item><h2 style="display:inline;">生产工单</h2></el-breadcrumb-item>
          <el-breadcrumb-item v-if="warnVisible"><h2 style="display:inline;font-weight:normal;">预警详情</h2></el-breadcrumb-item>
        </el-breadcrumb> -->
        <h2 style="color: #666;">
          <span @click="closePrint" style="cursor: pointer;">生产工单</span>
          <span v-if="warnVisible"> / 预警详情</span>
        </h2>

      </el-col>
      <section v-if="!warnVisible">
        <el-col :span="24">
          <span style="font-size: 14px;color:#606266;margin-right: 20px;">工单号</span>
          <el-input  v-model="searchFbillno" size="mini" style="width: 200px;margin-right: 20px;" clearable></el-input>
          <el-button type="primary" size="mini" @click="getWorkOrderList">查询</el-button>
        </el-col>
        <el-col :span="24" style="width: 100%;height: 4px; border-bottom: 1px dashed #ccc;margin: 20px auto 0 auto;">
        </el-col>
        <el-col :span="24">
          <el-table
            :data="workOrderList"
            @row-dblclick="seeDteail"
            :row-class-name="tableRowClassName"
            v-loading="listLoading"
            style="width: 100%">
            <el-table-column
              type="index"
              width="50">
            </el-table-column>
            <el-table-column
              property="FHeadSelfJ01100_text"
              label="是否锁库"
              width="100">
            </el-table-column>
            <el-table-column
              property="fname"
              label="生产车间"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              property="FCheckDateTxt"
              label="日期"
              width="100">
            </el-table-column>
            <el-table-column
              property="fbillno"
              label="工单号"
              width="130"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              property="fnumber"
              label="产品名称"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              property="fqty"
              label="数量"
              width="80">
            </el-table-column>
            <el-table-column label="交期" width="100">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  style="color:#606266;"
                  @click="changeDate(scope.$index, scope.row)">{{scope.row.FPlanFinishDateTxt}}</el-button>
              </template>
            </el-table-column>
            <el-table-column
              property="fshortTxt"
              label="是否缺料"
              width="80">
            </el-table-column>
            <el-table-column label="操作" width="350" fixed="right">
              <template slot-scope="scope">
                <!-- v-if="scope.row.fshort === 0" -->
                <el-button
                  size="mini"
                  :type="scope.row.fshort === 0 ? 'danger' : ''"
                  :disabled="scope.row.fok == '前道'"
                  @click="notice(scope.$index, scope.row)">前道下达</el-button>
                <el-button
                  size="mini"
                  :type="scope.row.fshort === 0 ? 'danger' : ''"
                  :disabled="scope.row.fok == ''"
                  @click="notice(scope.$index, scope.row)">后道下达</el-button>
                <el-button
                  size="mini"
                  :type="scope.row.yjnum === 0 ? '' : 'danger'"
                  @click="warnDetail(scope.$index, scope.row)">预警</el-button>
                <el-button
                  size="mini"
                  :type="scope.row.fshort === 0 ? 'danger' : ''"
                  :disabled="scope.row.fok == '' || scope.row.FHeadSelfJ01100 == '1'"
                  @click="lock(scope.$index, scope.row)">锁库</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="24" class="TextAlignR MarginT_20"  v-if="workOrderList.length > 1">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="curPage"
            :page-size="15"
            layout="total, prev, pager, next, jumper"
            :total="sum">
          </el-pagination>
        </el-col>
      </section>
      <!-- 预警 -->
      <section  v-if="warnVisible">
        <el-col :span="24">
          <WarnPrint @closePrint="closePrint" :curWarnFShortNumber="curWarnFShortNumber" :timestamp="timestamp"/>
        </el-col>
      </section>
      <section  v-if="!warnVisible">
        <!-- 详情 -->
        <el-dialog id="detailDialog" title="生产工单详情" :visible.sync="dialogTableVisible" fullscreen :close-on-click-modal="false">
          <WorkOrderDetail :OrderId="OrderId" :timestamp="timestamp"/>
        </el-dialog>
        <!-- 修改日期 -->
        <el-dialog title="修改交期" :visible.sync="dialogDateVisible" width="450" :close-on-click-modal="false">
          <el-row>
            <el-col :span="2" class="MarginB_10">日期</el-col>
            <el-col :span="22" class="MarginB_10">
              <el-date-picker
                v-model="jiaoqiDate"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-col>
          </el-row>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogDateVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitModify">确 定</el-button>
          </span>
        </el-dialog>
      </section>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import WorkOrderDetail from '../components/WorkOrderDetail.vue'
import WarnPrint from '../components/WarnPrint.vue'
import {secondToFormat, dateToFormat} from '../util/utils'
export default {
  name: 'WorkOrder',
  data () {
    return {
      loadingW: false,
      dialogTableVisible: false,
      warnVisible: false,
      dialogDateVisible: false,
      listLoading: true,
      workOrderList: [],
      OrderId: null,
      timestamp: '', // 当前时间戳
      curPage: 1,
      sum: 20,
      finterid: '', // 修改日期的finterid
      jiaoqiDate: '',
      searchFbillno: '',
      curWarnFShortNumber: ''
      // formDetail: {
      //   jhtl: 22,
      //   xykc: 12,
      //   qlsl: 33,
      //   ztddh: 44,
      //   ztsl: 55,
      //   jhrq: '2019-04-19'
      // }
    }
  },
  computed: {
    ...mapState({
      userId: state => state.userId,
      userName: state => state.userName
    })
  },
  mounted () {
  },
  components: {
    WorkOrderDetail,
    WarnPrint
  },
  created () {
    this.getWorkOrderList()
  },
  methods: {
    tableRowClassName ({row, rowIndex}) {
      if (row.fshort === 0) {
        return 'red-row'
      }
      return ''
    },
    handleCurrentChange () {
      this.getWorkOrderList()
    },
    seeDteail (row, $event) {
      console.log(row)
      this.OrderId = row.finterid
      this.timestamp = (new Date()).getTime()
      this.dialogTableVisible = true
    },
    getWorkOrderList () {
      this.listLoading = true
      this.Http.get('sckgorderList', {number: 15, page_num: this.curPage, fbillno: this.searchFbillno}
      ).then(res => {
        switch (res.data.code) {
          case 1:
            this.sum = res.data.orderCount
            this.workOrderList = res.data.orderlist.map((item) => {
              item.FCheckDateTxt = secondToFormat(item.FCheckDate.time)
              item.FPlanFinishDateTxt = secondToFormat(item.FPlanFinishDate.time)
              // item.fcolorTxt = item.fcolor === 0 ? '否' : '是' // 颜色  1 标记颜色
              item.fshortTxt = item.fshort === 0 ? '否' : '是' // 1  缺料
              item.FHeadSelfJ01100_text = item.FHeadSelfJ01100 === '0' ? '否' : '是'
              return item
            })
            this.listLoading = false
            break
          default:
            this.listLoading = false
            this.$message({
              message: res.data.message + '!',
              type: 'error'
            })
        }
      }).catch((error) => {
        console.log(error)
        this.listLoading = false
      })
    },
    changeDate (idx, row) {
      this.dialogDateVisible = true
      this.finterid = row.finterid
    },
    notice (idx, row) {
      if (this.userName !== '张东琴' && this.userName !== '陆莉莉' && this.userName !== 'administrator' && this.userName !== 'Administrator') {
        this.$message({
          message: '您没有权限进行该操作!',
          type: 'warning'
        })
        return false
      }
      this.$confirm('确认下达?', '提示', {
        showClose: false,
        closeOnClickModal: false,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loadingW = true
        this.Http.post('updateXiada?finterid=' + row.finterid + '&userid=' + this.userId + '&fok=' + (row.fok === '前道' ? '后道' : '前道')
        ).then(res => {
          switch (res.data.code) {
            case 1:
              this.$message({
                message: '下达成功!',
                type: 'success'
              })
              this.loadingW = false
              this.getWorkOrderList()
              break
            default:
              this.$message({
                message: '下达失败!',
                type: 'error'
              })
              this.loadingW = false
          }
        }).catch((error) => {
          console.log(error)
        })
      }).catch(() => {
      })
    },
    lock (idx, row) {
      this.$confirm('确认锁库?', '提示', {
        showClose: false,
        closeOnClickModal: false,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loadingW = true
        this.Http.post('updatesk?finterid=' + row.finterid
        ).then(res => {
          switch (res.data.code) {
            case 1:
              this.$message({
                message: '锁库成功!',
                type: 'success'
              })
              this.loadingW = false
              this.getWorkOrderList()
              break
            default:
              this.$message({
                message: '锁库失败!',
                type: 'error'
              })
              this.loadingW = false
          }
        }).catch((error) => {
          console.log(error)
        })
      }).catch(() => {
      })
    },
    warnDetail (idx, row) {
      this.timestamp = (new Date()).getTime()
      this.warnVisible = true
      this.curWarnFShortNumber = row.FShortNumber
    },
    closePrint () {
      this.warnVisible = false
    },
    submitModify () {
      this.Http.post('updateFinishDate?finterid=' + this.finterid + '&FPlanFinishDate=' + dateToFormat(this.jiaoqiDate)
      ).then(res => {
        switch (res.data.code) {
          case 1:
            this.$message({
              message: '修改成功!',
              type: 'success'
            })
            this.dialogDateVisible = false
            this.getWorkOrderList()
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
    }
  }
}
</script>

<style lang="less" scoped>
@Padding: 24px;
.WorkOrder{
  width: calc(100% - 2*@Padding);
  background: #fff;
  padding: 0 @Padding @Padding @Padding;
  margin-top: @Padding;
}

</style>
