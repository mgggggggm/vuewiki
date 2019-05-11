<template>
    <div class="main">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 60px">
        <el-breadcrumb-item style="margin-top: -60px">个人信息</el-breadcrumb-item>
        <el-breadcrumb-item v-show="unShow">修改信息</el-breadcrumb-item>
      </el-breadcrumb>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="昵称:">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="用户名:">
          <el-input  :disabled="true" v-model="username">{{username}}</el-input>
        </el-form-item>
        <el-form-item label="性别:">
          <el-radio v-model="form.radio" label="1">男</el-radio>
          <el-radio v-model="form.radio" label="2">女</el-radio>
          <el-radio v-model="form.radio" label="3">保密</el-radio>
        </el-form-item>
        <el-form-item label="出生日期:">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 22%"></el-date-picker>
        </el-form-item>
        <el-form-item label="签名:">
          <el-input  type="textarea" v-model="form.sign" style="width: 50%;height: 88px"></el-input>
        </el-form-item>
      </el-form>
      <el-button @click="sub">提交</el-button>
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
  /deep/.el-input{
    width: 200px;
  }
  /deep/.el-textarea__inner{
    height: 75px;
  }
</style>
<script>
  import { mapMutations } from 'vuex'
  import Cookies from 'js-cookie'
    export default {
        data() {
            return {
              form:{
                nickname: '',
                radio: '1',
                date: '',
                sign: '',
              },
              unShow: false,
              user:[],
              username:'',
              userInfo:[],
            }
        },
      mounted: function() {
        let _self = this;
        if(null!=Cookies.get('username')){
          $.ajax({
            headers:{'Authorization':Cookies.get('token')},
            url:"/api/loadUserByUsername?username="+Cookies.get('username'),
            type:"get",
            dataType: "JSON",
            withCredentials: true,
            success:function(result){
              console.log(result.data.content.username)
              // debugger
              _self.username = result.data.content.username;
              // _self.getUser(_self.user)
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
        ...mapMutations(['getUser']),
          sub(){
              this.$axios.get('/api/updateUserInfo',this.form)
                .then(res=> {

                  }).catch(err=>{

              })
          }
      }
    }
</script>
