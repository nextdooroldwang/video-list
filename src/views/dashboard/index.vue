<template>
  <div class="dashboard-container" style="margin-right:5%">
    <a-row :gutter="16">
      <a-col :span="3" :order="1" class="gutter-row">
        <a-timeline mode="right" style="padding-top:80px; padding-right:5px">
          <a-timeline-item>1 hour ago</a-timeline-item>
          <a-timeline-item color="green">2 hour ago</a-timeline-item>
          <a-timeline-item>
            <a-icon slot="dot" type="clock-circle-o" style="font-size: 16px;" />
            2 hour ago
          </a-timeline-item>
          <a-timeline-item color="red">2015/09/01</a-timeline-item>
          <a-timeline-item>2015/09/01</a-timeline-item>
          <a-timeline-item>
            <a-icon slot="dot" type="clock-circle-o" style="font-size: 16px;" />
            2015/09/01
          </a-timeline-item>
        </a-timeline>
      </a-col>
      <a-col :span="18" :order="2">
    
        <a-list
          class="demo-loadmore-list"
          :loading="loading"
          itemLayout="horizontal"
          :dataSource="activities"
        >
          <div v-if="showLoadingMore" slot="loadMore" :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }">
            <a-spin v-if="loadingMore" />
            <a-button v-else @click="onLoadMore">loading more</a-button>
          </div>
          <a-list-item slot="renderItem" slot-scope="item">
            <a-list-item-meta
            >
              <a :style="{textAlign: 'left'}" slot="title" href="https://vue.ant.design/">{{item.account}}</a>
              <a-avatar v-if="!item.title" slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            </a-list-item-meta>
            <div style="padding-right:40px">{{item.description}}</div>
            <div>{{item.product}}</div>
          </a-list-item>
        </a-list>
      </a-col>
    </a-row>  
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data :() =>({
    activities : [
      {
        title: true,
        account: "Account",
        description: "Desciption",
        product: "Product"
      },
      {
        title: false,
        account: "test1",
        description: "doing test1",
        product: "wave"
      },
      {
        title: false,
        account: "test2",
        description: "doing test2",
        product: "wave"
      },
      {
        title: false,
        account: "test3",
        description: "doing test3",
        product: "wave"
      },
      {
        title: false,
        account: "test3",
        description: "doing test3",
        product: "wave"
      },
      {
        title: false,
        account: "test3",
        description: "doing test3",
        product: "wave"
      },
      {
        title: false,
        account: "test3",
        description: "doing test3",
        product: "wave"
      },
    ]
  }),
  methods: {
    go (url) {
      window.location.href = url
    }
  },
}
</script>

<style lang='less'>
.dashboard-container {
  .gutter-box {
    width: 289px;
    height: 344px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 4px 0px rgba(197, 203, 221, 1);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 23px 18px 16px 18px;
    .title-box {
      display: flex;
      align-items: center;
      flex-direction: column;
      .logo {
        width: 136px;
        height: 136px;
        background-repeat: no-repeat;
        background-size: 136px 136px;
        font-size: 36px;
        font-family: "OpenSans-Bold";
        font-weight: bold;
        color: rgba(46, 60, 83, 1);
        display: flex;
        justify-content: center;
        align-items: flex-end;
      }
      .title {
        font-size: 14px;
        font-family: "OpenSans-Regular";
        font-weight: 400;
        color: rgba(69, 83, 111, 1);
        line-height: 19px;
      }
    }
    .btn-group {
      .m-icon {
        font-size: 16px;
        margin: 0 14px;
      }
    }
  }
  
}
</style>