<template>
  <div class="main">
    <el-upload
      class="avatar-uploader"
      :action="actionPath"
      :data="QiniuData"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-button type="primary"  @click="upLoad" >更新</el-button>
    <!--当前头像-->
    <!--<img :src="src" alt="">-->

  </div>
</template>
<style scoped>
  .main{
    text-align: center;
    margin-top: -160px;
    width: 1000px;
    word-wrap: break-word;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
<script>
  import Cookies from 'js-cookie'
  import QS from 'qs'
  export default {
    data() {
      return {
        actionPath: 'https://upload.qiniup.com',//七牛云上传地址
        qiniuAddr: 'www.chigusahana.com',//外链域名
        QiniuData:{
          key: '',
          token: '',
        },
        imageUrl: '',//blob
        imageName: '',//图片名称
        src : require('../image/risu.jpg'),
        avatar: '',
        userId: '',
        userInfo: '',
      }
    },
    mounted: function() {
      this.getQiniuToken();
      let _self = this;
      function runAsync(){
        let p = new Promise(function(resolve, reject){
          //做一些异步操作
          setTimeout(function(){
            // console.log('执行完成');
            resolve(_self.$store.state.User[0].id);
          }, 1000);
        });
        return p;
      }
      runAsync().then(function(data){
        _self.$axios.get('/api/selectUserInfoById?id='+data,{headers :{'Authorization':Cookies.get('token')}})
          .then(res => {
            _self.avatar = res.data.data.content.avatar
            _self.userInfo = res.data.data.content
            _self.userId = data
            _self.imageName = res.data.data.content.avatar
            console.log(res.data.data.content)
          })
          .catch(err =>{
            _self.$message.error("获取信息失败")
          })
      });

      },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = 'http://'+this.qiniuAddr+'/'+res.key
        this.QiniuData.key = file.raw.name//获取图片名称
        this.imageName = res.key
        // console.log(res)
        // console.log(file)
        // console.log(this.imageUrl)
      },
      beforeAvatarUpload(file) {
        let isJPG = false;
        switch (file.type) {
          case "image/png":
            isJPG = true;
            break;
          case "image/jpeg":
            isJPG = true;
            break;
          case "image/jpg":
            isJPG = true;
            break;
          default:
            isJPG = false;
            break;
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG,JPEG,PNG 格式!');
          return false;
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
          return false;
        }
        // console.log(file)
        this.QiniuData.key = file.name;
        // return isJPG && isLt2M ;
      },
      upLoad() {
        this.$axios.post("/api/uploadAvatar/"+this.userId,this.imageName,{headers : {'Content-Type':'application/json'}})
          .then(response => {
            this.$message.success("更新成功！")
            this.$router.push('/userInfo')
            // console.log(this.imageName)
            let { code, data } = response.data;
            if (code == "0") {
              this.$message({
                message: "提交成功！",
                type: "success",
                center: true
              });
            }
          })
          .catch(error => {
            this.$message({
              message: error.msg,
              type: "error",
              center: true
            });
          });
      },
      //请求后台拿七牛云token
      getQiniuToken(){
        this.$axios.post("/api/getQiniuToken")
          .then(response => {
            // console.log(response)
            this.QiniuData.token = response.data.data;
          })
          .catch(error => {});
      }

    }
  }
</script>
