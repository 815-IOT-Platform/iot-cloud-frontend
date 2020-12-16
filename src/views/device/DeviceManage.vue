<template>
    <div>
        <a-card title="边缘设备展示">
        <a-card-grid v-for="(device) in deviceList" :key="device.deviceName" style="width:25%;text-align:center">
          <a-card hoverable style="width: 240px">
            <img
              slot="cover"
              alt="example"
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603900564400&di=0ecfb4221f92e5f9fb45c713eff7ef73&imgtype=0&src=http%3A%2F%2Fuploadimg2.moore.live%2Fimages%2Fnews%2F2018-11-21%2F060155.jpg"
            />
            <template slot="actions" class="ant-card-actions">
              <a-button type="primary" ghost @click="handleDeviceCheck(device)">
                查看设备数据
              </a-button>
            </template>
            <a-card-meta :title="device.deviceName" :description="device.description">
              <a-avatar
                slot="avatar"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              />
            </a-card-meta>
          </a-card>
        </a-card-grid>
      </a-card>
    </div>
</template>

<script>
import axios from 'axios'
import { getAllEdgeDevice } from '@/api/device'

export default {
  name: 'DeviceManage',
  data () {
    return {
      deviceList: []
    }
  },
  created () {
    getAllEdgeDevice().then(res => {
      console.log(res)
      this.deviceList = res
      console.log(this.deviceList)
    })
  },
  methods: {
    handleDeviceCheck (e) {
      const deviceName = e.deviceName
      axios.get('/api/device/getDeviceData?deviceName=' + deviceName).then((res) => {
        alert(JSON.stringify(res.data))
      }).catch((res) => {
        console.log(res)
        alert('查询失败！')
      })
    }
  }
}
</script>
