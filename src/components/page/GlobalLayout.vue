<template>
  <a-layout class="layout" :style="{ minHeight: '100vh' }">
    <global-header/>
    <a-layout-content style="padding: 0 50px">
      <a-layout style="padding: 24px 0; background: #fff">
        <left-sider/>
        <a-layout-content :style="{ padding: '0 24px', minHeight: '280px' }">
          <div style="height:100%">
            <a-row style="height:100%">
              <a-col :span="18"  style="height:100%" class="height-100">
                <h3>Activities</h3>
                <slot></slot>
              </a-col>
              <a-col :span="6" class="height-100" style="background-color: #05ffb0; height:100%">
                <h3>News</h3>
              </a-col>
            </a-row>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout-content>
    <global-footer/>
  </a-layout>
</template>
<script>
import GlobalHeader from '@/components/page/Header'
import GlobalFooter from '@/components/page/Footer'
import LeftSider from '@/components/page/LeftSider'

export default {
  name: 'GlobalLayout',
  components: {
    GlobalHeader,
    GlobalFooter,
    LeftSider
  },
  data () {
    return {
    }
  },

  mounted () {
  }
}
</script>
