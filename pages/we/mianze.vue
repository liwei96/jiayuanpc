<template>
  <div class="jian_box">
     <div class="suggest">免责协议</div>
      <p>{{logo_text}}对于本网服务包含的或用户经由或从任何与本网服务有关的途径所获得的任何内容、信息或广告，不声明或保证其正确性或可靠性；并且对于用户经本服务上的广告、展示而购买、取得的任何产品、信息或资料，本网不负保证责任。用户自行承担担使用本服务的风险。本网有权但无义务，改善或更正本服务任何部分之任何疏漏、错误。本网不保证以下事项（包括但不限于）：</p>
      <p class="pg_indent">（1）楼盘信息免责声明</p>
      <p>楼盘信息由开发商提供，最终以政府部门登记备案为准，请谨慎核查，如该楼盘信息有误，您可以拨打我们的投诉电话{{this.com_tel}}。</p>
      <p class="pg_indent">（2）新闻内容免责声明</p>
      <p>凡本站注明 “来自：XXX(非{{logo_text}})”的新闻稿件和图片作品，系本站转载自其它媒体，转载目的在于信息传递，并不代表本站赞同其观点和对其真实性负责。如有新闻稿件和图片作品的内容、版权以及其它问题的，请联系本站新闻中心。</p>
      <p class="pg_indent">（3）用户言论免责声明</p>
      <p> 网友问答仅供其表达个人疑惑或见解，并不代表本网立场，对其正确性、合法性、正当性本网不负任何责任。</p>
  </div>
</template>
<script>
export default {
    data(){
      return{
        com_tel:"",
        logo_text:"家园"
      }
    },
      beforeMount(){
       //域名中含有www.jy8006.com，直接跳对应分站
          // let city_head_arr = {
          //   112: "xuzhou",
          //   1: "hangzhou",
          //   36: "ningbo",
          //   38: "jiaxing",
          //   104: "huzhou",
          //   73: "shaoxing",
          //   93: "zhanjiang",
          //   41: "chongqing",
          //   47: "chengdu",
          //   3: "guiyang",
          //    149:"wuxi"
          // };
          let  com_tel = sessionStorage.getItem('telphone_com');
          if(com_tel){
             this.com_tel = com_tel;
          }

           let city_head_arr = this.$store.state.city_list;
          
          let has_city=this.$cookies.get('city_id');
          //   let str="www.jy8006.com";
          let  str ='www.jy8006.com';
          let host=window.location.host;
          if(host.indexOf(str)!==-1){
            if(!city_head_arr.hasOwnProperty(has_city)){
                console.log(111)
            }else{
                  window.location.href ="http://" + city_head_arr[has_city] + ".jy8006.com"+this.$route.fullPath;
            }
          
          }


           let  mine = this.$store.state.style_mine;
          if(mine==1){ //易得房样式
              this.logo_text = "易得房";
          }else if(mine==2){ //家园样式
            this.logo_text = "家园";
          }
      },
    mounted(){
      //   this.getUserIP((ip) => {
      //      this.ip = ip;
      //      sessionStorage.setItem('ip',ip);
      //  });
        
    },
    head () {
      return {
        title: `免责协议-${this.logo_text}新房`,
        meta: [
           { hid: 'description', name: 'description', content: '免责协议' },
           { hid: 'keywords', name: 'keywords', content: '免责协议' }
        ]
      }
   },
    methods:{
      
    },


}
</script>

<style scoped lang="less">
.jian_box {
   width: 1200px;
   margin:0 auto;
   height: auto;
  padding-bottom:100px;
      .suggest {
          font-size:40px;
          font-family:"Microsoft YaHei";
          font-weight:400;
          color:rgba(26,26,26,1);
          line-height:40px;
          margin-top: 80px;
          margin-bottom: 40px;
          text-align: center;
      }
      p{
        font-size:14px;
        font-family:"Microsoft YaHei";
        font-weight:400;
        color:#4D4D4D;
        line-height:30px;
        margin-top: 10px;
      }
      .pg_indent{
          text-indent:1em;
      }

}
</style>