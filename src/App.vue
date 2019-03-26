<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <div id="nav">
        <router-link to="/">Home</router-link>|
        <router-link to="/about">About</router-link>
      </div>
      <router-view/>
    </div>
  </a-locale-provider>
</template>
<script>
//设备类型监听
import { deviceEnquire, DEVICE_TYPE } from '@/utils/device'
//antd-vue语言包 不用antd可删除
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import enUS from 'ant-design-vue/lib/locale-provider/en_US'
import jaJP from 'ant-design-vue/lib/locale-provider/ja_JP'

export default {
  computed: {
    locale () {
      switch (this.$store.getters.lang) {
        case 'en':
          return enUS
        case 'zh':
          return zhCN
        case 'ja':
          return jaJP
        default:
          return enUS
      }
    }
  },
  mounted () {
    // const { $store } = this
    deviceEnquire(deviceType => {
      switch (deviceType) {
        case DEVICE_TYPE.DESKTOP:
          // $store.commit('TOGGLE_DEVICE', 'desktop')
          // $store.dispatch('setSidebar', true)
          break
        case DEVICE_TYPE.TABLET:
          // $store.commit('TOGGLE_DEVICE', 'tablet')
          // $store.dispatch('setSidebar', false)
          break
        case DEVICE_TYPE.MOBILE:
        default:
          // $store.commit('TOGGLE_DEVICE', 'mobile')
          // $store.dispatch('setSidebar', true)
          break
      }
    })
  }
}
</script>
<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
