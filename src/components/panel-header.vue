<template>
    <div class="panel_header">
        <div class="panel_lead">
            <div class="title">{{ props.data.meta.name }}</div>
            <div class="description">{{props.data.meta.describe}}</div>
        </div>
    </div>
</template>
  
<script setup>
const props = defineProps({
  data:{
    type:Object
  }
})

</script>
  
<style lang="less" scoped>
.panel_header {
    padding: 15px;
    background: #e8edf0;
    border-color: #e8edf0;
    position: relative;
    margin: 10px 0;
    .panel_lead {
      font-size: 15px;
      .title {
        font-weight: bold;
        font-style: normal;
      }
      .description {
        margin-top: 5px;
      }
    }
  }
</style>
  