<template>
  <div>
    <div>
      <div class="title">通知群发</div>
      <a-row :gutter="12" class="message-row">
        <a-col :md="20" :sm="24">
          <a-form layout="inline">
            <div class="formRow">
              <a-form-item label="通知对象">
                <a-select v-model="queryParam.notified_group" class="device-select">
                  <a-select-option value="3">全部用户</a-select-option>
                  <a-select-option value="2">商务版用户</a-select-option>
                  <a-select-option value="1">教育版用户</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="通知形式">
                <a-select v-model="queryParam.notify_type" class="device-select">
                  <a-select-option value="1">邮件通知</a-select-option>
                  <a-select-option value="2">后台通知</a-select-option>
                </a-select>
              </a-form-item>
            </div>
            <a-form-item label="通知内容" class="device-textarea">
              <a-textarea
                placeholder="请输入通知内容"
                :rows="4"
                v-model="queryParam.contents"
                class="aaa"
              />
            </a-form-item>
          </a-form>
        </a-col>

        <a-col :md="{ span: 2, offset: 2 }" :sm="24">
          <a-button type="primary" @click="submit" :loading="loading2">确认发送</a-button>
        </a-col>
      </a-row>
    </div>
    <div>
      <div class="title">通知历史记录</div>
      <a-table
        :columns="columns"
        :rowKey="record => record.id"
        :dataSource="dataCurrent"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
        :scroll="{ x: 1200 }"
      ></a-table>
    </div>
    <a-modal title="请确认发送的内容" type="warning" v-model="visible" @ok="handleOk">
      <p>{{`通知对象: ${group}`}}</p>
      <p>{{`通知形式: ${type}`}}</p>
      <p>{{`发送内容：${queryParam.contents}`}}</p>
    </a-modal>
  </div>
</template>
<script>
import { getMsgs, sendMsg } from '@/api/customers'
import moment from 'moment'

const columns = [{
  title: '发送时间',
  dataIndex: 'created_at',
  width: '20%',
}, {
  title: '通知对象',
  width: '10%',
  dataIndex: 'notified_group',
}, {
  title: '通知形式',
  width: '10%',
  dataIndex: 'notify_type',
}, {
  title: '通知内容',
  dataIndex: 'content',
  width: '40%',
}, {
  title: '发送者',
  width: '10%',
  dataIndex: 'sender',
}];
export default {
  data () {
    return {
      // 表头
      queryParam: {
        notified_group: '1',
        notify_type: '1',
        contents: ''
      },
      columns,
      pagination: {},
      data: [],
      dataCurrent: [],
      loading: false,
      loading2: false,
      visible: false
    }
  },

  created () {
    this.getList()
  },
  computed: {
    group () {
      switch (this.queryParam.notified_group) {
        case 1:
          return '教育版用户';
        case 2:
          return '商务版用户';
        default:
          return '全部用户';
      }
    },
    type () {
      switch (this.queryParam.notify_type) {
        case 1:
          return '邮件通知';
        default:
          return '后台通知';
      }
    }
  },
  methods: {
    async getList () {
      this.loading = true
      await getMsgs().then(res => {
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

        let { pageSize, current } = this.pagination
        this.dataCurrent = data.slice(current * pageSize - pageSize, current * pageSize)
      })
      this.loading = false
    },
    handleTableChange (pagination, filters, sorter) {
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager;
      let { pageSize, current } = this.pagination
      this.dataCurrent = this.data.slice(current * pageSize - pageSize, current * pageSize)
    },
    submit () {
      if (this.queryParam.contents) {
        this.visible = true
      } else {
        this.$message.error('通知内容不能为空')
      }
    },
    async handleOk () {
      this.visible = false
      this.loading2 = true
      await sendMsg(this.queryParam).then(res => {
        this.$message.success('发生成功')
      }).catch(err => {
        this.$message.error('发生失败：' + err)
      })
      this.loading2 = false
      this.getList()
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.message-row {
  padding: 0 48px 24px 24px;
}
.title {
  background: #f0f2f5;
  font-size: 16px;
  border-radius: 4px;
  padding: 12px 24px;
  color: rgba(0, 0, 0, 0.65);
  font-weight: 700;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
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
.formRow {
  display: flex;
  margin-bottom: 16px;
  .device-select {
    width: 200px;
  }
}
.device-textarea {
  width: 100%;
  .aaa {
    width: 600px;
  }
}
</style>
