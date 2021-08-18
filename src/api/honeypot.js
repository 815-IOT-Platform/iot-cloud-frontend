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
