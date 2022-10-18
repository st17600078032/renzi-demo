<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :show-before="false">
        <template #after>
          <el-button type="primary" @click="addPre(1,'0')">
            添加权限
          </el-button>
        </template>
      </page-tools>

      <!-- 表格 -->
      <el-table ref="table" :data="tableData" row-key="id" border>
        <el-table-column align="center" label="名称">
          <template slot-scope="{row}">
            <span @click="isshow(row)">
              <template v-if="row.type===1">
                <i class="el-icon-folder-opened" />
                {{ row.name }}
              </template>
              <template v-if="row.type === 2">
                <i style="margin-left:20px" class="el-icon-tickets" />
                {{ row.name }}
              </template>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="code" align="center" label="标识" />
        <el-table-column prop="description" align="center" label="描述" />
        <el-table-column align="center" label="操作">
          <template slot-scope="{row}">
            <el-button v-if="row.type===1" type="text" @click="addPre(2,row.id)">添加</el-button>
            <el-button type="text">编辑</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="新增权限" :visible.sync="showDialog" @close="onclose">
      <!-- 表单 -->
      <el-form ref="perForm" :model="formData" :rules="rules" label-width="120px">
        <el-form-item prop="name" label="权限名称">
          <el-input v-model="formData.name" style="width:90%" />
        </el-form-item>
        <el-form-item prop="code" label="权限标识">
          <el-input v-model="formData.code" style="width:90%" />
        </el-form-item>
        <el-form-item label="权限描述">
          <el-input v-model="formData.description" style="width:90%" />
        </el-form-item>
        <el-form-item label="开启">
          <el-switch
            v-model="formData.enVisible"
            active-value="1"
            inactive-value="0"
            active-color="skyblue"
            inactive-color="#ccc"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="qd">确定</el-button>
        <el-button @click="showDialog=false">取消</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { getPermissionList, addPermission } from '@/api/permisson.js'
import { transListToTreeData } from '@/utils/index'
export default {
  name: 'HrsaasIndex',

  data() {
    return {
      tableData: [],
      showDialog: false,
      formData: {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      },
      rules: {
        name: [{ required: true, message: '必须添加', trigger: 'blur' }],
        code: [{ required: true, message: '必须添加', trigger: 'blur' }]
      }
    }
  },

  mounted() {
    this.getPermission()
  },

  methods: {
    async getPermission() {
      const res = await getPermissionList()
      this.tableData = transListToTreeData(res, '0')
    },
    isshow(row) {
      row.isexpanded = !row.isexpanded
      this.$refs.table.toggleRowExpansion(row, row.isexpanded)
    },
    addPre(type, pid) {
      this.formData.type = type
      this.formData.pid = pid
      this.showDialog = true
    },
    qd() {
      this.$refs.perForm.validate(async valid => {
        if (!valid) {
          return
        }
        await addPermission(this.formData)
        this.$message.success('添加成功')
        this.showDialog = false
        this.getPermission()
      })
    },
    onclose() {
      this.formData = {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      }
      this.$refs.perForm.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-icon-arrow-right {
  display: none !important;
}
</style>
