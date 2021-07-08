<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->

      <div class="avatar_box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!-- 登录表单区域 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="iconfont iconyonghu"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="iconfont iconicon-mima" type="password"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>

          <el-button type="info" @click="showRegister">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 点击注册 -->
    <el-dialog title="注册" :visible.sync="registerVisible" width="40%" @close="clearRegisterForm">
      <el-form ref="registerFormRef" :model="registerForm" :rules="registerFormRules" label-width="10px">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="registerForm.username" prefix-icon="iconfont iconyonghu"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="registerForm.password" prefix-icon="iconfont iconicon-mima" type="password"></el-input>
        </el-form-item>
        <!-- 再次确认密码 -->
        <el-form-item prop="rePassword">
          <el-input v-model="registerForm.rePassword" prefix-icon="iconfont iconicon-mima" type="password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="registerVisible = false">取 消</el-button>
        <el-button type="primary" @click="register">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 这是登录表单的数据绑定对象
      loginForm: {
        username: 'august19',
        password: '000000a'
      },
      // 这是注册表单的数据绑定对象
      registerForm: {
        username: '',
        password: '',
        rePassword: ''
      },
      // 这是登录表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' }
        ]
      },
      // 这是注册表单的验证规则对象
      registerFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 32, message: '长度在 6 到 32 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        rePassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { min: 6, max: 32, message: '长度在 6 到 32 个字符', trigger: 'blur' }
        ]
      },
      registerVisible: false
    }
  },
  methods: {
    // 点击显示注册对话框
    showRegister() {
      this.registerVisible = true
    },
    // 关闭时重置注册表单
    clearRegisterForm() {
      this.$refs.registerFormRef.resetFields()
    },
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        // 对密码进行加密传输
        // eslint-disable-next-line no-undef
        this.loginForm.password = hexMd5(this.loginForm.password + KEY)
        const { data: res } = await this.$http.post('user/login', this.loginForm)
        if (!res.success) {
          this.$message.error('用户名或者密码错误')
        }
        this.$message.success('登录成功')
        this.$router.push('/home')
      })
    },
    register() {
      // 对密码进行加密传输
      // eslint-disable-next-line no-undef
      this.registerForm.password = hexMd5(this.registerForm.password + KEY)
      // eslint-disable-next-line no-undef
      this.registerForm.rePassword = hexMd5(this.registerForm.rePassword + KEY)
      this.$refs.registerFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('user/register', this.registerForm)
        if (!res.success) {
          this.$message.error('注册失败,用户名已经存')
          this.$refs.registerFormRef.resetFields()
        }
        this.$message.success('注册成功')
        this.registerVisible = false
        console.log(res)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;

      background-color: #eee;
    }
  }
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
