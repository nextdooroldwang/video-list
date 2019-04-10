<template>
  <a-layout class="layout" :style="{ minHeight: '100vh' }">
    <!-- layout header -->
    <global-header/>

    <!-- layout content -->
    <a-layout-content
      :style="{ margin: '0 auto',padding:'30px 24px',background:'#F0F2F8', minHeight: '100%',minWidth:'1305px' }"
    >
      <slot></slot>
    </a-layout-content>

    <!-- layout footer -->
    <!-- <a-layout-footer style="padding: 0">
      <global-footer/>
    </a-layout-footer>-->
  </a-layout>
</template>

<script>
import GlobalHeader from '@/components/page/GlobalHeader'
// import GlobalFooter from '@/components/page/GlobalFooter'

export default {
  name: 'GlobalLayout',
  components: {
    GlobalHeader,
    // GlobalFooter,
  },
  data () {
    return {

    }
  },

  mounted () {
    // const userAgent = navigator.userAgent
    // if (userAgent.indexOf('Edge') > -1) {
    //   this.$nextTick(() => {
    //     this.collapsed = !this.collapsed
    //     setTimeout(() => {
    //       this.collapsed = !this.collapsed
    //     }, 16)
    //   })
    // }
  }
}
</script>
