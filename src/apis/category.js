import http from '@/utils/http'

/**
 * @description: 获取分类数据 /category?id=10020
 * @param {*} id 分类id 
 * @return {*}
 */
export const getCategoryAPI = (id) => {
    return http({
        url: '/category',
        params: {
            id
        }
    })
}

/**
 * @description: 获取二级分类列表数据
 * @param {*} id 分类id 
 * @return {*}
 */
export const getCategoryFilterAPI = (id) => {
    return http({
        url: '/category/sub/filter',
        params: {
            id
        }
    })
}