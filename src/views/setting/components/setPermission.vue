<template>
  <el-dialog
    title="提示"
    :visible="dialogVisible"
    width="50%"
    @close="onClose"
    @open="onOpen"
  >
    <el-tree
      ref="tree"
      show-checkbox
      default-expand-all
      node-key="id"
      :data="data"
      :props="defaultProps"
      :default-checked-keys="defCheckKeys"
    />
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="saveRolePermission">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getPermissionList } from '@/api/permisson'
import { getRolesInfo, setRolesPermission } from '@/api/role'
import { transListToTreeData } from '@/utils'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      required: true
    },
    roleId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      data: [],
      defaultProps: {
        // children: 'children',
        label: 'name'
      },
      defCheckKeys: []
    }
  },
  methods: {
    onClose() {
      this.$emit('update:dialogVisible', false)
    },
    async onOpen() {
      const res = await getPermissionList()
      this.data = transListToTreeData(res, '0')
      this.getRolePermissions()
    },
    async getRolePermissions() {
      const res = await getRolesInfo(this.roleId)
      this.defCheckKeys = res.permIds
    },
    async saveRolePermission() {
      const id = this.roleId
      const permIds = this.$refs.tree.getCheckedKeys()
      await setRolesPermission({ id, permIds })
      this.$message.success('分配成功')
      this.onClose()
    }
  }
}
</script>

<style>

</style>
