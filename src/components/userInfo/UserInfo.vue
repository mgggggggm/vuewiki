<template>

   <div>
      <v-nav></v-nav>
      <div class="content">
        <el-tabs type="border-card"  :tab-position="tabPosition" @tab-click="tabs">
          <el-tab-pane label="用户信息">
            <router-view name="message"/>
          </el-tab-pane>
          <el-tab-pane label="我的头像">
            <router-view name="avatar"/>
          </el-tab-pane>
          <el-tab-pane label="安全中心">
            <router-view name="safe"/>
          </el-tab-pane>
          <el-tab-pane label="个人空间">
            <router-view name="space"/>
          </el-tab-pane>
          <el-tab-pane label="我的积分">
          </el-tab-pane>

        </el-tabs>

      </div>
  </div>
</template>
<style scoped>
  /deep/.el-tabs--left.el-tabs--border-card .el-tabs__header.is-left{
    margin-left: 11rem;
    height: 25rem;

  }
  /deep/.el-tabs--border-card>.el-tabs__header .el-tabs__item:not(.is-disabled):hover{
    color: white;
    background-color: lightgray;
  }
  /deep/.el-tabs--left.el-tabs--border-card .el-tabs__item.is-left.is-active{
    background-color: #409EFF;
    color: white;
  }
  /deep/.el-tabs--left .el-tabs__item.is-left{
    text-align: center;
  }
  /deep/.el-tabs__item{
    padding: 0 40px;
    height: 60px;
    line-height: 60px;
  }
</style>
<script>
  import $ from 'jquery'
  import TopNav from '../divComponents/TopNav'
    export default {
      components:{
        'v-nav':TopNav
      },
      name: "UserInfo",
      data() {
        return {
          tabPosition: 'left',
        }
      },
      methods:{
        tabs(data){
          console.log(data.label)
          if(data.label === '用户信息'){
            this.$router.push('/userInfo/message')
          }
          if(data.label === '我的头像'){
            this.$router.push('/userInfo/avatar')
          }
          if(data.label === '安全中心'){
            this.$router.push('/userInfo/safe')
          }
          if(data.label === '个人空间'){
            this.$router.push('/userInfo/space')
          }
        }
      }
    }
</script>
