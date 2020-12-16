<template>
  <div>
    <a-tabs v-if="principal" default-active-key="principalAll" @change="changeTab">
      <a-tab-pane key="principalAll" tab="全部">
        <imc-task-list v-if="curTab==='principalAll'"/>
      </a-tab-pane>
      <a-tab-pane key="principalCheck" tab="待审核" force-render>
        <imc-task-list v-if="curTab==='principalCheck'"/>
      </a-tab-pane>
      <a-tab-pane key="principalExecute" tab="执行中">
        <imc-task-list v-if="curTab==='principalExecute'"/>
      </a-tab-pane>
      <a-tab-pane key="principalConfirm" tab="待确认">
        <imc-task-list v-if="curTab==='principalConfirm'"/>
      </a-tab-pane>
      <a-tab-pane key="principalPay" tab="待支付">
        <imc-task-list v-if="curTab==='principalPay'"/>
      </a-tab-pane>
      <a-tab-pane key="principalDone" tab="已完成">
        <imc-task-list v-if="curTab==='principalDone'"/>
      </a-tab-pane>
    </a-tabs>
    <a-tabs v-if="facilitator" default-active-key="facilitatorAll" @change="changeTab">
      <a-tab-pane key="facilitatorAll" tab="全部">
        <imc-task-list v-if="curTab==='facilitatorAll'"/>
      </a-tab-pane>
      <a-tab-pane key="facilitatorWait" tab="待接单" force-render>
        <imc-task-list v-if="curTab==='facilitatorWait'"/>
      </a-tab-pane>
      <a-tab-pane key="facilitatorHandle" tab="待处理">
        <imc-task-list v-if="curTab==='facilitatorHandle'"/>
      </a-tab-pane>
      <a-tab-pane key="facilitatorDone" tab="已完成">
        <imc-task-list v-if="curTab==='facilitatorDone'"/>
      </a-tab-pane>
    </a-tabs>
    <a-tabs v-if="maintainer" default-active-key="maintatinerAll" @change="changeTab">
      <a-tab-pane key="maintatinerAll" tab="全部">
        <imc-item-list v-if="curTab==='maintatinerAll'"/>
      </a-tab-pane>
      <a-tab-pane key="maintainerWait" tab="待接单" force-render>
        <imc-item-list v-if="curTab==='maintainerWait'"/>
      </a-tab-pane>
      <a-tab-pane key="maintainerAccept" tab="已接单">
        <imc-item-list v-if="curTab==='maintainerAccept'"/>
      </a-tab-pane>
      <a-tab-pane key="maintainerDone" tab="已完成">
        <imc-item-list v-if="curTab==='maintainerDone'"/>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import ImcTaskList from './ImcTask/Index'
import ImcItemList from './ImcItem/Index'

export default {
  name: 'InspectionTask',
  components: {
    ImcTaskList,
    ImcItemList
  },
  data () {
    return {
      roles: this.$store.state.user.info.roles,
      principal: false,
      facilitator: false,
      maintainer: false,
      curTab: ''
    }
  },
  created () {
    // 判断用户身份
    for (let i = 0; i < this.roles.length; i++) {
      if (this.roles[i].roleKey === 'user_leader') {
        this.principal = true
        this.facilitator = false
        this.maintainer = false
        this.curTab = 'principalAll'
        this.$store.commit('SET_CUR_ROLE', 'principal')
        this.$store.commit('SET_CUR_TAB', 'principalAll')
        break
      } else if (this.roles[i].roleKey === 'fac_leader') {
        this.principal = false
        this.facilitator = true
        this.maintainer = false
        this.curTab = 'facilitatorAll'
        this.$store.commit('SET_CUR_ROLE', 'facilitator')
        this.$store.commit('SET_CUR_TAB', 'facilitatorAll')
        break
      } else if (this.roles[i].roleKey === 'engineer') {
        this.principal = false
        this.facilitator = false
        this.maintainer = true
        this.curTab = 'maintatinerAll'
        this.$store.commit('SET_CUR_ROLE', 'maintainer')
        this.$store.commit('SET_CUR_TAB', 'maintatinerAll')
        break
      }
    }
  },
  methods: {
    changeTab (key) {
      this.curTab = key
      this.$store.commit('SET_CUR_TAB', key)
    }
  }
}
</script>
