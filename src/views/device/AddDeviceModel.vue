<template>
  <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
    <a-form-item label="模型名称">
      <a-input
        v-decorator="['name', { rules: [{ required: true, message: '请输入模型名称' }] }]"
      />
    </a-form-item>
    <a-form-item
      v-for="(k, index) in form.getFieldValue('keys')"
      :key="k"
      v-bind="index === 0 ? formItemLayout : formItemLayoutWithOutLabel"
      :label="index === 0 ? '属性列表' : ''"
      :required="false"
    >
      <a-input
        v-decorator="[
          `Names[${k}]`,
          {
            validateTrigger: ['change', 'blur'],
            rules: [
              {
                required: true,
                whitespace: true,
                message: '请输入属性名称',
              },
            ],
          },
        ]"
        placeholder="属性名称"
        style="width: 60%; margin-right: 8px"
      />
      <a-input
        v-decorator="[
          `Types[${k}]`,
          {
            validateTrigger: ['change', 'blur'],
            rules: [
              {
                required: true,
                whitespace: true,
                message: '请输入属性类型',
              },
            ],
          },
        ]"
        placeholder="属性类型"
        style="width: 60%; margin-right: 8px"
      />
      <a-input
        v-decorator="[
          `Values[${k}]`,
          {
            validateTrigger: ['change', 'blur'],
            rules: [
              {
                required: true,
                whitespace: true,
                message: '请输入属性默认值',
              },
            ],
          },
        ]"
        placeholder="属性默认值"
        style="width: 60%; margin-right: 8px"
      />
      <a-input
        v-decorator="[
          `Descriptions[${k}]`,
          {
            validateTrigger: ['change', 'blur'],
            rules: [
              {
                required: true,
                whitespace: true,
                message: '请输入属性的描述',
              },
            ],
          },
        ]"
        placeholder="属性描述"
        style="width: 60%; margin-right: 8px"
      />
      <a-input
        v-decorator="[
          `AccessModes[${k}]`,
          {
            validateTrigger: ['change', 'blur'],
            rules: [
              {
                required: true,
                whitespace: true,
                message: '请输入属性的访问权限',
              },
            ],
          },
        ]"
        placeholder="属性访问权限（ReadWrite，ReadOnly）"
        style="width: 60%; margin-right: 8px"
      />
      <a-icon
        v-if="form.getFieldValue('keys').length > 1"
        class="dynamic-delete-button"
        type="minus-circle-o"
        :disabled="form.getFieldValue('keys').length === 1"
        @click="() => remove(k)"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayoutWithOutLabel">
      <a-button type="dashed" style="width: 60%" @click="add">
        <a-icon type="plus" /> 新增属性
      </a-button>
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
      <a-button type="primary" html-type="submit">
        创建
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { addEdgeDeviceModel } from '@/api/device'
let id = 0
export default {
  name: 'AddEdgeDeviceModel',
  data () {
    return {
      formLayout: 'horizontal',
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4, offset: 1 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20, offset: 5 }
        }
      },
      formItemLayoutWithOutLabel: {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 5 }
        }
      }
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'dynamic_form_item' })
    this.form.getFieldDecorator('keys', { initialValue: [], preserve: true })
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          const deviceModel = {
            name: values.name,
            propertyDtos: []
          }
          for (var i = 0; i < values.Names.length; i++) {
            deviceModel.propertyDtos.push({
              name: values.Names[i],
              value: values.Values[i],
              description: values.Descriptions[i],
              accessMode: values.AccessModes[i],
              type: values.Types[i]
            })
          }

          addEdgeDeviceModel(deviceModel).then(res => {
            console.log(res)
            alert('设备模型创建成功')
          }).catch(res => {
            console.log(res)
            alert('设备模型创建失败')
          })
          console.log(deviceModel)
        }
      })
    },
    handleSelectChange (value) {
      console.log(value)
      this.form.setFieldsValue({
        note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`
      })
    },
    remove (k) {
      const { form } = this
      // can use data-binding to get
      const keys = form.getFieldValue('keys')
      // We need at least one passenger
      if (keys.length === 1) {
        return
      }

      // can use data-binding to set
      form.setFieldsValue({
        keys: keys.filter(key => key !== k)
      })
    },

    add () {
      const { form } = this
      // can use data-binding to get
      const keys = form.getFieldValue('keys')
      const nextKeys = keys.concat(id++)
      // can use data-binding to set
      // important! notify form to detect changes
      form.setFieldsValue({
        keys: nextKeys
      })
    }
  }
}
</script>
