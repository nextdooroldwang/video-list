<template>
  <div class="upload-detail-container">
    <div>
      <div class="title">基础信息</div>
      <div class="main">
        <a-skeleton :loading="loading" active>
          <div class="info">
            <div class="item">
              <span class="label">版本号</span>
              <span class="text">{{version}}</span>
            </div>
            <div class="item">
              <span class="label">对应APK文件</span>
              <span class="text">{{path}}</span>
            </div>
            <div class="item">
              <span class="label label1">主要变更功能</span>
              <span class="input">{{description}}</span>
            </div>

            <div class="line"></div>
            <div class="item tag">
              <span class="label label1">指定机器人</span>
              <span class="text">
                <a-tag
                  v-for="item in bloopies"
                  :style="{margin:'0 16px 8px 0'}"
                  :key="item.serial_number"
                >{{item.serial_number}}</a-tag>
              </span>
            </div>
            <div class="item">
              <span class="label">更新时间</span>
              <span class="text">{{type}}</span>
            </div>
            <div class="line"></div>
            <div class="item">
              <span class="label">发布时间</span>
              <span class="text">{{created_at|conversion}}</span>
            </div>
            <div class="item">
              <span class="label">发布人</span>
              <span class="text">{{operator}}</span>
            </div>
          </div>
        </a-skeleton>
      </div>
    </div>
    <div>
      <div class="title">版本更新详情</div>
      <div class="main-table">
        <a-table
          :columns="columns"
          :rowKey="record => record.id"
          :dataSource="dataCurrent"
          :pagination="pagination"
          :loading="loading"
          @change="handleTableChange"
          class="table"
        >
          <template slot="created_at" slot-scope="text">
            <span>{{text|conversion}}</span>
          </template>
          <template slot="status" slot-scope="text">
            <span
              :style="{color: text==='异常' ? 'red' : text === '关机' ? 'rgba(0,0,0,.5)' : 'inherit'}"
            >{{text}}</span>
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>
<script>
import { getRelease } from '@/api/version'
import moment from 'moment'

const columns = [{
  title: '序列号ID',
  dataIndex: 'serial_number',
}, {
  title: '公司名称',
  dataIndex: 'company_name',
}, {
  title: '版本号',
  dataIndex: 'version',
}, {
  title: '更新前版本',
  dataIndex: 'pre_version',
}, {
  title: '更新时间',
  dataIndex: 'created_at',
  scopedSlots: { customRender: 'created_at' },
}, {
  title: '发布人',
  dataIndex: 'operator',
}, {
  title: '更新状态',
  dataIndex: 'status',
  scopedSlots: { customRender: 'status' },
}];
export default {
  data () {
    return {
      version: '',
      path: '',
      description: '',
      operator: '',
      created_at: '',
      type: '',
      bloopies: [],

      // 表头
      columns,
      pagination: {},
      data: [],
      dataCurrent: [],
      loading: false,
      keepId: ''
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
    init () {
      this.getDetail()
      this.keepId = this.$route.params.id
    },
    async getDetail () {
      this.loading = true
      await getRelease({ id: this.$route.params.id }).then(res => {
        let data = res
        this.version = data.version
        this.path = data.path
        this.description = data.description
        this.operator = data.operator
        this.created_at = data.created_at
        this.type = data.type
        this.bloopies = data.bloopies.data

        let pagination = {
          total: data.upgrade_record.data.length,
          pageSize: 10,
          current: 1
        }
        this.pagination = pagination
        this.data = data.upgrade_record.data

        let { pageSize } = this.pagination
        this.dataCurrent = this.data.slice(1 * pageSize - pageSize, 1 * pageSize)
      })
      this.loading = false
    },

    handleTableChange (pagination) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      let { pageSize, current } = this.pagination
      this.dataCurrent = this.data.slice(current * pageSize - pageSize, current * pageSize)
    },

  },
}
</script>
<style rel="stylesheet/scss" lang="scss">
.upload-detail-container {
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
  .main-table {
    padding: 16px;
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
        }
        .btn1 {
          align-self: flex-start;
        }
        .text-down {
          margin-left: 64px;
          color: #394eff;
          cursor: pointer;
        }
        .input {
          width: 300px;
        }
        .input2 {
          width: 244px;
          margin-right: 8px;
        }
        .tag {
          flex-wrap: wrap;
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
