<script setup>
import { createTableDataApi, deleteTableDataApi, updateTableDataApi, queryUser } from '@/api/system/user'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, Refresh, Plus, Delete } from '@element-plus/icons-vue'
import { usePagination } from '@/hooks/usePagination'
import AddUser from './components/AddUser.vue'

const loading = ref(false)
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

const pageData = reactive({
  isShowAddDialog: false,
  editingId: ''
})

const filterText = ref('')
const treeRef = ref()
const treeData = [
  {
    id: 1,
    label: '工作台',
  },
  {
    id: 2,
    label: 'Screen',
  },
  {
    id: 3,
    label: '系统管理',
    children: [
      {
        id: 5,
        label: '用户管理',
      },
      {
        id: 6,
        label: '角色管理',
      },
      {
        id: 7,
        label: '菜单管理',
      },
    ]
  },
  {
    id: 4,
    label: '进程单管理',
    children: [
      {
        id: 8,
        label: '历史记录'
      },
      {
        id: 9,
        label: '后续计划'
      },
      {
        id: 10,
        label: '统计分析'
      }
    ]
  },
  
]

const defaultProps = {
  children: 'children',
  label: 'label'
}

watch(filterText, (val) => {
  treeRef.value.filter(val)
})

const filterNode = (value, data) => {
  if (!value) return true
  return data.label.includes(value)
}

const createUser = (record) => {
  createTableDataApi({
    username: record.username,
    password: record.password,
    roleName: record.roleName,
    status: record.status,
    email: record.email,
    tel: record.tel,
    name: record.name,
  }).then(() => {
    ElMessage.success('新增成功')
    pageData.isShowAddDialog = false
    getTableData()
  })
}

const updateUser = (record) => {
  updateTableDataApi({
    id: pageData.editingId,
    username: record.username,
    password: record.password,
    roleName: record.roleName,
    status: record.status,
    email: record.email,
    tel: record.tel,
    name: record.name,
  }).then(() => {
    ElMessage.success('修改成功')
    pageData.isShowAddDialog = false
    getTableData()
  })
}
const multipleSelection=ref([])
const handleSelectionChange = (vals) => {
  vals.forEach((val) => {
    multipleSelection.value.push(val.id)
  })
}

const batchDelete = () => {
  // debugger
  console.log(JSON.stringify(multipleSelection.value))
  ElMessageBox.confirm('确定批量删除？', 'Warning', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() =>{
    deleteTableDataApi(multipleSelection.value).then(() => {
      ElMessage.success('删除成功')
      getTableData()
    })
  })
}
const handleDelete = (row) => {
  ElMessageBox.confirm(`正在删除用户：${row.name}，确认删除？`, 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    deleteTableDataApi(row.id).then(() => {
      ElMessage.success('删除成功')
      getTableData()
    })
  })
}
const dialog = ref()
const handleUpdate = (row) => {
  pageData.editingId = row.id
  pageData.isShowAddDialog = true
  dialog.value.open(row)
}

const tableData = ref([])
const searchFormRef = ref()
const searchData = reactive({
  username: '',
  tel: ''
})
const getTableData = () => {
  loading.value = true
  queryUser({
    page: paginationData.currentPage,
    pageSize: paginationData.pageSize,
    username: searchData.username || undefined,
    tel: searchData.tel || undefined
  })
    .then((res) => {
      paginationData.total = res.data.total
      tableData.value = res.data.rows
    })
    .catch(() => {
      tableData.value = []
    })
    .finally(() => {
      loading.value = false
    })
}
const handleSearch = () => {
  if (paginationData.currentPage === 1) {
    getTableData()
  }
  paginationData.currentPage = 1
}
const resetSearch = () => {
  searchFormRef.value?.resetFields()
  if (paginationData.currentPage === 1) {
    getTableData()
  }
  paginationData.currentPage = 1
}

watch([() => paginationData.currentPage, () => paginationData.pageSize], getTableData, { immediate: true })
getTableData()
</script>

<template>
  <div class="app-container">
    <div class="flex">
      <div class="mr-6 w-1/4">
        <el-input v-model="filterText" :prefix-icon="Search" placeholder="搜索" clearable />
        <el-tree
          ref="treeRef"
          class="filter-tree mt-4"
          :data="treeData"
          node-key="id"
          :props="defaultProps"
          default-expand-all
          :filter-node-method="filterNode"
          show-checkbox
        />
      </div>
      <div class="flex-grow w-3/4">
        <div shadow="never" class="search-wrapper">
          <el-form ref="searchFormRef" :inline="true" :model="searchData">
            <el-form-item prop="username" label="用户名">
              <el-input v-model="searchData.username" placeholder="请输入用户名" />
            </el-form-item>
            <el-form-item prop="phone" label="手机号">
              <el-input v-model="searchData.tel" placeholder="请输入手机号" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" :icon="Search" @click="handleSearch">查询</el-button>
              <el-button :icon="Refresh" @click="resetSearch">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div v-loading="loading" shadow="never">
          <div class="toolbar-wrapper">
            <div>
              <el-button type="primary" plain :icon="Plus" @click="pageData.isShowAddDialog = true,pageData.editingId=''">新增用户</el-button>
              <el-button type="danger" plain :icon="Delete" @click="batchDelete()">批量删除</el-button>
            </div>
          </div>
          <div class="table-wrapper">
            <el-table :data="tableData" max-height="64vh" ref="myTable" @selection-change="handleSelectionChange">
              <el-table-column fixed type="selection" min-width="50" align="center" />
              <el-table-column fixed prop="username" label="用户名" min-width="120" align="center" />
              <el-table-column fixed prop="name" label="真实姓名" min-width="120" align="center" />
              <el-table-column prop="roleName" label="角色" min-width="120" align="center">
                <template #default="scope">
                  <el-tag v-if="scope.row.roleName === '管理员'" type="success" effect="plain">管理员</el-tag>
                  <el-tag v-if="scope.row.roleName === '管制经理'" effect="plain">管制经理</el-tag>
                  <el-tag v-if="scope.row.roleName === '塔台管制员'" type="warning" effect="plain">塔台管制员</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="tel" label="手机号" min-width="150" align="center" />
              <el-table-column prop="email" label="邮箱" min-width="150" align="center" />
              <el-table-column prop="status" label="状态" min-width="120" align="center">
                <template #default="
                  scope">
                  <el-tag v-if="scope.row.status===1" type="success" effect="plain">启用</el-tag>
                  <el-tag v-else type="danger" effect="plain">禁用</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="createDate" label="创建时间" min-width="150" align="center" />
              <el-table-column fixed="right" label="操作" min-width="150" align="center">
                <template #default="scope">
                  <el-button type="primary" text bg size="small" @click="handleUpdate(scope.row)">修改</el-button>
                  <el-button type="danger" text bg size="small" @click="handleDelete(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="flex justify-end">
            <el-pagination
              background
              :layout="paginationData.layout"
              :page-sizes="paginationData.pageSizes"
              :total="paginationData.total"
              :page-size="paginationData.pageSize"
              :currentPage="paginationData.currentPage"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :small="true"
            />
          </div>
        </div>
      </div>
    </div>
    <AddUser
      v-model:visible="pageData.isShowAddDialog"
      :id="pageData.editingId"
      ref="dialog"
      @create="createUser"
      @update="updateUser"
    />
  </div>
</template>

<style lang="scss" scoped>
.search-wrapper {
  :deep(.el-card__body) {
    padding-bottom: 2px;
  }
}

.toolbar-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  :deep(.el-button) {
    padding: 6px 12px;
  }
}

.table-wrapper {
  margin-bottom: 20px;
}
</style>
