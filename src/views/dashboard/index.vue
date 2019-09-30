<template>
  <div class="index-container">
    <div class="head-banner">
      <div class="head-content">
        <div class="search-box">
          <a-input-search placeholder="input search text" style="width: 272px" @search="onSearch"/>
        </div>
      </div>
    </div>
    <div class="main-box">
      <div class="main-content">
        <div class="classify-box">
          <div class="classify">
            <div>
              <svg-icon class="classify-icon" icon-class="home"/>
            </div>
            <span>首页</span>
          </div>
          <div class="classify" v-for="item in classify" :key="item.name">
            <div class="number-box">{{item.number}}</div>
            <div>{{item.name}}</div>
          </div>
        </div>
        <div class="first-content">
          <div class="first-banner">
            <video-box v-for="item in firstBanner" :key="item.path" :vdata="item"/>
          </div>
          <div class="first-sub-box">
            <video-box v-for="item in firstContent" :key="item.path" :vdata="item"/>
          </div>
        </div>
        <div class="others-content">
          <div class="videos">
            <div class="header">
              <div class="left">
                <i class="icon icon1"></i>
                <span class="name">动画</span>
              </div>
              <div class="right">更多</div>
            </div>
            <div class="content">
              <video-box v-for="item in otherContents" :key="item.path" :vdata="item"/>
            </div>
          </div>
          <div class="hot">
            <div class="header">
              <span class="name">排行</span>
            </div>
            <div class="content">
              <div class="item" v-for="(item,index) in hot" :key="index">
                <div class="number" :class="{'topNumber':index < 3 }">{{index+1}}</div>
                <div class="title">{{item.title}}</div>
              </div>
            </div>
            <div class="more">查看更多 ></div>
          </div>
        </div>
        <div class="others-content">
          <div class="videos">
            <div class="header">
              <div class="left">
                <i class="icon icon2"></i>
                <span class="name">鬼畜</span>
              </div>
              <div class="right">更多</div>
            </div>
            <div class="content">
              <video-box v-for="item in otherContents" :key="item.path" :vdata="item"/>
            </div>
          </div>
          <div class="hot">
            <div class="header">
              <span class="name">排行</span>
            </div>
            <div class="content">
              <div class="item" v-for="(item,index) in hot" :key="index">
                <div class="number" :class="{'topNumber':index < 3 }">{{index+1}}</div>
                <div class="title">{{item.title}}</div>
              </div>
            </div>
            <div class="more">查看更多 ></div>
          </div>
        </div>
        <div class="others-content">
          <div class="videos">
            <div class="header">
              <div class="left">
                <i class="icon icon3"></i>
                <span class="name">电影</span>
              </div>
              <div class="right">更多</div>
            </div>
            <div class="content">
              <video-box v-for="item in otherContents" :key="item.path" :vdata="item"/>
            </div>
          </div>
          <div class="hot">
            <div class="header">
              <span class="name">排行</span>
            </div>
            <div class="content">
              <div class="item" v-for="(item,index) in hot" :key="index">
                <div class="number" :class="{'topNumber':index < 3 }">{{index+1}}</div>
                <div class="title">{{item.title}}</div>
              </div>
            </div>
            <div class="more">查看更多 ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firstContentImage from '@/assets/images/firstcontent.jpeg'
import VideoBox from './components/videoBox'
export default {
  data () {
    return {
      classify: [
        {
          icon: '',
          name: '动画',
          path: '',
          number: 132
        },
        {
          icon: '',
          name: '游戏',
          path: '',
          number: 1055
        },
        {
          icon: '',
          name: '电影',
          path: '',
          number: 768
        },
        {
          icon: '',
          name: '鬼畜',
          path: '',
          number: 3351
        },
        {
          icon: '',
          name: '科技',
          path: '',
          number: 156
        }
      ],
      firstBanner: [{
        title: '时间胶囊——十周年特别版',
        img: firstContentImage,
        path: '0',
        alt: '时间胶囊——十周年特别版【BML2019单品】',
        uper: 'XX up主',
        views: '32.5万'
      },],
      firstContent: [
        {
          title: '时间胶囊——十周年特别版',
          img: firstContentImage,
          path: '1',
          alt: '时间胶囊——十周年特别版【BML2019单品】',
          uper: 'XX up主',
          views: '32.5万'
        }, {
          title: '时间胶囊——十周年特别版',
          img: firstContentImage,
          path: '2',
          alt: '时间胶囊——十周年特别版【BML2019单品】',
          uper: 'XX up主',
          views: '32.5万'
        }, {
          title: '时间胶囊——十周年特别版',
          img: firstContentImage,
          path: '3',
          alt: '时间胶囊——十周年特别版【BML2019单品】',
          uper: 'XX up主',
          views: '32.5万'
        }, {
          title: '时间胶囊——十周年特别版',
          img: firstContentImage,
          path: '4',
          alt: '时间胶囊——十周年特别版【BML2019单品】',
          uper: 'XX up主',
          views: '32.5万'
        }, {
          title: '时间胶囊——十周年特别版',
          img: firstContentImage,
          path: '5',
          alt: '时间胶囊——十周年特别版【BML2019单品】',
          uper: 'XX up主',
          views: '32.5万'
        }, {
          title: '时间胶囊——十周年特别版',
          img: firstContentImage,
          path: '6',
          alt: '时间胶囊——十周年特别版【BML2019单品】',
          uper: 'XX up主',
          views: '32.5万'
        }, {
          title: '时间胶囊——十周年特别版',
          img: firstContentImage,
          path: '7',
          alt: '时间胶囊——十周年特别版【BML2019单品】',
          uper: 'XX up主',
          views: '32.5万'
        }, {
          title: '时间胶囊——十周年特别版',
          img: firstContentImage,
          path: '8',
          alt: '时间胶囊——十周年特别版【BML2019单品】',
          uper: 'XX up主',
          views: '32.5万'
        },
      ],
      otherContents: [
        {
          title: '时间胶囊——十周年特别版',
          img: firstContentImage,
          path: '1',
          alt: '时间胶囊——十周年特别版【BML2019单品】',
          uper: 'XX up主',
          views: '32.5万'
        }, {
          title: '时间胶囊——十周年特别版',
          img: firstContentImage,
          path: '2',
          alt: '时间胶囊——十周年特别版【BML2019单品】',
          uper: 'XX up主',
          views: '32.5万'
        }, {
          title: '时间胶囊——十周年特别版',
          img: firstContentImage,
          path: '3',
          alt: '时间胶囊——十周年特别版【BML2019单品】',
          uper: 'XX up主',
          views: '32.5万'
        }, {
          title: '时间胶囊——十周年特别版',
          img: firstContentImage,
          path: '4',
          alt: '时间胶囊——十周年特别版【BML2019单品】',
          uper: 'XX up主',
          views: '32.5万'
        }, {
          title: '时间胶囊——十周年特别版',
          img: firstContentImage,
          path: '5',
          alt: '时间胶囊——十周年特别版【BML2019单品】',
          uper: 'XX up主',
          views: '32.5万'
        }, {
          title: '时间胶囊——十周年特别版',
          img: firstContentImage,
          path: '6',
          alt: '时间胶囊——十周年特别版【BML2019单品】',
          uper: 'XX up主',
          views: '32.5万'
        }, {
          title: '时间胶囊——十周年特别版',
          img: firstContentImage,
          path: '7',
          alt: '时间胶囊——十周年特别版【BML2019单品】',
          uper: 'XX up主',
          views: '32.5万'
        }, {
          title: '时间胶囊——十周年特别版',
          img: firstContentImage,
          path: '8',
          alt: '时间胶囊——十周年特别版【BML2019单品】',
          uper: 'XX up主',
          views: '32.5万'
        }, {
          title: '时间胶囊——十周年特别版',
          img: firstContentImage,
          path: '9',
          alt: '时间胶囊——十周年特别版【BML2019单品】',
          uper: 'XX up主',
          views: '32.5万'
        }, {
          title: '时间胶囊——十周年特别版',
          img: firstContentImage,
          path: '10',
          alt: '时间胶囊——十周年特别版【BML2019单品】',
          uper: 'XX up主',
          views: '32.5万'
        },
      ],
      hot: [
        {
          title: '装X被疯狂打脸是种什么感受？这部穿越剧看得我尴尬症都犯了！'
        },
        {
          title: '拥有VAN的声线是种什么体验'
        },
        {
          title: '拥有VAN的声线是种什么体验'
        },
        {
          title: '拥有VAN的声线是种什么体验'
        },
        {
          title: '拥有VAN的声线是种什么体验'
        },
        {
          title: '拥有VAN的声线是种什么体验'
        },
        {
          title: '拥有VAN的声线是种什么体验'
        },
      ]
    }
  },
  components: { VideoBox },
  methods: {
    onSearch (v) {
      console.log(v);
    }
  },
}
</script>

<style lang="less" scoped>
.index-container {
  width: 100%;
  min-height: 100vh;
  background: #fff;
  padding-bottom: 100px;
  .head-banner {
    width: 100%;
    height: 170px;
    background-image: url("../../assets/images/header.png");
    background-position: center -10px;
    background-repeat: no-repeat;
    .head-content {
      margin: 0 auto;
      width: 1160px;
      height: 100%;
      .search-box {
        width: 100%;
        text-align: right;
        padding-top: 116px;
        padding-right: 24px;
      }
    }
  }
  .main-box {
    width: 100%;
    .main-content {
      margin: 0 auto;
      width: 1160px;
      .classify-box {
        height: 60px;
        padding: 8px 0;
        display: flex;
        align-items: center;
        .classify {
          height: 100%;
          margin-right: 30px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          font-size: 12px;
          & > div {
            text-align: center;
          }
          .number-box {
            height: 14px;
            background: #ffcacb;
            border-radius: 4px;
            padding: 0px 4px;
            color: #fff;
            line-height: 14px;
            margin-top: 6px;
          }
          .classify-icon {
            font-size: 1.5vw;
          }
        }
      }
      .first-content {
        width: 100%;
        height: 220px;
        display: grid;
        grid-template-columns: 440px 1fr;
        grid-gap: 20px;
        .first-sub-box {
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          grid-gap: 20px 20px;
        }
      }
      .others-content {
        width: 100%;
        height: 400px;
        display: grid;
        grid-template-columns: 1fr 260px;
        grid-gap: 20px;
        margin-top: 30px;
        .videos {
          height: 100%;
          width: 100%;
          .header {
            width: 100%;
            height: 45px;
            margin-bottom: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .left {
              display: flex;
              align-items: center;
              .icon {
                width: 40px;
                height: 40px;
                margin-right: 10px;
                display: inline-block;
                background: url("../../assets/images/icons.png");
              }
              .icon1 {
                background-position: -141px -908px;
              }
              .icon2 {
                background-position: -141px -140px;
              }
              .icon3 {
                background-position: -140px -1611px;
              }
              .name {
                font-size: 24px;
                line-height: 24px;
                font-weight: 400;
                color: #222;
                padding-top: 8px;
              }
            }
            .right {
              width: 52px;
              height: 22px;
              line-height: 22px;
              background-color: #fff;
              border: 1px solid #ccd0d7;
              color: #555;
              border-radius: 4px;
              text-align: center;
            }
          }
          .content {
            width: 100%;
            height: calc(100% - 60px);
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
            grid-template-rows: 1fr 1fr;
            grid-gap: 20px 20px;
          }
        }
        .hot {
          .header {
            width: 100%;
            height: 45px;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            .name {
              font-size: 24px;
              line-height: 24px;
              font-weight: 400;
              color: #222;
              padding-top: 8px;
            }
          }
          .content {
            width: 100%;
            height: calc(100% - 86px);
            .item {
              width: 100%;
              margin-bottom: 20px;
              display: flex;
              .number {
                color: #fff;
                height: 18px;
                line-height: 18px;
                font-size: 12px;
                min-width: 18px;
                text-align: center;
                background-color: #b8c0cc;
                border-radius: 4px;
                padding: 0 3px;
                font-weight: bolder;
                margin-right: 7px;
              }
              .topNumber {
                background-color: #f25d8e;
              }
            }
          }
          .more {
            display: block;
            height: 24px;
            line-height: 24px;
            background-color: #e5e9ef;
            text-align: center;
            border: 1px solid #e0e6ed;
            color: #222;
            border-radius: 4px;
          }
        }
      }
    }
  }
}
</style>