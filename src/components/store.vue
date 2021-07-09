<template>
  <div>
    <el-card>
      <!-- 搜索区域 -->
      <div class="search">
        <el-row>
          <el-col>
            <el-input placeholder="请输入搜索内容" v-model="queryInfo.query" clearable prefix-icon="el-icon-search" @clear="getGoodsList()" class="searchInpt"> </el-input>
            <el-button type="primary" @click="goods_search">搜索</el-button>
          </el-col>
        </el-row>
      </div>
      <!-- 轮播图区域 -->
      <div class="productRotationChart">
        <template>
          <el-carousel :interval="4000" arrow="always">
            <el-carousel-item v-for="item in 4" :key="item">
              <h3>{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </template>
      </div>
      <!-- 商品区域 -->
      <div class="goods">
        <el-row>
          <el-col :span="6" v-for="item in goodsList" :key="item.id">
            <div class="goods_item">
              <el-card class="goods_card">
                <a href="javascript:;" class="goods_card1"> <img :src="require('../' + item.imgSrc)" alt="" /> </a>

                <div class="price">
                  <span>￥39.9</span>
                </div>
                <el-row>
                  <el-col>
                    <div class="gooods_item_bottom">
                      <span>{{ item.name + item.type }}</span>
                      <el-button type="primary" class="button" size="mini">立即收藏</el-button>
                    </div>
                  </el-col>
                </el-row>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </div>
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      queryInfo: {
        // 查询的关键字
        query: '',
        // 当前每页显示多少条数据
        pageSize: 8,
        // 当前页
        pageNum: 1
      },
      // 商品数量
      total: 0,
      // 轮播图列表
      bannerList: [],
      // 商品列表
      goodsList: []
    }
  },
  methods: {
    // 搜索商品
    async goods_search() {
      const { data: res } = await this.$http.get('/goods/searchInfo', {
        params: this.queryInfo
      })
      if (!res.success) {
        return this.$message.error('获取商品数据失败！')
      }
      this.goodsList = res.data.list
      console.log(this.goodsList)
    },
    // 获取商品的数据
    async getGoodsList() {
      const { data: res } = await this.$http.get('/goods/goodsInfo', { params: this.queryInfo })
      if (!res.success) {
        return this.$message.error('获取商品数据失败！')
      }
      this.goodsList = res.data.list
      this.total = res.data.total
      console.log(this.goodsList)
    },
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize
      this.getGoodsList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage
      this.getGoodsList()
    }
  },
  // 获取商品的数据
  created() {
    this.getGoodsList()
  },
  computed: {}
}
</script>
<style lang="less" scoped>
.searchInpt {
  width: 400px;
  margin-right: 5px;
}

.search {
  text-align: center;
}

.productRotationChart {
  margin-top: 15px;
  box-shadow: 0 0 0 0.15;
  .el-carousel__item h3 {
    background-color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: auto;
  }
}
.goods {
  .el-card:hover {
    border: 1px solid #ff4400 !important;
  }
  .goods_item {
    .goods_card {
      margin-top: 15px;
      margin-right: 20px;
      img {
        width: 100%;
      }
      .price span {
        color: #ff4400;
        font-size: 16px;
        font-weight: bold;
      }
      .gooods_item_bottom {
        display: flex;
        justify-content: space-between;
        span {
          padding: 14px 0;
          font-size: 16px;
          font-weight: bold;
        }
      }
    }
  }
}
.goods_pagination {
  margin-top: 20px;
  padding: 2px 400px;
}
</style>
