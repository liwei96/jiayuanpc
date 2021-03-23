<template>
  <div class="prodian">
    <my-header
      :all="common.city_info.all"
      :telphone="common.phone"
      ref="header"
    ></my-header>
    <my-mianbao :router_data="routerData"></my-mianbao>
    <div class="prodianpage">
      <div class="project_name">
        {{ building.name }}
        <span>{{ building.state }}</span>
        <em>{{ building.type }}</em>
      </div>
      <ul class="tedian">
        <li>{{ building.decorate }}</li>
        <li v-for="item in building.features" :key="item.id">
          {{ item.value }}
        </li>
      </ul>
      <div class="nav">
        <ul>
          <li>
            <nuxt-link :to="`/content/${building.id}`">楼盘主页</nuxt-link>
          </li>
          <li>
            <nuxt-link :to="`/loudetail/${building.id}`">楼盘详情</nuxt-link>
          </li>
          <li>
            <nuxt-link :to="`/prohuxing/${building.id}`">主力户型</nuxt-link>
          </li>
          <li>
            <nuxt-link :to="`/prodong/${building.id}?page=1`"
              >楼盘动态</nuxt-link
            >
          </li>
          <li>
            <nuxt-link :to="`/propic/${building.id}`">楼盘相册</nuxt-link>
          </li>
          <li>
            <nuxt-link :to="`/prowenda/${building.id}?page=1`"
              >楼盘问问</nuxt-link
            >
          </li>
          <li class="active">
            <nuxt-link :to="`/prodian/${building.id}?page=1`"
              >楼盘点评</nuxt-link
            >
          </li>
        </ul>
        <span>咨询热线：{{ common.phone.replace(",", "转") }}</span>
      </div>
      <!-- 楼盘点评 -->
      <div class="loudian">
        <div class="left_loudian">
          <div class="title">
            <h3>热门点评</h3>
            <span @click="textDianPing"><i class="iconfont icondahuifu"></i>我要点评</span>
          </div>
          <ul>
            <li class="ping" v-for="item in data" :key="item.id">
              <nuxt-link :to="`/loudianpage/${item.id}`">
                <img src="~/assets/content_pro.png" alt="" class="head_img" />
              </nuxt-link>
              <div class="ping_text">
                <div class="user_name">
                  <nuxt-link :to="`/loudianpage/${item.id}`">
                    {{ item.name }}
                    <el-rate
                      v-model="item.score"
                      disabled
                      :colors="['#F1C25E', '#F1C25E', '#F1C25E']"
                    ></el-rate>
                  </nuxt-link>
                </div>
                <p class="pinglun">
                  <nuxt-link :to="`/loudianpage/${item.id}`">
                    {{ item.content }}
                  </nuxt-link>
                </p>
                <div class="time">
                  <span class="left_time"
                    >{{logo_text}}新房 {{ item.time }}
                    <em v-if="item.mine == 1" @click="delatePing(item.id)">删除</em></span
                  >
                  <div class="zan">
                    <span
                       @click="huiFu(item.id)"><img src="~/assets/icon/ping.png" />{{
                        item.children.length
                      }}</span
                    >
                    <em v-if="item.my_like == 0"
                    @click="getLike(item.id)"
                      ><img src="~/assets/icon/nozan.png" />{{
                        item.like_num
                      }}</em
                    >
                    <em v-if="item.my_like == 1"
                      @click="getLike(item.id)"
                      ><img src="~/assets/icon/haszan.png" />{{
                        item.like_num
                      }}</em
                    >
                  </div>
                </div>
                 <!-- <div
                  class="huifu"
                  v-for="ite in item.children"
                  :key="ite.id"
                >
                <span>{{ ite.name }}</span> 
                <p>{{ ite.content }}</p>
                 </div> -->

              </div>
            </li>
          </ul>
           
          <div class="bao_box">
            <p>{{this.text}}</p>
            <div class="bao_input">
              <input type="text" placeholder="请输入您的手机号" maxlength="11" v-model="bottom_telphone" id="phone_bot"/>
              <button @click="tijiaoDong(104)">免费咨询</button>
            </div>
         </div> 


        </div>
        <div class="right_loudian">
          <right-dao :daolist="articles"></right-dao>
          <right-bao-ming :img_bg="bgImg" :text_tishi="text" ref="right_bao"></right-bao-ming>
        </div>
      </div>

      <!-- 楼盘点评弹框 -->
      <div class="fan_tan_dian" v-show="dian_tan.dianPingFlag">
        <div class="fan_tel">
          <div class="fan_top">
            <h2>楼盘点评</h2>
            <div class="guan" @click="closePing">
              <i class="iconfont iconchahao" id="fan_close"></i>
            </div>
          </div>

          <div class="fan_con">
            <div class="fen_tit">
              <p class="quest">您看过该楼盘吗？</p>
              <ul>
                <li
                  @click="selTaidu"
                  :data-v="item.id"
                  :class="item.id == dian_tan.num ? 'active' : ''"
                  v-for="item in dian_tan.taidu"
                  :key="item.id"
                >
                  {{ item.name }}
                </li>
              </ul>
            </div>
            <div class="ping_fen">
              <p class="zong">楼盘评价</p>
              <div class="star">
                <el-rate v-model="dian_tan.values" show-text> </el-rate>
              </div>
            </div>
            <el-input
              type="textarea"
              placeholder="这个楼盘怎么样？我来说两句"
              v-model="dian_tan.textarea"
              maxlength="50"
              show-word-limit
            >
            </el-input>

            <input
              type="button"
              class="fan_btn"
              value="发表"
              @click="submitPing"
            />
          </div>
        </div>
      </div>

      <!-- 楼盘点评回复弹框 -->
      <div class="fan_tan_hui" v-show="dPingFlag">
        <div class="fan_tel">
          <div class="fan_top">
            <h2>点评回复</h2>
            <i class="iconfont iconchahao" @click="closePinglun"></i>
          </div>
          <div class="fan_con">
            <textarea
              type="text"
              placeholder="请在这里输入您的回复"
              class="fan_kuang"
              v-model="content_hui"
            ></textarea>
            <input
              type="button"
              class="fan_btn"
              value="发表"
              @click="tiJiaoPing"
            />
          </div>
        </div>
      </div>


      <!-- 图形验证码弹框 -->
        <div class="loginyans" v-show="tuYanFlags">
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
          <div class="massage">{{ msg }}</div>
        </div>


       <my-tu-yan ref="imgyan"
            :point="103 "
            :project_id="this.building.id"
            :name="''" 
            :myremark="myremark"
            :myphone="this.telphone"
         ></my-tu-yan>

    </div>
    <my-footer
      :c_zhi_citys="common.city_info.all"
      :c_hot_search="common.hot_search"
      :c_friendlink="common.friend_links"
      :footer_tel="common.phone"
    ></my-footer>
  </div>
</template>
<script>
import header from "~/components/header.vue";
import mianbao from "~/components/mianbao.vue";
import rightdao from "~/components/danpage/xiangdao.vue";
import rightbaoming from "~/components/danpage/yukanfang.vue";
import bottombaoming from "~/components/danpage/baomingkuang.vue";
import footer from "~/components/footer.vue";
import axios from 'axios';
import $ from 'jquery';
import tuyanMa from "~/components/tuyan.vue";
import img1 from "~/assets/b1.jpg";
import img2 from "~/assets/b2.jpg";
import img3 from "~/assets/b3.jpg";
import img4 from "~/assets/b4.jpg";
import img5 from "~/assets/b5.jpg";
import img6 from "~/assets/b6.jpg";
export default {
  components: {
    "my-header": header,
    "my-mianbao": mianbao,
    "right-dao": rightdao,
    "right-bao-ming": rightbaoming,
    "bottom-bao-ming": bottombaoming,
    "my-footer": footer,
    'my-tu-yan':tuyanMa,
  },
  head() {
    return {
      title: this.common.header.title ,
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
  watchQuery: ["page"],
  async asyncData({ app, query, params, store }) {
    //   参数
    // id 项目id
    // other
    // token
     let page = query.page;
       let  host = store.state.hostname;
     if(page==undefined){
       page=1;
     }
     let uuid = query.uuid;
      if(uuid && uuid!=="undefined" && uuid!=="null"){
        uuid =uuid;
      }else{
         uuid="";
      }
    let [data] = await Promise.all([
      app.$axios
        .get(
          `/jy/comment/list?token=${store.state.token}&id=${params.id}&page=${page}&uuid=${uuid}&other=${store.state.other}&host=${host}`
        )
        .then((res) => {
          if (res.data.code == 200) {
            let data = res.data;
            return data;
          }
        }),
    ]);
    return {
      common: data.common,
      building: data.building,
      articles: data.articles,
      total: data.total,
      data: data.data,
      currentPage1: parseInt(page),
    };
  },
  data() {
    return {
      value: 3,
      text:
        "这个楼盘有什么优缺点？开发商资质如何？我有没有购房资质？更多问题，咨询师帮您答疑解惑",
      common: {},
      articles: [],
      building: {},
      total: "",
      data: [],
      currentPage1: 1,
      bgImg: {
        backgroundImage: "url(" + require("~/assets/yufang.jpg") + ")",
        backgroundRepeat: "no-repeat",
      },
      text: "看照片怎么够，预约看房我们将提供免费专车接送和专业楼盘讲解",
      // 我要点评
      dian_tan: {
        dianPingFlag: false,
        taidu: [
          {
            id: "1",
            name: "未看房",
          },
          {
            id: "2",
            name: "已看房",
          },
        ],
        num: 0,
        values:0,
        textarea: "",
      },
      //回复
      dPingFlag: false,
      pingid: "",
      content_hui: "",
      myremark:'',
      telphone:'',
      bottom_telphone:'',
         //图形验证码部分
      tuYanFlags: false,
      textt: "向右滑",
      imgs: [img1, img2, img3, img4, img5, img6],
      msg: "",
       routerData:[],
       logo_text:"家园"
    };
  },

  created() {
       
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
      this.$parent.$parent.saoma_telphone = this.common.phone;
      
      let  token = localStorage.getItem('token');
      let old_tel=localStorage.getItem("old_tel");
      if(token && old_tel){
          this.bottom_telphone=old_tel;
          this.$refs.right_bao.telphone =old_tel;
      }else {
      }

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
         "name":`${this.building.name}楼盘点评`,
         "to":''
       }
    ];
       var consider = sessionStorage.getItem("ping_tai");
       console.log(consider,consider==null);
      // this.getdata(1);
       this.myremark= "楼盘点评页+预约看房"
  },
  computed: {},
  methods: {
        getLike(id) {
      //楼盘点评点赞
      var token = localStorage.getItem("token");
      if (token !== "" && token !== null) {
        axios({
          method: "post",
          url: "/comment/like",
          params: {
            token: token,
            id: id,
          },
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
            console.log(error);
          });
      } else {
        this.$message.error("请先登录");
        this.$parent.$parent.loginTan = true;
      }
    },
        tijiaoDong(num){ //下方报名
          sessionStorage.setItem("bao_id",num);
          var number = this.bottom_telphone;
          let myreg = new RegExp("^[1][3,4,5,7,8][0-9]{9}$");
          if (number !== "") {
              if (!myreg.test(number)) {
                $("#phone_bot").val("");
                $("#phone_bot").attr("placeholder", "手机号码不合法");
              } else {
                this.tuYanFlags = true;
                //console.log(this.tuYanFlags);
              }
            } else {
              $("#phone_bot").attr("placeholder", "手机号不能为空");
            }
     },
      onFail() {
      this.msg = "验证失败";
    },
    onRefresh() {
      this.msg = "";
    },
    onSuccess() {
      //免费咨询104
      this.msg = "验证通过";
      var posit = sessionStorage.getItem("bao_id");
      let phone = "";
      let remark = "";
      let name = "";
      if (posit == 104) {
        phone = this.bottom_telphone;
        remark = "楼盘点评+免费咨询";
        name = "";
      } else if (posit == 103) {
        phone = this.phone;
        remark = "单个楼盘动态页+报名看房";
        name = this.name;
      }

      let ip = ip_arr["ip"];
      var city = sessionStorage.getItem("city_id");
      var token = localStorage.getItem("token");
      var project = this.building.id;
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
            tel: phone,
            ip: ip,
            page: 10, //、家园PC 必传
            project: project, //  项目id
            city: city, //城市id
            position: posit, //位置（见下面 position位置表格）
            remark: remark, //请填写位置对应的名，如“详细楼盘信息”，如果是咨询详细户型请加上户型名
            source: "线上推广1",
            other: other,
            kid: kid,
            name: name, // 客户姓名，没有就不填
          })
          .then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.message);
              this.tuYanFlags = false;
              this.$refs.slideblock.reset();
            } else {
              this.tuYanFlags = false;
              console.log(res.data.message);
            }

              if(res.data.code==500  && res.data.message=="已成功为您订阅了该服务"){
                    this.$message.success(res.data.message);
                    this.tuYanFlags =false; 
                    this.$refs.slideblock.reset();
              }

          });
      }
    },
     getdata(page){
        var token = localStorage.getItem('token');
          axios.get('/jy/comment/list',{
            params:{
                token:token,
                id:this.building.id,
                other:'',
                page:page
            }
          }).then(res=>{
             if(res.data.code==200){
              //  console.log(res.data);
                let   data  = res.data.data;
                this.data =data;
             }
          })
     },
     delatePing(id) {
      var token = localStorage.getItem("token");
      // var pid = this.$route.params.id;
      axios({
        method: "post",
        url: "/comment/delete",
        params: {
          token: token,
          id: id,
        },
      })
        .then((res) => {
          if (res.data.code == 200) {
            this.$alert("评论删除成功", "提交成功", {
              confirmButtonText: "确定",
            });
            this.dian_tan.dianPingFlag = false;
            this.getdata(1);
          } else {
            this.$message(res.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    huiFu(id) {
      var token = localStorage.getItem("token");
      if (token !== null) {
          this.dPingFlag = true;
          this.pingid = id;
      } else {
        this.$message.error("请先登录......");
        this.$parent.$parent.loginTan = true;
      }
    },
    closePing() {
      $(".guan").css({
        transform: "rotate(90deg)",
        transition: " all 0.6s",
      });
      let _this = this;
      setTimeout(function () {
        _this.dian_tan.dianPingFlag = false;
      }, 600);
    },
    selTaidu(e) {
      var id = e.target.getAttribute("data-v");
      sessionStorage.setItem("ping_tai", id);
      this.dian_tan.num = id;
    },
    submitPing() {
      //提交评价
      var token = localStorage.getItem("token");
      var pid = this.building.id;
      var score = this.dian_tan.values;
      //项目id
      var consider = sessionStorage.getItem("ping_tai");
      var content = this.dian_tan.textarea;
      let ip = ip_arr["ip"];
      if (token !== null) {
        if (consider !== null) {
          if (score !== 0) {
            if (content !== "") {
              axios({
                method: "post",
                url: "/comment/save",
                params: {
                  token: token,
                  pid: "", //被评论id
                  bid: pid, //项目id
                  content: content,
                  consider_buy: consider,
                  score: score,
                },
              })
                .then((res) => {
                  if (res.data.code == 200) {
                    // console.log(res.data.data);
                    this.dian_tan.dianPingFlag = false;
                 //   this.ping_cheng.dian_succ = true;
                    this.$alert(res.data.message, "提交成功", {
                      confirmButtonText: "确定"
                    });
                    sessionStorage.removeItem("ping_tai");
                    this.dian_tan.textarea = "";
                    this.dian_tan.values = 0;
                    this.num = 0;

                   this.getdata(this.$route.query.page);
                  } else {
                    this.$message(res.data.message);
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              this.$message.error("评论内容不能为空");
            }
          } else {
            this.$message.error("请选择您要打的分数");
          }
        } else {
          this.$message.error("请选择是否看过该楼盘");
        }
      } else {
        this.dianPingFlag = false;
        this.$message.error("请先登录......");
        this.$parent.$parent.loginTan = true;
      }
    },
    closePinglun() {
      this.dPingFlag = !this.dPingFlag;
    },
    tiJiaoPing() {
      //提交回复
      var token = localStorage.getItem("token");
      var bid = this.$route.params.id;
      let match = bid.match(/\d+/);
      bid = match[0];
      if (token) {
        if(this.content_hui!==''){
              axios({
                method: "post",
                url: "/comment/save",
                params: {
                  token: token,
                  pid: this.pingid,
                  bid: bid,
                  content: this.content_hui,
                  consider_buy: "",
                  score: "",
                },
              })
                .then((res) => {
                  if (res.data.code == 200) {
                    // this.$alert("回复信息提交成功", "提交成功", {
                    //   confirmButtonText: "确定",
                    // });
                    this.dPingFlag = false;
                    var pid = this.$route.params.id;
                    this.getdata(1);
                    this.$router.push(`/loudianpage/${this.pingid}`)
                  } else {
                    this.$message(res.data.message);
                  }
                })
                .catch((error) => {
                  console.log(error);
                });

          }else{
             this.$message.error("回复内容不能为空");
          }
      } else {
        this.dPingFlag = false;
        this.$message.error("请先登录");
        this.$parent.$parent.loginTan = true;
      }
    },
    textDianPing (){
        var token = localStorage.getItem("token");
        if(token !== null){
            this.dian_tan.dianPingFlag = true;
        }else{
              this.$message.error("请先登录......");
              this.$parent.$parent.loginTan = true;
        }
    }
  },
};
</script>
<style lang="less" scoped>
.prodian {
  .prodianpage {
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
          cursor: pointer;
          a {
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
    .loudian:after {
      height: 0;
      display: block;
      overflow: hidden;
      visibility: hidden;
      content: "";
      clear: both;
    }
    .loudian {
      .left_loudian {
        width: 860px;
        float: left;
        .title {
          width: 860px;
          height: 77px;
          border-bottom: 1px solid #ededed;
          h3 {
            font-size: 18px;
            font-family: "Microsoft YaHei";
            font-weight: bold;
            color: #313233;
            line-height: 58px;
            float: left;
            margin-top: 20px;
          }
          span {
            width: 112px;
            height: 36px;
            background: #2ac66d;
            font-size: 16px;
            font-family: "Microsoft YaHei";
            font-weight: bold;
            color: #ffffff;
            line-height: 36px;
            text-align: center;
            display: inline-block;
            float: right;
            margin-top: 30px;
            cursor: pointer;
            i {
              font-weight: 500;
              margin-right: 4px;
            }
          }
        }
        .ping {
          width: 860px;
          height: auto;
          display: flex;
          .head_img {
            width: 48px;
            height: 48px;
            float: left;
            margin-right: 20px;
            margin-top: 21px;
          }
          .ping_text {
            width: 792px;
            float: left;
            margin-top: 15px;
            border-bottom: 1px solid #f2f2f2;
            padding-bottom: 18px;
            .user_name {
              display: flex;
              font-size: 16px;
              font-family: "Microsoft YaHei";
              font-weight: bold;
              color: #101214;
              line-height: 20px;
              margin-bottom: 5px;
              a {
                display: flex;
                color: #101214;
              }
            }
            .pinglun {
              font-size: 14px;
              font-family: "Microsoft YaHei";
              font-weight: 400;
              color: #313233;
              line-height: 20px;
              a {
                color: #313233;
              }
            }
            .time {
              display: flex;
              justify-content: space-between;
              margin-top: 5px;
              .left_time {
                font-size: 12px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: #999999;
                line-height: 20px;
                em {
                  color: #426385;
                  font-size: 14px;
                  margin-left: 9px;
                  cursor: pointer;
                }
              }
              .zan {
                span {
                  color: #333333;
                  margin-right: 13px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  float: left;
                  cursor: pointer;
                  img {
                    width: 16px;
                    height: 16px;
                    margin-right: 6px;
                  }
                }
                em {
                  color: #333333;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  float: left;
                  cursor: pointer;
                  img {
                    width: 16px;
                    height: 16px;
                    margin-right: 6px;
                  }
                }
              }
            }
                    .huifu{
                     padding: 17px 26px;
                     background:#F8F8F8 ;
                     margin-bottom: 10px;
                    span{
                        font-size: 16px;
                        font-family: "Microsoft YaHei";
                        font-weight: bold;
                        color: #101314;
                        line-height: 22px;
                    }
                    // em{
                    //    color: #426385;
                    //   font-size: 12px;
                    //   margin-left: 9px;
                    //   cursor: pointer;
                    // }
                    p{
                        font-size: 14px;
                        font-family: "Microsoft YaHei";
                        font-weight: 400;
                        color: #323334;
                        line-height: 22px;
                    }
                 }
          }
        }
          .bao_box {
          width: 840px;
          height: 68px;
          background: #ffffff;
          border-top: 6px solid #2ac66d;
          border-bottom: 6px solid #2ac66d;
          border-left: 10px solid #2ac66d;
          border-right: 10px solid #2ac66d;
          margin-bottom: 100px;
            margin-top: 30px;
          p {
            font-size: 14px;
            font-family: "Microsoft YaHei";
            font-weight: 400;
            color: #464955;
            line-height: 20px;
            float: left;
            width: 385px;
            margin-left: 30px;
            margin-top: 8px;
          }
          .bao_input {
            width: 300px;
            height: 36px;
            background: #f2f5f7;
            border-radius: 3px;
            float: right;
            display: flex;
            margin-right: 30px;
            margin-top: 10px;
            input {
              width: 204px;
              height: 35px;
              border: none;
              background: #f2f5f7;
              color: #464855;
              text-indent: 1em;
            }
            button {
              width: 96px;
              height: 36px;
              background: #2ac66d;
              border-radius: 3px;
              font-size: 14px;
              font-family: "Microsoft YaHei";
              font-weight: 400;
              color: #ffffff;
              line-height: 32px;
              border: none;
            }
          }
        }
        .bottom_baoming {
          margin-top: 40px;
        }
        .ping:first-child {
          margin-top: 10px;
        }
      }
      .right_loudian {
        width: 340px;
        float: right;
        .about_dao {
          margin-top: 40px;
        }
        .yukanfang {
          margin-bottom: 100px;
        }
      }
    }
    /*点评回复弹框*/
    .fan_tan_hui {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.4);
      position: fixed;
      top: 0;
      left: 0;
      z-index: 2000;
      display: block;
      cursor: pointer;
      .fan_tel {
        width: 540px;
        height: 400px;
        background: rgba(255, 255, 255, 1);
        border-radius: 10px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        .fan_top {
          width: 540px;
          height: auto;
          position: relative;
          margin: 0 auto;
          h2 {
            font-size: 20px;
            font-family: "Microsoft YaHei";
            font-weight: bold;
            color: rgba(75, 76, 80, 1);
            line-height: 48px;
            border-bottom: 1px solid #f0f0f5;
            margin-top: 10px;
            width: 460px;
            margin: 0 auto;
            margin-top: 10px;
          }
          i {
            position: absolute;
            right: 26px;
            top: 16px;
            font-size: 18px;
            color: #746e6e;
          }
        }
      }
      .fan_con {
        padding-left: 40px;
        padding-right: 40px;
        .fen_tit {
          .quest {
            font-size: 16px;
            font-family: "Microsoft YaHei";
            font-weight: 400;
            color: #616266;
            line-height: 24px;
            margin: 0 auto;
            margin-top: 11px;
            margin-right: 10px;
            float: left;
            span {
              color: #abacb1;
            }
          }
          ul:after {
            content: "";
            height: 0;
            clear: both;
            overflow: hidden;
            display: block;
            visibility: hidden;
          }
          ul {
            padding-top: 10px;

            li {
              font-size: 14px;
              font-family: "Microsoft YaHei";
              font-weight: 400;
              color: rgba(159, 161, 165, 1);
              float: left;
              padding: 5px 15px;
              border: 1px solid rgba(230, 230, 235, 1);
              margin-right: 9px;
            }
            .active {
              color: #fff;
              background: #59c1ff;
              border: none;
            }
          }
        }
        .ping_fen {
          display: flex;
          .zong {
            font-size: 16px;
            font-family: "Microsoft YaHei";
            font-weight: 400;
            color: rgba(128, 134, 142, 1);
            span {
              color: #ff6a48;
              font-size: 36px;
              font-weight: bold;
            }
          }
          .star {
            margin-top: 20px;
            margin-left: 30px;
          }
        }

        .fan_kuang {
          width: 460px;
          height: 160px;
          border-radius: 4px;
          padding-left: 12px;
          border: none;
          font-size: 16px;
          font-family: "Microsoft YaHei";
          font-weight: 400;
          color: #abacb1;
          line-height: 34px;
          border: 1px solid rgba(240, 240, 245, 1);
          margin-top: 31px;
        }
        .fan_btn {
          width: 340px;
          height: 44px;
          background: #29c56d;
          border-radius: 2px;
          font-size: 16px;
          font-family: "Microsoft YaHei";
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
          line-height: 36px;
          text-align: center;
          border: none;
          margin-top: 30px;
          margin-left: 60px;
          cursor: pointer;
        }
      }
    }


    //本页面的图形验证码样式
    .loginyans{
      position:fixed;
      background:rgba(0,0,0,0.4);
      width:100%;
      height:100%;
      top:0px;
      left:0px;
      z-index:1000;
      #slideVerify{
        position:absolute;
        top:50%;
        left:50%;
        margin-left:-155px;
        margin-top:-130px;
      }
      .massage{
        position:absolute;
        top:50%;
        left:50%;
        margin-left:-155px;
        margin-top:190px;
        color:#000;
      }
  }
    //楼盘点评弹框
    .fan_tan_dian {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.4);
      position: fixed;
      top: 0;
      left: 0;
      z-index: 2000;
      display: block;
      cursor: pointer;
      .fan_tel {
        width: 480px;
        height: 400px;
        background: rgba(255, 255, 255, 1);
        border-radius: 6px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        .fan_top {
          position: relative;
          height: 55px;
          h2 {
            font-size: 22px;
            font-weight: bold;
            color: #333334;
            line-height: 22px;
            position: absolute;
            left: 50%;
            transform: translate(-50%);
            top: 17px;
          }
          .guan {
            width: 24px;
            height: 24px;
            background: rgba(0, 0, 0, 0.12);
            border-radius: 50%;
            text-align: center;
            position: absolute;
            top: 12px;
            right: 12px;
            i {
              font-size: 18px;
              text-align: center;
              line-height: 24px;
              color: #fff;
            }
          }
        }
      }
      .fan_con {
        padding-left: 40px;
        padding-right: 40px;
        .fen_tit {
          .quest {
            font-size: 14px;
            font-family: "Microsoft YaHei";
            font-weight: bold;
            color: #323333;
            line-height: 14px;
          }
          ul:after {
            content: "";
            height: 0;
            clear: both;
            overflow: hidden;
            display: block;
            visibility: hidden;
          }
          ul {
            padding-top: 14px;
            li {
              font-size: 14px;
              font-family: "Microsoft YaHei";
              font-weight: 400;
              color: #7d7d80;
              width: 72px;
              height: 26px;
              background: #f8f8f8;
              line-height: 26px;
              border-radius: 13px;
              text-align: center;
              float: left;
              margin-right: 14px;
            }
            .active {
              color: #2ac66e;
              background: #f1f8f4;
              border: none;
              font-weight: bold;
            }
          }
        }
        .ping_fen {
          .zong {
            font-size: 14px;
            font-family: "Microsoft YaHei";
            font-weight: bold;
            color: #323333;
            line-height: 14px;
            margin-top: 18px;
            span {
              color: #ff6a48;
              font-size: 36px;
              font-weight: bold;
            }
          }
          .star {
            margin-top: 11px;
            margin-bottom: 20px;
          }
        }

        .fan_kuang {
          width: 400px;
          height: 120px;
          border-radius: 4px;
          padding-left: 12px;
          border: none;
          font-size: 16px;
          font-family: "Microsoft YaHei";
          font-weight: 400;
          color: #f8f8f8;
          line-height: 34px;
          margin-top: 31px;
          outline: none;
          background: #f8f8f8;
          //  margin-bottom: 28px;
        }
        .fan_btn {
          width: 400px;
          height: 34px;
          background: #2ac66e;
          border-radius: 4px;
          font-size: 14px;
          font-family: "Microsoft YaHei";
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
          line-height: 36px;
          text-align: center;
          border: none;
          margin-top: 28px;
        }
      }
    }
  }
}
</style>
