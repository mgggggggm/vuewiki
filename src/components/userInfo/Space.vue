<template>
  <div class="main">
    {{msg}}
  </div>
</template>
<style scoped>
  .main{
    width: 1000px;
    word-wrap: break-word;
  }
</style>
<script>
  export default {
    data() {
      return {msg: '个人空间'}
    }
  }
</script>
