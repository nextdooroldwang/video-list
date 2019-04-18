<template>
  <div class="login-mobingi-container">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'UserLayout',
}
</script>

<style lang="less">
.login-mobingi-container {
  min-width: 100%;
  min-height: 100%;
  padding: 20px 0;
  background: url(../../assets/bg.png) 0px top repeat,
    linear-gradient(to bottom, #d7bbea, #65a8f1);
  display: flex;
  justify-content: center;
  align-items: center;
  .ant-form-item {
    text-align: left;
    margin-bottom: 0;
  }
  .el-card__body {
    padding: 0;
  }
  .box-card {
    min-width: 450px;
  }
  .login-logo {
    width: 100%;
    padding: 20%;
    text-align: center;
  }
  .login-title {
    width: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    padding-left: 80px;
    position: relative;
    text-align: left;
    &:after {
      content: "";
      background-color: #047bf8;
      width: 32px;
      height: 7px;
      border-radius: 2px;
      display: block;
      position: absolute;
      bottom: -4px;
      left: 80px;
    }
  }
  .login-form {
    padding: 20px 80px;
    padding-bottom: 40px;
    .svg-container {
      position: absolute;
      // top: 40px;
      font-size: 24px;
      left: -38px;
    }
  }
  .ant-btn {
    margin-top: 1rem;
  }
  .login-footer {
    display: flex;
    justify-content: space-between;
    padding: 8px;
    font-size: 14px;
    a {
      color: #3b75e3;
    }
  }
}
</style>
