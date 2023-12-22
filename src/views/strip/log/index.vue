<script setup>
import { queryLog } from '@/api/system/log'
import { Search, Refresh } from '@element-plus/icons-vue'
import { usePagination } from '@/hooks/usePagination'

const loading = ref(false)
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

const options = [
  {
    value: '1',
    label: '延误'
  },
  {
    value: '0',
    label: '准点'
  },
  {
    value: '2',
    label: '取消'
  }
]

const tableData = ref([])
const searchFormRef = ref(null)
// const datePick = ref('')
const datePick2 = ref('')
const searchData = reactive({
  airname: '',
  username: '',
  status: '',
  fcompany: '',
  startLocation: '',
  endLocation: '',
})
const changeTimeFormat = (date1) => {
  if (date1 == '' || date1===undefined) return null
  const date = new Date(date1);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate

}
const getTableData = () => {
  loading.value = true
  console.log((datePick2.value)[0])
  console.log(datePick2.value)
  queryLog({
    // currentPage: paginationData.currentPage,
    // size: paginationData.pageSize,
    username: searchData.username || undefined,
    fname: searchData.airname || undefined,
    isLate: searchData.status || undefined,
    fcompany: searchData.fcompany || undefined,
    // begin: changeTimeFormat(datePick.value) || undefined,
    start: changeTimeFormat((datePick2.value)[0]) || undefined,
    end: changeTimeFormat((datePick2.value)[1]) || undefined,
    startLocation: searchData.startLocation || undefined,
    endLocation: searchData.endLocation || undefined,
    // phone: searchData.phone || undefined
  })
    .then((res) => {
      
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
  // if (paginationData.currentPage === 1) {
  //   getTableData()
  // }
  getTableData()
  // paginationData.currentPage = 1
}
const resetSearch = () => {
  // datePick.value = '',
  searchData.username = '',
  searchData.airname = '',
  searchData.status = [],
  searchData.fcompany = '',
  searchData.startLocation = '',
  searchData.endLocation = '',
  datePick2.value = ['', ''],
  getTableData()
}


const tableRowClassName=({row, rowIndex})=> {
        if (row.isState === 1) {
          return 'warning-row';
        } else { 
          return 'success-row';
        }}
       
      

  getTableData()

</script>

<template>
  <div class="app-container">
    <el-backtop :bottom="100" target=".app-container">
      <div style="
        height: 100%;
        width: 100%;
        background-color: var(--el-bg-color-overlay);
        box-shadow: var(--el-box-shadow-lighter);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      ">
        UP
      </div>
    </el-backtop>
    <div shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item prop="airname" label="航班名称">
          <el-input v-model="searchData.airname" placeholder="请输入航班名称" />
        </el-form-item>
        <el-form-item prop="username" label="管制员名称">
          <el-input v-model="searchData.username" placeholder="请输入管制员名称" />
        </el-form-item>
        <el-form-item prop="status" label="状态">
          <el-select v-model="searchData.status" placeholder="请选择状态">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"
              :disabled="item.disabled" />
          </el-select>
        </el-form-item>
        <!-- <el-form-item>
          <span style="margin-right: 10px;">日期 </span>
          <el-date-picker v-model="datePick" align="right" type="date" placeholder="请选择日期" :disabled-date="disabledDate"
            :shortcuts="shortcuts">
          </el-date-picker>
        </el-form-item> -->
        <el-form-item prop="fcompany" label="航班公司">
          <el-input v-model="searchData.fcompany" placeholder="请输入航班公司" />
        </el-form-item>
        <el-form-item prop="startLocation" label="起始地">
          <el-input v-model="searchData.startLocation" placeholder="起始地" />
        </el-form-item>
        <el-form-item prop="endLocation" label="目的地">
          <el-input v-model="searchData.endLocation" placeholder="目的地" />
        </el-form-item>
        <el-form-item>
            <span style="margin-right: 10px;">日期 </span>
            <el-date-picker v-model="datePick2" type="daterange" range-separator="To" start-placeholder="开始日期"
              end-placeholder="结束日期" :size="size" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">查询</el-button>
          <el-button :icon="Refresh" @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-loading="loading" shadow="never">
      <div class="toolbar-wrapper">
      </div>
      <div class="table-wrapper">
        <el-table :data="tableData" :row-class-name="tableRowClassName">
          <el-table-column type="expand">
            <template #default="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="航班名称">
                  <span>{{ props.row.fname }}</span>
                </el-form-item>
                <el-form-item label="航班公司">
                  <span>{{ props.row.fcompany }}</span>
                </el-form-item>
                <span v-if="props.row.isLate==1">
                  <el-form-item label="晚点原因">
                  <span>{{ props.row.reason }}</span>
                </el-form-item>
                </span>
                
              </el-form>
            </template>
          </el-table-column>
          <el-table-column prop="fname" min-width="100" label="航班名称" align="center" />
          <el-table-column prop="username" min-width="100" label="管制员名称" align="center" />
          <el-table-column prop="isLate" min-width="80" label="状态" align="center">
            <template #default="scope">
              <el-tag v-if="scope.row.isLate==0" type="success" effect="plain">准点</el-tag>
              <el-tag v-if="scope.row.isLate==1" type="danger" effect="plain">延误</el-tag>
              <el-tag v-if="scope.row.isLate==2" type="info" effect="plain">取消</el-tag>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="isState" min-width="150" label="操作信息" align="center">
            <template #default="scope">
              <span v-if="scope.row.isState">降落</span>
              <span v-else>起飞</span>
            </template>
          </el-table-column> -->
          <el-table-column label="起始地" prop="startLocation" min-width="" align="center"/>
          <el-table-column label="目的地" prop="endLocation" min-width="" align="center"/>
          <el-table-column prop="upplanTime" min-width="120" label="预计起飞时间" align="center" />
          <el-table-column prop="upfactTime" min-width="120" label="实际起飞时间" align="center" />
          <el-table-column prop="downplanTime" min-width="120" label="预计降落时间" align="center" />
          <el-table-column prop="downfactTime" min-width="120" label="实际降落时间" align="center" />
          <!-- <el-table-column prop="opeTime" min-width="160" label="移交时间" align="center" /> -->
        </el-table>
      </div>
    </div>

  </div>
</template>

<style lang="scss">
.app-container {
  height: 100%;
  overflow-x: hidden;
}

.search-wrapper {
  :deep(.el-card__body) {
    padding-bottom: 2px;
  }
}

.toolbar-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.table-wrapper {
  margin-bottom: 20px;
}

.el-table .warning-row {
    background: rgb(171, 171, 238);
  }

  .el-table .success-row {
    background: rgb(242, 242, 153);
  }
.el-table .cancel-row{
  background: rgb(182, 181, 181);
}
</style>
