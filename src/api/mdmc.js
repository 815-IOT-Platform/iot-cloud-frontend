import { axios } from '@/utils/request'
import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'

export function getTroubleList (parameter) {
  return axios({
    url: '/mdc/dictItem/getSysDictItemList',
    method: 'post',
    headers: {
      'deviceId': new Date().getTime(),
      'Authorization': 'Bearer ' + Vue.ls.get(ACCESS_TOKEN)
    },
    data: parameter
  })
}
// MdmcTask
export function mdmcTaskSave (parameter) {
  return axios({
    url: '/mdmc/mdmcTask/save',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'deviceId': new Date().getTime(),
      'Authorization': 'Bearer ' + Vue.ls.get(ACCESS_TOKEN)
    },
    data: parameter
  })
}

export function getTaskList (parameter) {
  return axios({
    url: '/mdmc/mdmcTask/getTaskList',
    method: 'post',
    headers: {
      'deviceId': new Date().getTime(),
      'Authorization': 'Bearer ' + Vue.ls.get(ACCESS_TOKEN)
    },
    data: parameter
  })
}
export function mdmcReviewSave (parameter) {
  return axios({
    contentType: 'application/json',
    url: '/mdmc/mdmcReview/save',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'deviceId': new Date().getTime(),
      'Authorization': 'Bearer ' + Vue.ls.get(ACCESS_TOKEN)
    },
    data: parameter
  })
}

export function getMdmcTaskDetail (parameter) {
  return axios({
    url: '/mdmc/mdmcTask/getTaskDetailByTaskId/' + parameter,
    method: 'get',
    headers: {
      'deviceId': new Date().getTime(),
      'Authorization': 'Bearer ' + Vue.ls.get(ACCESS_TOKEN)
    }
  })
}
export function getMdmcTaskLogs (parameter) {
  return axios({
    url: '/mdmc/mdmcLog/getTaskLogs',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'deviceId': new Date().getTime(),
      'Authorization': 'Bearer ' + Vue.ls.get(ACCESS_TOKEN)
    },
    data: parameter
  })
}
export function modifyTaskStatusByTaskId (parameter) {
  return axios({
    url: '/mdmc/mdmcTask/modifyTaskStatusByTaskId',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'deviceId': new Date().getTime(),
      'Authorization': 'Bearer ' + Vue.ls.get(ACCESS_TOKEN)
    },
    data: parameter
  })
}
export function mdmcTaskUpdate (parameter) {
  return axios({
    url: '/mdmc/mdmcTask/update',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'deviceId': new Date().getTime(),
      'Authorization': 'Bearer ' + Vue.ls.get(ACCESS_TOKEN)
    },
    data: parameter
  })
}
export function dispatchFacilitator (parameter) {
  return axios({
    url: '/mdmc/mdmcTask/dispatchFacilitator',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'deviceId': new Date().getTime(),
      'Authorization': 'Bearer ' + Vue.ls.get(ACCESS_TOKEN)
    },
    data: parameter
  })
}
export function dispatchMaintainer (parameter) {
  return axios({
    url: '/mdmc/mdmcTask/dispatchMaintainer',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'deviceId': new Date().getTime(),
      'Authorization': 'Bearer ' + Vue.ls.get(ACCESS_TOKEN)
    },
    data: parameter
  })
}
export function refuseTaskByFacilitator (parameter) {
  return axios({
    url: '/mdmc/mdmcTask/refuseTaskByFacilitator/' + parameter,
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'deviceId': new Date().getTime(),
      'Authorization': 'Bearer ' + Vue.ls.get(ACCESS_TOKEN)
    }
  })
}
export function refuseTaskByMaintainer (parameter) {
  return axios({
    url: '/mdmc/mdmcTask/refuseTaskByMaintainer/' + parameter,
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'deviceId': new Date().getTime(),
      'Authorization': 'Bearer ' + Vue.ls.get(ACCESS_TOKEN)
    }
  })
}
// MdmcSubTask
export function getTaskItem (parameter) {
  return axios({
    url: '/mdmc/mdmcTaskItem/getItemList',
    method: 'post',
    headers: {
      'deviceId': new Date().getTime(),
      'Authorization': 'Bearer ' + Vue.ls.get(ACCESS_TOKEN)
    },
    data: parameter
  })
}
export function getMdmcTaskItemDetail (parameter) {
  return axios({
    url: '/mdmc/mdmcTaskItem/get/' + parameter,
    method: 'get',
    headers: {
      'deviceId': new Date().getTime(),
      'Authorization': 'Bearer ' + Vue.ls.get(ACCESS_TOKEN)
    }
  })
}
export function deleteMdmcTaskItem (parameter) {
  return axios({
    url: '/mdmc/mdmcTaskItem/remove/' + parameter,
    method: 'post',
    headers: {
      'deviceId': new Date().getTime(),
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + Vue.ls.get(ACCESS_TOKEN)
    },
    data: parameter
  })
}
export function mdmcTaskItemSave (parameter) {
  return axios({
    url: '/mdmc/mdmcTaskItem/save',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'deviceId': new Date().getTime(),
      'Authorization': 'Bearer ' + Vue.ls.get(ACCESS_TOKEN)
    },
    data: JSON.stringify(parameter)
  })
}
export function mdmcTaskItemUpdate (parameter) {
  return axios({
    url: '/mdmc/mdmcTaskItem/update',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'deviceId': new Date().getTime(),
      'Authorization': 'Bearer ' + Vue.ls.get(ACCESS_TOKEN)
    },
    data: JSON.stringify(parameter)
  })
}
export function mdmcTaskItemDetail (parameter) {
  return axios({
    url: '/mdmc/mdmcTaskItem/get/' + parameter,
    method: 'get',
    headers: {
      'deviceId': new Date().getTime(),
      'Authorization': 'Bearer ' + Vue.ls.get(ACCESS_TOKEN)
    }
  })
}

// transform function
export function transformList (res) {
  const _res = {}
  _res.code = res.code
  _res.msg = res.msg
  _res.total = parseInt(res.data.total)
  _res.rows = []
  for (let i = 0; i < _res.total; i++) {
    _res.rows[i] = res.data.list[i].mdmcTask
  }
  _res.pageSize = res.pageSize
  return _res
}
export function transformListII (res) {
  const _res = {}
  _res.code = res.code
  _res.msg = res.msg
  _res.rows = []
  _res.rows = res.data.list
  _res.pageSize = res.data.pageSize
  _res.total = parseInt(res.data.total)
  return _res
}
