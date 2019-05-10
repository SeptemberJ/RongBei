<template>
  <div class="Analysis">
    <el-row>
      <el-col :span="24" class="TextAlignL MarginB_20">
        <h2 style="color: #666;">产品预测分析</h2>
      </el-col>
      <el-col :span="24">
        <el-form label-width="80px" class="demo-dynamic">
          <el-form-item
            v-for="(item, index) in waitForCalculateList"
            label="成品"
            :key="index"
            :prop="'items.' + index + '.fitemid'"
          >
            <el-row>
              <el-col :span="10" class="TextAlignL">
                <el-button type="" style="width:100%;" @click="chooseProduction">{{item.fname ? item.fname : '选择'}}</el-button>
              </el-col>
              <el-col :span="6" :offset="2" class="TextAlignL">
                <el-input v-model="item.fqty" clearable placeholder="数量"></el-input>
              </el-col>
              <el-col :span="2" :offset="3" class="TextAlignL">
                <el-button @click.prevent="removeDomain(item)">移除</el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item class="TextAlignL">
            <el-button id="addLineBt" @click="addDomain" style="width: 95.8%;border: 1px dashed #84bf96;color: #84bf96;" icon="el-icon-plus">添加</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm" style="margin-left: -80px;">计算</el-button>
            <!-- <el-button @click="resetForm('waitForCalculateList')">重置</el-button> -->
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="24" style="width: 100%;height: 10px; border-bottom: 1px dashed #ccc;">
      </el-col>
      <!-- <el-col :span="24" class="MarginB_10">
        <span>成品：</span>
        <el-button type="" @click="chooseProduction">{{choosedProduct ? choosedProduct : '选择'}}</el-button>
        <span class="MarginL_10">数量：</span>
        <el-input v-model="amount" style="width: 150px" class="MarginL_10" clearable placeholder="请输入数量"></el-input>
        <el-button type="primary" class="MarginL_10" @click="Calculate">计算</el-button>
      </el-col> -->
      <el-col :span="24" class="MarginT_20">
        <el-table
          :data="productList"
          v-loading="listLoading"
          style="width: 100%">
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            property="fnumber"
            label="物料代码">
          </el-table-column>
          <el-table-column
            property="FName"
            label="物料名称">
          </el-table-column>
          <el-table-column
            property="FModel"
            label="规格型号">
          </el-table-column>
          <el-table-column
            property="danwei"
            label="单位"
            width="100">
          </el-table-column>
          <el-table-column
            property="fqty"
            label="数量">
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="24" class="TextAlignR MarginT_20"  v-if="productList.length > 1">
        <el-pagination
          @current-change="submitForm"
          :current-page.sync="curPageMain"
          :page-size="15"
          layout="prev, pager, next, jumper"
          :total="sumMain">
        </el-pagination>
      </el-col>
    </el-row>
    <el-dialog
      id="chooseProduction"
      title="选择成品"
      :visible.sync="dialogChooseProduction"
      :close-on-click-modal="false"
      width="550px">
      <div>
        <el-row>
          <el-col :span="24" class="TextAlignC MarginB_20">
            <el-input v-model="fnumber" style="width: 150px" @change="changeCondition" clearable placeholder="请输入物料代码"></el-input>
            <el-input v-model="fname" style="width: 150px" @change="changeCondition" class="MarginL_10" clearable placeholder="请输入物料名称"></el-input>
            <el-button type="" class="MarginL_10" @click="getProductList">查询</el-button>
            <el-button type="" class="MarginL_10" @click="reset">重置</el-button>
          </el-col>
          <!-- 查询结果 -->
          <el-col :span="24" style="border-bottom: 1px solid #ebeef5;padding: 10px 0;" class="MarginB_10">
            <el-row  style="padding: 0 20px;">
              <el-col :span="12" style="color: #909399;font-weight: bold;text-align: left;">产品名称</el-col>
              <el-col :span="12" style="color: #909399;font-weight: bold;text-align: left;">产品代码</el-col>
            </el-row>
          </el-col>
          <el-col :span="24" v-for="item in fliterProductList" :key="item.fitemid" class="TextAlignL MarginB_10" style="border-bottom: 1px solid #ebeef5;padding-bottom: 10px;">
            <el-row  style="padding: 0 20px;">
              <el-col :span="12">
                <el-radio v-model="productFitemid" :label="item.fitemid" @change="changeProduction(item)">{{item.fname}}</el-radio>
              </el-col>
              <el-col :span="12" :class="{'activeRadio': productFitemid == item.fitemid}">{{item.fnumber}}</el-col>
            </el-row>
          </el-col>
          <!-- 分页 -->
          <el-col :span="24" class="TextAlignR MarginT_20" v-if="fliterProductList.length > 0">
            <el-pagination
              @current-change="getProductList"
              :current-page.sync="curPage"
              :page-size="5"
              layout="prev, pager, next, jumper"
              :total="sum">
            </el-pagination>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sureChoosedOne">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'Analysis',
  data () {
    return {
      listLoading: false,
      dialogChooseProduction: false,
      fname: '',
      fnumber: '',
      productFitemid: '', // 单次选择的产品id
      choosedProduct: '', // 单次选择的产品名称和型号string
      // amount: '',
      productList: [], // 计算结果
      fliterProductList: [], // 产品筛选结果
      curPage: 1,
      curPageMain: 1,
      sum: 0,
      sumMain: 0,
      waitForCalculateList: [{
        fitemid: '',
        fname: '',
        fqty: '',
        key: Date.now()
      }]
    }
  },
  created () {
  },
  watch: {
    waitForCalculateList: function (val) {
      if (val.length === 0) {
        this.productList = []
        this.curPageMain = 1
        this.sumMain = 0
      }
    }
  },
  methods: {
    chooseProduction () {
      this.dialogChooseProduction = true
    },
    async submitForm (formName) {
      let ifEmpty = await this.checkEmpty(this.waitForCalculateList)
      if (!ifEmpty) {
        // console.log(this.waitForCalculateList)
        this.Calculate(this.waitForCalculateList)
      } else {
        this.$message({
          message: '请将成品信息填写完整!',
          type: 'warning'
        })
      }
    },
    // 条件完整性验证
    checkEmpty (LIST) {
      return new Promise((resolve, reject) => {
        let ifEmpty = false
        LIST.map((item, idx) => {
          if (!item.fname || !item.fqty) {
            ifEmpty = true
          }
          if (idx === LIST.length - 1) {
            resolve(ifEmpty)
          }
        })
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    removeDomain (item) {
      var index = this.waitForCalculateList.indexOf(item)
      if (index !== -1) {
        this.waitForCalculateList.splice(index, 1)
      }
    },
    addDomain () {
      this.waitForCalculateList.push({
        fitemid: '',
        fname: '',
        fqty: '',
        key: Date.now()
      })
    },
    reset () {
      this.fname = ''
      this.fnumber = ''
      this.productList = []
      this.sum = 0
      this.curPage = 1
    },
    sureChoosedOne () {
      let idx = this.waitForCalculateList.length - 1
      this.dialogChooseProduction = false
      this.waitForCalculateList[idx].fitemid = this.productFitemid
      this.waitForCalculateList[idx].fname = this.choosedProduct
    },
    changeProduction (item) {
      // this.choosedProduct = item.fname + ' | ' + item.fnumber
      this.choosedProduct = item.fname
    },
    changeCondition () {
      this.curPage = 1
    },
    getProductList () {
      this.listLoading = true
      this.Http.get('itemList', {wlname: this.fname, wlcode: this.fnumber, number: 5, page_num: this.curPage}
      ).then(res => {
        switch (res.data.code) {
          case 1:
            this.fliterProductList = res.data.itemlist
            this.sum = res.data.itemCount
            this.listLoading = false
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
    Calculate (itemlist) {
      let DATA = {
        number: 10,
        page_num: this.curPageMain,
        itemlist: itemlist
      }
      this.Http.post('counbtByItemid', {items: DATA}
      ).then(res => {
        switch (res.data.code) {
          case 1:
            this.productList = res.data.itemdetaillist
            this.sumMain = res.data.itemCount
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
@Padding: 24px;
.Analysis{
  width: calc(100% - 2*@Padding);
  background: #fff;
  padding: @Padding;
  margin-top: @Padding;
}
.activeRadio{
  color: #409EFF;
}
#addLineBt:hover{
  background: #ffffff;
  color: #84bf96;
}
#addLineBt:focus{
  background: #ffffff;
  color: #84bf96;
}
</style>
