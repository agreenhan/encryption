import request from '@/utils/request'

export function MD5Encryption(params) {
  return request({
    url: '/md5/encryption',
    method: 'post',
    params
  })
}
