<template>
  <div class="WorkOrder">
    <el-row>
      <el-col :span="24" class="TextAlignL MarginB_20">
        <h2 style="color: #666;">生产工单</h2>
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
            width="120">
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
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                size="mini"
                v-if="scope.row.fshort === 0"
                :type="scope.row.fshort == 0 ? 'danger' : ''"
                @click="notice(scope.$index, scope.row)">下达</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="24" class="TextAlignR MarginT_20"  v-if="workOrderList.length > 1">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="curPage"
          :page-size="15"
          layout="prev, pager, next, jumper"
          :total="sum">
        </el-pagination>
      </el-col>
    </el-row>
    <!-- 详情 -->
    <el-dialog id="detailDialog" title="生产工单详情" :visible.sync="dialogTableVisible" fullscreen :close-on-click-modal="false">
      <WorkOrderDetail :OrderId="OrderId" :timestrap="timestrap"/>
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
  </div>
</template>

<script>
// import { mapState, mapActions } from 'vuex'
import WorkOrderDetail from '../components/WorkOrderDetail.vue'
import {secondToFormat, dateToFormat} from '../util/utils'
export default {
  name: 'WorkOrder',
  data () {
    return {
      dialogTableVisible: false,
      dialogDateVisible: false,
      listLoading: true,
      workOrderList: [],
      OrderId: null,
      timestrap: '', // 当前时间戳
      curPage: 1,
      sum: 20,
      finterid: '', // 修改日期的finterid
      jiaoqiDate: ''
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
  },
  mounted(){
  },
  components: {
    WorkOrderDetail
  },
  created () {
    this.getWorkOrderList()
  },
  methods: {
    tableRowClassName ({row, rowIndex}) {
      if (row.fcolor === 1) {
        return 'red-row'
      }
      return ''
    },
    handleCurrentChange () {
      this.getWorkOrderList()
    },
    seeDteail (row, $event) {
      // console.log(row)
      this.OrderId = row.finterid
      this.timestrap = (new Date()).getTime()
      this.dialogTableVisible = true
    },
    getWorkOrderList () {
      this.listLoading = true
      this.Http.get('sckgorderList', {number: 15, page_num: this.curPage}
      ).then(res => {
        switch (res.data.code) {
          case 1:
            this.sum = res.data.orderCount
            this.workOrderList = res.data.orderlist.map((item) => {
              item.FCheckDateTxt = secondToFormat(item.FCheckDate.time)
              item.FPlanFinishDateTxt = secondToFormat(item.FPlanFinishDate.time)
              // item.fcolorTxt = item.fcolor === 0 ? '否' : '是' // 颜色  1 标记颜色
              item.fshortTxt = item.fshort === 0 ? '否' : '是' // 1  缺料
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
      this.$confirm('确认下达?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.Http.post('updateXiada?finterid=' + row.finterid
        ).then(res => {
          switch (res.data.code) {
            case 1:
              this.$message({
                message: '下达成功!',
                type: 'success'
              })
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
      }).catch(() => {
      })
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
  padding: @Padding;
  margin-top: @Padding;
}

</style>
