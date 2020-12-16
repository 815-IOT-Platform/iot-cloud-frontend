
<template>
  <page-view :title="'单号：' + taskDetail.id" logo="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png">
    <detail-list slot="headerContent" size="small" :col="2" class="detail-layout">
      <detail-list-item term="任务名称">{{ taskDetail.title || "--" }}</detail-list-item>
      <detail-list-item term="创建人">{{ taskDetail.createBy || "肖华" }}</detail-list-item>
      <detail-list-item term="用户负责人id">{{ taskDetail.principalId || 0 }}</detail-list-item>
      <detail-list-item term="服务商id">{{ taskDetail.facilitatorId || 0 }}</detail-list-item>
      <detail-list-item term="预约时间">{{ taskDetail.appointTime || '--' }}</detail-list-item>
      <detail-list-item term="截止时间">{{ taskDetail.deadline||'--' }}</detail-list-item>
      <detail-list-item term="计划开始时间">{{ taskDetail.scheduledStartTime||'--' }}</detail-list-item>
      <detail-list-item term="计划结束时间">{{ taskDetail.scheduledFinishTime||'--' }}</detail-list-item>
      <detail-list-item term="紧急程度">{{ taskDetail.level===1?'不紧急':(taskDetail.level===2?'一般':(taskDetail.level===3?'紧急':'非常紧急')) }}</detail-list-item>
      <detail-list-item term="实际开始时间">{{ taskDetail.actualStartTime || '--' }}</detail-list-item>
      <detail-list-item term="实际完成时间">{{ taskDetail.actualFinishedTime || '--' }}</detail-list-item>
      <detail-list-item term="故障位置">{{ taskDetail.addressName || '--' }}</detail-list-item>
      <detail-list-item term="故障描述">{{ taskDetail.description || "--" }}</detail-list-item>
    </detail-list>
  </page-view>
</template>

<script>
import { mixinDevice } from '@/utils/mixin'
import { PageView } from '@/layouts'
import DetailList from '@/components/tools/DetailList'
import { getMdmcTaskItemDetail } from '@/api/mdmc'

const DetailListItem = DetailList.Item

export default {
  name: 'MdmcTaskDetail',
  components: {
    PageView,
    DetailList,
    DetailListItem
  },
  mixins: [mixinDevice],
  data () {
    return {
      taskStatus: {
        'null': '工单创建中',
        '1': '工单审核未通过',
        '2': '工单已提交',
        '3': '待服务商接单',
        '4': '待分配工程师',
        '5': '待工程师接单',
        '6': '维修中',
        '7': '待审核备品备件方案',
        '8': '待用户负责人确认备件方案',
        '9': '待审核备品备件方案',
        '10': '待值机员确认维修结果',
        '11': '待用户负责人审核账单',
        '12': '待值机员评价',
        '13': '工单完成',
        '14': '待平台服务员重新派单',
        '15': '待服务商重新派单',
        '16': '服务商驳回备品备件方案',
        '17': '用户驳回备品备件方案'
      },
      buttonList: {
        '1': false, // 用户负责人审核通过
        '2': false, // 用户负责人审核不通过
        '3': false, // 服务商接单
        '4': false, // 服务商拒单
        '5': false, // 服务商分配工程师
        '6': false, //  工程师接单
        '7': false, // 工程师拒单
        '8': false, // 工程师提交维修结果
        '9': false, // 值机员确认维修结果
        '10': false, // 用户负责人立即支付
        '11': false, // 值机员服务评价
        '12': false, // 工程师备件申请
        '13': false, // 服务商备件方案通过
        '14': false, // 服务商备件方案不通过
        '15': false, // 用户负责人备件方案通过
        '16': false // 用户负责人备件方案通过
      },

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
  beforeCreate () {
    getMdmcTaskItemDetail(this.$route.params.id).then(
      res => {
        this.taskDetail = res
      })
  },
  /* getTaskByTaskId(this.$route.params.id).then(res => {
      console.log(res)
      this.taskDetail = res
      // 判断按钮状态
      if (
        this.mdmcStatus.status === 2 &&
        (this.mdmcRole === 'user_manager' || this.mdmcRole === 'user_leader' || this.mdmcRolee === 'user_service')
      ) {
        this.buttonList['1'] = true
        this.buttonList['2'] = true
      } else if (
        this.mdmcStatus.status === 3 &&
        (this.mdmcRole === 'fac_manager' || this.mdmcRole === 'fac_leader' || this.mdmcRolee === 'fac_service')
      ) {
        this.buttonList['3'] = true
        this.buttonList['4'] = true
      } else if (
        this.mdmcStatus.status === 4 &&
        (this.mdmcRole === 'fac_manager' || this.mdmcRole === 'fac_leader' || this.mdmcRolee === 'fac_service')
      ) {
        this.buttonList['5'] = true
      } else if (this.mdmcStatus.status === 5 && this.mdmcRole === 'engineer') {
        this.buttonList['6'] = true
        this.buttonList['7'] = true
      } else if (this.mdmcStatus.status === 6 && this.mdmcRole === 'engineer') {
        this.buttonList['8'] = true
      } else if (this.mdmcStatus.status === 7 && this.mdmcRole === 'fac_leader') {
        this.buttonList['13'] = true
        this.buttonList['14'] = true
      } else if (this.mdmcStatus.status === 8 && this.mdmcRole === 'user_leader') {
        this.buttonList['15'] = true
        this.buttonList['16'] = true
      } else if (this.mdmcStatus.status === 10 && this.mdmcRole === 'user_watcher') {
        this.buttonList['9'] = true
      } else if (this.mdmcStatus.status === 11 && this.mdmcRole === 'user_leader') {
        this.buttonList['10'] = true
      } else if (this.mdmcStatus.status === 12 && this.mdmcRole === 'user_watcher') {
        this.buttonList['11'] = true
      }
    }) */

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
    .text {

    }
    .status-list {
      text-align: left;
    }
  }
</style>
