<template>
  <div>
    <div>
      <div class="title">基础信息</div>
      <div class="main">
        <div class="info">
          <div class="item">
            <span class="label">序列号ID</span>
            <span class="text">{{basic_info.serial_number||'无'}}</span>
          </div>
          <div class="item">
            <span class="label">型号</span>
            <span class="text">{{basic_info.model||'无'}}</span>
          </div>
          <div class="item">
            <span class="label">公司名称</span>
            <span class="text">{{basic_info.company_name||'无'}}</span>
          </div>
          <div class="item">
            <span class="label">位置</span>
            <span class="text">{{basic_info.position||'无'}}</span>
          </div>
          <div class="item">
            <span class="label">到期日期</span>
            <span class="text">{{basic_info.expire_date | conversion}}</span>
          </div>
          <div class="item">
            <span class="label">申请服务</span>
            <span class="text">{{basic_info.service_type||'无'}}</span>
          </div>
          <div class="item">
            <span class="label">软件版本</span>
            <span class="text">{{basic_info.software_version||'无'}}</span>
          </div>
          <div class="item">
            <span class="label">状态</span>
            <span class="text">{{basic_info.status||'无'}}</span>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="title">版本信息</div>
      <div class="main">
        <div class="info">
          <div class="item">
            <span class="label">软件版本</span>
            <span class="text">{{version_info.software_version||'无'}}</span>
            <span class="label">上次更新日期</span>
            <span class="text">{{version_info.software_updated_at||'无'}}</span>
          </div>
          <div class="item">
            <span class="label">固件版本</span>
            <span class="text">{{version_info.firmware_version||'无'}}</span>
            <span class="label">上次更新日期</span>
            <span class="text">{{version_info.firmware_updated_at||'无'}}</span>
          </div>
          <div class="item">
            <span class="label">人脸识别</span>
            <span class="text">{{version_info.face_recognition_version||'无'}}</span>
            <span class="label">上次更新日期</span>
            <span class="text">{{version_info.face_recognition_updated_at||'无'}}</span>
          </div>
          <div class="item">
            <span class="label">指纹识别</span>
            <span class="text">{{version_info.fingerprint_version||'无'}}</span>
            <span class="label">上次更新日期</span>
            <span class="text">{{version_info.fingerprint_updated_at||'无'}}</span>
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
            <span class="text">{{contact_info.admin_name||'无'}}</span>
          </div>
          <div class="item">
            <span class="label">电话</span>
            <span class="text">{{contact_info.admin_phone||'无'}}</span>
          </div>
          <div class="item">
            <span class="label">E-Mail</span>
            <span class="text">{{contact_info.admin_email||'无'}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getBloopy } from '@/api/customers'
import moment from 'moment'
export default {
  data () {
    return {
      basic_info: {
        company_name: "",
        expire_date: "",
        model: "",
        position: "",
        serial_number: "",
        service_type: "",
        status: "",
      },
      contact_info: {
        admin_email: "",
        admin_name: "",
        admin_phone: "",
      },
      version_info: {
        face_recognition_updated_at: "",
        face_recognition_version: "",
        fingerprint_updated_at: "",
        fingerprint_version: "",
        firmware_updated_at: "",
        firmware_version: "",
        software_updated_at: "",
        software_version: "",
      }
    }
  },
  filters: {
    conversion (value) {
      return moment(value).format('YYYY-MM-DD') || '无'
    }
  },
  created () {
    this.getData({ id: this.$route.query.id })
  },
  methods: {
    getData (params) {
      getBloopy(params).then(({ basic_info, contact_info, version_info }) => {
        this.basic_info = basic_info
        this.contact_info = contact_info
        this.version_info = version_info
      })
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
      .text {
        margin-right: 64px;
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
