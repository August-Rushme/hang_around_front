<template>
  <div>
    <el-card
      >欢迎您, <span class="userName">{{ userInfo.username }}</span> ! 您上次登录的地点为： 海南
      <el-card class="userDetail"
        ><span class="symbol">|</span>资料管理
        <hr style="height:1px;border:none;border-top:1px dashed gray;margin-top:10px;" />
        <!-- 头像区域 -->
        <div class="avatar">
          <img src="https://tse2-mm.cn.bing.net/th/id/OIP-C.rBVkJaYBCOkM0HZULRGgNAHaHa?w=205&h=206&c=7&o=5&dpr=1.25&pid=1.7" width="100px" height="100px" />
          <a href="javascript:;" class="changeAvatar">更换头像</a>
        </div>
        <br />
        <!-- 用户信息 -->
        <el-form ref="formRef" :model="userForm" label-width="80px" :rules="rules" class="formInfo">
          <el-form-item label="用户名:" prop="name">
            <el-input v-model="userForm.name" style="width:300px;" placeholder="请输入用户名" disabled></el-input>
          </el-form-item>
          <el-form-item label="密码:" prop="password">
            <el-input v-model="userForm.password" style="width:300px;" placeholder="请输入新密码" type="password"></el-input>
          </el-form-item>
          <el-form-item label="邀请码:">
            <span>kfc132456487943321</span>
          </el-form-item>
          <el-form-item label="生日:" prop="birthday">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="userForm.birthday" style="width: 180px;"></el-date-picker>
            </el-col>
          </el-form-item>

          <el-form-item label="倾向:" prop="type">
            <el-checkbox-group v-model="userForm.type">
              <el-checkbox label="手机" name="type"></el-checkbox>
              <el-checkbox label="数码" name="type"></el-checkbox>
              <el-checkbox label="电器" name="type"></el-checkbox>
              <el-checkbox label="图书" name="type"></el-checkbox>
              <el-checkbox label="鞋服" name="type"></el-checkbox>
              <el-checkbox label="生活用品" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="性别:" prop="sex">
            <el-radio-group v-model="userForm.sex">
              <el-radio label="男"> </el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="个性签名:">
            <el-input type="textarea" v-model="userForm.signature"> </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="changeNow">立即修改</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-card>
  </div>
</template>
<script src="https://unpkg.com/element-ui/lib/index.js"></script>
<script>
export default {
  data() {
    return {
      query: {
        id: 0
      },
      // 用户的消息表单
      userForm: {
        id: 0,
        name: '',
        birthday: '',
        type: [],
        password: null,
        sex: '',
        signature: ''
      },
      // 验证表单的规则
      rules: {
        sex: [
          {
            required: true,
            message: '请选择性别',
            trigger: 'change'
          }
        ],
        type: [
          {
            required: true,
            message: '请选择爱好',
            trigger: 'change'
          }
        ],
        birthday: [
          {
            required: true,
            message: '请选择日期',
            trigger: 'blur'
          }
        ],
        name: [
          {
            required: false,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: false,
            message: '请输入新密码',
            trigger: 'blur'
          },
          { min: 6, max: 32, message: '密码必须是6-32位', trigger: 'blur' }
        ]
      },
      userInfo: {}
    }
  },
  methods: {
    // 点击修改信息
    changeNow() {
      this.$refs.formRef.validate(async valid => {
        if (!valid) return
        // 对密码进行加密传输
        // eslint-disable-next-line no-undef
        if (this.userForm.password != null) {
          this.userForm.password = hexMd5(this.userForm.password + KEY)
        }
        const { data: res } = await this.$http.post('/user/modify', this.userForm)
        if (!res.success) {
          return this.$message.error('修改个人信息失败！')
        }
        this.$message.success('修改个人信息修改成功！')
      })
    },
    // 表单重置
    resetForm() {
      this.$refs.formRef.resetFields()
      console.log(this.$refs)
    },
    // 获得用户的基本信息
    async getUserInfo() {
      const { data: res } = await this.$http.get('/user/userInfo', { params: this.query })
      this.userInfo = res.data[0]
      console.log(this.userInfo)

      this.setUserInfo()
    },
    // 设置用户的基本信息
    setUserInfo() {
      this.userForm.name = this.userInfo.username
      this.userForm.birthday = this.userInfo.birthday
      this.userForm.sex = this.userInfo.sex
      this.userForm.signature = this.userInfo.signature
    }
  },
  created() {
    this.userForm.id = window.sessionStorage.getItem('userId')
    this.query.id = window.sessionStorage.getItem('userId')
    this.getUserInfo()
  }
}
</script>
<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
  border: 0;
  text-decoration: none;
}
.userName {
  color: red;
}
.userDetail {
  margin-top: 25px;
  font-size: 18px;
}
.userDetail .symbol {
  font-size: 24px;
  color: red;
  font-weight: 550;
  padding-right: 5px;
}
.avatar {
  margin-top: 28px;
  margin-left: 10px;
}
.avatar img {
  cursor: pointer;
  border-radius: 50%;
}
.changeAvatar {
  display: block;
  font-size: 12px;
  font-family: '微软雅黑';
  color: #808080;
  width: 100px;
  height: 40px;
  text-align: center;
  line-height: 40px;
}
.changeAvatar:hover {
  color: #000;
}
.formInfo {
  margin-left: 130px;
  margin-top: -169px;
}
</style>
