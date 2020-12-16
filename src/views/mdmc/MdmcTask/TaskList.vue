<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="任务名称">
              <a-input v-model="columns.title" placeholder />
            </a-form-item>
          </a-col>
          <a-col :md="!advanced && 8 || 24" :sm="24">
            <span
              class="table-page-search-submitButtons"
              :style="advanced && { float: 'right', overflow: 'hidden' } || {} "
            >
              <a-button type="primary" @click="() => queryParam = {}">查询</a-button>
              <a-button style="margin-left: 8px" @click="$refs.table.refresh(true)">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <s-table ref="table" size="default" rowKey="id" :columns="columns" :data="loadData">
      <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleSub(record)">任务子项</a>
          <a-divider type="vertical" />
          <a @click="sparePartsEdit(record)">备品备件</a>
          <a-divider type="vertical" />
          <a @click="handleDetail(record)">详情(日志)</a>
        </template>
      </span>
    </s-table>
  </a-card>
</template>

<script>
import moment from 'moment'
import { STable, Ellipsis } from '@/components'
import { PageView } from '@/layouts'
import { getRoleList } from '@/api/manage'
import { getTaskList, transformList } from '@/api/mdmc'
// import { mapState } from 'vuex'

const mdmcStatus = [
  { status: null, name: '工单创建中' },
  { status: 1, name: '工单审核未通过' },
  { status: 2, name: '工单已提交' },
  { status: 3, name: '待服务商接单' },
  { status: 4, name: '待分配工程师' },
  { status: 5, name: '待工程师接单' },
  { status: 6, name: '进入维修中' },
  { status: 7, name: '待审核备品备件方案' },
  { status: 8, name: '待用户负责人确认备件方案' },
  { status: 9, name: '待审核备品备件方案' },
  { status: 10, name: '待值机员确认维修结果' },
  { status: 11, name: '待用户负责人审核账单' },
  { status: 12, name: '待值机员评价' },
  { status: 13, name: '工单完成' },
  { status: 14, name: '待平台服务员重新派单' },
  { status: 15, name: '待服务商重新派单' },
  { status: 16, name: '服务商驳回备品备件方案' },
  { status: 17, name: '用户驳回备品备件方案' }
]

export default {
  name: 'MdmcTaskList',
  components: {
    STable,
    Ellipsis,
    PageView
  },
  data () {
    return {
      mdl: {},
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 当前的tab
      mdmcTab: this.$store.state.mdmc.mdmcTab,
      mdmcRole: this.$store.state.mdmc.mdmcRole,
      mdmcStatus: this.$store.state.mdmc.mdmcStatus,
      // 表头
      columns: [
        {
          title: '序号',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '任务名称',
          dataIndex: 'title'
          //  scopedSlots: { customRender: 'title' }
        },
        {
          title: '任务ID',
          dataIndex: 'id'
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          sorter: true
        },
        {
          title: '状态',
          dataIndex: 'status'
        },
        {
          title: '紧急程度',
          dataIndex: 'level'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '300px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        console.log('Tab' + this.mdmcTab)
        console.log('role' + this.mdmcRole)
        switch (this.mdmcTab) {
          // 用户负责人
          case 'principalAll':
            this.mdmcStatus = mdmcStatus[0]
            console.log(this.mdmcStatus)
            break
          case 'principalCheck':
            this.mdmcStatus = mdmcStatus[2]
            break
          case 'principalConfirm':
            this.mdmcStatus = mdmcStatus[8]
            break
          case 'principalPay':
            this.mdmcStatus = mdmcStatus[11]
            break
          case 'principalDone':
            this.mdmcStatus = mdmcStatus[13]
            break
            // 服务商
          case 'facilitatorAll':
            this.mdmcStatus = mdmcStatus[0]
            break
          case 'facilitatorWait':
            this.mdmcStatus = mdmcStatus[3]
            break
          case 'facilitatorAssign':
            this.mdmcStatus = mdmcStatus[4]
            break
          case 'billApproval':
            this.mdmcStatus = mdmcStatus[7]
            break
          case 'facilitatorDone':
            this.mdmcStatus = mdmcStatus[13]
            break
            // 维修工程师
          case 'maintatinerAll':
            this.mdmcStatus = mdmcStatus[0]
            break
          case 'maintainerWait':
            this.mdmcStatus = mdmcStatus[5]
            break
          case 'maintainerExecute':
            this.mdmcStatus = mdmcStatus[6]
            break
          case 'maintainerDone':
            this.mdmcStatus = mdmcStatus[13]
            break
            // 值机员
          case 'watcherAll':
            this.mdmcStatus = mdmcStatus[0]
            break
          case 'orderApproval':
            this.mdmcStatus = mdmcStatus[2]
            break
          case 'serviceFinish':
            this.mdmcStatus = mdmcStatus[10]
            break
          case 'watcherFinish':
            this.mdmcStatus = mdmcStatus[13]
            break
          default :
            this.mdmcStatus = mdmcStatus[0]
        }
        this.queryParam = {
          id: 2,
          status: this.mdmcStatus.status
        }
        console.log('Tab' + this.queryParam.status)
        return getTaskList(Object.assign(parameter, this.queryParam))
          .then(res => {
            console.log('XXXXXXXXres', res)
            res = transformList(res)
            console.log('TTTTTTTTTres', res)
            return res
          })
      },
      selectedRowKeys: [],
      selectedRows: [],

      // custom table alert & rowSelection
      options: {
        alert: {
          show: true,
          clear: () => {
            this.selectedRowKeys = []
          }
        },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      },
      optionAlertShow: false
    }
  },
  /* filters: {
    statusFilter (type) {
      return statusMap[type].text
    },
    statusTypeFilter (type) {
      return statusMap[type].status
    }
  }, */
  mounted () {
    getRoleList({ t: new Date() })
  },
  methods: {
    handleSub (record) {
      console.log('工单号' + JSON.stringify(record))
      this.$router.push({ path: `/mdmc/taskItem/${record.id}` })
    },
    handleDetail (record) {
      this.$router.push({ path: `/mdmc/taskDetail/${record.id}` })
    },
    sparePartsEdit (record) {
      if (record.status !== 0) {
        this.$message.info(`${record.no} 订阅成功`)
      } else {
        this.$message.error(`${record.no} 订阅失败，规则已关闭`)
      }
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
