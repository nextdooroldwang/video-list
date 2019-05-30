<template>
  <a-layout-sider width="250" style="background: #fff">
    <a-menu
    mode="inline"
    :defaultSelectedKeys="['1']"
    :defaultOpenKeys="['sub1']"
    style="height: 100%"
    >
    <a-sub-menu
        v-for="item in projects" :key="item.name"
        class="logo" :style="{backgroundImage:`url(${item.logo})`}"
    >
        <span slot="title">
            {{item.name}}
        </span>
        <a-menu-item v-for="action in item.actions" :key="action.name" 
        style="text-align: left"
        @click="go(item.url+'?modal=2')"
        >
            <a-icon class="m-icon" :component="action.icon"/>
            {{action.name}}
            
        </a-menu-item>
    </a-sub-menu>

    </a-menu>
</a-layout-sider>
</template>

<script>
import { baseURL } from '@/config'
import server from '@/assets/icon/server.svg'
import box from '@/assets/icon/box.svg'
import bar from '@/assets/icon/chart-bar.svg'
import dollar from '@/assets/icon/file-invoice-dollar.svg'
import friends from '@/assets/icon/user-friends.svg'
import user from '@/assets/icon/user.svg'
import scroll from '@/assets/icon/scroll.svg'
export default {
  name: 'LeftSider',
  data: () => ({
      projects: [{
        name: 'Ocean',
        logo: require('@/assets/dashboard/ocean.png'),
        title: 'Cloud-Native Application Lifecycle Management',
        actions:[{
            name: 'Create a Stack',
            icon: server
        },{
            name: 'Deploy an Application',
            icon: box
        },],
        url: baseURL + '/ocean'
      }, {
        name: 'Wave',
        logo: require('@/assets/dashboard/wave.png'),
        title: 'Cloud Cost Optimization and Management',
        actions:[{
            name: 'Go to Wave Dashboard',
            icon: bar
        },{
            name: "Show latest invoice",
            icon: dollar
        },],
        url: baseURL + '/wave'
      }, {
        name: 'Ripple',
        logo: require('@/assets/dashboard/ripple.png'),
        title: 'Billing Management for MSPs and Resellers',
        actions:[{
            name: 'Go to Wave Dashboard',
            icon: friends
        },{
            name: 'Generate invoice',
            icon: dollar
        },],
        url: baseURL + '/ripple'
      }, {
        name: 'RBAC',
        logo: require('@/assets/dashboard/rbac.png'),
        title: 'User and Role Management for Mobbingi Services',
        actions:[{
            name: 'Create a User',
            icon: user
        },{
            name: 'Create a Role',
            icon: scroll
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
