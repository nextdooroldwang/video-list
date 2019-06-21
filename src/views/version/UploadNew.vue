<template>
  <div>
    <div v-show="!uping">
      <div class="title">基础信息</div>
      <div class="main">
        <div class="info">
          <div class="item">
            <span class="label">版本号</span>
            <a-select v-model="id" class="input" @change="handleChangeVersion">
              <a-select-option
                v-for="item in softwares"
                :key="item.version"
                :value="item.id"
              >{{item.version}}</a-select-option>
            </a-select>
          </div>
          <div class="item">
            <span class="label">对应APK文件</span>
            <span class="text">{{dir}}</span>
          </div>
          <div class="item">
            <span class="label label1">主要变更功能</span>
            <span class="input">{{description}}</span>
          </div>

          <div class="line"></div>
          <div class="item">
            <span class="label label1">指定机器人</span>
            <a-select
              mode="tags"
              class="input2"
              :tokenSeparators="[',']"
              @change="handleChangeBloopy"
              v-model="hasbloopys"
            >
              <a-select-option v-for="item in bloopys" :key="item.id+''">{{item.serial_number}}</a-select-option>
            </a-select>
            <a-button icon="plus" @click="moreBloopy" class="btn1"></a-button>
          </div>
          <div class="item">
            <span class="label">更新时间</span>
            <a-select v-model="type" class="input">
              <a-select-option value="1">现在更新</a-select-option>
              <a-select-option value="2">定期更新</a-select-option>
            </a-select>
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
          <div class="line"></div>
          <div :style="{textAlign:'center'}">
            <a-button type="primary" @click="()=>{onSend(onProgress)}" :loading="uploading">确定</a-button>
          </div>
        </div>
      </div>
    </div>
    <div v-show="uping">
      <div class="title">版本更新详情</div>
      <div class="main percent">
        <step-update
          :percent="percent"
          :status="status"
          :statusInfo="statusInfo"
          :count="hasbloopys.length"
          :id="detailId"
        />
      </div>
    </div>
    <a-modal title="指定机器人" v-model="visible" @ok="handleOk" width="800px" :footer="null">
      <a-table
        :columns="columns"
        :rowKey="record => record.id+''"
        :dataSource="dataCurrent"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
        :rowSelection="{selectedRowKeys: hasbloopys, onChange: onSelectChange}"
      >
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
import { getApks, createRelease } from '@/api/version'
import { getBloopys } from '@/api/customers'
import moment from 'moment'
import StepUpdate from '@/components/step/Update'

const columns = [{
  title: '序列号ID',
  dataIndex: 'serial_number',
}, {
  title: '型号',
  dataIndex: 'model',
}, {
  title: '公司名称',
  dataIndex: 'company_name',

}, {
  title: '申请服务',
  dataIndex: 'service_type',
}, {
  title: '软件版本',
  dataIndex: 'software_version',
}, {
  title: '状态',
  dataIndex: 'status',
  scopedSlots: { customRender: 'status' },
}];
export default {
  data () {
    return {
      softwares: [],
      id: null,
      dir: '',
      description: '',
      operator: '',
      created_at: '',
      hasbloopys: [],
      bloopys: [],
      type: '1',

      uploading: false,
      uping: false,
      percent: 0,
      status: 'normal',
      statusInfo: '',
      detailId: null,

      // 表头
      columns,
      pagination: {},
      dataCurrent: [],
      loading: false,
      visible: false
    }
  },
  components: {
    StepUpdate
  },
  filters: {
    conversion (value) {
      return moment(value).format('YYYY-MM-DD HH:mm') || '无'
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.getVersions()
      this.getBloopys()
    },
    getVersions () {
      getApks().then(res => {
        let data = res.data
        this.softwares = data
        this.id = this.softwares[0].id
        this.dir = this.softwares[0].dir
        this.description = this.softwares[0].description
        this.operator = this.softwares[0].operator
        this.created_at = this.softwares[0].created_at
      })
    },
    getBloopys () {
      getBloopys().then(res => {
        let data = res.data


        let pagination = {
          total: data.length,
          pageSize: 10,
          current: 1
        }
        this.pagination = pagination
        this.bloopys = data

        let { pageSize } = this.pagination
        this.dataCurrent = data.slice(1 * pageSize - pageSize, 1 * pageSize)
      })
    },
    handleChangeVersion (val) {
      this.softwares.map(item => {
        if (val === item.id) {
          this.dir = item.dir
          this.description = item.description
          this.operator = item.operator
          this.created_at = item.created_at
        }
      })
    },
    handleChangeBloopy (val) {
      console.log(this.hasbloopys)
    },
    moreBloopy () {
      this.visible = true
    },
    onSelectChange (selectedRowKeys) {
      this.hasbloopys = selectedRowKeys
    },
    handleOk () {
      console.log(this.hasbloopys)
    },
    handleTableChange (pagination, filters, sorter) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      let { pageSize, current } = this.pagination
      this.dataCurrent = this.bloopys.slice(current * pageSize - pageSize, current * pageSize)
    },
    async onSend (onProgress) {
      this.uping = true
      const { hasbloopys, id, type } = this;
      let p = {
        bloopy: hasbloopys,
        type: type,
        software_id: id
      }
      this.uploading = true
      await createRelease(p, onProgress).then(res => {
        console.log(res)
        this.detailId = res.id
        this.$message.success('更新成功');
        this.status = 'success'
      }).catch(err => {
        console.log(err.response.data.message)
        this.$message.error('更新版本错误：' + err.response.data.message);
        this.status = 'exception'
        this.statusInfo = err.response.data.message
      })
      this.uploading = false
    },
    onProgress (loaded, total) {
      this.percent = loaded / total * 100 | 0
      console.log(loaded, total)
    }
  },
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
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
</style>
