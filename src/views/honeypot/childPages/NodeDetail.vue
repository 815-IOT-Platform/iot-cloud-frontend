<template>
  <div class="page-header-index-wide page-header-wrapper-grid-content-main">
    <a-row :gutter="24">
      <a-col :md="24" :lg="7">
        <a-card :bordered="false">
          <div class="account-center-avatarHolder">
            <div class="avatar">
              <img src="../static/hosting.png">
            </div>
            <div class="username">{{ node.name }}</div>
            <div class="bio">节点状态: {{ node.status }}</div>
          </div>
          <div class="account-center-detail">
            <p>
              <i class="address"></i>
              <span>位置: {{ node.addresses[0].address }}</span>
            </p>
            <p>
              <i class="group"></i>
              <span>蜜罐数: {{ node.potNumber }}</span>
            </p>
          </div>
          <a-divider/>

          <div class="account-center-tags">
            <div class="tagsTitle">资源占用</div>
            <div>
              资源占用
            </div>
          </div>
          <a-divider :dashed="true"/>

          <div class="account-center-team">
            <div class="teamTitle">节点配置</div>
            <a-spin :spinning="teamSpinning">
              <div class="members">
                节点配置
              </div>
            </a-spin>
          </div>
        </a-card>
      </a-col>
      <a-col :md="24" :lg="17">
        <a-card
          style="width:100%"
          :bordered="false"
          :tabList="tabListNoTitle"
          :activeTabKey="noTitleKey"
          @tabChange="key => handleTabChange(key, 'noTitleKey')"
        >
          <pot-card v-if="noTitleKey === 'honeypot'" :node="node.name"></pot-card>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { PageView, RouteView } from '@/layouts'
import { getEdgeNode } from '@/api/honeypot'
import { PotCard } from './page'

import { mapGetters } from 'vuex'

export default {
  name: 'NodeDetail',
  components: {
    RouteView,
    PageView,
    PotCard
  },
  data () {
    return {

      teams: [],
      teamSpinning: true,

      tabListNoTitle: [
        {
          key: 'honeypot',
          tab: '蜜罐展示'
        },
        {
          key: 'resource',
          tab: '资源占用'
        },
        {
          key: 'config',
          tab: '节点配置'
        }
      ],
      noTitleKey: 'honeypot',
      node: {}
    }
  },
  mounted () {
    this.getTeams()
  },
  created () {
    this.getNodeInfo(this.$route.params.id)
  },
  methods: {
    ...mapGetters(['nickname', 'avatar']),

    getTeams () {
      this.$http.get('/workplace/teams').then(res => {
        this.teams = res.result
        this.teamSpinning = false
      })
    },

    handleTabChange (key, type) {
      this[type] = key
    },

    getNodeInfo (node) {
      getEdgeNode(node).then(res => {
        this.node = res.data
        console.log(this.node)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.page-header-wrapper-grid-content-main {
  width: 100%;
  height: 100%;
  min-height: 100%;
  transition: 0.3s;

.account-center-avatarHolder {
  text-align: center;
  margin-bottom: 24px;

& > .avatar {
    margin: 0 auto;
    width: 104px;
    height: 104px;
    margin-bottom: 20px;
    border-radius: 50%;
    overflow: hidden;
img {
  height: 100%;
  width: 100%;
}
}

.username {
  color: rgba(0, 0, 0, 0.85);
  font-size: 20px;
  line-height: 28px;
  font-weight: 500;
  margin-bottom: 4px;
}
}

.account-center-detail {
p {
  margin-bottom: 8px;
  padding-left: 26px;
  position: relative;
}

i {
  position: absolute;
  height: 14px;
  width: 14px;
  left: 0;
  top: 4px;
  background: url(https://gw.alipayobjects.com/zos/rmsportal/pBjWzVAHnOOtAUvZmZfy.svg);
}

.title {
  background-position: 0 0;
}
.group {
  background-position: 0 -22px;
}
.address {
  background-position: 0 -44px;
}
}

.account-center-tags {
.ant-tag {
  margin-bottom: 8px;
}
}

.account-center-team {
.members {
a {
  display: block;
  margin: 12px 0;
  line-height: 24px;
  height: 24px;
.member {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
  line-height: 24px;
  max-width: 100px;
  vertical-align: top;
  margin-left: 12px;
  transition: all 0.3s;
  display: inline-block;
}
&:hover {
span {
  color: #1890ff;
}
}
}
}
}

.tagsTitle,
.teamTitle {
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  margin-bottom: 12px;
}
}
</style>
