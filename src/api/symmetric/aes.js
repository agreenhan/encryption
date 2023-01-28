import request from '@/utils/request'

export function AESEncryption(params) {
  return request({
    url: '/aes/encryption',
    method: 'post',
    params
  })
}

export function AESDeciphering(params) {
  return request({
    url: '/aes/deciphering',
    method: 'post',
    params
  })
}

export function AESGetKey() {
  return request({
    url: '/aes/getAESKey',
    method: 'get'
  })
}
