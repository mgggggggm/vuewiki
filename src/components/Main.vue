<!--<meta name="google-site-verification" content="P_nC9t8BcWeyX8lXsTAUIAeHKrFuOYQ_uuCDC9mavwg">-->
<template>
  <div class="mainPage">
    <v-nav></v-nav>
    <div class="top-content" style="height: 3rem"></div>
    <div class="content">
      <div>
        <el-carousel height="250px">
          <el-carousel-item v-for="(item,index) in items" :key="index">
           <img v-bind:src= "item.img" width="550px" height="250px">
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="content_mid_one">
        <ul v-if="user" v-for="item in user">
          <li>{{item.username}}</li>
        </ul>
      </div>
      <div>

          <video
          id="myVideo"
          class="video-js"
          >
          <source
            src="http://www.chigusahana.com/%E3%80%90%E6%98%8E%E6%97%A5%E6%96%B9%E8%88%9F%E3%80%91%E5%85%A8%E7%BD%91%E6%9C%80%E4%BD%8E%E9%98%B5%E5%AE%B9%E6%8C%82%E6%9C%BA%E6%88%8F%E8%80%8D%E9%BE%99%E9%97%A8%E5%89%BF%E7%81%AD400%E6%9D%80-%E8%B9%AD-%E8%B9%AD-%E8%B9%AD%20-%201.%E9%BE%99%E9%97%A8%E5%A4%96%E7%8E%AF%20%E6%88%8F%E8%80%8D%28Av52116375,P1%29.mp4"
            type="video/mp4"
          >
          </video>
        <!--<div>{{title}}</div>-->

      </div>
    </div>
  </div>
</template>

<style scoped>
  /deep/.el-carousel{
    width: 27.5rem;
    margin-left: 12rem;
  }
  /deep/.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  /deep/.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  /deep/.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  /deep/.video-js{
    margin-left: 200px;
  }
  /deep/.video-js .vjs-big-play-button{
  display: none;
  }
</style>
<script>
  import $ from 'jquery'
  import TopNav from './divComponents/TopNav'
  import Cookies from 'js-cookie'
  import { mapState } from 'vuex'
  export default {
    name: "mainPage",
    // title:'',
    components:{
      'v-nav':TopNav
    },
    data(){
      return{
        items:[
          {img:require('../components/image/aqua咩.png')},
          {img:require('../components/image/咩aqua.png')},
          {img:require('../components/image/meaqua2.jpg')},
          {img:require('../components/image/P_P.jpg')},
          {img:require('../components/image/aquacall.gif')},
        ],
        user:[],
      }
    },
    created:function(){
      this.$store.state.User = []
    },
    mounted: function() {
      this.initVideo();
      let _self = this;
      if (undefined!=this.$store.state.User) {
            _self.user = _self.$store.state.User
            console.log(_self.user)
      }
      else {
        // _self.user = _self.$store.state.User
        _self.$router.push('/login');
        alert("请先登录！");
      }
    },
    methods:{
      initVideo() {
        //初始化视频方法
        let myPlayer = this.$video(myVideo, {
          //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
          controls: true,
          //自动播放属性,muted:静音播放
          autoplay:false,
          // autoplay: "muted",
          //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
          preload: "auto",
          //设置视频播放器的显示宽度（以像素为单位）
          width: "160px",
          //设置视频播放器的显示高度（以像素为单位）
          height: "100px"
        });
      }
    }
  }
</script>
