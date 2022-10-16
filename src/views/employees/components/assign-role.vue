<template>
  <el-dialog
    title="提示"
    :visible="dialogVisible"
    width="50%"
    @close="onClose"
    @open="onOpen"
  >
    <template>
      <el-checkbox-group v-model="checkList">
        <el-checkbox v-for="item in roles" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
      </el-checkbox-group>
    </template>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:dialogVisible',false)">取 消</el-button>
      <el-button type="primary" @click="saveEmployessRole">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getRoles } from '@/api/role'
import { getUserDetailById } from '@/api/user'
import { setEmployessRoles } from '@/api/employees'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      required: true
    },
    userid: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      checkList: [],
      roles: []
    }
  },
  methods: {
    onClose() {
      this.$emit('update:dialog-visible', false)
    },
    async onOpen() {
      const { rows } = await getRoles()
      this.roles = rows
      this.getEmployessRoles()
    },
    async  getEmployessRoles() {
      const res = await getUserDetailById(this.userid)
      this.checkList = res.roleIds || []
    },
    async saveEmployessRole() {
      if (!this.checkList.length) return this.$message.error('请勾选必要的角色')
      try {
        await setEmployessRoles({
          id: this.userid,
          roleIds: this.checkList
        })
        this.$message.success('分配成功')
        this.onClose()
      } catch (error) {
        this.$message.error('分配失败')
      }
    }
  }
}
</script>

<style>

</style>
