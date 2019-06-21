<template>
  <div class="apk-detail-container">
    <div>
      <div class="title">基础信息</div>
      <div class="main">
        <a-skeleton :loading="skeletonLoading" active>
          <div class="info">
            <div class="item">
              <span class="label">APK文件</span>
              <span class="text">{{info.file_name||'无'}}</span>
            </div>
            <div class="item">
              <span class="label">版本号</span>
              <span class="text">{{info.version||'无'}}</span>
            </div>
            <div class="item">
              <span class="label">主要变更功能</span>
              <span class="text">{{info.description||'无'}}</span>
            </div>
            <div class="line"></div>
            <div class="item">
              <span class="label">文件路径URL</span>
              <span class="text">{{info.dir||'无'}}</span>
            </div>
            <div class="line"></div>
            <div class="item">
              <span class="label">上传时间</span>
              <span class="text">{{info.created_at|conversion}}</span>
            </div>
            <div class="item">
              <span class="label">上传人</span>
              <span class="text">{{info.operator||'无'}}</span>
            </div>
          </div>
        </a-skeleton>
      </div>
    </div>
  </div>
</template>
<script>
import { getApk } from '@/api/version'
import moment from 'moment'
export default {
  data () {
    return {
      info: {
        file_name: '',
        version: '',
        description: '',
        dir: '',
        created_at: '',
        operator: ''
      },

      keepId: '',
      skeletonLoading: false
    }
  },
  filters: {
    conversion (value) {
      return moment(value).format('YYYY-MM-DD HH:mm') || '无'
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
    async getData (params) {
      this.skeletonLoading = true
      await getApk(params).then(res => {
        this.info = res
      })
      this.skeletonLoading = false
    },
    init () {
      this.getData({ id: this.$route.params.id })
      this.keepId = this.$route.params.id
    }
  },
}
</script>
<style rel="stylesheet/scss" lang="scss">
.apk-detail-container {
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
    .line {
      width: 100%;
      height: 1px;
      border-bottom: 1px solid #eee;
      margin: 16px 0;
    }
  }
}
</style>
