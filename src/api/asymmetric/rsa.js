import request from '@/utils/request'

export function RSAEncryption(params) {
  return request({
    url: '/rsa/encryption',
    method: 'post',
    params
  })
}

export function RSADeciphering(params) {
  return request({
    url: '/rsa/deciphering',
    method: 'post',
    params
  })
}

export function RSAGetKey() {
  return request({
    url: '/rsa/getKey',
    method: 'get'
  })
}
