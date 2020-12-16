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
import { getAllImcTaskOfPrincipal, transformList, getAllUnauthorizedTaskList, getImcTaskList, getAllTaskByFacilitatorId, getAllUnConfirmedTask, getAllUnDistributedTask, getAllFinishedTaskByFacilitatorId } from '@/api/imc'
// import { mapState } from 'vuex'

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
  name: 'ImcTaskList',
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
          title: '任务名称',
          dataIndex: 'taskName',
          scopedSlots: { customRender: 'taskName' }
        },
        {
          title: '任务唯一编号',
          dataIndex: 'id'
        },
        {
          title: '应巡检点位数',
          dataIndex: 'pointSum',
          customRender: (text) => (text != null ? text : '--') + '（个）'
        },
        {
          title: '已安排点位数',
          dataIndex: 'alreadyPoint',
          customRender: (text) => (text != null ? text : '--') + '（个）'
        },
        {
          title: '项目名称',
          dataIndex: 'projectName'
        },
        {
          title: '审核人',
          dataIndex: 'principalName'
        },
        {
          title: '服务商',
          dataIndex: 'facilitatorName'
        },
        {
          title: '任务类型',
          dataIndex: 'inspectionType',
          customRender: (type) => type === 1 ? '计划巡检' : '临时巡检'
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
          userId: this.$store.getters.userId
        }
        console.log(this.curRole)
        console.log(this.curTab)
        switch (this.curTab) {
          case 'principalAll':
            return getAllImcTaskOfPrincipal(Object.assign(parameter, this.queryParam))
              .then(res => {
                res.pageSize = parameter.pageSize
                res = transformList(res)
                console.log('res', res)
                return res.result
              })
          case 'principalCheck' :
            return getAllUnauthorizedTaskList(Object.assign(parameter, this.queryParam))
              .then(res => {
                res.pageSize = parameter.pageSize
                res = transformList(res)
                console.log('res', res)
                return res.result
              })
          case 'principalExecute' :
            this.queryParam = {
              userId: this.$store.getters.userId,
              role: 1,
              status: 3
            }
            return getImcTaskList(Object.assign(parameter, this.queryParam))
              .then(res => {
                res.pageSize = parameter.pageSize
                res = transformList(res)
                console.log('res', res)
                return res.result
              })
          case 'principalConfirm' :
            this.queryParam = {
              userId: this.$store.getters.userId,
              role: 1,
              status: 4
            }
            return getImcTaskList(Object.assign(parameter, this.queryParam))
              .then(res => {
                res.pageSize = parameter.pageSize
                res = transformList(res)
                console.log('res', res)
                return res.result
              })
          case 'principalPay' :
            this.queryParam = {
              userId: this.$store.getters.userId,
              role: 1,
              status: 5
            }
            return getImcTaskList(Object.assign(parameter, this.queryParam))
              .then(res => {
                res.pageSize = parameter.pageSize
                res = transformList(res)
                console.log('res', res)
                return res.result
              })
          case 'principalDone' :
            this.queryParam = {
              userId: this.$store.getters.userId,
              role: 1,
              status: 7
            }
            return getImcTaskList(Object.assign(parameter, this.queryParam))
              .then(res => {
                res.pageSize = parameter.pageSize
                res = transformList(res)
                console.log('res', res)
                return res.result
              })
          case 'facilitatorAll' :
            this.queryParam = {
              userId: 4
            }
            return getAllTaskByFacilitatorId(Object.assign(parameter, this.queryParam))
              .then(res => {
                res.pageSize = parameter.pageSize
                res = transformList(res)
                console.log('res', res)
                return res.result
              })
          case 'facilitatorWait' :
            this.queryParam = {
              userId: 4
            }
            return getAllUnConfirmedTask(Object.assign(parameter, this.queryParam))
              .then(res => {
                res.pageSize = parameter.pageSize
                res = transformList(res)
                console.log('res', res)
                return res.result
              })
          case 'facilitatorHandle' :
            this.queryParam = {
              userId: 4
            }
            return getAllUnDistributedTask(Object.assign(parameter, this.queryParam))
              .then(res => {
                res.pageSize = parameter.pageSize
                res = transformList(res)
                console.log('res', res)
                return res.result
              })
          case 'facilitatorDone' :
            this.queryParam = {
              userId: 4
            }
            return getAllFinishedTaskByFacilitatorId(Object.assign(parameter, this.queryParam))
              .then(res => {
                res.pageSize = parameter.pageSize
                res = transformList(res)
                console.log('res', res)
                return res.result
              })
          default:
            return getAllImcTaskOfPrincipal(Object.assign(parameter, this.queryParam))
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
      this.$router.push({ path: `/imc/imcTaskDetail/${record.id}` })
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
