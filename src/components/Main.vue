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
        <ul v-for="item in user">
          <li>{{item.username}}</li>
        </ul>
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
</style>
<script>
  import TopNav from './divComponents/TopNav'
  import Cookies from 'js-cookie'
  export default {
    name: "mainPage",
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
    mounted: function() {
      let _self = this;
      if (null != Cookies.get('username')) {
        $.ajax({
          headers: {'Authorization': localStorage.getItem('Authorization')},
          url: "/api/loadUserByUsername?username=" + Cookies.get('username'),
          type: "get",
          dataType: "JSON",
          withCredentials: true,
          success: function (result) {
            _self.user = result.data;
          },
          error: function (jqXHR, textStatus, errorThrown) {
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
      } else if(window.location.href==='http://127.0.0.1:8081/main'){

        }
        else {
          this.$router.push('/login');
          alert("请先登录！");
      }
    },
    watch:{

    },
    computed:{
    }
  }
</script>
