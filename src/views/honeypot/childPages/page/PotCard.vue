<template>
  <div class="app-list">
    <a-list
      :grid="{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }"
      :dataSource="potList"
      :node="node">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-card :hoverable="true">
          <a-card-meta>
            <div style="margin-bottom: 3px" slot="title">{{ item.name }}</div>
            <img slot="avatar" src="../../static/pot.png" width="50rpx" height="50rpx"/>
            <div class="meta-cardInfo" slot="description">
              <div>
                <p>蜜罐状态</p>
                <p>
                  <span>{{ item.status }}</span>
                </p>
              </div>
              <div>
                <p>蜜罐协议</p>
                <p>{{ item.protocol }}</p>
              </div>
              <div>
                <p>蜜罐端口</p>
                <p>{{ item.port }}</p>
              </div>
            </div>
          </a-card-meta>
          <template class="ant-card-actions" slot="actions">
            <a v-if="item.status === 'OFF'">
              <a-button @click="openHoneypot(item.name)">
                开启蜜罐
              </a-button>
            </a>
            <a v-else-if="item.status === 'ON'">
              <a-button @click="closeHoneypot(item.name)">
                关闭蜜罐
              </a-button>
            </a>
            <a>
              <a-button >
                时序数据
              </a-button>
            </a>
          </template>
        </a-card>
      </a-list-item>
    </a-list>

  </div>
</template>

<script>
import { getPotList, openPot, closePot } from '@/api/honeypot'

export default {
  name: 'Pot',
  components: {},
  props: ['node'],
  data () {
    return {
      potList: []
    }
  },
  created () {
    this.getDatasource()
  },
  methods: {
    getDatasource () {
      getPotList(this.node).then(res => {
        this.potList = res.data
        console.log(this.potList)
      })
    },

    openHoneypot (pot) {
      openPot(pot).then(res => {
        console.log(res)
        this.getDatasource()
        alert('开启成功！')
      })
    },

    closeHoneypot (pot) {
      closePot(pot).then(res => {
        this.getDatasource()
        alert('关闭成功！')
      })
    }
  }
}
</script>

<style lang="less" scoped>

  .app-list {

    .meta-cardInfo {
      zoom: 1;
      margin-top: 16px;

      > div {
        position: relative;
        text-align: left;
        float: left;
        width: 50%;

        p {
          line-height: 32px;
          font-size: 24px;
          margin: 0;

          &:first-child {
            color: rgba(0, 0, 0, .45);
            font-size: 12px;
            line-height: 20px;
            margin-bottom: 4px;
          }
        }

      }
    }
  }

</style>
