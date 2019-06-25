<template>
  <div class="apk-new-container">
    <div v-show="!uping">
      <div class="title">基础信息</div>
      <div class="main">
        <a-skeleton :loading="skeletonLoading" active>
          <div class="info">
            <div class="item">
              <span class="label label1">APK文件</span>
              <a-upload :remove="handleRemove" :beforeUpload="beforeUpload" :fileList="fileList">
                <a-button>
                  <a-icon type="upload"/>上传文件
                </a-button>
              </a-upload>
            </div>
            <div class="item">
              <span class="label">版本号</span>
              <a-input placeholder="请输入..." class="input" v-model="info.version"/>
            </div>
            <div class="item">
              <span class="label label1">主要变更功能</span>
              <a-textarea placeholder="请输入..." :rows="3" class="input" v-model="info.description"/>
            </div>

            <div class="line"></div>
            <div class="item" v-if="id">
              <span class="label">上传时间</span>
              <span class="text">{{info.created_at|conversion}}</span>
            </div>
            <div class="item" v-if="id">
              <span class="label">上传人</span>
              <span class="text">{{info.operator||'无'}}</span>
            </div>
            <div class="line" v-if="id"></div>
            <div :style="{textAlign:'center'}">
              <a-button type="primary" @click="onSend" :loading="uploading">上传APK文件包</a-button>
            </div>
          </div>
        </a-skeleton>
      </div>
    </div>
    <div v-show="uping">
      <div class="title">上传结果</div>
      <div class="main percent">
        <step-apk :percent="percent" :status="status" :statusInfo="statusInfo"/>
      </div>
    </div>
    <a-modal title="请确认上传的内容" type="warning" v-model="visible" @ok="handleOk">
      <p>{{`APK文件： ${fileList && (fileList.length > 0) && fileList[0].name || '无'}`}}</p>
      <p>{{`版本号： ${info.version}`}}</p>
      <p>{{`主要变更功能： ${info.description}`}}</p>
    </a-modal>
  </div>
</template>
<script>
import { uploadApk, updateApk, getApk } from '@/api/version'
import moment from 'moment'
import StepApk from '@/components/step/Apk'
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
      skeletonLoading: false,
      fileList: [],
      uploading: false,
      uping: false,
      id: null,
      percent: 0,
      status: 'normal',
      statusInfo: '',
      visible: false
    }
  },
  components: {
    StepApk
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
    this.init()
  },
  methods: {
    init () {
      console.log('forceUpdate')
      this.$forceUpdate()
      if (this.$route.query.id) {
        this.id = this.$route.query.id
        this.getData({ id: this.$route.query.id })
      }

    },
    async getData (params) {
      this.skeletonLoading = true
      await getApk(params).then(res => {
        this.info = res
      })
      this.skeletonLoading = false
    },
    handleRemove (file) {
      const index = this.fileList.indexOf(file);
      const newFileList = this.fileList.slice();
      newFileList.splice(index, 1);
      this.fileList = newFileList
    },
    beforeUpload (file) {
      this.fileList = [file]
      return false;
    },
    onSend () {
      if (this.info.version && this.info.description) {
        this.visible = true
      } else {
        this.$message.error('版本号或主要变更功能不能为空');
      }
    },
    onProgress (loaded, total) {
      this.percent = loaded / total * 100 | 0
    },
    async handleOk () {
      this.visible = false
      this.uping = true
      const { fileList, info } = this;
      let formData = new FormData();
      fileList && (fileList.length > 0) && formData.append('file', fileList[0]);
      formData.append('version', info.version)
      formData.append('description', info.description)
      this.uploading = true
      if (this.id) {
        await updateApk(formData, this.onProgress, this.id).then(res => {
          this.$message.success('上传成功');
          this.status = 'success'
        }).catch(err => {
          console.log(err.response.data.message)
          this.$message.error('请上传正确的Apk文件，错误信息：' + err.response.data.message);
          this.status = 'exception'
          this.statusInfo = err.response.data.message
        })
      } else {
        await uploadApk(formData, this.onProgress).then(res => {
          this.$message.success('上传成功');
          this.status = 'success'
        }).catch(err => {
          console.log(err.response.data.message)
          this.$message.error('请上传正确的Apk文件，错误信息：' + err.response.data.message);
          this.status = 'exception'
          this.statusInfo = err.response.data.message
        })
      }

      this.uploading = false
    }
  },
}
</script>
<style rel="stylesheet/scss" lang="scss">
.apk-new-container {
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
        .label1 {
          align-self: flex-start;
          margin-top: 8px;
        }
        .text-down {
          margin-left: 64px;
          color: #394eff;
          cursor: pointer;
        }
        .input {
          width: 300px;
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
  .percent {
    display: flex;
    justify-content: center;
    * {
      text-align: center;
    }
  }
}
</style>
