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
export function saveImcTask (parameter) {
  return axios({
    url: '/imc/inspectionTask/save',
    method: 'post',
    data: parameter
  })
}

export function getAllImcTaskOfPrincipal (parameter) {
  return axios({
    url: '/imc/inspectionTask/getAllTaskByPrincipalId',
    method: 'post',
    data: parameter
  })
}

export function getImcTaskList (parameter) {
  return axios({
    url: '/imc/inspectionTask/getTaskList',
    method: 'post',
    data: parameter
  })
}

export function getAllUnauthorizedTaskList (parameter) {
  return axios({
    url: '/imc/inspectionTask/getAllUnauthorizedTaskList',
    method: 'post',
    data: parameter
  })
}

export function getAllTaskByFacilitatorId (parameter) {
  return axios({
    url: '/imc/inspectionTask/getAllTaskByFacilitatorId',
    method: 'post',
    data: parameter
  })
}

export function getAllUnConfirmedTask (parameter) {
  return axios({
    url: '/imc/inspectionTask/getAllUnConfirmedTask',
    method: 'post',
    data: parameter
  })
}

export function getAllUnDistributedTask (parameter) {
  return axios({
    url: '/imc/inspectionTask/getAllUnDistributedTask',
    method: 'post',
    data: parameter
  })
}

export function getAllFinishedTaskByFacilitatorId (parameter) {
  return axios({
    url: '/imc/inspectionTask/getAllFinishedTaskByFacilitatorId',
    method: 'post',
    data: parameter
  })
}

export function getTaskByTaskId (parameter) {
  return axios({
    url: '/imc/inspectionTask/getTaskByTaskId/' + parameter,
    method: 'get'
  })
}

export function getTaskLogs (parameter) {
  return axios({
    url: '/imc/inspectionTask/getTaskLogs/' + parameter,
    method: 'post'
  })
}

export function acceptImcTaskByPrincipal (parameter) {
  return axios({
    url: '/imc/inspectionTask/acceptImcTaskByPrincipal',
    method: 'post',
    data: parameter
  })
}

export function denyImcTaskByPrincipal (parameter) {
  return axios({
    url: '/imc/inspectionTask/denyImcTaskByPrincipal',
    method: 'post',
    data: parameter
  })
}

export function acceptTaskByFacilitator (parameter) {
  return axios({
    url: '/imc/inspectionTask/acceptTaskByFacilitator/' + parameter,
    method: 'post'
  })
}

export function refuseTaskByFacilitator (parameter) {
  return axios({
    url: '/imc/inspectionTask/refuseTaskByFacilitator/' + parameter,
    method: 'post'
  })
}

export function modifyTaskStatus (parameter) {
  return axios({
    url: '/imc/inspectionTask/modifyTaskStatusByTaskId',
    method: 'post',
    data: parameter
  })
}

export function deleteTask (parameter) {
  return axios({
    url: '/imc/inspectionTask/deleteTaskByTaskId/' + parameter,
    method: 'post'
  })
}

export function getTaskReport (parameter) {
  return axios({
    url: '/imc/inspectionTask/getTaskReport/' + parameter,
    method: 'post'
  })
}

export function getItemByItemId (parameter) {
  return axios({
    url: '/imc/inspectionItem/get/' + parameter,
    method: 'get'
  })
}

export function getItemList (parameter) {
  return axios({
    url: '/imc/inspectionItem/getItemList',
    method: 'post',
    data: parameter
  })
}

export function getAllAcceptedItemListByMaintainer (parameter) {
  return axios({
    url: '/imc/inspectionItem/getAllAcceptedItemListByMaintainer',
    method: 'post',
    data: parameter
  })
}

export function getAllFinishedImcItemByMaintainerId (parameter) {
  return axios({
    url: '/imc/inspectionItem/getAllFinishedImcItemByMaintainerId',
    method: 'post',
    data: parameter
  })
}

export function getItemLogs (parameter) {
  return axios({
    url: '/imc/inspectionItem/getItemLogs/' + parameter,
    method: 'post'
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
