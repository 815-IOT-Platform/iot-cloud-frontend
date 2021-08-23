import { axios } from '@/utils/request'

export function getAllEdgeNode () {
  return axios({
    url: '/honeyBot/honeypot/listNodes',
    method: 'get'
  })
}

export function getEdgeNode (node) {
  return axios({
    url: '/honeyBot/honeypot/getNode/' + node,
    method: 'get'
  })
}

export function getPotList (node) {
  return axios({
    url: '/honeyBot/honeypot/getPotByNodes/' + node,
    method: 'get'
  })
}

export function openPot (pot) {
  return axios({
    url: '/honeyBot/honeypot/updatePot',
    method: 'post',
    data: {
      name: pot,
      status: 'ON'
    }
  })
}

export function closePot (pot) {
  return axios({
    url: '/honeyBot/honeypot/updatePot',
    method: 'post',
    data: {
      name: pot,
      status: 'OFF'
    }
  })
}

export function createPot (data) {
  return axios({
    url: '/honeyBot/honeypot/createPot',
    method: 'post',
    data: data
  })
}

export function deletePot (pot) {
  return axios({
    url: '/honeyBot/honeypot/deletePot/' + pot,
    method: 'delete'
  })
}

export function getPotData (pot) {
  return axios({
    url: '/honeyBot/honeypot/searchPot',
    method: 'post',
    data: {
      name: pot
    }
  })
}

export function getAlarmData () {
  return axios({
    url: '/honeyBot/honeypot/getAlarmData',
    method: 'get'
  })
}
