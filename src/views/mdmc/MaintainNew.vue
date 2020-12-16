<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-form @submit="handleSubmit" :form="form">

      <a-form-item label="维修任务名称" :labelCol="{lg: {span: 7}, sm: {span: 7}}" :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input v-decorator="['title',{rules: [{ required: true, message: '请输入维修任务名称' }]} ]" name="title" placeholder="请输入维修任务名称" />
      </a-form-item>

      <a-form-item label="项目名称" :labelCol="{lg: {span: 7}, sm: {span: 7}}" :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-select v-decorator="['projectId', {rules: [{ required: true, message: '请选择维修项目' }]}]"placeholder="请选择维修项目">
          <a-select-option :value="'0'">紧急</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="审核人名称" :labelCol="{lg: {span: 7}, sm: {span: 7}}" :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input v-decorator="[ 'principalId', {rules: [{ required: true, message: '请输入审核人名称' }]} ]" name="principalId" placeholder="请输入审核人名称" />
      </a-form-item>

      <a-form-item label="服务商名称" :labelCol="{lg: {span: 7}, sm: {span: 7}}" :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input v-decorator="[ 'facilitatorId',{rules: [{ required: true, message: '请输入服务商名称' }]}]" name="facilitatorId"placeholder="请输入服务商名称"/>
      </a-form-item>

      <a-form-item label="值机员(报修人)姓名" :labelCol="{lg: {span: 7}, sm: {span: 7}}" :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-select v-decorator="['userId', {rules: [{ required: true, message: '请选择值机员' }]}]" placeholder="请选择值机员">
          <a-select-option :value="'0'">紧急</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="值机员(报修人)电话" :labelCol="{lg: {span: 7}, sm: {span: 7}}" :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input v-decorator="['creatorCall', {rules: [{ required: true, message: '请输入值机员电话' }]}]"name="call"placeholder="请输入值机员电话"/>
      </a-form-item>

      <a-form-item label="预约时间" :labelCol="{lg: {span: 7}, sm: {span: 7}}" :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-date-picker name="appointTime" style="width: 50%" show-time v-decorator="['appointTime',{rules: [{ required: true, message: '请选择预约时间' }]}]" />
      </a-form-item>
      <a-form-item label="最晚维修时间":labelCol="{lg: {span: 7}, sm: {span: 7}}" :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-date-picker name="deadline" style="width: 50%" show-time v-decorator="['deadline',{rules: [{ required: true, message: '请选择最晚维修时间' }]}]" />
      </a-form-item>

      <a-form-item label="紧急程度" :labelCol="{lg: {span: 7}, sm: {span: 7}}":wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-select v-decorator="['level', {rules: [{ required: true, message: '紧急程度' }]}]"placeholder="请选择紧急程度">
          <a-select-option :value="'0'">紧急</a-select-option>
          <a-select-option :value="'1'">一般紧急</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="设备类型" :labelCol="{lg: {span: 7}, sm: {span: 7}}" :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-select v-decorator="['deviceType', {rules: [{ required: true, message: '设备类型' }]}]" placeholder="请选择设备类型">
          <a-select-option :value="'0'">紧急</a-select-option>
          <a-select-option :value="'1'">一般紧急</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="故障类型":labelCol="{lg: {span: 7}, sm: {span: 7}}":wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-select v-decorator="['troubleType', {rules: [{ required: true, message: '故障类型' }]}]" placeholder="请选择故障类型">
          <a-select-option :value="'0'">紧急</a-select-option>
          <a-select-option :value="'1'">一般紧急</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="故障地址":labelCol="{lg: {span: 7}, sm: {span: 7}}":wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-select v-decorator="['troubleAddress', {rules: [{ required: true, message: '故障地址' }]}]" placeholder="请选择故障地址">
          <a-select-option :value="'0'">紧急</a-select-option>
          <a-select-option :value="'1'">一般紧急</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :labelCol="{lg: {span: 7}, sm: {span: 7}}":wrapperCol="{lg: {span: 10}, sm: {span: 17} }"label="故障描述">
        <a-textarea :rows="5" v-decorator="['description',{rules: [{ required: true, message: '请输入故障描述' }]}]"placeholder="请输入故障描述..."/>
      </a-form-item>
      <a-form-item label="故障现场":labelCol="{lg: {span: 7}, sm: {span: 7}}":wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-upload name="attachmentIdList" :action="uploadUrl" :headers="headers" :showUploadList="false" @change="uploadChange">
          <a-button icon="upload"> 文件上传</a-button>
        </a-upload>
      </a-form-item>
      <a-form-item label="预算费用":labelCol="{lg: {span: 7}, sm: {span: 7}}":wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input v-decorator="[ 'totalCost',{rules: [{ required: false, message: '请输入总花费' }]} ]"placeholder="请输入总花费" />
      </a-form-item>

      <a-form-item :wrapperCol="{ span: 24 }" style="text-align: center">
        <a-button htmlType="submit" type="primary">提交</a-button>
        <a-button style="margin-left: 8px">保存</a-button>
      </a-form-item>

    </a-form>
  </a-card>
</template>

<script>
import { mdmcTaskSave } from '@/api/mdmc'
import { ACCESS_TOKEN } from '@/store/mutation-types'

import Vue from 'vue'
export default {
  name: 'MaintainNew',
  data () {
    return {
      uploadUrl: process.env.VUE_APP_API_BASE_URL + '/system/oss/upload',
      headers: {
        token: Vue.ls.get(ACCESS_TOKEN)
      },
      troubleInfo: {},
      mdmcAddTaskItemDtoList: {},
      project: [],
      // form
      form: this.$form.createForm(this)
    }
  },
  methods: {
    // handler
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, fieldsValue) => {
        if (err) {
          return
        }
        const values = {
          ...fieldsValue,
          'appointTime': fieldsValue['appointTime'].format('YYYY-MM-DD HH:mm:ss'),
          'deadline': fieldsValue['deadline'].format('YYYY-MM-DD HH:mm:ss')
        }
        values.userId = 2
        values.mdmcAddTaskItemDtoList = []
        this.mdmcAddTaskItemDtoList.deviceType = values.deviceType
        this.mdmcAddTaskItemDtoList.level = values.level
        this.mdmcAddTaskItemDtoList.troubleAddress = values.troubleAddress
        this.mdmcAddTaskItemDtoList.troubleType = values.troubleType
        this.mdmcAddTaskItemDtoList.description = values.description
        values.mdmcAddTaskItemDtoList = [this.mdmcAddTaskItemDtoList]
        mdmcTaskSave(values).then(res => {
          console.log('子项是否保存成功' + JSON.stringify(res))
          this.$router.push('/mdmc/MaintainTask')
        })
      })
    },
    uploadChange (info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        this.$refs.table.refresh(true)
      }
    }
  }
}
</script>

<style scoped>
</style>
