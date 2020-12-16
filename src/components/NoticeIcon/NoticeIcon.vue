<template>
  <a-popover
    v-model="visible"
    trigger="click"
    placement="bottomRight"
    overlayClassName="header-notice-wrapper"
    :getPopupContainer="() => $refs.noticeRef.parentElement"
    :autoAdjustOverflow="true"
    :arrowPointAtCenter="true"
    :overlayStyle="{ width: '400px', top: '50px', marginTop: '12px', height: '32px', lineHeight: '32px' }"
  >
    <template slot="content">
      <a-spin :spinning="loading">
        <a-tabs>
          <a-tab-pane tab="未读" key="1">
            <a-list :data-source="unConsumedMsg" :item-layout="horizontal">
              <a-list-item slot="renderItem" slot-scope="item">
                <a-list-item-meta v-if="item.msgType==='IMC_TASK_STATUS'" :description="item.msgBody.statusMsg">
                  <a slot="title">
                    <a-badge dot>
                      <a-button type="link" @click="checkMsg(item)">巡检任务消息</a-button>
                    </a-badge>
                  </a>
                  <a-avatar
                    slot="avatar"
                  >
                    <a-icon slot="icon" style="fontSize: 32px" type="info-circle" theme="twoTone"/>
                  </a-avatar>
                </a-list-item-meta>
                <a-list-item-meta v-if="item.msgType==='IMC_ITEM_STATUS'" :description="item.msgBody.statusMsg">
                  <a slot="title"><a-button type="link" @click="checkMsg(item)">巡检子项消息</a-button></a>
                  <a-avatar
                    slot="avatar"
                  >
                    <a-icon slot="icon" style="fontSize: 32px" type="info-circle" theme="twoTone"/>
                  </a-avatar>
                </a-list-item-meta>
                <div>{{ item.createTime }}</div>
              </a-list-item>
            </a-list>
          </a-tab-pane>
          <a-tab-pane tab="已读" key="2">
            <a-list :data-source="consumedMsg">
              <a-list-item slot="renderItem" slot-scope="item">
                <a-list-item-meta v-if="item.msgType==='IMC_TASK_STATUS'" :description="item.msgBody.statusMsg">
                  <a slot="title"><a-button type="link" @click="checkMsg(item)">巡检任务消息</a-button></a>
                  <a-avatar
                    slot="avatar"
                  >
                    <a-icon slot="icon" style="fontSize: 32px" type="check-circle" theme="twoTone" two-tone-color="#52c41a"/>
                  </a-avatar>
                </a-list-item-meta>
                <a-list-item-meta v-if="item.msgType==='IMC_ITEM_STATUS'" :description="item.msgBody.statusMsg">
                  <a slot="title"><a-button type="link" @click="checkMsg(item)">巡检子项消息</a-button></a>
                  <a-avatar
                    slot="avatar"
                  >
                    <a-icon slot="icon" style="fontSize: 32px" type="check-circle" theme="twoTone" two-tone-color="#52c41a"/>
                  </a-avatar>
                </a-list-item-meta>
                <div>{{ item.createTime }}</div>
              </a-list-item>
            </a-list>
          </a-tab-pane>
        </a-tabs>
      </a-spin>
    </template>
    <span @click="fetchNotice" class="header-notice" ref="noticeRef" style="padding: 0 18px">
      <a-badge :count="total">
        <a-icon style="font-size: 16px; padding: 4px" type="bell" />
      </a-badge>
    </span>
  </a-popover>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'HeaderNotice',
  data () {
    return {
      loading: false,
      visible: false
    }
  },
  computed: mapState({
    unConsumedMsg: state => state.user.unConsumedMsg,
    consumedMsg: state => state.user.consumedMsg,
    total: state => state.user.totalMsg
  }),
  methods: {
    fetchNotice () {
      if (!this.visible) {
        this.loading = true
        setTimeout(() => {
          this.loading = false
        }, 2000)
      } else {
        this.loading = false
      }
      this.visible = !this.visible
    },
    checkMsg (msgItem) {
      console.log(msgItem)
      if (msgItem.status === 0) {
        // 如果消息未消费
        const paramter = {
          id: msgItem.id,
          status: 1
        }
        this.$store.dispatch('ChangeMsgStatus', paramter)
      }
      switch (msgItem.msgType) {
        case 'IMC_TASK_STATUS':
          this.$router.push({ path: `/imc/imcTaskDetail/${msgItem.msgBody.taskId}` })
          break
        case 'IMC_ITEM_STATUS':
          this.$router.push({ path: `/imc/imcItemDetail/${msgItem.msgBody.itemId}` })
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="css">
  .header-notice-wrapper {
    top: 50px !important;
  }
</style>
<style lang="less" scoped>
  .header-notice{
    display: inline-block;
    transition: all 0.3s;

    span {
      vertical-align: initial;
    }
  }
</style>
