import { axios } from '@/utils/request'

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function getWsMsg (parameter) {
  return axios({
    url: '/websocket/websocket/getWsMsg',
    method: 'post',
    data: parameter
  })
}

export function changeMsgStatus (parameter) {
  return axios({
    url: '/websocket/websocket/changeWsMsgStatus',
    method: 'post',
    data: parameter
  })
}

export function transformList (res) {
  const _res = {}
  _res.code = res.code
  _res.message = res.msg
  _res.timestamp = new Date().getTime()
  _res.result = {}
  _res.result.pageNum = res.pageNum
  _res.result.pageSize = res.pageSize
  _res.result.rows = res.rows
  _res.result.total = parseInt(res.total)
  return _res
}
