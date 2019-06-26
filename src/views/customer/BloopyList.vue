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
          <a-col :md="{ span: 4, offset: 2 }" :sm="24">
            <a-button type="primary" @click="onSearch" :loading="searchLoading">搜索</a-button>
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
        :dataSource="dataCurrent"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
      >
        <template slot="serial_number" slot-scope="text, record">
          <router-link :to="`/customer/bloopy/bloopydetail/${record.id}`">{{text}}</router-link>
        </template>
        <template slot="status" slot-scope="text">
          <span
            :style="{color: text==='异常' ? 'red' : text === '关机' ? 'rgba(0,0,0,.5)' : 'inherit'}"
          >{{text}}</span>
        </template>
        <template slot="action" slot-scope="text, record">
          <a-dropdown>
            <a class="ant-dropdown-link" href="#">
              更多
              <a-icon type="down"/>
            </a>
            <a-menu slot="overlay" @click="(e)=>onDrop(e,record.id)">
              <a-menu-item key="1">升级软件版本</a-menu-item>
              <a-menu-item disabled key="2">查看操作记录</a-menu-item>
              <a-menu-item disabled key="3">远程重启</a-menu-item>
              <a-menu-item disabled key="4">远程关机</a-menu-item>
            </a-menu>
          </a-dropdown>
        </template>
      </a-table>
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
  </a-card>
</template>

<script>
import { getBloopys } from '@/api/customers'
import { getApks, createRelease } from '@/api/version'
import moment from 'moment'
import StepUpdate from '@/components/step/Bloopy'
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
}, {
  title: '操作',
  key: 'action',
  scopedSlots: { customRender: 'action' },
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
      loading: false,
      searchLoading: false,

      visible: false,
      uping: false,
      percent: 0,
      status: 'normal',
      statusInfo: '',
      id: null,

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
  created () {
    this.getList(this.queryParam)
  },
  methods: {
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    async getList (queryParam) {
      this.loading = true
      await getBloopys(queryParam).then(res => {
        let data = res.data
        data = data.map(item => {
          item.expire_date = moment(item.expire_date).format('YYYY-MM-DD') || '无'
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
    onChangeDate (date, dateString) {
      this.queryParam.start = dateString[0]
      this.queryParam.end = dateString[1]
    },
    async onSearch () {
      this.searchLoading = true
      await this.getList(this.queryParam)
      this.searchLoading = false
    },
    onDrop (e, id) {
      if (e.key == 1) {
        this.id = id
        this.update()
      }
    },
    update () {
      this.visible = true
      this.getVersion()
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
        bloopy: [this.id],
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