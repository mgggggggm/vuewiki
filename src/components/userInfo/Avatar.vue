<template>
  <div class="main">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item><a href="/userInfo/avatar">我的头像</a></el-breadcrumb-item>
      <el-breadcrumb-item v-show="unShow">修改头像</el-breadcrumb-item>
    </el-breadcrumb>

    <img :src="src" alt="" v-show="show">
    <el-button @click="change" style="margin-top: 20px" v-show="show">修改头像</el-button>
    <router-view name="changeAvatar"/>

  </div>
</template>
<style scoped>
  .main{
    width: 1000px;
    word-wrap: break-word;
  }
  /deep/.el-breadcrumb{
    height: 15px;
  }
</style>
<script>
  import Cookies from 'js-cookie'
  export default {
    data() {
      return {
        unShow: false,
        show: true,
        src : 'https://mgggggggm-1257270534.cos.ap-shanghai.myqcloud.com/05.jpg',
        avatar: '',
        userId: '',
        userInfo: '',
      }
    },
    mounted: function() {
      let _self = this;
      if (null != Cookies.get('username')) {
        //获取user信息
        $.ajax({
          headers: {'Authorization': localStorage.getItem('Authorization')},
          url: "/api/loadUserByUsername?username=" + Cookies.get('username'),
          type: "get",
          dataType: "JSON",
          withCredentials: true,
          success: function (result) {
            _self.userId = result.data.content.id;
            Cookies.set('userId', _self.userId)
            // console.log(result.data.content.id)
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
        //获取userInfo信息
        $.ajax({
          headers: {'Authorization': localStorage.getItem('Authorization')},
          url: "/api/selectUserInfoById?id=" + Cookies.get('userId'),
          type: "get",
          dataType: "JSON",
          withCredentials: true,
          success: function (result) {
            _self.userInfo = result.data;
            _self.avatar = result.data.content.avatar;
            // console.log(result.data)
            // console.log(result.data.content.avatar)
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

      }
      },
    methods:{
      change(){
        this.unShow = true;
        this.show = false;
        this.$router.push('/userInfo/avatar/changeAvatar')
      },
    }
  }
</script>
