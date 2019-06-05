<template>
  <a-dropdown>
    <a-menu slot="overlay" @click="handleChangeLang">
      <a-menu-item key="en">
        <span role="img" aria-label="英文">🇺🇸</span> English
      </a-menu-item>
      <a-menu-item key="ja">
        <span role="img" aria-label="日文">🇯🇵</span> 日本語
      </a-menu-item>
      <a-menu-item key="zh">
        <span role="img" aria-label="简体中文">🇨🇳</span> 简体中文
      </a-menu-item>
    </a-menu>
    <span class="svg-container">
      {{this.langValue}}
      <svg-icon icon-class="dropdown"/>
    </span>
  </a-dropdown>
</template>

<script>

export default {
  name: 'ChangeLang',
  data () {
    return {
      lang: this.$store.getters.lang || 'en'
    }
  },
  computed: {
    langValue () {
      switch (this.lang) {
        case 'en':
          return 'English'
        case 'ja':
          return '日本語'
        case 'zh':
          return '简体中文'
        default:
          return 'English'
      }
    }
  },
  methods: {
    handleChangeLang ({ key }) {
      this.lang = key
      this.$i18n.locale = key
      this.$store.dispatch('setLang', key)
      this.$emit('on-change', key)
      this.$message.success('Switch Language Success')
    },
  }
}
</script>

<style scoped>
.svg-container {
  cursor: pointer;
  width: 85px;
  height: 28px;
  background: rgba(245, 248, 251, 1);
  font-family: PingFangSC-Regular;
  font-weight: 400;
  font-size: 12px;
  color: rgba(104, 116, 142, 1);
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
}
</style>