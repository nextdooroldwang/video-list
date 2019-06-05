<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <side-menu
      mode="inline"
      :menus="menus"
      theme="light"
      :collapsed="false"
      :collapsible="true"
      @menuSelect="menuSelect"
    ></side-menu>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <global-header @trigger="(t) => collapsed = t"/>
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', height: 'calc(100vh - 112px)' }"
      >
        <transition name="page-transition">
          <route-view/>
        </transition>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import GlobalHeader from '@/components/page/Header'
import SideMenu from '@/components/menu/SideMenu'
import RouteView from '@/components/layouts/RouteView'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      collapsed: false,
      menus: []
    }
  },
  components: {
    GlobalHeader,
    SideMenu,
    RouteView
  },
  computed: {
    ...mapState({
      // 动态主路由
      mainMenu: state => state.permission.addRouters
    }),
  },
  created () {
    this.menus = this.mainMenu.find(item => item.path === '/').children
  },
  methods: {
    menuSelect () {

    },
  }
}
</script>
<style>
.ant-layout-sider-children {
  background: #fff;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #394eff;
}

#components-layout-demo-custom-trigger .logo {
  height: 64px;
  /* text-align: center; */
  padding-left: 10%;
  line-height: 64px;
  font-size: 18px;
}
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