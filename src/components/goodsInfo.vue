/* eslint-disable quote-props */
<template>
  <div>
    <el-card
      ><div class="back"><a href="javascript:;" @click="goback">← 返 回</a></div>
      <!-- 商品图片轮播页 -->
      <div class="block">
        <el-carousel trigger="click" height="500px" :interval="5000" arrow="hover" indicator-position="outside">
          <el-carousel-item v-for="item in img_goods" :key="item.id">
            <img :src="item.src" alt="图片加载失败！" width="100%" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- 商品信息 -->
      <div class="goodsInfo">
        <div class="headerTitle">
          {{ goods_Info.name }}
          <i class="el-icon-star-on" :class="{ flag }" @click="onColorChange"> </i>
          <span class="icontext">收藏</span>
          <span class="price">￥{{ goods_Info.price }}.00</span>
          <span class="description">{{ goods_Info.others }}</span>
        </div>
        <div class="label" v-for="item in labelInfo" :key="item.id + '1'">
          <strong>{{ item.name }}</strong>
          <span v-if="(id = 1)">{{ item.number }}</span>
          <span v-if="(id = 2)">{{ item.type }}</span>
          <span v-if="(id = 3)">{{ item.tab }}</span>
        </div>
        <div class="contactButton">
          <button class="contact">立即咨询</button>
          <button class="contact">联系我们</button>
        </div>
        <div v-for="item in pannelInfo" :key="item.id">
          <div class="pannel" @click="contentexpand(item.id)">
            <i
              :class="[
                clicknumber == '0' ? 'el-icon-caret-bottom' : '',
                frontnumber != item.id ? 'el-icon-caret-bottom' : '',
                expand && indexnumber % 2 == '0' ? 'el-icon-caret-top' : indexnumber % 2 == 1 ? '' : 'el-icon-caret-bottom',
                indexnumber % 2 == '1' && flag2 == true ? 'el-icon-caret-top' : indexnumber % 2 == 0 ? '' : 'el-icon-caret-bottom'
              ]"
              style="font-size:24px;color:#666666;margin-left:20px;margin-top=3px;"
            ></i>
            <span>{{ item.name }} </span>
          </div>
          <div
            class="expandContent"
            :class="[clicknumber == item.id ? (expand == true && indexnumber % 2 == '0' ? 'expand' : '') : '', clicknumber == item.id ? (flag2 == true && indexnumber % 2 == '1' ? 'expand' : '') : '']"
          >
            {{ item.content }}
          </div>
        </div>
        <div class="headSubtitle">其他产品</div>
        <div class="subContainer">
          <div class="subcontent" v-for="item in goodsList" :key="item.id">
            <el-card class="goods_card ">
              <img :src="item.imgSrc" alt="图片加载失败！" width="100%" class="other_img" />
              <div class="productionName">
                <a href="javascript:;">{{ item.name }}</a>
              </div>
            </el-card>
          </div>
        </div>
      </div></el-card
    >
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      queryInfo: {
        // 查询的关键字
        query: '',
        // 当前每页显示多少条数据
        pageSize: 4,
        // 当前页
        pageNum: 1
      },
      query: {
        id: 0
      },
      goods_Info: {},
      // icon颜色
      flag: false,
      // 内容显示与隐藏
      expand: false,
      // 判断点击哪个
      frontnumber: 0,
      clicknumber: 0,
      choosenumber: 2,
      numberlabel: 0,
      flag2: false,
      indexnumber: 2,
      one: 1,
      zero: 0,
      // 被激活的链接
      activePath: '',
      img_goods: [
        {
          id: 1,
          src: ''
        },
        {
          id: 2,
          src: ''
        },
        {
          id: 3,
          src: ''
        }
      ],
      labelInfo: [
        {
          id: 1,
          name: '编号:',
          number: ''
        },
        {
          id: 2,
          name: '分类:',
          type: ''
        },
        {
          id: 3,
          name: '标签:',
          tab: ''
        }
      ],
      pannelInfo: [
        {
          id: 1,
          name: '产品介绍',
          content: ''
        },
        {
          id: 2,
          name: '规格与包装',
          content: ''
        },
        {
          id: 3,
          name: '售后与保障',
          content: ''
        }
      ],
      // 商品列表
      goodsList: []
    }
  },
  methods: {
    goback() {
      this.$router.push('/store')
    },
    onColorChange() {
      this.flag = !this.flag
    },
    contentexpand(number1) {
      this.clicknumber = number1
      if (this.numberlabel === this.one) {
        if (this.indexnumber % 2 === this.zero && this.frontnumber !== number1) {
          this.expand = !this.expand
          this.flag2 = !this.flag2
          this.indexnumber++
        } else if (this.indexnumber % 2 === this.one && this.frontnumber !== number1) {
          this.expand = !this.expand
          this.flag2 = !this.flag2
          this.indexnumber++
        }
        if (this.indexnumber % 2 === this.zero && this.frontnumber === number1) {
          this.expand = !this.expand
        } else if (this.indexnumber % 2 === this.one && this.frontnumber === number1) {
          this.flag2 = !this.flag2
        }
      }
      if (this.numberlabel === this.zero) {
        if (this.indexnumber % 2 === this.zero && this.clicknumber === number1) {
          this.expand = !this.expand
        } else if (this.indexnumber % 2 === this.one && this.clicknumber === number1) {
          this.flag2 = !this.flag2
        }
        if (this.indexnumber % 2 === this.zero && this.clicknumber !== number1) {
          this.expand = !this.expand
          this.flag2 = !this.flag2
          this.indexnumber++
        } else if (this.indexnumber % 2 === this.one && this.clicknumber !== number1) {
          this.flag2 = !this.flag2
          this.expand = !this.expand
          this.indexnumber++
        }
        this.numberlabel = this.numberlabel + 1
      }
      this.frontnumber = this.clicknumber
    },
    async getGoodsInfo() {
      this.query.id = this.goodsId
      const { data: res } = await this.$http.get('/goods/goodsInfoDesc', { params: this.query })
      if (!res.success) {
        return this.$message.error('获取商品详细信息失败！')
      }
      this.goods_Info = res.data
      this.giveValue()
      console.log(this.goods_Info)
    },
    async getGoodsImg() {
      this.queryInfo.pageNum = Math.ceil(Math.random() * 10)
      const { data: res } = await this.$http.get('/goods/goodsInfo', { params: this.queryInfo })
      if (!res.success) {
        return this.$message.error('获取商品数据失败！')
      }
      this.goodsList = res.data.list
      console.log(this.goodsList)
    },
    giveValue() {
      this.pannelInfo.forEach(item => {
        item.content = this.goods_Info.others
      })
      for (let i = 0; i < this.img_goods.length; i++) {
        this.img_goods[i].src = this.goods_Info.imgSrc
        console.log(this.img_goods[i].src)
      }
      console.log(this.goods_Info.imgSrc)
      this.labelInfo[0].number = this.goods_Info.id
      this.labelInfo[1].type = this.goods_Info.type
      this.labelInfo[2].tab = this.goods_Info.range
    }
  },
  computed: {
    ...mapState(['goodsId'])
  },

  created() {
    this.getGoodsInfo()
    this.getGoodsImg()
  }
}
</script>
<style lang="less" scoped>
.home_container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;

  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: 0;
  }
}
.el-main {
  background-color: #f5f5f5;
}
.iconfont {
  margin-right: 10px;
}
.toggle_button {
  text-align: center;
  line-height: 24px;
  font-size: 12px;
  color: #fff;
  letter-spacing: 0.2em;
  background-color: #4a5056;
  cursor: pointer;
}
//main页面样式
.back {
  float: right;
}
.back a {
  text-decoration: none;
  color: gray;
}
.el-main {
  background-color: white;
  height: 100%;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.block {
  width: 500px;
  margin-left: 0px;
  margin-top: 50px;
}
.back a:hover {
  color: #292929;
}
.headerTitle {
  margin-top: -530px;
  margin-left: 550px;
  font-family: 宋体;
  font-size: 26px;
  font-weight: bold;
  font-style: normal;
  color: #333333;
  padding: 0 0 20px 0;
  font-weight: 400;
}
.price {
  display: block;
  margin-top: 20px;
  color: #a4a3a3;
  font-size: 18px;
}
.description {
  display: block;
  margin-top: 20px;
  color: #a4a3a3;
  font-size: 14px;
  font-family: '微軟正黑體';
}
.label {
  margin-left: 550px;
}
.contactButton {
  margin-top: 20px;
  margin-left: 530px;
}
.contactButton .contact {
  width: 200px;
  height: 50px;
  background-color: #000000;
  color: #fff;
  cursor: pointer;
  border: 1px solid transparent;
  margin-left: 20px;
  margin-bottom: 20px;
}
.contactButton .contact:hover {
  background-color: #464646;
}
.pannel {
  margin-left: 550px;
  background-color: #f3f3f3;
  width: 620px;
  height: 50px;
  cursor: pointer;
  margin-top: 7px;
}
.expandContent {
  width: 520px;
  margin-left: 605px;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 13px;
  font-family: '微软雅黑';
  color: #808080;
  display: none;
}
.pannel span {
  margin-left: 5px;
  line-height: 50px;
}
.el-icon-star-on {
  color: gray;
  float: right;
  font-size: 24px;
  cursor: pointer;
  margin-right: 30px;
}
.icontext {
  margin-top: 4px;
  margin-right: -60px;
  font-size: 16px;
  font-family: '宋体';
  color: #333333;
  float: right;
}
.flag {
  color: red;
}
.expand {
  display: block;
}
.headSubtitle {
  font-family: ffbc2d7064994b82533653ccf0a19ec52;
  font-size: 30px;
  font-weight: bold;
  font-style: normal;
  color: #333333;
  padding: 0 0 15px 0;
  display: block;
  margin-top: 90px;
  margin-left: 50px;
}
.subcontent {
  margin-right: 30px;
  margin-top: 20px;
  float: right;
}
.subcontent img {
  cursor: pointer;
}
.productionName {
  display: block;
  width: 100%;
  height: 60px;
}
.productionName a {
  display: block;
  text-align: center;
  color: #5e5e5e;
  font-size: 14px;
  line-height: 60px;
  text-decoration: none;
}
.subContainer {
  width: 100%;
  height: 500px;
}
.productionName a:hover {
  color: #000000;
}
.subcontent img:hover {
  transform: scale(1.1);
  opacity: 0.8;
  background-color: #f5f5f5;
}
.goods_card {
  width: 270px;
  margin-top: 15px;
  margin-right: 5px;
  text-align: center;
  img {
    width: 100%;
    height: 305px;
  }
}
</style>
