<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 实现页面的基本布局 -->
      <el-card class="tree-card">
        <!-- 用了一个行列布局 -->
        <!-- 缺少treeNode -->
        <tree-tools :tree-node="company" :is-root="false" @addDepts="addDepts" />
        <!--放置一个属性   这里的props和我们之前学习的父传子 的props没关系-->
      </el-card>
      <el-tree :data="departs" :props="defaultProps" default-expand-all>
        <!-- 说明el-tree里面的这个内容 就是插槽内容 => 填坑内容  => 有多少个节点循环多少次 -->
        <!-- scope-scope 是 tree组件传给每个节点的插槽的内容的数据 -->
        <!-- 顺序一定是 执行slot-scope的赋值 才去执行 props的传值 -->
        <tree-tools slot-scope="{ data }" :tree-node="data" @delDepts="getDepartments" @addDepts="addDepts" />
      </el-tree>
      <add-dept :show-dialog.sync="showDialog" :tree-node="currentNode" />
    </div>
  </div>
</template>

<script>
import { getDepartments } from '@/api/departments'
import treeTools from './components/tree-tools.vue'
import { transListToTreeData } from '@/utils'
import AddDept from './components/add-dept'
export default {
  name: 'HrsaasIndex',
  components: {
    AddDept,
    treeTools
  },
  data() {
    return {
      departs: [],
      showDialog: false,
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      },
      company: { name: '江苏传智播客教育科技股份有限公司', manager: '负责人' },
      currentNode: {}
    }
  },
  mounted() {
    this.getDepartments()
  },

  methods: {
    async getDepartments() {
      const result = await getDepartments()
      this.departs = transListToTreeData(result.depts, '')
      this.company = { name: result.companyName, manager: '负责人', id: '' }
    },
    addDepts(node) {
      this.showDialog = true // 显示弹层
      this.currentNode = node
    }
  }
}
</script>

<style lang="scss" scoped>
  .departments-container {
    width: 900px;
    margin: 20px auto;
    .el-tree {
      .el-tree-node__content {
        // padding-right: 20px;
      }
    }
  }
  </style>
