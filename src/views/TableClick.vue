<template>
  <div>
    <el-table :data="tableData" @current-change="handleCurrentChange" :highlight-current-row="highlight"
              style="width: 50%;margin: auto">
      <el-table-column prop="date" label="Date" width="180"/>
      <el-table-column prop="name" label="Name" width="180"/>
      <el-table-column prop="address" label="Address"/>
    </el-table>
    <Dialog ref="archiveItem" @refresData="getDataList"/>
  </div>
</template>

<script setup>
import Dialog from '../components/Dialog.vue'
import {getCurrentInstance, onMounted, ref} from 'vue';

const highlight = ref(false)
let currentInstance = ''
onMounted(() => {

  currentInstance = getCurrentInstance()
})
const DialogValue = () => {
  currentInstance.ctx.$refs.archiveItem.openDialog(true, "活动详情", valueRow.value);
}
const getDataList = () => {
  currentInstance.ctx.$refs.archiveItem.openDialog(false, "活动详情", valueRow.value);
  highlight.value = false
  // 控制弹窗关闭后的数据
  // 向后台传递数据
}
const valueRow = ref('')
const handleCurrentChange = (row) => {
  valueRow.value = row
  highlight.value = true
  DialogValue()
}
// const rowClick = (row) => {
//   DialogValue(row)
// }
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  }
]
</script>
<style>

</style>
