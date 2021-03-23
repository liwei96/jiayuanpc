<template>
  <div class="jian_box">
      <div class="suggest">版权声明</div>
      <p>1、{{logo_text}} 转载的或者任何信息发布人通过{{logo_text}}平台发布的信息或内容，并不代表{{logo_text}}的意见及观点，也不意味着本网赞同其观点或证实其内容的真实性。</p>
      <p>2、{{logo_text}}转载的或者任何通过{{logo_text}}平台发布的信息、文字、图片、音视频等资料均由本网站用户提供，其真实性、准确性和合法性由信息发布人负责。{{logo_text}}不提供任何保证，并不承担任何法律责任。若任何人发现上述内容中存在任何侵犯第三方合法权益情形的，{{logo_text}}随时接受用户反馈，并愿意为用户维权提供便利条件。</p>
      <p>3、{{logo_text}}所转载的或者任何通过{{logo_text}}平台发布的信息、文字、图片、音视频等资料，如果侵犯了第三方的知识产权或其他权利，责任由信息发布者或转载者本人承担，本网站对此不承担责任。</p>
      <p>4、对本网版权所有之内容，已经本网书面许可的单位或个人，在使用时必须注明“稿件来源：{{logo_text}}”，并标明本网网址www.jy8006 .com，违者本网将依法追究其相关法律责任。</p>
      <p>5、转载或引用本网内容必须是以新闻性或资料性公共免费信息服务为目的的合理、善意使用，不得对本网内容原意进行曲解、修改，同时必须保留本网注明的“稿件来源”，并自负版权等法律责任。</p>
      <p>6、凡本网注明“来源：XXX ”的文/图等资料，本网转载出于传递更多信息之目的，并不意味着赞同其观点或证实其内容的真实性。</p>
      <p>7、转载或引用本网其他版权所有之内容须注明“转自（或引自）{{logo_text}}”字样，并标明本网网址www.jy8006 .com。转载或引用本网中的署名文章，请按规定向作者支付稿酬。</p>
      <p>8、除注明“来源：{{logo_text}}”或“来源：{{logo_text}}××（频道）”的内容外，本网以下内容亦不可任意转载： </p>
        <p class="pg_indent">   A、本网所指向的非本网内容的相关链接内容；</p>
        <p class="pg_indent">  B、已作出不得转载或未经许可不得转载声明的内容； </p>
        <p class="pg_indent">   C、未由本网署名或本网引用、转载的他人作品等非本网版权内容；</p>
        <p  class="pg_indent" >  D、本网中特有的图形、标志、页面风格、编排方式、程序等； </p>
        <p class="pg_indent">    E、本网中必须具有特别授权或具有注册用户资格方可知晓的内容；</p>
        <p class="pg_indent">    F、其他法律不允许或本网认为不适合转载的内容。</p>
      <p>9、转载或引用本网内容不得进行如下活动：</p>
      <p class="pg_indent">    A、损害本网、他人或其他社会群体利益的行为；</p>
      <p class="pg_indent">    B、任何违反法律法规的行为。</p>
      <p>10、对于不当转载或引用本网内容而引起的纷争等或因纠纷等造成的任何损失，本网不承担相关法律责任。</p>
      <p>11、对不遵守本声明的用户或其他违法、恶意使用本网内容者，本网保留追究其法律责任的权利。</p>
      <p>12、本声明未涉及的问题请参见国{{logo_text}}关法律法规，当本声明与国{{logo_text}}关法律法规冲突时，以国家法律法规为准。</p>
      <p>13、本网站相关声明版权及其修改权、更新权和解释权均属{{logo_text}}所有。</p>
  </div>
</template>
<script>
export default {
    data(){
      return{
        logo_text:"家园"
      }
    },
    head () {
    return {
      title: `版权声明-${this.logo_text}新房`,
      meta: [
         { hid: 'description', name: 'description', content: '版权声明' },
         { hid: 'keywords', name: 'keywords', content: '版权声明' }
      ]
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
          let  city_head_arr =this.$store.state.city_list;
        //  console.log(city_head_arr);
          
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
    methods:{
        
    },


}
</script>

<style scoped lang="less">

.jian_box {
      width: 1200px;
      padding-bottom:100px;
      margin: 0 auto;
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
        line-height:26px;
        margin-bottom: 14px;
      }
      .pg_indent{
          text-indent:2em;
      }

}

</style>