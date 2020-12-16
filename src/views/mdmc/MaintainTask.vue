<template>
  <div>
    <a-tabs v-if="principal" default-active-key="principalAll" @change="changeTab">
      <a-tab-pane key="principalAll" tab="全部">
        <mdmc-task-list v-if="curTab==='principalAll'"/>
      </a-tab-pane>
      <a-tab-pane key="principalCheck" tab="待审核" force-render>
        <mdmc-task-list v-if="curTab==='principalCheck'"/>
      </a-tab-pane>
      <a-tab-pane key="principalConfirm" tab="待确认">
        <mdmc-task-list v-if="curTab==='principalConfirm'"/>
      </a-tab-pane>
      <a-tab-pane key="principalPay" tab="待支付">
        <mdmc-task-list v-if="curTab==='principalPay'"/>
      </a-tab-pane>
      <a-tab-pane key="principalDone" tab="已完成">
        <mdmc-task-list v-if="curTab==='principalDone'"/>
      </a-tab-pane>
    </a-tabs>
    <a-tabs v-if="facilitator" default-active-key="facilitatorAll" @change="changeTab">
      <a-tab-pane key="facilitatorAll" tab="全部">
        <mdmc-task-list v-if="curTab==='facilitatorAll'"/>
      </a-tab-pane>
      <a-tab-pane key="facilitatorWait" tab="待接单" force-render>
        <mdmc-task-list v-if="curTab==='facilitatorWait'"/>
      </a-tab-pane>
      <a-tab-pane key="facilitatorAssign" tab="待分配">
        <mdmc-task-list v-if="curTab==='facilitatorAssign'"/>
      </a-tab-pane>
      <a-tab-pane key="billApproval" tab="备件审核">
        <mdmc-task-list v-if="curTab==='billApproval'"/>
      </a-tab-pane>
      <a-tab-pane key="facilitatorDone" tab="已完成">
        <mdmc-task-list v-if="curTab==='facilitatorDone'"/>
      </a-tab-pane>
    </a-tabs>
    <a-tabs v-if="maintainer" default-active-key="maintatinerAll" @change="changeTab">
      <a-tab-pane key="maintatinerAll" tab="全部">
        <mdmc-task-list v-if="curTab==='maintatinerAll'"/>
      </a-tab-pane>
      <a-tab-pane key="maintainerWait" tab="待接单" force-render>
        <mdmc-task-list v-if="curTab==='maintainerWait'"/>
      </a-tab-pane>
      <a-tab-pane key="maintainerExecute" tab="进行中">
        <mdmc-task-list v-if="curTab==='maintainerExecute'"/>
      </a-tab-pane>
      <a-tab-pane key="maintainerDone" tab="已完成">
        <mdmc-task-list v-if="curTab==='maintainerDone'"/>
      </a-tab-pane>
    </a-tabs>
    <a-tabs v-if="watcher" default-active-key="watcher" @change="changeTab">
      <a-tab-pane key="watcherAll" tab="全部">
        <mdmc-task-list v-if="curTab==='watcherAll'"/>
      </a-tab-pane>
      <a-tab-pane key="orderApproval" tab="待审核" force-render>
        <mdmc-item-list v-if="curTab==='orderApproval'"/>
      </a-tab-pane>
      <a-tab-pane key="serviceFinish" tab="待确认">
        <mdmc-task-list v-if="curTab==='serviceFinish'"/>
      </a-tab-pane>
      <a-tab-pane key="watcherFinish" tab="已完成">
        <mdmc-task-list v-if="curTab==='watcherFinish'"/>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>

import MdmcTaskList from './MdmcTask/TaskList'

export default {
  name: 'MdmcTask',
  components: {
    MdmcTaskList
  },
  data () {
    return {
      roles: this.$store.state.user.roles,
      principal: false,
      facilitator: false,
      maintainer: false,
      watcher: false,
      curTab: ''
    }
  },
  created () {
    console.log('角色' + this.roles)
    // 判断用户身份
    for (let i = 0; i < this.roles.length; i++) {
      if (this.roles[i] === 1) {
        this.principal = true
        this.facilitator = false
        this.maintainer = false
        this.watcher = false
        this.curTab = 'principalAll'
        this.$store.commit('SET_MDMC_ROLE', 'principal')
        this.$store.commit('SET_MDMC_TAB', 'principalAll')
        break
      } else if (this.roles[i] === 2) {
        this.principal = false
        this.facilitator = true
        this.maintainer = false
        this.watcher = false
        this.curTab = 'facilitatorAll'
        this.$store.commit('SET_MDMC_ROLE', 'facilitator')
        this.$store.commit('SET_MDMC_TAB', 'facilitatorAll')
        break
      } else if (this.roles[i] === 3) {
        this.principal = false
        this.facilitator = false
        this.maintainer = true
        this.watcher = false
        this.curTab = 'maintatinerAll'
        this.$store.commit('SET_MDMC_ROLE', 'maintainer')
        this.$store.commit('SET_MDMC_TAB', 'maintatinerAll')
        break
      } else if (this.roles[i] === 4) {
        this.principal = false
        this.facilitator = false
        this.maintainer = false
        this.watcher = true
        this.curTab = 'watcherAll'
        this.$store.commit('SET_MDMC_ROLE', 'watcher')
        this.$store.commit('SET_MDMC_TAB', 'watcherAll')
        break
      }
    }
  },
  methods: {
    changeTab (key) {
      this.curTab = key
      this.$store.commit('SET_MDMC_TAB', key)
    }
  }
}
</script>
