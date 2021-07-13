<template>
  <!--组件-->
  <div>
    <div style="width:100%;height:30px;">
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>我的收藏</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 卡片视图区 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input v-model="queryInfo.query" placeholder="请输入内容" clearable @clear="getCollection()">
            <el-button slot="append" icon="el-icon-search" @click="searchCollections"> </el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 表格区域 -->
      <el-table :data="collectionlist" border stripe class="goodsInfo" height="500px">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="商品图片" align="center" width="120px">
          <template slot-scope="scope">
            <el-popover placement="top-start" title="" trigger="hover">
              <img :src="scope.row.imgSrc" alt="" style="width: 150px;height: 150px" />
              <img slot="reference" :src="scope.row.imgSrc" style="width: 70px;height: 70px" />
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="商品编号" prop="id" align="center"></el-table-column>
        <el-table-column label="商品名称" prop="name" align="center"></el-table-column>
        <el-table-column label="商品价格" prop="price" align="center"></el-table-column>
        <el-table-column label="地区" prop="range" align="center"></el-table-column>
        <el-table-column label="操作" width="100px" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteCollection(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNum"
        :page-sizes="[4, 6, 8, 10]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        class="goods_pagination"
      >
      </el-pagination>
    </el-card>
  </div>
</template>
<script>
/* 行为 */
export default {
  data() {
    return {
      queryInfo: {
        query: '',
        pageNum: 1,
        pageSize: 4,
        uid: 0
      },
      total: 0,
      collectionlist: []
    }
  },
  methods: {
    // 获取收藏列表
    async getCollection() {
      this.queryInfo.uid = window.sessionStorage.getItem('userId')
      const { data: res } = await this.$http.get('goods/recollection', { params: this.queryInfo })
      this.collectionlist = res.data.list
      this.total = res.data.total
      console.log(this.collectionlist)
    },
    // 搜索收藏商品
    async searchCollections() {
      const { data: res } = await this.$http.get('goods/collection/search', { params: this.queryInfo })
      this.collectionlist = res.data.list
      this.total = res.data.total
    },
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize
      this.getCollection()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage
      this.getCollection()
    },
    async deleteCollection(id) {
      //  confirmResult返回为一个Promse实例，可以用await，async简化
      const confirmResult = await this.$confirm('此操作将永久删除该收藏, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // 如果confirmResult返回confirm则为删除
      // 如果confirmResult返回cancel则为取消删除
      if (confirmResult !== 'confirm') return this.$message.info('已取消了删除')
      const { data: res } = await this.$http.delete('goods/collection/delete/' + id)
      if (!res.success) return this.$message.error('删除失败')
      this.$message.success('删除成功')
      this.getCollection()
      console.log(res)
    }
  },
  created() {
    this.getCollection()
  }
}
</script>
<style lang="less" scoped>
/* 样式区 */
.input-sub,
.input-add {
  min-width: 40px;
  height: 100%;
  border: 0;
  color: #605f5f;
  text-align: center;
  font-size: 16px;
  overflow: hidden;
  display: inline-block;
  background: #f0f0f0;
}
.item-quantity .select-self-area {
  background: none;
  border: 1px solid #f0f0f0;
}
.item-quantity .select-self-area .select-ipt {
  display: inline-block;
  padding: 0 3px;
  width: 30px;
  min-width: 30px;
  text-align: center;
}
.goods_pagination {
  margin-top: 20px;
  padding: 2px;
}
.goodsInfo {
  margin-left: 5px;
  margin-top: 15px;
}
</style>
