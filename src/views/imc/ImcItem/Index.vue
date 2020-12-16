<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="任务名称">
              <a-input v-model="columns.taskName" placeholder=""/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="使用状态">
              <a-select v-model="columns.status" placeholder="请选择" default-value="0">
                <a-select-option value="0">全部</a-select-option>
                <a-select-option value="1">关闭</a-select-option>
                <a-select-option value="2">运行中</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="!advanced && 8 || 24" :sm="24">
            <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <s-table
      ref="table"
      size="default"
      rowKey="id"
      :columns="columns"
      :data="loadData"
    >
      <span slot="serial" slot-scope="text, record, index">
        {{ index + 1 }}
      </span>
      <span slot="status" slot-scope="text">
        <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
      </span>
      <span slot="description" slot-scope="text">
        <ellipsis :length="4" tooltip>{{ text }}</ellipsis>
      </span>

      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="checkDetail(record)">详情</a>
        </template>
      </span>
    </s-table>
  </a-card>
</template>

<script>
import moment from 'moment'
import { STable, Ellipsis } from '@/components'
import { getRoleList } from '@/api/manage'
import { transformList, getItemList, getAllAcceptedItemListByMaintainer, getAllFinishedImcItemByMaintainerId } from '@/api/imc'

const statusMap = {
  0: {
    status: 'default',
    text: '关闭'
  },
  1: {
    status: 'processing',
    text: '运行中'
  },
  2: {
    status: 'success',
    text: '已上线'
  },
  3: {
    status: 'error',
    text: '异常'
  }
}

export default {
  name: 'ImcItemList',
  components: {
    STable,
    Ellipsis
  },
  data () {
    return {
      mdl: {},
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 当前的tab
      curTab: this.$store.state.imc.curTab,
      // 当前的role
      curRole: this.$store.state.imc.curRole,
      // 表头
      columns: [
        {
          title: '序号',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '任务子项ID',
          dataIndex: 'id'
        },
        {
          title: '子项名称',
          dataIndex: 'itemName',
          scopedSlots: { customRender: 'itemName' }
        },
        {
          title: '循环周期',
          dataIndex: 'frequency',
          customRender: (text) => (text != null ? text : '--') + '（天）'
        },
        {
          title: '持续时间',
          dataIndex: 'days',
          customRender: (text) => (text != null ? text : '--') + '（天）'
        },
        {
          title: '点位数量',
          dataIndex: 'count',
          customRender: (text) => (text != null ? text : '--') + '（个）'
        },
        {
          title: '点位位置',
          dataIndex: 'location'
        },
        {
          title: '内容描述',
          dataIndex: 'description'
        },
        {
          title: '实际开始时间',
          dataIndex: 'actualStartTime',
          customRender: (text) => (text != null ? text : '--')
        },
        {
          title: '实际完成时间',
          dataIndex: 'actualFinishTime',
          customRender: (text) => (text != null ? text : '--')
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        this.queryParam = {
          maintainerId: '838312825666405376'
        }
        console.log(this.curRole)
        console.log(this.curTab)
        switch (this.curTab) {
          case 'maintatinerAll':
            return getItemList(Object.assign(parameter, this.queryParam))
              .then(res => {
                res.pageSize = parameter.pageSize
                res = transformList(res)
                console.log('res', res)
                return res.result
              })
          case 'maintainerWait' :
            this.queryParam = {
              maintainerId: '838312825666405376',
              status: 2
            }
            return getItemList(Object.assign(parameter, this.queryParam))
              .then(res => {
                res.pageSize = parameter.pageSize
                res = transformList(res)
                console.log('res', res)
                return res.result
              })
          case 'maintainerAccept' :
            return getAllAcceptedItemListByMaintainer(Object.assign(parameter, this.queryParam))
              .then(res => {
                res.pageSize = parameter.pageSize
                res = transformList(res)
                console.log('res', res)
                return res.result
              })
          case 'maintainerDone' :
            return getAllFinishedImcItemByMaintainerId(Object.assign(parameter, this.queryParam))
              .then(res => {
                res.pageSize = parameter.pageSize
                res = transformList(res)
                console.log('res', res)
                return res.result
              })
          default:
            return getItemList(Object.assign(parameter, this.queryParam))
              .then(res => {
                res.pageSize = parameter.pageSize
                res = transformList(res)
                console.log('res', res)
                return res.result
              })
        }
      },
      selectedRowKeys: [],
      selectedRows: [],

      // custom table alert & rowSelection
      options: {
        alert: { show: true, clear: () => { this.selectedRowKeys = [] } },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      },
      optionAlertShow: false
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
  mounted () {
    getRoleList({ t: new Date() })
  },
  methods: {

    handleEdit (record) {
      console.log(record)
      this.$refs.modal.edit(record)
    },
    checkDetail (record) {
      this.$router.push({ path: `/imc/imcItemDetail/${record.id}` })
    },
    handleOk () {
      this.$refs.table.refresh()
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    resetSearchForm () {
      this.queryParam = {
        date: moment(new Date())
      }
    }
  }
}
</script>
