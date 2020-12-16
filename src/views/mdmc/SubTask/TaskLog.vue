
<template>
  <a-card style="margin-top: 24px" :bordered="false" title="操作日志">
    <a-table :columns="operationColumns" :dataSource="operation1" :pagination="false">
    </a-table>
  </a-card>
</template>

<script>
import { mixinDevice } from '@/utils/mixin'
import { PageView } from '@/layouts'

export default {
  name: 'TaskItemLog',
  components: {
    PageView
  },
  mixins: [mixinDevice],
  data () {
    return {
      taskDetail: {},
      taskLogs: [],
      mdmcRole: this.$store.state.mdmc.mdmcRole,
      mdmcStatus: this.$store.state.mdmc.mdmcStatus,
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
          title: '维修任务名称',
          dataIndex: 'title',
          key: 'title'
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
          titile: '维修',
          ipAddress: '120.228.193.23',
          browser: 'Chrome',
          os: 'CentOs',
          statusMsg: '同意执行维修任务'
        }
      ]
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
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
    .status-list {
      text-align: left;
    }
  }
</style>
