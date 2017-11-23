<!--
* @author wining
* @date 2017-11-20
* @module 模板
* @explain 模板文件，便于开发
-->
<template>
  <div class="v-header">
    <header>
      <p>耳鼻喉头颈外科护理工作日志</p>
      <time>
        <p class="headtime">{{currentTime}}</p>
      </time>
    </header>
    <div class="headContain">
      <div class="headContain-left">
        <div class="leftNum">
          <div class="leftNum-top">51</div>
          <div class="leftNum-bot">病人总数</div>
        </div>

        <div class="rightNum">
          <img src="../assets/img/1icon.svg">
          <div class="rightNum-top">23</div>
          <div class="rightNum-bot">特级护理</div>

        </div>
      </div>
      <div class="headContain-center">
        <ul>
          <li>
            <span>121</span>
            <span>新入</span>
          </li>
          <li>
            <span>121</span>
            <span>新入</span>
          </li>
        </ul>
        <ul>
          <li>
            <span>121</span>
            <span>新入</span>
          </li>
          <li>
            <span>121</span>
            <span>新入</span>
          </li>
        </ul>
        <ul>
          <li>
            <span>121</span>
            <span>新入</span>
          </li>
          <li>
            <span>121</span>
            <span>新入</span>
          </li>
        </ul>
        <ul>
          <li>
            <span>121</span>
            <span>新入</span>
          </li>
          <li>
            <span>121</span>
            <span>新入</span>
          </li>
        </ul>
        <ul>
          <li>
            <span>121</span>
            <span>新入</span>
          </li>
          <li>
            <span>121</span>
            <span>新入</span>
          </li>
        </ul>
        <ul>
          <li>
            <span>121</span>
            <span>新入</span>
          </li>
          <li>
            <span>121</span>
            <span>新入</span>
          </li>
        </ul>
      </div>
      <div class="headContain-right">
        <div class="leftNum">
          <img src="../assets/img/2icon.svg">
          <div class="leftNum-top">23</div>
          <div class="leftNum-bot">特别关注</div>
        </div>
        <div class="rightNum">
          <ul>
            <li>
              <span>12</span>
              <span>新入</span>
            </li>
            <li>
              <span>10</span>
              <span>新入</span>
            </li>
          </ul> <ul>
          <li>
            <span>10</span>
            <span>新入</span>
          </li>
          <li>
            <span>10</span>
            <span>新入</span>
          </li>
        </ul>

        </div>
        <div class="line"></div>
      </div>
    </div>
  </div>

</template>
<script>
  import moment from 'moment'

  export default {
    //数据
    data() {
      return {
        currentTime: null
      }
    },
    beforeCreate() {
    },
    //创建实例调用
    created() {
      this.setCurrentTime();
      setInterval(this.setCurrentTime, 1000);
    },
    //方法
    methods: {
      setCurrentTime() {
        this.currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
      }
    },
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
.line{
  height:110px;
  width:2px;
  color: #cccccc;
}
  header {
    width: 100%;
    height: 50px;
    background-color: #085DFF;

  }

  header p {
    font-size: 22px;
    color: #fff;
    line-height: 50px;
    text-align: center;
  }

  .headtime {
    position: absolute;
    right: 60px;
    line-height: 50px;
    top: 0;
  }

  .headContain {
    width: 1920px;
    height: 140px;
    margin-top: 6px;

  }

  .headContain-left {
    position: relative;
    float: left;
    width: 383px;
    height: 138px;
    /*background: pink;*/
    margin-left: 10px;
    border:1px solid #dadde047;
    box-shadow: 0 0 10px #99999996;
  }

  .headContain-left .leftNum {
    width: 50%;
    height: 100%;
    background: #FFFFFF;
    position: relative;
    float: left;
    background: url("../assets/img/line.png") no-repeat right;
  }

  .headContain-left .rightNum {
    width: 50%;
    height: 100%;
    background: #FFFFFF;
    position: relative;
    float: right;
  }

  .headContain-left .leftNum-top {
    font-family:"Futura Md BT";
    font-size: 55px;
    color: #1463ef;
    position: absolute;
    top: 15px;
    left: 57px;
  }


  .headContain-left .leftNum-bot {
    position: absolute;
    top: 92px;
    left: 58px;
    font-size: 14px;
    color: #333333;
  }

  .headContain-left .rightNum img {
    position: absolute;
    top: 40px;
    right: 124.3px;
    width: 35px;

  }

  .headContain-left .rightNum-top {
    font-family: "Futura Md BT";
    font-size: 48px;
    color: #1463ef;
    position: absolute;
    top: 15px;
    right: 60px;
  }

  .headContain-left .rightNum-bot {
    position: absolute;
    top: 92px;
    right: 60px;
    font-size: 14px;
    color: #666666;
  }

  .headContain-center {
    float: left;
    position: relative;
    width: 863px;
    height: 108px;
    background: #FFFFFF;
    margin-left: 10px;
    border:1px solid #dadde047;
    box-shadow:0 0 10px #99999996;
  }


  .headContain-center{
    padding:10px 40px 20px;
  }

  .headContain-right .rightNum ul {
    float: left;
    width: 100%;
    height: 100%;
    span{
      display: block;
    }

  }

  .headContain-center ul {
    float: left;
    width: 16.6%;
    height: 100%;
    span{
      display: block;
    }
    background: url("../assets/img/line.png") no-repeat right;
  }
  .headContain-center ul:nth-child(6){
    background: none;
  }
  .headContain-center ul>li:nth-child(2){
    margin-top: 10px;
  }
  .headContain-center ul>li{
    text-align: center;
    height: 50%;
    span:nth-child(1){
      height: 36px;
      line-height: 36px;
      font-size: 36px;
      color: #333333;
      font-family: "Futura Md BT";
    }
  span:nth-child(2){
    height: 13px;
    line-height: 13px;
    font-size: 13px;
    color: #666666;
    font-family: "Microsoft YaHei";
    margin-top: 5px;
  }
  }

  .headContain-right {
    float: left;
    position: relative;
    width: 548px;
    height: 138px;
    background: #FFFFFF;
    margin-left: 10px;
    border:1px solid #dadde047;
    box-shadow: 0 0 10px #99999996;
  }

  .headContain-right img{
    width: 35px;
    position: absolute;
    top:40px;
    left:60px;
  }
  .headContain-right .leftNum{
    width:208px;
    height:140px;
     //border-right:1px solid red;
    float: left;
    background: url("../assets/img/line.png") no-repeat right;
  }
  .headContain-right .leftNum .leftNum-top{
    font-size:48px;
    color: #1463ef;
    position: absolute;
    left:100px;
    top: 15px;
  }
  .headContain-right .leftNum .leftNum-bot{
    font-size:14px;
    color: #666666;
    position: absolute;
    left:100px;
    top: 92px;
  }
  .headContain-right .rightNum{
    width:338px;
    height:140px;
    float: left;

    position: relative;

  }
  .headContain-right .rightNum ul:nth-child(1){
     float: left;
     width:25%;
     height:100%;
    margin-left:60px;
    margin-top:10px;

  }
  .headContain-right .rightNum ul:nth-child(2){
    float: left;
    width:25%;
    height:100%;
    margin-top:10px;

  }
  .headContain-right ul>li{
    text-align: center;
    height: 47%;
    span:nth-child(1){
      height: 36px;
      line-height: 36px;
      font-size: 36px;
      color: #333333;
      font-family: "Futura Md BT";

    }
    span:nth-child(2){
      height: 13px;
      line-height: 13px;
      font-size: 13px;
      color: #666666;
      font-family: "Microsoft YaHei";
      margin-top: 5px;
    }
  }
</style>
