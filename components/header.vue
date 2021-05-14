<template>
  <div class="header">
    <div class="header_cen">
      <div class="logo_box">
        <img
          src="~/assets/logo.png"
          alt
          v-if="this.$store.state.style_mine == 0"
        />
        <img
          src="~/assets/logo_yi.png"
          alt
          v-if="this.$store.state.style_mine == 1"
        />
        <div class="sel_city" @click.stop="showCityBox">
          {{ this.city_name }}
          <span class="iconfont iconxiajiantoushixinxiao"></span>
        </div>
        <div class="city_list" v-show="city_show">
          <h2>选择城市</h2>
          <ul>
            <li
              v-for="item in this._props.all"
              :key="item.id"
              @click="selCity(item)"
              :class="item.area_id == active_num ? 'active' : ''"
            >
              {{ item.city }}
            </li>
          </ul>
        </div>
      </div>
      <div class="center">
        <nuxt-link to="/" exact target="_blank">首页</nuxt-link>
        <em class="gou_bu" v-show="this._props.butie">购房补贴</em>
        <span @click="goPage" :class="{ color_act: showColor }">新房查询</span>
        <nuxt-link to="/tejiafang" target="_blank">特价房源</nuxt-link>
        <nuxt-link to="/baike?type=56&page=1" target="_blank"
          >买房百科</nuxt-link
        >
        <nuxt-link to="/fangzi/46/1" target="_blank">房产资讯</nuxt-link>
        <nuxt-link to="/join" target="_blank">平台合作</nuxt-link>
      </div>
      <div class="login">
        <div class="login_box" @click="showLogin" v-show="login_show">
          <span class="iconfont icondenglu"></span>
          <em>登录</em>
        </div>
        <div class="exit" v-show="exit_show">
          <em @click="goShou">{{ login_tel }}</em>
          <span @click="exitTip">[退出]</span>
        </div>
        <p>咨询热线:{{ this._props.telphone.replace(",", "转") }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      city_name: "",
      com_tel: "400-718-6686",
      city_show: false,
      login_tel: "154***689",
      login_show: true,
      exit_show: false,
      active_num: 0,
      showColor: false,
      logo: require("~/assets/logo.png"),

      mine: 0,
    };
  },
  props: {
    butie: {
      type: Boolean,
      default: false,
    },
    // current:{},
    all: {},
    telphone: {},
    name: {
      default: "杭州市",
    },
  },
  // props:["current",'all','telphone','butie'],
  watch: {},
  beforeMount() {
    if (this.$route.name == "searchpro-order") {
      this.showColor = true;
    } else {
      this.showColor = false;
    }

    let mine = this.$store.state.style_mine;
    this.mine = mine;
  },
  methods: {
    goPage() {
      sessionStorage.removeItem("typearr");
      this.$router.push("/searchpro");
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
      let mine = this.$store.state.style_mine;
      console.log(mine, "mine");
      if (mine == 0) {
        if (uuid && uuid !== "undefined" && uuid !== "null") {
          if (pinyin !== "") {
            window.location.href =
              "http://" + pinyin + ".jy1980.com?uuid=" + uuid;
          }
        } else {
          if (pinyin !== "") {
            window.location.href = "http://" + pinyin + ".jy1980.com";
          }
        }
      } else if (mine == 1) {
        if (uuid && uuid !== "undefined" && uuid !== "null") {
          if (pinyin !== "") {
            window.location.href =
              "http://" + pinyin + ".edefang.net?uuid=" + uuid;
          }
        } else {
          if (pinyin !== "") {
            window.location.href = "http://" + pinyin + ".edefang.net";
          }
        }
      }
      // let uuid = localStorage.getItem('uuid');
    },
    goShou() {
      this.$router.push("/shou/shouc?page=1");
    },
    exitTip() {
      let path_name = this.$route.name;
      if (path_name == "shou-shouc" || path_name == "shou-zu") {
        localStorage.removeItem("token");
        localStorage.removeItem("tel");
        this.$cookies.remove("token");
        this.login_show = true;
        this.exit_show = false;
        this.$router.push("/");
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("tel");
        this.$cookies.remove("token");
        this.login_show = true;
        this.exit_show = false;
        this.$router.go(0);
      }
    },
    showLogin() {
      this.$parent.$parent.$parent.loginTan = true;
    },
    showCityBox() {
      this.city_show = !this.city_show;
    },
    cityBoxHidden() {
      this.city_show = false;
    },
  },
  mounted() {
    document.addEventListener("click", this.cityBoxHidden, false);
    let city_name = this.name;
    let token = localStorage.getItem("token");
    var tel = localStorage.getItem("tel");
    var old_tel = localStorage.getItem("old_tel");
    let city_id = sessionStorage.getItem("city_id");
    //原本的，用后加上
    //  if(city_name){
    //    this.city_name =city_name;
    //  }else{
    //     this.city_name ="杭州市";
    //  }

    let mine = this.$store.state.style_mine;
    this.mine = mine;

    //审核用 ，用后删掉
    let host = window.location.host;
    if (host.indexOf("xuzhou") != -1) {
      //包含徐州
      this.city_name = "徐州市";
    } else if (host.indexOf("hangzhou") != -1) {
      //包含杭州
      this.city_name = "杭州市";
    } else if ((host.indexOf("ningbo") != -1) == true) {
      //包含宁波
      this.city_name = "宁波市";
    } else if ((host.indexOf("jiaxing") != -1) == true) {
      //包含嘉兴
      this.city_name = "嘉兴市";
    } else if (host.indexOf("huzhou") != -1) {
      //包含湖州
      this.city_name = "湖州市";
    } else if (host.indexOf("shaoxing") != -1) {
      //包含绍兴
      this.city_name = "绍兴市";
    } else if (host.indexOf("zhanjiang") != -1) {
      //包含湛江
      this.city_name = "湛江市";
    } else if (host.indexOf("chongqing") != -1) {
      //包含重庆
      this.city_name = "重庆市";
    } else if ((host.indexOf("chengdu") != -1) == true) {
      //包含成都
      this.city_name = "成都市";
    } else if ((host.indexOf("guiyang") != -1) == true) {
      //包含贵阳
      this.city_name = "贵阳市";
    } else if ((host.indexOf("wuxi") != -1) == true) {
      //包含无锡市
      this.city_name = "无锡市";
    } else if ((host.indexOf("zhaoqing") != -1) == true) {
      //包含肇庆市
      this.city_name = "肇庆市";
    } else if ((host.indexOf("shangrao") != -1) == true) {
      //包含上饶市
      this.city_name = "上饶市";
      console.log("shangrao");
    } else if ((host.indexOf("nanchang") != -1) == true) {
      //包含南昌市
      this.city_name = "南昌市";
      console.log("shangrao");
    } else if ((host.indexOf("langfang") != -1) == true) {
      //包含廊坊市
      this.city_name = "廊坊市";
      console.log("shangrao");
    } else if ((host.indexOf("nantong") != -1) == true) {
      //包含南通市
      this.city_name = "南通市";
      console.log("shangrao");
    } else if ((host.indexOf("yichang") != -1) == true) {
      //包含南通市
      this.city_name = "宜昌市";
      console.log("shangrao");
    } else if ((host.indexOf("qiannan") != -1) == true) {
      //包含南通市
      this.city_name = "黔南州";
      console.log("shangrao");
    } else if ((host.indexOf("kunming") != -1) == true) {
      //包含南通市
      this.city_name = "昆明市";
      console.log("kunming");
    } else {
      this.city_name = "杭州市";
    }

    //之后加的
    if ((host.indexOf("www.jy1980") != -1) == true) {
      sessionStorage.setItem("city_name", "杭州市");
      sessionStorage.setItem("city_id", 1);
    }

    if (city_id) {
    } else {
      this.$cookies.set("city_id", 1);
    }
    if (token && tel) {
      this.login_show = false;
      this.exit_show = true;
      this.login_tel = tel;
    } else {
      this.login_show = true;
    }
  },
};
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 80px;
  .header_cen {
    width: 1200px;
    height: 80px;
    margin: 0 auto;
    .logo_box {
      float: left;
      height: 80px;
      position: relative;
      img {
        margin-top: 10px;
        float: left;
      }
      .sel_city {
        float: left;
        height: 21px;
        width: 75px;
        padding-left: 10px;
        border-left: 1px solid #666666;
        margin-top: 30px;
        margin-left: 31px;
        line-height: 16px;
        margin-right: 33px;
        cursor: pointer;
        span {
          font-size: 21px;
          font-family: "Microsoft YaHei";
          font-weight: 400;
          color: rgba(15, 18, 19, 1);
          line-height: 16px;
        }
      }
      .city_list {
        width: 164px;
        height: auto;
        background: #ffffff;
        box-shadow: 0px 0px 13px 0px rgba(6, 0, 1, 0.08);
        border-radius: 2px;
        position: absolute;
        top: 80px;
        left: 85px;
        z-index: 5000;
        padding-bottom: 5px;
        h2 {
          font-size: 16px;
          font-family: "Microsoft YaHei";
          font-weight: 400;
          color: #1a1a1a;
          line-height: 42px;
          width: 116px;
          border-bottom: 1px solid #f0f1f2;
          margin-left: 24px;
          margin-top: 7px;
        }
        ul {
          padding-left: 8px;
          padding-top: 10px;
          li {
            font-size: 14px;
            font-family: "Microsoft YaHei";
            font-weight: 400;
            color: #4d4d4d;
            line-height: 34px;
            float: left;
            padding-left: 16px;
            padding-right: 16px;
            cursor: pointer;
          }
          .active {
            color: #2ac66d;
          }
        }
      }
    }
    .center {
      float: left;
      position: relative;
      a {
        font-size: 16px;
        font-family: "Microsoft YaHei";
        font-weight: 400;
        color: rgba(49, 50, 51, 1);
        line-height: 80px;
        margin-right: 24px;
      }
      .gou_bu {
        width: 57px;
        height: 19px;
        border: 1px solid #ff4b28;
        border-radius: 10px 10px 10px 0px;
        font-size: 12px;
        font-family: "Microsoft YaHei";
        font-weight: 400;
        color: #ff4b28;
        display: inline-block;
        line-height: 19px;
        text-align: center;
        position: absolute;
        left: 80px;
        top: 6px;
        font-weight: bold;
      }
      span {
        font-size: 16px;
        font-family: "Microsoft YaHei";
        font-weight: 400;
        color: rgba(49, 50, 51, 1);
        line-height: 80px;
        margin-right: 24px;
        cursor: pointer;
      }
      .color_act {
        border-bottom: 3px solid #2ac66e;
        padding-bottom: 10px;
        color: #0f1213;
        font-weight: bold;
      }
      .nuxt-link-active {
        border-bottom: 3px solid #2ac66e;
        padding-bottom: 10px;
        color: #0f1213;
        font-weight: bold;
      }
    }
    .login {
      float: right;
      .login_box {
        float: left;
        line-height: 80px;
        margin-right: 30px;
        cursor: pointer;
      }
      .exit {
        float: left;
        line-height: 80px;
        margin-right: 13px;
        cursor: pointer;
      }
      p {
        float: left;
        font-size: 18px;
        font-family: "Microsoft YaHei";
        font-weight: bold;
        color: rgba(15, 18, 19, 1);
        line-height: 80px;
      }
    }
  }
}
</style>