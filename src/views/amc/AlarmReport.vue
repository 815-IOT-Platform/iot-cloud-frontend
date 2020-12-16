<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-form @submit="handleSubmit" :form="form">
      <a-form-item
        label="告警任务名称"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
      >
        <a-input
          v-decorator="[
            'alarmName',
            {rules:[{required: true}]}
          ]"
          name="alarmName"
          placeholder="请输入告警任务名称"
          required="required"
        />
      </a-form-item>
      <a-form-item
        label="告警类型"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
      >
        <a-input
          v-decorator="[
            'alarmType',
            {rules:[{required: true}]}
          ]"
          name="alarmType"
          placeholder="请输入告警类型"
        />
      </a-form-item>
      <a-form-item
        label="告警任务等级"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
      >
        <a-select
          default-value="1"
          v-decorator="[
            'alarmLevel',
            {rules:[{required: true}]}
          ]"
          name="alarmLevel"
          style="width:50%"
        >
          <a-select-option value="1">1(紧急)</a-select-option>
          <a-select-option value="2">2(可疑)</a-select-option>
          <a-select-option value="3">3(提醒)</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="受影响资产"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
      >
        <a-input
          v-decorator="[
            'alarmAsset',
            {rules:[{required: false}]}
          ]"
          name="alarmAsset"
          placeholder="请输入受影响资产数额"
        />
      </a-form-item>
      <a-form-item
        label="资产类型"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
      >
        <a-input
          v-decorator="[
            'assetType',
            {rules:[{required: false}]}
          ]"
          name="assetType"
          placeholder="请输入资产类型"
        />
      </a-form-item>
      <a-form-item
        label="告警位置"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
      >
        <a-input
          v-decorator="[
            'alarmLocation',
            {rules:[{required: true}]}
          ]"
          name="alarmLocation"
          placeholder="请输入告警位置"
        />
      </a-form-item>
      <a-form-item
        label="公司id"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
      >
        <a-input
          v-decorator="[
            'companyId',
            {rules:[{required: true}]}
          ]"
          name="companyId"
          placeholder="请输入公司id"
        />
      </a-form-item>
      <a-form-item
        label="公司名称"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
      >
        <a-input
          v-decorator="[
            'companyName',
            {rules:[{required: true}]}
          ]"
          name="companyName"
          placeholder="请输入公司名称"
        />
      </a-form-item>
      <a-form-item
        label="部门id"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
      >
        <a-input
          v-decorator="[
            'deptId',
            {rules:[{required: true}]}
          ]"
          name="deptId"
          placeholder="请输入部门id"
        />
      </a-form-item>
      <a-form-item
        label="部门名称"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
      >
        <a-input
          v-decorator="[
            'deptName',
            {rules:[{required: true}]}
          ]"
          name="deptName"
          placeholder="请输入部门名称"
        />
      </a-form-item>
      <a-form-item
        label="最近发生时间"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
      >
        <a-date-picker
          v-decorator="[
            'lastOccurTime',
            {rules:[{required: true}]}
          ]"
          name="lastOccurTime"
          placeholder="请输入最近发生时间"
          style="width:50%"
          show-time
        />
      </a-form-item>
      <a-form-item
        label="告警描述"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
      >
        <a-textarea
          rows="2"
          name="description"
          placeholder="请输入告警描述"
          v-decorator="[
            'description'
          ]"
        />
      </a-form-item>
      <a-form-item
        label="备注"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
      >
        <a-textarea
          rows="4"
          name="remark"
          placeholder="请输入备注"
          v-decorator="[
            'remark'
          ]"
        />
      </a-form-item>
      <a-form-item :wrapper="{ span:24 }" style="text-align: center">
        <a-button htmlType="submit" type="primary">新建告警</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import { saveAlarmTask } from '@/api/amc'
export default {
  name: 'AlarmReport',
  data () {
    return {
      form: this.$form.createForm(this)
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      const value = this.form.getFieldsValue()
      this.$set(value, 'alarmStatus', 1)
      saveAlarmTask(value).then(res => {
        this.$router.push('/amc/alarmProcess')
      })
    }
  }
}
</script>

<style scoped>
</style>
