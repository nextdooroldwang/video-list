<template>
  <a-layout-header class="layout-header">
    <div class="logo-box">
      <div>
        <img src class="logo" alt="logo">
      </div>
      <div class="breadcrumb">Dashboard</div>
    </div>
    <div class="avatar-box">
      <div>
        <img src class="avatar">
      </div>
      <div class="setter">
        <div class="user-name">Bárbara Cotilla</div>
        <a-dropdown class="user-setting">
          <a href="#">
            Account Settings
            <a-icon type="down"/>
          </a>
          <a-menu slot="overlay" @click="onClick">
            <a-menu-item>
              <a href="javascript:;">logout</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </div>
  </a-layout-header>
</template>

<script>
export default {
  name: 'GlobalHeader',
  data () {
    return {
    }
  },
  methods: {
    onClick () {
      this.$store.dispatch('Logout').then(() => {
        this.$router.push({
          path: '/login'
        })
      })
    }
  },
}
</script>

<style lang="less" scoped>
.layout-header {
  display: flex;
  justify-content: space-between;
  padding-left: 31px;
  padding-right: 24px;
  min-width: 1305px;
  height: 60px;
  line-height: 60px;
  background: rgba(44, 100, 227, 1);
  .logo-box {
    display: flex;
    align-items: center;
    .logo {
      width: 122px;
      height: 22px;
      margin-right: 9px;
    }
    .breadcrumb {
      width: 94px;
      height: 24px;
      font-size: 18px;
      font-family: OpenSans-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 24px;
    }
  }
  .avatar-box {
    display: flex;
    align-items: center;
    .avatar {
      width: 36px;
      height: 36px;
      margin-right: 8px;
    }
    .setter {
      .user-name {
        width: 101px;
        height: 19px;
        font-size: 14px;
        font-family: OpenSans-Semibold;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
      }
      .user-setting {
        width: 93px;
        height: 17px;
        font-size: 12px;
        font-family: OpenSans-Regular;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.75);
      }
    }
  }
}
</style>