<template>
  <a-modal
    title="维修结果"
    style="top: 20px;"
    :width="800"
    v-model="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
  >
    <a-form :form="form">
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="任务编号">
        <a-input
          v-decorator="['id',{initialValue:this.$route.params.id,rules: [{ required: true, message: '请输入任务编号' }]}]"
          placeholder="请输入任务编号"
        />
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="故障产生原因"
      >
        <a-textarea :rows="3" placeholder="请输入故障产生原因" v-decorator="['troubleReason',{rules: [{ required: true, message: '请输入故障产生原因' }]}]"/>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="故障维修结果"
      >
        <a-textarea :rows="3" placeholder="请输入故障维修结果" v-decorator="['result',{rules: [{ required: true, message: '请输入故障维修结果' }]}]"/>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="维修现场图片"
      >
        <a-textarea :rows="3" placeholder="请输入维修现场图片" v-decorator="['attachmentIdList',{rules: [{ required: true, message: '请输入维修现场图片' }]}]"/>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="故障维修建议"
      >
        <a-textarea :rows="3" placeholder="请输入故障维修建议" v-decorator="['suggestion',{rules: [{ required: true, message: '请输入故障维修建议' }]}]"/>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="作业超时原因"
      >
        <a-textarea :rows="3" placeholder="请输入未按时完成维修任务原因" v-decorator="['delayReason',{rules: [{ required: true, message: '请输入未按时完成维修任务原因' }]}]"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="实际开始时间">
        <a-date-picker
          name="actualStartTime"
          style="width: 50%"
          show-time
          v-decorator="['actualStartTime',{rules: [{ required: true, message: '请选择实际开始时间' }]}]"
        />
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="实际结束时间">
        <a-date-picker
          name="actualFinishTime"
          style="width: 50%"
          show-time
          v-decorator="['actualFinishTime',{rules: [{ required: true, message: '请选择实际结束时间' }]}]"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
import { mdmcTaskUpdate } from '@/api/mdmc'
import pick from 'lodash.pick'
export default {
  name: 'EngineerRateModal',
  props: {},
  components: {},
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
  beforeCreate () {},
  created () {},
  methods: {
    add () {
      this.form.resetFields()
      this.visible = true
    },
    edit (record) {
      this.mdl = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(
          pick(
            this.mdl,
            'id',
            'level',
            'troubleType',
            'troubleAddress',
            'deviceId',
            'deviceType',
            'deviceName',
            'description'
          )
        )
      })
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, fieldsValue) => {
        if (!err) {
          console.log('Received values of form: ', fieldsValue)
          const values = {
            ...fieldsValue,
            actualStartTime: fieldsValue['actualStartTime'].format('YYYY-MM-DD HH:mm:ss'),
            actualFinishTime: fieldsValue['actualFinishTime'].format('YYYY-MM-DD HH:mm:ss')
          }
          this.confirmLoading = true
          values.id = this.$router.params.id
          mdmcTaskUpdate(values)
            .then(res => {
              console.log('子项是否保存成功' + JSON.stringify(res))
              if (res.code === 0) {
                this.$message.success('保存成功')
                this.$emit('ok')
                this.visible = false
              } else {
                this.$message.success(res.msg)
              }
            })
            .catch(() => {
              this.$message.error('系统错误，请稍后再试')
            })
            .finally(() => {
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
