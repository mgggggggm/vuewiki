<!--<meta name="google-site-verification" content="P_nC9t8BcWeyX8lXsTAUIAeHKrFuOYQ_uuCDC9mavwg">-->
<template>
  <div class="mainPage">
    <div class="top">
      <el-menu id="menu" class="menu" mode="horizontal">
        <a href=""><img :src="logo" style="width: 60px; height: 60px; border-radius: 10px; float: left;margin-left: 11rem;"></a>
        <el-menu-item ><a href="">文章</a></el-menu-item>
        <el-menu-item ><a href="">视频</a></el-menu-item>
        <el-menu-item ><a href="">音乐</a></el-menu-item>
        <el-submenu index="2" style="margin-left: 26rem" popper-class="test" v-show="unLogin">
          <template slot="title" v-show="unLogin"><a href=""><img style="width: 50px; height: 50px; border-radius: 25px;" :src="img.url" :onerror="defaultImg"/></a></template>
          <el-menu-item index="2-1" v-show="unLogin"><a href="/login">登录</a></el-menu-item>
          <el-menu-item index="2-2" v-show="unLogin"><a href="/register">注册</a></el-menu-item>
        </el-submenu>
        <el-submenu index="2" style="margin-left: 26rem" popper-class="test" v-show="hasLogin">
          <template slot="title" v-show="hasLogin"><a href=""><img style="width: 50px; height: 50px; border-radius: 25px;" :src="img.url" :onerror="defaultImg"/></a></template>
          <el-menu-item index="2-1" v-show="hasLogin"><a href="/userInfo">个人中心</a></el-menu-item>
          <el-menu-item index="2-2" v-show="hasLogin"><a href="/main" @click="logout">退出</a></el-menu-item>
        </el-submenu>
        <el-submenu index="3" popper-class="test">
          <template slot="title"><a href="">消息中心</a></template>
          <el-menu-item index="3-1"><a href="">我的消息</a></el-menu-item>
          <el-menu-item index="3-2"><a href="">系统通知</a></el-menu-item>
        </el-submenu>
        <el-submenu index="4" popper-class="test">
          <template slot="title"><a href="">动态</a></template>
          <el-menu-item index="4-1"><a href="">我的消息</a></el-menu-item>
          <el-menu-item index="4-2"><a href="">系统通知</a></el-menu-item>
        </el-submenu>
        <el-submenu index="5" popper-class="test">
          <template slot="title"><a href="">收藏</a></template>
          <el-menu-item index="5-1">1</el-menu-item>
          <el-menu-item index="5-2">2</el-menu-item>
        </el-submenu>
        <el-submenu index="6" popper-class="test">
          <template slot="title"><a href="">观看历史</a></template>
          <el-menu-item index="6-1">1</el-menu-item>
          <el-menu-item index="6-2">2</el-menu-item>
        </el-submenu>
      </el-menu>
      <div class="search">
        <!--<el-button type="primary" icon="el-icon-s-data">热门</el-button>-->
        <el-input v-model="search" placeholder="请输入内容" class="search-input">
          <el-button type="submit" slot="append" icon="el-icon-search" class="search-submit"></el-button>
        </el-input>
      </div>
    </div>
    <div class="top-content" style="height: 3rem"></div>
    <div class="content">
      <div>
        <el-carousel height="250px">
          <el-carousel-item v-for="(item,index) in items" :key="index">
           <img v-bind:src= "item.img" alt="">
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="content_mid_one">
        <ul v-for="item in user">
          <li>{{item.username}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .mainPage{
    width: 1518.4px;
    font-family: 宋体;
  }
  .top{
    height: 200px;
    background-image: url("../components/image/18.jpg");
  }
  /deep/.el-menu{
    opacity:0.7;

    box-shadow: 0 1px 2px rgba(0,0,0,.1);
  }
  a{
    margin-left: 0.4rem;
    color: black;
    text-decoration : none;
  }
  /deep/.el-icon-arrow-down:before{
    display: none;
  }
  /deep/.el-menu--popup {
    min-width: 5rem;
  }
  /deep/.el-input{
    width: 18rem;
    float: right;
    margin-top: 4rem;
    margin-right: 11rem;
    border-right: none;
  }
  /deep/.el-input-group--append .el-input__inner, .el-input-group__prepend{
    border: none;
  }
  /deep/.el-button{
    margin-top: 4rem;
    margin-left: 60rem;
    color: hotpink;
    background-color: whitesmoke;
  }
  /deep/.el-menu--horizontal>.el-submenu.is-active .el-submenu__title{
    border-bottom-color: white;
  }
  /deep/.el-button--primary:focus, .el-button--primary:hover{
    background-color: white;
    color:pink;
  }
  /*/deep/ .test ul{*/
    /*min-width: 100px;*/
  /*}*/
  /deep/.el-input-group__append{
    background-color: white;
    border-color: white;
  }
  /deep/.el-carousel{
    width: 25rem;
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
</style>
<script>
  import $ from 'jquery'
  import Cookies from 'js-cookie'
  export default {
    name: "mainPage",
    data(){
      return{
        unLogin: true,
        hasLogin: false,
        logo: require('../components/image/risu.jpg'),
        defaultImg: 'this.src="' + require('../components/image/ddbird.jpg') + '"',
        img:{url:''},
        search:'',
        items:[
          {img:require('../components/image/meaqua3.jpg')},
          {img:require('../components/image/meaqua4.jpg')},
          {img:require('../components/image/meaqua2.jpg')},
          {img:require('../components/image/P_P.jpg')},
        ],
        user:[],
      }
    },
    mounted: function() {
      let _self=this;
      if(null!=Cookies.get('username')){
        $.ajax({
          headers:{'Authorization':localStorage.getItem('Authorization')},
          url:"/api/loadUserByUsername?username="+Cookies.get('username'),
          type:"get",
          dataType: "JSON",
          withCredentials: true,
          success:function(result){
            // debugger
            _self.unLogin = false;
            _self.hasLogin = true;
            _self.user = result.data;
            console.log(result.data);
          },
          error:function(jqXHR, textStatus, errorThrown){
            console.log("请求失败");
            /*弹出jqXHR对象的信息*/
            console.log(jqXHR.responseText);
            console.log(jqXHR.status);
            console.log(jqXHR.readyState);
            console.log(jqXHR.statusText);
            /*弹出其他两个参数的信息*/
            console.log(textStatus);
            console.log(errorThrown);
          }
        })
      }

    },
    methods:{
        logout(){
          Cookies.remove('username')
        }
    },
    watch:{

    },
    computed:{
    }
  }
</script>
