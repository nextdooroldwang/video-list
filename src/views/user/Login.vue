<template>
  <a-card class="box-card">
    <div class="login-logo">
      <img src="@/assets/dashboard/wave.png" width="100">
    </div>
    <h3 class="login-title">{{$t('login.login')}}</h3>
    <a-form class="login-form">
      <a-form-item
        :label="$t('login.user')"
        :validate-status="loginRules.username.status"
        :has-feedback="loginRules.username.status==='success'"
        :help="loginRules.username.help"
      >
        <span class="svg-container">
          <a-icon class="m-icon" :component="user2"/>
        </span>
        <a-input
          @change="validate"
          v-model="loginForm.username"
          type="text"
          placeholder="username"
        />
      </a-form-item>
      <a-form-item
        :label="$t('login.password')"
        :validate-status="loginRules.password.status"
        :has-feedback="loginRules.password.status==='success'"
        :help="loginRules.password.help"
      >
        <span class="svg-container">
          <a-icon class="m-icon" :component="psw"/>
        </span>
        <a-input
          :type="pwdType"
          v-model="loginForm.password"
          placeholder="password"
          @pressEnter="handleLogin"
          @change="validate"
        />
        <!-- <span class="show-pwd" @click="showPwd">
          <a-icon class="m-icon" :component="pwdType === 'password' ? eye : eyeOpen"/>
        </span>-->
      </a-form-item>
      <!-- <a-form-item> -->
      <a-button
        :loading="loading"
        type="primary"
        style="width:100%;"
        @click="handleLogin"
      >{{$t('login.login')}}</a-button>
      <!-- </a-form-item> -->
    </a-form>
    <div class="login-footer">
      <change-lang @on-change="handleChangeLang"/>
      <!-- <router-link to="login">{{$t('login.resetpsw')}}</router-link> -->
    </div>
  </a-card>
</template>

<script>
import {
  isvalidUsername
} from '@/utils/validate'
import ChangeLang from '@/components/ChangeLang'
import user2 from '@/assets/icon/user2.svg'
import psw from '@/assets/icon/psw.svg'
import eye from '@/assets/icon/eye.svg'
import eyeOpen from '@/assets/icon/eye-open.svg'
export default {
  name: 'LoginMobingi',
  components: {
    ChangeLang
  },
  data () {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error(this.$t('login.validatauser')))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error(this.$t('login.validatapsw')))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: 'admin'
      },
      loginRules: {
        username: {
          status: '',
          help: ''
        },
        password: {
          status: '',
          help: ''
        }
      },
      loading: false,
      pwdType: 'password',
      redirect: undefined,
      user2,
      psw,
      eye,
      eyeOpen
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd () {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin () {
      if (this.validate()) {
        // this.loading = true
        // this.$store.dispatch('Login', this.loginForm).then(() => {
        //   this.loading = false
        //   this.$router.push({
        //     path: this.redirect || '/'
        //   })
        // }).catch(() => {
        //   this.loading = false
        // })
        this.$router.push({
          path: this.redirect || '/dashboard'
        })
      } else {
        console.log('error submit!!')
        return false
      }
    },
    validate () {
      let a = 0
      if (!isvalidUsername(this.loginForm.username)) {
        a++
        this.loginRules.username = {
          status: 'error',
          help: this.$t('login.validatauser')
        }
      } else {
        this.loginRules.username = {
          status: 'success',
          help: ''
        }
      }
      if (this.loginForm.password.length < 5) {
        a++
        this.loginRules.password = {
          status: 'error',
          help: this.$t('login.validatapsw')
        }
      } else {
        this.loginRules.password = {
          status: 'success',
          help: ''
        }
      }
      return a > 0 ? false : true
    },
    handleChangeLang () {
      this.validate()
    },

  }
}
</script>

