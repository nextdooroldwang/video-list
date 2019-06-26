<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <div class="btn-box">
        <a-button type="primary" @click="onUpdate">上传新APK文件包</a-button>
      </div>
      <a-table
        :columns="columns"
        :rowKey="record => record.id"
        :dataSource="dataCurrent"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
      >
        <template slot="file_name" slot-scope="text, record">
          <router-link :to="`/version/apk/apkDetail/${record.id}`">{{text}}</router-link>
        </template>
        <template slot="action" slot-scope="text, record">
          <a-button
            icon="edit"
            size="small"
            shape="circle"
            @click="()=>$router.push({ name: 'ApkNew',query:{id:record.id} })"
            class="action-btn"
          ></a-button>
          <a-button @click="()=>download(record.id)" icon="download" size="small" shape="circle"></a-button>
        </template>
      </a-table>
    </div>
  </a-card>
</template>

<script>
import { getApks, downloadSoftware } from '@/api/version'
import moment from 'moment'
const columns = [{
  title: 'APK文件',
  dataIndex: 'file_name',
  scopedSlots: { customRender: 'file_name' },
}, {
  title: '版本号',
  dataIndex: 'version',
}, {
  title: '主要变更功能',
  dataIndex: 'description',
}, {
  title: '上传时间',
  dataIndex: 'created_at',
}, {
  title: '上传人',
  dataIndex: 'operator',
}, {
  title: '文件路径URL',
  dataIndex: 'dir',
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
        this.pagination = pagination
        this.data = data

        let { pageSize } = this.pagination
        this.dataCurrent = data.slice(1 * pageSize - pageSize, 1 * pageSize)
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
    onUpdate () {
      this.$router.push({ name: 'ApkNew' })
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
.btn-box {
  text-align: right;
  margin-bottom: 16px;
}
.action-btn {
  margin-right: 8px;
}
</style>