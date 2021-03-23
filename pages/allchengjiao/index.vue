<template>
<div class="allchengjiao">
    <my-header 
              :all="common.city_info.all"
              :telphone="common.phone"
              ref="header"
              ></my-header>
    <my-mianbao :router_data="routerData"></my-mianbao>
     <div class="allcj_center">
        <div class="left_cj">
            <h1>成交案例</h1>
            <ul>
                <li v-for="item in data " :key="item.id">
                  <nuxt-link :to="`/danchengjiao/${item.id}`">
                      <img :src="item.img" alt="">
                      <div class="content_cj">
                          <h4>{{item.title}}</h4>      
                          <p class="content" >{{item.description | ellipsis}} <span>[全文]</span></p>
                          <p class="name">客户：{{item.source}}</p>
                      </div>
                  </nuxt-link>
                </li>
            </ul>
        </div>
        <div class="right_cj">
               <!-- 免费咨询 -->
             <div class="mian_zi">
               <h3>免费咨询</h3>
               <p>对买房有疑问，投资买房会亏损？</p>
               <p>想了解房价行情，投资贷款等</p>
               <p>专业置业顾问帮您解决问题</p>
               <input type="text" placeholder="输入您手机号"
                 maxlength="11"
                 id="mianzi_phone"
                 v-model="mianzi_phone">
               <button  @click="tijiaoDong(104)">免费咨询</button>
            </div>
             <!-- 推荐楼盘 -->
              <div class="tui_lou">
                  <h2>推荐楼盘</h2>
                  <ul>
                    <li v-for="item in recommends" :key="item.id">
                      <nuxt-link :to="`/content/${item.id}`">
                       <img :src="item.img" alt="">
                       <div class="project_content">
                           <h3>{{item.name}}</h3>
                           <p class="jiage">{{item.price}}元/m²起</p>
                           <p class="jian_mian">建面 {{item.area}}m²</p>
                           <p class="address">{{item.address}}</p>
                       </div>
                      </nuxt-link>
                    </li>
                  </ul>
                 <button><nuxt-link to="/searchpro">更多楼盘</nuxt-link></button>
              </div>
        </div>
     </div>
      <!-- 图形验证码组件 -->
      <my-tu-yan
        ref="imgyan"
        :point="104"
        :project_id="''"
        :name="''"
        :myremark="myremark"
        :myphone="this.mianzi_phone"
      ></my-tu-yan>
     <my-footer :c_zhi_citys="common.city_info.all" 
        :c_hot_search="common.hot_search"
        :c_friendlink="common.friend_links"
        :footer_tel="common.phone"></my-footer> 
</div>
</template>
<script>
import header from '~/components/header.vue';
import mianbao from "~/components/mianbao.vue";
import footer from "~/components/footer.vue";
import tuyanMa from "~/components/tuyan.vue";
import axios from 'axios';
import $ from 'jquery';
export default {
    middleware: 'metaTitle',
    meta: {title: '成交列表'},
    components:{
      "my-header":header,
      "my-mianbao":mianbao,
      "my-footer":footer,
       "my-tu-yan": tuyanMa,
    },
    head() {
      return {
        title:`${this.logo_text}新房-成交案例` ,
        meta: [
          {
            hid: "description",
            name: "description",
            content: `${this.logo_text}新房-成交案例`
          },
          { hid: "Keywords", name: "Keywords", content: `${this.logo_text}新房-成交案例` }
        ]
      };
  },
    async asyncData({ app, query, params, store }) {
      // city
      // position 文章位置id
      // page 第几页
      // limit 每页几条
      let  uuid = query.uuid;
      if(uuid && uuid!=="undefined" && uuid!=="null"){
          uuid =uuid;
      }else{
          uuid ='';
      }
    let [data,footer] = await Promise.all([
      app.$axios.get(`/jy/article/info?position=76&page=1&city=${store.state.city_id}&uuid=${uuid}`).then((res) => {
        if (res.data.code == 200) {
          let data = res.data;
          return data;
        }
      }),
    //       city
    //      token
       app.$axios.get(`/jy/head/foot?recommend=1&token=${store.state.token}&city=${store.state.city_id}&uuid=${uuid}`).then((res) => {
        if (res.data.code == 200) {
          let data = res.data;
          return data;
        }
      })
    ]);
    return {
          data:data.data,
          total:data.total,
          common:footer.common,
          recommends:footer.recommends
    };
  },
   data() {
      return {
          data:[],
          total:'',
          common:[],
          recommends:[],
          mianzi_phone:'',
          myremark:'',
          routerData:[],
          logo_text:'家园'
      }
   },
   filters: {
    //超过20位显示 ...
    ellipsis: function(value) {
      if (!value) return "";
      if (value.length > 80) {
        return value.slice(0, 80);
      }
      return value;
    }
  }, 
   created(){
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
      let  token = localStorage.getItem('token');
      let old_tel=localStorage.getItem("old_tel");
      if(token && old_tel){
          this.mianzi_phone=old_tel;
      }else {
      }

      this.routerData = [
       {
         "name":"成交案例",
         "to":''
       }
    ];
       this.myremark = "所有成交案例+免费咨询"
        // $(".content").each(function(){
        //   var len=$(this).text().length;   //当前HTML对象text的长度
        //   if(len>30){
        //       var str="";
        //       str=$(this).text().substring(0,30)+"<span>[全文]</span>";  //使用字符串截取，获取前30个字符，多余的字符使用“......”代替
        //       $(this).html(str);                   //将替换的值赋值给当前对象
        //   }
        // });
   },
   computed:{
   },
   methods:{
       tijiaoDong(num) {
      //右侧报名
          sessionStorage.setItem("bao_id",num);
          var number = this.mianzi_phone;
          let myreg = new RegExp("^[1][3,4,5,7,8][0-9]{9}$");
          if (number !== "") {
              if (!myreg.test(number)) {
                $("#mianzi_phone").val("");
                $("#mianzi_phone").attr("placeholder", "手机号码不合法");
              } else {
                this.$refs.imgyan.show1 = true;
               // console.log(this.tuYanFlags);
              }
            } else {
              $("#mianzi_phone").attr("placeholder", "手机号不能为空");
            }
    },
   },
}
</script>
<style lang="less" scoped>
.allchengjiao{
    .allcj_center:after{
        content:"";
        display:block;
        overflow: hidden;
        visibility: hidden;
        clear: both;
        height: 0;
    }
    .allcj_center{
         width: 1200px;
         height: auto;
         margin: 0 auto;
       .left_cj{
           width: 860px;
           height: auto;
           float: left;
           margin-bottom: 100px;
           h1{
            font-size: 24px;
            font-family: "Microsoft YaHei";
            font-weight: bold;
            color: #333333;
            line-height: 84px;
            margin-top: 10px;
           }
           
           ul{
               li:after{
                content:"";
                display:block;
                overflow: hidden;
                visibility: hidden;
                clear: both;
                height: 0;
             }
               li{
                   border-bottom: 1px solid #F0F1F2;
                   padding-bottom:32px;
                   padding-top: 32px;
                    img{
                        width: 220px;
                        height: 150px;
                        float: left;
                        margin-right: 30px;
                    }
                    .content_cj{
                        float: left;
                        width: 610px;
                        h4{
                            font-size: 24px;
                            font-family: "Microsoft YaHei";
                            font-weight: 400;
                            color: #313233;
                            line-height: 36px;
                            margin-bottom: 13px;
                        }
                        .content{
                            font-size: 14px;
                            font-family: "Microsoft YaHei";
                            font-weight: 400;
                            color: #646566;
                            line-height: 24px;
                            margin-bottom: 15px;
                            span{
                                color:#426385 ;
                                font-size: 14px;
                            }
                        }
                        .name{
                            font-size: 14px;
                            font-family: "Microsoft YaHei";
                            font-weight: 400;
                            color: #646566;
                            line-height: 42px;

                        }
                    }
               }
           }
       }
       .right_cj{
           width:300px ;
           float: right;
           .mian_zi{
              h3{
                font-size: 18px;
                font-family: "Microsoft YaHei";
                font-weight: bold;
                color: #323334;
                line-height: 18px;
                margin-bottom: 20px;
                margin-top: 38px;
              }
              p{
                font-size: 14px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: #646666;
                line-height: 34px;
              }
              input{
                width: 300px;
                height: 36px;
                border: 1px solid #DCDCDE;
                border-radius: 2px;
                font-size:16px;
                color:#7D7D85 ;
                text-indent: 1em;
                margin-bottom: 20px;
                margin-top:20px ;
              }
              button{
                width: 300px;
                height: 36px;
                background: #2AC66E;
                border-radius: 2px;
                font-size: 16px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: #FFFFFF;
                line-height: 24px;
                text-align: center;
                line-height: 36px;
                border: 0px;
                outline:none;
                a{
                  color: #FFFFFF;
                }
              }
           }
            .tui_lou{
               h2{
                font-size: 18px;
                font-family: "Microsoft YaHei";
                font-weight: bold;
                color: #323334;
                line-height: 78px;
                margin-top: 20px;
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
                li{
                    width: 300px;
                    height: 88px;
                    margin-bottom: 30px;
                   img{
                    width: 110px;
                    height: 84px;
                    float: left;
                    margin-right: 13px;
                   } 
                   .project_content{
                      width: 177px; 
                      height: 88px;
                      float: left;
                      h3{
                        font-size: 14px;
                        font-family: "Microsoft YaHei";
                        font-weight: bold;
                        color: #323334;
                        line-height: 14px;
                      } 
                      .jiage{
                        font-size: 16px;
                        font-family: "Microsoft YaHei";
                        font-weight: 400;
                        color: #FF5644;
                        line-height: 34px;
                        margin-top: 4px;
                      }
                      .jian_mian{
                        font-size: 14px;
                        font-family: "Microsoft YaHei";
                        font-weight: 400;
                        color: #646666;
                        line-height: 14px;
                      }
                      .address{
                        font-size: 14px;
                        font-family: "Microsoft YaHei";
                        font-weight: 400;
                        color: #646666;
                        line-height: 14px;
                        margin-top: 8px;
                        width: 168px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                      }
                   }
                }
              }  
               button{
                    width: 300px;
                    height: 36px;
                    border: 1px solid #DCDCDE;
                    border-radius: 2px;
                    font-size: 16px;
                    font-family: "Microsoft YaHei";
                    font-weight: 400;
                    color: #7C7D84;
                    line-height: 36px;
                    background: #fff;
                    margin-bottom: 100px;
                    a{
                      color:#7C7D84 ;
                      display: block;
                      line-height: 36px;
                    }
                }

           }
       }
    }
}
</style>
