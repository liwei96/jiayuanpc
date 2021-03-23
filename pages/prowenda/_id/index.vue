<template>
  <div class="prowenda">
    <my-header 
              :all="common.city_info.all"
              :telphone="common.phone"
              ref="header"
              v-if="common.city_info"></my-header>
    <my-mianbao :router_data="routerData"></my-mianbao>
    <div class="prowendapage">
      <div class="project_name">
       {{building.name}}
        <span>{{building.state}}</span>
        <em>{{building.type}}</em>
      </div>
      <ul class="tedian">
        <li>{{building.decorate}}</li>
        <li v-for="item in building.features" :key="item.id">{{item.value}}</li>
      </ul>
      <div class="nav">
        <ul>
          <li>
            <nuxt-link :to="`/content/${building.id}`">
            楼盘主页
            </nuxt-link>
          </li>
          <li>
            <nuxt-link :to="`/loudetail/${building.id}`">
               楼盘详情
            </nuxt-link>
          </li>
          <li>
            <nuxt-link :to="`/prohuxing/${building.id}`">
               主力户型
            </nuxt-link>
          </li>
          <li>
              <nuxt-link :to="`/prodong/${building.id}?page=1`">
                 楼盘动态
              </nuxt-link>
          </li>
          <li>
             <nuxt-link :to="`/propic/${building.id}`">
               楼盘相册
             </nuxt-link>
          </li>
          <li class="active">
             <nuxt-link :to="`/prowenda/${building.id}?page=1`" >
               楼盘问问
             </nuxt-link>
          </li>
          <li>
            <nuxt-link :to="`/prodian/${building.id}?page=1`">
            楼盘点评
            </nuxt-link>
            </li>
        </ul>
        <span v-if="common.phone">咨询热线：{{common.phone.replace(',','转')}}</span>
      </div>
      <!-- 问答部分 -->
      <div class="wenda_box">
            <div class="wenda_left">
                <ul>
                    <li v-for="item in data" :key="item.id">
                        <h1><nuxt-link :to="`/prowenpage/${item.id}`"><span>问</span>{{item.question}}</nuxt-link></h1>
                        <p class="da">
                            <nuxt-link :to="`/prowenpage/${item.id}`">
                            <span>答</span><em>{{item.answer}}</em>
                            </nuxt-link>
                        </p>
                         <p class="get_wen"  v-if="item.answer.length>110">
                             <nuxt-link :to="`/prowenpage/${item.id}`">
                            查看更多
                             </nuxt-link>
                        </p>
                        <div class="time_box">
                            <p class="time">{{item.time}}<em>相关楼盘：{{item.name}}</em></p>
                            <p class="zan" >
                                    <span v-if="item.answer"><img src="~/assets/icon/ping.png">1回答</span> 
                                    <span v-else><img src="~/assets/icon/ping.png">0回答</span> 
                                    <em v-if="item.my_like==0"  @click="getLikeWen(item.id)"><img src="~/assets/icon/nozan.png">{{item.like_num}}点赞</em>
                                    <em v-if="item.my_like==1"  @click="getLikeWen(item.id)"><img src="~/assets/icon/haszan.png">{{item.like_num}}点赞</em>
                             </p>
                        </div>
                        
                    </li>
                </ul>
                <div class="yema">
                    <el-pagination
                    :hide-on-single-page=true
                    background
                    layout="prev, pager, next"
                    @current-change="pageChange"
                     :current-page.sync="currentPage1"
                    :total="total">
                    </el-pagination>
                </div>
            </div>
            <div class="wenda_right">
              <right-dao :daolist="articles"></right-dao>
              <!-- <right-bao-ming></right-bao-ming> -->
              <div class="yukanfang">
                    <div class="yu_title" :style="bgImg">
                    </div>
                    <div class="form_box">
                          <textarea name="" id="area" cols="30" rows="10" placeholder="输入您不懂的楼盘问题开始问问吧" v-model="tiwen_text"
                           @focus="focusTextarea"></textarea>
                          <p class="xieyi">
                              <input type="checkbox" v-model="checked" class="checkbox"/>
                              <span>我已阅读并同意<em><nuxt-link to="/we/fuwu">《{{logo_text}}用户协议》</nuxt-link></em></span>
                          </p>
                          <button @click="tijiao_tiwen">确定</button>
                    </div>
            </div>

            </div>
      </div>
    </div>
    <my-footer  :c_zhi_citys="common.city_info.all" 
        :c_hot_search="common.hot_search"
        :c_friendlink="common.friend_links"
        :footer_tel="common.phone"></my-footer>
  </div>
</template>
<script>
import header from "~/components/header.vue";
import mianbao from "~/components/mianbao.vue";
import rightdao from "~/components/danpage/xiangdao.vue";
import rightbaoming from "~/components/danpage/yukanfang.vue";
import footer from "~/components/footer.vue";
import axios from 'axios';
export default {
    head() {
    return {
      title:this.common.header.title ,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.common.header.description
        },
        { hid: "Keywords", name: "Keywords", content:this.common.header.keywords }
      ]
    };
  },
  components: {
    "my-header": header,
    "my-mianbao": mianbao,
    "right-dao" :rightdao,
    "right-bao-ming":rightbaoming,
    "my-footer":footer
  },
   watchQuery:['page'],
  validate({ params }) {
    // 必须是number类型
    let match = params.id.match(/\d+/);
    if (match) {
      params.id = match[0];
      return params.id;
    } else {
      return false;
    }
  },
    async asyncData({ app, query, params, store }) {
    // id 项目id
    // other
    // token
     let uuid = query.uuid;
     let  host = store.state.hostname;
      if(uuid && uuid!=="undefined" && uuid!=="null"){
        uuid =uuid;
      }else{
         uuid="";
      }
    let  page = query.page;
    if(page==undefined){
      page=1;
    }
    let [data] = await Promise.all([
      app.$axios.get(`/jy/question/list?token=${store.state.token}&id=${params.id}&page=${page}&uuid=${uuid}&other=${store.state.other}&host=${host}`).then((res) => {
        if (res.data.code == 200) {
          let data = res.data;
          return data;
        }
      }),
    ]);
    return {
       common:data.common,
       building:data.building,
       articles:data.articles,
       total:data.total,
       data:data.data, 
       currentPage1:parseInt(page)
    };
  },
  data() {
    return {
       common:{},
       building:{},
       articles:[],
       total:1,
       data:[],
       currentPage1:1,
      bgImg: {
                backgroundImage: "url(" + require("~/assets/louti.jpg") + ")",
                backgroundRepeat: "no-repeat",
            }, 
      checked:true,
      tiwen_text:'',
      routerData:[],
      logo_text:"家园"
    };
  },
  created() {},
  beforeMount(){
        let  mine = this.$store.state.style_mine;
        if(mine==1){ //易得房样式
            this.logo_text = "易得房";
        }else if(mine==2){ //家园样式
           this.logo_text = "家园";
        }
  },
  mounted(){
       this.$parent.$parent.saoma_telphone = this.common.phone;
       
       this.routerData = [
       {
         "name":`${this.common.city_info.current.city}楼盘`,
         "to":'/searchpro'
       },
       {
         "name":`${this.building.name}`,
         "to":`/content/${this.building.id}`
       },
        {
         "name":`${this.building.name}楼盘问问`,
         "to":''
       }
    ];
  },
  computed: {},
  methods: {
    tijiao_tiwen(){ //提交提问
        let  token = localStorage.getItem('token');
       let  city = sessionStorage.getItem('city_id');
        let input_text = this.tiwen_text;
        if(token){
          if(this.checked==true){
              if(input_text!==''){
                axios({
                    method: "get",
                    url: "/jy/ask",
                    params: {
                      token: token,
                      project:this.building.id,
                      city:city,
                      question:input_text,
                    },
                  }).then(res=>{
                    if(res.data.code==200){
                          this.$alert(res.data.message, "提交成功", {
                            confirmButtonText: "确定"
                          });
                          this.getdata(1);
                    }else{
                        this.$message(res.data.message);
                    }
                  }).catch(error => {
                    console.log(error);
                  });
              }else{
                    this.$message.error("提问内容不能为空");
              }

          }else{
              this.$message.error("请勾选用户协议");
          }
        }else{
             this.$message.error("请先登录");
             this.$parent.$parent.loginTan = true;
        }
    },
    focusTextarea(){
      let token = localStorage.getItem('token');
      if(token){
          
      }else{
           this.$message.error("请先登录");
           this.$parent.$parent.loginTan = true;
      }
    },
      getdata(page){
          var token = localStorage.getItem('token');
          var project = this.$route.params.id;
          let match = project.match(/\d+/);
          project = match[0];
          axios.get('/jy/question/list',{
            params:{
                token:token,
                id:project,
                other:'',
                page:page
            }
          }).then(res=>{
             if(res.data.code==200){
                console.log(res.data);
                this.data =res.data.data;
             }
          })
      },
       pageChange(num){
         this.$router.push(`/prowenda/${this.building.id}?page=${num}`);
       },
       getLikeWen(num){
          var token = localStorage.getItem("token");
          if (token !== "" && token !==null) {
            axios({
              method:'post',
              url:'/jy/question/like',
              params:{
                  token:token,
                  id:num
              }
            })
              .then((res) => {
                if (res.data.code == 200) {
                  this.$message.success(res.data.message);
                  this.getdata(this.$route.query.page);
                } else {
                  this.$message.error(res.data.message);
                  this.$parent.$parent.loginTan = true;
                }
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            this.$message.error("请先登录");
            this.$parent.$parent.loginTan = true;
          }
       }
  },
};
</script>
<style lang="less" scoped>
/deep/
.yema{
    .el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: #20C658;
        color: #FFF;
    }
}
.prowenda {
  .prowendapage {
    width: 1200px;
    height: auto;
    margin: 0 auto;
    .project_name {
      font-size: 28px;
      font-family: "Microsoft YaHei";
      font-weight: bold;
      color: #101214;
      line-height: 52px;
      margin-top: 28px;
      span {
        font-size: 14px;
        font-family: "Microsoft YaHei";
        font-weight: 400;
        color: #ffffff;
        width: 50px;
        height: 24px;
        background: #2ac66d;
        border-radius: 3px;
        display: inline-block;
        text-align: center;
        line-height: 24px;
      }
      em {
        font-size: 14px;
        font-family: " Microsoft YaHei";
        font-weight: 400;
        color: #969799;
        width: 50px;
        height: 24px;
        border: 1px solid #afb0b3;
        border-radius: 3px;
        display: inline-block;
        text-align: center;
        line-height: 24px;
      }
    }
    .tedian {
      width: 1200px;
      height: 28px;
      margin-bottom: 25px;
      li {
        font-size: 14px;
        font-family: "Microsoft YaHei";
        font-weight: 400;
        color: #646566;
        padding: 4px 9px;
        background: #f5f5f5;
        float: left;
        margin-right: 10px;
      }
      li:first-child {
        font-size: 14px;
        font-family: "Microsoft YaHei";
        font-weight: 400;
        color: #4393ff;
        padding: 4px 9px;
        background: #eaf3ff;
        float: left;
      }
    }
    .nav {
      width: 1200px;
      background: #f5f5f5;
      border-radius: 4px;
      height: 44px;
      ul {
        height: 44px;
        float: left;
        width: 930px;
        li {
          font-size: 16px;
          font-family: "Microsoft YaHei";
          font-weight: 400;
          color: #646566;
          line-height: 44px;
          float: left;
          margin-right: 40px;
          a{
              color: #646566;
          }
        }
         .active {
          color: #101214;
          font-weight: bold;
          border-bottom: 3px solid #2ac66d;
          height: 40px;
        }
        li:first-child {
          margin-left: 38px;
        }
      }
      span {
        font-size: 16px;
        font-family: "Microsoft YaHei";
        font-weight: 400;
        color: #000000;
        line-height: 44px;
        float: right;
        margin-right: 21px;
      }
    }
    .wenda_box:after{
        clear: both;
        overflow: hidden;
        visibility: hidden;
        height: auto;
        display:block;
        content:'';
    }
    .wenda_box{
        .wenda_left{
           float: left;
           width: 860px;
           height: auto;
           ul{
               li{
                   border-bottom: 1px solid #EDEDED;
                   padding-bottom: 24px;
                   padding-top: 24px;
                   h1{
                     a{
                       color: #313233;
                     }
                       margin-bottom: 16px;
                    span{
                        width: 20px;
                        height: 20px;
                        background: linear-gradient(-45deg, #FFBF34, #FF903F);
                        border-radius: 6px 0px 6px 0px;
                        font-size: 14px;
                        color: #fff;
                        display: inline-block;
                        text-align: center;
                        margin-right: 16px;
                    }
                     font-size: 16px;

                   }
                   .da{
                       display: flex;
                       a{
                             display: flex;
                      
                       span{
                            width: 20px;
                            height: 20px;
                            background: #2AC66D;
                            border-radius: 6px 0px 6px 0px;
                            font-size: 14px;
                            color: #fff;
                            display: inline-block;
                            text-align: center;
                            margin-right: 16px;
                       }
                       em{
                           font-size: 14px;
                          font-family:" Microsoft YaHei";
                          font-weight: 400;
                          color: #646566;
                          line-height: 22px;
                           display: -webkit-box;
                          -webkit-box-orient: vertical;
                          -webkit-line-clamp: 2;
                          overflow: hidden;
                       }
                       }
                       
                   }
                   .time_box:after{
                     clear: both;
                     overflow: hidden;
                     display: block;
                     content: "";
                     height: 0;
                     visibility: hidden;
                   }
                   .time_box{
                       margin-top: 15px;
                       .time{
                        float: left;
                        font-size: 14px;
                        font-family: "Microsoft YaHei";
                        font-weight: 400;
                        color: #969799;
                        line-height: 20px;
                        margin-left: 36px;
                        em{
                             margin-left: 27px;
                        }
                       }
                       .zan{
                        float: right;
                        font-size: 14px;
                        font-family: "Microsoft YaHei";
                        font-weight: 400;
                        color: #646566;
                        line-height: 20px;
                        span{
                             display: flex;
                            justify-content: center;
                            align-content: center;
                            float: left;
                            margin-right:16px;
                            img{
                              width: 16px;
                              height: 16px;
                              margin-right: 6px;
                            }
                        }
                        em{
                             display: flex;
                            justify-content: center;
                            align-content: center;
                            float: left;
                            cursor: pointer;
                            img{
                              width: 16px;
                              height: 16px;
                              margin-right: 6px;
                            }
                        }
                       
                       }
                   }
                   .get_wen{
                       color: #3EACF0;
                      cursor: pointer;
                      font-size: 14px;  
                      text-align: right;
                      margin-bottom: 7px;
                      a{
                         color: #3EACF0;
                       }
                    }
               }
           }
           .yema{
             margin-top: 50px;
             margin-bottom: 80px;
           }
        }
        .wenda_right{
            float: right;
            width: 340px;
            .about_dao{
                margin-top: 40px;
            }
             .yukanfang{
                width: 300px;
                height: 300px;
                border: 1px solid #EDEDED;
                float: right;
                margin-top: 40px;
              .yu_title{
                width: 300px;
                height: 70px;
                font-size: 18px;
                font-family: "Microsoft YaHei";
                font-weight: bold;
                color: #FFFFFF;
                line-height: 70px;
                background: url("../../../assets/icon2.png") no-repeat;
                h3{
                    font-size: 18px;
                    font-family: "Microsoft YaHei";
                    font-weight: bold;
                    color: #FFFFFF;
                    line-height: 70px;
                    margin-left: 14px;
                }
              }
          .form_box{
            padding-left: 16px;
            padding-right:16px;
            textarea{
             width: 267px;
            height: 80px;
            border: 1px solid #EDEDED;
            outline: none;
            margin-top: 20px;
            font-size: 14px;
            font-family:" Microsoft YaHei";
            font-weight: 400;
            color: #969799;
            line-height: 20px;
            text-indent: 1em;
            padding-top: 10px;
            margin-bottom: 15px;
            }
            .tips{
                font-size: 14px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: #313233;
                line-height: 20px;
                margin-top: 21px;
                margin-bottom: 18px;
            }
            input{
                width: 267px;
                height: 40px;
                border: 1px solid #EDEDED;
                color: #646566;
                font-size: 14px;
                font-weight: 400;
                text-indent: 1em;
            }
            .xieyi{
                float: left;
                display: flex;
                justify-content: center;
                align-items: center;
                input[type="checkbox"] {
                    width: 16px;
                    height: 16px;
                    background-color: #fff;
                    -webkit-appearance: none;
                    border: 1px solid #E8E8E8;
                    border-radius: 3px;
                    outline: none;
                    cursor: pointer;
                    }
                input[type="checkbox"]:checked {
                    background: url("../../../assets/bao_dui.png") no-repeat center;
                }
                .checkbox{
                    margin-right:5px ;
                }
                span{
                    font-size: 12px;
                    font-family: "Microsoft YaHei";
                    font-weight: 400;
                    color: #7A7A7A;
                    line-height: 40px;
                    em{
                        color: #498DE1;
                        font-size: 12px;
                        a{
                          color: #498DE1;
                        }
                    }
                }
              
            }
            button{
                width: 267px;
                height: 40px;
                border: 1px solid #EDEDED;
                font-size: 16px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: #FFFFFF;
                line-height: 20px;
                background: #FF9A26;
                outline: none;
                margin-top: 5px;
            }
          }
    }

        }
    }
  }
}
</style>
