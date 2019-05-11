<template>

   <div>
      <v-nav></v-nav>
      <div class="content">
        <el-tabs type="border-card" v-model="activeName" :tab-position="tabPosition" @tab-click="tabs">
          <el-tab-pane label="用户信息" name="one">
            <router-view/>
            <router-view name="message"/>
          </el-tab-pane>
          <el-tab-pane label="我的头像" name="two">
            <router-view name="avatar"/>
          </el-tab-pane>
          <el-tab-pane label="安全中心" name="three">
            <router-view name="safe"/>
          </el-tab-pane>
          <el-tab-pane label="个人空间" name="four">
            <router-view name="space"/>
          </el-tab-pane>
          <el-tab-pane label="我的积分" name="five">
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
          activeName: localStorage.getItem('activeName'),
          tabPosition: 'left',
        }
      },
      methods:{
        tabs(data,event){
          if(data.label === '用户信息'){
            this.$router.push('/userInfo/message')
            this.activeName = data.name
            localStorage.setItem('activeName',this.activeName);
            console.log(this.activeName)

          }
          if(data.label === '我的头像'){
            this.$router.push('/userInfo/avatar')
            this.activeName = data.name
            localStorage.setItem('activeName',this.activeName);
            console.log(this.activeName)

          }
          if(data.label === '安全中心'){
            this.$router.push('/userInfo/safe')
            this.activeName = data.name
            localStorage.setItem('activeName',this.activeName);
            console.log(this.activeName)

          }
          if(data.label === '个人空间'){
            this.$router.push('/userInfo/space')
          }
        }
      }
    }
</script>
