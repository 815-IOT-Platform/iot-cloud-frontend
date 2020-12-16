
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
      <detail-list-item term="备注">{{ taskDetail.remark || "--" }}</detail-list-item>
      <detail-list-item term="预计花费"> {{ taskDetail.totalCost||'--' }}</detail-list-item>
      <detail-list-item term="图片预览">{{ 1 }}</detail-list-item>
      <detail-list-item term="地理位置">
        <div class="path-map">
          <Icon class="path-map-icon" type="close-circle" />
          <div style="width: '400px', height: '250px'"></div>
        </div>
      </detail-list-item>
    </detail-list>
    <a-row slot="extra" class="status-list">
      <a-col :xs="12" :sm="12">
        <div class="text">状态</div>
        <div class="heading">{{ taskStatus[taskDetail.status] }}</div>
      </a-col>
      <a-col :xs="12" :sm="12">
        <div class="text">过程相关费用</div>
        <div class="heading">¥ {{ taskDetail.totalCost || 0 }}</div>
      </a-col>
    </a-row>

    <!-- actions -->
    <template slot="action">
      <a-button-group style="margin-right: 4px;">
        <a-button v-has="'mdmc:userLeader:button'" v-if="buttonList['1']" type="primary" style="margin-right: 5px;" @click="approvalOK()">审核通过</a-button>
        <a-button v-has="'mdmc:userLeader:button'"v-if="buttonList['2']" type="primary" style="margin-right: 5px;" @click="approvalReject()">审核不通过</a-button>
        <a-button v-has="'mdmc:facLeader:button'"v-if="buttonList['3']" type="primary" style="margin-right: 5px;" @click="facilitatorAccept()">服务商接单</a-button>
        <a-button v-has="'mdmc:facLeader:button'"v-if="buttonList['4']" type="primary" style="margin-right: 5px;" @click="facilitatorReject()">服务商拒单</a-button>
        <a-button v-has="'mdmc:facLeader:button'"v-if="buttonList['5']" type="primary" style="margin-right: 5px;" @click="engineerAssign()">分配工程师</a-button>
        <a-button v-has="'mdmc:engineer:button'"v-if="buttonList['6']" type="primary" style="margin-right: 5px;" @click="engineerAccept()">工程师接单</a-button>
        <a-button v-has="'mdmc:engineer:button'"v-if="buttonList['7']" type="primary" style="margin-right: 5px;" @click="engineerReject()">工程师拒单</a-button>
        <a-button v-has="'mdmc:engineer:button'"v-if="buttonList['8']" type="primary" style="margin-right: 5px;" @click="resultSubmitByEngineer()">工程师提交维修结果</a-button>
        <a-button v-has="'mdmc:watcher:button'"v-if="buttonList['9']" type="primary" style="margin-right: 5px;" @click="watcherConfirm()">值机员确认维修结果</a-button>
        <a-button v-has="'imc:userLeader:button'"v-if="buttonList['10']" type="primary" style="margin-right: 5px;"@click="pay()">立即支付</a-button>
        <a-button v-has="'mdmc:watcher:button'"v-if="buttonList['11']" type="primary" style="margin-right: 5px;"@click="watcherComment()">值机员评价</a-button>
        <a-button v-has="'mdmc:engineer:button'"v-if="buttonList['12']" type="primary" style="margin-right: 5px;">工程师备件申请</a-button>
        <a-button v-has="'mdmc:facLeader:button'"v-if="buttonList['13']" type="primary" style="margin-right: 5px;"@click="spareOkByfacilitator()">服务商备件方案通过</a-button>
        <a-button v-has="'mdmc:facLeader:button'"v-if="buttonList['14']" type="primary" style="margin-right: 5px;"@click="spareRejectByfacilitator()">服务商备件方案不通过</a-button>
        <a-button v-has="'mdmc:userLeader:button'"v-if="buttonList['15']" type="primary" style="margin-right: 5px;"@click="spareOkByuser()">用户负责人备件方案通过</a-button>
        <a-button v-has="'mdmc:userLeader:button'"v-if="buttonList['16']" type="primary" style="margin-right: 5px;"@click="spareRejectByuser()">用户负责人备件方案通过</a-button>
      </a-button-group>
    </template>

    <a-card :bordered="false" title="流程进度">
      <a-steps :direction="isMobile() && 'vertical' || 'horizontal'" :current="progressStatus" progressDot>
        <a-step title="已提交"></a-step>
        <a-step title="审核通过"></a-step>
        <a-step title="服务商接单"></a-step>
        <a-step title="工程师接单"></a-step>
        <a-step title="已处理"></a-step>
        <a-step title="已付款"></a-step>
        <a-step title="已评价"></a-step>
        </a-step>
      </a-steps>
    </a-card>

    <a-card style="margin-top: 24px" :bordered="false" title="关联项目">
      <detail-list>
        <detail-list-item term="项目编号">838479277384013824</detail-list-item>
        <detail-list-item term="项目名称">北京踊跃科技有限公司公司内部器械日常巡逻检查</detail-list-item>
        <detail-list-item term="用户公司编号">838195509372912640</detail-list-item>
        <detail-list-item term="服务商公司编号">838459462283953152</detail-list-item>
        <detail-list-item term="用户公司名称">北京踊跃科技有限公司</detail-list-item>
        <detail-list-item term="服务商公司名称">北京乐享服务有限公司</detail-list-item>
        <detail-list-item term="用户负责人编号">838248418714321920</detail-list-item>
        <detail-list-item term="服务商负责人编号">838470611079529472</detail-list-item>
        <detail-list-item term="用户负责人姓名">凌凌亦</detail-list-item>
        <detail-list-item term="服务商负责人姓名">朴叙俊</detail-list-item>
        <detail-list-item term="用户负责人电话">13253567703</detail-list-item>
        <detail-list-item term="服务商负责人电话">18801161751</detail-list-item>
        <detail-list-item term="项目是否作废"><a-badge status="cyan" text="有效"/></detail-list-item>
        <detail-list-item term="项目类型">维修项目</detail-list-item>
        <detail-list-item term="项目开始时间">2020-03-02 23:23:22</detail-list-item>
        <detail-list-item term="项目结束时间">2020-03-25 00:00:00</detail-list-item>
        <detail-list-item term="是否签署合同">否</detail-list-item>
        <detail-list-item term="关联合同编号">838478490264147968</detail-list-item>
        <detail-list-item term="项目相关描述">巡检项目</detail-list-item>
      </detail-list>
      <a-card type="inner" title="用户相关联系人">
        <detail-list title="联系人1" size="small">
          <detail-list-item term="姓名">林东东</detail-list-item>
          <detail-list-item term="电话">1234567</detail-list-item>
        </detail-list>
        <detail-list title="联系人2" size="small">
          <detail-list-item term="姓名">林东东</detail-list-item>
          <detail-list-item term="电话">1234567</detail-list-item>
        </detail-list>
        <detail-list title="联系人3" size="small">
          <detail-list-item term="姓名">林东东</detail-list-item>
          <detail-list-item term="电话">1234567</detail-list-item>
        </detail-list>
      </a-card>
    </a-card>

    <!-- 操作 -->
    <a-card style="margin-top: 24px" :bordered="false" title="操作日志">
      <a-table
        :columns="operationColumns"
        :dataSource="taskLogs"
        :pagination="false"
      >
      </a-table>
    </a-card>
    <comment-modal ref="commentmodal" @ok="handleOk"/>
    <engineer-assign-modal ref="engineermodal" @ok="handleOk"/>
    <engineer-rate-modal ref="ratemodal" @ok="handleOk"/>
    <approval-modal ref="approvalmodal" @ok="handleOk"/>
    <result-submit-modal ref="resultmodal" @ok="handleOk"/>
  </page-view>
</template>

<script>
import { mixinDevice } from '@/utils/mixin'
import { PageView } from '@/layouts'
import DetailList from '@/components/tools/DetailList'
import CommentModal from './modules/CommentModal'
import EngineerAssignModal from './modules/EngineerAssignModal'
import EngineerRateModal from './modules/EngineerRateModal'
import ApprovalModal from './modules/ApprovalModal'
import ResultSubmitModal from './modules/ResultSubmitModal'
import { getMdmcTaskDetail, getMdmcTaskLogs, modifyTaskStatusByTaskId, mdmcTaskUpdate } from '@/api/mdmc'

const DetailListItem = DetailList.Item

export default {
  name: 'MdmcTaskDetail',
  components: {
    PageView,
    DetailList,
    DetailListItem,
    CommentModal,
    EngineerAssignModal,
    EngineerRateModal,
    ApprovalModal,
    ResultSubmitModal
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
      progressStatus: 0,
      taskDetail: {},
      taskLogs: [],
      comment: {}, // 值机员评价
      assignDetail: {}, // 分配工程师
      engineerAcceptDetail: {}, // 工程师接单定级
      noteDetail: {}, // 用户备件审核意见
      planApprovalDetail: {}, // 服务商进行计划审批
      commentVisible: false,
      resultVisible: false,
      assignVisible: false,
      engineerAcceptVisible: false,
      managerApprovalVisible: false,
      planApprovalVisible: false,
      taskId: this.$route.params.id,
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
    getMdmcTaskDetail(this.$route.params.id).then(
      res => {
        this.taskDetail = res.data.mdmcTask
        console.log('DDDDDDDD' + JSON.stringify(this.taskDetail))
        const curStatus = this.taskDetail.status
        if (
          curStatus === 2 &&
        (this.mdmcRole === 'user_manager' || this.mdmcRole === 'user_leader' || this.mdmcRolee === 'user_service')
        ) {
          this.buttonList['1'] = true
          this.buttonList['2'] = true
        } else if (
          curStatus === 3 &&
        (this.mdmcRole === 'fac_manager' || this.mdmcRole === 'fac_leader' || this.mdmcRolee === 'fac_service')
        ) {
          this.buttonList['3'] = true
          this.buttonList['4'] = true
        } else if (
          curStatus === 4 &&
        (this.mdmcRole === 'fac_manager' || this.mdmcRole === 'fac_leader' || this.mdmcRolee === 'fac_service')
        ) {
          this.taskDetail['5'] = true
        } else if (curStatus === 5 && this.mdmcRole === 'engineer') {
          this.buttonList['6'] = true
          this.buttonList['7'] = true
        } else if (curStatus === 6 && this.mdmcRole === 'engineer') {
          this.buttonList['8'] = true
        } else if (curStatus === 7 && this.mdmcRole === 'fac_leader') {
          this.buttonList['13'] = true
          this.buttonList['14'] = true
        } else if (curStatus === 8 && this.mdmcRole === 'user_leader') {
          this.buttonList['15'] = true
          this.buttonList['16'] = true
        } else if (curStatus === 10 && this.mdmcRole === 'user_watcher') {
          this.buttonList['9'] = true
        } else if (curStatus === 11 && this.mdmcRole === 'user_leader') {
          this.buttonList['10'] = true
        } else if (curStatus === 12 && this.mdmcRole === 'user_watcher') {
          this.buttonList['11'] = true
        }
      })
    getMdmcTaskLogs(this.$route.params.id).then(
      res => {
        console.log('DDDDDDDD' + JSON.stringify(res))
      })
  },

  methods: {
    handleOk () {
      this.$refs.table.refresh(true)
      console.log('handleSaveOk')
    },
    goBack () {
      this.$router.go(-1)
    },
    approvalOK () {
      this.changeStatus(this.taskId, 3, '审核通过，待服务商接单')
      this.progressStatus = 1
      alert('审核通过，待服务商接单')
    },
    approvalReject () {
      this.changeStatus(this.taskId, 1, '用户负责人审核工单未通过，工单已取消')
      alert('用户负责人审核工单未通过，工单已取消')
    },
    facilitatorAccept () {
      this.changeStatus(this.taskId, 4, '审核通过，待服务商接单')
      this.progressStatus = 2
      alert('审核通过，待服务商接单')
    },
    facilitatorReject () {
      this.changeStatus(this.taskId, 14, '服务商业务员拒绝工单，待平台服务员重新派单')
      alert('服务商业务员拒绝工单，待平台服务员重新派单')
    },
    engineerAssign () {
      this.$refs.engineermodal.add()
    },
    engineerAccept () {
      this.$refs.ratemodal.add()
      this.progressStatus = 3
    },
    engineerReject () {
      this.changeStatus(this.taskId, 15, '工程师拒绝工单，待服务商重新派单')
    },
    resultSubmitByEngineer () {
      mdmcTaskUpdate(this.taskId).then(res => {
        console.log('工程师提交结果' + JSON.stringfy(res))
      })
      this.progressStatus = 4
    },
    watcherConfirm () {
      this.changeStatus(this.taskId, 11, '值机员确认，待用户负责人审核账单')
      this.$refs.resultmodal.add()
      alert('值机员确认，待用户负责人审核账单')
    },
    pay () {
      this.progressStatus = 5
    },
    watcherComment () {
      this.$refs.commentmodal.add()
      this.progressStatus = 6
    },
    spareOkByfacilitator () {
      // 备品备件
    },
    spareRejectByfacilitator () {
      this.changeStatus(this.taskId, 16, '备件库管理员驳回备品备件方案，待工程师重新提交备品备件申请')
    },
    spareOkByuser () {
      this.changeStatus(this.taskId, 3, '审核通过，待服务商接单')
      alert('审核通过，待服务商接单')
    },
    spareRejectByuser () {
      this.changeStatus(this.taskId, 17, '用户负责人驳回备品备件方案，待工程师重新提交备品备件申请')
    },
    changeStatus (id, status, statusMsg) {
      const values = { 'taskId': id, 'status': status, 'statusMsg': statusMsg }
      modifyTaskStatusByTaskId(values).then(res => {
      })
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
