<template>
  <global-layout>
    <transition name="page-transition">
      <router-view/>
    </transition>
  </global-layout>
</template>

<script>
import GlobalLayout from '@/components/page/GlobalLayout'

export default {
  name: 'BasicLayout',
  components: {
    GlobalLayout
  },
  data () {
    return {}
  }
}
</script>

<style lang="less">
.page-transition-enter {
  opacity: 0;
}

.page-transition-leave-active {
  opacity: 0;
}

.page-transition-enter .page-transition-container,
.page-transition-leave-active .page-transition-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
