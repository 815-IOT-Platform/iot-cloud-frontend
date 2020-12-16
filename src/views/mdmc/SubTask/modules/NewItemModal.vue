<template>
  <a-modal
    title="操作"
    style="top: 20px;"
    :width="800"
    v-model="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
  >
    <a-form :form="form">
      <a-form-item style="display:none">
        <a-input v-decorator="['id']"/>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="紧急程度"
      >
        <a-select v-decorator="['level', {rules: [{ required: true, message: '紧急程度' }]}]"placeholder="请选择紧急程度">
          <a-select-option :value="'0'">紧急</a-select-option>
          <a-select-option :value="'1'">一般紧急</a-select-option>
          <a-select-option :value="'1'">不紧急</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="故障类型"
      >
        <a-select v-decorator="['troubleType', {rules: [{ required: true, message: '故障类型' }]}]" placeholder="请选择故障类型">
          <a-select-option :value="'0'">紧急</a-select-option>
          <a-select-option :value="'1'">一般紧急</a-select-option>
          <a-select-option :value="'1'">不紧急</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="设备类型"
      >
        <a-select v-decorator="['deviceType', {rules: [{ required: true, message: '设备类型' }]}]" placeholder="请选择设备类型">
          <a-select-option :value="'0'">紧急</a-select-option>
          <a-select-option :value="'1'">一般紧急</a-select-option>
          <a-select-option :value="'1'">不紧急</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="故障地址"
      >
        <a-select v-decorator="['troubleAddress', {rules: [{ required: true, message: '紧急程度' }]}]" placeholder="请选择故障地址">
          <a-select-option :value="'0'">紧急</a-select-option>
          <a-select-option :value="'1'">一般紧急</a-select-option>
          <a-select-option :value="'1'">不紧急</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="设备编码"
      >
        <a-input v-decorator="['deviceId',{rules: [{ required: true, message: '请输入设备编码' }]}]" placeholder="请输入设备编码"/>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="设备名称"
      >
        <a-input v-decorator="['deviceName',{rules: [{ required: true, message: '请输入设备名称' }]}]" placeholder="请输入设备名称"/>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="地图查看"
      >
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="故障描述"
      >
        <a-textarea :rows="5" placeholder="请输入故障描述..." v-decorator="['description',{rules: [{ required: true, message: '请输入故障描述' }]}]"/>
      </a-form-item>

    </a-form>
  </a-modal>
</template>
<script>
import { mdmcTaskItemSave, mdmcTaskItemUpdate } from '@/api/mdmc'
import pick from 'lodash.pick'
export default {
  name: 'NewItemModal',
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
    show (taskId) {
      this.visible = true
      this.queryParam.taskId = taskId
      this.taskId = taskId
      this.$refs.table && this.$refs.table.refresh(true)
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.confirmLoading = true
          values.taskId = this.$route.params.id
          if (values.id) {
            mdmcTaskItemUpdate(values).then(res => {
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
          } else {
            mdmcTaskItemSave(values).then(res => {
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
