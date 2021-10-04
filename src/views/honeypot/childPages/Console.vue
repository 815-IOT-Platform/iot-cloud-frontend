<template>
  <div>
    <a-form layout="inline" :form="form" @submit="handleSubmit">
      <a-form-item :validate-status="userNameError() ? 'error' : ''" :help="userNameError() || ''">
        <a-input
          v-decorator="[
          'username',
          { rules: [{ required: true, message: 'Please input your username!' }] },
        ]"
          placeholder="Username"
        >
          <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item :validate-status="passwordError() ? 'error' : ''" :help="passwordError() || ''">
        <a-input
          v-decorator="[
          'password',
          { rules: [{ required: true, message: 'Please input your Password!' }] },
        ]"
          type="password"
          placeholder="Password"
        >
          <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" :disabled="hasErrors(form.getFieldsError())">
          Log in
        </a-button>
      </a-form-item>
    </a-form>
    <div id="terminal" ref="terminal" ></div>
  </div>
</template>
<script>
import { Terminal } from "xterm"
import { FitAddon } from 'xterm-addon-fit'
import "xterm/css/xterm.css"
import Stomp from 'stompjs'
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

export default {
  data() {
    return {
      term: "", // 保存terminal实例
      rows: 40,
      cols: 100,
      stompClient: '',
      hasErrors,
      form: this.$form.createForm(this, { name: 'horizontal_login' }),
      username: '',
      password: '',
      host: this.$route.params.address
    }
  },
  mounted () {
    this.$nextTick(() => {
      // To disabled submit button at the beginning.
      this.form.validateFields()
    })
  },
  methods: {
    initXterm() {
      let _this = this
      let term = new Terminal({
        rendererType: "canvas", //渲染类型
        rows: _this.rows, //行数
        cols: _this.cols, // 不指定行数，自动回车后光标从下一行开始
        convertEol: true, //启用时，光标将设置为下一行的开头
        // scrollback: 50, //终端中的回滚量
        disableStdin: false, //是否应禁用输入
        // cursorStyle: "underline", //光标样式
        cursorBlink: true, //光标闪烁
        theme: {
          foreground: "#ECECEC", //字体
          background: "#000000", //背景色
          cursor: "help", //设置光标
          lineHeight: 20
        }
      })
      // 创建terminal实例
      term.open(this.$refs["terminal"])
      // 换行并输入起始符 $
      term.prompt = _ => {
        term.write("\r\n\x1b[33m$\x1b[0m ")
      }
      // term.prompt()
      // canvas背景全屏
      const fitAddon = new FitAddon()
      term.loadAddon(fitAddon)
      fitAddon.fit()

      window.addEventListener("resize", resizeScreen)
      function resizeScreen() {
        try {
          fitAddon.fit()
        } catch (e) {
          console.log("e", e.message)
        }
      }
      _this.term = term
      _this.runFakeTerminal()
    },
    runFakeTerminal() {
      let term = this.term
      if (term._initialized) return
      // 初始化
      term._initialized = true
      term.writeln("Welcome to \x1b[1;32m墨天轮\x1b[0m.")
      term.writeln('This is Web Terminal of Modb; Good Good Study, Day Day Up.')
      term.prompt()
      term.onData(key => {  // 输入与粘贴的情况
        this.sendShell(key)
      })
    },
    initSocket() {
      let _this = this
      // 建立连接对象
      let sockUrl = 'ws://127.0.0.1:9527/honeyBot/web-terminal'
      let socket = new WebSocket(sockUrl)
      // 获取STOMP子协议的客户端对象
      _this.stompClient = Stomp.over(socket)
      // 向服务器发起websocket连接
      this.stompClient.connect({}, (res) => {
        _this.initXterm()
        _this.stompClient.subscribe('/topic/1024', (frame) => {
          _this.writeShell(frame.body)
        })
        _this.sentFirst(_this.host, _this.username, _this.password)
      }, () => {
        alert('登录失败')
      })
      _this.stompClient.debug = null
    },
    sendShell (data) {
      let _bar = {
        operate:'command',
        command: data,
        userId: 1024
      }
      this.stompClient.send('/msg', {}, JSON.stringify(_bar))
    },
    writeShell(data) {
      this.term.write(data)
    },
    // 连接建立，首次发送消息连接 ssh
    sentFirst (host, username, password) {
      console.log(host, username, password)
      let _bar = {
        operate:'connect',
        host: host,
        port: 22,
        username: username,
        password: password,
        userId: 1024
      }
      this.stompClient.send('/msg', {}, JSON.stringify(_bar))
    },
    userNameError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched('username') && getFieldError('username');
    },
    // Only show error after a field is touched.
    passwordError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched('password') && getFieldError('password');
    },
    handleSubmit(e) {
      e.preventDefault();
      let _this = this
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
        _this.username = values.username
        _this.password = values.password
        this.initSocket()
      })
    }
  }
}
</script>