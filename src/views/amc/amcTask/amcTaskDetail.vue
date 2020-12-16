<template>
  <div>
    <page-view
      :title="'告警编号： ' + taskId"
      logo="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png"
    >
      <detail-list slot="headerContent" size="small" :col="2" class="detail-layout">
        <detail-list-item term="告警名称">{{ taskDetail.alarmName || '告警名称' }}</detail-list-item>
        <detail-list-item term="告警类型">{{ taskDetail.alarmType || '告警类型' }}</detail-list-item>
        <detail-list-item term="告警等级">{{ taskDetail.alarmLevelWord || '提醒' }}</detail-list-item>
        <detail-list-item term="告警位置">{{ taskDetail.alarmLocation || '北京市' }}</detail-list-item>
        <detail-list-item term="告警位置经度">{{ taskDetail.alarmLongtitude || '116' }}</detail-list-item>
        <detail-list-item term="告警位置纬度">{{ taskDetail.alarmLatitude || '40' }}</detail-list-item>
        <detail-list-item term="最近发生时间">{{ lastOccurTimeFormat || '2000-01-01 00:00:00' }}</detail-list-item>
        <detail-list-item term="警情描述">{{ taskDetail.description || '无' }}</detail-list-item>
        <detail-list-item term="告警备注">{{ taskDetail.remark || '无' }}</detail-list-item>
      </detail-list>
      <a-row slot="extra">
        <a-col :xs="12" :sm="12">
          <div class="text">处理状态</div>
          <div class="heading">{{ taskDetail.alarmStatusWord }}</div>
        </a-col>
      </a-row>
      <template slot="action">
        <a-button-group style="margin-right: 4px;">
          <a-button type="primary" style="margin-right: 5px;" @click="goBack()">返回</a-button>
          <a-button
            type="primary"
            style="margin-right: 5px;"
            @click="dealAlarm()"
            v-if="dealButtonAppear"
          >处理告警</a-button>
          <a-button type="primary" style="margin-right: 5px;" @click="deleteAlarm()">删除告警</a-button>
          <a-button
            type="primary"
            style="margin-right: 5px;"
            @click="makeNewOrder()"
            v-if="makeOrderButtonAppear"
          >处理（同时发起工单）</a-button>
          <a-button
            type="primary"
            style="margin-right: 5px;"
            @click="showOrderInfo()"
            v-if="orderDetailButtonAppear"
          >查看工单</a-button>
        </a-button-group>
      </template>
      <a-card :bordered="false" title="创建与更新信息" style="margin-top: 24px">
        <detail-list>
          <detail-list-item term="创建时间">{{ taskDetail.createTime || '2000-01-01 00:00:00' }}</detail-list-item>
          <detail-list-item term="创建人id">{{ taskDetail.creatorId || '0' }}</detail-list-item>
          <detail-list-item term="创建人名称">{{ taskDetail.createBy || 'liupeihan' }}</detail-list-item>
          <detail-list-item term="更新时间">{{ taskDetail.updateTime || '2000-01-01 00:00:00' }}</detail-list-item>
          <detail-list-item term="更新人id">{{ taskDetail.lastOperatorId || '0' }}</detail-list-item>
          <detail-list-item term="更新人名称">{{ taskDetail.updateBy || 'liupeihan' }}</detail-list-item>
        </detail-list>
      </a-card>
      <a-card :bordered="false" title="其它相关信息" style="margin-top: 24px">
        <detail-list>
          <detail-list-item term="公司id">{{ taskDetail.companyId || '1' }}</detail-list-item>
          <detail-list-item term="公司名称">{{ taskDetail.companyName || '北京邮电大学' }}</detail-list-item>
          <detail-list-item term="告警部门id">{{ taskDetail.deptId || '103' }}</detail-list-item>
          <detail-list-item term="告警部门名称">{{ taskDetail.deptName || '研发部门' }}</detail-list-item>
          <detail-list-item term="受影响资产数额">{{ taskDetail.alarmAsset || '1000' }}</detail-list-item>
          <detail-list-item term="受影响资产类型">{{ taskDetail.assetType || '现金' }}</detail-list-item>
        </detail-list>
      </a-card>
    </page-view>
    <a-drawer
      width="1000"
      :visible="showNewOrderVisible"
      placement="right"
      :closable="true"
      @close="closeNewOrder"
    >
      <a-page-header title="发起工单" :sub-title="'为名为 ' + taskDetail.alarmName + ' 的告警新增工单'"></a-page-header>
      <a-form @submit="handleOrderSubmit" :form="form">
        <a-form-item
          label="计划开始时间"
          :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
          :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
        >
          <a-date-picker
            v-decorator="['earliestTime', { rules: [{ required: true }] }]"
            name="earliestTime"
            placeholder="请输入计划开始时间"
            style="width:50%"
            show-time
          />
        </a-form-item>
        <a-form-item
          label="最晚维修时间"
          :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
          :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
        >
          <a-date-picker
            v-decorator="['latestTime', { rules: [{ required: true }] }]"
            name="latestTime"
            placeholder="请输入最晚维修时间"
            style="width:50%"
            show-time
          />
        </a-form-item>
        <a-form-item
          label="费用"
          :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
          :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
        >
          <a-input
            v-decorator="['cost', { rules: [{ required: true }] }]"
            name="cost"
            placeholder="请指定费用"
            style="width:50%"
            required="required"
          />
        </a-form-item>
        <a-form-item
          label="备注"
          :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
          :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
        >
          <a-textarea
            rows="4"
            v-decorator="['remark', { rules: [{ required: true }] }]"
            name="remark"
            placeholder="请输入备注"
          />
        </a-form-item>
        <a-form-item :wrapper="{ span: 24 }" style="text-align: center">
          <a-button htmlType="submit" type="primary">发起工单</a-button>
        </a-form-item>
      </a-form>
    </a-drawer>
    <a-drawer
      :visible="showOrderInfoVisible"
      width="1000"
      placement="right"
      :closable="true"
      @close="closeOrderInfo"
    >
      <a-page-header title="工单详情" :sub-title="'告警名为' + taskDetail.alarmName + '的工单详情'"></a-page-header>
      <a-descriptions bordered size="small" :column="2">
        <a-descriptions-item label="工单id">{{ orderInfo.id || '123456' }}</a-descriptions-item>
        <a-descriptions-item label="费用">{{ orderInfo.cost || '10000' }}</a-descriptions-item>
        <a-descriptions-item label="计划开始时间">{{ orderInfo.earliestTime || '未填写' }}</a-descriptions-item>
        <a-descriptions-item label="最晚维修时间">{{ orderInfo.latestTime || '未填写' }}</a-descriptions-item>
        <a-descriptions-item label="签订时间">{{ orderInfo.orderTime || '2000-01-01 00:00:00' }}</a-descriptions-item>
        <a-descriptions-item label="接单人所在公司">{{ orderInfo.userCompony || '北京邮电大学' }}</a-descriptions-item>
        <a-descriptions-item label="接单人ID">{{ orderInfo.userId || '1' }}</a-descriptions-item>
        <a-descriptions-item label="接单人名">{{ orderInfo.userName || 'anan' }}</a-descriptions-item>
        <a-descriptions-item label="接单人联系电话" :span="2">{{ orderInfo.userPhone || '12345678900' }}</a-descriptions-item>
        <a-descriptions-item label="备注" :span="2">{{ orderInfo.remark || '无备注内容' }}</a-descriptions-item>
      </a-descriptions>
    </a-drawer>
  </div>
</template>

<script>
import { getAlarmById, update, remove, addOrder, getOrderByAlarm } from '@/api/amc'
import { PageView } from '@/layouts'
import { formatDate } from '@/views/amc/formatDate'
import DetailList from '@/components/tools/DetailList'

const DetailListItem = DetailList.Item

export default {
  name: 'AmcTaskDetail',
  components: {
    PageView,
    DetailList,
    DetailListItem
  },
  data () {
    return {
      taskId: this.$route.params.id,
      taskDetail: null,
      lastOccurTimeFormat: null,
      dealButtonAppear: false, // 处理告警按钮是否显示
      showNewOrderVisible: false,
      form: this.$form.createForm(this),
      orderInfo: null,
      showOrderInfoVisible: false, // 工单详情页面抽屉是否展开
      makeOrderButtonAppear: false, // 发起工单按钮是否显示
      orderDetailButtonAppear: false // 工单详情按钮是否显示
    }
  },
  created () {
    getAlarmById(this.$route.params.id).then(res => {
      this.taskDetail = res
      if (this.taskDetail.alarmLevel === 1) {
        this.$set(this.taskDetail, 'alarmLevelWord', '紧急')
      } else if (this.taskDetail.alarmLevel === 2) {
        this.$set(this.taskDetail, 'alarmLevelWord', '可疑')
      } else {
        this.$set(this.taskDetail, 'alarmLevelWord', '提醒')
      }
      const date = new Date(this.taskDetail.lastOccurTime)
      this.lastOccurTimeFormat = formatDate(date, 'yyyy-MM-dd hh:mm')
      if (this.taskDetail.alarmStatus === 0) {
        this.$set(this.taskDetail, 'alarmStatusWord', '已处理')
        // this.dealButtonAppear = false
      } else {
        this.$set(this.taskDetail, 'alarmStatusWord', '未处理')
        // this.dealButtonAppear = true
      }
      getOrderByAlarm(this.taskId).then(order => {
        // res为告警信息，order为工单信息
        if (order.id != null) {
          // 工单信息不为空，允许查看工单详情，不允许发起工单
          this.orderDetailButtonAppear = true
        } else {
          // 工单详情为空，允许发起工单，不允许查看工单详情
          this.makeOrderButtonAppear = true
        }
        this.orderInfo = order
      })
    })
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    dealAlarm () {
      const anAmcAlarm = {}
      this.$set(anAmcAlarm, 'id', this.$route.params.id)
      this.$set(anAmcAlarm, 'alarmStatus', 0)
      update(anAmcAlarm).then(res => {
        if (res.msg === 'success') {
          alert('告警处理成功')
          this.$router.go(-1)
        } else {
          alert('告警处理失败')
          this.$router.go(-1)
        }
      })
    },
    deleteAlarm () {
      const parameter = 'ids=' + this.$route.params.id
      remove(parameter).then(res => {
        if (res.msg === 'success') {
          alert('删除成功')
          this.$router.go(-1)
        } else {
          alert('删除失败')
          this.$router.go(-1)
        }
      })
    },
    makeNewOrder () {
      this.showNewOrderVisible = true
    },
    closeNewOrder () {
      this.showNewOrderVisible = false
    },
    handleOrderSubmit (e) {
      e.preventDefault()
      const value = this.form.getFieldsValue()
      const anAmcAlarm = {}
      this.$set(anAmcAlarm, 'id', this.taskId)
      this.$set(value, 'anAmcAlarm', anAmcAlarm)
      addOrder(value).then(res => {
        const anAmcAlarm2 = {}
        this.$set(anAmcAlarm2, 'id', this.$route.params.id)
        this.$set(anAmcAlarm2, 'alarmStatus', 0)
        update(anAmcAlarm2).then(res => {
          if (res.msg === 'success') {
            alert('告警处理成功')
          } else {
            alert('告警处理失败')
          }
          this.$router.push('/amc/alarmProcess')
        })
      })
    },
    testHandle (e) {
      addOrder('{}')
    },
    showOrderInfo () {
      this.showOrderInfoVisible = true
    },
    closeOrderInfo () {
      this.showOrderInfoVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
.detail-layout {
  margin-left: 44px;
}
.text {
  color: rgba(0, 0, 0, 0.45);
}

.heading {
  color: rgba(0, 0, 0, 0.85);
  font-size: 20px;
}

.no-data {
  color: rgba(0, 0, 0, 0.25);
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
