<template>
  <transition name="showHeader">
    <div v-if="visible" class="header-animat">
      <a-layout-header
        v-if="visible"
        :class="[fixedHeader && 'ant-header-fixedHeader', sidebarOpened ? 'ant-header-side-opened' : 'ant-header-side-closed', ]"
        :style="{ padding: '0' }">
        <div v-if="mode === 'sidemenu'" class="header">
          <a-icon v-if="device==='mobile'" class="trigger" :type="collapsed ? 'menu-fold' : 'menu-unfold'" @click="toggle"/>
          <a-icon v-else class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="toggle"/>
          <user-menu></user-menu>
        </div>
        <div v-else :class="['top-nav-header-index', theme]">
          <div class="header-index-wide">
            <div class="header-index-left">
              <logo class="top-nav-header" :show-title="device !== 'mobile'"/>
              <s-menu v-if="device !== 'mobile'" mode="horizontal" :menu="menus" :theme="theme" />
              <a-icon v-else class="trigger" :type="collapsed ? 'menu-fold' : 'menu-unfold'" @click="toggle" />
            </div>
            <user-menu class="header-index-right"></user-menu>
          </div>
        </div>
      </a-layout-header>
    </div>
  </transition>
</template>

<script>
import UserMenu from '../tools/UserMenu'
import SMenu from '../Menu/'
import Logo from '../tools/Logo'
import { mixin } from '@/utils/mixin'
import Stomp from 'stompjs'

export default {
  name: 'GlobalHeader',
  components: {
    UserMenu,
    SMenu,
    Logo
  },
  mixins: [mixin],
  props: {
    mode: {
      type: String,
      // sidemenu, topmenu
      default: 'sidemenu'
    },
    menus: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    device: {
      type: String,
      required: false,
      default: 'desktop'
    }
  },
  data () {
    return {
      visible: true,
      oldScrollTop: 0,
      connected: false,
      url: 'ws://10.112.196.254:9527/ws/ws',
      subscribePrefix: '/queue/',
      client: null
    }
  },
  mounted () {
    document.addEventListener('scroll', this.handleScroll, { passive: true })
    console.log(this.$store.state.user.connected)
    if (!this.$store.state.user.connected) {
      this.connect(this.$store.getters.userId)
    }
  },
  methods: {
    handleScroll () {
      if (!this.autoHideHeader) {
        return
      }

      const scrollTop = document.body.scrollTop + document.documentElement.scrollTop
      if (!this.ticking) {
        this.ticking = true
        requestAnimationFrame(() => {
          if (this.oldScrollTop > scrollTop) {
            this.visible = true
          } else if (scrollTop > 300 && this.visible) {
            this.visible = false
          } else if (scrollTop < 300 && !this.visible) {
            this.visible = true
          }
          this.oldScrollTop = scrollTop
          this.ticking = false
        })
      }
    },
    toggle () {
      this.$emit('toggle')
    },
    connect (userId) {
      const _this = this
      try {
        const client = Stomp.over(new WebSocket(this.url))
        client.connect({ 'userId': userId }, () => {
          this.$store.commit('SET_CONNECTED', true)
          console.log(`Connect STOMP server success, url = ${_this.url}, connectHeader = ${userId}`)
          try {
            client.subscribe(_this.subscribePrefix + userId, _this.getSubscribeCallback(_this.subscribePrefix + userId))
          } catch (e) {
            console.log(`subscribe destination ${_this.subscribePrefix + userId} fail, message = ${e.message}`)
          }
        }, () => {
          _this.$store.commit('SET_CONNECTED', false)
          console.log('连接断开，5秒后重新连接')
          window.setTimeout(() => {
            _this.connect(userId)
          }, 5000)
        })
        _this.client = client
      } catch (e) {
        console.error('Connect error %o', e)
        console.log(`Connect error, message = ${e.message}, view chrome console for detail`)
        this.$store.commit('SET_CONNECTED', false)
      }
    },
    getSubscribeCallback (destination) {
      return content => {
        console.log(`Receive subscribed message from destination ${destination}, content = ${content}`)
        console.log(this.$store.state.user.connected)
        const contentBody = JSON.parse(content.body)
        switch (contentBody.msgType) {
          case 'IMC_TASK_STATUS':
            this.$notification.open({
              message: '巡检任务状态变更',
              description: '任务id：' + contentBody.msg.taskId + ' \n ' + '消息：' + contentBody.msg.statusMsg,
              duration: 0,
              placement: 'bottomRight'
            })
            break
          case 'IMC_ITEM_STATUS':
            this.$notification.open({
              message: '巡检子项状态变更',
              description: '子项id：' + contentBody.msg.itemId + ' \n ' + '消息：' + contentBody.msg.statusMsg,
              duration: 0
            })
            break
          default :
            break
        }
        this.$store.dispatch('HandleWsMsg')
      }
    },
    disconnect () {
      if (!this.$store.state.user.connected) {
        console.log(`Not Connected Yet`)
        return
      }
      try {
        this.client.disconnect()
        console.log('Close Connection Success')
        this.$store.commit('SET_CONNECTED', false)
      } catch (e) {
        console.log(`disconnect fail, message = ${e.message}, view chrome console for detail`)
      }
    }
  },
  beforeDestroy () {
    document.body.removeEventListener('scroll', this.handleScroll, true)
    this.disconnect()
  }
}
</script>

<style lang="less">
@import '../index.less';
.header-animat{
  position: relative;
  z-index: @ant-global-header-zindex;
}
.showHeader-enter-active {
  transition: all 0.25s ease;
}
.showHeader-leave-active {
  transition: all 0.5s ease;
}
.showHeader-enter, .showHeader-leave-to {
  opacity: 0;
}
</style>
