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
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = 'http://'+this.qiniuAddr+'/'+res.key
        this.QiniuData.key = file.raw.name//获取图片名称
        this.imageName = res.key
        console.log(res)
        console.log(file)
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
        console.log(file)
        this.QiniuData.key = file.name;
        // return isJPG && isLt2M ;
      },
      upLoad() {
        this.$axios.post("/api/uploadAvatar/"+this.userId,this.imageName,{headers : {'Content-Type':'application/json'}})

          .then(response => {
            console.log(this.imageName)
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
        this.$axios.get("/api/getQiniuToken")
          .then(response => {
            console.log(response.data.data)
            this.QiniuData.token = response.data.data;
          })
          .catch(error => {});
      }

    }
  }
</script>
