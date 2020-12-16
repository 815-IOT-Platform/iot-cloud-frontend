import { axios } from '@/utils/request'
import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'

// 查询字典
export function getDictInfo (parameter) {
  return axios({
    url: '/mdc/dict/get' + parameter,
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'deviceId': new Date().getTime(),
      'Authorization': 'Bearer ' + Vue.ls.get(ACCESS_TOKEN)
    }
  })
}
// 查询字典列表
export function getDictList (parameter) {
  return axios({
    url: '/mdc/dict/list',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'deviceId': new Date().getTime(),
      'Authorization': 'Bearer ' + Vue.ls.get(ACCESS_TOKEN)
    },
    data: parameter
  })
}
// 删除字典
export function dictDelete (parameter) {
  return axios({
    url: '/mdc/dict/remove',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'deviceId': new Date().getTime(),
      'Authorization': 'Bearer ' + Vue.ls.get(ACCESS_TOKEN)
    },
    params: parameter
  })
}
// 新增保存字典
export function dictSave (parameter) {
  return axios({
    url: '/mdc/dict/save',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'deviceId': new Date().getTime(),
      'Authorization': 'Bearer ' + Vue.ls.get(ACCESS_TOKEN)
    },
    data: parameter
  })
}
// 修改保存字典
export function dictUpdate (parameter) {
  return axios({
    url: '/mdc/dict/update',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'deviceId': new Date().getTime(),
      'Authorization': 'Bearer ' + Vue.ls.get(ACCESS_TOKEN)
    },
    data: parameter
  })
}
// 查询字典子项
export function getDictItem (parameter) {
  return axios({
    url: '/mdc/dictItem/get/' + parameter,
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'deviceId': new Date().getTime(),
      'Authorization': 'Bearer ' + Vue.ls.get(ACCESS_TOKEN)
    },
    data: parameter
  })
}
// 查询字典列表
export function getDictItemList (parameter) {
  return axios({
    url: '/mdc/dictItem/list',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'deviceId': new Date().getTime(),
      'Authorization': 'Bearer ' + Vue.ls.get(ACCESS_TOKEN)
    },
    data: parameter
  })
}
// 删除字典子项
export function dictItemDelete (parameter) {
  return axios({
    url: '/mdc/dictItem/remove',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'deviceId': new Date().getTime(),
      'Authorization': 'Bearer ' + Vue.ls.get(ACCESS_TOKEN)
    },
    params: parameter
  })
}
// 新增字典子项
export function dictItemSave (parameter) {
  return axios({
    url: '/mdc/dictItem/save',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'deviceId': new Date().getTime(),
      'Authorization': 'Bearer ' + Vue.ls.get(ACCESS_TOKEN)
    },
    data: parameter
  })
}
// 编辑字典子项
export function dictItemUpdate (parameter) {
  return axios({
    url: '/mdc/dictItem/update',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'deviceId': new Date().getTime(),
      'Authorization': 'Bearer ' + Vue.ls.get(ACCESS_TOKEN)
    },
    data: parameter
  })
}
// 为维修页面准备数据
export function getSysDictItemListForMdmc (parameter) {
  return axios({
    url: '/mdc/dictItem/getSysDictItemList',
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'deviceId': new Date().getTime(),
      'Authorization': 'Bearer ' + Vue.ls.get(ACCESS_TOKEN)
    },
    data: parameter
  })
}
