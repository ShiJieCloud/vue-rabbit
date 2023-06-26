import http from '@/utils/http'

export const getOrderAPI = (id) => {
    return http({
      url: `/member/order/${id}`
    })
  }