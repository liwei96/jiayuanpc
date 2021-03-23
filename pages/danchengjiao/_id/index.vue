<template>
  <div class="dan_cj">
    <my-header 
              :all="common.city_info.all"
              :telphone="common.phone"
              ref="header"></my-header>
    <my-mianbao :router_data="routerData"></my-mianbao>
    <div class="dan_cj_page">
      <div class="left_content">
        <h1>{{info.title}}</h1>
        <p class="name">客户：{{info.source}}</p>
        <p class="content" v-html="info.content">
        </p>
        <!-- 项目框 -->
        <div class="project_box" >
          <img
            :src="building.img"
            alt
          />
          <div class="project_xinxi">
            <h2>
               <p>{{building.name}}</p>
              <span>{{building.state}}</span>
            </h2>
            <p class="price">
              约
              <em>{{building.price}}</em>元/m²
            </p>
            <p class="address">{{building.country}}: {{building.address}}</p>
            <p class="tel">{{common.phone.replace(",","转")}}</p>
            <p class="tips">致电售楼处免费看房</p>
          </div>
          <div class="form_box">
            <span>姓名:</span>
            <input type="text" placeholder="请输入姓名" class="kuang" v-model="name"/>
            <br />
            <span>电话:</span>
            <input type="text" placeholder="请输入电话"  v-model="phone" maxlength="11"/>
            <br />
            <div class="xieyi">
              <input type="checkbox" v-model="checked" class="checkbox" />
              <p>
                我已阅读并同意
                <em><nuxt-link to="/we/fuwu">《{{logo_text}}用户协议》</nuxt-link></em>
              </p>
            </div>
            <button @click="baoMing(103)">我要报名</button>
          </div>
        </div>
        <!-- 点赞分享 -->
        <!-- <div class="zan_box">
          <button>
            <em class="el-icon-star-on"></em>点赞
          </button>
          <button class="fenxiang">
            <em class="el-icon-s-goods"></em>分享
          </button>
        </div> -->
        <button class="more_cheng"><nuxt-link to="/allchengjiao">更多成交案例</nuxt-link></button>
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
                 v-model="mianzi_phone"
          />
          <button @click="tijiaoDong(104)">免费咨询</button>
        </div>
        <!-- 推荐楼盘 -->
        <div class="tui_lou">
          <h2>推荐楼盘</h2>
          <ul>
            <li v-for="item in projects" :key="item.id">
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
          <button><nuxt-link to="/searchpro">更多楼盘</nuxt-link></button>
        </div>
      </div>
    </div>
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
import header from "~/components/header.vue";
import mianbao from "~/components/mianbao.vue";
import footer from "~/components/footer.vue";
import tuyanMa from "~/components/tuyan.vue";
import axios from 'axios';
import $ from 'jquery';
import img1 from "~/assets/b1.jpg";
import img2 from "~/assets/b2.jpg";
import img3 from "~/assets/b3.jpg";
import img4 from "~/assets/b4.jpg";
import img5 from "~/assets/b5.jpg";
import img6 from "~/assets/b6.jpg";
export default {
    middleware: 'metaTitle',
    meta: {title: '单篇成交'},
  components: {
    "my-header": header,
    "my-mianbao": mianbao,
    "my-footer": footer,
     "my-tu-yan": tuyanMa,
  },
  head() {
    return {
      title:`${this.logo_text}新房-成交案例-${this.info.title}`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `${this.logo_text}新房-成交案例-${this.info.title}`
        },
        { hid: "Keywords", name: "Keywords", content: `${this.logo_text}新房-成交案例-${this.info.title}` }
      ]
    };
  },
  async asyncData({ app, query, params, store }) {
    // id
    // token 
    // other 
    let uuid = query.uuid;
    if(uuid && uuid!=="undefined" && uuid!=="null"){
        uuid =uuid;
    }else{
       uuid=""
    }
    let [data] = await Promise.all([
      app.$axios.get(`/jy/deal/pc?id=${params.id}&uuid=${uuid}&token=${store.state.token}&other=${store.state.other}`).then((res) => {
        if (res.data.code == 200) {
          let data = res.data;
          return data;
        }
      }),
    ]);
    return {
      building: data.buidling,
      projects: data.projects,
      common: data.common,
      info:data.info
    };
  },
  data() {
    return {
      checked: true,
      building: {},
      projects: [],
      common: {},
      info:{},
       mianzi_phone:'',
      myremark:'',
      routerData:[],

      name:'',
      phone:'',

      tuYanFlag: false,//图形验证码
      msg: "", 
      imgs: [img1, img2, img3, img4, img5, img6],
      textt: "向右滑",

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
      let  token = localStorage.getItem('token');
      let old_tel=localStorage.getItem("old_tel");
      if(token && old_tel){
          this.mianzi_phone=old_tel;
          this.phone =old_tel;
      }else {
      }


     this.routerData = [
       {
         "name":"成交案例",
         "to":'/allchengjiao'
       }, {
         "name":`${this.info.title}`,
         "to":''
       }
    ];

       this.myremark = "单个成交案例+免费咨询"
  },
  computed: {},
  methods: {
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
          remark = "单个成交案例页+我要报名";
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
};
</script>
<style lang="less" scoped>
.dan_cj {
  .dan_cj_page:after {
    content: "";
    height: 0;
    overflow: hidden;
    visibility: hidden;
    display: block;
    clear: both;
  }
  .dan_cj_page {
    width: 1200px;
    height: auto;
    margin: 0 auto;
    .left_content {
      width: 860px;
      height: auto;
      float: left;
      h1 {
        font-size: 32px;
        font-family: "Microsoft YaHei";
        font-weight: 400;
        color: #313233;
        line-height: 80px;
        margin-top: 14px;
      }
      .name {
        font-size: 14px;
        font-family: "Microsoft YaHei";
        font-weight: 400;
        color: #646566;
        line-height: 14px;
        margin-bottom: 35px;
      }
      .content {
        font-size: 16px;
        font-family: "Microsoft YaHei";
        font-weight: 400;
        color: #646566;
        line-height: 40px;
      }
      .project_box {
        width: 860px;
        height: 200px;
        border: 1px solid #f0f0f2;
        margin-top: 40px;
        display: flex;
        img {
          width: 160px;
          height: 120px;
          float: left;
          margin-top: 26px;
          margin-left: 32px;
        }
        .project_xinxi {
          width: 307px;
          height: 145px;
          border-right: 1px solid #f0f0f2;
          padding-left: 30px;
          float: left;
          margin-top: 23px;
          h2 {
            width: 307px;
            height: 25px;
            p{
                 font-size: 18px;
                font-family: "Microsoft YaHei";
                font-weight: bold;
                color: #262626;
                line-height: 20px;
                width: 240px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                float: left;
            }
           
            span {
              font-size: 14px;
              font-family: "Microsoft YaHei";
              font-weight: 400;
              color: #ffffff;
              width: 48px;
              height: 22px;
              background: #2acc72;
              border-radius: 3px;
              display: inline-block;
              text-align: center;
              margin-left: 10px;
              float: left;
            }
          }
          .price {
            font-size: 14px;
            color: #525357;
            em {
              color: #ff6a48;
              font-weight: bold;
              font-size: 20px;
            }
          }
          .address {
            font-size: 14px;
            font-family: "Microsoft YaHei";
            font-weight: 400;
            color: #525357;
            line-height: 36px;
            width: 213px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .tel {
            font-size: 24px;
            font-family: "Microsoft YaHei";
            font-weight: bold;
            color: #262626;
          }
          .tips {
            font-size: 14px;
            font-family: "Microsoft YaHei";
            font-weight: 400;
            color: #909299;
            margin-top: 5px;
          }
        }
        .form_box {
          width: 355px;
          padding-left: 35px;
          float: left;
          padding-top: 25px;
          span {
            font-size: 14px;
            font-family: "Microsoft YaHei";
            font-weight: 400;
            color: #525458;
            margin-right: 12px;
          }
          input {
            width: 200px;
            height: 32px;
            border: 1px solid #f0f0f2;
            font-size: 14px;
            font-family: " Microsoft YaHei";
            font-weight: 400;
            color: #909299;
            text-indent: 1em;
          }
          .kuang {
            margin-bottom: 13px;
          }
          .xieyi {
            position: relative;
            p {
              font-size: 12px;
              font-family: "Microsoft YaHei";
              font-weight: 400;
              color: #7a7a7a;
              line-height: 32px;
              margin-left: 21px;
            }
            em {
              color: #498de1;
              a{
                 color: #498de1;
              }
            }
            input[type="checkbox"] {
              width: 16px;
              height: 16px;
              background-color: #fff;
              -webkit-appearance: none;
              border: 1px solid #e8e8e8;
              border-radius: 3px;
              outline: none;
              cursor: pointer;
              position: absolute;
              top: 8px;
            }
            input[type="checkbox"]:checked {
              background: url("../../../assets/dui.png") no-repeat center;
            }
            .checkbox {
              margin-right: 5px;
            }
          }
          button {
            width: 200px;
            height: 32px;
            background: #ff775a;
            font-size: 14px;
            font-family: "Microsoft YaHei";
            font-weight: 400;
            color: #ffffff;
            border: none;
            margin-top: 5px;
          }
        }
      }
      .zan_box {
        width: 228px;
        height: 39px;
        margin: 0 auto;
        margin-top: 39px;
        button {
          width: 101px;
          height: 37px;
          border: 1px solid #e6e6e6;
          font-size: 16px;
          font-family: "Microsoft YaHei";
          font-weight: 400;
          color: #646666;
          line-height: 37px;
          background: #fff;
          cursor: pointer;

          em {
            font-size: 18px;
          }
        }
        .fenxiang {
          margin-left: 19px;
          em {
            color: #2acc72;
          }
        }
      }
      .more_cheng {
        width: 860px;
        height: 44px;
        background: #f5f7f8;
        border: 1px solid #e1e1e1;
        border-radius: 3px;
        font-size: 16px;
        font-family: "Microsoft YaHei";
        font-weight: 400;
        color: #323334;
        line-height: 44px;
        background: #f5f7f8;
        margin-top: 39px;
        margin-bottom: 100px;
        outline: none;
        a{
          color: #323334;
          display: block;
          line-height: 44px;
        }
      }
    }
    .right_cj {
      float: right;
      width: 300px;
      .mian_zi {
        h3 {
          font-size: 18px;
          font-family: "Microsoft YaHei";
          font-weight: bold;
          color: #323334;
          line-height: 18px;
          margin-bottom: 20px;
          margin-top: 38px;
        }
        p {
          font-size: 14px;
          font-family: "Microsoft YaHei";
          font-weight: 400;
          color: #646666;
          line-height: 34px;
        }
        input {
          width: 300px;
          height: 36px;
          border: 1px solid #dcdcde;
          border-radius: 2px;
          font-size: 16px;
          color: #7d7d85;
          text-indent: 1em;
          margin-bottom: 20px;
          margin-top: 20px;
        }
        button {
          width: 300px;
          height: 36px;
          background: #2ac66e;
          border-radius: 2px;
          font-size: 16px;
          font-family: "Microsoft YaHei";
          font-weight: 400;
          color: #ffffff;
          line-height: 24px;
          text-align: center;
          line-height: 36px;
          border: 0px;
          outline: none;
        }
      }
      .tui_lou {
        h2 {
          font-size: 18px;
          font-family: "Microsoft YaHei";
          font-weight: bold;
          color: #323334;
          line-height: 78px;
          margin-top: 20px;
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
          li {
            width: 300px;
            height: 88px;
            margin-bottom: 30px;
            img {
              width: 110px;
              height: 84px;
              float: left;
              margin-right: 13px;
            }
            .project_content {
              width: 177px;
              height: 88px;
              float: left;
              h3 {
                font-size: 14px;
                font-family: "Microsoft YaHei";
                font-weight: bold;
                color: #323334;
                line-height: 14px;
              }
              .jiage {
                font-size: 16px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: #ff5644;
                line-height: 34px;
                margin-top: 4px;
              }
              .jian_mian {
                font-size: 14px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: #646666;
                line-height: 14px;
              }
              .address {
                font-size: 14px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: #646666;
                line-height: 14px;
                margin-top: 8px;
                width: 168px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
            }
          }
        }
        button {
          width: 300px;
          height: 36px;
          border: 1px solid #dcdcde;
          border-radius: 2px;
          font-size: 16px;
          font-family: "Microsoft YaHei";
          font-weight: 400;
          color: #7c7d84;
          line-height: 36px;
          background: #fff;
          margin-bottom: 100px;
          a{
            color: #7C7D84;
            line-height: 36px;
            display: block;
          }
        }
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
</style>
