<script setup>
import HomePanel from './HomePanel.vue'
import { findNewAPI } from '@/apis/home'
import { ref, onMounted } from 'vue'

const newList = ref([])
const getNewList = async () => {
    const res = await findNewAPI()
    console.log(res)
    newList.value = res.result
}

onMounted(() => {
    getNewList()
})
</script>

<template>
    <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质好物">
        <!-- 下面是插槽主体内容模版 -->
        <ul class="goods-list">
            <li v-for="item in newList" :key="item.id">
                <RouterLink :to="`/detail/${item.id}`">
                    <img v-img-lazy="item.picture" alt="" />
                    <p class="name">{{ item.name }}</p>
                    <p class="price">&yen;{{ item.price }}</p>
                </RouterLink>
            </li>
        </ul>
    </HomePanel>
</template>


<style scoped lang='scss'>
.goods-list {
    display: flex;
    justify-content: space-between;
    height: 406px;

    li {
        width: 306px;
        height: 406px;

        background: #f0f9f4;
        transition: all .5s;

        &:hover {
            transform: translate3d(0, -3px, 0);
            box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
        }

        img {
            width: 306px;
            height: 306px;
        }

        p {
            font-size: 22px;
            padding-top: 12px;
            text-align: center;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }

        .price {
            color: $priceColor;
        }
    }
}
</style>