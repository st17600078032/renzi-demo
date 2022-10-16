<template>
  <div class="app-container">
    <el-card>
      <el-tabs>
        <!-- 放置页签 -->
        <el-tab-pane label="角色管理">
          <!-- 新增角色按钮 -->
          <el-row style="height:60px">
            <el-button
              icon="el-icon-plus"
              size="small"
              type="primary"
              @click="handleAdd"
            >新增角色</el-button>
          </el-row>
          <!-- 表格 -->
          <el-table v-loading="loading" border="" :data="list">
            <el-table-column align="center" type="index" label="序号" width="120" />
            <el-table-column align="center" prop="name" label="名称" width="240" />
            <el-table-column align="center" prop="description" label="描述" />
            <el-table-column align="center" label="操作">
              <template slot-scope="{row}">
                <el-button size="small" type="success" @click="setPermission(row)">分配权限</el-button>
                <el-button size="small" type="primary" @click="editRole(row)">编辑</el-button>
                <el-button size="small" type="danger" @click="deleteRole(row.id)">删除</el-button>
              </template>
            </el-table-column>

          </el-table>
          <!-- 分页组件 -->
          <el-row type="flex" justify="center" align="middle" style="height: 60px">
            <!-- 分页组件 -->
            <el-pagination
              v-if="total>0"
              background
              layout="prev, pager, next, sizes, total"
              :loading="loading"
              :total="total"
              :current-page.sync="page.page"
              :page-size.sync="page.pagesize"
              :page-sizes="[10, 20, 30, 40]"
              @current-change="changePage"
              @size-change="changeSize"
            />
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="公司信息">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          />
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <addRole
      ref="addRole"
      :dialog-visible.sync="dialogVisible"
      @refreshList="getRoleList"
    />
    <setPermission :role-id="roleId" :dialog-visible.sync="dialogVisibleSetPermission" />
  </div>
</template>

<script>
import { getRoleList, deleteRole, getCompanyInfo } from '@/api/setting'
import addRole from './components/addRole.vue'
import { mapGetters } from 'vuex'
import setPermission from './components/setPermission.vue'

export default {
  components: {
    addRole,
    setPermission
  },
  data() {
    return {
      page: {
        // 放置页码及相关数据
        page: 1,
        pagesize: 10
      },
      total: 0, // 记录总数
      list: [],
      loading: false,
      dialogVisible: false,
      dialogVisibleSetPermission: false,
      roleId: ''
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  created() {
    this.getCompanyInfo()
  },
  mounted() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      try {
        this.loading = true
        const { total, rows } = await getRoleList(this.page)
        this.total = total
        this.list = rows
        if (total > 0 && rows.length === 0) {
          this.page.page--
          this.getRoleList()
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    changePage(val) {
      this.page.page = val
      this.getRoleList()
    },
    changeSize(val) {
      this.page.pagesize = val
      this.getRoleList()
    },
    handleAdd() {
      this.dialogVisible = true
    },
    editRole(row) {
      this.$refs.addRole.roleForm = { ...row }
      this.dialogVisible = true
    },
    async deleteRole(id) {
      //  提示
      try {
        await this.$confirm('确认删除该角色吗', '删除提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定'
        })
        // 只有点击了确定 才能进入到下方
        await deleteRole(id) // 调用删除接口
        this.getRoleList() // 重新加载数据
        this.$message.success('删除角色成功')
      } catch (error) {
        console.log(error)
      }
    },
    async getCompanyInfo() {
      this.formData = await getCompanyInfo(this.companyId)
    },
    setPermission(row) {
      this.dialogVisibleSetPermission = true
      this.roleId = row.id
    }
  }
}
</script>
