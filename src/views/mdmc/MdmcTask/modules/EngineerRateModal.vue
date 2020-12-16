<template>
  <a-modal
    title="工程师定级"
    style="top: 20px;"
    :width="800"
    v-model="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
  >
    <a-form :form="form">
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="任务编号"
      >
        <a-input v-decorator="['id',{initialValue:this.$route.params.id,rules: [{ required: true, message: '请输入任务编号' }]}]" placeholder="请输入任务编号" />
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="紧急程度评估"
      >
        <a-select v-decorator="['level', {rules: [{ required: true, message: '请选择紧急程度' }]}]"placeholder="请选择紧急程度">
          <a-select-option :value="'1'">不紧急</a-select-option>
          <a-select-option :value="'2'">一般</a-select-option>
          <a-select-option :value="'3'">紧急</a-select-option>
          <a-select-option :value="'4'">非常紧急</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="计划开始时间"
      >
        <a-date-picker name="scheduledStartTime" style="width: 50%" show-time v-decorator="['scheduledStartTime',{rules: [{ required: true, message: '请选择计划开始时间' }]}]" />
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="计划结束时间"
      >
        <a-date-picker name="scheduledFinishTime" style="width: 50%" show-time v-decorator="['scheduledFinishTime',{rules: [{ required: true, message: '请选择计划结束时间' }]}]" />
      </a-form-item>
    </a-form></a-modal>
</template>
<script>
import { dispatchMaintainer } from '@/api/mdmc'
import pick from 'lodash.pick'
export default {
  name: 'EngineerRateModal',
  props: {
  },
  components: {
  },
  data () {
    return {
      visible: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      confirmLoading: false,
      roleAll: [],
      mdl: {},
      form: this.$form.createForm(this)
    }
  },
  beforeCreate () {
  },
  created () {
  },
  methods: {
    add () {
      this.form.resetFields()
      this.visible = true
    },
    edit (record) {
      this.mdl = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.mdl, 'id', 'level', 'troubleType', 'troubleAddress', 'deviceId', 'deviceType', 'deviceName', 'description'))
      })
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, fieldsValue) => {
        if (!err) {
          console.log('Received values of form: ', fieldsValue)
          const values = {
            ...fieldsValue,
            'scheduledStartTime': fieldsValue['scheduledStartTime'].format('YYYY-MM-DD HH:mm:ss'),
            'scheduledFinishTime': fieldsValue['scheduledFinishTime'].format('YYYY-MM-DD HH:mm:ss')
          }
          this.confirmLoading = true
          dispatchMaintainer(values).then(res => {
            console.log('子项是否保存成功' + JSON.stringify(res))
            if (res.code === 0) {
              this.$message.success('保存成功')
              this.$emit('ok')
              this.visible = false
            } else {
              this.$message.success(res.msg)
            }
          }).catch(() => {
            this.$message.error('系统错误，请稍后再试')
          }).finally(() => {
            this.confirmLoading = false
          })
        }
      })
    }
  },
  watch: {
    /*
      'selectedRows': function (selectedRows) {
        this.needTotalList = this.needTotalList.map(item => {
          return {
            ...item,
            total: selectedRows.reduce( (sum, val) => {
              return sum + val[item.dataIndex]
            }, 0)
          }
        })
      }
      */
  }
}
</script>
