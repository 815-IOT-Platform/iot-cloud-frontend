<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-form @submit="handleSubmit" :form="form">
      <a-form-item
        label="合同名称"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
      >
        <a-textarea
          rows="2"
          v-decorator="[
            'name',
            {rules:[{required: true}]}
          ]"
          name="name"
          placeholder="请输入合同名称"
          required="required"
        />
      </a-form-item>
      <a-form-item
        label="合同编号"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
      >
        <a-input
          v-decorator="[
            'id',
            {rules:[{required: true}]}
          ]"
          name="id"
          placeholder="请输入合同编号"
          required="required"
        />
      </a-form-item>
      <a-form-item
        label="合同类型"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
      >
        <a-select
          default-value="1"
          v-decorator="[
            '',
            {rules:[{required:true}]}
          ]"
          name=""
          style="width:50%"
          required="required"
        >
          <a-select-option value="1">制式合同</a-select-option>
          <a-select-option value="2">自定义合同</a-select-option>
          <a-select-option value="3">其他</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="用户方公司查询"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          v-decorator="[
            '',
            {rules:[{required: true}]}
          ]"
          name=""
          placeholder="请输入用户方公司名称"
        />
      </a-form-item>
      <a-form-item
        label="用户方名称"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          v-decorator="[
            '',
            {rules:[{required: true}]}
          ]"
          name=""
          placeholder="用户方名称待查询"
          disabled="true"
        />
      </a-form-item>
      <a-form-item
        label="用户方ID"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          v-decorator="[
            '',
            {rules:[{required: true}]}
          ]"
          name=""
          placeholder="用户方ID待查询"
          disabled="true"
        />
      </a-form-item>
      <a-form-item
        label="用户方法人"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          v-decorator="[
            '',
            {rules:[{required: true}]}
          ]"
          name=""
          placeholder="用户方法人待查询"
          disabled="true"
        />
      </a-form-item>
      <a-form-item
        label="服务方公司查询"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          v-decorator="[
            '',
            {rules:[{required: true}]}
          ]"
          name=""
          placeholder="请输入服务方公司名称"
        />
      </a-form-item>
      <a-form-item
        label="服务方名称"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          v-decorator="[
            '',
            {rules:[{required: true}]}
          ]"
          name=""
          placeholder="服务方名称待查询"
          disabled="true"
        />
      </a-form-item>
      <a-form-item
        label="服务方id"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          v-decorator="[
            '',
            {rules:[{required: true}]}
          ]"
          name=""
          placeholder="服务方id待查询"
          disabled="true"
        />
      </a-form-item>
      <a-form-item
        label="服务方法人"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          v-decorator="[
            '',
            {rules:[{required: true}]}
          ]"
          name=""
          placeholder="服务方法人待查询"
          disabled="true"
        />
      </a-form-item>
      <a-form-item
        label="合同签订时间"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-date-picker
          v-decorator="[
            '',
            {rules:[{required:true}]}
          ]"
          name=""
          placeholder="请选择合同签订时间"
          style="width:50%"
          show-time
        />
      </a-form-item>
      <a-form-item
        label="合同开始时间"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-date-picker
          v-decorator="[
            '',
            {rules:[{required:true}]}
          ]"
          name=""
          placeholder="请选择合同开始时间"
          style="width:50%"
          show-time
        />
      </a-form-item>
      <a-form-item
        label="合同结束时间"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-date-picker
          v-decorator="[
            '',
            {rules:[{required:true}]}
          ]"
          name=""
          placeholder="请选择合同结束时间"
          style="width:50%"
          show-time
        />
      </a-form-item>
      <a-form-item
        label="服务方代理内容"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
      >
        <a-textarea
          rows="4"
          v-decorator="[
            '',
            {rules:[{required: true}]}
          ]"
          name=""
          placeholder="请输入服务方代理内容"
          required="required"
        />
      </a-form-item>
      <a-form-item
        label="服务方开户银行"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          v-decorator="[
            '',
            {rules:[{required: true}]}
          ]"
          name=""
          placeholder="请输入服务方开户银行"
        />
      </a-form-item>
      <a-form-item
        label="服务方开户银行账户"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          v-decorator="[
            '',
            {rules:[{required: true}]}
          ]"
          name=""
          placeholder="请输入服务方开户银行账户"
        />
      </a-form-item>
      <a-form-item
        label="乙供辅料金额"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          v-decorator="[
            '',
            {rules:[{required: true}]}
          ]"
          name=""
          placeholder="请输入乙供辅料金额"
        />
      </a-form-item>
      <a-form-item
        label="服务方是否包备品备件"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-radio-group name="" :default-value="1">
          <a-radio :value="1">包括</a-radio>
          <a-radio :value="0">不包括</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        label="服务方是否提供备品备件替换服务"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-radio-group name="" :default-value="1">
          <a-radio :value="1">提供</a-radio>
          <a-radio :value="0">不提供</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        label="维修维护最迟响应时间（小时）"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input-number :min="0" :max="2400" :step="1" name="">
        </a-input-number>
      </a-form-item>
      <a-form-item
        label="付款时间"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-date-picker
          v-decorator="[
            '',
            {rules:[{required:true}]}
          ]"
          name=""
          placeholder="请选择付款时间"
          style="width:50%"
          show-time
        />
      </a-form-item>
      <a-form-item
        label="支付方式"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-radio-group name="" :default-value="1">
          <a-radio :value="1">现结</a-radio>
          <a-radio :value="2">账期</a-radio>
          <a-radio :value="3">年结</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        label="项目金额"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input-number :min="0" :step="10000" name="">
        </a-input-number>
      </a-form-item>
      <a-form-item
        label="月度记录表提交周期（天）"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input-number :min="0" :step="1">
        </a-input-number>
      </a-form-item>
      <a-form-item
        label="合同是否变更"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-radio-group name="" :default-value="0">
          <a-radio :value="1">是</a-radio>
          <a-radio :value="0">否</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        label="合同是否作废"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-radio-group name="" :default-value="1">
          <a-radio :value="1">有效</a-radio>
          <a-radio :value="0">作废</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        label="合同是否自动顺延"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-radio-group name="" :default-value="0">
          <a-radio :value="1">是</a-radio>
          <a-radio :value="0">否</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        label="维修工身份验证流程"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
      >
        <a-textarea
          rows="4"
          v-decorator="[
            '',
            {rules:[{required: false}]}
          ]"
          name=""
          placeholder="请输入维修工身份验证流程"
        />
      </a-form-item>
      <a-form-item
        label="描述"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
      >
        <a-textarea
          rows="4"
          v-decorator="[
            '',
            {rules:[{required: false}]}
          ]"
          name=""
          placeholder="请输入合同描述"
        />
      </a-form-item>
      <a-form-item :wrapper="{ span:24 }" style="text-align: center">
        <a-button htmlType="submit" type="primary">新建合同</a-button>
        <a-button @click="handleCancel" style="margin-left:10px;">取消</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
export default {
  name: 'ContractNew',
  data () {
    return {
      form: this.$form.createForm(this)
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.$router.push('/pmc/ContractManager')
    },
    handleCancel (e) {
      e.preventDefault()
      this.$router.push('/pmc/ContractNew')
    }
  }
}
</script>

<style scoped>

</style>
