<template>
  <div>
    <a-progress type="circle" :percent="percent" :status="status"/>
    <h1 class="updateText">{{status === 'success' ? '上传成功' : status === 'exception' ? '发布出错' : ''}}</h1>
    <h4
      class="updateTextSub"
    >{{status === 'normal' ? '上传中，请稍后...' : status === 'exception' ? statusInfo : `共更新${count}台bloopy设备`}}</h4>
    <div class="updateTextBtn" v-if="status === 'success'">
      <a-button @click="()=>{$router.push({ path: '/version/upload/uploadDetail/'+id })}">查看详情</a-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    percent: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      default: 'normal'
    },
    statusInfo: {
      type: String,
      default: ''
    },
    count: {
      type: Number,
      default: 0
    },
    id: {
      type: Number,
      default: null
    }
  }
}
</script>

<style scoped>
.updateText {
  padding: 24px;
}
.updateTextSub {
  padding-bottom: 16px;
}
</style>