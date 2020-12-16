import { axios } from '@/utils/request'

export function saveAlarmTask (parameter) {
  return axios({
    url: '/amc/alarm/save',
    method: 'post',
    data: parameter
  })
}

export function getAlarmById (parameter) {
  return axios({
    url: '/amc/alarm/get/' + parameter,
    method: 'get'
  })
}

export function getAlarmList (parameter) {
  return axios({
    url: '/amc/alarm/list',
    method: 'get'
  })
}

/** 获取 告警总数 */
export function getAllAlarmCount (parameter) {
  return axios({
    url: '/amc/alarm/getAllAlarmCount',
    method: 'get'
  })
}

/** 获取 急需处理告警数 */
export function getUrgencyCount (parameter) {
  return axios({
    url: '/amc/alarm/getUrgencyCount',
    method: 'get'
  })
}

/** 获取 未处理告警数 */
export function getDealingCount (parameter) {
  return axios({
    url: '/amc/alarm/getDealingCount',
    method: 'get'
  })
}

/** 获取 已处理告警数 */
export function getDealedCount (parameter) {
  return axios({
    url: '/amc/alarm/getDealedCount',
    method: 'get'
  })
}

/** 更改告警内容 */
export function update (parameter) {
  return axios({
    url: '/amc/alarm/update',
    method: 'post',
    data: parameter
  })
}

/** 删除 告警 */
export function remove (parameter) {
  return axios({
    url: '/amc/alarm/remove',
    method: 'post',
    data: parameter
  })
}

/** 新增 工单 */
export function addOrder (parameter) {
  return axios({
    url: '/amc/order/save',
    method: 'post',
    data: parameter
  })
}

/** 根据告警Id（而非工单Id）获取工单信息,parameter为id */
export function getOrderByAlarm (parameter) {
  return axios({
    url: '/amc/order/getByAlarm/' + parameter,
    method: 'get'
  })
}
