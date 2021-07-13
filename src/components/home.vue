/* eslint-disable quote-props */
<template>
  <div>
    <el-container class="home_container">
      <el-header>
        <div>
          <img src="../assets/logo2.png" alt="" />
        </div>
        <el-button type="info" v-if="this.isLogin" @click="logout">退出登录</el-button>
        <el-button type="info" @click="login" v-else>登录</el-button>
      </el-header>
      <!-- 页面主体 -->
      <el-container>
        <!-- 侧边栏区域 -->
        <el-aside :width="isCollapse ? '64px' : '200px'">
          <div class="toggle_button" @click="toggleCollapse">|||</div>
          <!-- 侧边栏菜单 -->
          <!-- #242424 -->
          <el-menu background-color="#242424" active-text-color="#409EFF" text-color="#fff" unique-opened :collapse="isCollapse" :collapse-transition="false" router :default-active="activePath">
            <!-- 菜单选项 -->
            <el-menu-item v-for="item in menuList" :key="item.id" :index="'/' + item.path + ''" @click="saveNavState('/' + item.path)">
              <!-- 图标 -->
              <i :class="iconsObject[item.id]"></i>
              <!-- 一级菜单的模板区域 -->
              <template slot="title">
                <!-- 文本 -->
                <span>{{ item.authName }}</span>
              </template>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <!-- 内容主体区域 -->
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      // 左侧菜单数据
      menuList: [
        {
          id: 1,
          authName: '商品首页',
          path: 'store'
        },
        {
          id: 2,
          authName: '个人中心',
          path: 'user'
        },
        {
          id: 3,
          authName: '我的收藏',
          path: 'collection'
        },
        {
          id: 4,
          authName: '商品管理',
          path: 'goods'
        }
      ],
      iconsObject: {
        // eslint-disable-next-line quote-props
        '1': 'iconfont iconquanxianguanli1',
        // eslint-disable-next-line quote-props
        '2': 'iconfont iconyonghuguanli1',
        // eslint-disable-next-line quote-props
        '3': 'iconfont iconquanxianguanli1',
        // eslint-disable-next-line quote-props
        '4': 'iconfont icondingdanguanli',
        // eslint-disable-next-line quote-props
        '5': 'iconfont iconshujutongji'
      },
      // 默认不折叠
      isCollapse: false,
      // 被激活的链接
      activePath: '',
      token: ''
    }
  },
  methods: {
    login() {
      this.$router.push('/login')
      this.isLogined()
    },
    logout() {
      // 退出登陆后清空后端的token，并且清除sessionStorage里面的东西
      this.$http.get('/user/logout/' + this.token)
      this.noLogin()
      this.$router.push('/login')
      window.sessionStorage.clear()
    },
    // 是否折叠
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    // 将当前的状态保存到本地
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
      window.sessionStorage.getItem('activePath')
      if (!this.isLogin && this.activePath === '/user') {
        this.$router.push('/login')
        this.$message.info('请先登陆！')
      }
    },
    // 全局方法
    ...mapMutations(['isLogined', 'noLogin'])
  },
  computed: {
    // 全局属性
    ...mapState(['isLogin'])
  },
  // 激活的菜单
  created() {
    this.activePath = window.sessionStorage.getItem('activePath')
    this.token = window.sessionStorage.getItem('token')
  }
}
</script>
<style lang="less" scoped>
.home_container {
  height: 100%;
  .webname {
    font-size: 20px;
  }
}
.el-header {
  background-color: #c20c0c;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;

  > div {
    display: flex;
    align-items: center;
    img {
      margin-left: -20px;
      margin-bottom: 10px;
    }
  }
}
.el-aside {
  background-color: #242424;
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
  background-color: #242424;
  cursor: pointer;
}
</style>
