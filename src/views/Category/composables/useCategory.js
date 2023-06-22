// 封装分类数据相关业务代码
import { ref, onMounted } from 'vue'
import { getCategoryAPI } from '@/apis/category'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'

export function useCategory() {
    const categoryData = ref({})
    const route = useRoute()
    const getCategoryData = async (id) => {
        const res = await getCategoryAPI(id)
        console.log(res);
        categoryData.value = res.result
    }

    onMounted(() => {
        // 获取路由参数 id, useRoute() -> route 等价于this.$route
        getCategoryData(route.params.id)
    })

    //目标：路由参数变化的时候可以把分类数据接口重新发送
    onBeforeRouteUpdate((to) => {
        console.log("路由变化了");
        //route.params.id 存在滞后性，无法及时获取路由参数
        //通过参数to目标路由对象获取路由参数
        console.log(to);
        getCategoryData(to.params.id)
    })

    return { categoryData }
}