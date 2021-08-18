<template>
  <div>
    <a-card title="边缘蜜罐总览">
      <a-card-grid v-for="(node) in nodeList" :key="node.name" style="width:25%;text-align:center">
        <a-card hoverable style="width: 240px">
          <img
            slot="cover"
            alt="example"
            src="./static/hosting.png"
          />
          <template slot="actions" class="ant-card-actions">
            <a-button type="primary" ghost @click="checkNodeDetail(node)">
              节点详情
            </a-button>
            <a-button type="primary" ghost @click="managePot(node)">
              蜜罐管控
            </a-button>
          </template>
          <a-card-meta :title="node.name" :description="node.status">
          </a-card-meta>
        </a-card>
      </a-card-grid>
    </a-card>
  </div>
</template>

<script>
import { getAllEdgeNode } from '@/api/honeypot'
export default {
  name: 'potOverview',
  data () {
    return {
      nodeList: []
    }
  },
  beforeCreate () {

  },
  created () {
    getAllEdgeNode().then(res => {
      console.log(res)
      this.nodeList = res.data
    })
  },
  methods: {
    handeleNodeOpt (e) {
      alert(JSON.stringify(e))
    },
    checkNodeDetail (e) {
      console.log(e)
      this.$router.push({ path: `/honeypot/nodeDetail/${e.name}` })
    },
    managePot (e) {
      console.log(e)
      this.$router.push({ path: `/honeypot/potManage` })
    }
  }
}
</script>
