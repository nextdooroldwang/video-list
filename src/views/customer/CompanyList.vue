<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="12">
          <a-col :md="5" :sm="24">
            <a-input v-model="queryParam.company_name" placeholder="公司名称"/>
          </a-col>
          <a-col :md="4" :sm="24">
            <a-select v-model="queryParam.service_type" placeholder="服务类型">
              <a-select-option value="0">全部服务</a-select-option>
              <a-select-option value="1">教育版</a-select-option>
              <a-select-option value="2">商务版</a-select-option>
            </a-select>
          </a-col>
          <!-- <template v-if="advanced"> -->

          <a-col :md="4" :sm="24">
            <a-select v-model="queryParam.service_status" placeholder="服务状态">
              <a-select-option value="0">全部状态</a-select-option>
              <a-select-option value="1">停用</a-select-option>
              <a-select-option value="2">开启</a-select-option>
            </a-select>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-range-picker @change="onChangeDate"/>
          </a-col>
          <a-col :md="{ span: 2, offset: 1 }" :sm="24">
            <a-button type="primary" @click="()=>getList(queryParam)">搜索</a-button>
          </a-col>
          <!-- </template> -->
          <!-- <a-col :md="!advanced && 8 || 24" :sm="24">
            <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
              <a @click="toggleAdvanced" style="margin-left: 8px">
                {{ advanced ? '收起' : '展开' }}
                <a-icon :type="advanced ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>-->
        </a-row>
      </a-form>
      <a-table
        :columns="columns"
        :rowKey="record => record.id"
        :dataSource="dataCurrent"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
      >
        <template slot="company_name" slot-scope="text, record">
          <router-link :to="`/customer/company/companydetail?id=${record.id}`">{{text}}</router-link>
        </template>
        <template slot="service_status" slot-scope="text">
          <a-switch
            disabled
            checkedChildren="开启"
            unCheckedChildren="停用"
            :defaultChecked="text==='开启'"
          />
        </template>
      </a-table>
    </div>
  </a-card>
</template>

<script>
import { getCustomers } from '@/api/customers'
import moment from 'moment'
const columns = [{
  title: 'ID',
  dataIndex: 'id',
}, {
  title: '公司名称',
  dataIndex: 'company_name',
  scopedSlots: { customRender: 'company_name' },
}, {
  title: '管理员姓名',
  dataIndex: 'apply_name',
}, {
  title: '部门',
  dataIndex: 'apply_dept',
}, {
  title: '员工',
  dataIndex: 'staff_count',
}, {
  title: 'Bloopy台数',
  dataIndex: 'bloopy_count',
}, {
  title: '到期日期',
  dataIndex: 'expire_date',
}, {
  title: '申请服务',
  dataIndex: 'service_type',
}, {
  title: '状态',
  dataIndex: 'service_status',
  scopedSlots: { customRender: 'service_status' },
}];

export default {
  name: 'CompanyList',
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

    async getList (queryParam) {
      this.loading = true
      await getCustomers(queryParam).then(res => {
        let data = res.data
        console.log(queryParam)
        data = data.map(item => {
          item.expire_date = moment(item.expire_date).format('YYYY-MM-DD') || '无'
          item.service_status = item.service_status ? item.service_status : '开启'
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
          click: (e) => {
            if (e.target.className.indexOf('switch') < 0) {
              this.$router.push({
                name: 'CompanyDetail',
                query: {
                  id: row.id
                }
              })
            }

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
</style>