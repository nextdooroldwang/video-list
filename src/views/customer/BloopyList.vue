<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="12">
          <a-col :md="5" :sm="24" class="col1">
            <a-input v-model="queryParam.serial_number" placeholder="序列号ID"/>
          </a-col>
          <a-col :md="5" :sm="24" class="col1">
            <a-input v-model="queryParam.company_name" placeholder="公司名称"/>
          </a-col>
          <a-col :md="5" :sm="24" class="col1">
            <a-input v-model="queryParam.model" placeholder="型号"/>
          </a-col>
          <template v-if="advanced">
            <a-col :md="5" :sm="24" class="col1">
              <a-input v-model="queryParam.software_version" placeholder="版本号"/>
            </a-col>
            <a-col :md="5" :sm="24">
              <a-select v-model="queryParam.service_type" placeholder="服务类型">
                <a-select-option value="0">全部服务</a-select-option>
                <a-select-option value="1">教育版</a-select-option>
                <a-select-option value="2">商务版</a-select-option>
              </a-select>
            </a-col>
            <a-col :md="5" :sm="24">
              <a-select v-model="queryParam.status" placeholder="机器人状态">
                <a-select-option value="0">全部状态</a-select-option>
                <a-select-option value="1">正常</a-select-option>
                <a-select-option value="2">异常</a-select-option>
                <a-select-option value="3">关机</a-select-option>
              </a-select>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-range-picker @change="onChangeDate"/>
            </a-col>
          </template>
          <a-col :md="{ span: 3, offset: 2 }" :sm="24">
            <a-button type="primary" @click="()=>getList(queryParam)">搜索</a-button>
            <a @click="toggleAdvanced" style="margin-left: 8px">
              {{ advanced ? '收起' : '展开' }}
              <a-icon :type="advanced ? 'up' : 'down'"/>
            </a>
          </a-col>
        </a-row>
      </a-form>
      <a-table
        :columns="columns"
        :rowKey="record => record.id"
        :dataSource="data"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
      >
        <template slot="serial_number" slot-scope="text, record">
          <router-link :to="`/customer/bloopy/bloopydetail?id=${record.id}`">{{text}}</router-link>
        </template>
        <template slot="status" slot-scope="text">
          <span
            :style="{color: text==='异常' ? 'red' : text === '关机' ? 'rgba(0,0,0,.5)' : 'inherit'}"
          >{{text}}</span>
        </template>
      </a-table>
    </div>
  </a-card>
</template>

<script>
import { getBloopys } from '@/api/customers'
import moment from 'moment'
const columns = [{
  title: '序列号ID',
  dataIndex: 'serial_number',
  scopedSlots: { customRender: 'serial_number' },
}, {
  title: '型号',
  dataIndex: 'model',
}, {
  title: '公司名称',
  dataIndex: 'company_name',

}, {
  title: '位置',
  dataIndex: 'position',
}, {
  title: '申请服务',
  dataIndex: 'service_type',
}, {
  title: '到期日期',
  dataIndex: 'expire_date',
}, {
  title: '软件版本',
  dataIndex: 'software_version',
}, {
  title: '状态',
  dataIndex: 'status',
  scopedSlots: { customRender: 'status' },
}];

export default {
  name: 'BloopyList',
  data () {
    return {
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 表头
      columns,
      pagination: {},
      data: [],
      dataCurrent: [],
      loading: false
    }
  },
  created () {
    this.getList(this.queryParam)
  },
  methods: {
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    async getList (queryParam) {
      this.loading = true
      console.log(queryParam)
      await getBloopys(queryParam).then(res => {
        let data = res.data
        data = data.map(item => {
          item.expire_date = moment(item.expire_date).format('YYYY-MM-DD') || '无'
          return item
        })
        // data = data.filter(item => (company_name ? item.company_name.indexOf(company_name) !== -1 : true) && (!service_type || service_type === '0') ? true : (service_type === item.service_type))

        let pagination = {
          total: data.length,
          pageSize: 20,
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
    onChangeDate (date, dateString) {
      console.log(date, dateString);
      this.queryParam.start = dateString[0]
      this.queryParam.end = dateString[1]
    },
    handleSelect (row) {
      return {
        on: { // 事件
          click: () => {
            this.$router.push({
              name: 'BloopyDetail',
              query: {
                id: row.id
              }
            })
          },       // 点击行
        },

      }
    }
  }
}
</script>
<style scope>
.table-page-search-wrapper .ant-form {
  margin-bottom: 24px;
}
.col1 {
  margin-bottom: 8px;
}
</style>