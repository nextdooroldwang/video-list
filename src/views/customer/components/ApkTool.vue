<template>
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
</template>

<script>
import { getBloopy } from '@/api/customers'
import moment from 'moment'

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
      columnsApk,
      paginationApk: {},
      dataApk: [],
      dataCurrentApk: [],
      loadingApk: false
    }
  },
  methods: {
    init () {
      this.getData({ id: this.$route.params.id })
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
    handleApkTableChange (pagination, filters, sorter) {
      const pager = { ...this.paginationApk };
      pager.current = pagination.current;
      this.paginationApk = pager;
      let { pageSize, current } = this.paginationApk
      this.dataCurrentApk = this.dataApk.slice(current * pageSize - pageSize, current * pageSize)
    },
  },
}
</script>

<style scoped>
</style>