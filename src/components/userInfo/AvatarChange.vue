<template>
  <div class="main">
    <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <img :src="src" alt="">
    <el-button>更新</el-button>
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
  export default {
    data() {
      return {
        imageUrl: '',
        src : require('../image/risu.jpg'),
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
            console.log(result.data)
            console.log(result.data.content.avatar)
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
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
  }
</script>
