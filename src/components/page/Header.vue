<template>
  <a-layout-header class="layout-header">
    <div class="logo-box">
      <!-- <a-icon
        class="trigger"
        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
        @click="handleTrigger"
      />-->
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
      collapsed: false,
    }
  },
  methods: {
    onClick () {
      this.$store.dispatch('Logout').then(() => {
        this.$router.push({
          path: '/user/login'
        })
      })
    },
    handleTrigger () {
      this.collapsed = !this.collapsed
      this.$emit('trigger', this.collapsed)
    }
  },
}
</script>

<style lang="less" scoped>
.ant-layout-header {
  padding-left: 0;
}
.layout-header {
  display: flex;
  justify-content: space-between;
  padding-right: 24px;
  height: 64px;
  line-height: 64px;
  background: #fff;
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
      color: rgba(0, 0, 0, 1);
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
        color: rgba(0, 0, 0, 1);
      }
      .user-setting {
        width: 93px;
        height: 17px;
        font-size: 12px;
        font-family: OpenSans-Regular;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.75);
      }
    }
  }
}
</style>