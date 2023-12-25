<script setup>
import { queryPlan } from '@/api/strip/plan'
import { Search, Refresh } from '@element-plus/icons-vue'

const loading = ref(false)

const tableData = ref([])
const searchFormRef = ref(null)

const datePick2 = ref('')
const searchData = reactive({
  airname: '',
  username: '',
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
  queryPlan({
    username: searchData.username || undefined,
    fname: searchData.airname || undefined,
    fcompany: searchData.fcompany || undefined,
    start: changeTimeFormat((datePick2.value)[0]) || undefined,
    end: changeTimeFormat((datePick2.value)[1]) || undefined,
    startLocation: searchData.startLocation || undefined,
    endLocation: searchData.endLocation || undefined,
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
const resetSearch = () => {
  // datePick.value = '',
  searchData.username = '',
  searchData.airname = '',
  searchData.fcompany = '',
  searchData.startLocation = '',
  searchData.endLocation = '',
  datePick2.value = ['', ''],
  getTableData()
}


const tableRowClassName=({row, rowIndex})=> {
        if (row.is_state === 2) {
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
          <el-button type="primary" :icon="Search" @click="getTableData">查询</el-button>
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
          <el-table-column label="起始地" prop="start_location" min-width="" align="center"/>
          <el-table-column label="目的地" prop="end_location" min-width="" align="center"/>
          <el-table-column prop="upplan_time" min-width="120" label="预计起飞时间" align="center" />
          <el-table-column prop="upfact_time" min-width="120" label="实际起飞时间" align="center" />
          <el-table-column prop="downplan_time" min-width="120" label="预计降落时间" align="center" />
          <el-table-column prop="downfact_time" min-width="120" label="实际降落时间" align="center" />

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
