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
        <a-input v-decorator="['id']" />
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="字典名称">
        <a-input
          placeholder="字典名称"
          v-decorator="['name', {rules: [{ required: true, message: '请输入字典名称' }]}]"
        />
      </a-form-item>

      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="字典编码">
        <a-input
          v-decorator="['code',{rules: [{ required: true, message: '请输入字典编码' }]}]"
          placeholder="字典编码"
        />
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="字典排序">
        <a-input
          v-decorator="['sort',{rules: [{ required: true, message: '请输入字典排序' }]}]"
          placeholder="字典排序"
        />
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="备注">
        <a-textarea :rows="5" placeholder="..." v-decorator="['mark']" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
import { dictItemSave, dictItemUpdate } from '@/api/cmc'
import pick from 'lodash.pick'
export default {
  name: 'DictModal',
  props: {},
  components: {},
  data () {
    return {
      dictId: 0,
      deptId: 0,
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
    add (dictId) {
      this.form.resetFields()
      this.visible = true
      this.dictId = dictId
      console.log('dicId' + dictId)
      if (this.$store.state.user.name === 'admin') {
        this.deptId = -1
      } else {
        this.deptId = this.$store.state.user.info.deptId
      }
      this.edit({ 'dictId': dictId, 'deptId': this.deptId })
    },
    edit (record) {
      this.mdl = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.mdl, 'id', 'name', 'code', 'sort', 'mark'))
      })
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.confirmLoading = true
          if (values.id === undefined) {
            values.dictId = this.dictId
            values.deptId = this.deptId
            console.log('Received values of form: ', values)
            dictItemSave(values)
              .then(res => {
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
          } else {
            dictItemUpdate(values)
              .then(res => {
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
