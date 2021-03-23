<template>
<div class="error_box">
     <my-header
        :all="all"
        :telphone="telphone"
        ref="header"
        ></my-header>
      <my-mianbao :router_data="routerData"></my-mianbao>
    <div  class="container">
      
        <div v-if="error.statusCode == 404" class="cuowu">  
             <div class="img_box">
                <img src="~/assets/404.png" alt="">
            </div>
           <h4>sorry! 您访问的页面不存在</h4>
           <p>您要浏览的网页可能被删除,重命名或者暂时不可用</p>
           <p>您可以:</p>
           <p>检查网址是否正确</p>
           <p><nuxt-link to="/">返回首页</nuxt-link>进行访问</p>
        </div>

        <div v-else class="cuowu"> 
            <h5> 应用发生错误异常</h5>
           <p>您要浏览的网页可能被删除,重命名或者暂时不可用</p>
           <p>您可以:</p>
           <p>检查网址是否正确</p>
           <p><nuxt-link to="/">返回首页</nuxt-link>进行访问</p>
        </div>

        <div class="haofang">
        <h3>好房推荐</h3>
            <ul>
                <template v-for="(item,index ) in haofang">
                    <li  :key="item.id" v-if="index<4">
                        <nuxt-link :to="`/content/${item.id}`">
                        <img :src="item.img" alt="">
                        <div class="pro_name">
                                <h4>{{item.name}}</h4>
                                <p class="address">{{item.city}}-{{item.country}}</p>
                                <p class="area"><span>建面：{{item.area}}/m²</span>   <i>{{item.price}}<em>元/m²起</em></i></p>
                        </div>
                        </nuxt-link>
                    </li>
                </template>
            </ul>
        </div>
       
    </div>
  <my-footer
      :c_zhi_citys="all"
      :c_hot_search="common.hot_search"
      :c_friendlink="common.friend_links"
      :footer_tel="telphone"
    ></my-footer>
</div>
</template>

<script>
import axios from 'axios';
import header from "~/components/header.vue";
import footer from "~/components/footer.vue";
import soubox from "~/components/mianbao.vue";
export default {
    props:['error'],
    components:{
          "my-header": header,
          "my-footer": footer,
          "my-mianbao": soubox,
    },
    data(){
        return{
              haofang:[],
              common:{},
              routerData: [],


                current:[],
                all:[],
                telphone:'',
                hot_search:[],
                friend_links:[],

                logo_text:'家园'


        }
    },
    head () {
        return {
        title: `${this.logo_text}新房-页面不存在`,
        }
   }, 
   beforeMount(){
       var token = localStorage.getItem('token');
        var city = this.$cookies.get("city_id");
       axios.get('/jy/head/foot',{
            params:{
                recommend:1,
                city:city,
                token:token,
            }
       }).then(res=>{
            if(res.data.code==200){
                console.log(res);
                this.haofang = res.data.recommends;
               // this.common = res.data.common;
               let common = res.data.common;
               this.current = res.data.common.city_info.current;
               this.all = res.data.common.city_info.all;
               this.telphone = res.data.common.phone;
               this.hot_search = res.data.common.hot_search;
               this.friend_links =  res.data.common.friend_links;
                this.routerData = [
                    {
                        "name":`${common.city_info.current.city}楼盘`,
                        "to":'/searchpro'
                    },
                ];
            }
       })

        let  mine = this.$store.state.style_mine;
        if(mine==1){ //易得房样式
            this.logo_text = "易得房";
        }else if(mine==2){ //家园样式
           this.logo_text = "家园";
        }
   },
   mounted(){
         
   }
}
</script>
<style scoped lang="less">
     .container{
           width:1200px;
           min-height:400px;
           margin:0 auto;
           .cuowu{
             .img_box{
              position: relative;
              width: 1200px;
              height: 267px;
              margin-top: 60px;
                img{
                 position: absolute;
                 margin:0 auto;
                 width: 400px;
                 height: 267px;
                 left: 50%;
                 margin-left:-200px;
               }
             }
            
             h4{
                text-align: center;
                font-size:24px;
                font-weight:500;
                color:#2AC66D;
                line-height: 56px;
             }
             h5{
                 text-align: center;
                 font-size:24px;
                 font-weight:500;
                 color:#2AC66D;
                line-height: 56px;
                display: flex;
                justify-content: center;
                width: 1200px;
             }
             p{
                  font-size:14px;
                  font-family:"Microsoft YaHei";
                  font-weight:400;
                  color:rgba(77,77,77,1);
                  line-height:30px;
                  text-align: center;
                  a{
                    color: #2AC66D;
                  }
             }
           }
           .haofang{
               h3{
                  font-size:32px;
                  font-family:"Microsoft YaHei";
                  font-weight:bold;
                  color:rgba(51,51,51,1);
                  margin-bottom: 39px;
               }
               ul:after{
                  content: "";
                  height: 0;
                  clear: both;
                  overflow: hidden;
                  display: block;
                  visibility: hidden;
               }
               ul{
                 margin-bottom: 60px;
                 li{
                   float: left;
                   width: 285px;
                   height: 290px;
                   margin-right: 20px;
                   img{
                    width:285px;
                    height:200px;
                    border-radius:4px;
                   }
                   .pro_name{
                      h4{
                        font-size:20px;
                        font-family:"Microsoft YaHei";
                        font-weight:bold;
                        color:rgba(51,51,51,1);
                        line-height:52px;
                      }
                      .address{
                          font-size:14px;
                          font-family:"Microsoft YaHei";
                          font-weight:400;
                          color:rgba(114,115,121,1);
                          line-height:14px;
                      }
                      .area{
                        line-height: 38px;
                        span{
                            font-size:14px;
                            font-family:"Microsoft YaHei";
                            font-weight:400;
                            color:rgba(114,115,121,1);
                            line-height:38px;
                        }
                        i{
                          font-style: normal;
                          font-size:20px;
                          font-family:"Microsoft YaHei";
                          font-weight:bold;
                          color:rgba(255,106,72,1);
                          line-height:48px;
                          display: inline-block;
                          float: right;
                          line-height: 38px;
                          em{
                              font-style: normal;
                              font-size: 14px;
                          }
                        }
                        
                      }
                   }
                 }
                 li:last-child{
                   margin-right: 0px;
                 }
               }
           }
     }
</style>