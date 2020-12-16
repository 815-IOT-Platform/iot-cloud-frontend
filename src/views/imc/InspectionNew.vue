<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-form @submit="handleSubmit" :form="form">
      <a-form-item
        label="临时巡检任务名称"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          v-decorator="[
            'taskName',
            {rules: [{ required: true, message: '请输入临时巡检任务名称' }]}
          ]"
          name="taskName"
          placeholder="请输入临时巡检任务名称" />
      </a-form-item>
      <a-form-item
        label="项目名称"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-select
          v-decorator="[
            'project',
            {rules: [{ required: true, message: '请选择维修项目' }]}
          ]"
          name="project"
          placeholder="请选择维修项目" />
      </a-form-item>
      <a-form-item
        label="服务商公司名称"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          v-decorator="[
            'facilitatorName',
            {rules: [{ required: true, message: '请输入服务方名称' }]}
          ]"
          name="facilitatorName"
          placeholder="请输入服务方名称"
          disabled="true" />
      </a-form-item>
      <a-form-item
        label="服务商公司编号"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          v-decorator="[
            'facilitatorId',
            {rules: [{ required: true, message: '请输入服务方Id' }]}
          ]"
          name="facilitatorId"
          placeholder="请输入服务方Id"
          disabled="true"/>
      </a-form-item>
      <a-form-item
        label="用户负责人名称"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          v-decorator="[
            'principalName',
            {
              initialValue: userDetail.userName,
              rules: [{ required: true, message: '请输入用户负责人名称' }]
            }
          ]"
          name="principalName"
          placeholder="请输入用户负责人名称"
          disabled="true" />
      </a-form-item>
      <a-form-item
        label="用户负责人编号"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          v-decorator="[
            'principalId',
            {
              initialValue: userDetail.userId,
              rules: [{ required: true, message: '请输入用户负责人编号' }]
            }
          ]"
          name="principalId"
          placeholder="请输入用户负责人编号"
          disabled="true" />
      </a-form-item>
      <a-form-item
        label="预计开始时间"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-date-picker
          name="scheduledStartTime"
          style="width: 50%"
          show-time
          v-decorator="[
            'scheduledStartTime',
            {rules: [{ required: true, message: '请选择预计开始时间' }]}
          ]"
          placeholder="请选择预计开始时间"/>
      </a-form-item>
      <a-form-item
        label="巡检任务内容"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-textarea
          rows="4"
          placeholder="请输入巡检任务内容"
          v-decorator="[
            'content',
            {rules: [{ required: true, message: '请输入巡检任务内容' }]}
          ]" />
      </a-form-item>
      <a-form-item
        label="巡检周期"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 2}, sm: {span: 17} }">
        <a-input
          placeholder="巡检周期"
          v-decorator="[
            'frequency',
            {rules: [{ required: false, message: '巡检周期' }]}
          ]" />
      </a-form-item>
      <a-form-item
        label="持续时间"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 2}, sm: {span: 17} }">
        <a-input
          placeholder="持续时间"
          v-decorator="[
            'days',
            {rules: [{ required: false, message: '持续时间' }]}
          ]" />
      </a-form-item>
      <a-form-item
        label="点位个数"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 2}, sm: {span: 17} }">
        <a-input
          placeholder="点位个数"
          v-decorator="[
            'pointSum',
            {rules: [{ required: false, message: '点位个数' }]}
          ]" />
      </a-form-item>
      <a-form-item
        :wrapperCol="{ span: 24 }"
        style="text-align: center"
      >
        <a-button htmlType="submit" type="primary">新建</a-button>
        <a-button style="margin-left: 8px" @click="handleCancel">取消</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { saveImcTask } from '@/api/imc'

export default {
  name: 'InspectionNew',
  data () {
    return {
      value: 1,
      // form
      form: this.$form.createForm(this),
      uploadUrl: process.env.VUE_APP_API_BASE_URL + '/system/oss/upload',
      headers: {
        token: Vue.ls.get(ACCESS_TOKEN)
      },
      projectOptions: [],
      userDetail: {
        userId: this.$store.state.user.userId,
        userName: this.$store.state.user.name
      }

    }
  },
  methods: {

    // handler
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        const { getFieldValue } = this.form
        const value = this.form.getFieldsValue()
        if (!err) {
          // eslint-disable-next-line no-console
          console.log('Received values of form: ', values)
        }
        value.inspectionType = 0
        value.scheduledStartTime = getFieldValue('scheduledStartTime').format('YYYY-MM-DD HH:mm:ss')
        saveImcTask(value).then(res => {
          console.log(res)
          this.$router.push('/imc/inspectionTask')
        })
      })
    },
    handleCancel () {
      this.$router.push('/imc/inspectionTask')
    }
  }
}
</script>

<style scoped>
</style>
