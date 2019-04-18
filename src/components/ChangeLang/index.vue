<template>
  <a-dropdown>
    <a-menu slot="overlay" @click="handleChangeLang">
      <a-menu-item key="en">English</a-menu-item>
      <a-menu-item key="ja">日本語</a-menu-item>
      <a-menu-item key="zh">中文</a-menu-item>
    </a-menu>
    <span class="svg-container" :style="iconStyle">
      <a-icon class="m-icon" :component="international"/>
      <a-icon class="m-icon" :component="open"/>
    </span>
  </a-dropdown>
</template>

<script>
import { setStore } from '@/utils/storage'
import international from '@/assets/icon/international.svg'
import open from '@/assets/icon/open.svg'
export default {
  name: 'ChangeLang',
  data () {
    return {
      open,
      international
    }
  },
  props: {
    iconStyle: {
      type: Object,
      default: () => { }
    },
  },
  methods: {
    handleChangeLang ({ key }) {
      this.$i18n.locale = key;
      setStore('language', key);
      this.$emit('on-change', key)
    },
  }
}
</script>

<style scoped>
.svg-container {
  cursor: pointer;
}
</style>