
<template>
  <page-view :title="'单号：' + itemId" logo="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png">

    <detail-list slot="headerContent" size="small" :col="2" class="detail-layout">
      <detail-list-item term="任务子项名称">{{ itemDetail.itemName || "巡检任务子项" }}</detail-list-item>
      <detail-list-item term="创建人">{{ itemDetail.createBy || "肖华" }}</detail-list-item>
      <detail-list-item term="创建时间">{{ itemDetail.createTime || 0 }}</detail-list-item>
      <detail-list-item term="更新时间">{{ itemDetail.updateTime || 0 }}</detail-list-item>
      <detail-list-item term="关联任务编号">{{ itemDetail.inspectionTaskId || 0 }}天</detail-list-item>
      <detail-list-item term="巡检周期天数">{{ itemDetail.frequency || 0 }}</detail-list-item>
      <detail-list-item term="计划开始时间">{{ itemDetail.scheduledStartTime || "2020-05-05 00:00:00" }}</detail-list-item>
      <detail-list-item term="计划完成天数">{{ itemDetail.days || 0 }}</detail-list-item>
      <detail-list-item term="巡检点位数量">{{ itemDetail.pointSum || 0 }}个</detail-list-item>
      <detail-list-item term="巡检点位位置">{{ itemDetail.location || "位置" }}</detail-list-item>
      <detail-list-item term="任务子项内容">{{ itemDetail.description || "子项内容" }}</detail-list-item>
      <detail-list-item term="关联单据"><a>12421</a></detail-list-item>
    </detail-list>
    <a-row slot="extra" class="status-list">
      <a-col :xs="12" :sm="12">
        <div class="text">状态</div>
        <div class="heading">{{ itemStatus[itemDetail.status] }}</div>
      </a-col>
    </a-row>
    <!-- actions -->
    <template slot="action">
      <a-button-group style="margin-right: 4px;">
        <a-button type="primary" style="margin-right: 5px;" @click="goBack()">返回</a-button>
        <a-button v-if="buttonList['1']" type="primary" style="margin-right: 5px;">同意执行</a-button>
        <a-button v-if="buttonList['2']" type="primary" style="margin-right: 5px;">否决执行</a-button>
        <a-button v-if="buttonList['3']" type="primary" style="margin-right: 5px;">删除</a-button>
        <a-button v-if="buttonList['4']" type="primary" style="margin-right: 5px;">接单</a-button>
        <a-button v-if="buttonList['5']" type="primary" style="margin-right: 5px;">拒单</a-button>
        <a-button v-if="buttonList['6']" type="primary" style="margin-right: 5px;">确认完成</a-button>
        <a-button v-if="buttonList['7']" type="primary" style="margin-right: 5px;">费用支付</a-button>
        <a-button v-if="buttonList['8']" type="primary" style="margin-right: 5px;">评论</a-button>
        <a-button v-if="buttonList['9']" type="primary" style="margin-right: 5px;">查看评论</a-button>
        <a-button v-if="buttonList['10']" type="primary" style="margin-right: 5px;">巡检报告</a-button>
      </a-button-group>
    </template>

    <a-card :bordered="false" title="流程进度">
      <a-steps :direction="isMobile() && 'vertical' || 'horizontal'" :current="itemDetail.status-1" progressDot>
        <a-step title="待分配">
        </a-step>
        <a-step title="待接单">
        </a-step>
        <a-step title="执行中">
        </a-step>
        <a-step title="待确认">
        </a-step>
        <a-step title="已完成">
        </a-step>
      </a-steps>
    </a-card>

    <a-card style="margin-top: 24px" :bordered="false" title="子项任务执行信息">
      <detail-list>
        <detail-list-item term="工程师编号">{{ itemDetail.maintainerId || 0 }}</detail-list-item>
        <detail-list-item term="工程师姓名">{{ itemDetail.maintainerName || "李力" }}</detail-list-item>
        <detail-list-item term="实际开始时间">{{ itemDetail.actualStartTime || "尚未开始" }}</detail-list-item>
        <detail-list-item term="实际完成时间">{{ itemDetail.actualFinishTime || "尚未完成" }}</detail-list-item>
      </detail-list>
    </a-card>

    <!-- 操作 -->
    <a-card style="margin-top: 24px" :bordered="false" title="操作日志">
      <a-table
        :columns="operationColumns"
        :dataSource="itemLogs"
        :pagination="false"
      >
      </a-table>
    </a-card>
  </page-view>
</template>

<script>
import { mixinDevice } from '@/utils/mixin'
import { PageView } from '@/layouts'
import DetailList from '@/components/tools/DetailList'
import { getItemLogs, getItemByItemId } from '@/api/imc'

const DetailListItem = DetailList.Item

export default {
  name: 'ImcItemDetail',
  components: {
    PageView,
    DetailList,
    DetailListItem
  },
  mixins: [mixinDevice],
  data () {
    return {
      itemStatus: {
        '-1': '已否决',
        '1': '待分配',
        '2': '待接单',
        '3': '执行中',
        '4': '待确认',
        '5': '已完成'
      },
      buttonList: {
        '1': false,
        '2': false,
        '3': false,
        '4': false,
        '5': false,
        '6': false,
        '7': false,
        '8': false,
        '9': false
      },
      itemId: this.$route.params.id,
      itemDetail: null,
      itemLogs: [],
      operationColumns: [
        {
          title: '操作类型',
          dataIndex: 'movement',
          key: 'movement'
        },
        {
          title: '操作人',
          dataIndex: 'updateBy',
          key: 'updateBy'
        },
        {
          title: '操作人ID',
          dataIndex: 'lastOperatorId',
          key: 'lastOperatorId'
        },
        {
          title: '操作时间',
          dataIndex: 'updateTime',
          key: 'updateTime'
        },
        {
          title: '日志ID',
          dataIndex: 'id',
          key: 'id'
        },
        {
          title: '巡检任务名称',
          dataIndex: 'taskName',
          key: 'taskName'
        },
        {
          title: '巡检任务子项名称',
          dataIndex: 'itemName',
          key: 'itemName'
        },
        {
          title: '操作者IP',
          dataIndex: 'ipAddress',
          key: 'ipAddress'
        },
        {
          title: '操作者浏览器',
          dataIndex: 'browser',
          key: 'browser'
        },
        {
          title: '操作者OS',
          dataIndex: 'os',
          key: 'os'
        },
        {
          title: '任务所处状态',
          dataIndex: 'statusMsg',
          key: 'statusMsg'
        }
      ],
      operation1: [
        {
          key: '896174278964154368',
          movement: '同意执行巡检任务',
          updateBy: '金信',
          lastOperatorId: '896174278964154368',
          updatedTime: '2017-10-03  19:23:12',
          id: '896174278964154368',
          taskName: '巡检',
          ipAddress: '120.228.193.23',
          browser: 'Chrome',
          os: 'CentOs',
          statusMsg: '同意执行巡检任务'
        }
      ]
    }
  },
  filters: {
    statusFilter (status) {
      const statusMap = {
        'agree': '成功',
        'reject': '驳回'
      }
      return statusMap[status]
    },
    statusTypeFilter (type) {
      const statusTypeMap = {
        'agree': 'success',
        'reject': 'error'
      }
      return statusTypeMap[type]
    }
  },
  created () {
    this.getItemInfo()
  },
  methods: {
    getItemInfo () {
      getItemByItemId(this.$route.params.id).then(
        res => {
          console.log(res)
          this.itemDetail = res
          if (res.status === 0) {
            this.buttonList['1'] = true
            this.buttonList['2'] = true
            this.buttonList['3'] = true
          } else if (res.status === 4) {
            this.buttonList['6'] = this
          } else if (res.status === 5) {
            this.buttonList['7'] = true
          } else if (res.status === 6) {
            this.buttonList['8'] = true
          } else if (res.status === 7) {
            this.buttonList['9'] = true
            this.buttonList['10'] = true
          }
        }
      )
      getItemLogs(this.$route.params.id).then(
        res => {
          this.itemLogs = res.rows
        }
      )
    },
    goBack () {
      this.$router.push('/imc/inspectionTask')
    }
  },
  watch: {
    '$route': 'getItemInfo'
  }
}
</script>

<style lang="less" scoped>

  .detail-layout {
    margin-left: 44px;
  }
  .text {
    color: rgba(0, 0, 0, .45);
  }

  .heading {
    color: rgba(0, 0, 0, .85);
    font-size: 20px;
  }

  .no-data {
    color: rgba(0, 0, 0, .25);
    text-align: center;
    line-height: 64px;
    font-size: 16px;

    i {
      font-size: 24px;
      margin-right: 16px;
      position: relative;
      top: 3px;
    }
  }

  .mobile {
    .detail-layout {
      margin-left: unset;
    }
    .text {

    }
    .status-list {
      text-align: left;
    }
  }
</style>
