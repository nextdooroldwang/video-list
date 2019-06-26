<template>
  <div class="bloopy-container">
    <div>
      <div class="title">基础信息</div>
      <div class="main">
        <a-skeleton :loading="skeletonLoading" active>
          <div class="info">
            <div class="item">
              <span class="label">序列号ID</span>
              <span class="text">{{basic_info.serial_number||'无'}}</span>
            </div>
            <div class="item">
              <span class="label">远程操作</span>
              <a-button @click="update" :loading="skeletonLoading">升级软件版本</a-button>
              <a-button disabled :loading="skeletonLoading">查看操作记录</a-button>
              <a-button disabled :loading="skeletonLoading">远程重启</a-button>
              <a-button disabled :loading="skeletonLoading">远程关机</a-button>
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
        </a-skeleton>
      </div>
    </div>
    <div>
      <div class="title">联系人信息</div>
      <div class="main">
        <a-skeleton :loading="skeletonLoading" active>
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
        </a-skeleton>
      </div>
    </div>
    <div>
      <div class="title">版本信息</div>
      <div class="main">
        <a-skeleton :loading="skeletonLoading" active>
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
        </a-skeleton>
      </div>
    </div>
    <div>
      <div class="title">软件升级记录</div>
      <div class="main">
        <a-table
          :columns="columns"
          :rowKey="record => record.id"
          :dataSource="dataCurrent"
          :pagination="pagination"
          :loading="skeletonLoading"
          @change="handleTableChange"
          class="versionTable"
        ></a-table>
      </div>
    </div>
    <a-modal
      title="请选择已有版本"
      v-model="visible"
      @ok="handleOk"
      width="800px"
      okText="确定更新"
      :okButtonProps="{ props: {disabled: uping} }"
    >
      <step-update
        :percent="percent"
        :status="status"
        :statusInfo="statusInfo"
        :count="1"
        v-show="uping"
        @done="onDone"
      />
      <a-table
        v-show="!uping"
        :columns="columnsVersion"
        :rowKey="record => record.id"
        :dataSource="dataCurrentVersion"
        :pagination="paginationVersion"
        :loading="loadingVersion"
        @change="handleTableChangeVersion"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
      ></a-table>
    </a-modal>
  </div>
</template>
<script>
import { getBloopy } from '@/api/customers'
import { getApks, createRelease } from '@/api/version'
import moment from 'moment'
import StepUpdate from '@/components/step/Bloopy'
const columns = [{
  title: '序列号ID',
  dataIndex: 'serial_number',
}, {
  title: '版本号',
  dataIndex: 'version',
}, {
  title: '更新前版本',
  dataIndex: 'pre_version',

}, {
  title: '更新时间',
  dataIndex: 'created_at',
}, {
  title: '发布人',
  dataIndex: 'operator',
}, {
  title: '更新状态',
  dataIndex: 'status',
}];

const columnsVersion = [{
  title: '版本号',
  dataIndex: 'version',
}, {
  title: '文件路径URL',
  dataIndex: 'dir',
}, {
  title: '上传时间',
  dataIndex: 'created_at',
}, {
  title: '上传人',
  dataIndex: 'operator',
}];
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
      },
      upgrade_record: {
        data: []
      },
      keepId: '',
      skeletonLoading: false,
      // 表头
      columns,
      pagination: {},
      data: [],
      dataCurrent: [],

      visible: false,
      uping: false,
      percent: 0,
      status: 'normal',
      statusInfo: '',

      columnsVersion,
      paginationVersion: {},
      dataVersion: [],
      dataCurrentVersion: [],
      loadingVersion: false,
      selectedRowKeys: []

    }
  },
  components: {
    StepUpdate
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
    init () {
      this.getData({ id: this.$route.params.id })
      this.keepId = this.$route.params.id
    },
    update () {
      this.visible = true
      this.getVersion()
    },
    async getData (params) {
      this.skeletonLoading = true
      await getBloopy(params).then(({ basic_info, contact_info, version_info, upgrade_record }) => {
        this.basic_info = basic_info
        this.contact_info = contact_info
        this.version_info = version_info
        let data = upgrade_record.data
        data = data.map(item => {
          item.created_at = moment(item.created_at).format('YYYY-MM-DD HH:mm') || '无'
          return item
        })
        let pagination = {
          total: data.length,
          pageSize: 10,
          current: 1
        }
        this.pagination = pagination
        this.data = data

        let { pageSize } = this.pagination
        this.dataCurrent = data.slice(1 * pageSize - pageSize, 1 * pageSize)

      })
      this.skeletonLoading = false
    },
    async getVersion () {
      this.loadingVersion = true
      await getApks().then(res => {
        let data = res.data
        data = data.map(item => {
          item.created_at = moment(item.created_at).format('YYYY-MM-DD HH:mm') || '无'
          return item
        })
        let pagination = {
          total: data.length,
          pageSize: 10,
          current: 1
        }
        this.paginationVersion = pagination
        this.dataVersion = data

        let { pageSize } = this.paginationVersion
        this.dataCurrentVersion = data.slice(1 * pageSize - pageSize, 1 * pageSize)
      })
      this.loadingVersion = false
    },
    async onSend (onProgress) {
      this.uping = true
      const { selectedRowKeys } = this;
      let p = {
        bloopy: [this.$route.params.id],
        type: '1',
        software_id: selectedRowKeys[0]
      }

      createRelease(p, onProgress).then(() => {
        this.$message.success('更新成功');
        this.status = 'success'
      }).catch(err => {
        console.log(err.response.data.message)
        this.$message.error('更新版本错误：' + err.response.data.message);
        this.status = 'exception'
        this.statusInfo = err.response.data.message
      })
    },
    onDone () {
      this.visible = false
      this.uping = false
    },
    onProgress (loaded, total) {
      this.percent = loaded / total * 100 | 0
      console.log(loaded, total)

    },
    handleTableChange (pagination) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      let { pageSize, current } = this.pagination
      this.dataCurrent = this.data.slice(current * pageSize - pageSize, current * pageSize)
    },
    handleTableChangeVersion (pagination) {
      const pager = { ...this.paginationVersion };
      pager.current = pagination.current;
      this.paginationVersion = pager;
      let { pageSize, current } = this.paginationVersion
      this.dataCurrentVersion = this.dataVersion.slice(current * pageSize - pageSize, current * pageSize)
    },
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys.slice(-1)
    },
    handleOk () {
      this.selectedRowKeys.length > 0 ? this.onSend(this.onProgress) : this.$message.error('请选择一个版本');
    }
  },
}
</script>
<style rel="stylesheet/scss" lang="scss">
.bloopy-container {
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
        flex-wrap: wrap;
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
        button {
          margin-right: 8px;
          width: 120px;
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
  .versionTable {
    width: 100%;
  }
}
</style>
