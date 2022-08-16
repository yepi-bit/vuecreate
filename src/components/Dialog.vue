<template>
  <div>
    <el-dialog
        :title="title"
        :close-on-click-modal="false"
        v-model="dialogVisible"
        :modal="false"
        width="600px">

      <el-form :model="formData" label-width="100px" class="form-box">
        <el-form-item label="时间">
          <el-input v-model="formData.date" style="width:450px;"></el-input>
        </el-form-item>
        <el-form-item label="名字">
          <el-input v-model="formData.name" style="width:450px;"></el-input>
        </el-form-item>
        <el-form-item label="简介">
          <el-input type="textarea" v-model="formData.address" style="width:450px;"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
		<el-button @click="submitForm('formData')">确 定</el-button>
	</span>
    </el-dialog>
  </div>
</template>

<script>
import {cloneDeep} from 'lodash'

export default {
  data() {
    return {
      title: "默认标题",
      dialogVisible: false,
      formData: {
        address: '',
        date:'',
        name:'',
        id:''
      },
    };
  },
  methods: {
    openDialog(f, title, val) {
      this.title = title;
      this.formData.name = cloneDeep(val.name);//val.id
      this.formData.date = cloneDeep(val.date);
      this.formData.address = cloneDeep(val.address);
      this.dialogVisible = f;
    },
    submitForm() {
      this.$emit('refresData');
      // 关闭弹窗
    }
  }
};
</script>
