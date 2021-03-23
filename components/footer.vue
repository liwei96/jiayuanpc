<template>
   <div class="footer_new">
           <div class="footer_cen">
              <div class="fot_top">
                  <div class="biao_top">
                      <ul class="search_sel">
                        <li @mouseover="qieSou(1)"  :class="{active:foot_color.cor1}">热门城市</li>
                        <li @mouseover="qieSou(2)"  >热门搜索</li>
                        <li @mouseover="qieSou(3)"  >友情链接</li>
                     </ul>
                     <span >购房热线 : {{this._props.footer_tel.replace(",","转")}}</span>
                  </div>
                  
                     <div class="my_city">
                      <ul v-show="foot_color.cor1">
                        <li  v-for="item in this._props.c_zhi_citys" :key="item.id" @click="selCity(item)">{{item.city}}</li>
                      </ul>
                      <ul v-show="foot_color.cor2">
                          <li  v-for="item in this._props.c_hot_search" :key="item.id" ><nuxt-link :to="`/content/${item.id}`">{{item.name}}</nuxt-link></li>
                      </ul>
                      <ul v-show="foot_color.cor3">
                          <a  v-for="item in this._props.c_friendlink" :key="item.id" :href="item.link">{{item.title}}</a>
                      </ul>
                    </div>

              </div>
              <div class="fot_boot">
                  <div class="left_sou">
                     <ul>
                           <nuxt-link to="/we/aboutus" target="_blank">关于我们</nuxt-link>
                           <li  @click="gojoin">诚聘英才</li>
                           <nuxt-link to="/join" target="_blank">城市加盟</nuxt-link>
                           <nuxt-link to="/baike?type=56&page=1" target="_blank">买房百科</nuxt-link>
                           <nuxt-link to="/fangzi/46/1" target="_blank">房产资讯</nuxt-link>
                           <nuxt-link to="/we/fuwu" target="_blank">服务协议</nuxt-link>
                           <nuxt-link to="/we/yinsi" target="_blank">隐私保护</nuxt-link>
                           <nuxt-link to="/we/advise" target="_blank">投诉建议</nuxt-link>
                           <li  @click="youLian">申请友情链接</li>
                     </ul>
                     <p class="bot_p" v-if="this.$store.state.style_mine==0">Copyright © 2017 - 2022 杭州亚汉网络科技有限公司版权所有 <a href="https://beian.miit.gov.cn">浙ICP备19015909号-1</a></p>
                       <p class="bot_p" v-if="this.$store.state.style_mine==1">Copyright © 2017 - 2022 杭州易得房科技有限公司版权所有 <a href="https://beian.miit.gov.cn">浙ICP备18057005号-1</a></p>
                  </div>
                  <div class="gong_ma">
                     <img src="~/assets/two.png" alt="">
                     <p>扫一扫公众号</p>
                  </div>
              </div>
           </div>
          
           <!-- 申请友情链接 -->
            <transition  name="slide-fade">
                <div class="youqing_box" v-show="youTan">
                    <div class="youqing">
                        <div class="you_top">
                            <h5>友情链接申请</h5>
                            <i class="iconfont iconchahao" id="fan_close" @click="youTan=!youTan"></i>
                        </div>
                        <div class="you_con">
                          <div class="form_box">
                              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                                    <el-form-item label="链  接  名：" prop="name">
                                      <el-input v-model="ruleForm.name" placeholder="请输入链接名"></el-input>
                                    </el-form-item>
                                    <el-form-item label="链接地址：" prop="region">
                                      <el-input placeholder="请输入链接地址" v-model="ruleForm.region">
                                      </el-input>
                                    </el-form-item>
                                  
                                  <el-form-item label="联系号码：" prop="tel">
                                      <el-input placeholder="请输入联系号码" v-model="ruleForm.tel">
                                      </el-input>
                                    </el-form-item>
                                
                                    <el-form-item label="申请说明：" prop="shuoming">
                                      <el-input type="textarea" v-model="ruleForm.shuoming"></el-input>
                                  </el-form-item>
                                  
                                    <el-form-item>
                                      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                                    </el-form-item>
                                  </el-form>
                          </div>
                          <div class="rig_shen">
                              <h4>申请说明：</h4>
                              <p> 有意与本站交换链接的网站请注意：</p>
                              <p>1、贵网站要求为房产相关网站；</p>
                              <p>2、首页友情链接，要求pr 不小于 2，alexa 小于 100万；其他页面链接根据具体页面而定（请具体咨询）；</p>
                              <p>3、贵网站要在百度、google都有记录收录，且网站各项SEO指标健康。</p>
                          </div>
                        
                        </div>
                    </div>
                </div>
            </transition>     
    </div>

</template>

<script>
import axios from 'axios';
//import bus  from '../../assets/js/center.js';
export default {
     props:['c_zhi_citys','c_hot_search','c_friendlink',"footer_tel"],
     data(){
       var checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'));
        } else {
          const reg = /^1\d{10}$/
         // console.log(reg.test(value));
          if (reg.test(value)) {
            callback();
          } else {
            return callback(new Error('请输入正确的手机号'));
          }
        }
      };
      // var checkWang = (rule, value, callback) => {
      //   if (!value) {
      //     return callback(new Error('网址不能为空'));
      //   } else {
      //     // const ceshi = 	/^([a-zA-Z]\:)(\\[^\\/:*?<>"|]*(?<![ ]))*(\.[a-zA-Z]{2,6})$/   ;    //eslint-disable-line
      //     const ceshi = 	/^\S+$/   ;    //eslint-disable-line

      //     console.log(value);
      //     console.log(ceshi.test(value));
      //     if (ceshi.test(value) ) {
      //       callback();
      //     } else {
      //       return callback(new Error('请输入正确的网址'));
      //     }
      //   }
      // };
       return{
         youTan:false,
         ruleForm: {
          name: '',
          region: '',
          tel: '',
          shuoming: '',
         
        },
        rules: {
          name: [
            { required: true, message: '请输入链接名', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, trigger: 'blur',message: '请输入链接地址' }
          ],
          tel: [
            { required: true, trigger: 'blur', validator:checkPhone}
          ],
          shuoming: [
            {  required: false, message: '请填写申请说明', trigger: 'blur' }
          ],
        },
         com_tel:'',
        //新版底部数据
        foot_color:{
              cor1:true,
              cor2:false,
              cor3:false,
        },
        zhi_citys :[],
        hot_search:[],
        friendlinks:[],
        friendlink:[],
       }
     },
     methods:{
       gojoin(){
         if(this.$store.state.style_mine==0){
           window.location.href="http://recruit.edefang.net?type=1&active=2&host=1&city="+this.$store.state.city_id
         }else{
           window.location.href="http://recruit.edefang.net?type=1&active=2&host=3&city="+this.$store.state.city_id
         }
       },
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
                var city=sessionStorage.getItem('city_id');
              axios.post('/api/suggest/friendlink',{
                  title:this.ruleForm.name,
                  link:this.ruleForm.region,
                  tel:this.ruleForm.tel,
                  remark:this.ruleForm.shuoming,
                  site:2,
                  city:city,
              }).then(res=>{
                   if(res.data.code==200){
                        this.youTan=false;
                        this.$message(res.data.message);
                   }else{
                       this.$message(res.data.message);
                   }
              })
            } else {
            //  console.log(res.data.message);
            

              return false;
            }
          });
        }, 
        youLian(){
            this.youTan =true;
        },
        goPage(num){
            // console.log(num);
              switch (num) {
                case 1:
                   this.$router.push('/');
                break;
                  case 2:
                   this.$router.push('/xinfang');
                break;
                  case 3:
                   this.$router.push('/baike?type=56&page=1');
                break;
                  case 4:
                   this.$router.push('/news/46/1');
                break;
                   case 5:
                   this.$router.push('/join');
                break;
                   case 6:
                   this.$router.push('/we/aboutus');
                break;
                   case 7:
                   this.$router.push('/we/fuwu');
                break;
                   case 8:
                  
                break;
              }
        },
        getData(){
            axios.post('/api/common/head_foot',{
                  token:localStorage.getItem('token'),
                  ip:this.$cookies.get('ip'),
                  platform:1,
                  city:sessionStorage.getItem('city_id'),
              }).then(res=>{
                   if(res.data.code==200){
                         var res4 = res.data.data;
                          this.zhi_citys=res4.cities;
                          this.hot_search=res4.hot_search;
                          this.friendlink=res4.friendlinks;
                   }else{
                       this.$message(res.data.message);
                   }
              })
        },
         qieSou(num){
            if(num==1){
                this.foot_color.cor1=true;
                this.foot_color.cor2=false;
                this.foot_color.cor3=false;
            }else if(num==2){
                this.foot_color.cor1=false;
                this.foot_color.cor2=true;
                this.foot_color.cor3=false;
            }else if(num==3){
                this.foot_color.cor1=false;
                this.foot_color.cor2=false;
                this.foot_color.cor3=true;
            }
         },
         selCity(item) {
                sessionStorage.setItem("city_name", item.city);
                this.$cookies.set("city_id", item.area_id);
                sessionStorage.setItem("city_id", item.area_id);
                this.city_name = item.city;
                if (!item.area_id) {
                  item.area_id = 1;
                }
                let pinyin = item.pinyin;
                let uuid = this.$route.query.uuid;
                console.log(uuid,'uuid_footer');
                let  mine = this.$store.state.style_mine;
                if(mine==0){
                    if(uuid && uuid!==undefined && uuid!==null && uuid!=="undefined"){
                        if (pinyin !== "") {
                          window.location.href = "http://" + pinyin + ".jy1980.com?uuid="+uuid;
                        }
                    }else{
                        if (pinyin !== "") {
                          window.location.href = "http://" + pinyin + ".jy1980.com";
                        }
                    }
                }else if(mine==1){
                     if(uuid && uuid!==undefined && uuid!==null && uuid!=="undefined"){
                        if (pinyin !== "") {
                          window.location.href = "http://" + pinyin + ".edefang.net?uuid="+uuid;
                        }
                    }else{
                        if (pinyin !== "") {
                          window.location.href = "http://" + pinyin + ".edefang.net";
                        }
                    }
                }

              
              
         },
     },
       beforeCreate(){
        // bus.$on('tel_com',(num)=>{
        //     this.com_tel=num;
        // })
    },
     mounted(){
          var tel=sessionStorage.getItem('telphone_com');
          this.com_tel=tel;
          console.log( this.$store.state.com_all_tel);
        //  this.getData();
          //console.log(this._props.c_zhi_citys);
         // console.log(this.$store.state.com_all_tel,tel)
     }

}
</script>

<style lang="less" scoped>
 .footer_new{
      width: 100%;
      height: 320px;
      background:#2E2E2E;
        .footer_cen{
             width: 1200px;
             height: 320px;
             margin: 0 auto;
             .fot_top{
                 height: 137px;
                 width: 1200px;
                 padding-top: 30px;
                 border-bottom: 1px solid rgba(64,64,64,1);
                .biao_top{
                    height: 40px;
                    width: 1200px;
                    margin-bottom: 25px;
                   .search_sel{
                      li{
                        width:120px;
                        height:40px;
                        background:rgba(36,36,36,1); 
                        font-size:16px;
                        font-family:"Microsoft YaHei";
                        font-weight:400;
                        color:rgba(204,204,204,1);
                        line-height:40px ;
                        text-align: center;
                        float: left;
                        margin-right: 20px;
                        cursor: pointer;
                      } 
                      .active{
                          background: #808080;
                          color: #2E2E2E;
                      }
                      li:hover{
                          background: #808080;
                          color: #2E2E2E;
                      }
                  }  
                  span{
                     font-size:22px;
                     font-family:"Microsoft YaHei";
                     font-weight:400;
                     color:rgba(204,204,204,1); 
                     float: right;
                  }
                }
                .my_city{
                   width: 1200px;
                   height: 26px;
                    li{
                     font-size:14px;
                     font-family:"Microsoft YaHei";
                     font-weight:400;
                     color:rgba(153,153,153,1);
                     line-height:26px;
                     float: left;
                     margin-right: 10px;
                     cursor: pointer;
                    }
                    a{
                      font-size:14px;
                      font-family:"Microsoft YaHei";
                      font-weight:400;
                      color:rgba(153,153,153,1);
                      line-height:26px;
                      float: left;
                      margin-right: 10px;
                      cursor: pointer;
                     }
                }
                 
             }
             .fot_boot{
                  .left_sou{
                     float: left;
                     margin-top: 35px;
                     ul{
                        height: 14px;
                        margin-bottom: 25px;
                        li{
                        font-size:14px;
                        font-family:"Microsoft YaHei";
                        font-weight:400;
                        color:rgba(153,153,153,1); 
                        float: left;
                        padding-left:15px;
                        padding-right:17px;
                        border-right:1px solid #666666 ;
                        cursor: pointer;
                        line-height: 14px;
                        }
                        a{
                          font-size:14px;
                          font-family:"Microsoft YaHei";
                          font-weight:400;
                          color:rgba(153,153,153,1); 
                          float: left;
                          padding-left:15px;
                          padding-right:17px;
                          border-right:1px solid #666666 ;
                          cursor: pointer;
                          line-height: 14px;
                        }
                        li:first-child{
                             padding-left: 0px;
                        }
                        li:last-child{
                             border-right: 0px;
                        }
                        a:first-child{
                          padding-left: 0px;
                        }
                        a:last-child{
                              border-right: 0px;
                        }
                       a:hover{
                            font-weight: bold;
                            color: #E6E6E6;
                        }
                     }
                     p{
                        font-size:14px;
                        font-family:"Microsoft YaHei";
                        font-weight:400;
                        color:rgba(153,153,153,1);
                     }
                     .bot_p{
                        margin-top: 8px;
                        a{
                          text-decoration: underline;
                           color:rgba(153,153,153,1);
                        }
                     }
                  }
                  .gong_ma{
                       float: right;
                       width: 98px;
                       height: 150px;
                       img{
                          width:96px;
                           height:96px; 
                           margin-top: 13px;
                       }
                       p{
                           font-size:14px;
                           font-family:"Microsoft YaHei";
                           font-weight:400;
                           color:rgba(204,204,204,1);
                           text-align: center;
                       }
                  }
             }
        } 
  

        //友情链接申请
        .el-button--primary{
            color: #FFF;
            background-color: #409EFF;
            width: 360px;
            height: 32px;
            background: linear-gradient(270deg,rgba(102,207,255,1),rgba(76,181,255,1));
            box-shadow: 0px 5px 10px 0px rgba(73,159,245,0.2);
            border-radius: 4px;
            line-height: 32px;
            padding: 0;
            border:none;
        }
        .youqing_box{
                  width:100%;
                  height:100%;
                  background:rgba(0,0,0,0.4);
                  position: fixed;
                  top:0;
                  left:0;
                  z-index:2000;
                  display:block;
                  cursor:pointer;
                  
                .youqing{
                  width:900px;
                  height:460px;
                  background:rgba(255,255,255,1);
                  border-radius:6px; 
                  position:absolute;
                  top:50%;
                  left:50%;
                  transform: translate(-50%,-50%); 
                  .you_top {
                        width:900px;
                        height:60px;
                        position:relative;
                        margin:0 auto;
                        background:#fff;
                        border-radius:6px 6px 0 0 ;
                        h5{
                        width:800px;
                        height:60px;
                        font-size:16px;
                        font-family:"Microsoft YaHei";
                        font-weight:400;
                        color:rgba(64,162,244,1);
                        line-height:60px;
                        text-align:center;
                        margin:0 auto;
                        border-bottom:1px solid #F5F5F5;
                        }
                        i{
                        position:absolute;
                        right:14px;
                        top:14px;
                        font-size: 18px;
                        color:#B3B3B3;
                        }
                    }

                    .you_con{
                      padding-left:27px;
                      padding-right:52px;
                      padding-top:27px;
                        .form_box{
                            float:left;
                            margin-right:40px;
                            .tel{
                              width:250px;
                              height:44px;
                              background:rgba(255,255,255,1);
                              border:1px solid rgba(237,237,237,1);
                              border-radius:2px;
                              margin-top:30px;
                              text-indent:1em;
                              color:#808080;
                              font-size:16px;
                            }
                            .yan{
                              width:250px;
                              height:44px;
                              background:rgba(255,255,255,1);
                              border:1px solid rgba(237,237,237,1);
                              border-radius:2px;
                              margin-top:23px;
                              input{
                                width:150px;
                                height:41px;
                                float:left;
                                border:none;
                                color:#808080;
                                font-size:16px;
                                text-indent:1em;
                              }
                              span{
                                color:#5AC2FF;
                                font-size:14px;
                                padding:5px 9px ;
                                border:1px solid #66CFFF;
                                display:inline-block;
                                  float:left;
                                  margin-top:7px;
                              }
                            }
                            .fan_btn{
                                width:250px;
                                height:44px;
                                background:linear-gradient(270deg,rgba(102,207,255,1),rgba(76,181,255,1));
                                border-radius:2px;
                                font-size:16px;
                                color:#fff;
                                border:none;
                                margin-top:24px;
                            }
                        }
                        .rig_shen{
                            // float:left; 
                            h4{
                              font-size:14px;
                              font-family:"Microsoft YaHei";
                              font-weight:bold;
                              color:rgba(46,48,51,1);
                              line-height:36px;
                            }
                            p{
                                font-size:14px;
                                font-family:"Microsoft YaHei";
                                font-weight:400;
                                color:rgba(145,148,153,1);
                                line-height:28px;
                            }
                        }
                        img{
                          float:right;
                          width:182px;
                          height:208px;
                          margin-top:17px;
                        }


                    }

                }
                  
        }


 }

</style>