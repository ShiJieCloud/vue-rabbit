<script setup>
import { ref, onMounted } from 'vue'
import { getCategoryAPI } from '@/apis/category'
import { getBannerAPI } from "@/apis/home";
import { useRoute,onBeforeRouteUpdate } from 'vue-router'
import GoodsItem from '../Home/components/GoodsItem.vue';

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
onBeforeRouteUpdate((to)=>{
   console.log("路由变化了");
   ////route.params.id 存在滞后性，无法及时获取路由参数
   //通过参数to目标路由对象获取路由参数
   console.log(to);
   getCategoryData(to.params.id)
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
         <!-- 分类数据 -->
         <div class="sub-list">
            <h3>全部分类</h3>
            <ul>
               <li v-for="i in categoryData.children" :key="i.id">
                  <RouterLink to="/">
                     <img :src="i.picture" />
                     <p>{{ i.name }}</p>
                  </RouterLink>
               </li>
            </ul>
         </div>
         <div class="ref-goods" v-for="item in categoryData.children" :key="item.id">
            <div class="head">
               <h3>- {{ item.name }}-</h3>
            </div>
            <div class="body">
               <GoodsItem v-for="good in item.goods" :good="good" :key="good.id" />
            </div>
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