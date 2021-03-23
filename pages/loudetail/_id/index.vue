<template>
  <div class="loudetail">
    <my-header
      :all="common.city_info.all"
      :telphone="common.phone"
      ref="header"
    ></my-header>
    <my-mianbao :router_data="routerData"></my-mianbao>
    <div class="loudetail_box">
      <div class="project_name">
        {{ building.name }}
        <span>{{ building.state }}</span>
        <em>{{ building.type }}</em>
      </div>
      <ul class="tedian">
        <li>{{ building.decorate }}</li>
        <li v-for="ite in building.features" :key="ite.id">{{ ite }}</li>
      </ul>

      <div class="nav">
        <ul>
          <li>
            <nuxt-link :to="`/content/${building.id}`">楼盘主页</nuxt-link>
          </li>
          <li class="active">
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
          <li>
            <nuxt-link :to="`/prodian/${building.id}?page=1`"
              >楼盘点评</nuxt-link
            >
          </li>
        </ul>
        <span>咨询热线：{{ common.phone.replace(",", "转") }}</span>
      </div>
      <!-- 基本信息 -->
      <div class="detail_box">
        <div class="lou_detail_left">
          <h3>基本信息</h3>
          <ul class="jiben">
            <li>
              楼盘名称:
              <span>{{ building.name }}</span>
            </li>
            <li>
              装修状况：
              <span>{{ building.decorate }}</span>
            </li>
            <li>
              楼盘地址:
              <span>{{ building.address }}</span>
            </li>
            <li>
              层 高:
              <span>{{ building.height }}米</span>
            </li>
            <li>
              建筑类型:
              <span>{{ building.type }}</span>
            </li>
            <li>
              产权年限:
              <span>{{ building.year }}年</span>
            </li>
            <li>
              预售许可证:
              <span>{{ building.license }}</span>
            </li>
          </ul>
          <h3>销售信息</h3>
          <ul class="jiben">
            <li>
              参考单价：
              <span>均价{{ building.price }}元/m²</span>
              <em @click="bianTong(91)">
                <img src="~/assets/icon/bian.png" alt="" />
                变价通知
              </em>
            </li>
            <li>
              楼盘户型：
              <span>{{ building.room_types }}</span>
            </li>
            <li>
              参考总价：
              <span>{{ building.total_price }}万起</span>
            </li>
            <li>
              开盘时间：
              <span>{{ building.open_time }}</span>
              <em @click="bianTong(92)">
                <img src="~/assets/icon/tixing.png" alt="" />
                开盘提醒
              </em>
            </li>
            <li>
              交房时间：
              <span>{{ building.give_time }}</span>
            </li>
            <li>
              开 发 商：
              <span>{{ building.proprety_company }}</span>
            </li>
          </ul>
          <h3>建筑信息</h3>
          <ul class="jiben">
            <li>
              户型面积：
              <span>{{ building.area }}m²</span>
            </li>
            <li>
              公交路线：
              <span>{{ building.traffic }}</span>
            </li>
            <li>
              建筑面积：
              <span>{{ building.built_area }}m²</span>
            </li>
            <li>
              物业费用：
              <span>{{ building.property_fee }}元/m².月</span>
            </li>
            <li>
              容 积 率：
              <span>{{ building.capacity_rate }}</span>
            </li>
            <li>
              物业公司：
              <span>{{ building.developer }}</span>
            </li>
            <li>
              绿 化 率：
              <span>{{ building.green_rate }}%</span>
            </li>
            <li>
              车位情况：
              <span
                >{{ building.parking_rate }}:1（{{
                  building.parking_num
                }}个车位）</span
              >
            </li>
          </ul>
          <div class="project_jie">
            <h4>项目介绍</h4>
            <p>{{ building.introduce }}</p>
          </div>
          <!--报名框-->
          <div class="bao_box">
            <p>
              这个楼盘有什么优缺点？开发商资质如何？买房需要注意什么？更多问题，敬请免费咨询
            </p>
            <div class="bao_input">
              <input
                type="text"
                placeholder="请输入您的手机号"
                v-model="bottom_tel"
                maxlength="11"
                id="phone_bot"
              />
              <button @click="mianZiBtn(104)">免费咨询</button>
            </div>
          </div>
        </div>

        <div class="lou_detail_right">
          <my-right-dao :daolist="articles"></my-right-dao>
          <!-- <right-bao-ming :img_bg="img_bg_data"></right-bao-ming> -->
          <div class="yukanfang">
            <div class="yu_title" :style="img_bg_data"></div>
            <div class="form_box">
              <div class="checkbox_box">
                <div class="top">
                  <input
                    type="checkbox"
                    v-model="checked"
                    class="checkbox"
                    label="最新动态"
                    value="最新动态"
                  />
                  <span>最新动态</span>
                  <input
                    type="checkbox"
                    v-model="checked"
                    class="checkbox"
                    label="变价通知"
                    value="变价通知"
                  />
                  <span>变价通知</span>
                  <input
                    type="checkbox"
                    v-model="checked"
                    class="checkbox"
                    label="开盘通知"
                    value="开盘通知"
                  />
                  <span>开盘通知</span>
                </div>
                <div class="bottom">
                  <input
                    type="checkbox"
                    v-model="checked"
                    class="checkbox"
                    label="优惠通知"
                    value="优惠通知"
                  />
                  <span>优惠通知</span>
                  <input
                    type="checkbox"
                    v-model="checked"
                    class="checkbox"
                    label="预约看房"
                    value="预约看房"
                  />
                  <span>预约看房</span>
                </div>
              </div>
              <input
                type="text"
                placeholder="请输入手机号码（必填）"
                v-model="telphone"
                id="phone"
                maxlength="11"
              />
              <p class="xieyi">
                <input type="checkbox" v-model="checked_xie" class="checkbox" />
                <span>我已阅读并同意<em><nuxt-link to="/we/fuwu">《{{logo_text}}用户协议》</nuxt-link></em></span>
              </p>
              <button @click="tijiaoDong">确定</button>
            </div>
          </div>
        </div>
      </div>
      <!-- 图形验证码组件 -->
      <my-tu-yan
        ref="imgyan"
        :point="98"
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
        <div class="massage">{{ msg }}</div>
      </div>
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
import right_dao from "~/components/danpage/xiangdao.vue";
import right_bao_ming from "~/components/danpage/yukanfang.vue";
import footer from "~/components/footer.vue";
import tuyanMa from "~/components/tuyan.vue";
import $ from "jquery";
import img1 from "~/assets/b1.jpg";
import img2 from "~/assets/b2.jpg";
import img3 from "~/assets/b3.jpg";
import img4 from "~/assets/b4.jpg";
import img5 from "~/assets/b5.jpg";
import img6 from "~/assets/b6.jpg";
import axios from 'axios'
export default {
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
  head() {
    return {
      title:this.common.header.title ,
      meta: [
        {
          hid: "description",
          name: "description",
          content:this.common.header.description
        },
        { hid: "Keywords", name: "Keywords", content:this.common.header.keywords }
      ]
    };
  },
  async asyncData({ app, query, params, store }) {
    let host = store.state.hostname;
    console.log(host);
      let id = params.id;
     let uuid = query.uuid;
      if(uuid && uuid!=="undefined" && uuid!=="null"){
        uuid =uuid;
      }else{
         uuid="";
      }
    let [data] = await Promise.all([
      //参数
      // id 项目id
      // token
      // other
      app.$axios.get(`/jy/project/base/pc?id=${id}&uuid=${uuid}&token=${store.state.token}&other=${store.state.other}&host=${host}`).then((res) => {
        if (res.data.code == 200) {
          let data = res.data;
          return data;
        }
      }),
    ]);
    return {
      common: data.common,
      articles: data.articles,
      building: data.building,
    };
  },
  components: {
    "my-header": header,
    "my-mianbao": mianbao,
    "my-right-dao": right_dao,
    "right-bao-ming": right_bao_ming,
    "my-footer": footer,
    "my-tu-yan": tuyanMa,
  },
  data() {
    return {
      common: {},
      articles: [],
      building: {},
      img_bg_data: {
        backgroundImage: "url(" + require("~/assets/loudong_top.jpg") + ")",
        backgroundRepeat: "no-repeat",
      },
      checked: [],
      checked_xie: true,
      telphone: "",
      myremark: "",
      bottom_tel: "",
      //图形验证码部分
      tuYanFlag: false,
      textt: "向右滑",
      imgs: [img1, img2, img3, img4, img5, img6],
      msg: "", //图形验证码
      routerData:[],
      logo_text:"家园"
    };
  },
  methods: {
    mianZiBtn(num){ //下方报名
        sessionStorage.setItem("bao_id",num);
        var number = this.bottom_tel;
        let myreg = new RegExp("^[1][3,4,5,7,8][0-9]{9}$");
         if (number !== "") {
            if (!myreg.test(number)) {
              $("#phone_bot").val("");
              $("#phone_bot").attr("placeholder", "手机号码不合法");
            } else {
               this.tuYanFlag = true;
            }
          } else {
            $("#phone_bot").attr("placeholder", "手机号不能为空");
          }
    },
    tijiaoDong() {
      //右侧报名
      var number = this.telphone;
      var sel = this.checked;
      var newsel = sel.join(",");
      let myreg = new RegExp("^[1][3,4,5,7,8][0-9]{9}$");
      if (this.checked_xie == true) {
        if (newsel !== "") {
          if (number !== "") {
            if (!myreg.test(number)) {
              $("#phone").val("");
              $("#phone").attr("placeholder", "手机号码不合法");
            } else {
              this.$refs.imgyan.show1 = true;
              $("#phone").val("");
            }
          } else {
            $("#phone").attr("placeholder", "手机号不能为空");
          }
        } else {
          this.$message.error("订阅选项不能为空");
        }
      } else {
        this.$message.error("请勾选用户协议");
      }
    },
    bianTong(num) {
      sessionStorage.setItem("bao_id", num);
      sessionStorage.setItem("project_id", this.building.id);
      switch (num) {
        case 91:
          this.$parent.$parent.baoming_tel.tan_title = "变价通知"; //ok
          this.$parent.$parent.baoming_tel.tan_content =
            "价格变动这么快？订阅楼盘变价通知，楼盘变价我们将第一时间通知您";
          this.$parent.$parent.baoming_tel.default_show = true;
          this.$parent.$parent.baoming_tel.kaipan_show = false;
          break;
        case 92:
          this.$parent.$parent.baoming_tel.tan_title = "开盘提醒"; //ok
          this.$parent.$parent.baoming_tel.kaipan_show = true;
          this.$parent.$parent.baoming_tel.default_show = false;
          break;
      }
      this.$parent.$parent.baoming_tel.telflag = true;
    },
    onFail() {
      this.msg = "验证失败";
    },
    onRefresh() {
      this.msg = "";
    },
    onSuccess() { //免费咨询104
      this.msg = "验证通过";
      var posit = sessionStorage.getItem("bao_id");
      let phone = "";
      let remark = "";
      let name = "";
      if (posit == 104) {
        phone = this.bottom_tel;
        remark = "楼盘详情页+免费咨询";
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
              this.tuYanFlag = false;
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
  },
  watch: {
    checked(val) {
      var newsel = this.checked.toString();
      this.myremark = `项目详情页+订阅楼盘动态+${newsel}`;
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
  mounted() {
     this.$parent.$parent.heng_name = this.building.name;
     this.$parent.$parent.saoma_telphone = this.common.phone;


       let  token = localStorage.getItem('token');
       let old_tel=localStorage.getItem("old_tel");
        if(token && old_tel){
            this.telphone=old_tel;
            this.bottom_tel =old_tel;
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
         "name":`${this.building.name}楼盘详情`,
         "to":''
       }
    ];
    var newsel = this.checked.toString();
    console.log(newsel);
  },
};
</script>

<style lang="less" scoped>
.loudetail {
  width: 100%;
  height: auto;
  .loudetail_box {
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
        width: 915px;
        li {
          font-size: 16px;
          font-family: "Microsoft YaHei";
          font-weight: 400;
          color: #646566;
          line-height: 44px;
          float: left;
          margin-right: 40px;
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
    //基本信息
    .detail_box:after {
      content: "";
      height: 0;
      clear: both;
      overflow: hidden;
      display: block;
      visibility: hidden;
    }
    .detail_box {
      .lou_detail_left {
        width: 860px;
        height: auto;
        float: left;
        h3 {
          font-size: 24px;
          font-family: "Microsoft YaHei";
          font-weight: 400;
          color: #313233;
          line-height: 48px;
          width: 860px;
          border-bottom: 1px solid #ededed;
          margin-top: 40px;
          margin-bottom: 15px;
        }
        .jiben:after {
          content: "";
          height: 0;
          clear: both;
          overflow: hidden;
          display: block;
          visibility: hidden;
        }
        .jiben {
          li {
            font-size: 14px;
            font-family: " Microsoft YaHei";
            font-weight: 400;
            color: #646566;
            line-height: 34px;
            float: left;
            width: 422px;
            display: flex;
            span {
              color: #313233;
              margin-left: 20px;
            }
            em {
              width: 90px;
              height: 28px;
              background: #f0f7f3;
              border-radius: 2px;
              color: #3da56a;
              display: inline-block;
              line-height: 28px;
              text-align: center;
              margin-left: 18px;
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
            }
          }
        }
        .project_jie {
          h4 {
            font-size: 24px;
            font-family: "Microsoft YaHei";
            font-weight: 400;
            color: #313233;
            line-height: 24px;
            margin-top: 40px;
            margin-bottom: 25px;
          }
          p {
            font-size: 14px;
            font-family: "Microsoft YaHei";
            font-weight: 400;
            color: #646566;
            line-height: 24px;
            margin-bottom: 35px;
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
      }
      .lou_detail_right {
        width: 340px;
        height: auto;
        float: right;
        padding-top: 67px;
        .yukanfang {
          width: 300px;
          height: 320px;
          border: 1px solid #ededed;
          float: right;
          margin-top: 40px;
          .yu_title {
            width: 300px;
            height: 70px;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            font-weight: bold;
            color: #ffffff;
            line-height: 70px;
            background: url("../../../assets/icon2.png") no-repeat;
            h3 {
              font-size: 18px;
              font-family: "Microsoft YaHei";
              font-weight: bold;
              color: #ffffff;
              line-height: 70px;
              margin-left: 14px;
            }
          }
          .form_box {
            padding-left: 16px;
            padding-right: 16px;
            .checkbox_box {
              .top {
                width: 268px;
                margin-top: 25px;
                margin-bottom: 10px;
              }
              .bottom {
                width: 268px;
                margin-bottom: 10px;
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
              }
              input[type="checkbox"]:checked {
                background: url("../../../assets/bao_dui.png") no-repeat center;
              }
              span {
                font-size: 14px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: #313233;
                line-height: 20px;
                margin-right: 8px;
              }
            }
            .tips {
              font-size: 14px;
              font-family: "Microsoft YaHei";
              font-weight: 400;
              color: #313233;
              line-height: 20px;
              margin-top: 21px;
              margin-bottom: 18px;
            }
            input {
              width: 267px;
              height: 40px;
              border: 1px solid #ededed;
              color: #646566;
              font-size: 14px;
              font-weight: 400;
              text-indent: 1em;
            }
            .xieyi {
              float: left;
              display: flex;
              justify-content: center;
              align-items: center;
              input[type="checkbox"] {
                width: 16px;
                height: 16px;
                background-color: #fff;
                -webkit-appearance: none;
                border: 1px solid #e8e8e8;
                border-radius: 3px;
                outline: none;
                cursor: pointer;
              }
              input[type="checkbox"]:checked {
                background: url("../../../assets/bao_dui.png") no-repeat center;
              }
              .checkbox {
                margin-right: 5px;
              }
              span {
                font-size: 12px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: #7a7a7a;
                line-height: 40px;
                em {
                  color: #498de1;
                  font-size: 12px;
                  a{
                    color: #498de1;
                  }
                }
              }
            }
            button {
              width: 267px;
              height: 40px;
              border: 1px solid #ededed;
              font-size: 16px;
              font-family: "Microsoft YaHei";
              font-weight: 400;
              color: #ffffff;
              line-height: 20px;
              background: #ff9a26;
              outline: none;
              margin-top: 20px;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
  //本页面的图形验证码样式
    .loginyan{
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
}
</style>