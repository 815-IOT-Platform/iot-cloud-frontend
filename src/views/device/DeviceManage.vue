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
                管控该设备
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
      <a-modal v-model ="visible" title="请选择管控方式" @ok="handleOk" destroyOnClose="true">
        <a-tabs default-active-key="1" @change="callback">
          <a-tab-pane key="1" tab="数据查看">
            <real-time-data v-if="activeKey=='1'" :deviceName="selectedDevice" />
            <div v-else/>
          </a-tab-pane>
          <a-tab-pane key="2" tab="设备控制" force-render>
            <!-- <a-button type="primary" @click="setWalkCount(e)">
              设置计步参数
            </a-button>
            &nbsp; -->
            <a-button type="primary" @click="startFatigueTest(e)">
              开启疲劳度测试
            </a-button>
            &nbsp;
            <a-button type="primary" @click="startHeartBeatTest(e)">
              开启心率测试
            </a-button>
            <div>
              <a-form v-show="walkCountVisible" :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="walkCountSet(e)">
                <a-form-item label="身高">
                  <a-input
                    v-decorator="['height', { rules: [{ required: true, message: '请输入您的身高' }] }]"
                  />
                </a-form-item>
                <a-form-item label="体重">
                  <a-input
                    v-decorator="['体重', { rules: [{ required: true, message: '请输入您的体重' }] }]"
                  />
                </a-form-item>
                <a-form-item label="性别">
                  <a-input
                    v-decorator="['sex', { rules: [{ required: true, message: '请输入您的性别' }] }]"
                  />
                </a-form-item>
                <a-form-item label="年龄">
                  <a-input
                    v-decorator="['age', { rules: [{ required: true, message: '请输入您的年龄' }] }]"
                  />
                </a-form-item>
                <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
                  <a-button type="primary" html-type="submit">
                    设置
                  </a-button>
                </a-form-item>
              </a-form>
            </div>
          </a-tab-pane>
          <a-tab-pane key="3" tab="设备信息" force-render>
            <device-info-data v-if="activeKey=='3'" :deviceName="selectedDevice" />
            <div v-else/>
          </a-tab-pane>
        </a-tabs>
      </a-modal>
    </div>
</template>

<script>
import axios from 'axios'
import { getAllEdgeDevice } from '@/api/device'
import RealTimeData from './RealTimeData.vue'
import DeviceInfoData from './DeviceInfoData.vue'

export default {
  name: 'DeviceManage',
  components: {
    RealTimeData,
    DeviceInfoData
  },
  data () {
    return {
      deviceList: [],
      visible: false,
      walkCountVisible: false,
      selectedDevice: "",
      activeKey: "1"
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
      this.selectedDevice = deviceName
      this.visible = true
    },
    handleDeviceChoose (e) {
      console.log("choose")
      const deviceName = e.deviceName
      this.selectedDevice = deviceName
      this.visible = true
    },
    handleOk (e) {
      this.visible = false;
    },
    // setWalkCount (e) {
    //   this.walkCountVisible = true
    //   alert("设置计步参数成功")
    // },
    startFatigueTest (e) {
      this.walkCountVisible = false
      alert("开启疲劳度测试成功")
    },
    startHeartBeatTest (e) {
      this.walkCountVisible = false
      alert("开启心率测试成功")
    },
    walkCountSet (e) {
      e.preventDefault();
      this.walkCountVisible = false
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
      alert("设置计步参数成功！")
    },
    callback (key) {
      console.log(key)
      this.activeKey = key
    }
  }
}
</script>
