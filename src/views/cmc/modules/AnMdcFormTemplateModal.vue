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
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="模板说明">
        <a-input placeholder="请输入模板说明" v-decorator="['mark',{rules: [{ required: true, message: '请输入模板说明' }]}]"/>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="模板类型">
        <a-select v-decorator="['type', {initialValue:'',rules: [{ required: true, message: '请选择类型' }]}]">
          <a-select-option v-for="item in templateType" :key="item.key" :value="item.key">{{item.value}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="模板状态">
        <a-select v-decorator="['status', {initialValue:'',rules: [{ required: true, message: '请选择状态' }]}]">
          <a-select-option :value="'Y'">有效</a-select-option>
          <a-select-option :value="'N'">无效</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="项目名称">
        <a-select v-decorator="['projectName', {initialValue:'',rules: [{ required: true, message: '请选择项目' }]}]">
          <a-select-option :value="'0'">项目1</a-select-option>
          <a-select-option :value="'1'">项目2</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
import { saveAnMdcFormTemplate } from '@/api/mdc'
import pick from 'lodash.pick'
export default {
  name: 'AnMdcFormTemplateModal',
  props: {
  },
  components: {
  },
  data () {
    return {
      visible: false,
      templateType: [
        {
          key: 'system',
          value: '系统'
        },
        {
          key: 'user',
          value: '业务'
        }
      ],
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      confirmLoading: false,
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
      this.edit({ id: 0 })
    },
    edit (record) {
      this.mdl = Object.assign(record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.mdl, 'id', 'schemaId', 'type', 'status', 'mark', 'deptId', 'projectId', 'projectName', 'dr', 'version', 'createBy', 'creatorId', 'createTime', 'lastOperator', 'updateBy', 'updateTime', 'remark', 'companyId', 'companyName'))
      })
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.confirmLoading = true
          saveAnMdcFormTemplate(values).then(res => {
            if (res.code === 0) {
              this.$message.success('保存成功')
              this.$emit('ok')
              this.visible = false
            } else {
              this.$message.error(res.msg)
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
