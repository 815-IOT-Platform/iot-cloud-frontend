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
            <div class="tagsTitle">蜜罐管理</div>
              <a-button type="primary" style="margin-left:50px;" @click="showModal">新增蜜罐</a-button>
              <a-button type="primary" style="margin-left:50px;">综合分析</a-button>
          </div>
          <a-divider :dashed="true"/>
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
          <node-status v-else-if="noTitleKey === 'resource'" :node="node"></node-status>
        </a-card>
      </a-col>
    </a-row>
    <a-modal v-model="visible" title="新增蜜罐" :footer="null">
      <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
        <a-form-item label="蜜罐协议">
          <a-select :size="size" initialValue="a1" v-decorator="['protocol', { rules: [{ required: true, message: '请输入蜜罐协议' }] }]" @change="handleSelect">
            <a-select-option v-for="protocol in protocols" :key="protocol" :value="protocol">
              {{ protocol }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="蜜罐端口">
          <a-input
            v-decorator="['port', { rules: [{ required: true, message: '请输入蜜罐的端口' }] }]"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          <a-button type="primary" html-type="submit">
            创建
          </a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { PageView, RouteView } from '@/layouts'
import { getEdgeNode, createPot } from '@/api/honeypot'
import { PotCard, NodeStatus } from './page'

export default {
  name: 'NodeDetail',
  components: {
    RouteView,
    PageView,
    PotCard,
    NodeStatus
  },
  data () {
    return {
      visible: false,
      tabListNoTitle: [
        {
          key: 'honeypot',
          tab: '蜜罐展示'
        },
        {
          key: 'resource',
          tab: '节点详情'
        }
      ],
      noTitleKey: 'honeypot',
      node: {},
      protocols: [
        'REDIS',
        'TELNET',
        'HTTP',
        'HTTPS'
      ],
      selectedProtocol: '',
      form: this.$form.createForm(this, { name: 'pot' })
    }
  },
  mounted () {
    this.getTeams()
  },
  created () {
    this.getNodeInfo(this.$route.params.id)
  },
  methods: {

    handleTabChange (key, type) {
      this[type] = key
    },

    getNodeInfo (node) {
      getEdgeNode(node).then(res => {
        this.node = res.data
        console.log(this.node)
      })
    },

    handleOk (e) {
      console.log(e)
      this.visible = false
    },

    showModal () {
      this.visible = true
    },

    handleSelect (e) {
      console.log('select protocol is ' + e)
      this.selectedProtocol = e
    },

    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          const pot = {
            port: values.port,
            protocol: values.protocol,
            node: this.node.name,
            status: 'OFF'
          }
          createPot(pot).then(res => {
            alert('蜜罐创建成功！')
            this.visible = false
          })
        }
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
