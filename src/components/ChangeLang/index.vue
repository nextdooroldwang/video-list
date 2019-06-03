<template>
  <a-dropdown>
    <a-menu slot="overlay" @click="handleChangeLang">
      <a-menu-item key="en">English</a-menu-item>
      <a-menu-item key="ja">日本語</a-menu-item>
      <a-menu-item key="zh">中文</a-menu-item>
    </a-menu>
    <span class="svg-container" :style="iconStyle"></span>
  </a-dropdown>
</template>

<script>
import { setStore } from '@/utils/storage'

export default {
  name: 'ChangeLang',
  data () {
    return {

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