<template>
    <div>
        当前设备为：{{deviceName}}
        <br/>
        <div>
            设备属性：
            <ul>
                <li v-for="(value,key,index) in properties" :key="key" > 
                    属性：
                    <div>
                        {{index}}: {{key}} ------ {{value}} 
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Stomp from 'stompjs'
export default {
  props: {
    deviceName: String
  },
  data() {
    return {
        connected: false,
        url: 'ws://localhost:7080/ws',
        subscribe: '/queue/Device/' + this.deviceName,
        client: null,
        properties: {},
        propertyType: ""
    }
  },
  created () {
    console.log(this.subscribe)
    this.connect(this.subscribe)
  },
  methods: {
    connect (subscribe) {
        const _this = this
        try {
            const client = Stomp.over(new WebSocket(this.url))
            client.connect({ }, () => {
                this.connected = true
                console.log(`Connect STOMP server success, url = ${_this.url}`)
                try {
                    client.subscribe(_this.subscribe, _this.getSubscribeCallback(_this.subscribe))
                } catch (e) {
                    console.log(`subscribe destination ${_this.subscribe} fail, message = ${e.message}`)
                }
            }, () => {
                _this.connected = false
                console.log('连接断开，5秒后重新连接')
                window.setTimeout(() => {
                    _this.connect(subscribe)
                }, 5000)
            })
            _this.client = client
        } catch (e) {
            console.error('Connect error %o', e)
            console.log(`Connect error, message = ${e.message}, view chrome console for detail`)
            this.connected = false
        }
    },
    getSubscribeCallback (destination) {
        return content => {
            console.log(`Receive subscribed message from destination ${destination}, content = ${content}`)
            this.propertyType = JSON.parse(content.body).msg.propertyType
            if (this.propertyType == "deviceInfo") {
                this.properties = JSON.parse(content.body).msg.properties
            }
        }
    },
    disconnect () {
        if (!this.connected) {
            console.log(`Not Connected Yet`)
            return
        }
        try {
            this.client.disconnect()
            console.log('Close Connection Success')
            this.connected = false
        } catch (e) {
            console.log(`disconnect fail, message = ${e.message}, view chrome console for detail`)
        }
    }
  },
  beforeDestroy () {
    this.disconnect()
  },
  updated () {
    this.subscribe = '/queue/device/' + this.deviceName
  }
}
</script>