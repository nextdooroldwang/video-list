<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <div class="btn-box">
        <a-button type="primary" @click="onUpdate">发布新版本</a-button>
      </div>
      <a-table
        :columns="columns"
        :rowKey="record => record.id"
        :dataSource="dataCurrent"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
      >
        <template slot="version" slot-scope="text, record">
          <router-link :to="`/version/upload/uploadDetail/${record.id}`">{{text}}</router-link>
        </template>
        <template slot="action" slot-scope="text, record">
          <a-button
            @click="()=>download(record.software_id)"
            icon="download"
            size="small"
            shape="circle"
          ></a-button>
        </template>
      </a-table>
    </div>
  </a-card>
</template>

<script>
import { getReleases, downloadSoftware } from '@/api/version'
import moment from 'moment'
const columns = [{
  title: '版本号',
  dataIndex: 'version',
  scopedSlots: { customRender: 'version' },
}, {
  title: '更新台数',
  dataIndex: 'bloopy_count',
}, {
  title: '更新时间',
  dataIndex: 'created_at',
}, {
  title: '发布人',
  dataIndex: 'operator',
}, {
  title: '操作',
  dataIndex: 'action',
  scopedSlots: { customRender: 'action' },
}];

export default {
  name: 'Apk',
  data () {
    return {
      // 查询参数
      queryParam: {},
      // 表头
      columns,
      pagination: {},
      data: [],
      dataCurrent: [],
      loading: false,
      searchLoading: false
    }
  },
  created () {
    this.getList()
  },
  methods: {

    async getList () {
      this.loading = true
      await getReleases().then(res => {
        let data = res.data
        console.log(data)
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
      this.loading = false
    },
    handleTableChange (pagination, filters, sorter) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      let { pageSize, current } = this.pagination
      this.dataCurrent = this.data.slice(current * pageSize - pageSize, current * pageSize)
    },
    onUpdate () {
      this.$router.push({ name: 'UploadNew' })
    },
    download (id) {
      downloadSoftware({ id }).then(res => {
        window.open(res.url)
      }).catch(err => {
        console.log(err.response.data.message)
        this.$message.error('更新版本错误：' + err.response.data.message);
      })
    }
  }
}
</script>
<style scope>
.table-page-search-wrapper .ant-form {
  margin-bottom: 24px;
}
.action-btn {
  margin-right: 6px;
}
.btn-box {
  text-align: right;
  margin-bottom: 16px;
}
</style>