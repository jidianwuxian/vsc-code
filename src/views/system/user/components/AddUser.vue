<script setup>
const props = defineProps({
  id: {
    type: String,
    default: '111'
  },
  visible: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:visible', 'create', 'update'])
const formRef = ref(null)
const formData = reactive({
  name: '',
  username: '',
  password: '',
  roleName: '',
  status: '',
  email: '',
  tel: ''

})
const formRules = reactive({
  name: [{ required: true, trigger: 'blur', message: '请输入真实姓名！' }],
  password: [{ required: true, trigger: 'blur', message: '请输入密码！' }],
  username: [{ required: true, trigger: 'blur', message: '请输入账号！' }],
  roleName: [{ required: true, trigger: 'blur', message: '请选择角色！' }]
})
// console.log(id)
const handleCreate = () => {
  // console.log(id)
  formRef.value?.validate((valid) => {
    if (valid) {
      if (!props.id) {
        emit('create', formData)
      } else {
        emit('update', formData)
      }
    } else {
      return false
    }
  })
}
const resetForm = () => {
  emit('update:visible')
  formData.username = ''
  formData.password = ''
  formData.name = ''
  formData.roleName = ''
  formData.email = ''
  formData.tel = ''
  formData.status = ''

}
const open = (row) => {
  console.log(row)
  formData.username=row.username // 添加 → 重置了表单内容，编辑 → 存储了需要回显的数据
  formData.password=row.password 
  formData.name=row.name 
  formData.roleName=row.roleName 
  formData.email=row.email 
  formData.tel=row.tel 
  formData.status=row.status
  
}
defineExpose({
  open
})
</script>

<template>
  <el-dialog :modelValue="visible" :title="id ? '修改用户' : '新增用户'" @close="resetForm" width="60%">

    <el-form ref="formRef" :model="formData" :rules="formRules" label-width="80px">
      <div class="flex flex-wrap">
        <div class="w-1/2 px-4">
          <el-form-item prop="name" label="账号">
            <el-input v-model="formData.name" placeholder="请输入真实姓名" />
          </el-form-item>
        </div>
        <div class="w-1/2 px-4">
          <el-form-item prop="password" label="密码">
            <el-input v-model="formData.password" placeholder="请输入密码" />
          </el-form-item>
        </div>
      </div>
      <div class="flex flex-wrap">
        <div class="w-1/2 px-4">
          <el-form-item prop="username" label="用户名">
            <el-input v-model="formData.username" placeholder="请输入用户名" />
          </el-form-item>
        </div>
        <div class="w-1/2 px-4">
          <!-- <el-form-item prop="roleName" label="角色">
            <el-input v-model="formData.roleName" placeholder="请选择角色" />
          </el-form-item> -->
          <el-form-item prop="roleName" label="角色">
            <el-select v-model="formData.roleName" placeholder="选择角色">
            <el-option label="管理员" value="管理员"></el-option>
            <el-option label="管制经理" value="管制经理"></el-option>
            <el-option label="塔台管制员" value="塔台管制员"></el-option>
          </el-select>
          </el-form-item>
          
        </div>
      </div>
      <div class="flex flex-wrap">
        <div class="w-1/2 px-4">
          <el-form-item prop="status" label="状态">
            <el-input v-model="formData.status" placeholder="请选择状态" />
          </el-form-item>
        </div>
        <div class="w-1/2 px-4">
          <el-form-item prop="tel" label="联系电话">
            <el-input v-model="formData.tel" placeholder="请输入联系电话" />
          </el-form-item>
        </div>
      </div>
      <div class="flex flex-wrap">
        <div class="w-1/2 px-4">
          <el-form-item prop="email" label="邮箱地址">
            <el-input v-model="formData.email" placeholder="请输入邮箱地址" />
          </el-form-item>
        </div>

      </div>
    </el-form>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handleCreate">确认</el-button>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
