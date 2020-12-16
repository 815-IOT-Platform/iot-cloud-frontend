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
        label="字典名称"
      >
        <a-input placeholder="字典名称" v-decorator="['name', {rules: [{ required: true, message: '请输入字典名称' }]}]" />
      </a-form-item>

      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="字典等级"
      >
        <a-select v-decorator="['dictLevel', {initialValue:'sys',rules: [{ required: true, message: '请选择状态' }]}]">
          <a-select-option :value="'sys'">系统</a-select-option>
          <a-select-option :value="'ser'">业务</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="状态"
      >
        <a-select v-decorator="['status', {initialValue:'Y',rules: [{ required: true, message: '请选择状态' }]}]">
          <a-select-option :value="'Y'">有效</a-select-option>
          <a-select-option :value="'N'">无效</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="备注"
      >
        <a-textarea :rows="5" placeholder="..." v-decorator="['mark']"/>
      </a-form-item>

    </a-form>
  </a-modal>
</template>
<script>
import { dictSave, dictUpdate } from '@/api/cmc'
import pick from 'lodash.pick'
export default {
  name: 'DictModal',
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
      console.log('mdl' + JSON.stringify(this.mdl))
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.mdl, 'id', 'name', 'dictLevel', 'status', 'mark'))
      })
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        console.log('Received values of form: 测试 ', values)
        if (!err) {
          this.confirmLoading = true
          if (values.id) {
            dictUpdate(values).then(res => {
              if (res.code === 0) {
                this.$message.success('编辑成功')
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
            if (this.$store.state.user.name === 'admin') {
              values.deptId = -1
            } else {
              values.deptId = this.$store.state.user.info.deptId
            }
            dictSave(values).then(res => {
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
