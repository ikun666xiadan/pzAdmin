<template>
  <div class="header">
    <div class="header_left flex_box">
      <el-icon class="icon" @click="store.commit('setIsCollapse')"><Fold /></el-icon>
      <ul class="tag_list flex_box">
        <li class="tag_item flex_box" v-for="(item,index) in selectedMenu" :key="item.path" :class="{'active':currentPath === item.path}">
          <el-icon size="12" class="i"><component :is="item.icon" /></el-icon>
          <RouterLink :to="item.path" class="tag_name">{{ item.name }}</RouterLink>
          <el-icon class="close" size="12" @click="close(item,index)"><Close /></el-icon>
        </li>
      </ul>
    </div>
    <div class="header_right flex_box">
      <img src="../assets/card_1.png" alt="" />
      <el-dropdown>
        <span class="username"> admin </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
  
<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const selectedMenu = computed(()=>store.state.menu.selectedMenu)
const route = useRoute()
const router = useRouter()
const currentPath = computed(()=>route.path)

const close = (item,index)=>{
  store.commit('removeMenu',item)
  // 删除非当前页面的tag
  if(item.path !== currentPath.value){
    return 
  }
  // 删除当前页面的tag
  const selectedMenuData = selectedMenu.value
  // 如果删除最后一项
  if(index === selectedMenuData.length){
    // 如果tag只有一个元素
    if(!selectedMenuData.length){
      router.push('/')   // 跳转到根路径
    }else{
      router.push({
        path:selectedMenuData[index - 1].path   // 跳转到前一个
      })
    }
  }else{ // 删除中间的tag
    router.push({
      path:selectedMenuData[index].path   // 跳转到后一个
    })
  }
}
</script>
  
<style lang="less" scoped>
.flex_box {
  display: flex;
  align-items: center;
  height: 100%;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  height: 100%;
  .header_left {
    height: 100%;
    .icon {
      font-size: 20px;
      width: 45px;
      height: 100%;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
    }
    .icon:hover {
      background: #f5f5f5;
      transform: scale(1.05);
    }
    .tag_list{
      padding: 0 10px;
      height: 100%;
      .tag_item{
        margin: 0 5px;
        gap: 5px;
        cursor: pointer;
        padding: 0 5px;
        .close{
          visibility: hidden;  //默认隐藏
        }
        .tag_name{
          font-size: 12px;
          color: #333;
        }
        &.active{
          background: #f5f5f5;
          .tag_name{
            color:#409eff;
          }
          .i{
            color:#409eff;
          }
          .close{
            color:#409eff;
          }
        }
      }
      .tag_item:hover{
        background: #f5f5f5;
        .close{
          visibility: inherit;
          cursor: pointer;
        }
      }
    }
  }
  .header_right {
    padding: 20px;
    gap: 10px;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
    }
    .username {
      cursor: pointer;
    }
  }
}
</style>
  