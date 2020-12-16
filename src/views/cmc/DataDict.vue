<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="15">
            <a-form-item label="字典名称">
              <a-input placeholder="请输入" v-model="queryParam.name"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="15">
            <a-form-item label="状态">
              <a-select placeholder="请选择" v-model="queryParam.status" default-value="''">
                <a-select-option :value="''">全部</a-select-option>
                <a-select-option :value="'Y'">有效</a-select-option>
                <a-select-option :value="'N'">无效</a-select-option>
              </a-select>
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
      <span slot="serial" slot-scope="text,record, index"> {{ index + 1 }}</span>
      <span slot="status" slot-scope="text">
        <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
      </span>
      <span slot="action" slot-scope="text, record">
        <a v-if="editEnabel" @click="handleEdit(record)">编辑</a>
        <a-divider type="vertical" />
        <a v-if="editEnabel" @click="dataModal(record)"><a-icon type="bars" />列表</a>
        <a-divider type="vertical" />
        <a v-if="removeEnable" @click="delByIds([record.id])">删除</a>
      </span>id
    </s-table>
    <dict-modal ref="modal" @ok="handleOk" />
    <dict-data-list-modal ref="datamodal" @ok="handleOk" />
  </a-card>
</template>

<script>
import { STable } from '@/components'
import { getDictList, dictDelete } from '@/api/cmc'
import DictModal from './modules/DictModal.vue'
import DictDataListModal from './modules/DictDataListModal.vue'
// eslint-disable-next-line no-unused-vars
import { checkPermission } from '@/utils/permissions'
import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'

const statusMap = {
  'Y': {
    status: 'success',
    text: '有效'
  },
  'N': {
    status: 'default',
    text: '无效'
  }
}

export default {
  name: 'TableList',
  components: {
    STable,
    DictModal,
    DictDataListModal
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
      form: this.$form.createForm(this),
      mdl: {},
      permissions: [],
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '序号',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '字典库Id',
          dataIndex: 'id'
        },
        {
          title: '字典名称',
          dataIndex: 'name'
        },
        {
          title: '字典等级',
          dataIndex: 'dictLevel',
          customRender: dictLevel => dictLevel === 'sys' ? '系统' : '业务'
        },
        {
          title: '状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '备注',
          dataIndex: 'mark'
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          sorter: true
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
        // console.log('info信息' + JSON.stringify(this.$store.state.user.info))
        this.queryParam.deptId = this.$store.state.user.info.deptId
        return getDictList(Object.assign(parameter, this.queryParam))
      },
      selectedRowKeys: [],
      selectedRows: [],
      addEnable: true,
      editEnabel: true,
      removeEnable: true
      // addEnable: checkPermission('system:dict:add'),
      // editEnabel: checkPermission('system:dict:edit'),
      // removeEnable: checkPermission('system:dict:remove')
    }
  },
  filters: {
    statusFilter (type) {
      return statusMap[type].text
    },
    statusTypeFilter (type) {
      return statusMap[type].status
    }
  },
  created () {
    console.log(Vue.ls.get(ACCESS_TOKEN))
  },
  methods: {
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    handleAdd (parentId) {
      this.$refs.modal.add(parentId)
    },
    handleEdit (record) {
      this.$refs.modal.edit(record)
    },
    handleOk () {
      this.$refs.table.refresh(true)
      console.log('handleSaveOk')
    },
    dataModal (record) {
      this.$refs.datamodal.show(record)
    },
    delByIds (ids) {
      dictDelete({ ids: ids.join(',') }).then(res => {
        if (res.code === 0) {
          this.$message.success(`删除成功`)
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
