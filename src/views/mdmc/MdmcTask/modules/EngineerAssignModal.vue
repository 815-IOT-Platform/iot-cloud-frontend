<template>
  <a-modal
    title="分配工程师"
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
        label="服务商Id"
      >
        <a-input v-decorator="['facilitatorId',{rules: [{ required: true, message: '请输入服务商Id' }]}]" placeholder="请输入服务商Id" />
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="工程师编号"
      >
        <a-select v-decorator="['maintainerId', {rules: [{ required: true, message: '请选择工程师编号' }]}]"placeholder="请选择工程师编号">
          <a-select-option :value="'0'">紧急</a-select-option>
          <a-select-option :value="'1'">一般紧急</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="最晚维修时间"
      >
        <a-date-picker name="deadline" style="width: 50%" show-time v-decorator="['deadline',{rules: [{ required: true, message: '请选择最晚维修时间' }]}]" />
      </a-form-item>
    </a-form></a-modal>
</template>
<script>
import { dispatchMaintainer } from '@/api/mdmc'
import pick from 'lodash.pick'
export default {
  name: 'EngineerAssignModal',
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
            'deadline': fieldsValue['deadline'].format('YYYY-MM-DD HH:mm:ss')
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
