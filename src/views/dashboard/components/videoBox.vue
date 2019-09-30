<template>
  <div
    class="video"
    :style="{'background':'url('+vdata.img+')','background-repeat': 'no-repeat',
            'background-size': 'cover'}"
  >
    <span class="title">{{vdata.title}}</span>
    <div class="video-alt">
      <div class="alt">{{vdata.alt}}</div>
      <div class="text">up主：{{vdata.uper}}</div>
      <div class="text">播放：{{vdata.views}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['vdata']
}
</script>

<style lang="less" scoped>
.video {
  width: 100%;
  height: 100%;
  border-radius: 6px;
  position: relative;
  padding: 8px;
  font-size: 12px;
  display: flex;
  align-items: flex-end;
  color: #fff;
  .title {
    font-weight: 700;
  }
  &:hover {
    .video-alt {
      position: absolute;
      left: 0;
      top: 0;
      background: rgba(0, 0, 0, 0.6);
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 6px;
      padding: 8px;
      .sub {
        margin-bottom: 40px;
      }
      .text {
        color: rgba(255, 255, 255, 0.8);
      }
    }
  }
  .video-alt {
    display: none;
  }
}
</style>