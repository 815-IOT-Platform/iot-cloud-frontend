<template>
  <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
    <a-form-item label="设备名称">
      <a-input
        v-decorator="['deviceName', { rules: [{ required: true, message: '请输入设备名称' }] }]"
      />
    </a-form-item>
    <a-form-item label="设备描述">
      <a-input
        v-decorator="['description', { rules: [{ required: true, message: '请输入你对设备的描述' }] }]"
      />
    </a-form-item>
    <a-form-item label="所在节点">
      <a-input
        v-decorator="['nodeName', { rules: [{ required: true, message: '请输入该设备所在的节点' }] }]"
      />
    </a-form-item>
    <a-form-item label="模型名称">
      <a-select :size="size" initialValue="a1" v-decorator="['deviceModelRefName', { rules: [{ required: true, message: '请输入模型名称' }] }]" @change="handleSelect">
        <a-select-option v-for="deviceModel in deviceModelList" :key="deviceModel.name" :value="deviceModel">
          {{deviceModel.name}}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="选择属性">
      <a-select mode="tags" style="width: 100%" placeholder="Tags Mode" v-decorator="['deviceProperties', { rules: [{ required: true, message: '请选择属性' }] }]" @change="handleMultiSelect">
        <a-select-option v-for="property in properties" :key="property.name">
          {{ property.name }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
      <a-button type="primary" html-type="submit">
        创建
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { addEdgeDevice, getAllEdgeDeviceModel } from '@/api/device'
export default {
  name: 'AddDevice',
  data () {
    return {
      formLayout: 'horizontal',
      deviceModelList: [],
      properties: [],
      propertyDict: {},
      selectedProperties: []
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'dynamic_form_item' })
    this.form.getFieldDecorator('keys', { initialValue: [], preserve: true })
  },
  created () {
    getAllEdgeDeviceModel().then(res => {
      this.deviceModelList = res
      console.log(this.deviceModelList)
    }).catch(res => {
      console.log(res)
    })
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          const device = {
            deviceName: values.deviceName,
            description: values.description,
            deviceModelRefName: values.deviceModelRefName.name,
            model: values.deviceModelRefName.name,
            nodeName: values.nodeName,
            deviceTwinDtoList: this.selectedProperties.map((value, index) => {
              return {
                propertyName: value.name,
                requireType: value.type,
                requireValue: value.value
              }
            })
          }
          this.createDevice(device)
        }
      })
    },
    handleSelect (e) {
      this.properties = e.propertyDtos
      this.properties.map((value, index) => {
        this.propertyDict[value.name] = value
      })
      console.log(this.propertyDict)
    },
    handleMultiSelect (e) {
      e.map((value, index) => {
        this.selectedProperties.push(this.propertyDict[value])
      })
      console.log(this.selectedProperties)
    },
    createDevice (device) {
      addEdgeDevice(device).then(res => {
        console.log(res)
        alert('设备创建成功')
      }).catch(res => {
        console.log(res)
        alert('设备创建失败')
      })
    }
  }
}
</script>
