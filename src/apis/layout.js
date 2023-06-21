import http from '@/utils/http'

export function getCategoryAPI () {
  return http({
    url: 'home/category/head'
  })
}