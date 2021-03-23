<template>
  <div class="article_page">
    <my-header 
              :all="common.city_info.all"
              :telphone="common.phone"
              ref="header"
              ></my-header>
    <my-mianbao :router_data="routerData"></my-mianbao>
    <div class="artice">
      <div class="left_article">
        <h1>{{article.title}}</h1>
        <p class="time">
          <span class="times">发布时间 :{{article.begin}}</span>
          <span class="liayuan">来源 :{{article.source}}</span>
          <span class="yuedu">阅读  :{{article.visit_num}}</span>
        </p>
        <div class="zhaiyao">
          <span>摘要:</span>
            {{article.description}}
        </div>
        <div class="content" v-html="article.content">
         
        </div>
        <p class="biaoqian" v-if="article.tags.length>0">
          标签：
          <span v-for="item in article.tags" :key="item">{{item}}</span>
        </p>
        <!-- 单个项目 -->
        <div class="pro_box" v-if="project.length!==0">
          <img :src="project.img" alt />
          <div class="lou_xinxi">
            <h3>
              {{project.name}}
              <span>{{project.state}}</span>
            </h3>
            <p class="price">
              均价
              <span>{{project.price}}</span>元/m²起
            </p>
            <p class="dizhi">{{project.country}}: {{project.address}}</p>
            <p class="tel">{{project.num.replace(',','转')}}</p>
            <p class="more">致电售楼处了解更多</p>
          </div>
          <div class="name_form">
            <span>姓名:</span>
            <input type="text" placeholder="请输入姓名" v-model="name" class="i_name" />
            <br />
            <span>电话:</span>
            <input type="text" placeholder="请输入电话" v-model="phone" maxlength="11" />
            <br />
            <p>
              <el-checkbox v-model="checked"></el-checkbox>我已阅读并同意
              <a @click="goYongxie">《{{logo_text}}用户协议》</a>
            </p>
            <button @click="baoMing(103)">我要报名</button>
          </div>
        </div>

        <!-- 免责声明 -->
        <p class="fuze">
          <span>免责声明：</span>
          凡本站注明 “来自：XXX(非{{logo_text}}网)”的资讯稿件和图片作品，系本站转载自其它媒体，转载目的在于信息传递，并不代表本站赞同其观点和对其真实性负责。
          如有资讯稿件和图片作品的内容、版权以及其它问题的，请联系本站，电话：{{common.phone}}
        </p>
        <div class="zan">
          <span class="zan_btn" @click="getLike">
            <img src="~/assets/icon/nozan.png" alt="" v-if="article.my_like==0">
            <img src="~/assets/icon/haszan.png" alt="" v-if="article.my_like==1">
           点赞
          </span>
          <span class="fen"  @mousemove="saoGongShow" @mouseleave="saoGongHide">
            <em class="el-icon-share"></em>分享
          </span>
           <div class="saoma" v-show="saogong">
            <h5>微信“扫一扫”分享</h5>
            <img :src="fenxiang_url" />
          </div>
        </div>
        <!-- 大家还看了 -->
        <div class="aleady_see">
          <h2>大家还看了</h2>
          <ul>
            <li v-for="item in others" :key="item.id">
              <nuxt-link :to="`/article/${item.id}`">
                <img :src="item.img" alt />
                <div class="content_aleady">
                  <h4>{{item.title}}</h4>
                  <p
                    class="text"
                  >{{item.description}}</p>
                  <p class="time">
                    <span>{{item.time}}</span> 来源：{{item.source}}
                  </p>
                </div>
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
       <!-- 大家还看了 -->
      <div class="right_news">
        <div class="mian_zi">
          <h3>免费咨询</h3>
          <p>对买房有疑问，投资买房会亏损？</p>
          <p>想了解房价行情，投资贷款等</p>
          <p>专业置业顾问帮您解决问题</p>
          <input type="text" placeholder="输入您手机号" 
                  maxlength="11"
                 id="mianzi_phone"
                 v-model="mianzi_phone"/>
          <button @click="tijiaoDong(104)">免费咨询</button>
        </div>
        <!-- 热点新闻10条 -->
        <div class="hot_news">
          <h3>楼盘导购 <span>
            <nuxt-link to="/fangzi/46/1">更多></nuxt-link>
            </span></h3>
          <ul>
            <li v-for="item in guides" :key="item.id">
              <nuxt-link :to="`/article/${item.id}`">{{item.title}}</nuxt-link>
            </li>
          </ul>
        </div>
        <!-- 推荐楼盘 -->
        <div class="tui_lou">
          <h2>推荐楼盘</h2>
          <ul>
            <li v-for="item in buildings" :key="item.id">
              <nuxt-link :to="`/content/${item.id}`">
                  <img :src="item.img" alt />
                  <div class="project_content">
                    <h3>{{item.name}}</h3>
                    <p class="jiage">{{item.price}}元/m²起</p>
                    <p class="jian_mian">建面 {{item.area}}m²</p>
                    <p class="address">{{item.address}}</p>
                  </div>
              </nuxt-link>
            </li>
          </ul>
          <button>
            <nuxt-link to="/searchpro">更多楼盘
            </nuxt-link></button>
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

     <!-- 图形验证码弹框 -->
      <div class="loginyan" v-show="tuYanFlag">
        <slide-verify
          :w="310"
          :h="255"
          @success="onSuccess"
          @fail="onFail"
          @refresh="onRefresh"
          :slider-text="textt"
          :imgs="imgs"
          ref="slideblock"
        ></slide-verify>
        <div class="massage">{{msg}}</div>
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
import mianbao from "~/components/mianbaoZi.vue";
import footer from '~/components/footer.vue';
import axios from 'axios';
import tuyanMa from "~/components/tuyan.vue";
import $ from 'jquery';
import img1 from "~/assets/b1.jpg";
import img2 from "~/assets/b2.jpg";
import img3 from "~/assets/b3.jpg";
import img4 from "~/assets/b4.jpg";
import img5 from "~/assets/b5.jpg";
import img6 from "~/assets/b6.jpg";

export default {
    middleware: 'metaTitle',
    meta: {title: '单个文章'},
    head() {
    return {
      title:this.common.header.title ,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.common.header.description 
        },
        { hid: "Keywords", name: "Keywords", content: this.common.header.keywords }
      ]
    };
  },
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
  components: {
    "my-header": header,
    "my-mianbao": mianbao,
    "my-footer" :footer,
    "my-tu-yan": tuyanMa,
  },
  async asyncData({ app, query, params, store }) {
      let id=  params.id;
      let uuid  = query.uuid;
      if(uuid && uuid!=="undefined" && uuid!=="null"){
          uuid =uuid;
      }else{
          uuid ='';
      }
      let [data] = await Promise.all([
        //参数
        // city 城市id
        // id 文章id
        // token 
        app.$axios.get(`/jy/article/detail?id=${id}&city=${store.state.city_id}&token=${store.state.token}&uuid=${uuid}`).then((res) => {
          if (res.data.code == 200) {
            let data = res.data;
            return data;
          }
        }),
      ]);
       return{
          article:data.article,
          project:data.project,
          common:data.common,
          buildings:data.buildings,
          guides:data.guides,
          others:data.others,
          current_city : data.common.city_info.current
       }
    },
  data() {
    return {
      phone: "",
      name: "",
      checked: true,
      article:{},
      project:{},
      common:{},
      buildings:[],
      guides:[],
      others:[],
      saogong:false,
      mianzi_phone:'',
      myremark:'',
      fenxiang_url:'',
      routerData:[],
       tuYanFlag: false,
       //图形验证码
      msg: "", 
      imgs: [img1, img2, img3, img4, img5, img6],
      textt: "向右滑",
      logo_text:"家园",

      current_city:{}
    };
  },
  methods:{
      getWidth(){ 
        //跳转手机端  
          let host = window.location.host;
          let city_current = this.current_city;
          let width=document.body.clientWidth;
            window.onresize=()=>{
                if(width<490){
                      if(host.indexOf('www.jy1980.com') != -1){
                          window.location.href="http://m.jy1980.com/"+city_current.pinyin+"/info/"+this.$route.params.id
                      }else if(host.indexOf('www.edefang.net') != -1){
                          window.location.href="http://mobile.edefang.net/"+city_current.pinyin+"/info/"+this.$route.params.id
                      }else if(host.indexOf(city_current.pinyin+'.jy1980.com') != -1){
                          window.location.href="http://m.jy1980.com/"+city_current.pinyin+"/info/"+this.$route.params.id
                      }else if(host.indexOf(city_current.pinyin+'.edefang.net') != -1){
                          window.location.href="http://mobile.edefang.net/"+city_current.pinyin+"/info/"+this.$route.params.id
                      }
                }
            }

          let liu_width=document.body.clientWidth;
          if(liu_width<490){
                if(host.indexOf('www.jy1980.com') != -1){
                    window.location.href="http://m.jy1980.com/"+city_current.pinyin+"/info/"+this.$route.params.id
                }else if(host.indexOf('www.edefang.net') != -1){
                    window.location.href="http://mobile.edefang.net/"+city_current.pinyin+"/info/"+this.$route.params.id
                }else if(host.indexOf(city_current.pinyin+'.jy1980.com') != -1){
                    window.location.href="http://m.jy1980.com/"+city_current.pinyin+"/info/"+this.$route.params.id
                }else if(host.indexOf(city_current.pinyin+'.edefang.net') != -1){
                    window.location.href="http://mobile.edefang.net/"+city_current.pinyin+"/info/"+this.$route.params.id
                }
          }
    },
    baoMing(parms){
      sessionStorage.setItem("bao_id", parms);
      var pattern = new RegExp("^1[345678]\\d{9}$");
      if(parms==103){
          var tel = this.phone;
          var name = this.name;
        if(this.checked==true){
            if (tel !== "" && name !== "") {
              if (tel == "") {
                this.$message.error("手机号不能为空");
              } else if (!pattern.test(tel)) {
                this.$message.error("请输入正确的手机号");
              } else {
                this.tuYanFlag = true;
              }
            } else {
              this.$message.error("姓名和手机号不能为空");
            }
        }else{
           this.$message.error("请勾选用户协议");
        }
      }else if(parms==104){
          var tel = this.mian_tel;
           if (tel == "") {
                this.$message.error("手机号不能为空");
              } else if (!pattern.test(tel)) {
                this.$message.error("请输入正确的手机号");
              } else {
                this.tuYanFlag = true;
              }
      }
    },
    onSuccess() {
      this.msg = "验证通过";
       var posit = sessionStorage.getItem("bao_id");
       let phone ='';
       let remark= '';
       let name= '';
      if(posit==104){
         phone = this.mian_tel;
         remark = "单个楼盘动态页+免费咨询";
         name = ''
      }else if(posit==103){
          phone = this.phone;
          remark = "文章详情页+我要报名";
          name = this.name
      }

      let ip = ip_arr["ip"];
      var city = sessionStorage.getItem("city_id");
      var token = localStorage.getItem("token");
      var project = this.project.id;
      var posit = sessionStorage.getItem("bao_id");
      var other = sessionStorage.getItem("other");
      var kid = sessionStorage.getItem("kid");
      var pattern = new RegExp("^1[345678]\\d{9}$");
      if (phone == "") {
        this.$message.error("手机号不能为空");
      } else if (!pattern.test(phone)) {
        this.$message.error("请输入正确的手机号");
      } else {
        axios
          .post("/front/flow/sign", {
              tel:phone,
              ip:ip,
              page:10,//、家园PC 必传
              project:project,//  项目id
              city:city, //城市id
              position:posit, //位置（见下面 position位置表格）
              remark:remark, //请填写位置对应的名，如“详细楼盘信息”，如果是咨询详细户型请加上户型名
              source:"线上推广1",
              other:other,
              kid:kid,
              name:name, // 客户姓名，没有就不填
          })
          .then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.message);
              this.tuYanFlag = false;
              //  this.phone = "";
              this.$refs.slideblock.reset();
            } else {
              console.log(res.data.message);
            }

              if(res.data.code==500  && res.data.message=="已成功为您订阅了该服务"){
                      this.$message.success(res.data.message);
                      this.tuYanFlag =false; 
                      this.$refs.slideblock.reset();
              }
          });
      }
    },
    onFail() {
      this.msg = "验证失败";
    },
    onRefresh() {
      this.msg = "";
    },
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
     saoGongHide() {
      this.saogong = false;
    },

     //扫码关注公众号
    saoGongShow() {
          let id='';
          let match = this.$route.params.id.match(/\d+/);
          if(match){
              id= match[0];
              this.project_id = id;
          }
          if(id!==''){
              this.fenxiang_url = `http://ll.edefang.net/api/article/transfer_m?id=${id}`;
              this.saogong= true;
          }
    },
      getdata(){
        let token = localStorage.getItem('token');
         axios.get('/jy/article/detail',{
           params:{
              city:1,
              id:this.article.id,
              token:token
           }
         }).then(res=>{
           if(res.data.code==200){
             this.article = res.data.article;
           }
         })
      },
      goYongxie(){
          this.$router.push("/we/fuwu")
      },
      getLike(){ //文章点赞
             var token = localStorage.getItem("token");
              if (token !== "" && token !==null) {
                axios({
                  method:'post',
                  url:'/jy/article/like',
                  params:{
                      token:token,
                      id:this.article.id
                  }
                })
                  .then((res) => {
                    if (res.data.code == 200) {
                      this.$message.success(res.data.message);
                      this.getdata();
                    } else {
                      this.$message.error(res.data.message);
                      this.$parent.$parent.loginTan = true;
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
              } else {
                this.$message.error("请先登录");
                this.$parent.$parent.loginTan = true;
              }
      }
  },
  mounted() {
     let  token = localStorage.getItem('token');
      let old_tel=localStorage.getItem("old_tel");
      if(token && old_tel){
          this.phone=old_tel;
          this.mianzi_phone =old_tel;
      }else {
      }

     this.myremark = "单个文章页面+免费咨询",
      this.routerData = [
       {
         "name":"房产资讯",
         "to":'/fangzi/46/1'
       },
        {
         "name":`${this.article.title}`,
         "to":''
       },

    ];
  },
  beforeMount(){
       let  mine = this.$store.state.style_mine;
        if(mine==1){ //易得房样式
            this.logo_text = "易得房";
        }else if(mine==2){ //家园样式
           this.logo_text = "家园";
        }
        this.getWidth();
  }
};
</script>

<style lang="less" scoped>
/deep/.content{
   img{
      width: 860px;
      height: auto;
      margin-top: 20px;
   }
}
  /*图形验证二维码*/
    .loginyan {
      margin: 0 auto;
      position: fixed;
      background: rgba(0, 0, 0, 0.4);
      width: 100%;
      height: 100%;
      top: 0px;
      left: 0px;
      z-index: 1000;
      #slideVerify {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -155px;
        margin-top: -130px;
      }
      .massage {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -155px;
        margin-top: 190px;
        color: #fff;
      }
    }

@import "../../../assets/css/article.less";
</style>