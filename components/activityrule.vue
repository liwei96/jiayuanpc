<template>
<div class="rules_fan_box" v-show="rules_show">
    <div class="rules_fan">
        <div class="title">
              <h4>活动规则</h4>
              <i class="iconfont iconchahao" id="fan_close" @click="hideRules"></i>
        </div>
        <div class="text">
            <h5>
            平台优惠发放时间：待开发商或总代理公司补贴发放到位后尽快发放。
          </h5>
            <h5>
            核算方式：由开发商或代理公司判定为易得房平台客户即可享受这个优惠。
          </h5>
            <h5>
            结算方式：提供已实名的支付宝账户给与您对接的易得房咨询师，规定时间内会将优惠费用打至该账户。
          </h5>
            <h5>详细活动方案请致易得房电客服电话：<span>：4007186686 </span></h5>
            <h5>注：活动最终解释权归{{logo_text}}所有</h5>
        </div>
    </div>
</div>
</template>
<script>
export default {
   data() {
      return {
           rules_show:false,
           logo_text:"家园",
      }
   },
    beforeMount(){
       let  mine = this.$store.state.style_mine;
        if(mine==1){ //易得房样式
            this.logo_text = "易得房";
        }else if(mine==2){ //家园样式
           this.logo_text = "家园";
        }
  },
   created(){
   },
   computed:{
   },
   methods:{
        hideRules(){
            this.rules_show =  false;
        },
        showRules(){
             this.rules_show =  true;
        }
   },
}
</script>
<style lang="less" scoped>
.rules_fan_box{
    width: 100%;
    height: 100%;
    background:rgba(0, 0, 0, 0.4) ;
    position: fixed;
    top: 0;
    left: 0;
    z-index:2000;
    display: block;
    .rules_fan{
        width: 420px;
        height: 340px;
        background: #FFFFFF;
        border-radius: 8px;
        position: absolute;
        transform: translate(-50%,-50%);
        top: 50%;
        left: 50%;
        padding-left: 30px;
        padding-right: 30px;
        .title{
            height: 70px;
            h4{
                font-size: 18px;
                font-family: "Microsoft YaHei";
                font-weight: bold;
                color: #18191A;
                line-height: 70px;
            }
            i{
              color: #746E6E;
              font-size:18px ;
              position: absolute;
              top: 20px;
              right: 20px;
            }
        }
        .text{
            h5{
                font-size: 14px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: #313233;
                line-height: 20px;
                margin-bottom: 20px;
                span{
                    font-weight: bold;
                }
            }
        }


    }
}

</style>
