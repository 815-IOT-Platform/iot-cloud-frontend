<template>
  <div>
    <a-card title="蜜罐时序数据">
      <a-list item-layout="horizontal" :data-source="potData">
        <a-list-item slot="renderItem" slot-scope="item, index">
          <a-list-item-meta
          >
            <a slot="title">
              <a-descriptions title="Alarm Info">
                <a-descriptions-item label="蜜罐类型">
                  {{ item.category }}
                </a-descriptions-item>
                <a-descriptions-item label="触发时间">
                  {{ getTime(item.date) }}
                </a-descriptions-item>
                <a-descriptions-item label="请求类型">
                  {{ item.type }}
                </a-descriptions-item>
                <a-descriptions-item label="警报详情">
                </a-descriptions-item>
                <li v-for="v, k in item">
                  <h v-if="k !== 'category' && k !== 'date' && k !== 'type'"> {{ k }} : {{ v }} </h>
                  <br />
                </li>
              </a-descriptions>
            </a>
            <a-avatar
              slot="avatar"
              :src="alarm"
            />
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </a-card>
  </div>
</template>

<script>
import { getPotData } from '@/api/honeypot'
import alarmIcon from '../static/alarm.png'

export default {
  name: 'PotData',
  data () {
    return {
      potData: [],
      alarm: alarmIcon
    }
  },

  created () {
    getPotData(this.$route.params.id).then(res => {
      for (let i = 0; i < res.data.length; i++) {
        this.potData.push(JSON.parse(res.data[i].value))
      }
      console.log(this.potData)
    })
  },

  methods: {
    getTime (timestr) {
      return new Date(timestr)
    }
  }
}
</script>

<style scoped>

</style>
