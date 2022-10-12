<template>
  <div class="app-container">
    <el-card>
      <el-tabs>
        <el-tab-pane label="登录账户设置">
          <!-- 放置表单 -->
          <el-form ref="userForm" :model="userInfo" :rules="rules" label-width="120px" style="margin-left: 120px; margin-top:30px">
            <el-form-item label="姓名:" prop="username">
              <el-input v-model="userInfo.username" style="width:300px" />
            </el-form-item>
            <el-form-item label="新密码:" prop="password">
              <el-input v-model="userInfo.password" style="width:300px" type="password" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" :loading="loading" @click="saveUser">更新</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="个人详情">
          <userInfo />
        </el-tab-pane>
        <el-tab-pane label="岗位信息">
          <jobInfo />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { getUserDetailById } from '@/api/user'
import { saveUserDetailById } from '@/api/employees'
import userInfo from './user-info.vue'
import jobInfo from './job-info.vue'
export default {
  components: {
    userInfo,
    jobInfo
  },
  data() {
    return {
      userId: this.$route.params.id, // 这样可以后面直接通过 this.userId进行获取数据
      userInfo: {
        //   专门存放基本信息
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, message: '密码最小6位', trigger: 'blur' }]
      },
      loading: false
    }
  },
  created() {
    this.getUserDetailById()
  },
  methods: {
    async getUserDetailById() {
      this.userInfo = await getUserDetailById(this.userId)
    },
    async saveUser() {
      try {
        await this.$refs.userForm.validate()
        await saveUserDetailById({ ...this.userInfo })
        this.$message.success('更新成功')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>

</style>
