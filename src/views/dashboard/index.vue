<template>
  <div class="dashboard-container">
    <a-row :gutter="33">
      <a-col class="gutter-row" :span="6" v-for="item in project" :key="item.name">
        <div class="gutter-box">
          <div class="title-box">
            <div class="logo" :style="{backgroundImage:`url(${item.logo})`}">{{item.name}}</div>
            <div class="title">{{item.title}}</div>
          </div>
          <div class="btn-group">
            <div class="btn1-box" @click="()=>go(item.url+'?modal=user')">
              <a-icon class="m-icon" :component="item.icon1"/>
              {{item.btn1}}
            </div>
            <div class="btn2-box" @click="()=>go(item.url+'?modal=role')">
              <a-icon class="m-icon" :component="item.icon2"/>
              {{item.btn2}}
            </div>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import server from '@/assets/icon/server.svg'
import box from '@/assets/icon/box.svg'
import bar from '@/assets/icon/chart-bar.svg'
import dollar from '@/assets/icon/file-invoice-dollar.svg'
import friends from '@/assets/icon/user-friends.svg'
import user from '@/assets/icon/user.svg'
import scroll from '@/assets/icon/scroll.svg'
export default {
  name: 'Dashboard',
  data () {
    return {
      project: [{
        name: 'Ocean',
        logo: require('@/assets/dashboard/ocean.png'),
        title: 'Cloud-Native Application Lifecycle Management',
        btn1: 'Create a Stack',
        icon1: server,
        btn2: 'Deploy an Application',
        icon2: box,
        url: ''
      }, {
        name: 'Wave',
        logo: require('@/assets/dashboard/wave.png'),
        title: 'Cloud Cost Optimization and Management',
        btn1: 'Show overall usage cost',
        icon1: bar,
        btn2: 'Show latest invoice',
        icon2: dollar,
        url: ''
      }, {
        name: 'Ripple',
        logo: require('@/assets/dashboard/ripple.png'),
        title: 'Billing Management for MSPs and Resellers',
        btn1: 'Create a billing group',
        icon1: friends,
        btn2: 'Generate invoice',
        icon2: dollar,
        url: ''
      }, {
        name: 'RBAC',
        logo: require('@/assets/dashboard/rbac.png'),
        title: 'User and Role Management for Mobbingi Services',
        btn1: 'Create a User',
        icon1: user,
        btn2: 'Create a Role',
        icon2: scroll,
        url: 'http://mobingi-rbac-ui.s3-website-ap-northeast-1.amazonaws.com/dashboard'
      }]
    }
  },
  methods: {
    go (url) {
      window.location.href = url
    }
  },
}
</script>

<style lang='less'>
.dashboard-container {
  .gutter-box {
    width: 289px;
    height: 344px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 4px 0px rgba(197, 203, 221, 1);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 23px 18px 16px 18px;
    .title-box {
      display: flex;
      align-items: center;
      flex-direction: column;
      .logo {
        width: 136px;
        height: 136px;
        background-repeat: no-repeat;
        background-size: 136px 136px;
        font-size: 36px;
        font-family: "OpenSans-Bold";
        font-weight: bold;
        color: rgba(46, 60, 83, 1);
        display: flex;
        justify-content: center;
        align-items: flex-end;
      }
      .title {
        font-size: 14px;
        font-family: "OpenSans-Regular";
        font-weight: 400;
        color: rgba(69, 83, 111, 1);
        line-height: 19px;
      }
    }
    .btn-group {
      .m-icon {
        font-size: 16px;
        margin: 0 14px;
      }
      .btn1-box {
        width: 253px;
        height: 43px;
        background: rgba(231, 241, 255, 1);
        border-radius: 4px 4px 4px 0px;
        margin-bottom: 8px;
        display: flex;
        align-items: center;
        font-size: 14px;
        font-family: "OpenSans-Semibold";
        font-weight: 600;
        color: rgba(0, 100, 255, 1);
        cursor: pointer;
      }
      .btn2-box {
        width: 253px;
        height: 43px;
        background: rgba(231, 241, 255, 1);
        border-radius: 4px 4px 4px 0px;
        display: flex;
        align-items: center;
        font-size: 14px;
        font-family: "OpenSans-Semibold";
        font-weight: 600;
        color: rgba(0, 100, 255, 1);
        cursor: pointer;
      }
    }
  }
}
</style>