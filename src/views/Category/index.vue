<script setup>
import {ref,onMounted} from 'vue'
import {getTopCategoryAPI} from '@/apis/category'
import { getBannerAPI } from "@/apis/home";
import {useRoute} from 'vue-router'

const categoryData = ref({})
const route = useRoute()
const getTopCategory = async(id)=>{
   const res = await getTopCategoryAPI(id)
   console.log(res);
   categoryData.value = res.result
}

onMounted(()=>{
   // 获取路由参数 id, useRoute() -> route 等价于this.$route
   getTopCategory(route.params.id)
})

const bannerList = ref([])

const getBanner = async () => {
    const res = await getBannerAPI()
    console.log(res)
    bannerList.value = res.result
}

onMounted(() => {
    getBanner()
})
</script>

<template>
  <div class="top-category">
    <div class="container m-top-20">
      <!-- 面包屑 -->
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- Banner 轮播图 -->
      <div class="home-banner">
        <el-carousel height="500px">
            <el-carousel-item v-for="item in bannerList" :key="item.id">
                <img :src="item.imgUrl" alt="">
            </el-carousel-item>
        </el-carousel>
    </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .sub-list {
    margin-top: 20px;
    background-color: #fff;

    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;

      li {
        width: 168px;
        height: 160px;


        a {
          text-align: center;
          display: block;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 40px;
          }

          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
  }

  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;

    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }

      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }

    .body {
      display: flex;
      justify-content: space-around;
      padding: 0 40px 30px;
    }
  }

  .bread-container {
    padding: 25px 0;
  }
}

.home-banner {
    width: 1240px;
    height: 500px;
    z-index: 98;

    img {
        width: 100%;
        height: 500px;
    }
}
</style>