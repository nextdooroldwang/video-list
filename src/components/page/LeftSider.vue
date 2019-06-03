<template>
  <a-layout-sider width="250" style="background: #fff">
    <a-menu
      mode="inline"
      :defaultSelectedKeys="['1']"
      :defaultOpenKeys="['sub1']"
      style="height: 100%"
    >
      <a-sub-menu
        v-for="item in projects"
        :key="item.name"
        class="logo"
        :style="{backgroundImage:`url(${item.logo})`}"
      >
        <span slot="title">{{item.name}}</span>
        <a-menu-item
          v-for="action in item.actions"
          :key="action.name"
          style="text-align: left"
          @click="go(item.url+'?modal=2')"
        >{{action.name}}</a-menu-item>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import { baseURL } from '@/config'
export default {
  name: 'LeftSider',
  data: () => ({
    projects: [{
      name: 'Ocean',
      logo: '',
      title: 'Cloud-Native Application Lifecycle Management',
      actions: [{
        name: 'Create a Stack',
        // icon: server
      }, {
        name: 'Deploy an Application',
        // icon: box
      },],
      url: baseURL + '/ocean'
    }, {
      name: 'Wave',
      logo: '',
      title: 'Cloud Cost Optimization and Management',
      actions: [{
        name: 'Go to Wave Dashboard',
        // icon: bar
      }, {
        name: "Show latest invoice",
        // icon: dollar
      },],
      url: baseURL + '/wave'
    }, {
      name: 'Ripple',
      logo: '',
      title: 'Billing Management for MSPs and Resellers',
      actions: [{
        name: 'Go to Wave Dashboard',
        // icon: friends
      }, {
        name: 'Generate invoice',
        // icon: dollar
      },],
      url: baseURL + '/ripple'
    }, {
      name: 'RBAC',
      logo: '',
      title: 'User and Role Management for Mobbingi Services',
      actions: [{
        name: 'Create a User',
        // icon: user
      }, {
        name: 'Create a Role',
        // icon: scroll
      },],
      url: baseURL + '/users'
    }]
  }
  ),
  methods: {
    go (url) {
      window.location.href = url
    }
  }
}
</script>

<style lang='less'>
</style>
