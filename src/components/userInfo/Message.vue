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
          <el-radio v-model="form.sex" label="男">男</el-radio>
          <el-radio v-model="form.sex" label="女">女</el-radio>
          <el-radio v-model="form.sex" label="保密">保密</el-radio>
        </el-form-item>
        <el-form-item label="出生日期:">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.birthday" style="width: 22%"></el-date-picker>
        </el-form-item>
        <el-form-item label="签名:">
          <el-input  type="textarea" v-model="form.synopsis" style="width: 50%;height: 88px"></el-input>
        </el-form-item>
      </el-form>
      <el-button @click="sub" style="margin-left: 5.5em">提交</el-button>
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
                id: '',
                nickname: '',
                avatar:'',
                sex: '',
                birthday: '',
                synopsis: '',
              },
              unShow: false,
              username:'',
              userId: '',
              userInfo:[],
            }
        },
      mounted: function() {
        let _self = this;
        function runAsync(){
          let p = new Promise(function(resolve, reject){
            //做一些异步操作
            setTimeout(function(){
              // console.log('执行完成');
              resolve(_self.$store.state.User);
            }, 100);
          });
          return p;
        }
        runAsync().then(function(data){
          _self.$axios.get('/api/selectUserInfoById?id='+data[0].id,{headers :{'Authorization':Cookies.get('token')}})
            .then(res => {
              // _self.avatar = res.data.data.content.avatar
              _self.userInfo = res.data.data.content
              _self.form.id = data[0].id
              _self.form.nickname = res.data.data.content.nickname
              // _self.form.avatar = res.data.data.content.avatar
              _self.form.sex = res.data.data.content.sex
              _self.form.birthday = res.data.data.content.birthday
              _self.form.synopsis = res.data.data.content.synopsis
              _self.username = data[0].username
              _self.userId =  data[0].id
              console.log(res.data.data.content.synopsis)
              // console.log(res.data.data.content)
            })
            .catch(err =>{
              _self.$message.error("获取信息失败")
            })
        });
      },
      methods:{
        ...mapMutations(['getUser']),
          sub(){
              this.$axios.post('/api/updateUserInfo?id='+this.userId,this.form,{headers :{'Authorization':Cookies.get('token')}})
                .then(res=> {
                    this.$message.success("修改成功！")
                  }).catch(err=>{
                    this.$message.error("修改失败！")
              })
          }
      }
    }
</script>
