<template>
  <div>
    <el-card style="height: 700px;">
      <!-- 提示区域 -->
      <el-alert title="添加商品信息" type="info" center show-icon :closable="false"> </el-alert>
      <!-- 步骤条区域 -->
      <el-steps :space="300" :active="activeIndex - 0" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!-- tab栏区域 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px" class="demo-ruleForm" label-position="top">
        <el-tabs tab-position="left" v-model="activeIndex" :before-leave="beforeTabLeave">
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="gname">
              <el-input v-model="addForm.gname"></el-input>
            </el-form-item>
            <el-form-item label="商品类型" prop="gtype">
              <el-input v-model="addForm.gtype"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="gprice">
              <el-input v-model="addForm.gprice" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="gstock">
              <el-input v-model="addForm.gstock" type="number"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <el-form-item label="款式">
              <div style="margin-top: 20px">
                <el-checkbox-group v-model="checkboxGroup1" size="small">
                  <el-checkbox label="4k超清曲屏百万像素" border></el-checkbox>
                  <el-checkbox label="8k超清曲屏百万像素" border></el-checkbox>
                  <el-checkbox label="16k超清曲屏百万像素" border></el-checkbox>
                  <el-checkbox label="64k超清曲屏百万像素" border></el-checkbox>
                </el-checkbox-group>
              </div>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <el-upload class="upload-demo" :auto-upload="false" :action="uploadURL" :on-preview="handlePreview" :on-remove="handleRemove" list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品描述" name="4">
            <quill-editor v-model="addForm.other"></quill-editor>
            <el-button type="primary" style="margin-top: 15px;" @click="addGood">添加商品</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
    <!-- 图片预览 -->
    <el-dialog title="图片预览" :visible.sync="previewVisible" width="50%">
      <img :src="previewpPath" alt="" width="100%" />
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 被选中的项
      checkboxGroup1: [],
      // 上传图片到后台的地址
      uploadURL: '/a',
      activeIndex: '0',
      flag: 'true',
      // 放大视图路径
      previewpPath: '',
      previewVisible: false,
      addForm: {
        uid: 0,
        gname: '',
        gtype: '',
        gprice: '',
        gstock: '',
        other: ''
      },
      addFormRules: {
        gname: [
          {
            required: true,
            message: '请输入商品名称',
            trigger: 'blur'
          }
        ],
        gtype: [
          {
            required: true,
            message: '请输入商品分类',
            trigger: 'blur'
          }
        ],
        gprice: [
          {
            required: true,
            message: '请输入商品价格',
            trigger: 'blur'
          },
          {
            pattern: /^\+?[1-9]\d*$/,
            message: '商品数量不能小于等于0',
            trigger: 'blur'
          }
        ],
        gstock: [
          {
            required: true,
            message: '请输入商品数量',
            trigger: 'blur'
          },
          {
            pattern: /^\+?[1-9]\d*$/,
            message: '商品数量不能小于等于0',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 步骤条
    beforeTabLeave(activeName, oldActiveName) {
      if (oldActiveName === '0' && (this.addForm.gname.length <= 0 || this.addForm.gtype.length <= 0 || this.addForm.gstock.length <= 0 || this.addForm.gprice.length <= 0)) {
        this.$message.error('请先完成商品基本信息')
        return false
      }
      this.$refs.addFormRef.validate(valid => {
        if (!valid) {
          this.$message.error('请填正确的商品基本信息')
          this.flag = false
        } else {
          this.flag = true
        }
      })
      if (!this.flag) {
        return false
      }
    },
    handlePreview(file) {
      this.previewpPath = file.response.data.url
      this.previewVisible = true
    },
    handleRemove() {},
    async addGood() {
      const { data: res } = await this.$http.post('/goods/manage/add', this.addForm)
      if (!res.success) return this.$message.error('发布商品失败')
      this.$message.success('发布商品成功！')
      this.$router.push('/goods')
    }
  },
  created() {
    this.addForm.uid = window.sessionStorage.getItem('userId')
  }
}
</script>
<style lang="less" scoped>
.el-step {
  margin: 15px 0;
}
.el-step_title {
  font-size: 13px;
}
</style>
