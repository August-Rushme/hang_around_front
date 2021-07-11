<template>
  <div>
    <el-card>
      <!-- 搜索区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getOwnGoods()">
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addGood">发布商品</el-button>
        </el-col>
        <!-- 商品表格区域 -->
        <el-table :data="goodsList" border stripe class="goodsInfo" height="500px">
          <el-table-column type="index" align="center"></el-table-column>
          <el-table-column label="商品名称" prop="gname" align="center"></el-table-column>
          <el-table-column label="商品分类" align="center">
            <template slot-scope="scope">
              <el-tag style="margin-right:5px;" type="warning" size="medium">
                {{ scope.row.gtype }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="商品价格(元)" prop="gprice" align="center"></el-table-column>
          <el-table-column label="商品库存(个)" prop="gstock" align="center"></el-table-column>
          <el-table-column label="编辑" align="center" width="150px">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" @click="edit(scope.row.gid)"></el-button>
              <el-button type="danger" icon="el-icon-delete" @click="deleteGoods(scope.row.gid)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNum"
        :page-sizes="[4, 8, 12, 16]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        class="goods_pagination"
      >
      </el-pagination>
    </el-card>
    <!-- 对话框区域 -->
    <el-dialog title="编辑" :visible.sync="editDialogVisible" width="50%">
      <el-form :model="editForm" :rules="editRules" ref="editFormRef" label-width="80px" class="demo-ruleForm">
        <el-form-item label="商品名称" prop="gname">
          <el-input v-model="editForm.gname"></el-input>
        </el-form-item>
        <el-form-item label="商品分类" prop="gtype">
          <el-input v-model="editForm.gtype"></el-input>
        </el-form-item>
        <el-form-item label="商品价格(元)" prop="gprice">
          <el-input v-model="editForm.gprice"></el-input>
        </el-form-item>
        <el-form-item label="商品库存(个)" prop="gstock">
          <el-input v-model="editForm.gstock"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      query: { gid: 0 },
      // 查询参数对象
      queryInfo: {
        query: '',
        pageNum: 1,
        pageSize: 4,
        uid: 0
      },
      // 总数据调数
      total: 0,
      // 商品列表
      goodsList: [],
      // 控制编辑对话框的出现
      editDialogVisible: false,
      // 绑定编辑商品的表单数据
      editForm: {},
      // 表单的验证规则
      editRules: {
        gname: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        gtype: [{ required: true, message: '请输入商品分类', trigger: 'blur' }],
        gprice: [{ required: true, message: '请输入商品价格', trigger: 'blur' }],
        gstock: [{ required: true, message: '请输入商品库存', trigger: 'blur' }]
      },
      // 标签数组
      tag: []
    }
  },
  methods: {
    // 获取商品的信息
    async getOwnGoods() {
      const { data: res } = await this.$http.get('/goods/manage', { params: this.queryInfo })
      if (!res.success) {
        return this.$message.error('获取商品失败!')
      }
      this.goodsList = res.data.list
      this.tag = res.data.list
      this.total = res.data.total
    },
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize
      this.getOwnGoods()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage
      this.getOwnGoods()
    },
    // 点击编辑
    async edit(id) {
      this.editDialogVisible = true
      this.query.gid = id
      const { data: res } = await this.$http.get('/goods/manage/id', { params: this.query })
      this.editForm = res.data
      console.log(this.editForm)
      console.log(id)
    },
    // 点击保存编辑
    saveEdit() {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        // 发起请求
        const { data: res } = await this.$http.post('/goods/manage/save', this.editForm)
        if (!res.success) {
          return this.$message.error('编辑失败！')
        }
        this.$message.success('编辑成功')
        this.getOwnGoods()
        this.editDialogVisible = false
      })
    },
    // 点击删除
    async deleteGoods(id) {
      this.query.gid = id
      //  confirmResult返回为一个Promse实例，可以用await，async简化
      const confirmResult = await this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // 如果confirmResult返回confirm则为删除
      // 如果confirmResult返回cancel则为取消删除
      if (confirmResult !== 'confirm') return this.$message.info('已取消了删除')
      const { data: res } = await this.$http.delete('/goods/manage/delete', { params: this.query })
      if (!res.success) return this.$message.error('删除失败')
      this.getOwnGoods()
      this.$message.success('删除成功')
      console.log(res)
    },
    // 搜索
    async search() {
      const { data: res } = await this.$http.get('goods/manage/search', { params: this.queryInfo })
      this.goodsList = res.data.list
      this.total = res.data.total
    },
    addGood() {
      this.$router.push('/goods/add')
    }
  },
  created() {
    this.queryInfo.uid = window.sessionStorage.getItem('userId')
    this.getOwnGoods()
  }
}
</script>
<style lang="less" scoped>
.goodsInfo {
  margin-left: 10px;
  margin-top: 60px;
}
.goods_pagination {
  margin-top: 20px;
  padding: 2px;
}

</style>
