`<template>
  <a-card title="蜜罐拓扑">
    <network
      class="network"
      :nodes="network.nodes"
      :edges="network.edges"
      :options="network.options"
    ></network>
  </a-card>
</template>

<script>

import { Network } from 'vue-vis-network'
import { getPotList } from '@/api/honeypot'
import Host from '../static/hosting.png'
import Pot from '../static/pot.png'

export default {
  name: 'PotTopology',
  components: {
    Network
  },
  data () {
    return {
      network: {
        nodes: [],
        edges: [],
        options: {
          nodes: {
            shape: 'circle',
            size: 24,
            color: {
              border: 'grey',

              highlight: {
                border: 'black',
                background: 'white'
              },
              hover: {
                border: 'orange',
                background: 'grey'
              }
            },
            font: { color: 'black' },
            shapeProperties: {
              useBorderWithImage: false
            }
          }
        }
      }
    }
  },

  created () {
    this.initTopology()
  },

  methods: {
    initTopology () {
      const that = this
      const node = this.$route.params.id
      getPotList(node).then(res => {
        that.network.nodes.push({
          id: 1,
          label: node,
          shape: 'image',
          image: Host
        })
        let cnt = 2
        res.data.map(function (pot) {
          that.network.nodes.push({
            id: cnt,
            label: '蜜罐名：' + pot.name + '\n协议：' + pot.protocol + '\n被攻击数: ' + pot.attackCnt + '\n端口：' + pot.port,
            shape: 'image',
            image: Pot,
            smooth: true
          })
          that.network.edges.push({
            id: cnt - 1,
            from: cnt,
            to: 1
          })
          cnt++
        })
      })
    }

  }
}
</script>

<style scoped>

.network {
  height: 600px;
  border: 1px solid #ccc;
  margin: 5px 0;
}

</style>
`