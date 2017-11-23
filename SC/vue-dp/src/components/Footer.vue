<!--
* @author wining
* @date 2017-11-20
* @module 模板
* @explain 模板文件，便于开发
-->
<template>
  <div class="footer">
    <div class="foot-left">
      <ul>
        <li><p>病危<span class="danger"></span></p></li>
        <li><p>病重<span class="seriously"></span></p></li>
        <li><p>特级护理<span class="critical"></span></p></li>
      </ul>
    </div>

    <div class="foot-right">
   <img src="../assets/img/wlogo.svg">
    </div>
  </div>
</template>
<!--JavaScript-->
<script>
  export default {
    //数据
    data() {
      return {}
    },
    //创建实例调用
    created() {
    },
    //方法
    methods: {},
    //计算属性
    computed: {},
    //过滤器
    filters: {},
    //组件注册
    components: {}
  }
</script>
<!--CSS-PAGE-->
<style lang="less" scoped>

  /*1366*/
  @media screen and (max-width: 1366px) {
  }

  /*1024*/
  @media screen and (max-width: 1024px) {
  }

  .footer {
    width: 100%;
    height: 30px;
    background-color: #085DFF;
    position: absolute;
    bottom: 0;

  }

  .foot-left ul li {
    float: left;
    font-size: 12px;
    color: #ffffff;
    line-height: 30px;
    margin-left: 15px;
  }

  .danger {
    width: 15px;
    height: 10px;
    border-radius: 3px;
    background-color: #DA3333;
    display: inline-block;
    margin-left: 5px;

  }

  .seriously {
    width: 15px;
    height: 10px;
    border-radius: 3px;
    background-color: #FF7F00;
    display: inline-block;
    margin-left: 5px;
  }

  .critical {
    width: 15px;
    height: 10px;
    border-radius: 3px;
    background-color: #00A25D;
    display: inline-block;
    margin-left: 5px;
  }
  .foot-right img{
    float: right;
    height: 26px;
    margin-right: 15px;
    margin-top: 2px;
  }
</style>
