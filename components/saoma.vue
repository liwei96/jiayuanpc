<template>
     <div class="saoma" v-show="saoma">
                <h5>微信扫码拨号</h5>
                <img :src="this._props.saoma_lian" alt="">
     </div>
</template>

<script>
export default {
   props:["saoma_lian"],
   data(){
        return{
            saoma:false,   
            saoma_url:"http://ll.edefang.net//index/weichat/code?channel=2"
        }
   }
}
</script>

<style lang="less">
     .saoma{
            position: absolute;
            right: -14px;
            width: 150px;
            height: 180px;
            background-color: rgb(255, 255, 255);
            box-shadow: rgba(6, 0, 1, 0.08) 0px 0px 14px 0px;
            top:38px;
            z-index: 200;
          h5{
              color: rgb(51, 51, 51);
              font-size: 14px;
              text-align: center;
              margin: 10px 0px;
          }
          img{
             margin-left: 10px;
            width: 88%;
          }
        }
</style>