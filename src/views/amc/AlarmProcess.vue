<template>
  <div>
    <a-row :gutter="30">
      <a-col :span="4">
        <a-card title="告警总数" :bordered="true" style="width:150px; fontsize:14px; fontweight:500">
          <h2 align="center">{{ this.allAlarmCount }}</h2>
        </a-card>
      </a-col>
      <a-col :span="4">
        <a-card title="急需处理告警数" :bordered="true" style="width: 150px">
          <h2 align="center">{{ this.urgencyCount }}</h2>
        </a-card>
      </a-col>
      <a-col :span="4">
        <a-card title="未处理告警数" :bordered="true" style="width: 150px">
          <h2 align="center">{{ this.dealingCount }}</h2>
        </a-card>
      </a-col>
      <a-col :span="4">
        <a-card title="已处理告警数" :bordered="true" style="width: 150px">
          <h2 align="center">{{ this.dealedCount }}</h2>
        </a-card>
      </a-col>
      <a-col :span="4">
        <a-card title="告警处理率" :bordered="true" style="width: 150px">
          <h2 align="center">{{ this.dealRatio }}%</h2>
        </a-card>
      </a-col>
    </a-row>
    <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="1" tab="全部">
        <a-table :data-source="data">
          <a-table-column key="key" title="序号" data-index="key"/>
          <a-table-column key="alarmName" title="告警名称" data-index="alarmName" />
          <a-table-column key="id" title="告警唯一编号" data-index="id" />
          <a-table-column key="alarmAsset" title="告警资产" data-index="alarmAsset" />
          <a-table-column key="alarmLocation" title="告警设备位置" data-index="alarmLocation" />
          <a-table-column key="lastOccurTime" title="最近发生时间" data-index="lastOccurTime" />
          <a-table-column key="alarmLevel" title="等级" data-index="alarmLevel">
            <template slot-scope="tags">
              <span>
                <a-tag v-for="tag in tags" :key="tag" :color="tag==='紧急' ? 'red':(tag==='可疑' ? 'orange':'green')">{{ tag }}</a-tag>
              </span>
            </template>
          </a-table-column>
          <a-table-column key="alarmStatus" title="状况" data-index="alarmStatus">
            <template slot-scope="tags">
              <span>
                <a-tag v-for="tag in tags" :key="tag" :color="tag==='已处理' ? 'green':'red'">{{ tag }}</a-tag>
              </span>
            </template>
          </a-table-column>
          <a-table-column key="action" title="操作">
            <template slot-scope="text, record">
              <span>
                <a @click="toDetail(record)">详情</a>
                <a-divider type="vertical" />
              </span>
            </template>
          </a-table-column>
        </a-table>
      </a-tab-pane>
      <a-tab-pane key="2" tab="未处理" force-render>
        未处理
      </a-tab-pane>
      <a-tab-pane key="3" tab="已处理">
        已处理
      </a-tab-pane>
    </a-tabs>

  </div>
</template>

<script>
import { getAllAlarmCount, getUrgencyCount, getDealingCount, getDealedCount, getAlarmList } from '@/api/amc'
import { formatDate } from '@/views/amc/formatDate'
const data = []
export default {
  name: 'AlarmProcess',
  data () {
    return {
      data,
      allAlarmCount: null,
      urgencyCount: null,
      dealingCount: null,
      dealedCount: null,
      dealRatio: null
    }
  },
  created () {
    getAllAlarmCount().then(res => {
      this.allAlarmCount = res['data']
      getDealedCount().then(res => {
        this.dealedCount = res['data']
        this.dealRatio = (100 * this.dealedCount / this.allAlarmCount).toFixed(2)
      })
    })
    getUrgencyCount().then(res => {
      this.urgencyCount = res['data']
    })
    getDealingCount().then(res => {
      this.dealingCount = res['data']
    })
    getAlarmList().then(res => {
      this.data = res['rows']
      this.total = parseInt(res['total'])
      for (var i = 0; i < this.total; i++) {
        this.$set(this.data[i], 'key', i + 1)
        const date = new Date(this.data[i].lastOccurTime)
        this.data[i].lastOccurTime = formatDate(date, 'yyyy-MM-dd hh:mm')
        if (this.data[i].alarmLevel === 1) {
          this.data[i].alarmLevel = ['紧急']
        } else if (this.data[i].alarmLevel === 2) {
          this.data[i].alarmLevel = ['可疑']
        } else {
          this.data[i].alarmLevel = ['提醒']
        }
        if (this.data[i].alarmStatus === 0) {
          this.data[i].alarmStatus = ['已处理']
        } else {
          this.data[i].alarmStatus = ['未处理']
        }
      }
    })
  },
  methods: {
    confirm (record) {
      if (record.tags[0] === '未处理') {
        this.$set(record.tags, 0, '已处理')
      } else if (record.tags[0] === '已处理') {
        this.$set(record.tags, 0, '未处理')
      }
      this.$message.success('修改成功')
    },
    toDetail (record) {
      this.$router.push({ path: `/amc/amcTaskDetail/${ record.id }` })
    }
  }
}
</script>

<style scoped>

</style>
