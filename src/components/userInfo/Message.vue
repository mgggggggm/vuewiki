<template>
    <div class="main">
      <h3>个人信息</h3>
      <el-input placeholder="昵称"></el-input>
    </div>
</template>
<style scoped>
  .main{
    width: 1000px;
    word-wrap: break-word;
  }
  h3{
    text-align: center;
  }
</style>
<script>
  import Cookies from 'js-cookie'
    export default {
        data() {
            return {
              userInfo:[],
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
        }
      }
    }
</script>
