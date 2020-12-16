<template>
  <a-modal
    title="工单评价"
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
        <a-input v-decorator="['taskId',{initialValue:this.$route.params.id,rules: [{ required: true, message: '请输入任务编号' }]}]" placeholder="请输入任务编号" />
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="评价用户编号"
      >
        <a-input v-decorator="['userId',{initialValue:2,rules: [{ required: true, message: '请输入用户ID' }]}]" placeholder="请输入用户ID" />
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="验收服务内容"
      >
        <a-textarea :rows="5" placeholder="请输入维修任务验收内容" v-decorator="['checkContens',{rules: [{ required: true, message: '请输入维修任务验收内容' }]}]"/>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="此次服务打星"
      >
        <a-rate v-decorator="['score',{rules: [{ required: true, message: '请输入评分' }]}]"/>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="此次服务评价"
      >
        <a-textarea :rows="5" placeholder="请输入评论" v-decorator="['contents',{rules: [{ required: true, message: '请输入评论' }]}]"/>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
import { mdmcReviewSave } from '@/api/mdmc'
import pick from 'lodash.pick'
export default {
  name: 'CommentModal',
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
          values.userId = 2
          mdmcReviewSave(values).then(res => {
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
