<template>
  <div>
    <a-card title="全局拓扑">
      <network
        class="network"
        :nodes="network.nodes"
        :edges="network.edges"
        :options="network.options"
      ></network>
    </a-card>
  </div>
</template>

<script>
import { Network } from 'vue-vis-network'
import Host from './static/hosting.png'
import Pot from './static/pot.png'
import master from './static/k8s.png'
import { getAllEdgeNode, getPotList } from '@/api/honeypot'

export default {
  name: 'Visualization',
  components: {
    Network
  },
  data() {
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
  methods: {
    initTopology() {
      this.network.nodes.push({
        id: 1,
        label: 'master',
        shape: 'image',
        image: master
      })
      let that = this
      let nodeCnt = 2
      let edgeCnt = 0
      getAllEdgeNode().then(res => {
        res.data.map(function (node) {
          that.network.nodes.push({
            id: nodeCnt,
            label: node.name,
            shape: 'image',
            image: Host
          })
          that.network.edges.push({
            id: edgeCnt,
            from: nodeCnt,
            to: 1
          })
          let edgeNode = nodeCnt
          edgeCnt++
          nodeCnt++
          getPotList(node.name).then(res => {
            res.data.map(function (pot) {
              that.network.nodes.push({
                id: nodeCnt,
                label: '蜜罐名：' + pot.name + '\n协议：' + pot.protocol + '\n被攻击数: ' + pot.attackCnt + '\n端口：' + pot.port,
                shape: 'image',
                image: Pot,
                smooth: true
              })
              that.network.edges.push({
                id: edgeCnt,
                from: nodeCnt,
                to: edgeNode
              })
              edgeCnt++
              nodeCnt++
            })
          })
        })
      })
    }
  },
  created () {
    this.initTopology()
  },
}
</script>

<style scoped>

.network {
  height: 600px;
  border: 1px solid #ccc;
  margin: 5px 0;
}

</style>

