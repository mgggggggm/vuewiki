<template>
  <div class="main">
    <div class="register">
      <el-header>
        注册
      </el-header>
      <el-form :model="registerForm" :rules="rules" ref="registerForm">
        <el-form-item prop="username">
          <el-input v-model="registerForm.username"  placeholder="用户名" type="text"/>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="registerForm.password" placeholder="密码" type="password"/>
        </el-form-item>
        <el-form-item prop="checkPassword">
          <el-input v-model="registerForm.checkPassword" placeholder="确认密码" type="password"/>
        </el-form-item>
        <el-form-item prop="mobile">
          <el-input v-model="registerForm.mobile" placeholder="手机号码" type="text"/>
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="registerForm.email" placeholder="邮箱" type="text"/>
        </el-form-item>
        <el-button @click="register" :loading="isLoading">注册</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form>
      <p>已有账号?<a href="/login">立即登录</a></p>
    </div>
  </div>
</template>
<style scoped>
  .main{
    margin: 0;
    background:url("../components/image/neeeee  wwwwwww.gif")no-repeat;
    background-size:100% 100%;
  }
  .register{
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
  /deep/.el-input__inner::-webkit-input-placeholder {
    color: white;
  }
  /deep/.el-input__inner{
    width: 15rem;
    background-color:#FFC0CB;
    border:1px solid #FFC0CB;
  }
  /deep/.el-form-item__error{
    margin-left: 40.5rem;
    color:#FFC0CB;
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
  p{
    margin-left: 8rem;
    font-size: 12px;
  }
  p a {
    color: cyan;
  }
</style>
<script>
    import QS from 'qs'
    export default {
        data() {
          var validatePassword = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入密码'))
            } else if (value !== this.registerForm.password) {
              callback(new Error('两次输入密码不一致!'))
            } else {
              callback()
            }
          }
            return {
              isLoading: false,
              registerForm:{
                  username:'',
                  password:'',
                  checkPassword: '',
                  mobile: '',
                  email: ''
          },
              rules:{
                username: [
                  {required: true, message: '请输入用户名', trigger: 'blur'},
                  {min: 2, max: 12, message: '长度在 2 到 12 个字符'},
                  {pattern: /^[0-9A-Za-z]+$/, message: '只能输入数字和英文'}
                ],
                password: [
                  {required: true, message: '请输入密码', trigger: 'blur'},
                  {pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/, message: '密码必须由6-16个英文字母和数字的字符串组成！'}
                ],
                checkPassword: [
                  { required: true, validator: validatePassword, trigger: 'blur' }
                ],
                mobile: [
                  {required: true, message: '请输入注册手机号', trigger: 'blur'},
                  {pattern: /^[1][3,4,5,7,8][0-9]{9}$/, message: '请输入正确的手机号'},
                ],
                email: [
                  {required: true, message: '请输入邮箱', trigger: 'blur'},
                  {pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message:'请输入正确的邮箱格式'}
                ]
              }
            }
        },
      methods: {
          register() {
              var _self = this;
              _self.$refs['registerForm'].validate((valid) => {
              if(valid) {
                _self.isLoading = true
                this.$axios.post('/api/register',_self.registerForm)
                  .then(res => {
                    _self.$message.success('注册成功，跳转至登录页面')
                    _self.$router.push('/login')
                    _self.isLoading = false
                  }).catch(res => {
                    _self.isLoading = false
                })
              }else {
                _self.$message.error('请按照规则填写')
              }
            })
          },
          reset(){
              this.$refs['registerForm'].resetFields()
          },
        }
  }
</script>
