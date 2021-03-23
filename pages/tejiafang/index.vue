<template>
    <div class="tejia">
        <my-header 
              :all="common.city_info.all"
              :telphone="common.phone"
              ref="header"></my-header>
        <div class="tejia_page">
              <div class="bg" >
                  <img src="~/assets/tejiafang.jpg" alt="">
              </div>
              <div class="tejia_box" v-if="discounts.length>0">
                <!-- 限时优惠抢  -->
                <div class="xianshi_hui">
                    <div class="xianshi_title">
                        <h1><i>限时优惠抢</i>   <span  @click="zixunTe(94)"><img src="~/assets/icon/chat_hong.png">咨询更多优惠</span></h1>
                        <p @click="guizebox"><em class="iconfont iconwenti"></em>活动规则</p>
                    </div>
                    <ul class="youhui_list">
                        <li v-for="item in discounts" :key="item.id">
                              <div class="bg_red">
                                  <nuxt-link :to="`/content/${item.id}`">
                                      <div class="top_project">
                                          <div class="left_pro">
                                              <h4>{{item.name}}</h4>
                                              <p>{{item.address}}</p>
                                          </div>
                                          <span class="el-icon-success"></span>
                                      </div>
                                      <div class="price"><span>最 高</span>¥5000</div>
                                   </nuxt-link>
                                  <button @click="youhuiShow(item.id)">抢优惠</button>
                              </div>
                        </li>
                    </ul>
                  
                </div>
                <!-- 今日特价房 -->
                <div class="tejia_list" v-if="specials.length>0">
                     <h3>今日特价房 <span @click="zixunTe(94)"><img src="~/assets/icon/chat_hong.png">咨询明日特价房</span></h3>
                    <ul class="fang_box">
                        <li class="fang_box_one" v-for="item in specials" :key="item.id">
                          <nuxt-link :to="`/content/${item.id}`">
                            <div class="top_box">
                                <div class="img_box">
                                    <img :src="item.img" :alt="item.name" :title="item.name">
                                    <span>今日上新</span>
                                    <div class="bg"></div>
                                </div>
                                <div class="content_box">
                                <h2>{{item.name}} <img src="~/assets/juxing.png"><em>节省{{((item.diff)/10000).toFixed(0)}}万</em></h2>  
                                <p class="price">
                                    <span class="yuan">原价<em>{{((item.original)/10000).toFixed(2)}}</em>万元</span>
                                    <span class="xian">特价<em>{{((item.now)/10000).toFixed(2)}}</em>万元</span>
                                </p>
                                <p class="address"> {{item.type}}<span>{{item.city}}-{{item.country}}</span>{{item.area}}m²</p>
                                <p class="tese"> <em>{{item.decorate}}</em> 
                                    <span v-for="ite in item.features" :key="ite.id">{{ite}}</span>
                                </p>
                                </div>
                            </div>
                          </nuxt-link>
                            <div class="xiaoxi_box">
                              <nuxt-link :to="`/content/${item.id}`">
                                <div class="xiaoxi_all">
                                    <img src="~/assets/icon/laba.png" alt="">
                                    <ol class="xiaoxi">
                                        <li class="msg" @click="lang">{{item.dynamic}}</li>
                                    </ol>
                                </div>
                                </nuxt-link>
                                <button @click="youhuiShow(item.id)">马上抢</button>
                            </div>
                         
                        </li>
                    </ul>
                </div>
                
              </div>
        </div>
         <!-- 红包 弹框-->
      <div class="tuangou_tan" v-show="hongbao.hong_tan">
        <div class="tuan_box">
          <span class="iconfont iconguanbi" @click="guanTuanTan"></span>
          <div class="img_box">
            <div class="hongbao_tit">
              <h1>恭喜你！获得</h1>
              <p class="youhui">{{logo_text}}专享年终大促购房优惠券</p>
              <p class="p01">已有<em>861</em>人领取</p>
            </div>
            <img src="~/assets/tankuang/hongbao_tan.png" alt />
            <!-- 输入手机号 -->
            <div class="hong_tel" v-show="hongbao.hong_tel_flag">
              <div class="input_box">
                <input
                  type="text"
                  placeholder="请输入您手机号"
                  v-model="hongbao.tuan_text_tel"
                  maxlength="11"
                />
                <button @click="lingYouHui(94)">抢优惠券</button>
              </div>
              <p class="p02">
                活动说明：领取成功后优惠编码将与您手机号绑定，会有工作人员与您联系
              </p>
              <p class="p03">注：活动最终解释权归{{logo_text}}所有</p>
            </div>
            <!-- 输入验证码 -->
            <div class="hong_yan" v-show="hongbao.hong_yan_flag">
              <p class="yanzheng">
                验证码已发送到{{ hongbao.yan_tel_xing }} 请注意查看
              </p>
              <div class="input_box">
                <input
                  type="text"
                  placeholder="请输入您的验证码"
                  v-model="hongbao.tuan_input_code"
                />
                <button @click="getYanMa_c">{{ hongbao.yan_text }}</button>
              </div>
              <button class="queren" @click="subYan_c">确定</button>
              <p class="tip">注：活动最终解释权归{{logo_text}}所有</p>
            </div>
          </div>
        </div>
      </div>
        <my-footer :c_zhi_citys="common.city_info.all" 
        :c_hot_search="common.hot_search"
        :c_friendlink="common.friend_links"
        :footer_tel="common.phone"></my-footer>
    </div>
</template>
<script>
import header from '~/components/header.vue';
import footer from "~/components/footer.vue";
import axios from 'axios';
import $ from 'jquery';
export default {
    components:{
        "my-header":header,
        "my-footer":footer
    },
    head() {
    return {
      title:this.common.header.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.common.header.description
        },
        { hid: "Keywords", name: "Keywords", content: this.common.header.keywords}
      ]
    };
  },
    async asyncData({ app, query, params, store }) {
      // city
      // position 文章位置id
      // page 第几页
      // limit 每页几条
       let uuid = query.uuid;
      if(uuid && uuid!=="undefined" && uuid!=="null"){
        uuid =uuid;
      }else{
         uuid="";
      }
    let [data] = await Promise.all([
      app.$axios.get(`/jy/special/pc?city=${store.state.city_id}&token=${store.state.token}&uuid=${uuid}`).then((res) => {
        if (res.data.code == 200) {
          let data = res.data;
          return data;
        }
      }),
    ]);
    return {
         common: data.common,
         discounts:data.discounts,
         specials:data.specials
    };
  },
   data() {
      return {
          bgImg: {
                backgroundImage: "url(" + require("~/assets/tejiafang.jpg") + ")",
                backgroundRepeat: "no-repeat",
          }, 
          msg:'房号304已售罄,房号309、307只剩下一套活动时间仅剩2天',
           hongbao: {
                hong_tan: false,
                tuan_text_tel: "",
                hong_tel_flag: true,
                yan_tel_xing: "187****4376",
                yan_text: "获取验证码",
                hong_yan_flag: false,
                tuan_input_code: "",
         },
          flag: true,
          logo_text:"家园"
      }
   },
   created(){
   },
   computed:{
   },
   methods:{
     guizebox(){
         this.$parent.$parent.rule_model = true;
     },
     zixunTe(num){
          sessionStorage.setItem("bao_id", num);
          switch (num) {
            case 94:
              this.$parent.$parent.baoming_tel.tan_title = "咨询更多优惠"; //ok
              this.$parent.$parent.baoming_tel.tan_content =
                "价格变动这么快？订阅楼盘变价通知，楼盘变价我们将第一时间通知您";
              this.$parent.$parent.baoming_tel.default_show = true;
              this.$parent.$parent.baoming_tel.kaipan_show = false;
              break;
          }
           this.$parent.$parent.baoming_tel.telflag = true;
     },
     lingYouHui(num) {
      //红包显示

      let tel = this.hongbao.tuan_text_tel;
      //32抢优惠券弹层 团购优惠券弹框
      sessionStorage.setItem("bao_id", num);
      let ip = ip_arr["ip"];
      let city = sessionStorage.getItem("city_id");
      var token = localStorage.getItem("token");
      var project =  sessionStorage.getItem("project_num")
      var other = sessionStorage.getItem("other");
      var kid = sessionStorage.getItem("kid");

      var pattern = new RegExp("^1[345678]\\d{9}$");
      if (tel == "") {
        this.$message.error("手机号不能为空");
      } else if (!pattern.test(tel)) {
        this.$message.error("请输入正确的手机号");
      } else {
        // this.tuMaFlag = true;
        axios
          .post("/front/flow/sign", {
            tel: tel,
            ip: ip,
            page: 10, //家有PC端
            project: project,
            city: city,
            position: num,
            remark: "特价房源+5000元-领取优惠 ", //请填写位置对应的名，如“详细楼盘信息”，如果是咨询详细户型请加上户型名
            source: "线上推广1",
            other: other,
            kid: kid,
            name: "", //客户姓名，没有就不填
          })
          .then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.message);
              this.hongbao.hong_tel_flag = false;
              //验证码弹框显示
              this.hongbao.hong_yan_flag = true;
              this.hongbao.yan_tel_xing = tel;
              // this.tan_content_c = "专享限时优惠折扣，家园专场推出，早抢早优惠";
              // this.tan_title_c = "抢优惠券";
              this.getYanMa_c();
            }
             if(res.data.code==500  && res.data.message=="已成功为您订阅了该服务"){
                    this.$message.success(res.data.message);
                    this.hongbao.hong_tan = false;
                    this.$refs.slideblock.reset();
              }

          });
      }
    },
   //红包提交验证码
    subYan_c() {
      var phone = this.hongbao.tuan_text_tel;
      var code = this.hongbao.tuan_input_code;
      var ip = ip_arr["ip"];
      var token = localStorage.getItem("token");
      // var ip=this.$store.state.ip;
      if (code !== "" && phone !== "") {
        axios({
          method: "post",
          url: "/sure",
          params: {
            phone: phone,
            code: code, //短信验证码
            source: 3,
            ip: ip,
          },
        })
          .then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.message);
              this.hongbao.hong_tan = false;
              this.hongbao.tuan_input_code = "";
              if (token) {
              } else {
                localStorage.setItem("token", res.data.token);
                var newtel = phone.substr(0, 3) + "****" + phone.substr(7);
                localStorage.setItem("tel", newtel);
                localStorage.setItem("old_tel", phone);
                this.$cookies.set("token", res.data.token, "10d");
              }
            } else {
              this.$message.error(res.data.message);
            }
          })
          .catch((error) => {
              if (error.response) {
                console.log(error.response.data);
                this.$message.error(error.response.data.msg);
                console.log(error.response.status);
                console.log(error.response.headers);
              } else {
                console.log(error.message);
              }
          });
      }
    },
    getYanMa_c() {
//        let kk = parseInt(new Date().getTime()/1000)
//       if($cookies.get('time')){
//         let dd = kk-$cookies.get('time')
//         if(dd<60){
//           this.$message.error('不要频繁报名')
//           return
//         }else{
//           $cookies.set('time',kk)
//         }
//       }else{
//         $cookies.set('time',kk)
//       }

      //红包获取验证码
      if (!this.flag) {
        return;
      }
      this.flag = false;
      let that = this;
      var time = 60;
      this.sendTimer = setInterval(function () {
        time--;
        if (time > 0) {
          that.hongbao.yan_text = time + "秒后重送";
        } else if (time == 0) {
          that.flag = true;
          clearInterval(this.sendTimer);
          that.hongbao.yan_text = "获取验证码";
          this.sendTimer = null;
        }
      }, 1000);
      var phone = this.hongbao.tuan_text_tel;
      var ip = ip_arr["ip"];
      if (phone && ip) {
        axios({
          method: "post",
          url: "/send",
          params: {
            phone: phone,
            ip: ip,
            source: 3,
          },
        })
          .then((res) => {
            if (res.data.code == 200) {
               this.$cookies.remove('time')
              this.$message.success(res.data.message);
            } else {
              this.$message.error(res.data.message);
            }
          })
          .catch((error) => {
            if(error.response){
                  console.log(error.response.data);
                  this.$message.error(error.response.data.msg);
                  console.log(error.response.status);
                  console.log(error.response.headers);
              }else{
                console.log(error.message);
              }
          });
      }
    },
         guanTuanTan() {
            this.hongbao.hong_tan = false;
             this.hongbao.hong_tel_flag = true;
            this.hongbao.hong_yan_flag =false;
            },
          youhuiShow(num) {
              sessionStorage.setItem("project_num",num)
              this.hongbao.hong_tan = true;
            },
          lang (e) {
                console.log(e);
                var _this = this;
                // _this.interval = setInterval(function () {
                //     //获取第一个字符
                //     var start = $(".msg").val().substring(0, 1);
                //     //得到后面的字符
                //     var end =$(".msg").val().substring(1);
                //     //重新赋值
                //   $(".msg").val() = end + start;
                // }, 400)
            },
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
      this.lang();
   }
}
</script>
<style lang="less" scoped>
.tejia{
    .tejia_page{
          .bg{
                width: 100%;
                height: 480px;
                position: relative;
                img{
                   position: absolute;
                   left: 50%;
                   transform: translate(-50%,0px);
                }
          }
          .tejia_box{
              width: 1200px;
              height: auto;
              margin: 0 auto;
              //限时优惠抢
              .xianshi_hui{
                 .xianshi_title{
                     width: 1200px;
                     height: 40px;
                     margin-top: 70px;
                    h1{
                        height: 40px;
                        display: flex;
                        float: left;
                        i{
                        font-size: 40px;
                        font-family: "Microsoft YaHei";
                        font-weight: bold;
                        color: #323334;
                        line-height: 40px;
                        float: left;
                        height: 40px;
                        }
                        span{
                        width: 140px;
                        height: 40px;
                        background: #FFF1EF;
                        border: 1px solid #FF5644;
                        border-radius: 4px;
                        font-size: 16px;
                        font-family: "Microsoft YaHei";
                        font-weight: bold;
                        color: #FF5644;
                        line-height: 40px;
                        display: block;
                        text-align: center;
                        margin-left: 20px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        cursor: pointer;
                        img{
                            width:20px ;
                            height: 20px;
                        }
                        }
                    }
                    p{
                        font-size: 16px;
                        font-family: "Microsoft YaHei";
                        font-weight: 400;
                        color: #96989A;
                        float: right;
                        line-height: 40px;
                        cursor: pointer;
                    }
                 }
                  .youhui_list:after{
                        height: 0;
                        content: '';
                        overflow: hidden;
                        visibility: hidden;
                        clear: both;
                        display: block;
                  }
                .youhui_list{
                     width:1220px;
                     margin-top: 50px;
                     li{
                         width: 285px;
                         height: 250px;
                         margin-right: 20px;
                         position: relative;
                         float: left;
                         margin-bottom: 50px;
                       .bg_red{
                        width: 285px;
                        height: 210px;
                        background: linear-gradient(0deg, #F5243E, #FF822E);
                        border-radius: 12px 12px 12px 12px;
                        position: relative;
                        top: 40px;
                        a{
                           color: #5E0808;
                        .top_project{
                            width: 255px;
                            height: 90px;
                            background: linear-gradient(130deg, #FCE4C6, #F0B280);
                            box-shadow: 0px 0px 62px 0px rgba(32, 31, 29, 0.08);
                            border-radius: 16px 16px 0 0;
                            position:absolute;
                            top:-40px;
                            left: 16px;
                            display: flex;
                            .left_pro{
                                padding-left: 20px;
                                width: 215px;
                                h4{
                                font-size: 18px;
                                font-family: "Microsoft YaHei";
                                font-weight: bold;
                                color: #5E0808;
                                line-height: 18px;
                                margin-bottom: 8px;
                                margin-top: 27px;
                                }
                                p{
                                font-size: 14px;
                                font-family: "Microsoft YaHei";
                                font-weight: 400;
                                color: #6D261A;
                                line-height: 14px;
                                }
                            }
                            span{
                                position: absolute;
                                top: 27px;
                                right: 20px;
                            }
                        }
                        .price{
                            font-size: 48px;
                            font-family: "Microsoft YaHei";
                            font-weight: bold;
                            color: #FFFFFF;
                            line-height: 48px;
                            position: absolute;
                            left: 50%;
                            bottom:88px ;
                            transform: translate(-50%);
                            display: flex;
                            span{
                                font-size: 14px;
                                font-family: "Microsoft YaHei";
                                font-weight: 400;
                                color: #F4E1D9;
                                line-height: 14px;
                                transform:rotate(360deg);
                                -ms-transform:rotate(360deg); 	/* IE 9 */
                                -moz-transform:rotate(360deg); 	/* Firefox */
                                -webkit-transform:rotate(360deg); /* Safari 和 Chrome */
                                -o-transform:rotate(360deg); 	/* Opera */
                                width: 16px;
                                display: block;
                                margin-top: 14px;
                            }
                        }
                        }
                        button{
                            width: 140px;
                            height: 36px;
                            background: linear-gradient(130deg, #FCE4C6, #F0B280);
                            border-radius: 18px;
                            font-size: 16px;
                            font-family: "Microsoft YaHei";
                            font-weight: bold;
                            color: #5E0808;
                            line-height: 1px;
                            border: none;
                            outline: none;
                            position: absolute;
                            bottom:24px ;
                            left: 50%;
                            margin-left: -70px;
                            cursor: pointer;
                            outline: none;
                        }
                       }  
                     }
                }
              } 
              .tejia_list{
                 width: 1226px;
                 margin-bottom:60px;
                 h3{
                    font-size: 40px;
                    font-family: "Microsoft YaHei";
                    font-weight: bold;
                    color: #323334;
                    line-height: 40px;
                    margin-top: 30px;
                    margin-bottom: 50px;
                    height: 40px;
                    display: flex;
                    span{
                        font-size: 16px;
                        font-family: "Microsoft YaHei";
                        font-weight: bold;
                        color: #FF5644;
                        width: 156px;
                        height: 40px;
                        background: #FFF1EF;
                        border: 1px solid #FF5644;
                        border-radius: 4px;
                        display: inline-block;
                        text-align: center;
                        margin-left: 20px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        cursor: pointer;
                    }
                 }
                 ul:after{
                     content: "";
                     height: 0;
                     overflow: hidden;
                     clear: both;
                     visibility: hidden;
                     display: block;
                 }
                 ul{
                    .fang_box_one{
                        width: 545px;
                        height: 219px;
                        background: #FFFFFF;
                        border: 1px solid #EEEEEE;
                        box-shadow: 0px 0px 38px 3px rgba(0, 0, 0, 0.03);
                        border-radius: 12px;
                        padding-top: 21px;
                        padding-left: 21px;
                        padding-right: 24px;
                        float: left;
                        margin-right: 20px;
                        margin-bottom: 40px;
                        position: relative;
                       .top_box{
                           display: flex;
                           .img_box{
                                width: 180px;
                                height: 130px;
                                border-radius: 6px;
                                position: relative;
                                margin-right: 24px;
                               img{
                                width: 180px;
                                height: 130px;
                                border-radius: 6px;
                                position: absolute;
                                top: 0px;
                                left: 0px;
                               }
                               span{
                                width: 64px;
                                height: 24px;
                                background: #FF5852;
                                border-radius: 4px 0px 4px 0px;
                                font-size: 14px;
                                font-family:" Microsoft YaHei";
                                font-weight: bold;
                                color: #FFFFFF;
                                display: inline-block;
                                text-align:center;
                                position: absolute;
                                top: 0px;
                                left: 0px;
                                z-index: 200;
                                line-height: 24px;
                               }
                               .bg{
                                    width: 180px;
                                    height: 130px;
                                    background: #000000;
                                    opacity: 0.2;
                                    border-radius: 6px;
                                    position: absolute;
                                    top: 0px;
                                    left: 0px;
                               }
                           }
                           .content_box{
                              h2{
                                font-size: 28px;
                                font-family: "Microsoft YaHei";
                                font-weight: bold;
                                color: #303234;
                                line-height: 28px;
                                img{
                                    width: 79px; 
                                    height: 28px;
                                    position: absolute;
                                    top: 21px;
                                    right: 26px;
                                }
                                em{
                                    font-size: 14px;
                                    font-family: "Microsoft YaHei";
                                    font-weight: 400;
                                    color: #FF5751;
                                    position: absolute;
                                    top:28px;
                                    right: 40px;
                                    line-height: 14px;
                                }
                               
                              } 
                              .price{
                                margin-top: 17px;
                                .yuan{
                                    font-size: 16px;
                                    font-family: "Microsoft YaHei";
                                    font-weight: 400;
                                    color: #969899;
                                    text-decoration: line-through;
                                    margin-right: 11px;
                                    line-height: 16px;
                                    em{
                                        font-size: 24px;
                                        font-weight: bold;
                                    }
                                }  
                                .xian{
                                    font-size: 16px;
                                    font-family: "Microsoft YaHei";
                                    font-weight: 400;
                                    color: #FF5852;
                                    line-height: 16px;
                                    em{
                                         font-size: 24px;
                                         font-weight: bold;
                                    }
                                }
                              }
                              .address{
                                font-size: 16px;
                                font-family: "Microsoft YaHei";
                                font-weight: 400;
                                color: #626466;
                                line-height: 16px;
                                 height: 16px;
                                 margin-top: 14px;
                                 margin-bottom: 12px;
                                span{
                                     border-left:1px solid #96989A;
                                     border-right:1px solid #96989A ;
                                    padding-left: 9px;
                                    padding-right:10px ;
                                    margin-left:9px;
                                    margin-right:10px;
                                    height: 16px;
                                }
                              }
                              .tese{
                                 em{
                                     width: 52px;
                                     height: 24px;
                                     background: #F1F6F9;
                                     border-radius: 3px;
                                    font-size: 16px;
                                    font-family: "Microsoft YaHei";
                                    font-weight: 400;
                                    color: #5AACE5;
                                    line-height: 24px;
                                    display: inline-block;
                                    text-align: center;
                                    margin-right: 9px;
                                 }
                                 span{
                                    font-size: 16px;
                                    font-family: "Microsoft YaHei";
                                    font-weight: 400;
                                    color: #626466;
                                    line-height:16px;
                                    padding:3px 9px;
                                    background: #F5F5F5;
                                    margin-right: 9px;
                                 }
                              }
                           }
                       } 
                       .xiaoxi_box{
                            width: 545px;
                            height: 30px;
                            background: #F8F8F8;
                            margin-top: 28px;
                            .xiaoxi_all{
                                 width: 400px;
                                height: 30px;
                                background: #F8F8F8;
                                display: flex;
                                float: left;
                                img{
                                width: 16px;
                                height: 16px;
                                float: left;
                                margin-top: 8px;
                                margin-left:8px;
                                margin-right: 10px;
                                }
                                .xiaoxi{
                                    li{
                                        font-size: 14px;
                                        font-family: "Microsoft YaHei";
                                        font-weight: 400;
                                        color: #646566;
                                        line-height: 30px;
                                        overflow: hidden;
                                        width: 376px;
                                        height: 30px;
                                    }
                                }
                            }
                            button{
                                width: 94px;
                                height: 32px;
                                background: #FF5852;
                                border-radius: 16px;
                                border: none;
                                font-size: 16px;
                                font-family: "Microsoft YaHei";
                                font-weight: 400;
                                color: #FFFFFF;
                                float: right;
                                cursor: pointer;
                                outline: none;
                            }
                       }
                    }  
                 }
              }
          }
    }
     //红包
      .tuangou_tan{
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.4);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 2000;
        display: block;
        .tuan_box{
          width:380px ;
          height:445px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          span{
             color: #fff;
             position: absolute;
             font-size: 24px;
             right: -30px;
             top: -40px;
             cursor: pointer;
             font-size: 32px;
          }
          .img_box{
            width: 380px;
            height: 445px;
            position: relative;
            .hongbao_tit{
                h1{
                  font-size: 18px;
                  font-weight: 400;
                  color: #FE474E;
                  position: absolute;
                  transform: translate(-50%);
                  left: 50%;
                  top: 34px;
                }
                .youhui{
                  font-size: 23px;
                  font-weight: 400;
                  color: #CC5C39;
                  position: absolute;
                  transform: translate(-50%);
                  line-height: 23px;
                  left: 50%;
                  top: 66px;
                  width: 332px;
                  text-align: center;
                }
                .p01{
                  font-size: 16px;
                  font-family: "Microsoft YaHei";
                  font-weight: 400;
                  color: #656565;
                  line-height: 160px;
                  position: absolute;
                  transform: translate(-50%);
                  left: 50%;
                  top: 226px;
                  line-height: 16px;
                    em{
                      color: #FF4C52;
                    }
                }
            }
              img{
  
              }
              .hong_tel{
                .input_box{
                  width:332px;
                  height:52px;
                  background:rgba(255,255,255,1);
                  box-shadow:0px 5px 12px 0px rgba(178,102,70,0.2);
                  border-radius:6px;
                  position: absolute;
                  bottom: 105px;
                  position: absolute;
                  left: 24px;
                    input{
                        outline: none;
                        width:220px;
                        height:51px;
                        background:rgba(255,255,255,1);
                        box-shadow:0px 5px 12px 0px rgba(178,102,70,0.2);
                        border-radius:6px;
                        font-size:16px;
                        font-family:"Microsoft YaHei";
                        font-weight:400;
                        color:rgba(153,153,153,1);
                        line-height:20px;
                        text-indent: 17px;
                        border: none;
                        float: left;
                    }
                    button{
                      width:110px;
                      height:52px;
                      background:linear-gradient(0deg,rgba(255,198,22,1),rgba(255,235,83,1));
                      box-shadow:0px 1px 1px 0px rgba(6,0,1,0.1);
                      border-radius:0px 6px 6px 0px;
                      outline: none;
                      font-size:16px;
                      font-family:"Microsoft YaHei";
                      font-weight:400;
                      color:#FF3A22;
                      line-height:52px;
                      float: right;
                      border: none;
                      cursor: pointer;
                    }
                }
                p{
                  font-size:14px;
                  font-family:"Microsoft YaHei";
                  font-weight:400;
                  color:#FFCED2;
                  line-height:18px;
                  text-align: center;
                }
                .p02{
                  text-align: center;
                  position: absolute;
                  bottom: 54px;
                  width: 325px;
                  left: 50%;
                  margin-left: -162px;
                }
                .p03{
                  text-align: center;
                  position: absolute;
                  bottom: 12px;
                  left: 50%;
                  margin-left: -98px;
                }
              }
              
              .hong_yan{
                  .yanzheng{
                    font-size: 14px;
                    font-family: "Microsoft YaHei";
                    font-weight: 400;
                    color: #FFCED2;
                    line-height: 30px;
                    position: absolute;
                    line-height: 14px;
                    bottom: 149px;
                    transform: translate(-50%);
                    left: 50%;
                    width: 332px;
                    text-align: center;
                  }
                  .input_box{
                    width:332px;
                    height:42px;
                    background: #FFFFFF;
                    box-shadow: 1px 5px 12px 0px rgba(178, 103, 70, 0.14);
                    border-radius: 6px;
                    position: absolute;
                    bottom: 93px;
                    position: absolute;
                    left: 24px;
                    padding-top: 3px;
                    padding-right: 3px;
                      input{
                          outline: none;
                          width:225px;
                          height:38px;
                          background:rgba(255,255,255,1);
                          font-size:16px;
                          font-family:"Microsoft YaHei";
                          font-weight:400;
                          color:rgba(153,153,153,1);
                          line-height:38px;
                          text-indent: 17px;
                          border: none;
                          float: left;
                      }
                      button{
                        width: 102px;
                        height: 38px;
                        background: #FFE040;
                        border-radius: 4px;
                        box-shadow:0px 1px 1px 0px rgba(6,0,1,0.1);
                        outline: none;
                        font-size:16px;
                        font-family:"Microsoft YaHei";
                        font-weight:400;
                        color:#FF3A22;
                        line-height:38px;
                        float: right;
                        border: none;
                        cursor: pointer;
                      }
                  }
                  .queren{
                    width: 330px;
                    height: 44px;
                    background: linear-gradient(0deg, #FFC616, #FFEB54);
                    box-shadow: 1px 1px 1px 0px rgba(6, 0, 1, 0.1);
                    border-radius: 6px;
                    font-size: 16px;
                    font-family: "Microsoft YaHei";
                    font-weight: 400;
                    color: #FF3A22;
                    line-height: 44px;
                    border: none;
                    position: absolute;
                    left: 50%;
                    transform: translate(-50%);
                    bottom: 37px;
                  }
                  .tip{
                    font-size: 14px;
                    font-family: "Microsoft YaHei";
                    font-weight: 400;
                    color: #FFCED1;
                    line-height: 12px;
                    position: absolute;
                    left: 50%;
                    transform: translate(-50%);
                    bottom: 13px;
                    width: 200px;
                    text-align: center;
                  }

              }
             
          }
        }
      }
}
</style>
