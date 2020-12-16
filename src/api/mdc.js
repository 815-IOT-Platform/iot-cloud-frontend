import { axios } from '@/utils/request'

const api = {
  anMdcFormTemplate: '/mdc/formTemplate'
}

export function getAnMdcFormTemplateList (parameter) {
  return axios({
    url: api.anMdcFormTemplate + '/list',
    method: 'get',
    params: parameter
  })
}

export function saveAnMdcFormTemplate (parameter) {
  return axios({
    url: api.anMdcFormTemplate + (parameter.id > 0 ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delAnMdcFormTemplate (parameter) {
  return axios({
    url: api.anMdcFormTemplate + '/remove',
    method: 'post',
    params: parameter
  })
}

export const anMdcFormTemplateExport = api.anMdcFormTemplate + '/export'
