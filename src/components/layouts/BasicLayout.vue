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
      <div class="breadcrumb">
        <Breadcrumb/>
      </div>
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: 'calc(100vh - 160px)' }"
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
import Breadcrumb from '@/components/page/Breadcrumb'
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
    RouteView,
    Breadcrumb
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
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
}
.breadcrumb {
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  padding-left: 32px;
  background: #fff;
  margin-top: 4px;
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