<template>
  <div>
    <div>
      <div class="title">基础信息</div>
      <div class="main">
        <div class="info">
          <div class="item">
            <span class="label">公司名称</span>
            <span class="text">{{info.company_name||'无'}}</span>
          </div>
          <div class="item">
            <span class="label">公司地址</span>
            <span class="text">{{info.company_address||'无'}}</span>
          </div>
          <div class="item">
            <span class="label">网址</span>
            <span class="text">{{info.company_site||'无'}}</span>
          </div>
          <div class="item">
            <span class="label">电话</span>
            <span class="text">{{info.company_phone||'无'}}</span>
          </div>
          <div class="item">
            <span class="label">E-Mail</span>
            <span class="text">{{info.company_email||'无'}}</span>
          </div>
        </div>
        <div class="logo">
          <img :src="info.company_logo" alt="LOGO">
        </div>
      </div>
    </div>
    <div>
      <div class="title">服务信息</div>
      <div class="main">
        <div class="info">
          <div class="item">
            <span class="label">Bloopy台数</span>
            <span class="text">{{info.bloopy_count||'无'}}</span>
            <span class="text-down" @click="()=>show=!show">
              序列号ID
              <a-icon :type="show ? 'up' : 'down'"/>
            </span>
          </div>
          <div class="item" v-show="show">
            <span class="label"></span>
            <span class="text">
              <a-tag
                v-for="item in info.bloopies.data"
                :key="item.id"
                :style="{margin:'0 16px 8px 0'}"
                @click="()=>{$router.push({
                  name: 'BloopyDetail',
                  params:{id:item.id}
                })}"
              >{{item.software_version}}</a-tag>
            </span>
          </div>
          <div class="item">
            <span class="label">申请服务</span>
            <span class="text">{{info.service_type||'无'}}</span>
          </div>
          <div class="item">
            <span class="label">部门数</span>
            <span class="text">{{info.department_count||'无'}}</span>
          </div>
          <div class="item">
            <span class="label">员工数</span>
            <span class="text">{{info.staff_count||'无'}}</span>
          </div>
          <div class="item">
            <span class="label">到期日期</span>
            <span class="text">{{info.expire_date | conversion}}</span>
          </div>
          <div class="item">
            <span class="label">服务状态</span>
            <span class="text">{{info.service_status||'无'}}</span>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="title">联系人信息</div>
      <div class="main">
        <div class="info">
          <div class="item">
            <span class="label">管理员姓名</span>
            <span class="text">{{info.admin_name||'无'}}</span>
          </div>
          <div class="item">
            <span class="label">电话</span>
            <span class="text">{{info.admin_phone||'无'}}</span>
          </div>
          <div class="item">
            <span class="label">E-Mail</span>
            <span class="text">{{info.admin_email||'无'}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import logo from '@/assets/userdefault.png'
import { getCustomer } from '@/api/customers'
import moment from 'moment'
export default {
  data () {
    return {
      info: {
        company_logo: logo,
        company_name: '',
        company_address: '',
        company_site: '',
        company_phone: '',
        company_email: '',
        bloopies: { data: [] }
      },
      show: false,
      keepId: ''
    }
  },
  filters: {
    conversion (value) {
      return moment(value).format('YYYY-MM-DD') || '无'
    }
  },
  created () {
    this.init()
  },
  activated () {
    if (this.keepId && (this.keepId !== this.$route.params.id)) {
      this.init()
    }
  },
  methods: {
    getData (params) {
      getCustomer(params).then(res => {
        this.info = res
      })
    },
    init () {
      this.getData({ id: this.$route.params.id })
      this.keepId = this.$route.params.id
      this.show = false
    }
  },
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.title {
  background: #f0f2f5;
  font-size: 16px;
  border-radius: 4px;
  padding: 12px 24px;
  color: rgba(0, 0, 0, 0.65);
  font-weight: 700;
  display: flex;
  align-items: center;
}
.main {
  display: flex;
  min-height: 200px;
  padding: 24px 48px 24px 72px;
  .info {
    flex: 1;
    .item {
      display: flex;
      padding: 8px 0;
      align-items: center;
      .label {
        font-weight: 700;
        text-align: right;
        margin-right: 64px;
        min-width: 100px;
      }
      .text-down {
        margin-left: 64px;
        color: #394eff;
        cursor: pointer;
      }
    }
  }
  .logo {
    height: 200px;
    img {
      max-height: 100%;
      width: auto;
    }
  }
}
</style>
