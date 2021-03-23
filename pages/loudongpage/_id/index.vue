<template>
  <div class="loudandong">
    <my-header 
              :all="common.city_info.all"
              :telphone="common.phone"
              ref="header"></my-header>
    <my-mianbao :router_data="routerData"></my-mianbao>
    <div class="type">
      <div class="div1">
        <div class="pro_name">
          <p>
            <span class="span1">{{building.name}}</span>
            <i>{{building.state}}</i>
            <em>{{building.type}}</em>
          </p>
          <ul>
            <li>{{building.decorate}}</li>
            <li v-for="(item,index ) in building.features" :key="index">{{item.value}}</li>
          </ul>
        </div>
      </div>

      <div class="nav_list">
           <ul>                                           
                <li>
                <nuxt-link :to="`/content/${building.id}`">楼盘主页</nuxt-link></li>
                <li> <nuxt-link :to="`/loudetail/${building.id}`">楼盘详情</nuxt-link></li>
                <li> <nuxt-link :to="`/prohuxing/${building.id}`">主力户型</nuxt-link></li>
                <li> <nuxt-link :to="`/prodong/${building.id}?page=1`">楼盘动态</nuxt-link></li>
                <li> <nuxt-link :to="`/propic/${building.id}`">楼盘相册</nuxt-link></li>
                <li> <nuxt-link :to="`/prowenda/${building.id}?page=1`">楼盘问问</nuxt-link></li>
                <li> <nuxt-link :to="`/prodian/${building.id}?page=1`">楼盘点评</nuxt-link></li>
            </ul> 
             <span>咨询热线：{{common.phone.replace(",","转")}}</span>
      </div>

      <div class="type_con">
        <div class="dong_list">
          <div class="dong_box">
            <h4>{{info.title}}房源动态</h4>
            <div class="pro_xin">
              <span>
                发布时间:
                <em>{{info.time}}</em>
              </span>
              <span>
                来源:
                <em>{{logo_text}}新房</em>
              </span>
              <!-- <span>阅读:<em>1873</em></span> -->
            </div>
            <p>{{info.content}}</p>
          </div>
          <!-- 单个项目 -->
          <div class="pro_box">
            <img :src="building.img" alt @click="goContent(building.id)" />
            <div class="lou_xinxi" @click="goContent(building.id)">
              <h3>
                {{building.name}}
                <span>{{building.state}}</span>
              </h3>
              <p class="price">
                均价
                <span>{{building.price}}</span>元/m²起
              </p>
              <p class="dizhi">{{building.country}}: {{building.address}}</p>
              <p class="tel">{{common.phone.replace(",","转")}}</p>
              <p class="more">致电售楼处了解更多</p>
            </div>
            <div class="name_form">
              <span>姓名:</span>
              <input type="text" placeholder="请输入姓名" v-model="name" class="i_name" />
              <br />
              <span>电话:</span>
              <input type="text" placeholder="请输入电话" v-model="phone" maxlength="11"/>
              <br />
              <p>
                <el-checkbox v-model="checked"></el-checkbox>我已阅读并同意
                <a @click="goYongxie">《{{logo_text}}用户协议》</a>
              </p>
              <button @click="baoMing(103)">报名看房</button>
            </div>
          </div>

          <button class="wang" @click="wangQiDong">
            <em class="iconfont"></em>往期动态
          </button>
         <!--报名框-->
         <div class="bao_box">
            <p>这个楼盘有什么优缺点？开发商资质如何？买房需要注意什么？更多问题，敬请免费咨询</p>
            <div class="bao_input">
                  <input type="text" placeholder="请输入您的手机号" maxlength="11" v-model="mian_tel">
                  <button @click="baoMing(104)">免费咨询</button>
            </div>
         </div>

        </div>

        <div class="rig_dingyue">
            <my-right-dao :daolist="articles"></my-right-dao>
            <yu-kan-fang :img_bg="bgImg" :text_tishi="text" ref="right_bao"></yu-kan-fang>
        </div>
       
      </div>
       <!-- 图形验证码组件 -->
        <my-tu-yan ref="imgyan"
            :point="103 "
            :project_id="this.building.id"
            :name="''" 
            :myremark="myremark"
            :myphone="this.telphone"
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
      <!-- 底部 -->
      <my-footer :c_zhi_citys="common.city_info.all" 
        :c_hot_search="common.hot_search"
        :c_friendlink="common.friend_links"
        :footer_tel="common.phone"></my-footer>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import header from "~/components/header.vue";
import mianbao from "~/components/mianbao.vue";
import dingdong from "~/components/danpage/yukanfang.vue";
import aboutdao from "~/components/danpage/xiangdao.vue";
//import saoMa from "~/components/saoma";
import img1 from "~/assets/b1.jpg";
import img2 from "~/assets/b2.jpg";
import img3 from "~/assets/b3.jpg";
import img4 from "~/assets/b4.jpg";
import img5 from "~/assets/b5.jpg";
import img6 from "~/assets/b6.jpg";
import footer from "~/components/footer.vue";
import tuyanMa from "~/components/tuyan.vue";
export default {
  components: {
    "yu-kan-fang": dingdong,
    "my-right-dao": aboutdao,
    "my-header": header,
    "my-mianbao": mianbao,
    "my-footer":footer,
     'my-tu-yan':tuyanMa,
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
        { hid: "Keywords", name: "Keywords", content:this.common.header.keywords}
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
  async asyncData({ app, store, error, params,query}) {
    let token = store.state.token;
    let kid = store.state.kid;
    let other = store.state.other;
     let uuid = query.uuid;
       let  host = store.state.hostname;
      if(uuid && uuid!=="undefined" && uuid!=="null"){
        uuid =uuid;
      }else{
         uuid="";
      }
    if (kid == undefined) {
      kid = "";
    }
    if (other == undefined) {
      other = "";
    }
    // id 动态id
    // token
    // other
    let [data1] = await Promise.all([
      app.$axios
        .get(
          `/jy/dynamic/pc/detail?id=${params.id}&uuid=${uuid}&token=${store.state.token}&other=${store.state.other}&host=${host}`
        )
        .then((res) => {
          if (res.data.code == 200) {
            let data = res.data;
            return data;
          }
        }),
    ]);
    let building = {};
    let info = {};
    let common = {};
    let articles = {};
    if (data1) {
      building = data1.building;
      info = data1.info;
      common = data1.common;
      articles = data1.articles;
    }
    return {
      building: building,
      info: info,
      common: common,
      articles: articles,
    };
  },
  data() {
    return {
      checkList: [],
      building: {},
      dynamics: [],
      tag: "",
      total: 0,
      com_tel: "",
      checked: true,
      name: "",
      phone: "",
      info: {},
      same_areas: [],
      features: [],
      tuYanFlag: false,
      msg: "", //图形验证码
      imgs: [img1, img2, img3, img4, img5, img6],
      textt: "向右滑",
      common: {},
      comtel: "",
      project_city: {},
      articles:[],
      bgImg: {
              backgroundImage: "url(" + require("~/assets/loudong_top.jpg") + ")",
              backgroundRepeat: "no-repeat",
          }, 
      text:'订阅最新动态，楼盘最新情报抢先知道，帮您找准买房好时机',
      myremark:'',
      telphone:'', //右侧报名框,
      mian_tel:'',
      routerData:[],

      logo_text:"家园"

    };
  },
  methods: {
    getPhone() {
      var city = sessionStorage.getItem("city_id");
      let id = "";
      if (this.building.id) {
        id = this.building.id.toString();
      }
      let match = id.match(/\d+/);
      var other = sessionStorage.getItem("other");
      var kid = sessionStorage.getItem("kid");
      id = match[0];
      axios
        .post("/api/common/head_foot", {
          city: city,
          project: id,
          kid: kid,
          other: other,
          platform: 1,
        })
        .then((res) => {
          this.comtel = res.data.phone;
          this.$parent.$parent.$children[0].com_tel = this.comtel.replace(
            ",",
            "转"
          );
          this.$parent.$parent.$children[2].com_tel = this.comtel.replace(
            ",",
            "转"
          );
          this.$refs.tel.com_tel = this.comtel.replace(",", "转");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //图形验证码
    wangQiDong() {
      this.$router.push(`/prodong/${this.building.id}?page=1`);
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
          remark = "单个楼盘动态页+报名看房";
          name = this.name
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
    baoMing(parms) {
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
    goYongxie() {
      this.telflag = false;
      this.$router.push('/we/fuwu')
    },
    pageChange(num) {
      var pid = this.$route.params.id;
      this.getDong(pid, num);
    },
    //扫码拨号
    saomaShow() {
      this.$refs.sao.saoma = true;
      this.$refs.sao.saoma_url = `http://ll.edefang.net//index/weichat/code?tel=${this.common.phone}`;
    },
    saomaHide() {
      this.$refs.sao.saoma = false;
    },
    getDong(pid, page) {
      var ip = ip_arr["ip"];
      // var ip =this.$store.state.ip;
      var city = sessionStorage.getItem("city_id");
      var token = localStorage.getItem("token");
      axios
        .post("/api/project/dynamic", {
          ip: ip,
          city: city,
          token: token,
          page: page,
          platform: 1,
          limit: 10,
          project: pid,
        })
        .then((res) => {
          if (res.data.code == 200) {
            var num = res.data.data;
            this.building = num.building;
            this.tag = num.building.tag;
            var dy = num.dynamics.infos;
            this.dynamics = dy;
            if (dy.length > 0) {
              this.dynamics = dy;
              this.total = num.dynamics.count;
            } else if (dy == []) {
              this.dynamics = "";
            } else {
              this.dynamics = "";
            }
          } else {
            this.$message(res.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  beforeMount() {
    // let city_head_arr = this.$store.state.city_list;
    // let has_city = this.$cookies.get("city_id");
    // let str = "www.jy8006.com";
    // let host = window.location.host;
    // if (host.indexOf(str) !== -1) {
    //   if (!city_head_arr.hasOwnProperty(has_city)) {
    //     console.log(111);
    //   } else {
    //     window.location.href =
    //       "http://" +
    //       city_head_arr[has_city] +
    //       ".jy8006.com" +
    //       this.$route.fullPath;
    //   }
    // }
    // //项目域名和城市一致
    // let now_city_pin = this.project_city.pinyin;
    // let local_str = "localhost:3001";
    // let ceshi_str = "xiaoyan.jy8006.com";
    // if (now_city_pin !== "") {
    //   if (host.indexOf(now_city_pin) !== -1) {
    //     //域名正确
    //   } else {
    //     if (host.indexOf(local_str) !== -1) {
    //       console.log(local_str); //本地地址时不跳转
    //     } else if (host.indexOf(ceshi_str) !== -1) {
    //       console.log(host); //测试地址时不跳转
    //     } else {
    //       window.location.href =
    //         "http://" +
    //         now_city_pin +
    //         ".jy8006.com" +
    //         decodeURIComponent(this.$route.fullPath);
    //     }
    //   }
    // }
       let  mine = this.$store.state.style_mine;
        if(mine==1){ //易得房样式
            this.logo_text = "易得房";
        }else if(mine==2){ //家园样式
           this.logo_text = "家园";
        }
  },
  mounted() {
      this.$parent.$parent.project_id_im = this.building.id;
      this.$parent.$parent.saoma_telphone = this.common.phone;


      let  token = localStorage.getItem('token');
      let old_tel=localStorage.getItem("old_tel");
      if(token && old_tel){
          this.phone=old_tel;
          this.mian_tel =old_tel;
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
         "name":`${this.building.name}动态`,
         "to":`/prodong/${this.building.id}?page=1`
       },
        {
         "name":`${this.info.title}动态`,
         "to":""
       }
    ];
    this.myremark= "单个楼盘问答+订阅楼盘动态";
    // this.getPhone();
    // this.$parent.$parent.$children[0].com_tel = this.common.phone.replace(
    //   ",",
    //   "转"
    // );
    // this.$parent.$parent.$children[2].com_tel = this.common.phone.replace(
    //   ",",
    //   "转"
    // );

    // let features = this.building.features;
    // let data = [];
    // features.map((p, q) => {
    //   if (p !== "") {
    //     data.push(p);
    //   }
    // });
    // this.features = data;

    // var tel = sessionStorage.getItem("telphone_com");
    // this.com_tel = tel;
    // var pid = this.$route.params.id;
  },
  computed: {
    tagg: function () {
      var arr = this.tag.split(",");
      var list = [];
      arr.map((m, n) => {
        if (n < 4) {
          list.push(m);
        }
      });
      return list;
    },
    dynamicss: function () {
      var list = [];
      this.dynamics.map((m, n) => {
        if (n > 0) {
          list.push(m);
        }
        // console.log(list)
      });
      return list;
    },
  },
};
</script>
<style scoped lang="less">
.loudandong {
  width: 100%;
  .type {
    width: 100%;
    height: auto;
    margin: 0 auto;
    .div1 {
      width: 1200px;
      height: 134px;
      background: #fff;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      .pro_name {
        float: left;
        p {
          margin-top: 42px;
          margin-bottom: 17px;
          .span1 {
            font-size: 28px;
            font-family: "Microsoft YaHei";
            font-weight: bold;
            color: rgba(55, 58, 67, 1);
            line-height: 20px;
          }
          i {
            font-size: 14px;
            font-family: "Microsoft YaHei";
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            width: 56px;
            height: 24px;
            background: rgba(41, 204, 114, 1);
            border-radius: 2px;
            display: inline-block;
            text-align: center;
            font-style: normal;
            line-height: 24px;
            margin-left: 10px;
          }
          em{
              width: 50px;
              height: 24px;
              border: 1px solid #AFB0B3;
              border-radius: 3px;
              font-size: 14px;
              font-family: "Microsoft YaHei";
              font-weight: 400;
              color: #969799;
              display: inline-block;
              text-align: center;
              line-height: 24px;
          }
        }
        ul {
          li:first-child {
            color: #4393ff;
            background: #eaf3ff;
          }
          li {
            font-size: 14px;
            font-family: "Microsoft YaHei";
            font-weight: 400;
            color: rgba(120, 121, 127, 1);
            background: rgba(237, 240, 242, 1);
            border-radius: 2px;
            float: left;
            margin-right: 12px;
            display: inline-block;
            padding: 4px 12px;
          }
        }
      }
      .pro_rig {
        float: right;
        margin-top: 80px;
        display: flex;
        position: relative;
        span {
          font-size: 24px;
          font-family: "Microsoft YaHei";
          font-weight: bold;
          color: rgba(94, 95, 100, 1);
        }
        button {
          width: 120px;
          height: 36px;
          background: rgba(90, 194, 255, 1);
          border-radius: 2px;
          font-size: 16px;
          font-family: "Microsoft YaHei";
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          border: none;
          margin-left: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          i {
            margin-right: 8px;
            font-size: 20px;
          }
        }
      }
    }
    .nav_list{
        width: 1200px;
        height: 44px;
        background: #F5F5F5;
        border-radius: 4px;
        margin: 0 auto;
        ul{
            li{
                float: left;
                line-height: 44px;
                color:#646566 ;
                margin-right:40px ;
                a{
                     color:#646566 ;
                }
            }
            li:first-child{
                margin-left: 38px;
            }
        }
        span{
            font-size: 16px;
            font-family: "Microsoft YaHei";
            font-weight: 400;
            color: #000000;
            line-height: 44px;
            float: right;
            padding-right: 21px;
        }
    }

    .div2 {
      width: 1200px;
      height: 50px;
      border-radius: 4px;
      margin: 0 auto;
      background: rgba(240, 240, 242, 1);
      ul {
        list-style: none;
        margin-left: -40px;
        li {
          float: left;
          margin-left: 100px;
          line-height: 50px;
          font-size: 18px;
          color: rgba(94, 95, 100, 1);
        }
      }
    }

    .type_con:after {
      content: "";
      height: 0;
      clear: both;
      overflow: hidden;
      display: block;
      visibility: hidden;
    }
    .type_con {
      width: 1200px;
      height: auto;
      margin: 0 auto;
      .dong_list {
        width: 800px;
        height: auto;
        float: left;
        .dong_box {
          h4 {
            font-size: 32px;
            font-family: "Microsoft YaHei";
            font-weight: 400;
            color: rgba(49, 50, 51, 1);
            line-height: 32px;
            margin-top: 41px;
            margin-bottom: 13px;
          }
          .pro_xin {
            span {
              font-size: 14px;
              font-family: "Microsoft YaHei";
              font-weight: 400;
              color: rgba(151, 151, 151, 1);
              line-height: 42px;
              em {
                font-style: normal;
              }
            }
            span:first-child {
              margin-right: 39px;
              em {
                margin-left: 10px;
              }
            }
            span:nth-child(2) {
              margin-right: 40px;
              em {
                margin-left: 10px;
              }
            }
            span:nth-child(3) {
              em {
                margin-left: 10px;
              }
            }
          }
          p {
            font-size: 16px;
            font-family: "Microsoft YaHei";
            font-weight: 400;
            color: rgba(49, 50, 51, 1);
            line-height: 30px;
          }
        }
        .pro_box {
          width: 830px;
          height: 175px;
          border: 1px solid rgba(240, 240, 242, 1);
          padding-top: 25px;
          padding-left: 30px;
          cursor: pointer;
          margin-top: 39px;
          img {
            float: left;
            width: 160px;
            height: 120px;
            border-radius: 4px;
            margin-right: 30px;
          }
          .lou_xinxi {
            float: left;
            width: 272px;
            position: relative;
            h3 {
              font-size: 20px;
              font-family: "Microsoft YaHei";
              font-weight: bold;
              color: rgba(51, 51, 51, 1);
              line-height: 20px;
              span {
                font-size: 14px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
                width: 46px;
                height: 22px;
                background: rgba(41, 204, 114, 1);
                border-radius: 3px;
                display: inline-block;
                text-align: center;
                margin-left: 20px;
              }
            }
            .price {
              font-size: 14px;
              font-family: "Microsoft YaHei";
              font-weight: 400;
              color: rgba(166, 168, 179, 1);
              line-height: 38px;
              span {
                color: #ff6a48;
                font-weight: bold;
                font-size: 20px;
              }
            }
            .dizhi {
              font-size: 14px;
              font-family: "Microsoft YaHei";
              font-weight: 400;
              color: #525357;
              line-height: 20px;
              width: 213px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .tel {
              font-size: 24px;
              font-family: "Microsoft YaHei";
              font-weight: bold;
              color: rgba(75, 79, 97, 1);
              margin-top: 10px;
              span {
                font-size: 14px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: rgba(255, 255, 255, 1);
                padding: 5px 13px;
                background: #5ac2ff;
                margin-left: 20px;
                cursor: pointer;
              }
            }
            .more {
              font-size: 14px;
              font-family: "Microsoft YaHei";
              font-weight: 400;
              color: rgba(166, 168, 178, 1);
              line-height: 24px;
            }
            .saoma {
              position: absolute;
              top: 129px;
              left: 161px;
            }
          }
          .name_form {
            float: left;
            height: 140px;
            border-left: 1px solid #f0f0f2;
            padding-left: 65px;
            span {
              font-size: 14px;
              font-family: "Microsoft YaHei";
              font-weight: 400;
              color: rgba(71, 75, 81, 1);
            }
            .i_name {
              margin-bottom: 13px;
            }
            input {
              width: 200px;
              height: 32px;
              border: 1px solid rgba(240, 240, 242, 1);

              margin-left: 4px;
              color: #adafb9;
              font-size: 14px;
              text-indent: 1em;
              outline: none;
            }
            p {
              font-size: 12px;
              font-family: "Microsoft YaHei";
              font-weight: 400;
              color: rgba(122, 122, 122, 1);
              line-height: 12px;
              margin-top: 10px;
              margin-bottom: 15px;
              .el-checkbox {
                margin-right: 5px;
              }
              a {
                color: #498de1;
              }
            }
            button {
              width: 200px;
              height: 32px;
              background: #ff775a;
              font-size: 14px;
              font-family: "Microsoft YaHei";
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
              border: none;
              margin-left: 43px;
              cursor: pointer;
            }
          }
        }
      }
      .wang {
        width: 860px;
        height: 44px;
        background: rgba(245, 246, 247, 1);
        border: 1px solid rgba(224, 224, 224, 1);
        border-radius: 3px;
        font-size: 16px;
        font-family: "Microsoft YaHei";
        font-weight: 400;
        color: rgba(49, 50, 51, 1);
        line-height: 18px;
        margin-top: 49px;
        cursor: pointer;
        margin-bottom:70px;
      }
      .bao_box{
        width: 840px;
        height: 68px;
        background: #FFFFFF;
        border-top: 6px solid #2AC66D;
        border-bottom: 6px solid #2AC66D;
        border-left: 10px solid #2AC66D;
        border-right: 10px solid #2AC66D;
        margin-bottom: 100px;
           p{
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
           .bao_input{
                width: 300px;
                height: 36px;
                background: #F2F5F7;
                border-radius: 3px;
                float: right;
                display: flex;
                margin-right: 30px;
                margin-top: 10px;
               input{
                   width: 204px;
                   height: 35px;
                   border: none;
                   background: #F2F5F7;
                   color: #464855;
                   text-indent: 1em;
               }
               button{
                   width: 96px;
                    height: 36px;
                    background: #2AC66D;
                    border-radius: 3px;
                    font-size: 14px;
                    font-family: "Microsoft YaHei";
                    font-weight: 400;
                    color: #FFFFFF;
                    line-height: 32px;
                    border: none;
               }
           }
      }
      .rig_dingyue {
        width: 360px;
        height: auto;
        float: right;
        margin-top:40px;
        h6 {
          font-size: 18px;
          font-family: "Microsoft YaHei";
          font-weight: 400;
          color: rgba(140, 146, 155, 1);
          line-height: 20px;
          margin-top: 57px;
        }
        .ding_box {
          width: 320px;
          height: 270px;
          border: 1px solid rgba(220, 228, 236, 1);
          padding-left: 20px;
          padding-right: 20px;
          padding-top: 30px;
          margin-top: 20px;
          margin-bottom: 39px;
          .check {
            .el-checkbox {
              margin-right: 26px;
              margin-bottom: 10px;
            }
          }
          input {
            width: 320px;
            height: 44px;
            border: 1px solid rgba(235, 239, 242, 1);
            font-size: 16px;
            color: #8c929b;
            text-indent: 1em;
            margin-top: 30px;
            margin-bottom: 10px;
          }
          p {
            font-size: 14px;
            font-family: "Microsoft YaHei";
            font-weight: 400;
            color: rgba(164, 172, 179, 1);
          }
          button {
            width: 320px;
            height: 44px;
            background: linear-gradient(
              270deg,
              rgba(102, 207, 255, 1),
              rgba(76, 181, 255, 1)
            );
            font-size: 16px;
            font-family: "Microsoft YaHei";
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 44px;
            border: none;
            margin-top: 34px;
          }
        }
        .tong_lou {
          margin-bottom: 50px;
        }
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
  }
}
</style>