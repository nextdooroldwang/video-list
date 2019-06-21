<template>
  <div>
    <a-progress type="circle" :percent="percent" :status="status"/>
    <h1 class="updateText">{{status === 'success' ? '上传成功' : status === 'exception' ? '发布出错' : ''}}</h1>
    <h4
      class="updateTextSub"
    >{{status === 'normal' ? '上传中，请稍后...' : status === 'exception' ? statusInfo : moment().format('YYYY-MM-DD HH:mm')}}</h4>
    <div class="updateTextBtn">
      <a-button @click="()=>{$router.push({ name: 'ApkList' })}">返回列表页</a-button>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data () {
    return {
      moment
    }
  },
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