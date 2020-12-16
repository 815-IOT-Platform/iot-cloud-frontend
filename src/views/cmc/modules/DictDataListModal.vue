<template>
  <a-modal
    title="字典子项"
    style="top: 20px;"
    :width="1100"
    v-model="visible"
    :footer="null"
  >
    <div class="table-operator">
      <a-button v-if="addEnable" type="primary" icon="plus" @click="$refs.modal.add(dictId)">新建</a-button>
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
      <span slot="serial" slot-scope="text,record,index">
        {{ index + 1 }}
      </span>
      <span slot="status" slot-scope="text">
        <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
      </span>
      <span slot="action" slot-scope="text, record">
        <a v-if="editEnabel" @click="handleEdit(record)">编辑</a>
        <a-divider type="vertical" />
        <a v-if="removeEnable" @click="delByIds([record.id])">删除</a>
      </span>
    </s-table>
    <dict-data-modal ref="modal" @ok="handleOk" />
  </a-modal>
</template>

<script>
import { STable } from '@/components'
import { getDictItemList, dictItemDelete } from '@/api/cmc'
import DictDataModal from './DictDataModal.vue'
// import { checkPermission } from '@/utils/permissions'

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
    DictDataModal
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
      queryParam: { },
      // 表头
      columns: [
        {
          title: '序号',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '字典标签',
          dataIndex: 'name'
        },
        {
          title: '字典项Id',
          dataIndex: 'id'
        },
        {
          title: '字典编码',
          dataIndex: 'code'
        },
        {
          title: '字典排序',
          dataIndex: 'sort',
          sorter: true
        },
        {
          title: '经度',
          dataIndex: 'longitude'
        },
        {
          title: '纬度',
          dataIndex: 'latitude'
        },
        {
          title: '操作',
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        console.log('列表' + JSON.stringify(this.queryParam))
        return getDictItemList(Object.assign(parameter, this.queryParam))
      },
      dictId: '',
      deptId: '',
      selectedRowKeys: [],
      selectedRows: [],
      addEnable: true,
      removeEnable: true,
      editEnabel: true
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
  },
  methods: {
    show (record) {
      this.visible = true
      this.queryParam.dictId = record.id
      this.queryParam.deptId = record.deptId
      this.dictId = record.id
      this.deptId = record.deptId
      this.$refs.table && this.$refs.table.refresh(true)
    },
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    handleEdit (record) {
      console.log('record是什么' + JSON.stringify(record))
      this.$refs.modal.edit(record)
    },
    handleOk () {
      this.$refs.table.refresh(true)
      console.log('handleSaveOk')
    },
    delByIds (ids) {
      dictItemDelete({ ids: ids.join(',') }).then(res => {
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
