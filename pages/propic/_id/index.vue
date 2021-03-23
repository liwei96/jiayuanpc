<template>
  <div class="propic">
    <my-header
      :all="common.city_info.all"
      :telphone="common.phone"
      ref="header"
    ></my-header>
    <my-mianbao :router_data="routerData"></my-mianbao>
    <div class="propic_page">
      <div class="project_name">
        {{ building.name }}
        <span>{{ building.state }}</span>
        <em>{{ building.type }}</em>
      </div>
      <ul class="tedian">
        <li>{{ building.decorate }}</li>
        <li v-for="ite in building.features" :key="ite.id">{{ ite.value }}</li>
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
          <li class="active">
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
      <!-- 图片部分 -->
      <div class="propic_box">
        <div class="propic_left">
          <h2>效果图({{ effect.length }})</h2>
          <ul>
            <li v-for="(item, index) in effect" :key="item.id">
              <el-image
                :popper-append-to-body="false"
                style="width: 200px; height: 160px"
                :src="item"
                :preview-src-list="getSrcList(effect, index)"
                class="bai"
                :alt="`${building.name}效果图`"
                :title="`${building.name}效果图`"
              >
              </el-image>
            </li>
          </ul>
          <h2>实景图({{ real.length }})</h2>
          <ul>
            <li v-for="(item, index) in real" :key="item.id">
              <el-image
                :popper-append-to-body="false"
                style="width: 200px; height: 160px"
                :src="item"
                :preview-src-list="getSrcList(real, index)"
                class="bai"
                :alt="`${building.name}实景图`"
                :title="`${building.name}实景图`"
              >
              </el-image>
            </li>
          </ul>
          <h2>样板房({{ example.length }})</h2>
          <ul>
            <li v-for="(item, index) in example" :key="item.id">
              <el-image
                :popper-append-to-body="false"
                style="width: 200px; height: 160px"
                :src="item"
                :preview-src-list="getSrcList(example, index)"
                class="bai"
                :alt="`${building.name}样板图`"
                :title="`${building.name}样板图`"
              >
              </el-image>
            </li>
          </ul>
          <h2>配套图({{ matching.length }})</h2>
          <ul>
            <li v-for="(item, index) in matching" :key="item.id">
              <el-image
                :popper-append-to-body="false"
                style="width: 200px; height: 160px"
                :src="item"
                :preview-src-list="getSrcList(matching, index)"
                class="bai"
                :alt="`${building.name}配套图`"
                :title="`${building.name}配套图`"
              >
              </el-image>
            </li>
          </ul>
          <h2>交通图({{ traffic.length }})</h2>
          <ul>
            <li v-for="(item, index) in traffic" :key="item.id">
              <el-image
                :popper-append-to-body="false"
                style="width: 200px; height: 160px"
                :src="item"
                :preview-src-list="getSrcList(traffic, index)"
                class="bai"
                :alt="`${building.name}交通图`"
                :title="`${building.name}交通图`"
              >
              </el-image>
            </li>
          </ul>
          <h2>户型图({{ departments.length }})</h2>
          <ul class="huxing">
            <li v-for="(item, index) in departments" :key="item.id">
              <el-image
                :popper-append-to-body="false"
                style="width: 122px; height: 158px"
                :src="item"
                :preview-src-list="getSrcList(departments, index)"
                class="bai"
                :alt="`${building.name}户型图`"
                :title="`${building.name}户型图`"
              >
              </el-image>
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
        <div class="propic_right">
          <!-- 楼盘分析师 -->
          <div class="lou_fen">
            <div class="loufen_top">
              <h4>楼盘分析师</h4>
              <p>
                <span> <em class="iconfont iconanquan"></em>专业服务 </span>
                <span> <em class="iconfont iconanquan"></em>区域解读 </span>
                <span> <em class="iconfont iconanquan"></em>户型分析 </span>
              </p>
            </div>

            <ul>
              <li v-for="(item, index) in common.staffs" :key="index">
                <img :src="item.head_img" alt class="head_img" />
                <div class="name">
                  <h5>{{ item.name }}</h5>
                  <p>
                    服务人数
                    <em>{{ item.ServeNum }}</em
                    >人
                  </p>
                </div>
                <button @click="bianTong(104)">
                  <img src="~/assets/icon/chat.png" alt="" />
                  在线咨询
                </button>
              </li>
            </ul>
            <div class="baoming">
              <div class="left_bao">
                <h5>您预约、免费小车上门接送</h5>
                <p>专业咨询师1V1服务</p>
              </div>
              <button @click="bianTong(103)">预约看房</button>
            </div>
          </div>
          <my-bao-ming :img_bg="bgImg" :text_tishi="text" ref="right_bao"></my-bao-ming>
          <my-tu-yan
            ref="imgyan"
            :point="103"
            :project_id="this.building.id"
            :name="''"
            :myremark="myremark"
            :myphone="this.telphone"
          ></my-tu-yan>
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


        </div>
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
import footer from "~/components/footer.vue";
import bottombaoming from "~/components/danpage/baomingkuang.vue";
import baoming from "~/components/danpage/yukanfang.vue";
import tuyanMa from "~/components/tuyan.vue";
import axios from 'axios';
import img1 from "~/assets/b1.jpg";
import img2 from "~/assets/b2.jpg";
import img3 from "~/assets/b3.jpg";
import img4 from "~/assets/b4.jpg";
import img5 from "~/assets/b5.jpg";
import img6 from "~/assets/b6.jpg";
import $ from 'jquery';
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
          content: this.common.header.description
        },
        { hid: "Keywords", name: "Keywords", content:this.common.header.keywords }
      ]
    };
  },
  components: {
    "my-header": header,
    "my-mianbao": mianbao,
    "my-footer": footer,
    "bottom-bao-ming": bottombaoming,
    "my-bao-ming": baoming,
    "my-tu-yan": tuyanMa,
  },
  async asyncData({ app, query, params, store }) {
     let  host = store.state.hostname;
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
      app.$axios.get(`/jy/img/list?id=${id}&uuid=${uuid}&token=${store.state.token}&other=${store.state.other}&host=${host}`).then((res) => {
        if (res.data.code == 200) {
          let data = res.data;
          return data;
        }
      }),
    ]);
    let effect = [];
    let real = [];
    let example = [];
    let matching = [];
    let traffic = [];
    let departments = [];
    let imgs = data.imgs;
    if (imgs.effect.length > 0) {
      imgs.effect.map((p) => {
        effect.push(p.big);
      });
    } else {
      effect = [];
    }

    if (imgs.traffic.length > 0) {
      imgs.traffic.map((p) => {
        traffic.push(p.big);
      });
    } else {
      traffic = [];
    }

    if (imgs.real.length > 0) {
      imgs.real.map((p) => {
        real.push(p.big);
      });
    } else {
      real = [];
    }

    if (imgs.example.length > 0) {
      imgs.example.map((p) => {
        example.push(p.big);
      });
    } else {
      example = [];
    }

    if (imgs.matching.length > 0) {
      imgs.matching.map((p) => {
        matching.push(p.big);
      });
    } else {
      matching = [];
    }

    if (imgs.departments.length > 0) {
      imgs.departments.map((p) => {
        departments.push(p.big);
      });
    } else {
      departments = [];
    }

    return {
      common: data.common,
      traffic: traffic,
      effect: effect,
      real: real,
      example: example,
      matching: matching,
      departments: departments,
      building: data.building,
    };
  },
  data() {
    return {
      baotext:
        "这个楼盘有什么优缺点？开发商资质如何？我有没有购房资质？更多问题，咨询师帮您答疑解惑",
      common: {},
      building: {},

      traffic: [],
      effect: [],
      real: [],
      example: [],
      matching: [],
      departments: [],
      bgImg: {
        backgroundImage: "url(" + require("~/assets/yufang.jpg") + ")",
        backgroundRepeat: "no-repeat",
      },
      text: "看照片怎么够，预约看房我们将提供免费专车接送和专业楼盘讲解",
      myremark: "",
      telphone: "",
       //图形验证码部分
      tuYanFlags: false,
      textt: "向右滑",
      imgs: [img1, img2, img3, img4, img5, img6],
      msg: "",
      bottom_telphone:'',
      routerData:[],
    };
  },
  mounted() {
      this.$parent.$parent.heng_name = this.building.name;
      this.$parent.$parent.saoma_telphone = this.common.phone;

      let  token = localStorage.getItem('token');
      let old_tel=localStorage.getItem("old_tel");
      if(token && old_tel){
          this.bottom_telphone=old_tel;
          this.$refs.right_bao.telphone =old_tel;
      }else {
      }

    this.myremark = `楼盘相册页面+预约看房`;
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
         "name":`${this.building.name}楼盘相册`,
         "to":''
       }
    ];
  },
  created() {},
  computed: {},
  methods: {
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
                console.log(this.tuYanFlags);
              }
            } else {
              $("#phone_bot").attr("placeholder", "手机号不能为空");
            }
    },
    getSrcList(urls, index) {
      return urls.slice(index).concat(urls.slice(0, index));
    },
    bianTong(num) {
      sessionStorage.setItem("bao_id", num);
      sessionStorage.setItem("project_id", this.building.id);
      switch (num) {
        case 109:
          this.$parent.$parent.baoming_tel.tan_title = "剩余房源查询 "; //ok
          this.$parent.$parent.baoming_tel.tan_content =
            "价格变动这么快？订阅楼盘变价通知，楼盘变价我们将第一时间通知您";
          this.$parent.$parent.baoming_tel.default_show = true;
          this.$parent.$parent.baoming_tel.kaipan_show = false;
          break;
        case 104:
          this.$parent.$parent.baoming_tel.tan_title = "在线咨询"; //ok
          this.$parent.$parent.baoming_tel.tan_content =
            "20分内回应、一对一专业服务，了解更多有关房源信息周边动态";
          this.$parent.$parent.baoming_tel.default_show = true;
          break;
        case 103:
          this.$parent.$parent.baoming_tel.tan_title = "预约看房"; //ok
          this.$parent.$parent.baoming_tel.tan_content =
            "提前预约看房，我们将提供免费专车接送和专业楼盘讲解";
          this.$parent.$parent.baoming_tel.default_show = true;
          this.$parent.$parent.baoming_tel.tan_img = require("~/assets/tankuang/yukanfang.png");
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
    onSuccess() {
      //免费咨询104
      this.msg = "验证通过";
      var posit = sessionStorage.getItem("bao_id");
      let phone = "";
      let remark = "";
      let name = "";
      if (posit == 104) {
        phone = this.bottom_telphone;
        remark = "楼盘相册+免费咨询";
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
  },
};
</script>
<style lang="less" scoped>
/deep/ .bai {
  .el-icon-circle-close {
    color: #fff;
  }
}
/deep/ .huxing {
  .bai {
    position: absolute;
    left: 50%;
    margin-left: -61px;
  }
}
.propic {
  .propic_page {
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
    .propic_box:after {
      content: "";
      height: auto;
      clear: both;
      display: block;
      overflow: hidden;
      visibility: hidden;
    }
    .propic_box {
      width: 1200px;
      height: auto;
      .propic_left {
        width: 880px;
        height: auto;
        float: left;
        h2 {
          font-size: 24px;
          font-family: "Microsoft YaHei";
          font-weight: bold;
          color: #323334;
          line-height: 84px;
          margin-top: 10px;
        }
        ul:after {
          content: "";
          height: 0;
          overflow: hidden;
          visibility: hidden;
          display: block;
          clear: both;
        }
        ul {
          li {
            width: 200px;
            height: 160px;
            float: left;
            margin-right: 20px;
            margin-bottom: 20px;
            img {
              width: 200px;
              height: 160px;
              margin-right: 20px;
            }
          }
        }
        .huxing {
          li {
            width: 200px;
            height: 160px;
            background: #f5f5f5;
            border: 1px solid #eeeeee;
            position: relative;
            img {
              width: 122px;
              height: 158px;
              position: absolute;
              left: 50%;
              margin-left: -61px;
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
        
      }
      .propic_right {
        width: 300px;
        height: auto;
        float: right;
        .lou_fen {
          width: 300px;
          height: 390px;
          border: 1px solid #ededed;
          margin-top: 41px;
          .loufen_top {
            width: 264px;
            height: 56px;
            border-bottom: 1px solid #ededed;
            margin: 0 auto;
            padding-top: 20px;
            h4 {
              font-size: 16px;
              font-family: "Microsoft YaHei";
              font-weight: bold;
              color: #1f1f1f;
              line-height: 16px;
            }
            p {
              font-size: 14px;
              font-family: "Microsoft YaHei";
              font-weight: 400;
              color: #626466;
              margin-top: 10px;
              display: flex;
              justify-content: space-between;
            }
          }
          ul {
            height: 222px;
            li {
              height: 68px;
              width: 264px;
              margin: 0 auto;
              .head_img {
                width: 40px;
                height: 40px;
                border-radius: 20px;
                float: left;
                margin-right: 12px;
                margin-top: 3px;
              }
              .name {
                width: 128px;
                height: 53px;
                float: left;
                h5 {
                  font-size: 16px;
                  font-family: "Microsoft YaHei";
                  font-weight: bold;
                  color: #1f1f1f;
                }
                p {
                  font-size: 14px;
                  font-family: "Microsoft YaHei";
                  font-weight: 400;
                  color: #8f8f8f;
                  line-height: 14px;
                  margin-top: 12px;
                  em {
                    color: #ff5543;
                  }
                }
              }
              button {
                width: 84px;
                height: 30px;
                background: #f0f7f3;
                border: 1px solid #3da56a;
                border-radius: 2px;
                float: left;
                margin-top: 5px;
                color: #3da56a;
                display: flex;
                justify-content: center;
                align-items: center;
              }
            }
            li:last-child {
              border-bottom: 1px solid #ededed;
            }
            li:first-child {
              padding-top: 15px;
            }
          }
          .baoming {
            width: 271px;
            height: 60px;
            background: #fff7ed;
            border-radius: 2px;
            margin-top: 15px;
            margin-left: 16px;
            .left_bao {
              width: 176px;
              height: 46px;
              float: left;
              padding-left: 11px;
              padding-top: 14px;
              h5 {
                font-size: 14px;
                font-family: "Microsoft YaHei";
                font-weight: bold;
                color: #ff9a26;
              }
              p {
                font-size: 12px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: #b1a889;
              }
            }
            button {
              width: 72px;
              height: 26px;
              background: #ff9a26;
              border-radius: 2px;
              border: none;
              color: #fff;
              font-size: 14px;
              float: right;
              margin-top: 17px;
              margin-right: 12px;
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
      }
    }
  }
}
</style>
