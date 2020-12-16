
<template>
  <page-view :title="'单号：' + taskId" logo="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png">

    <detail-list slot="headerContent" size="small" :col="2" class="detail-layout">
      <detail-list-item term="任务名称">{{ taskDetail.taskName || "巡检任务" }}</detail-list-item>
      <detail-list-item term="创建人">{{ taskDetail.createBy || "肖华" }}</detail-list-item>
      <detail-list-item term="用户负责人">{{ taskDetail.principalName || "肖华" }}</detail-list-item>
      <detail-list-item term="用户负责人id">{{ taskDetail.principalId || 0 }}</detail-list-item>
      <detail-list-item term="服务商">{{ taskDetail.facilitatorName || "北京邮电大学" }}</detail-list-item>
      <detail-list-item term="服务商id">{{ taskDetail.facilitatorId || 0 }}</detail-list-item>
      <detail-list-item term="应巡检点位数">{{ taskDetail.pointSum || 0 }}个</detail-list-item>
      <detail-list-item term="已安排点位数">{{ taskDetail.alreadyPoint || 0 }}个</detail-list-item>
      <detail-list-item term="创建时间">{{ taskDetail.createTime || 0 }}</detail-list-item>
      <detail-list-item term="更新时间">{{ taskDetail.updateTime || 0 }}</detail-list-item>
      <detail-list-item term="计划开始时间">{{ taskDetail.scheduledStartTime || 0 }}</detail-list-item>
      <detail-list-item term="计划完成天数">{{ taskDetail.days || 0 }}天</detail-list-item>
      <detail-list-item term="巡检周期天数">{{ taskDetail.frequency || 0 }}天</detail-list-item>
      <detail-list-item term="实际开始时间">{{ taskDetail.actualStartTime || 0 }}</detail-list-item>
      <detail-list-item term="实际完成时间">{{ taskDetail.actualFinishedTime || 0 }}</detail-list-item>
      <detail-list-item term="备注">{{ taskDetail.remark || "请于两个工作日内确认" }}</detail-list-item>
      <detail-list-item term="巡检任务内容">{{ taskDetail.content || "巡检任务" }}</detail-list-item>
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
        <a-button type="primary" style="margin-right: 5px;" @click="goBack()">返回</a-button>
        <a-button v-has="'imc:userLeader:button'" v-if="buttonList['1']" type="primary" style="margin-right: 5px;" @click="acceptTask()">同意执行</a-button>
        <a-button v-has="'imc:userLeader:button'" v-if="buttonList['2']" type="primary" style="margin-right: 5px;" @click="denyTask()">否决执行</a-button>
        <a-button v-has="'imc:userLeader:button'" v-if="buttonList['3']" type="primary" style="margin-right: 5px;" @click="deleteTask()">删除</a-button>
        <a-button v-has="'imc:facLeader:button'" v-if="buttonList['4']" type="primary" style="margin-right: 5px;" @click="facAcceptTask()">接单</a-button>
        <a-button v-has="'imc:facLeader:button'" v-if="buttonList['5']" type="primary" style="margin-right: 5px;" @click="facRefuseTask()">拒单</a-button>
        <a-button v-has="'imc:userLeader:button'" v-if="buttonList['6']" type="primary" style="margin-right: 5px;" @click="confirmTask()">确认完成</a-button>
        <a-button v-has="'imc:userLeader:button'" v-if="buttonList['7']" type="primary" style="margin-right: 5px;" @click="payTask()">费用支付</a-button>
        <a-button v-has="'imc:userLeader:button'" v-if="buttonList['8']" type="primary" style="margin-right: 5px;" @click="previewTask()">评论</a-button>
        <a-button v-has="'imc:userLeader:button'" v-if="buttonList['9']" type="primary" style="margin-right: 5px;">查看评论</a-button>
        <a-button v-has="'imc:userLeader:button'" v-if="buttonList['10']" type="primary" style="margin-right: 5px;" @click="getTaskReport()">巡检报告</a-button>
      </a-button-group>
    </template>

    <a-card :bordered="false" title="流程进度">
      <a-steps :direction="isMobile() && 'vertical' || 'horizontal'" :current="taskDetail.status" progressDot>
        <a-step title="待审核">
        </a-step>
        <a-step title="待分配">
        </a-step>
        <a-step title="待接单">
        </a-step>
        <a-step title="执行中">
        </a-step>
        <a-step title="待确认">
        </a-step>
        <a-step title="待付款">
        </a-step>
        <a-step title="待评价">
        </a-step>
        <a-step title="已完成">
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
        rowKey="id"
      >
      </a-table>
    </a-card>
  </page-view>
</template>

<script>
import { mixinDevice } from '@/utils/mixin'
import { PageView } from '@/layouts'
import DetailList from '@/components/tools/DetailList'
import { getTaskByTaskId, getTaskLogs, acceptImcTaskByPrincipal, denyImcTaskByPrincipal, modifyTaskStatus, acceptTaskByFacilitator, refuseTaskByFacilitator, deleteTask, getTaskReport } from '@/api/imc'

const DetailListItem = DetailList.Item

export default {
  name: 'ImcTaskDetail',
  components: {
    PageView,
    DetailList,
    DetailListItem
  },
  mixins: [mixinDevice],
  data () {
    return {
      taskStatus: {
        '-1': '已否决',
        '0': '待审核',
        '1': '待分配',
        '2': '待接单',
        '3': '执行中',
        '4': '待确认',
        '5': '待付款',
        '6': '待评价',
        '7': '已完成'
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
      taskId: this.$route.params.id,
      taskDetail: null,
      taskLogs: [],
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
    console.log(this.$store.state.user.buttons)
    this.getTaskInfo()
  },
  methods: {
    getTaskInfo () {
      getTaskByTaskId(this.$route.params.id).then(
        res => {
          console.log(res)
          this.taskDetail = res
          if (res.status === 0) {
            this.buttonList['1'] = true
            this.buttonList['2'] = true
            this.buttonList['3'] = true
          } else if (res.status === 2) {
            this.buttonList['4'] = true
            this.buttonList['5'] = true
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
      getTaskLogs(this.$route.params.id).then(
        res => {
          this.taskLogs = res.rows
        }
      )
    },
    goBack () {
      this.$router.push('/imc/inspectionTask')
    },
    acceptTask () {
      const parameter = {
        taskId: this.taskId
      }
      console.log(parameter)
      acceptImcTaskByPrincipal(parameter).then(res => {
        console.log(res)
        if (res.msg === 'success') {
          alert('审批成功')
          this.$router.go(-1)
        } else {
          alert('审批失败')
          this.$router.go(-1)
        }
      })
    },
    denyTask () {
      const parameter = {
        taskId: this.taskId
      }
      denyImcTaskByPrincipal(parameter).then(res => {
        console.log(res)
        if (res.msg === 'success') {
          alert('否决成功')
          this.$router.go(-1)
        } else {
          alert('否决失败')
          this.$router.go(-1)
        }
      })
    },
    confirmTask () {
      const parameter = {
        taskId: this.taskId,
        status: 5
      }
      modifyTaskStatus(parameter).then(res => {
        console.log(res)
        if (res.msg === 'success') {
          alert('确认成功')
          this.$router.go(-1)
        } else {
          alert('确认失败')
          this.$router.go(-1)
        }
      })
    },
    payTask () {
      const parameter = {
        taskId: this.taskId,
        status: 6
      }
      modifyTaskStatus(parameter).then(res => {
        console.log(res)
        if (res.msg === 'success') {
          alert('支付成功')
          this.$router.go(-1)
        } else {
          alert('支付失败')
          this.$router.go(-1)
        }
      })
    },
    previewTask () {
      const parameter = {
        taskId: this.taskId,
        status: 7
      }
      modifyTaskStatus(parameter).then(res => {
        console.log(res)
        if (res.msg === 'success') {
          alert('评论成功')
          this.$router.go(-1)
        } else {
          alert('评论失败')
          this.$router.go(-1)
        }
      })
    },
    facAcceptTask () {
      acceptTaskByFacilitator(this.taskId).then(res => {
        console.log(res)
        if (res.msg === 'success') {
          alert('接单成功')
          this.$router.go(-1)
        } else {
          alert('接单失败')
          this.$router.go(-1)
        }
      })
    },
    facRefuseTask () {
      refuseTaskByFacilitator(this.taskId).then(res => {
        console.log(res)
        if (res.msg === 'success') {
          alert('拒单成功')
          this.$router.go(-1)
        } else {
          alert('拒单失败')
          this.$router.go(-1)
        }
      })
    },
    deleteTask () {
      deleteTask(this.taskId).then(res => {
        console.log(res)
        if (res.msg === 'success') {
          alert('删除成功')
          this.$router.go(-1)
        } else {
          alert('删除失败')
          this.$router.go(-1)
        }
      })
    },
    getTaskReport () {
      getTaskReport(this.taskId).then(res => {
        console.log(res.data)
        window.open(res.data)
      })
    }
  },
  watch: {
    '$route': 'getTaskInfo'
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
