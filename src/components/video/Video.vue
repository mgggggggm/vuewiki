<template>
       
    <div class="main">

      <div class="content">
        <span>{{title}}</span>
        <video
          id="myVideo"
          class="video-js"
        >
          <source
            src="http://www.chigusahana.com/%E3%80%90%E6%98%8E%E6%97%A5%E6%96%B9%E8%88%9F%E3%80%91%E5%85%A8%E7%BD%91%E6%9C%80%E4%BD%8E%E9%98%B5%E5%AE%B9%E6%8C%82%E6%9C%BA%E6%88%8F%E8%80%8D%E9%BE%99%E9%97%A8%E5%89%BF%E7%81%AD400%E6%9D%80-%E8%B9%AD-%E8%B9%AD-%E8%B9%AD%20-%201.%E9%BE%99%E9%97%A8%E5%A4%96%E7%8E%AF%20%E6%88%8F%E8%80%8D%28Av52116375,P1%29.mp4"
            type="video/mp4"
          >
        </video>
      </div>
    </div>
</template>
<style scoped>
  /deep/.video-js .vjs-big-play-button{
    margin-top: 12em;
  }
</style>
<script>
    export default {
        data() {
          return {
            title: '',
          }
        },
          mounted: function() {
          this.initVideo();
          this.title =  decodeURIComponent("%E3%80%90%E6%98%8E%E6%97%A5%E6%96%B9%E8%88%9F%E3%80%91%E5%85%A8%E7%BD%91%E6%9C%80%E4%BD%8E%E9%98%B5%E5%AE%B9%E6%8C%82%E6%9C%BA%E6%88%8F%E8%80%8D%E9%BE%99%E9%97%A8%E5%89%BF%E7%81%AD400%E6%9D%80-%E8%B9%AD-%E8%B9%AD-%E8%B9%AD%20")

          },
          methods:{
          initVideo(){
              //初始化视频方法
              let myPlayer = this.$video(myVideo, {
                //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
                controls: true,
                //自动播放属性,muted:静音播放
                autoplay: false,
                // autoplay: "muted",
                //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
                preload: "auto",
                //设置视频播放器的显示宽度（以像素为单位）
                width: "800px",
                //设置视频播放器的显示高度（以像素为单位）
                height: "510px"
              });
            }
          }
    }
</script>
