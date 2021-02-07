import { axios } from '@/utils/request'

export function getAllEdgeDevice () {
  return axios({
    url: '/device/device/getAllEdgeDevice',
    method: 'get'
  })
}

export function getAllEdgeDeviceModel () {
  return axios({
    url: '/device/model/getAllEdgeDeviceModel',
    method: 'get'
  })
}

export function addEdgeDevice (parameter) {
  return axios({
    url: '/device/device/addDevice',
    method: 'post',
    data: parameter
  })
}

export function addEdgeDeviceModel (parameter) {
  return axios({
    url: '/device/model/addDeviceModel',
    method: 'post',
    data: parameter
  })
}
