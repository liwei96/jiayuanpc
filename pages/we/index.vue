<template>
  <div class="homeright">
    <div class="homeright1">关于我们</div>
    <div class="homeright1-left">
      <!-- <img src="../../assets/index.jpg" alt=""> -->
      <div class="left_about">
          <span>公司位于:浙江省杭州市西湖区三墩镇丰盛九玺尚坤云谷中心</span>
          <p>联系电话:{{this.com_tel}}</p>
      </div>
    </div>
    <div class="homeright1-right">
      <span>{{logo_text}}新房</span>
      <p>隶属杭州亚汉网络科技有限公司，我们是一家线上销售模式的房地产公司。</p>
      <p>公司主营业务为：房地产信息咨询，房地产营销策划，室内外装修工程设计，施工以及物业管理，以及企业的营销策划，国内广告制作设计，代理会展服务。</p>
      <p>公司位于：杭州市江干区九环路。专注为客户朋友提供一手楼盘新资讯</p>
    </div>
  </div>
</template>
<script>
export default {
    data(){
         return{
            com_tel:'',
            logo_text:"家园"
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
    mounted(){
         var tel=sessionStorage.getItem('telphone_com');
         this.com_tel=tel;

    }
}
</script>

<style lang="less" scoped>
.homeright{
   
.homeright1 {
  width: 880px;
  height: 50px;
  border-bottom: 2px solid rgba(237,235,235,1);
  text-align: center;
  line-height: 50px;
  font-size: 20px;
  font-weight: bold;
  color: rgba(55, 58, 67, 1);
  
}
.homeright1-left{
    width:440px;
    height: 496px;
    float: left;
    margin-top:30px;
    img{
      width:440px;
      height: 250px; 
      margin-bottom:50px;
    }
    .left_about{
        font-size:16px;
        font-family:"Microsoft YaHei";
        font-weight:400;
        color:rgba(67,70,74,1);
        line-height:36px;
        p{
        font-size:16px;
        font-family:"Microsoft YaHei";
        font-weight:400;
        color:rgba(67,70,74,1);
        line-height:36px;
        }
    }
}
.homeright1-right{
    width: 400px;
    height: 240px;
    float: right;
    margin-top:30px;
    span{
       color: #40a2f4;
       font-size: 24px;
    }
    p{
        color: #43464a;
        font-size: 14px;
        margin-top: 20px;
    }
}




}
</style>