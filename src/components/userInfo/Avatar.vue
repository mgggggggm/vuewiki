<template>
  <div class="main">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item><a href="/userInfo/avatar" style="font-weight: normal">我的头像</a></el-breadcrumb-item>
      <el-breadcrumb-item :class="{'avatarDisplay':display}">修改头像</el-breadcrumb-item>
    </el-breadcrumb>
    <img :src="avatar" alt=""  style="width: 100px;height: 100px;border-radius:100px;margin-top: 6em;margin-left: 8em;">
    <br><br>
    <el-button @click="change" style="margin-top: 20px;margin-left: 120px" :class="{'avatarDisplay':unDisplay}">修改头像</el-button>
    <router-view name="changeAvatar"/>

  </div>
</template>
<style scoped>
  /deep/.el-tabs--border-card>.el-tabs__content{
    width: 900px;
    border-right: 1px solid black;
    height: 25em;
  }
  .main{
    width: 1000px;
    word-wrap: break-word;
  }
  .avatarDisplay{

    display: none;
  }
  /deep/.el-breadcrumb{
    height: 15px;
  }
</style>
<script>
  import Cookies from 'js-cookie'
  import { mapMutations } from 'vuex'
  export default {
    data() {
      return {
        display: true,
        unDisplay: false,
        avatar: '',
        userInfo: '',
      }
    },
    mounted: function() {
      let _self = this;
      function runAsync(){
        let p = new Promise(function(resolve, reject){
          //做一些异步操作
          setTimeout(function(){
            // console.log('执行完成');
            resolve(_self.$store.state.User[0].id);
          }, 100);
        });
        return p;
      }
      runAsync().then(function(data){
        _self.$axios.get('/api/selectUserInfoById?id='+data,{headers :{'Authorization':Cookies.get('token')}})
          .then(res => {
            _self.avatar = res.data.data.content.avatar
            _self.userInfo = res.data.data.content
            // console.log(res.data.data.content)
          })
          .catch(err =>{
            _self.$message.error("获取信息失败")
          })
      });

      },
    methods:{
      change(){
        this.display = false
        this.unDisplay = true
        this.$router.push('/userInfo/avatar/changeAvatar')
      },
    }
  }
</script>
