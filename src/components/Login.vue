<template>
  <div class="main">
      <div class="login">
        <el-header>
          登录
        </el-header>
        <el-form :model="loginForm" :rules="rules" ref="loginForm">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" v-on:input="activePower1" placeholder="用户名" type="text"/>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" placeholder="密码" type="password"/>
          </el-form-item>
          <el-button @click="login" :loading="isLoading">登录</el-button>
          <el-button @click="register">注册</el-button>
        </el-form>
      </div>
  </div>
</template>
<style scoped>
  .main{
    margin: 0;
    background:url("../components/image/neeeee  wwwwwww.gif")no-repeat;
    background-size:100% 100%;
  }
  .login{
    width: 100%;
    text-align: center;
    height: 45rem;
  }
  /deep/.el-header{
    color:#FFC0CB;
    text-align: center;
    font-size: 24px;
    padding-top: 20px;
  }
  /deep/.el-form-item{
    margin-top: 2rem;
  }
  /deep/.el-form-item__error{
    margin-left: 40.5rem;
    color:#FFC0CB;
  }
  /deep/.el-input__inner::-webkit-input-placeholder {
    color: white;
  }
  /deep/.el-input__inner{
    /*background-image: url('../components/image/作者.png');*/
    /*background-repeat: no-repeat; !*设置图片不重复*!*/
    /*background-position: 0px 4px;!*图片显示的位置*!*/
    /*background-size: 10% 70%;*/
    /*padding-left: 25px;*/
    width: 15rem;
    background-color:#FFC0CB;
    border:1px solid #FFC0CB;
  }
  /deep/.el-input__inner:focus, /deep/.el-input__inner:hover{
    color: white;
    border:1px solid #FFC0CB;
  }

  /deep/.el-button{
    background:#FFC0CB;
    border:1px solid #FFC0CB;
    width: 7.3rem;
    color: white;
  }
  /deep/.el-button:focus, /deep/.el-button:hover{
    color: #FFC0CB;
    background: white;
    border:1px solid #FFC0CB;
  }

</style>
<script>
    import { mapMutations } from 'vuex'
    import { activePower } from "./js/active_power"
    import QS from 'qs'
    import Cookies from 'js-cookie'
    export default {
        name:'login',
        data() {
            return {
              isLoading: false,
              loginForm:{
                username: '',
                password: '',
              },
              rules: {
                username: [
                  {required: true, message: '请输入用户名'},
                ],
                password: [
                  {required: true, message: '请输入密码'},
                ],
              },
              userToken: '',
              userMsg: ''
            }
        },
      methods: {
        activePower1() {
          $(document).ready(function() {
              addEventListener('input', activePower.POWERMODE)
              // POWERMODE.colorful = true,
              // POWERMODE.shake = false,
              // document.body.addEventListener('input',POWERMODE)
          })
        },
        ...mapMutations(['changeLogin']),
        ...mapMutations(['getUser']),
        login() {
            let _self = this;
            _self.$refs['loginForm'].validate((valid) => {
            if (valid) {
              _self.isLoading = true
              this.$axios.post('/api/login', QS.stringify(_self.loginForm))
                .then(res => {
                    _self.userToken = 'Bearer ' + res.data.data.token
                    _self.userMsg =  res.data.data.user
                    Cookies.set('token', _self.userToken,7*24*60*60*1000)
                    Cookies.set('username',_self.loginForm.username,7*24*60*60*1000)
                    // console.log(Cookies.get('token'))
                    // console.log(res.data.data.user)
                    this.getUser(_self.userMsg)
                    this.changeLogin(_self.userToken)
                    if(res.data.errcode === 0){
                          _self.$router.push('/main')
                    }else{
                      _self.$message.error('用户名或密码输入错误');
                    }
                    // alert(res.data.msg);
                    _self.isLoading = false
                }).catch(res => {
                _self.isLoading = false
              })
            }else {
              _self.$message.error('用户名或密码不为空');
              }
          })
        },
        register() {
          this.$router.push('/register')
        }
      }
    }
</script>
