<template>
  <a-layout-sider
    :class="['sider', theme ]"
    width="256px"
    :collapsible="collapsible"
    v-model="collapsed"
    :trigger="null"
  >
    <div class="logo">
      <img :src="logo">
      <span>运维端</span>
    </div>
    <s-menu
      :collapsed="collapsed"
      :menu="menus"
      :theme="theme"
      :mode="mode"
      @select="onSelect"
      style="padding: 16px 0px;"
    ></s-menu>
  </a-layout-sider>
</template>

<script>
import SMenu from './index'
import logo from '@/assets/menu_logo.png'
export default {
  name: 'SideMenu',
  components: { SMenu },
  data () {
    return {
      logo
    }
  },
  props: {
    mode: {
      type: String,
      required: false,
      default: 'inline'
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    },
    collapsible: {
      type: Boolean,
      required: false,
      default: false
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    menus: {
      type: Array,
      required: true
    }
  },
  methods: {
    onSelect (obj) {
      this.$emit('menuSelect', obj)
    }
  }
}
</script>
<style>
.logo {
  height: 64px;
  /* text-align: center; */
  padding-left: 10%;
  line-height: 64px;
  font-size: 18px;
}
.logo img {
  width: 60%;
}
.logo > span {
  margin-left: 8px;
  font-size: 14px;
  padding: 4px 8px;
  border-radius: 4px;
  background: #f0f2f5;
}
</style>