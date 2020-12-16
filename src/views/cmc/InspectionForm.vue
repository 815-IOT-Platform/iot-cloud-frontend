<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="5" :sm="15">
            <a-form-item label="表单备注说明">
              <a-input placeholder="请输入表单备注说明" v-model="queryParam.mark"/>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="15">
            <a-form-item label="关联的项目名称">
              <a-input placeholder="请输入关联的项目名称" v-model="queryParam.projectName"/>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="15">
            <a-form-item label="逻辑删除">
              <a-input placeholder="请输入逻辑删除" v-model="queryParam.dr"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
     <div class="table-operator">
      <a-button v-if="addEnable" type="primary" icon="plus" @click="$refs.modal.add()">新建</a-button>
      <a-dropdown v-if="removeEnable&&selectedRowKeys.length > 0">
        <a-button type="danger" icon="delete" @click="delByIds(selectedRowKeys)">删除</a-button>
      </a-dropdown>
    </div>
    <s-table
      size="default"
      ref="table"
      rowKey="id"
      :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      :columns="columns"
      :data="loadData"
    >
      <span slot="action" slot-scope="text, record">
        <a v-if="editEnabel" @click="handleEdit(record)">编辑</a>
        <a-divider type="vertical" />
        <a v-if="removeEnable" @click="delByIds([record.id])">删除</a>
      </span>
    </s-table>
    <anMdcFormTemplate-modal ref="modal" @ok="handleOk"/>
  </a-card>
</template>

<script>
import { STable } from '@/components'
import { getAnMdcFormTemplateList, delAnMdcFormTemplate } from '@/api/mdc'
import AnMdcFormTemplateModal from './modules/AnMdcFormTemplateModal.vue'
import { checkPermission } from '@/utils/permissions'

export default {
  name: 'TableList',
  components: {
    STable,
    AnMdcFormTemplateModal
  },
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      form: this.$form.createForm(this),
      mdl: {},
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: 'Schema ID',
          dataIndex: 'schemaId'
        },
        {
          title: '表单类型',
          dataIndex: 'type'
        },
        {
          title: '表单状态',
          dataIndex: 'status'
        },
        {
          title: '表单备注说明',
          dataIndex: 'mark'
        },
        {
          title: '公司组织ID',
          dataIndex: 'deptId'
        },
        {
          title: '关联的项目ID',
          dataIndex: 'projectId'
        },
        {
          title: '关联的项目名称',
          dataIndex: 'projectName'
        },
        {
          title: '逻辑删除',
          dataIndex: 'dr'
        },
        {
          title: '版本号',
          dataIndex: 'version'
        },
        {
          title: '创建人ID',
          dataIndex: 'creatorId'
        },
        {
          title: '最后操作人',
          dataIndex: 'lastOperator'
        },
        {
          title: '备注',
          dataIndex: 'remark'
        },
        {
          title: '公司Id',
          dataIndex: 'companyId'
        },
        {
          title: '公司名称',
          dataIndex: 'companyName'
        },
        {
          title: '操作',
          width: '200px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getAnMdcFormTemplateList(Object.assign(parameter, this.queryParam))
      },
      selectedRowKeys: [],
      selectedRows: [],
      addEnable: checkPermission('mdc:anMdcFormTemplate:add'),
      editEnabel: checkPermission('mdc:anMdcFormTemplate:edit'),
      removeEnable: checkPermission('mdc:anMdcFormTemplate:remove')
    }
  },
  filters: {
  },
  created () {
  },
  methods: {
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    handleAdd () {
      this.$refs.modal.add()
    },
    handleEdit (record) {
      this.$refs.modal.edit(record)
    },
    handleOk () {
      this.$refs.table.refresh(true)
      console.log('handleSaveOk')
    },
    delByIds (ids) {
      delAnMdcFormTemplate({ ids: ids.join(',') }).then(res => {
        if (res.code === 0) {
          this.$message.success('删除成功')
          this.handleOk()
        } else {
          this.$message.error(res.msg)
        }
        this.selectedRowKeys = []
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
