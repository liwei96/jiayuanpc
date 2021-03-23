<template>
  <div class="jian_box">
      <div class="mianbao">
          <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>投诉建议</el-breadcrumb-item>
          </el-breadcrumb>
      </div>

      <div class="suggest">投诉建议</div>
      <textarea name="" id="" cols="30" rows="10" placeholder="输入您的宝贵建议" class="input_box " v-model="advise"></textarea>
      <p>您有任何问题需要帮助可以写在这里，我们的人员将在最短时间内回复您，感谢您对{{logo_text}}的支持！</p>
    <div class="log">
      <input type="button" value="提交" class="button" @click="submitAdvise" />
    </div>
  </div>
</template>
<script>
 import axios from 'axios';
 import $ from   'jquery';
export default {
    data(){
      return{
         advise:'' ,
         ip:"" ,
         logo_text:"家园"
      }
    },
    head () {
    return {
      title: `${this.logo_text}新房-投诉建议`,
      meta: [
         { hid: 'description', name: 'description', content: `${this.logo_text}新房-投诉建议` },
         { hid: 'keywords', name: 'keywords', content: `${this.logo_text}新房-投诉建议` }
      ]
    }
   },
  //  async fetch({store,params}){
  //     let {data}=await axios.get('http://ip-api.com/json')
  //     store.commit('setIp', data.query)
  //  },
    beforeMount(){
       //域名中含有www.jy8006.com，直接跳对应分站
          // let  city_head_arr =this.$store.state.city_list;
          // let has_city=this.$cookies.get('city_id');
          // let  str ='www.jy8006.com';
          // let host=window.location.host;
          // if(host.indexOf(str)!==-1){
          //   if(!city_head_arr.hasOwnProperty(has_city)){
          //       console.log(111)
          //   }else{
          //         window.location.href ="http://" + city_head_arr[has_city] + ".jy8006.com"+this.$route.fullPath;
          //   }
          
          // }
           let  mine = this.$store.state.style_mine;
            if(mine==1){ //易得房样式
                this.logo_text = "易得房";
            }else if(mine==2){ //家园样式
              this.logo_text = "家园";
            }
      },
    mounted(){
    //     this.getUserIP((ip) => {
    //        this.ip = ip;
    //        sessionStorage.setItem('ip',ip);
    //    });
        
    },
    methods:{
        submitAdvise(){
           var  ip = ip_arr["ip"];
          // var ip =this.$store.state.ip;
           var num=this.advise;
           var token= localStorage.getItem('token');
           let kid = sessionStorage.getItem('kid');
           let other = sessionStorage.getItem('other');
           var city= sessionStorage.getItem('city_id');
           let tel = localStorage.getItem("old_tel")
           if(token!==null){
                if(num == ""){
                    $('.input_box').attr('placeholder',"内容不能为空");
                }else{
                    axios.post('/front/flow/sign',{
                      tel:tel,
                      ip:ip,
                      page:10,
                      project:'',
                      city:city,
                      position:107,
                      remark:`投诉建议+${this.advise}`,
                      source :1,
                      other:other,
                      kid:kid,
                      name:'',
                      }).then((res)=>{
                          if(res.data.code==200){
                              this.$alert('信息提交成功', '提交成功', {
                              confirmButtonText: '确定',
                            });
                          }else{
                              this.$message.success(res.data.message);  
                          }
                    })
                  
                }
           }else{
                this.$message.error('请先登录......');  
                this.$parent.$parent.$parent.$parent.loginTan=true;
           }
              
             
        }
    },


}
</script>

<style scoped lang="less">
 .jian_box{
    width: 1200px;
    height: auto;
    margin:0 auto;
 }
.jian_box >.mianbao{
    margin-top: 40px;
}
.jian_box > .suggest {
    font-size:40px;
    font-family:"Microsoft YaHei";
    font-weight:400;
    color:rgba(26,26,26,1);
    line-height:40px;
    text-align: center;
    margin-top: 40px;
    margin-bottom: 50px;
}
.jian_box > .input_box {
  width: 1200px;
  height: 200px;
  background:#F7F7F7;
  border:0;
  font-size:18px;
  font-family:"Microsoft YaHei";
  font-weight:400;
  color:#4D4D4D;
  line-height:63px;
  text-indent:2em;
  outline: none;
}
p {
  margin-top: 20px;
  font-size: 16px;
  color:#666666;
  /* float: left; */
}

div > .log > .button {
  margin-top: 80px;
  width: 1200px;
  height: 50px;
  background: #3AC869;
  border-radius: 4px;
  color: #fff;
  border:1px solid #3AC869;
  margin-bottom:110px;
  font-size: 18px;
}
</style>