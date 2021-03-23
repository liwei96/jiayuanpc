<template>
    <div class="join">
        <my-header   
              :all="common.city_info.all"
              :telphone="common.phone"
              ref="header"
              ></my-header>
        <div class="big_img">
             <img src="~/assets/join/join_img.jpg" alt="" v-if="this.$store.state.style_mine==0">
             <img src="~/assets/join/join_img_yi.jpg" alt="" v-if="this.$store.state.style_mine==1">
             <button class="shenqing_one">申请加盟</button>
             <div class="kehuliang">
                  <ul>
                      <li>
                          <h3> 20<em>人</em></h3>
                          <p>人均1500客户</p>
                      </li>
                       <li>
                          <h3> 3<em>万客户</em></h3>
                          <p>月均120客户</p>
                      </li>
                       <li>
                          <h3> 2<em>千万业绩</em> <i>(一个城市)</i></h3>
                          <p>人均100万业绩</p>
                      </li>
                  </ul>
             </div>
        </div>
         <!-- 关于我们 -->
        <div class="guan">
                <div class="guan_title">
                    <h1> ABOUT US</h1>
                    <h2>关于我们</h2>
                    <p>ABOUT US</p>
                </div>
                <p class="content">
                    {{logo_text}}新房隶属杭州亚汉网络科技有限公司旗下，成立于2016年，拥有三大自营平台。
                    2019年7月开拓了嘉兴加盟城市，全国城市加盟布局正式开始实行。
                    目前加盟城市有：杭州、嘉兴、无锡、湖州、贵阳、重庆、成都 。
                    公司注重技术开发，最大程度的节省获客时间，最大程度简化与优化客户维护流程，
                    用技术手段无限提高客户的利用率，给购房者带来更加便捷 真实 及时 全面的房产信息平台
                </p>
                <ul>
                    <li>
                        <img src="~/assets/join/join_01.png" alt="">
                        <p>累计服务客户总量</p>
                        <h6>60<em>万+</em></h6>
                    </li>
                    <li>
                        <img src="~/assets/join/join_02.png" alt="">
                        <p>精准推广项目展现</p>
                        <h6>2.3<em>亿次</em></h6>
                    </li>
                    <li>
                        <img src="~/assets/join/join_01.png" alt="">
                        <p>获客成本比传统</p>
                        <h6>降低<em>4</em>倍</h6>
                    </li>
                    <li>
                        <img src="~/assets/join/join_01.png" alt="">
                        <p>累计成交总量</p>
                        <h6>8<em>千单+</em></h6>
                    </li>
                </ul>
        </div>
        <!-- 我们的优势 -->
        <div class="youshi">
             <div class="guan_title">
                <h1>ADVANTAGE</h1>
                <h2>我们的优势</h2>
                <p>OUR STRENGTHS</p>
             </div>
             <ul>
                 <li>
                     <h2><em>“0”</em>加盟费</h2>
                     <div class="xian"></div>
                     <p class="p1">减少客户的前期投入成本，
                         低成本启动城市运营
                    </p>
                 </li>
                 <li>
                     <h2>全网全渠道投放 </h2>
                     <div class="xian"></div>
                     <p class="p2">提升客户量并且
                         客户精准度高 
                    </p>
                 </li>
                 <li>
                     <h2><em>“0”</em>成本获客途径 </h2>
                     <div class="xian"></div>
                     <p class="p3">SEO优化 +微信项目分享+新媒体运营
                         +头条小程序  
                    </p>
                 </li>
                 <li>
                     <h2>增值服务</h2>
                     <div class="xian"></div>
                     <p class="p4">网站建模 +一对一到服务+数据ppt分析
                         +培训及视频的教程 
                    </p>
                 </li>
             </ul>
        </div>
         <!-- 平台支持 -->
        <div class="ping_zhi">
              <div class="guan_title">
                <h1>PLATFORM</h1>
                <h2>平台支持</h2>
                <p>PLATFORM</p>
             </div>
             <ul>
                 <li>
                     <div class="img_box">
                         <img src="~/assets/join/ping_01.jpg" alt=""> 
                     </div>
                    <div class="content">
                         <h2>三大平台</h2>
                        <p><span></span>每月超1000万+用户访问量</p>
                        <p><span></span>1.2亿+年度访客</p>
                        <p><span></span>精准客户资源，流量持续增长</p>
                    </div>
                 </li>
                  <li>
                      <div class="img_box">
                          <img src="~/assets/join/ping_02.jpg" alt="">
                      </div>
                    <div class="content">
                         <h2>专业团队 </h2>
                        <p><span></span>十年经验的SEM、SEO团队</p>
                        <p><span></span>行业顶尖软件研发团队 </p>
                        <p><span></span>新媒体团队 </p>
                    </div>
                 </li>
                  <li>
                     <div class="img_box">
                        <img src="~/assets/join/ping_03.jpg" alt=""> 
                    </div>
                    <div class="content">
                         <h2>SaaS系统 </h2>
                        <p><span></span>客户管理：高效管理客户</p>
                        <p><span></span>楼盘管理：管理更多楼盘</p>
                        <p><span></span>员工管理，统计分析等一目了然</p>
                    </div>
                 </li>
                  <li>
                      <div class="img_box">
                       <img src="~/assets/join/ping_04.jpg" alt="">
                    </div> 
                    <div class="content">
                         <h2>培训支持 </h2>
                        <p><span></span>获客、转盘、成交技能培训     </p>
                        <p><span></span>SaaS系统使用培训</p>
                        <p><span></span>小程序及微信项目分享使用培训 </p>
                    </div>
                 </li>
             </ul>
        </div>
        <!-- 模式比较 -->
        <div class="moshi">
             <div class="moshi_cen">
                <div class="guan_title">
                    <h1>PATTERN</h1>
                    <h2>模式比较</h2>
                    <p>PATTERN</p>
                </div>
                <ul>
                    <li>
                        <h1>人员管理</h1>
                        <div class="mid_box">
                            <div class="left">
                                <h3>传统模式</h3>
                                <img src="~/assets/join/b1_01.png" alt="">
                            </div>
                            <img src="~/assets/join/vs.png" alt="" class="vs">
                            <div class="right">
                                <h3>{{logo_text}}模式</h3>
                                <img src="~/assets/join/b1_02.png" alt="">
                            </div>
                        </div>
                        <p>大大减少人员成本，减少招人成本，
                            减少公司办公成本，减少人员管理成本，
                            提高人效，从而提高利润</p>
                        <button class="shenqing_two">申请加盟</button>
                    </li>
                     <li>
                        <h1>市场管理</h1>
                        <div class="mid_box">
                             <div class="left">
                                <h3>传统模式</h3>
                                <img src="~/assets/join/b2_01.png" alt="">
                            </div>
                            <img src="~/assets/join/vs.png" alt="" class="vs">
                            <div class="right">
                                <h3>{{logo_text}}模式</h3>
                                <img src="~/assets/join/b2_02.png" alt="">
                            </div>
                        </div>
                        <p>提高市场知名度，提高抗风险能力，
                            提高业绩和稳定性</p>
                        <button class="shenqing_three">申请加盟</button>
                    </li>
                     <li>
                        <h1>团队管理</h1>
                        <div class="mid_box">
                            <div class="left">
                                <h3>传统模式</h3>
                                <img src="~/assets/join/b3_01.png" alt="">
                            </div>
                            <img src="~/assets/join/vs.png" alt="" class="vs">
                            <div class="right">
                                <h3>{{logo_text}}模式</h3>
                                <img src="~/assets/join/b3_02.png" alt="">
                            </div>
                        </div>
                        <p>促进扁平化管理发展，
                            提高个岗位收益和利润，提高人效管理</p>
                        <button class="shenqing_four">申请加盟</button>
                    </li>
                </ul>
             </div>
            
        </div>
        <!-- 加盟条件 -->
        <div class="join_us">
            <div class="join_top_box">
                <div class="guan_title">
                    <h1>CONDITION</h1>
                    <h2>加盟条件</h2>
                    <p>CONDITION</p>
                </div>
                <div class="box">
                    <div class="left">
                        <div class="box1">
                            认同公司品牌价值观 
                        </div>
                        <div class="box2">
                            会面沟通进行当地资源市场考察 
                        </div>
                    </div>
                    <div class="mid">
                        <ul>
                            <li>1</li>
                            <li>2</li>
                            <li>3</li>
                            <li>4</li>
                        </ul>
                    </div>
                    <div class="right">
                        <div class="box1">
                          正规合法资质、无违法
                            违规资金充足公司
                        </div>
                        <div class="box2">
                          提供公司团队规模及业务规划
                        </div>
                    </div>
                </div>
            </div>
            <div class="join_form_box">
                <div class="guan_title">
                    <h1>JOIN US</h1>
                    <h2>加入我们</h2>
                    <p>JOIN US</p>
                </div>
                <div class="form_box"  >
                  <div class="left_form">
                    <div class="name">
                        <span>姓名</span><i>*</i>
                        <input type="text" placeholder="请输入姓名（必填）" v-model="name1">
                    </div>
                    <div class="tel">
                       <span>电话</span><i>*</i>
                       <input type="text" placeholder="请输入手机号码（必填）" v-model="phone1" maxlength="11">
                    </div>
                    <div class="gongsi">
                        <span>公司</span>
                        <input type="text" placeholder="请输入公司全称" v-model="company1">
                    </div>
                    <div class="city">
                        <span>城市</span>
                        <input type="text" placeholder="输入意向合作城市" v-model="city1">
                    </div>
                    <button @click="getJoin(1)" >提交</button>
                </div>
                    <div class="right_form">
                        <div class="input_box">
                                <img src="~/assets/join/weixin.png" alt="">
                                <p>扫码加盟官方微信号</p>
                                <h6>加盟热线：400-718-6686</h6>
                        </div>
                        
                    </div>
                </div>
            </div>
             
        </div>
        <!-- 底部悬浮 -->
        <div class="dibu" v-show="bottom_show">
               <div class="left_form">
                    <div class="name">
                        <span>姓名</span><i>*</i>
                        <input type="text" placeholder="输入姓名" v-model="name">
                    </div>
                    <div class="tel">
                       <span>电话</span><i>*</i>
                       <input type="text" placeholder="输入电话" v-model="phone" maxlength="11">
                    </div>
                    <div class="gongsi">
                        <span>公司</span>
                        <input type="text" placeholder="公司全称" v-model="company">
                    </div>
                    <div class="city">
                        <span>城市</span>
                        <input type="text" placeholder="意向合作城市" v-model="city">
                    </div>
                    <button @click="getJoin(2)">申请加盟</button>
               </div>
        </div>
        <my-footer :c_zhi_citys="common.city_info.all" 
        :c_hot_search="common.hot_search"
        :c_friendlink="common.friend_links"
        :footer_tel="common.phone"></my-footer>
    </div>
</template>
<script>
import header from "~/components/header.vue";
import footer from "~/components/footer.vue";
import axios from 'axios';
import jiayuan_top from "../../assets/join/join_img.jpg"
import yidefang_top from "../../assets/join/join_img_yi.jpg"
import $ from 'jquery'
export default {
    head() {
    return {
      title:`${this.logo_text}新房-平台合作` ,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `${this.logo_text}新房-平台合作`
        },
        { hid: "Keywords", name: "Keywords", content: `${this.logo_text}新房-平台合作` }
      ]
    };
  },
    components:{
        "my-header":header,
        "my-footer":footer
    },
    async asyncData({ app, query, params, store }) {
     let uuid = query.uuid;
      if(uuid && uuid!=="undefined" && uuid!=="null"){
        uuid =uuid;
      }else{
         uuid="";
      }
    let [footer] = await Promise.all([
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
          common:footer.common,
    };
  },
   data() {
      return {
            common:[],
            name:'',
            phone:'',
            company:'',
            city:'',
            name1:'',
            phone1:'',
            company1:'',
            city1:'',
            bottom_show:true,
            logo_text:"家园",
            mine:0,

            
      }
   },
   created(){
   },
   beforeMount(){
        let  mine = this.$store.state.style_mine;
        this.mine = mine;
        if(mine==1){ //易得房样式
             this.logo_text = "易得房";
        }else if(mine==2){ //家园样式
            this.logo_text = "家园";
        }
   },
   mounted(){
          var  _this =this;
          window.addEventListener("scroll",function(){
                 let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                 if(scrollTop>4000){
                      _this.bottom_show=false;
                 }else{
                      _this.bottom_show=true;
                 }
          }); 
         var city_top = $(".form_box").offset().top;
         $(".shenqing_one").click(function() {
            $("html,body").animate({ scrollTop: city_top }, 500);
        });
        $(".shenqing_two").click(function() {
            $("html,body").animate({ scrollTop: city_top }, 500);
        });
        $(".shenqing_three").click(function() {
            $("html,body").animate({ scrollTop: city_top }, 500);
        });
        $(".shenqing_four").click(function() {
            $("html,body").animate({ scrollTop: city_top }, 500);
        });


        let  mine = this.$store.state.style_mine;
        this.mine= mine;
        if(mine==1){ //易得房样式
             this.logo_text = "易得房";
        }else if(mine==2){ //家园样式
            this.logo_text = "家园";
        }
   },
   updated(){
       
   },
   computed:{
   },
   methods:{
    getJoin(typ){  
        let phone='';
        let company="";
        let name="";
        let city="";
        if(typ==1){
             phone=this.phone1;
             company=this.company1;
             name=this.name1;
             city=this.city1;
        }else if(typ==2){
             phone=this.phone;
             company=this.company;
             name=this.name;
             city=this.city;
        }
        
        //申请加盟弹窗
        let ip=ip_arr["ip"]  ;
         var pattern = new RegExp('^1[345678]\\d{9}$');
         if(name!==""){
             if(phone!==''){
               if(!pattern.test(phone)){
                    this.$message.error("请输入正确的手机号");
               }else{
                   if(company!==""){
                     if(city!==''){
                            axios.post('/api/map/cooperate',{
                              company:company,
                              phone:phone,
                              city:city,
                              name:name,
                          }).then((res)=>{
                              if(res.data.code==200){
                                this.$message.success(res.data.message);
                                this.phone='';
                                this.company='';
                                this.name='';
                                this.city='';
                                this.mengTan=false;
                              }
                          }).catch((error)=>{
                            console.log(error);
                          })
                     }else{
                        this.$message.error("城市不能为空")
                     }
                  }else{
                      this.$message.error("公司全称不能为空")
                  }
               }
               
             }else{
                this.$message.error("手机号码不能为空")
             }
         }else{
             this.$message.error("称呼不能为空")
         }
      },
   },
}
</script>
<style lang="less" scoped>
.join{
    position: relative;
    overflow-x: hidden;
  .big_img{
      width:100%;
      height: 500px;
    //  background: url("../../assets/join/join_img.jpg") no-repeat;
      position: relative;
      img{
            // width:100%;
            // height: 500px;
            //  background: url("../../assets/join/join_img.jpg") no-repeat;
            position: absolute;
            left: 50%;
            transform: translate(-50%,0px);
      }
      button{
        width: 180px;
        height: 56px;
        background: linear-gradient(126deg, #FDBE90, #D18D5E);
        border-radius: 4px;
        font-size: 24px;
        font-weight: bold;
        color: #FFFFFF;
        border: none;
        position: absolute;
        left: 50%;
        margin-left: -90px;
        bottom: 127px;
        cursor: pointer;
      }
      .kehuliang{
            width: 1200px;
            height: 180px;
            background: #FFFFFF;
            box-shadow: 1px 5px 30px 0px rgba(0, 0, 0, 0.05);
            border-radius: 8px;
            position: absolute;
            left: 50%;
            margin-left: -600px;
            bottom:-102px;
            ul{
                    display: flex;
                    justify-content:space-around ;
                    align-items: center;
                li{
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    h3{
                        font-size: 34px;
                        font-weight: 400;
                        color: #E43838;
                        font-weight: bold;
                        line-height: 34px;
                        margin-top: 45px;
                        em{
                            font-weight: 400;
                        }
                        i{
                            font-size: 16px;
                            font-family: "Microsoft YaHei";
                            font-weight: 400;
                            color: #666666;
                        }
                    }
                    p{
                        font-size: 18px;
                        font-family: "Microsoft YaHei";
                        font-weight: 400;
                        color: #2B2B2B;
                        line-height: 66px;
                    }
                }
            }
      }
   }
   //关于我们
  .guan{
          width: 1200px;
          height: 502px;
          margin: 0 auto;
         .guan_title{
             width: 280px;
             height:90px ;
             margin:182px auto auto auto;
             position: relative;
             h1{
                font-size: 42px;
                font-family: "Microsoft YaHei";
                font-weight: bold;
                color: #F3F3F3;
                text-align: center;
                width:280px;
                height: 42px;
                line-height: 42px;
               
             }
               h2{
                    font-size: 40px;
                    font-family: "Microsoft YaHei";
                    font-weight: bold;
                    color: #2A2A2A;
                    text-align: center;
                    position: absolute;
                    left: 50%;
                    transform: translate(-50%);
                    top: 9px;
                    width: 280px;
                }
            
             p{
                font-size: 14px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: #2A2A2A;
                text-align: center;
                position: absolute;
                left: 50%;
                transform: translate(-50%);
                top: 62px;
             }
         } 
         .content{
            font-size: 18px;
            font-family: "Microsoft YaHei";
            font-weight: 400;
            color: #4B4C4D;
            line-height: 30px;
            text-indent: 2em;
            margin-top:40px;
         }
         ul{
              display: flex;
              justify-content: space-between;
              margin-top:80px ;
             li{
                 display: flex;
                 align-items: center;
                 flex-direction: column;
                 img{

                 }
                 p{
                    font-size: 18px;
                    font-family: "Microsoft YaHei";
                    font-weight: 400;
                    color: #4B4C4D;
                    line-height: 30px;
                 }
                 h6{
                    font-size: 20px;
                    font-family: "Microsoft YaHei";
                    color: #2A2A2A;
                    font-size: 24px;
                    font-weight: bold;
                    em{
                       
                         font-weight: 400;
                        color: #2A2A2A;
                        line-height: 30px;
                    }
                 }
             }
         }
      }
     //我们的优势
   .youshi{
       width: 100%;
       height: 500px;
       background: url("../../assets/join/join_you_bg.jpg") no-repeat;
       background-repeat: no-repeat;
       background-size: 100% 100%;
       .guan_title{
             width: 280px;
             height:90px ;
             margin:0 auto;
             position: relative;
             top: 75px;
             h1{
                font-size: 42px;
                font-family: "Microsoft YaHei";
                font-weight: bold;
                color: #5D6B72;
                text-align: center;
                width:280px;
                height: 42px;
                line-height: 42px;
             }
               h2{
                    font-size: 40px;
                    font-family: "Microsoft YaHei";
                    font-weight: bold;
                    color: #FFFFFF;
                    text-align: center;
                    position: absolute;
                    left: 50%;
                    transform: translate(-50%);
                    top: 9px;
                    width: 280px;
                }
            
             p{
                font-size: 14px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color:#FFFFFF;
                text-align: center;
                position: absolute;
                left: 50%;
                transform: translate(-50%);
                top: 62px;
             }
       }
       ul{
           width: 1220px;
           height:200px;
           margin: 120px auto auto auto;
           li{
            width: 285px;
            height: 200px;
            background: #FFFFFF;
            box-shadow: 1px 5px 30px 0px rgba(0, 0, 0, 0.05);
            border-radius: 8px;
            float: left;
            margin-right: 20px;
            display: flex;
            // justify-content: center;
            flex-direction: column;
            align-items: center;
            padding-top: 45px;
            h2{
                font-size: 26px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: #2A2A2A;
                em{
                    color: #2A2A2A;
                    font-weight: bold;
                }
            }
            .xian{
                width: 120px;
                height: 4px;
                background: linear-gradient(90deg, #FDBE90, #D18D5E);
                margin-top: 16px;
                margin-bottom: 24px;
            }
            p{
                font-size: 16px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: #323333;
                line-height: 24px;
                text-align: center;
            }
            .p1{
                width: 209px;
            }
            .p2{
                width: 143px;
            }
            .p3{
                 width: 219px;
            }
            .p4{
                 width: 246px;
            }
           }
       }
   }
   //平台支持
   .ping_zhi{
       width: 1200px;
       height:636px ;
       background: #fff;
       margin: 0 auto;
        .guan_title{
             width: 280px;
             height:90px ;
             margin:0 auto;
             position: relative;
             top: 75px;
             margin-bottom: 120px;
             h1{
                font-size: 42px;
                font-family: "Microsoft YaHei";
                font-weight: bold;
                color:#F3F3F3;
                text-align: center;
                width:280px;
                height: 42px;
                line-height: 42px;
             }
               h2{
                    font-size: 40px;
                    font-family: "Microsoft YaHei";
                    font-weight: bold;
                    color: #2A2A2A;
                    text-align: center;
                    position: absolute;
                    left: 50%;
                    transform: translate(-50%);
                    top: 9px;
                    width: 280px;
                }
            
             p{
                font-size: 14px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color:#2A2A2A;
                text-align: center;
                position: absolute;
                left: 50%;
                transform: translate(-50%);
                top: 62px;
             }
       }
       ul{
           width: 1220px;
           li{
            width: 285px;
            height: 340px;
            background: #FFFFFF;
            box-shadow: 1px 5px 30px 0px rgba(0, 0, 0, 0.05);
            border-radius: 8px;
            margin-right: 20px;
            float: left;
            cursor: pointer;
            .img_box{
                 width: 285px;
                height: 180px;
                background: #F3F3F3;
                border-radius: 8px 8px 0px 0px;
                overflow: hidden;
            }
            img{
                width: 285px;
                height: 180px;
                background: #F3F3F3;
                border-radius: 8px 8px 0px 0px;
            }
            .content{
              h2{
                font-size: 24px;
                font-family: "Microsoft YaHei";
                font-weight: bold;
                color: #DE9C6C;
                padding-left: 20px;
                line-height: 52px;
              }
              p{
                  padding-left: 20px;
                  span{
                    width: 4px;
                    height: 4px;
                    background: #DE9C6C;
                    border-radius: 2px;
                    display: inline-block;
                    margin-right: 11px;
                  }
                    font-size: 16px;
                    font-family: "Microsoft YaHei";
                    font-weight: 400;
                    color: #333334;
                    line-height: 28px;
              }
            }
           }
           li:hover .img_box img{
                 transform: scale(1.2);
                 transition: all 0.6s;
           }
       }
   }


   //模式比较
    .moshi{
        width: 100%;
        height:900px ;
        background: #F8F8F8;
        .moshi_cen{
            width:1200px;
            height:900px;
            margin:0 auto;
        }
         .guan_title{
             width: 280px;
             height:90px ;
             margin:0 auto;
             position: relative;
             top: 75px;
             margin-bottom: 140px;
             h1{
                font-size: 52px;
                font-family: "Microsoft YaHei";
                font-weight: bold;
                color: #EBEBEB;
                text-align: center;
                width:280px;
                height: 42px;
                line-height: 42px;
             }
               h2{
                    font-size: 40px;
                    font-family: "Microsoft YaHei";
                    font-weight: bold;
                    color: #2A2A2A;
                    text-align: center;
                    position: absolute;
                    left: 50%;
                    transform: translate(-50%);
                    top: 9px;
                    width: 280px;
                }
            
             p{
                font-size: 14px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color:#2A2A2A;
                text-align: center;
                position: absolute;
                left: 50%;
                transform: translate(-50%);
                top: 62px;
             }
         }
         ul{
             width: 1305px;
             li{
                width: 295px;
                height: 580px;
                background: #FFFFFF;
                box-shadow: 1px 5px 30px 0px rgba(0, 0, 0, 0.05);
                border-radius: 4px;
                float: left;
                margin-right: 60px;
                padding-left: 40px;
                padding-right: 40px;
                position: relative;
                h1{
                    font-size: 40px;
                    font-family: "Microsoft YaHei";
                    font-weight: bold;
                    color: #2A2A2A;
                    background: linear-gradient(126deg, #FDBE90 0%, #D18D5E 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    line-height:112px ;
                    text-align: center;
                    margin-bottom: 10px;
                }
                .mid_box:after{
                   content:'';
                   height: 0;
                   visibility: hidden;
                   overflow: hidden;
                   clear: both;
                   display: block;
                }
                .mid_box{
                    .left{
                        float: left;
                        margin-left:10px;
                        h3{
                        font-size: 20px;
                        font-family: "Microsoft YaHei";
                        font-weight: bold;
                        color: #2A2A2A;
                        margin-bottom: 43px;
                        }
                    }
                    .vs{
                          float: left;
                          margin-left: 23px;
                          margin-right: 23px;
                    }
                    .right{
                        margin-right: 10px;
                         h3{
                        font-size: 20px;
                        font-family: "Microsoft YaHei";
                        font-weight: bold;
                        color: #2A2A2A;
                         margin-bottom: 43px;
                        }
                        float: left;
                    }
                }
                p{
                    font-size: 14px;
                    font-family:" Microsoft YaHei";
                    font-weight: 400;
                    color: #333333;
                    line-height: 22px;
                    margin-top: 50px;
                }
                button{
                    width: 280px;
                    height: 44px;
                    background: linear-gradient(126deg, #FDBE90, #D18D5E);
                    border-radius: 4px; 
                    border: none; 
                    font-size: 18px;
                    font-family: "Microsoft YaHei";
                    font-weight: bold;
                    color: #FFFFFF;
                    outline: none;
                    position: absolute;
                    bottom: 42px;
                    cursor: pointer;
                }
             }
         }
    }
   //加盟条件
   .join_us{
      height: 1401px;  
      width: 1200px;
      margin:  0 auto;
      .join_top_box{
          .guan_title{
             width: 280px;
             height:90px ;
             margin:0 auto;
             position: relative;
             top: 75px;
             margin-bottom: 140px;
             h1{
                font-size: 52px;
                font-family: "Microsoft YaHei";
                font-weight: bold;
                color: #EBEBEB;
                text-align: center;
                width:280px;
                height: 42px;
                line-height: 42px;
             }
               h2{
                    font-size: 40px;
                    font-family: "Microsoft YaHei";
                    font-weight: bold;
                    color: #2A2A2A;
                    text-align: center;
                    position: absolute;
                    left: 50%;
                    transform: translate(-50%);
                    top: 9px;
                    width: 280px;
                }
            
             p{
                font-size: 14px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color:#2A2A2A;
                text-align: center;
                position: absolute;
                left: 50%;
                transform: translate(-50%);
                top: 62px;
             }
          }
          .box:after{
                content:'';
                height: 0;
                visibility: hidden;
                overflow: hidden;
                clear: both;
                display: block;
          }
          .box{
              .left{
                  float: left;
                  margin-right: 63px;
                 .box1{
                    font-size: 30px;
                    font-family: "Microsoft YaHei";
                    font-weight: 400;
                    color: #2A2A2A;
                    line-height: 26px;
                    width: 481px;
                    height: 101px;
                    border: 1px solid #FDBE90;
                    border-radius: 4px;
                    line-height: 101px;
                    text-align: center;
                    margin-top: 25px;
                 }
                 .box2{
                    font-size: 30px;
                    font-family: "Microsoft YaHei";
                    font-weight: 400;
                    color: #2A2A2A;
                    line-height: 26px;
                    width: 481px;
                    height: 101px;
                    border: 1px solid #FDBE90;
                    border-radius: 4px;
                    line-height: 101px;
                    text-align: center;
                    margin-top: 141px;
                 } 
              }
              .mid{
                  float: left;
                  ul{
                    width: 2px;
                    height: 500px;
                    background: #ECECEC;
                    position: relative;
                    li{
                        width: 32px;
                        height: 32px;
                        background: linear-gradient(126deg, #FDBE90, #D18D5E);
                        border-radius: 50%;
                        font-size: 20px;
                        font-family: "Microsoft YaHei";
                        font-weight: bold;
                        color: #FFFFFF;
                        line-height: 32px;
                        text-align: center;
                    }
                    li:first-child{
                        position: absolute;
                        top: 54px;
                        left:-16px;
                    }
                    li:nth-child(2){
                        position: absolute;
                        top: 175px;
                        left:-16px;
                    }
                     li:nth-child(3){
                        position: absolute;
                        top: 297px;
                        left:-16px;
                    }
                     li:nth-child(4){
                        position: absolute;
                        top: 407px;
                        left:-16px;
                    }
                  }
              }
              .right{
                  float: left;
                  margin-left: 63px;
                  .box1{
                    font-size: 30px;
                    font-family: "Microsoft YaHei";
                    font-weight: 400;
                    color: #2A2A2A;
                    line-height: 26px;
                    width: 481px;
                    height: 121px;
                    border: 1px solid #FDBE90;
                    border-radius: 4px;
                    line-height: 44px;
                    text-align: center;
                    margin-top: 135px;
                 }
                 .box2{
                    font-size: 30px;
                    font-family: "Microsoft YaHei";
                    font-weight: 400;
                    color: #2A2A2A;
                    line-height: 26px;
                    width: 481px;
                    height: 101px;
                    border: 1px solid #FDBE90;
                    border-radius: 4px;
                     line-height: 101px;
                    text-align: center;
                    margin-top: 121px;
                 } 
              }
          }
      }
      .join_form_box{
           .guan_title{
             width: 280px;
             height:90px ;
             margin:0 auto;
             position: relative;
             top: 75px;
             margin-bottom: 140px;
             h1{
                font-size: 52px;
                font-family: "Microsoft YaHei";
                font-weight: bold;
                color: #EBEBEB;
                text-align: center;
                width:280px;
                height: 42px;
                line-height: 42px;
             }
               h2{
                    font-size: 40px;
                    font-family: "Microsoft YaHei";
                    font-weight: bold;
                    color: #2A2A2A;
                    text-align: center;
                    position: absolute;
                    left: 50%;
                    transform: translate(-50%);
                    top: 9px;
                    width: 280px;
                }
            
             p{
                font-size: 14px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color:#2A2A2A;
                text-align: center;
                position: absolute;
                left: 50%;
                transform: translate(-50%);
                top: 62px;
             }
          }
          .form_box{
              width: 1120px;
              .left_form{
                  width: 560px;
                  float: left;
                 .name{
                    span{
                        font-size: 16px;
                        font-family: "Microsoft YaHei";
                        font-weight: bold;
                        color: #333333;
                        line-height: 36px;
                        margin-right: 6px;
                    }  
                    i{
                        font-size: 20px;
                        font-family: "Microsoft YaHei";
                        font-weight: 400;
                        color: #FF2626;
                        line-height: 36px;
                        margin-right: 22px;
                    }
                    input{
                        width: 420px;
                        height: 50px;
                        border: 1px solid #E6E6E6;
                        border-radius: 4px;
                        margin-bottom: 19px;
                         font-size: 16px;
                        font-family: "Microsoft YaHei";
                        font-weight: 400;
                        color: #808080;
                        line-height: 36px;
                        text-indent: 1em;
                    }
                 } 
                .tel{
                    span{
                        font-size: 16px;
                        font-family: "Microsoft YaHei";
                        font-weight: bold;
                        color: #333333;
                        line-height: 36px;
                          margin-right: 6px;
                    }  
                    i{
                        font-size: 20px;
                        font-family: "Microsoft YaHei";
                        font-weight: 400;
                        color: #FF2626;
                        line-height: 36px;
                         margin-right: 22px;
                    }
                    input{
                        width: 420px;
                        height: 50px;
                        border: 1px solid #E6E6E6;
                        border-radius: 4px;
                        margin-bottom: 19px;
                        font-size: 16px;
                        font-family: "Microsoft YaHei";
                        font-weight: 400;
                        color: #808080;
                        line-height: 36px;
                        text-indent: 1em;
                    }
                 } 
                .gongsi{
                    span{
                        font-size: 16px;
                        font-family: "Microsoft YaHei";
                        font-weight: bold;
                        color: #333333;
                        line-height: 36px;
                        margin-right: 38px;
                    }  
                    input{
                        width: 420px;
                        height: 50px;
                        border: 1px solid #E6E6E6;
                        border-radius: 4px;
                        margin-bottom: 19px;
                         font-size: 16px;
                        font-family: "Microsoft YaHei";
                        font-weight: 400;
                        color: #808080;
                        line-height: 36px;
                        text-indent: 1em;
                    }
                 } 
                 .city{
                    span{
                        font-size: 16px;
                        font-family: "Microsoft YaHei";
                        font-weight: bold;
                        color: #333333;
                        line-height: 36px;
                        margin-right:38px;
                    }  
                 
                    input{
                        width: 420px;
                        height: 50px;
                        border: 1px solid #E6E6E6;
                        border-radius: 4px;
                        margin-bottom: 19px;
                         font-size: 16px;
                        font-family: "Microsoft YaHei";
                        font-weight: 400;
                        color: #808080;
                        line-height: 36px;
                        text-indent: 1em;
                    }
                 } 
                 button{
                     width: 420px;
                    height: 50px;
                    background: linear-gradient(90deg, #FDBE90, #D18D5D);
                    border-radius: 4px;
                    font-size: 24px;
                    font-family: "Microsoft YaHei";
                    font-weight: bold;
                    color: #FFFFFF;
                    line-height: 50px;
                    border:none;
                    outline: none;
                    margin-top: 13px;
                    margin-left: 75px;
                 }
              }
              .right_form{
                  width: 560px;
                  float: left;
                  .input_box{
                      width:360px ;
                      margin-left:130px;
                        img{
                            width: 201px;
                            height: 201px;
                             margin-left: 72px;
                             margin-top: 5px;
                        }
                        p{
                            font-size: 18px;
                            font-family: "Microsoft YaHei";
                            font-weight: 400;
                            color: #333333;
                            line-height: 68px;
                            text-align: center;
                        }
                        h6{
                            font-size: 28px;
                            font-family:"Microsoft YaHei";
                            font-weight: bold;
                            color: #A06464;
                            background: linear-gradient(0deg, #FDBE90 0%, #D18D5D 100%);
                            -webkit-background-clip: text;
                            -webkit-text-fill-color: transparent;
                            text-align: center;
                        }
                 }
              }
          }
      }
   }
   //底部悬浮
   .dibu{
        width: 100%;
        height: 120px;
        background: #0B1B2D;
        position: fixed;
        bottom: 0;
       .left_form{
           width: 1200px;
           height: 120px;
           margin: 0 auto;
          .name{
              float: left;
              span{
                font-size: 16px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: #FFFFFF;
                line-height: 120px;
              }
              i{
                font-size: 20px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: #F22E2E;
                line-height: 120px;
                margin-right: 10px;
              }
              input{
                  width: 175px;
                height: 44px;
                background: #FFFFFF;
                border-radius: 4px;
                font-size: 16px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: #666666;
                 text-indent: 1em;
                 margin-right: 24px;
              }
          } 
          .tel{
              float: left;
               span{
                font-size: 16px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: #FFFFFF;
                line-height: 120px;
              }
              i{
                font-size: 20px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: #F22E2E;
                line-height: 120px;
                margin-right: 10px;
              }
              input{
                  width: 175px;
                height: 44px;
                background: #FFFFFF;
                border-radius: 4px;
                font-size: 16px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: #666666;
                 text-indent: 1em;
                  margin-right: 24px;
              }
          } 
          .gongsi{
            float: left;
             span{
                font-size: 16px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: #FFFFFF;
                line-height: 120px;
              }
             
              input{
                  width: 175px;
                height: 44px;
                background: #FFFFFF;
                border-radius: 4px;
                 font-size: 16px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: #666666;
                 text-indent: 1em;
                  margin-right: 24px;
              }  
          }
          .city{
            float: left;
               span{
                font-size: 16px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: #FFFFFF;
                line-height: 120px;
              }
             
              input{
                width: 175px;
                height: 44px;
                background: #FFFFFF;
                border-radius: 4px;
                font-size: 16px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: #666666;
                text-indent: 1em;
                 margin-right: 24px;
              } 
          }
          button{
            width: 160px;
            height: 44px;
            background: linear-gradient(126deg, #FDBE90, #D18D5D);
            border-radius: 4px;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            font-weight: bold;
            color: #FFFFFF;
            line-height: 44px;
            border: none;
            margin-top: 37px;
            margin-left: 30px;
          }
       } 
   } 
}
</style>
