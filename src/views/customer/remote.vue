<template>
  <div class="remote-container">
    <a-form layout="inline">
      <div v-if="!$route.query.serial_number">
        <div :md="{ span: 6}" :sm="24" class="search">
          <span>Bloopy序列号ID:</span>
          <a-input v-model="queryParam.serial_number" placeholder="请输入..." class="input"/>
          <a-button type="primary" @click="onSearch" :loading="skeletonLoading">查找Bloopy</a-button>
        </div>
      </div>
      <div class="line" v-if="!$route.query.serial_number"></div>
      <div class="edit" v-if="hadInfo">
        <a-button @click="visible=true" :loading="skeletonLoading">升级软件版本</a-button>
        <a-button @click="onSearch" :loading="skeletonLoading">查看操作记录</a-button>
        <a-button @click="onSearch" :loading="skeletonLoading">远程重启</a-button>
        <a-button @click="onSearch" :loading="skeletonLoading">远程关机</a-button>
      </div>
    </a-form>
    <div v-if="hadInfo">
      <div class="title">基础信息</div>
      <div class="main">
        <a-skeleton :loading="skeletonLoading" active>
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
        </a-skeleton>
      </div>
    </div>

    <div v-if="hadInfo">
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
    <div v-if="hadInfo">
      <div class="title">软件升级记录</div>
      <div class="main">
        <a-table
          :columns="columns"
          :rowKey="record => record.id"
          :dataSource="data"
          :pagination="pagination"
          :loading="skeletonLoading"
          @change="handleTableChange"
          class="versionTable"
        >
          <template slot="serial_number" slot-scope="text, record">
            <router-link :to="`/customer/bloopy/bloopydetail/${record.id}`">{{text}}</router-link>
          </template>
          <template slot="status" slot-scope="text">
            <span
              :style="{color: text==='异常' ? 'red' : text === '关机' ? 'rgba(0,0,0,.5)' : 'inherit'}"
            >{{text}}</span>
          </template>
        </a-table>
      </div>
    </div>
    <a-modal title="请选择APK文件包" v-model="visible" @ok="handleOk" okText="确定更新">
      <a-table
        :columns="columnsApk"
        :rowKey="record => record.id"
        :dataSource="dataApk"
        :pagination="paginationApk"
        :loading="loadingApk"
        @change="handleApkTableChange"
      >
        <template slot="serial_number" slot-scope="text, record">
          <router-link :to="`/customer/bloopy/bloopydetail/${record.id}`">{{text}}</router-link>
        </template>
        <template slot="status" slot-scope="text">
          <span
            :style="{color: text==='异常' ? 'red' : text === '关机' ? 'rgba(0,0,0,.5)' : 'inherit'}"
          >{{text}}</span>
        </template>
      </a-table>
    </a-modal>
  </div>
</template>
<script>
import { getRemote } from '@/api/customers'
import moment from 'moment'
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
  scopedSlots: { customRender: 'status' },
}];
const columnsApk = [{
  title: 'ID',
  dataIndex: 'serial_number',
  scopedSlots: { customRender: 'serial_number' },
}, {
  title: 'APK文件',
  dataIndex: 'model',
}, {
  title: '版本号',
  dataIndex: 'company_name',

}, {
  title: '上传时间',
  dataIndex: 'expire_date',
}, {
  title: '上传人',
  dataIndex: 'software_version',
}, {
  title: '操作',
  dataIndex: 'status',
  scopedSlots: { customRender: 'status' },
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
      skeletonLoading: false,
      // 表头
      columns,
      pagination: {},
      data: [],
      dataCurrent: [],
      queryParam: {},

      visible: false,
      columnsApk,
      paginationApk: {},
      dataApk: [],
      dataCurrentApk: [],
      hadInfo: false
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
  methods: {
    init () {
      this.getData({ serial_number: this.$route.query.serial_number })
    },
    async getData (params) {
      this.skeletonLoading = true
      await getRemote(params).then(({ basic_info, contact_info, version_info, upgrade_record }) => {
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
        this.hadInfo = true
      }).catch(err => {
        this.hadInfo = false
        console.log(err)
      })
      this.skeletonLoading = false
    },
    handleTableChange (pagination) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      let { pageSize, current } = this.pagination
      this.dataCurrent = this.data.slice(current * pageSize - pageSize, current * pageSize)
    },
    handleApkTableChange (pagination) {
      const pager = { ...this.paginationApk };
      pager.current = pagination.current;
      this.paginationApk = pager;
      let { pageSize, current } = this.paginationApk
      this.dataCurrentApk = this.dataApk.slice(current * pageSize - pageSize, current * pageSize)
    },
    onSearch () {
      if (this.queryParam.serial_number) {
        this.getData({ serial_number: this.queryParam.serial_number })
      } else {
        this.$message.error('序列号ID不能为空')
      }
    },
    handleOK () {

    }
  },
}
</script>
<style rel="stylesheet/scss" lang="scss">
.remote-container {
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
  .line {
    border-top: 1px solid #eee;
    width: 100%;
    height: 1px;
    margin-top: 24px;
  }
  .edit {
    text-align: center;

    button {
      margin: 36px 8px;
      width: 160px;
    }
  }
  .search {
    display: flex;
    align-items: center;
    .input {
      width: 300px;
      margin: 0 64px 0 8px;
    }
  }
  .versionTable {
    width: 100%;
  }
}
</style>
