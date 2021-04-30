<template>
  <div>
    <Nuxt />
    <!-- 聊天框 -->
    <my-chatim ref="chat"></my-chatim>
    <!-- 右侧导航栏 -->
    <div class="right_fixed" v-show="right_fixed">
      <ul class="right_li" v-if="false">
        <li
          @mouseenter="liu_hover"
          :class="{ active: bg_flag.flag1 }"
          @mouseleave="liu_leave"
          @click="liuShow"
        >
          <img :src="img_bg.img_01" alt="" />
          <span>留言</span>
        </li>

        <li
          :class="{ active: bg_flag.flag2 }"
          @mouseenter="online_hover"
          @mouseleave="online_leave"
          class="zixun"
          @mousedown.stop="showChatBox"
          v-show="zixun_show"
        >
          <el-badge :is-dot="nav_show_hong" class="item">
            <img :src="img_bg.img_02" alt="" />
          </el-badge>
          <span>在线</span>
          <em>咨询</em>
        </li>
        <li class="new_news" v-show="xiaoxi_show" @click="showBox">
          <el-badge :is-dot="nav_show_hong" class="item">
            <img src="~/assets/im/xiaoxi.gif" alt="" />
          </el-badge>
          <span>有新</span>
          <em>消息</em>
        </li>

        <li
          @mouseover="saoma_hover"
          :class="{ active: bg_flag.flag3 }"
          @mouseleave="saoma_leave"
        >
          <img :src="img_bg.img_03" alt="" />
          <span>扫码</span>
          <em>拨号</em>
        </li>
        <li
          @mouseover="xiaoChengXu_hover"
          :class="{ active: bg_flag.flag4 }"
          @mouseleave="xiaoChengXu_leave"
        >
          <img :src="img_bg.img_04" alt="" />
          <span>小程</span>
          <em>序</em>
        </li>
        <li
          @mouseover="fan_hui"
          :class="{ active: bg_flag.flag5 }"
          @mouseleave="fan_leave"
          class="up-btn"
        >
          <img :src="img_bg.img_05" alt="" />
          <span>返回</span>
          <em> 顶部</em>
        </li>

        <div class="yewuyuan" v-show="yewu_show">
          <div class="top">
            <img src="~/assets/content_pro.png" alt="" class="head_img" />
            <div class="right_name">
              <h2>{{ ye_box.name }} <i>新房咨询</i></h2>
              <p>从业咨询服务{{ ye_box.year }}年</p>
            </div>
          </div>
          <div class="fenshu">
            <div class="fen_list">
              <strong>{{ ye_box.user_num }} <i>人</i></strong>
              <p>服务客户</p>
            </div>
            <div class="fen_list">
              <strong>{{ ye_box.look_num }} <i>次</i></strong>
              <p>带看客户</p>
            </div>
            <div class="fen_list">
              <strong>{{ ye_box.rate }} <i>%</i></strong>
              <p>好评率</p>
            </div>
          </div>
          <div class="bottom">
            <button class="btn_zixun" @click="goChat">在线咨询</button>
            <button class="shao_zixuxn" @click="showZi">稍后咨询</button>
          </div>
        </div>

        <div class="jiazai" v-show="jiazai_show">
          <h4>加载中</h4>
          <img src="~/assets/dian.gif" alt="" />
        </div>

        <div class="saoma_box bohao" v-show="saoma_flag">
          <img :src="right_sao_url" alt class="erma" />
          <span>微信扫码拨号</span>
        </div>

        <div class="kaifa" v-show="waiting_show">
          <img src="~/assets/waiting.png" alt />
        </div>
      </ul>
      <ul class="right_lis" v-if="true">
        <li class="chatim" @click="showChatBox">
          <img src="~/assets/icon/left-chatim.gif" alt="" />
          <p>买房 <br />咨询</p>
        </li>
        <li class="liuyan" @click="liuShow">
          <img src="~/assets/icon/left-tiwen.png" alt="" />
          <p>留言 <br />提问</p>
        </li>
      </ul>
    </div>
    <!-- 快速登录弹框 -->
    <transition name="slide-fade">
      <div class="login_box" v-show="loginTan">
        <div class="login">
          <div class="login_top">
            <h5>用户快捷登录</h5>
            <i
              class="iconfont iconchahao"
              id="fan_close"
              @click="loginTan = !loginTan"
            ></i>
            <img src="~/assets/tankuang/login_img.png" alt="" />
          </div>
          <div class="login_con">
            <input
              type="text"
              placeholder="输入手机号"
              class="tel"
              v-model="tel"
              maxlength="11"
            />
            <div class="yan">
              <input type="text" placeholder="输入验证码" v-model="code" />
              <span @click="getCode">{{ yanText_login }}</span>
            </div>
            <div class="xieyi">
              <input type="checkbox" v-model="checked" class="checkbox" />
              <p>
                登录即表示您同意
                <em @click="goXie">《{{ logo_text }}用户服务协议》</em>
              </p>
            </div>
            <p class="tips" v-show="loginTips_show">{{ tips }}</p>
            <div class="button">
              <input
                type="button"
                class="fan_btn"
                value="登录"
                @click="goLogin"
              />
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!-- 报名接口 --输入手机号 -->
    <transition name="slide-fade">
      <div class="bao_tan" v-show="baoming_tel.telflag">
        <div class="liu_tel">
          <div class="liu_top" v-show="baoming_tel.default_show">
            <img
              :src="baoming_tel.tan_img"
              alt
              v-show="baoming_tel.yuan_img_show"
            />
            <h2>{{ baoming_tel.tan_title }}</h2>
            <div class="guan">
              <i
                class="iconfont iconchahao"
                id="fan_close"
                @click="closeTelTan"
              ></i>
            </div>
          </div>
          <!-- 开盘通知 top -->
          <div class="liu_top_kaipan" v-show="baoming_tel.kaipan_show">
            <div class="kaipan_box">
              <img :src="baoming_tel.kaipan_img" alt />
              <div class="jiatui">
                <span>加推</span>
                <p>{{ baoming_tel.jiatui_time }}</p>
              </div>
              <div class="kaipan">
                <span>开盘</span>
                <p>{{ baoming_tel.kaipan_time }}</p>
              </div>
            </div>
            <h2>开盘提醒</h2>
            <div class="guan">
              <i
                class="iconfont iconchahao"
                id="fan_close"
                @click="closeTelTan"
              ></i>
            </div>
          </div>
          <!-- 最低真实成交价 top -->
          <div class="newcheng_jia" v-show="baoming_tel.chengjiao">
            <div class="jia_box">
              <table width="384" border="1">
                <thead>
                  <tr>
                    <th>日期</th>
                    <th>成交套数</th>
                    <th>成交金额(万)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in baoming_tel.truePrice"
                    :key="index"
                  >
                    <td>{{ item.date }}</td>
                    <td>{{ item.num }}套</td>
                    <td>***万</td>
                  </tr>
                </tbody>
              </table>
              <img src="~/assets/tankuang/fangdajing.png" alt="" />
            </div>
            <h2>最低真实成交价</h2>
            <div class="guan">
              <i
                class="iconfont iconchahao"
                id="fan_close"
                @click="closeTelTan"
              ></i>
            </div>
          </div>

          <div class="liu_con">
            <p class="tip" v-html="baoming_tel.tan_content"></p>
            <input
              type="text"
              placeholder="输入您的手机号码"
              class="fan_kuang"
              v-model="baoming_tel.telphone"
              maxlength="11"
            />
            <div class="xieyi">
              <input
                type="checkbox"
                v-model="baoming_tel.checked"
                class="checkbox"
              />
              <p>
                我已阅读并同意
                <em @click="goXie">《{{ logo_text }}用户协议》</em>
              </p>
            </div>
            <div class="tishi" v-show="baoming_tel.tishi_show">
              {{ baoming_tel.tishi }}
            </div>
            <input
              type="button"
              class="fan_btn"
              :value="btntxt"
              @click="TuYanShou"
            />
          </div>
        </div>
      </div>
    </transition>
    <!-- 报名接口 --输入验证码 -->
    <div class="bao_tan_yan" v-show="erma_tel.yan_flag">
      <div class="liu_tel">
        <div class="liu_top" v-show="baoming_tel.default_show">
          <img
            :src="baoming_tel.tan_img"
            alt
            v-show="baoming_tel.yuan_img_show"
          />
          <h2>{{ baoming_tel.tan_title }}</h2>
          <div class="guan">
            <i
              class="iconfont iconchahao"
              id="fan_close"
              @click="closeTelTan_y"
            ></i>
          </div>
        </div>
        <!-- 开盘通知 top -->
        <div class="liu_top_kaipan" v-show="baoming_tel.kaipan_show">
          <div class="kaipan_box">
            <img :src="baoming_tel.kaipan_img" alt />
            <div class="jiatui">
              <span>加推</span>
              <p>{{ baoming_tel.jiatui_time }}</p>
            </div>
            <div class="kaipan">
              <span>开盘</span>
              <p>{{ baoming_tel.kaipan_time }}</p>
            </div>
          </div>
          <h2>开盘提醒</h2>
          <div class="guan">
            <i
              class="iconfont iconchahao"
              id="fan_close"
              @click="closeTelTan_y"
            ></i>
          </div>
        </div>
        <!-- 最低真实成交价 top -->
        <div class="newcheng_jia" v-show="baoming_tel.chengjiao">
          <div class="jia_box">
            <table width="384" border="1">
              <thead>
                <tr>
                  <th>日期</th>
                  <th>成交套数</th>
                  <th>成交金额(万)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in baoming_tel.truePrice" :key="index">
                  <td>{{ item.date }}</td>
                  <td>{{ item.num }}套</td>
                  <td>***万</td>
                </tr>
              </tbody>
            </table>
            <img src="~/assets/tankuang/fangdajing.png" alt="" />
          </div>
          <h2>最低真实成交价</h2>
          <div class="guan">
            <i
              class="iconfont iconchahao"
              id="fan_close"
              @click="closeTelTan_y"
            ></i>
          </div>
        </div>

        <div class="liu_con">
          <h6 class="tip">
            验证码已发送到{{ erma_tel.yantel }} 请注意查看<span>{{
              erma_tel.yanText
            }}</span>
          </h6>
          <input
            type="text"
            placeholder="输入验证码"
            class="fan_kuang"
            v-model="erma_tel.tiyan"
          />
          <div class="tishi" v-show="baoming_tel.tishi_show">
            {{ baoming_tel.tishi }}
          </div>
          <input
            type="button"
            class="fan_btn"
            value="立即订阅"
            @click="subTelYan"
          />
        </div>
      </div>
    </div>
    <!-- 留言弹框 -->
    <transition name="slide-fade">
      <div class="liuyan_box" v-show="liuyan_box.liu_flag">
        <div class="liuyan">
          <div class="tit">
            <div class="top">
              <h1>留言提问</h1>
              <div class="guan">
                <i
                  class="iconfont iconchahao"
                  id="fan_close"
                  @click="closeliuTan"
                ></i>
              </div>
            </div>
            <p>
              您遇到的问题或者建议反馈给我们,也可以向我们了解 更多房产相关信息
            </p>
          </div>
          <div class="liu_content">
            <h1>您的问题</h1>
            <el-input
              type="textarea"
              placeholder="在这里输入您的问题"
              v-model="liuyan_box.textarea"
              maxlength="50"
              show-word-limit
            >
            </el-input>
            <h2>联系方式</h2>
            <input
              type="text"
              placeholder="输入您的手机号码"
              v-model="liu_tel_phone"
              maxlength="11"
            />
            <button @click="tiJiaoLiu">提交</button>
          </div>
        </div>
      </div>
    </transition>
    <!-- 活动规则弹框 -->
    <div class="rules_box" v-show="rule_model">
      <div class="rules">
        <h4>
          活动规则
          <span class="iconfont iconchahao" @click="hideRules"></span>
        </h4>
        <div class="content_box">
          <p>
            1、本次团购活动以分档累计补发的方案执行，通过{{
              logo_text
            }}网站成交该项目
          </p>
          <p>
            2、结算时间：网签成功后次月20号发放。补发费用待该范围内的最后一套网签成功后次月20号发放
          </p>
          <p>
            3、核算方式：由开发商或代理公司判定为{{
              logo_text
            }}平台客户即可享受这个优惠
          </p>
          <p>
            4、结算方式：提供已实名的支付宝账户给与您对接的{{
              logo_text
            }}咨询师，规定时间内会将优惠费用打至该账户
          </p>
          <p>
            详细活动方案请致电{{ logo_text }}客服电话：
            <span>400-718-6686</span> 注：活动最终解释权归{{ logo_text }}所有
          </p>
        </div>
      </div>
    </div>
    <!-- 活动规则弹框 -->
    <div class="rules_box" v-show="guizi">
      <div class="rules rules1">
        <h4>
          活动规则
          <span class="iconfont iconchahao" @click="guizi = false"></span>
        </h4>
        <div class="content_box">
          <p>
            即日起，凡是通过本线上营销中心成交的本项目，即送苹果12 pro max一台，平台合计1000台手机送完为止。具体活动详情来电咨询
          </p>
          <p>
             注：活动最终解释权归{{ logo_text }}所有
          </p>
        </div>
      </div>
    </div>
    <!-- 恒大身份证弹框 -->
    <div class="hengda" v-show="hengda_flag">
      <div class="heng">
        <div class="top">
          <img src="~/assets/tankuang/tongyong.png" alt="" />
          <div class="guan">
            <i
              class="iconfont iconchahao"
              id="fan_close"
              @click="hengda_close"
            ></i>
          </div>
        </div>
        <div class="bottom">
          <input
            type="text"
            placeholder="输入身份证号后6位"
            v-model="hengda_id_text"
            maxlength="6"
            onkeyup="value=value.replace(/[^\d\.]/g,'')"
          />
          <p>注：根据本楼盘售楼处规定，实地看房需先提前报备身份证后6位</p>
          <button @click="hengda_id_save">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import axios from "axios";
import chatIm from "~/components/chatIm.vue";
export default {
  components: {
    "my-chatim": chatIm,
  },
  data() {
    return {
      btntxt: '立即订阅',
      guizi: false,
      loginTan: false,
      checked: true,
      tel: "",
      code: "",
      tips: "请勾选用户服务协议",
      loginTips_show: false,
      //输入手机号-报名
      baoming_tel: {
        telflag: false,
        tan_title: "变价通知",
        tan_content:
          "价格变动这么快？订阅楼盘变价通知，楼盘变价我们将第一时间通知您",
        tan_img: require("~/assets/tankuang/bianjia.png"),
        yuan_img_show: true,
        kai_img_show: false,
        default_show: false,
        telphone: "",
        checked: true,
        tishi: "请输入手机号码",
        tishi_show: false,
        kaipan_img: require("~/assets/tankuang/kaipan.png"),
        kaipan_show: false,
        truePrice: [
          {
            date: "2020-08-21",
            num: "2",
          },
          {
            date: "2020-08-23",
            num: "3",
          },
          {
            date: "2020-08-27",
            num: "4",
          },
        ],

        jiatui_time: "2019-06-18",
        kaipan_time: "2019-06-18",

        chengjiao: false,
      },
      erma_tel: {
        yan_flag: false,
        yantel: "187****4376",
        yanText: "获取验证码",
        tiyan: "",
      },
      liuyan_box: {
        liu_flag: false,
        textarea: "",
      },
      flag: true,

      //登录 倒计时
      flag_login: true,
      yanText_login: "获取验证码",
      rule_model: false,

      //恒大部分
      heng_name: "",
      hengda_flag: false,
      hengda_id_text: "",

      //右侧导航部分
      img_bg: {
        img_01: require("~/assets/im/chat_hei.png"),
        img_02: require("~/assets/im/online_liang.png"),
        img_03: require("~/assets/im/sao_hei.png"),
        img_04: require("~/assets/im/xiao_hei.png"),
        img_05: require("~/assets/im/fan_top_hei.png"),
      },
      bg_flag: {
        flag1: false,
        flag2: false,
        flag3: false,
        flag4: false,
        flag5: false,
      },
      yewu_show: false,
      nav_show_hong: true,
      ye_box: {
        name: "",
        year: "",
        look_num: "",
        rate: "",
        user_num: "",
      },
      zixun_show: true,
      xiaoxi_show: false,

      project_id_im: "",
      right_sao_url: "",

      saoma_flag: false,
      waiting_show: false,
      liu_tel_phone: "",

      saoma_telphone: "", //别的页面传过来的
      jiazai_show: false,

      right_fixed: false,

      logo_text: "家园",
    };
  },
  computed: {},
  watch: {
    $route: {
      handler: function (val, oldVal) {
        //存在uuid,就给所有接口添加uuid;
        let uuid = this.$route.query.uuid;
        if (uuid && uuid !== "undefined" && uuid !== "null") {
          console.log("设置", uuid);
          this.$cookies.set("uuid", uuid);
          axios.interceptors.request.use((config) => {
            if (config.method == "post") {
              config.data = {
                ...config.data,
                uuid: uuid,
              };
            } else if (config.method == "get") {
              config.params = {
                uuid: uuid,
                ...config.params,
              };
            }
            return config;
          });
        }

        //注册新的客户信息
        console.log(this.$refs.chat.websock, "websock");
        if (this.$refs.chat.websock && this.$refs.chat.websock !== "") {
          this.registerCustomer();
        }
      },

      // 深度观察监听
      deep: true,
    },
    liuyan_box: {
      handler(val) {
        if (val.liu_flag == true) {
          sessionStorage.setItem("isliu", 1);
        } else {
          sessionStorage.removeItem("isliu");
          if (sessionStorage.getItem("isim")) {
            sessionStorage.removeItem("isim");
            this.$refs.chat.visible = true;
          }
        }
      },
      deep: true,
    },
    baoming_tel: {
      handler(val) {
        if (val.telflag == true) {
          sessionStorage.setItem("isliu", 1);
        } else {
          this.btntxt = '立即订阅'
          sessionStorage.removeItem("isliu");
          if (sessionStorage.getItem("isim")) {
            sessionStorage.removeItem("isim");
            this.$refs.chat.visible = true;
          }
        }
      },
      deep: true,
    },
  },
  beforeMount() {
    this.getLayoutWidth();
    //发现www.jy1980域名时，跳分站  //审核用
    // let city_head_arr = this.$store.state.city_list;
    // let has_city = this.$cookies.get("city_id");
    // let str = "www.jy1980.com";
    let host = window.location.host;
    // if (host.indexOf(str) !== -1) {
    //   if (!city_head_arr.hasOwnProperty(has_city)) {
    //   } else {
    //     window.location.href =
    //       "http://" + city_head_arr[has_city] + ".jy1980.com";
    //   }
    // }

    //https 跳转到http
    if (host.indexOf("https://") !== -1) {
      window.location.href = "http://www.jy1980.com";
    }

    if (host.indexOf("xuzhou") != -1) {
      //包含徐州
      sessionStorage.setItem("city_id", 112);
      this.$cookies.set("city_id", 112);
      sessionStorage.setItem("city_name", "徐州市");
    } else if (host.indexOf("hangzhou") != -1) {
      //包含杭州
      sessionStorage.setItem("city_id", 1);
      this.$cookies.set("city_id", 1);
      sessionStorage.setItem("city_name", "杭州市");
    } else if ((host.indexOf("ningbo") != -1) == true) {
      //包含宁波
      sessionStorage.setItem("city_id", 36);
      this.$cookies.set("city_id", 36);
      sessionStorage.setItem("city_name", "宁波市");
    } else if ((host.indexOf("jiaxing") != -1) == true) {
      //包含嘉兴
      sessionStorage.setItem("city_id", 38);
      this.$cookies.set("city_id", 38);
      sessionStorage.setItem("city_name", "嘉兴市");
    } else if (host.indexOf("huzhou") != -1) {
      //包含湖州
      sessionStorage.setItem("city_id", 104);
      this.$cookies.set("city_id", 104);
      sessionStorage.setItem("city_name", "湖州市");
    } else if (host.indexOf("shaoxing") != -1) {
      //包含绍兴
      sessionStorage.setItem("city_id", 73);
      this.$cookies.set("city_id", 73);
      sessionStorage.setItem("city_name", "绍兴市");
    } else if (host.indexOf("zhanjiang") != -1) {
      //包含湛江
      sessionStorage.setItem("city_id", 93);
      this.$cookies.set("city_id", 93);
      sessionStorage.setItem("city_name", "湛江市");
    } else if (host.indexOf("chongqing") != -1) {
      //包含重庆
      sessionStorage.setItem("city_id", 41);
      this.$cookies.set("city_id", 41);
      sessionStorage.setItem("city_name", "重庆市");
    } else if ((host.indexOf("chengdu") != -1) == true) {
      //包含成都
      sessionStorage.setItem("city_id", 47);
      this.$cookies.set("city_id", 47);
      sessionStorage.setItem("city_name", "成都市");
    } else if ((host.indexOf("guiyang") != -1) == true) {
      //包含贵阳
      sessionStorage.setItem("city_id", 3);
      this.$cookies.set("city_id", 3);
      sessionStorage.setItem("city_name", "贵阳市");
    } else if ((host.indexOf("wuxi") != -1) == true) {
      //包含无锡市
      sessionStorage.setItem("city_id", 149);
      this.$cookies.set("city_id", 149);
      sessionStorage.setItem("city_name", "无锡市");
    } else if ((host.indexOf("zhaoqing") != -1) == true) {
      //包含肇庆市
      sessionStorage.setItem("city_id", 181);
      this.$cookies.set("city_id", 181);
      sessionStorage.setItem("city_name", "肇庆市");
    } else if ((host.indexOf("shangrao") != -1) == true) {
      //包含上饶市
      sessionStorage.setItem("city_id", 216);
      this.$cookies.set("city_id", 216);
      sessionStorage.setItem("city_name", "上饶市");
    } else if ((host.indexOf("nanchang") != -1) == true) {
      //包含南昌市
      sessionStorage.setItem("city_id", 229);
      this.$cookies.set("city_id", 229);
      sessionStorage.setItem("city_name", "南昌市");
    } else if ((host.indexOf("langfang") != -1) == true) {
      //包含廊坊市
      sessionStorage.setItem("city_id", 242);
      this.$cookies.set("city_id", 242);
      sessionStorage.setItem("city_name", "廊坊市");
    } else if ((host.indexOf("nantong") != -1) == true) {
      //包含南通市
      sessionStorage.setItem("city_id", 253);
      this.$cookies.set("city_id", 253);
      sessionStorage.setItem("city_name", "南通市");
    } else if ((host.indexOf("yichang") != -1) == true) {
      //包含南通市
      sessionStorage.setItem("city_id", 191);
      this.$cookies.set("city_id", 191);
      sessionStorage.setItem("city_name", "宜昌市");
    }

    let mine = this.$store.state.style_mine;
    if (mine == 1) {
      //易得房样式
      this.logo_text = "易得房";
    } else if (mine == 2) {
      //家园样式
      this.logo_text = "家园";
    }
  },
  mounted() {
    let path_name = this.$route.name;
    console.log(path_name, "path_name");

    if (path_name == "jingjipeople") {
      this.right_fixed = false;
    } else {
      this.right_fixed = true;
    }

    //百度统计
    var _hmt = _hmt || [];
    (function () {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?230bc6d42c4b990e03d4981911da5ffe";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    })();

    //百度自动回复
    (function () {
      var bp = document.createElement("script");
      var curProtocol = window.location.protocol.split(":")[0];
      if (curProtocol === "https") {
        bp.src = "https://zz.bdstatic.com/linksubmit/push.js";
      } else {
        bp.src = "http://push.zhanzhang.baidu.com/push.js";
      }
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(bp, s);
    })();

    //360 自动提交
    // (function(){
    // var src = "https://jspassport.ssl.qhimg.com/11.0.1.js?d182b3f28525f2db83acfaaf6e696dba";
    // document.write('<script src="' + src + '" id="sozz"><\/script>');
    // })();

    let ip = ip_arr["ip"];
    this.$cookies.set("ip", ip);
    let token = localStorage.getItem("token");
    let old_tel = localStorage.getItem("old_tel");

    if (token && old_tel) {
      this.baoming_tel.telphone = old_tel;
    } else {
    }

    //首次进入给页面添加uuid
    if (window.performance.navigation.type == 1) {
      console.log("页面被刷新！");
      let uuid = this.$route.query.uuid;
      this.$cookies.set("uuid", uuid);
      if (uuid && uuid !== "undefined" && uuid !== "null") {
        axios.interceptors.request.use((config) => {
          if (config.method == "post") {
            config.data = {
              ...config.data,
              uuid: uuid,
            };
          } else if (config.method == "get") {
            config.params = {
              uuid: uuid,
              ...config.params,
            };
          }
          return config;
        });
      }
    } else {
      console.log("首次被加载！");
      let uuid = this.$route.query.uuid;
      this.$cookies.set("uuid", uuid);
      localStorage.setItem("uuid", uuid);
      if (uuid && uuid !== "undefined" && uuid !== "null") {
        axios.interceptors.request.use((config) => {
          if (config.method == "post") {
            config.data = {
              ...config.data,
              uuid: uuid,
            };
          } else if (config.method == "get") {
            config.params = {
              uuid: uuid,
              ...config.params,
            };
          }
          return config;
        });
      } else {
        function num() {
          var timestamp = Date.parse(new Date());
          var $chars =
            "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678"; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
          var maxPos = $chars.length;
          var pwd = "";
          let i = 0;
          for (i = 0; i < 12; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
          }
          timestamp = pwd + timestamp;
          return timestamp;
        }
        var lsnm = num();
        console.log(lsnm);
        localStorage.setItem("uuid", lsnm);
        this.$cookies.set("uuid", lsnm);

        axios.interceptors.request.use((config) => {
          if (config.method == "post") {
            config.data = {
              ...config.data,
              uuid: lsnm,
            };
          } else if (config.method == "get") {
            config.params = {
              uuid: lsnm,
              ...config.params,
            };
          }
          return config;
        });
      }
    }

    //开启websoocket
    if (this.$refs.chat.websock && this.$refs.chat.websock !== "") {
      console.log("开启");
      this.$refs.chat.initWebSocket();
    }

    //回到顶部
    $(".up-btn").click(function () {
      $("html , body").animate({ scrollTop: 0 }, "slow");
    });
  },
  methods: {
    getLayoutWidth() {
      //跳转手机端
      let route_name = this.$route.name;
      if (
        route_name !== "index" &&
        route_name !== "content-id" &&
        route_name !== "article-id"
      ) {
        let host = window.location.host;
        var newhost = host.split(".")[0];
        let width = document.body.clientWidth;
        window.onresize = () => {
          if (width < 490) {
            if (host.indexOf("www.jy1980.com") != -1) {
              window.location.href = "http://m.jy1980.com/hangzhou";
            } else if (host.indexOf("www.edefang.net") != -1) {
              window.location.href = "http://mobile.edefang.net/hangzhou";
            } else if (host.indexOf(newhost + ".jy1980.com") != -1) {
              window.location.href = "http://m.jy1980.com/" + newhost;
            } else if (host.indexOf(newhost + ".edefang.net") != -1) {
              window.location.href = "http://mobile.edefang.net/" + newhost;
            }
          }
        };

        let liu_width = document.body.clientWidth;
        if (liu_width < 490) {
          if (host.indexOf("www.jy1980.com") != -1) {
            window.location.href = "http://m.jy1980.com/hangzhou";
          } else if (host.indexOf("www.edefang.net") != -1) {
            window.location.href = "http://mobile.edefang.net/hangzhou";
          } else if (host.indexOf(newhost + ".jy1980.com") != -1) {
            window.location.href = "http://m.jy1980.com/" + newhost;
          } else if (host.indexOf(newhost + ".edefang.net") != -1) {
            window.location.href = "http://mobile.edefang.net/" + newhost;
          }
        }
      }
    },
    registerCustomer() {
      let project = "";
      let route_name = this.$route.name;
      let uuid = localStorage.getItem("uuid");
      let id = this.$route.params.id;
      if (id && id != "") {
        let match = id.match(/\d+/);
        id = match[0];
      }
      if (route_name == "content-id") {
        project = id;
      } else if (route_name == "loudetail-id") {
        project = id;
      } else if (route_name == "prohuxing-id") {
        project = id;
      } else if (route_name == "propic-id") {
        project = id;
      } else if (route_name == "prodong-id") {
        project = id;
      } else if (route_name == "prowenda-id") {
        project = id;
      } else if (route_name == "prodian-id") {
        project = id;
      } else if (route_name == "hudetail-id") {
        project = id;
      } else if (route_name == "prohuxing") {
        project = id;
      } else if (route_name == "loudianpage-id") {
        project = this.project_id_im;
      } else if (route_name == "prowenpage-id") {
        project = this.project_id_im;
      } else if (route_name == "loudongpage-id") {
        project = this.project_id_im;
      } else {
        project = 0;
      }
      let city = this.$cookies.get("city_id");
      let ip = ip_arr["ip"];
      let data_shang = {
        controller: "Info",
        action: "register",
        params: {
          city: city,
          project: project,
          ip: ip,
          url: window.location.host,
          uuid: uuid,
          host: window.location.host,
        },
      };
      this.$refs.chat.websocketsend(JSON.stringify(data_shang));
    },
    tiJiaoLiu() {
      let phone = this.liu_tel_phone;
      var other = sessionStorage.getItem("other");
      var kid = sessionStorage.getItem("kid");
      var ip = ip_arr["ip"];
      var city = this.$cookies.get("city_id");
      var pattern = new RegExp("^1[345678]\\d{9}$");
      let question = this.liuyan_box.textarea;
      let project = "";
      let route_name = this.$route.name;
      let id = this.$route.params.id;
      // var other = sessionStorage.getItem("other");
      // var kid = sessionStorage.getItem("kid");
      if (id && id !== "") {
        let match = id.match(/\d+/);
        id = match[0];
      }
      if (route_name == "content-id") {
        project = id;
      } else if (route_name == "loudetail-id") {
        project = id;
      } else if (route_name == "prohuxing-id") {
        project = id;
      } else if (route_name == "propic-id") {
        project = id;
      } else if (route_name == "prodong-id") {
        project = id;
      } else if (route_name == "prowenda-id") {
        project = id;
      } else if (route_name == "prodian-id") {
        project = id;
      } else if (route_name == "hudetail-id") {
        project = id;
      } else if (route_name == "prohuxing") {
        project = id;
      } else if (route_name == "loudianpage-id") {
        project = this.project_id_im;
      } else if (route_name == "prowenpage-id") {
        project = this.project_id_im;
      } else if (route_name == "loudongpage-id") {
        project = this.project_id_im;
      } else {
        project = "";
      }

      if (question !== "") {
        if (phone == "") {
          this.$message.error("手机号不能为空");
        } else if (!pattern.test(phone)) {
          this.$message.error("请输入正确的手机号");
        } else {
          axios
            .post("/front/flow/sign", {
              tel: phone,
              ip: ip,
              page: 10, //家园PC端
              project: project,
              city: city,
              position: 6,
              remark: `留言：${this.liuyan_box.textarea}`, //请填写位置对应的名，如“详细楼盘信息”，如果是咨询详细户型请加上户型名
              source: "线上推广1",
              other: other,
              kid: kid,
              name: "", //客户姓名，没有就不填
            })
            .then((res) => {
              if (res.data.code == 200) {
                this.$message.success(res.data.message);
                this.liuyan_box.liu_flag = false;
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      } else {
        this.$message.error("留言内容不能为空");
      }
    },
    showSaoMa() {
      this.saoma_flag = true;
      this.right_sao_url =
        "http://ll.edefang.net//index/weichat/code?channel=2";
    },
    showZi() {
      console.log(this.$refs.chat);
      this.yewu_show = false;
      this.$refs.chat.visible = false;
    },
    liuShow() {
      if (!sessionStorage.getItem("isliu")) {
        this.liuyan_box.liu_flag = true;
        this.$refs.chat.visible = false;
      }
    },
    //右侧导航栏部分
    showChatBox() {
      // this.liuyan_box.liu_flag = false;
      if (this.$refs.chat.websock) {
        this.$refs.chat.visible = true;
        this.$refs.chat.tootip_show = false;
        this.jiazai_show = false;
        this.yewu_show = false;
        var that = this;
        let actived_id = this.$refs.chat.active_id;
        if (actived_id) {
          //     //获取首页面加载信息
          let uuid = localStorage.getItem("uuid");
          let data = {
            controller: "chat",
            action: "index",
            params: {
              staff: actived_id,
              customer: uuid,
              host: window.location.host,
            },
          };
          that.$refs.chat.websocketsend(JSON.stringify(data));
        }
        //此时再注册一次确保，弹框显示时，没有业务员接洽时，调用自动回复
        let uuid = localStorage.getItem("uuid");
        setTimeout(function () {
          let data = {
            controller: "chat",
            action: "auto",
            params: {
              uuid: uuid,
              host: window.location.host,
            },
          };
          that.$refs.chat.websocketsend(JSON.stringify(data));
        }, 1000);

        let data_staff_list = {
          controller: "Staff",
          action: "lists",
          params: {
            uuid: uuid,
            host: window.location.host,
          },
        };
        that.$refs.chat.websocketsend(JSON.stringify(data_staff_list));
      } else {
        this.jiazai_show = true;
        console.log("未连接");
        let that = this;
        setTimeout(function () {
          that.showChatBox();
        }, 2000);
      }
    },
    liu_hover() {
      this.img_bg.img_01 = require("~/assets/im/chat.png");
      this.bg_flag.flag1 = true;
    },
    liu_leave() {
      this.img_bg.img_01 = require("~/assets/im/chat_hei.png");
      this.bg_flag.flag1 = false;
    },
    online_hover() {
      this.bg_flag.flag2 = true;
      this.img_bg.img_02 = require("~/assets/im/online.png");
    },
    online_leave() {
      this.img_bg.img_02 = require("~/assets/im/online_liang.png");
      this.bg_flag.flag2 = false;
    },
    saoma_hover() {
      this.img_bg.img_03 = require("~/assets/im/sao.png");
      this.bg_flag.flag3 = true;
      this.saoma_flag = true;

      let route_name = this.$route.name;
      if (route_name == "content-id") {
        this.right_sao_url = `http://ll.edefang.net//index/weichat/code?tel=${this.saoma_telphone}`;
      } else if (route_name == "loudetail-id") {
        this.right_sao_url = `http://ll.edefang.net//index/weichat/code?tel=${this.saoma_telphone}`;
      } else if (route_name == "prohuxing-id") {
        this.right_sao_url = `http://ll.edefang.net//index/weichat/code?tel=${this.saoma_telphone}`;
      } else if (route_name == "propic-id") {
        this.right_sao_url = `http://ll.edefang.net//index/weichat/code?tel=${this.saoma_telphone}`;
      } else if (route_name == "prodong-id") {
        this.right_sao_url = `http://ll.edefang.net//index/weichat/code?tel=${this.saoma_telphone}`;
      } else if (route_name == "prowenda-id") {
        this.right_sao_url = `http://ll.edefang.net//index/weichat/code?tel=${this.saoma_telphone}`;
      } else if (route_name == "prodian-id") {
        this.right_sao_url = `http://ll.edefang.net//index/weichat/code?tel=${this.saoma_telphone}`;
      } else if (route_name == "loudianpage-id") {
        this.right_sao_url = `http://ll.edefang.net//index/weichat/code?tel=${this.saoma_telphone}`;
      } else if (route_name == "prowenpage-id") {
        this.right_sao_url = `http://ll.edefang.net//index/weichat/code?tel=${this.saoma_telphone}`;
      } else if (route_name == "loudongpage-id") {
        this.right_sao_url = `http://ll.edefang.net//index/weichat/code?tel=${this.saoma_telphone}`;
      } else {
        this.right_sao_url =
          "http://ll.edefang.net//index/weichat/code?channel=2";
      }
    },
    saoma_leave() {
      this.img_bg.img_03 = require("~/assets/im/sao_hei.png");
      this.bg_flag.flag3 = false;
      this.saoma_flag = false;
    },
    xiaoChengXu_hover() {
      this.img_bg.img_04 = require("~/assets/im/xiao.png");
      this.bg_flag.flag4 = true;
      this.waiting_show = true;
    },
    xiaoChengXu_leave() {
      this.img_bg.img_04 = require("~/assets/im/xiao_hei.png");
      this.bg_flag.flag4 = false;
      this.waiting_show = false;
    },
    fan_hui() {
      this.img_bg.img_05 = require("~/assets/im/fan_top.png");
      this.bg_flag.flag5 = true;
    },
    fan_leave() {
      this.img_bg.img_05 = require("~/assets/im/fan_top_hei.png");
      this.bg_flag.flag5 = false;
    },
    goChat() {
      this.$refs.chat.visible = true;
      this.yewu_show = false;
      this.zixun_show = true;
      this.xiaoxi_show = false;
    },
    showBox() {
      console.log("1111");
      this.$refs.chat.visible = true;
      this.xiaoxi_show = false;
      this.zixun_show = true;
      let uuid = localStorage.getItem("uuid");
      let that = this;
      if (this.$refs.chat.websock) {
        let data_staff_list = {
          controller: "Staff",
          action: "lists",
          params: { uuid: uuid, host: window.location.host },
        };
        that.$refs.chat.websocketsend(JSON.stringify(data_staff_list));
      }
    },

    goXie() {
      this.$router.push("/we/fuwu");
      this.baoming_tel.telflag = false;
      this.loginTan = false;
    },
    hengda_close() {
      // $(".guan").css({
      //   transform: "rotate(90deg)",
      //   transition: " all 0.6s",
      // });
      let _this = this;
      // setTimeout(function () {
      _this.hengda_flag = false;
      // }, 600);
    },
    hengda_id_save() {
      let phone = this.baoming_tel.telphone;
      let identity = this.hengda_id_text;
      if (phone !== "") {
        if (identity !== "") {
          axios
            .post("/api/custom//identity", {
              phone: phone,
              identity: identity,
            })
            .then((res) => {
              if (res.data.code == 200) {
                this.$message.success(res.data.message);
                this.hengda_flag = false;
              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          this.$message.error("请输入您的身份证后6位");
        }
      } else {
        console.log("手机号为空");
      }
    },
    hideRules() {
      this.rule_model = false;
    },
    cancelRequest() {
      if (typeof this.source === "function") {
        this.source("终止请求");
      }
    },
    closeliuTan() {
      // $(".guan").css({
      //   transform: "rotate(90deg)",
      //   transition: " all 0.6s",
      // });
      let _this = this;
      // setTimeout(function () {
      _this.liuyan_box.liu_flag = false;
      // }, 600);
    },
    TuYanShou() {
      //报名接口输入手机号
      let phone = this.baoming_tel.telphone;
      var pattern = new RegExp("^1[345678]\\d{9}$");
      if (phone == "") {
        this.baoming_tel.tishi_show = true;
        this.baoming_tel.tishi = "手机号不能为空";
      } else if (!pattern.test(phone)) {
        this.baoming_tel.tishi_show = true;
        this.baoming_tel.tishi = "请输入正确的手机号";
        //  this.$message.error("请输入正确的手机号");
      } else {
        // if(open=='1'){
        //     this.telflag=false;
        //     this.cont_tuma=true;
        // }else{
        this.subTel();
        //}
      }
    },
    //报名接口输入手机号
    subTel() {
      let val = this.baoming_tel.checked;
      // 取消上一次请求
      this.cancelRequest();

      let remark = "";
      let route_name = this.$route.name;
      switch (route_name) {
        case "content-id":
          remark = `项目落地页+ ${this.baoming_tel.tan_title} `;
          break;
        case "loudetail-id":
          remark = `楼盘详情页 + ${this.baoming_tel.tan_title}`;
          break;
        case "prohuxing-id":
          remark = `主力户型页 + ${this.baoming_tel.tan_title}`;
          break;
        case "propic-id":
          remark = `楼盘相册页 + ${this.baoming_tel.tan_title}`;
          break;
        case "prowenpage-id":
          remark = `单个楼盘问答页 + ${this.baoming_tel.tan_title}`;
          break;
        case "searchpro-order":
          remark = `新房查询页 + ${this.baoming_tel.tan_title}`;
          break;
        case "shou-shouc":
          remark = `我的收藏 + ${this.baoming_tel.tan_title}`;
          break;
        case "shou-zu":
          remark = `我的足迹 + ${this.baoming_tel.tan_title}`;
          break;
        case "tejiafang":
          remark = `特价房源 + ${this.baoming_tel.tan_title}`;
          break;
      }
      //console.log(remark);

      let that = this;
      if (val == true) {
        this.baoming_tel.tishi_show = false;
        var ip = ip_arr["ip"];
        var phone = this.baoming_tel.telphone;
        var city = sessionStorage.getItem("city_id");
        var token = localStorage.getItem("token");
        var project = sessionStorage.getItem("project_id");
        var posit = sessionStorage.getItem("bao_id");
        var other = sessionStorage.getItem("other");
        var kid = sessionStorage.getItem("kid");
        var pattern = new RegExp("^1[345678]\\d{9}$");
        if (phone == "") {
          this.baoming_tel.tishi_show = true;
          this.baoming_tel.tishi = "手机号不能为空";
        } else if (!pattern.test(phone)) {
          this.baoming_tel.tishi_show = true;
          this.baoming_tel.tishi = "请输入正确的手机号";
        } else {
          axios
            .post(
              "/front/flow/sign",
              {
                tel: phone,
                ip: ip,
                page: 10, //家园PC端
                project: project,
                city: city,
                position: posit,
                remark: remark, //请填写位置对应的名，如“详细楼盘信息”，如果是咨询详细户型请加上户型名
                source: "线上推广1",
                other: other,
                kid: kid,
                name: "", //客户姓名，没有就不填
              },
              {
                cancelToken: new axios.CancelToken(function (c) {
                  that.source = c;
                }),
              }
            )
            .then((res) => {
              if (res.data.code == 200) {
                this.$message.success(res.data.message);
                this.erma_tel.yantel = phone;
                this.getYanMa();
                this.baoming_tel.telflag = false;
                this.erma_tel.yan_flag = true;
                this.cont_tuma = false;
                //  this.$refs.slideblock.reset();
              } else {
                this.erma_tel.yan_flag = false;
                this.baoming_tel.telflag = false;
                this.$alert(res.data.message, "提示信息", {
                  confirmButtonText: "确定",
                });
                console.log(res.data.message);
              }
            })
            .catch((err) => {
              if (axios.isCancel(err)) {
                console.log("Rquest canceled", err.message); //请求如果被取消，这里是返回取消的message
              } else {
                console.log(err);
              }
            });
        }
      } else {
        this.baoming_tel.tishi_show = true;
        this.baoming_tel.tishi = "请勾选用户协议";
      }
    },
    //报名接口获取验证码
    getYanMa() {
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

      if (!this.flag) {
        return;
      }
      this.flag = false;
      let that = this;
      var time = 60;
      this.sendTimer = setInterval(function () {
        time--;
        if (time > 0) {
          that.erma_tel.yanText = time + "秒后重送";
        } else if (time == 0) {
          that.flag = true;
          clearInterval(this.sendTimer);
          that.erma_tel.yanText = "获取验证码";
          this.sendTimer = null;
        }
      }, 1000);

      var phone = this.baoming_tel.telphone;
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
              this.$cookies.remove("time");
              this.$message.success(res.data.message);
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
    subTelYan() {
      //提交验证码
      var phone = this.baoming_tel.telphone;
      var code = this.erma_tel.tiyan;
      var ip = ip_arr["ip"];
      var token = localStorage.getItem("token");
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
              this.erma_tel.yan_flag = false;
              this.erma_tel.tiyan = "";
              if (token) {
              } else {
                localStorage.setItem("token", res.data.token);
                var newtel = phone.substr(0, 3) + "****" + phone.substr(7);
                localStorage.setItem("tel", newtel);
                localStorage.setItem("old_tel", this.baoming_tel.telphone);
                this.$cookies.set("token", res.data.token, "10d");
                let route_name = this.$route.name;
                if (route_name == "bmap") {
                } else {
                  this.$children[0].$children[0].$refs.header.login_tel = newtel;
                  this.$children[0].$children[0].$refs.header.exit_show = true;
                  this.$children[0].$children[0].$refs.header.login_show = false;
                }
                this.$router.go(0);
              }
              let project_name = this.heng_name;
              if (project_name !== "") {
                if ((project_name.indexOf("恒大") !== -1) == true) {
                  this.hengda_flag = true;
                } else {
                  console.log(project_name);
                }
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
      } else {
        this.baoming_tel.tishi_show = true;
        this.baoming_tel.tishi = "验证码不能为空";
      }
    },
    closeTelTan() {
      // $(".guan").css({
      //   transform: "rotate(90deg)",
      //   transition: " all 0.6s",
      // });
      let _this = this;
      // let timer = setTimeout(function () {
      _this.baoming_tel.telflag = false;
      // }, 600);
    },
    closeTelTan_y() {
      // $(".guan").css({
      //   transform: "rotate(90deg)",
      //   transition: " all 0.6s",
      // });
      let _this = this;
      // setTimeout(function () {
      _this.erma_tel.yan_flag = false;
      // }, 600);
    },
    goLogin() {
      //登陆成功
      var ip = ip_arr["ip"];
      var tel = this.tel;
      var code = this.code;
      var project = this.$route.params.id;
      let match = "";
      if (project) {
        match = project.match(/\d+/);
        project = match[0];
      } else {
        project = "";
      }
      var other = sessionStorage.getItem("other");
      var kid = sessionStorage.getItem("kid");
      if (this.checked == true) {
        if (tel !== "" && code !== "") {
          axios({
            method: "post",
            url: "/sure",
            params: {
              phone: tel,
              code: code, //短信验证码
              source: 3, //传3
              ip: ip,
            },
          })
            .then((res) => {
              if (res.data.code == 200) {
                var token = res.data.token;
                localStorage.setItem("token", token);
                this.$router.go(0);
                this.$cookies.set("token", token, "10d");
                this.$message.success(res.data.message);
                var newtel =
                  this.tel.substr(0, 3) + "****" + this.tel.substr(7);
                // let route_name = this.$route.name;
                // let _this =this;
                //  switch (route_name) {
                //   case "content-id":
                //       _this.$children[0].$children[0].$refs.header.login_tel =newtel;
                //       _this.$children[0].$children[0].$refs.header.exit_show =true;
                //       _this.$children[0].$children[0].$refs.header.login_show =false;
                //     break;
                //   case "baike":
                //       _this.$children[0].$children[0].$refs.header.login_tel =newtel;
                //       _this.$children[0].$children[0].$refs.header.exit_show =true;
                //       _this.$children[0].$children[0].$refs.header.login_show =false;
                //     break;
                // }

                let route_name = this.$route.name;
                if (route_name == "bmap") {
                } else {
                  this.$children[0].$children[0].$refs.header.login_tel = newtel;
                  this.$children[0].$children[0].$refs.header.exit_show = true;
                  this.$children[0].$children[0].$refs.header.login_show = false;
                }

                localStorage.setItem("tel", newtel);
                localStorage.setItem("old_tel", this.tel);
                this.loginTan = false;
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
          //同时报名
          axios
            .post("/front/flow/sign", {
              tel: tel,
              ip: ip,
              page: 10, //代表家园Pc
              project: project, //项目id
              remark: "登录", // 备注
              source: "线上推广1", //线上推广3
              other: other,
              kid: kid,
              name: "", //客户名，没有传未知
              position: 83, // 报名位置
              city: 1,
            })
            .then((res) => {
              if (res.data.code == 200) {
                console.log(res.data.message);
              } else {
                console.log(res.data.message);
              }
            });
        } else {
          this.loginTips_show = true;
          this.tips = "手机号和验证码不能为空";
        }
      } else {
        this.loginTips_show = true;
        this.tips = "请勾选用户服务协议";
      }
    },
    getCode() {
      //登录接口获取验证码
      //       let kk = parseInt(new Date().getTime()/1000)
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

      if (!this.flag_login) {
        return;
      }
      this.flag_login = false;
      let that = this;
      var time = 60;
      this.sendTimer = setInterval(function () {
        time--;
        if (time > 0) {
          that.yanText_login = time + "秒后重送";
        } else if (time == 0) {
          that.flag_login = true;
          clearInterval(this.sendTimer);
          that.yanText_login = "获取验证码";
          this.sendTimer = null;
        }
      }, 1000);

      //登录获取验证码
      var tel = this.tel;
      var pattern = new RegExp("^1[345678]\\d{9}$");
      if (tel == "") {
        this.loginTips_show = true;
        this.tips = "手机号不能为空";
      } else if (!pattern.test(tel)) {
        this.loginTips_show = true;
        this.tips = "请输入正确的手机号";
      } else if (tel !== "" && pattern.test(tel)) {
        axios({
          method: "post",
          url: "/send",
          params: {
            ip: ip_arr["ip"],
            phone: tel,
            source: 3,
          },
        })
          .then((res) => {
            console.log(res);
            if (res.data.code == 200) {
              this.$cookies.remove("time");
              this.$message.success(res.data.message);
            } else {
              console.log(res);
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
  },
};
</script>

<style lang="less" scoped>
/deep/ .el-textarea {
  height: 100px;
  .el-textarea__inner {
    height: 90px;
    border: none;
    background: #f8f8f8;
    font-family: "Microsoft YaHei";
    resize: none;
  }
  .el-input__count {
    bottom: 15px;
  }
}
.placeholderColor(@color:#0094ff) {
  ::-webkit-input-placeholder {
    /* WebKit browsers */
    color: @color;
  }
  :-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: @color;
  }
  ::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: @color;
  }
  :-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: @color;
  }
}

/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
// .slide-fade-leave-active {
//   transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
// }
.slide-fade-enter
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
// 右侧导航
.right_fixed {
  width: 80px;
  height: 100%;
  // background: #ffffff;
  // box-shadow: 0px 0px 15px 0px rgba(52, 71, 87, 0.24);
  position: fixed;
  right: 0px;
  top: 0px;
  .right_li {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    li {
      width: 40px;
      height: 84px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      border-bottom: 1px solid #ededed;
      cursor: pointer;
      position: relative;
      img {
        width: 20px;
        height: 20px;
        margin-bottom: 10px;
      }
      span {
        font-size: 12px;
        font-family: "Microsoft YaHei";
        font-weight: 400;
        color: #7d7d80;
        line-height: 12px;
        margin-bottom: 5px;
      }
      em {
        font-size: 12px;
        font-family: "Microsoft YaHei";
        font-weight: 400;
        color: #7d7d80;
        line-height: 12px;
      }
    }
    .new_news {
      span {
        color: #ff9a26;
      }
      em {
        color: #ff9a26;
      }
    }
    .zixun {
      span {
        color: #2ac66e;
      }
      em {
        color: #2ac66e;
      }
    }
    .active {
      background: #2ac66e;
      span {
        color: #fff;
      }
      em {
        color: #fff;
      }
    }
    .yellow {
      color: #ff9a26;
      span {
        color: #ff9a26;
      }
      em {
        color: #ff9a26;
      }
    }
  }
  .right_lis {
    position: absolute;
    top: 50%;
    transform: translate(0, -80%);
    li {
      width: 60px;
      margin-right: 20px;
      text-align: center;
      height: 95px;
      cursor: pointer;
      img {
        margin-top: 16px;
      }
    }
    .chatim {
      border-radius: 4px 4px 0 0;
      background: #2ac66d;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #ffffff;
    }
    .liuyan {
      background: #9da3a6;
      border-radius: 0 0 4px 4px;
      color: #ffffff;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: bold;
    }
  }
  .yewuyuan {
    position: absolute;
    right: 47px;
    bottom: 155px;
    width: 288px;
    height: 157px;
    background: #ffffff;
    box-shadow: 0px 0px 18px 0px rgba(52, 71, 87, 0.24);
    border-radius: 2px;
    padding: 24px 28px 24px 24px;
    .top {
      .head_img {
        width: 40px;
        height: 40px;
        border-radius: 20px;
        float: left;
        margin-right: 20px;
        margin-bottom: 0px;
      }
      .right_name {
        h2 {
          font-size: 18px;
          font-family: "Microsoft YaHei";
          font-weight: bold;
          color: #1f1f1f;
          display: flex;
          line-height: 18px;
          i {
            width: 60px;
            height: 18px;
            background: #f2f8ff;
            border-radius: 2px;
            line-height: 18px;
            font-size: 12px;
            font-family: "Microsoft YaHei";
            font-weight: 400;
            color: #2284f4;
            margin-left: 10px;
          }
        }
        p {
          font-size: 14px;
          font-family: "Microsoft YaHei";
          font-weight: 400;
          color: #646466;
          line-height: 14px;
          margin-top: 8px;
        }
      }
    }
    .fenshu {
      display: flex;
      justify-content: space-between;
      margin-top: 14px;
      .fen_list {
        float: left;
        width: 96px;
        display: flex;
        align-items: center;
        flex-direction: column;
        strong {
          font-size: 20px;
          font-family: "Microsoft YaHei";
          font-weight: bold;
          color: #121212;
          i {
            font-size: 12px;
            font-family: "Microsoft YaHei";
            font-weight: 400;
            color: #121212;
          }
        }
        p {
          font-size: 14px;
          font-family: "Microsoft YaHei";
          font-weight: 400;
          color: #646466;
        }
      }
    }
    .bottom {
      .btn_zixun {
        width: 100px;
        height: 36px;
        background: linear-gradient(270deg, #20c466, #3fd6a7);
        border-radius: 2px;
        font-size: 14px;
        font-family: "Microsoft YaHei";
        font-weight: 400;
        color: #ffffff;
        border: none;
        margin-top: 24px;
        margin-right: 20px;
        cursor: pointer;
      }
      .shao_zixuxn {
        width: 100px;
        height: 36px;
        background: #f0f7f3;
        border: 1px solid #3ea66a;
        border-radius: 2px;

        font-size: 14px;
        font-family: "Microsoft YaHei";
        font-weight: 400;
        color: #3ea56a;
        margin-top: 24px;
        cursor: pointer;
      }
    }
  }

  .jiazai {
    width: 100px;
    height: 40px;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 3px;
    position: absolute;
    right: 40px;
    bottom: 270px;
    h4 {
      font-size: 12px;
      color: #fff;
      font-weight: normal;
      line-height: 24px;
      text-align: center;
    }
    img {
      position: absolute;
      transform: translate(-50%, -50%);
      left: 50%;
      top: 28px;
    }
  }
  .saoma_box {
    width: 148px;
    height: 120px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 14px 0px rgba(6, 0, 1, 0.08);
    position: absolute;
    right: 40px;
    bottom: 145px;
    display: block;
    .erma {
      width: 100px;
      height: 100px;
      display: block;
      margin-left: 10px;
      margin-top: 10px;
      float: left;
    }
    span {
      -webkit-writing-mode: vertical-rl;
      writing-mode: tb-rl;
      writing-mode: vertical-rl;
      text-align: justify;
      float: left;
      font-size: 14px;
      font-family: "Microsoft YaHei";
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 29px;
      margin-top: 19px;
    }
  }
  .kaifa {
    position: absolute;
    bottom: 210px;
    right: 40px;
    bottom: 52px;
    img {
      width: 220px;
      height: 140px;
    }
  }
}

/*-- 快速登录弹框 --*/
.login_box {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
  display: block;
  cursor: pointer;

  .login {
    width: 300px;
    height: 440px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding-left: 40px;
    padding-right: 40px;
    .login_top {
      height: 178px;
      padding-top: 6px;
      position: relative;
      h5 {
        font-size: 20px;
        font-family: "Microsoft YaHei";
        font-weight: bold;
        color: #333333;
        text-align: center;
        line-height: 80px;
      }
      i {
        font-size: 20px;
        color: #746e6e;
        position: absolute;
        top: 22px;
        right: -18px;
      }
    }
    .login_con {
      .tel {
        width: 300px;
        height: 50px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(237, 237, 237, 1);
        border-radius: 2px;
        text-indent: 1em;
        color: #4d4d4d;
        font-size: 16px;
        outline: none;
        // active border:1px solid #E62E2E;
      }
      input::-webkit-input-placeholder {
        /* WebKit browsers */
        color: #999999;
      }
      input:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: #999999;
      }
      input::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: #999999;
      }
      input:-ms-input-placeholder {
        /* Internet Explorer 10+ */
        color: #999999;
      }
      .yan {
        width: 300px;
        height: 50px;
        background: rgba(255, 255, 255, 1);
        border-right: 1px solid rgba(237, 237, 237, 1);
        border-left: 1px solid rgba(237, 237, 237, 1);
        border-bottom: 1px solid rgba(237, 237, 237, 1);
        border-radius: 2px;
        input {
          width: 198px;
          height: 50px;
          float: left;
          border: none;
          color: #4d4d4d;
          font-size: 16px;
          text-indent: 1em;
          outline: none;
        }
        span {
          color: #7495bd;
          font-size: 14px;
          height: 20px;
          padding-left: 17px;
          border-left: 1px solid #e6e6e6;
          display: inline-block;
          float: left;
          margin-top: 14px;
        }
      }
      .xieyi {
        position: relative;
        margin-bottom: 12px;
        p {
          font-size: 14px;
          font-family: "Microsoft YaHei";
          font-weight: 400;
          color: #999999;
          line-height: 14px;
          margin-left: 21px;
          margin-top: 20px;
        }
        em {
          color: #498de1;
          a {
            color: #498de1;
          }
        }
        input[type="checkbox"] {
          width: 14px;
          height: 14px;
          background-color: #fff;
          -webkit-appearance: none;
          border: 1px solid #e8e8e8;
          border-radius: 3px;
          outline: none;
          cursor: pointer;
          position: absolute;
          top: 0px;
        }
        input[type="checkbox"]:checked {
          background: url("../assets/tankuang/login_dui.png") no-repeat center;
        }
        .checkbox {
          margin-right: 5px;
        }
      }
      .tips {
        font-size: 14px;
        font-family: "Microsoft YaHei";
        font-weight: 400;
        color: #f23030;
        line-height: 14px;
        text-align: center;
        margin-bottom: 12px;
      }
      .button {
        width: 300px;
        height: 50px;
        background: #2ac66d;
        border-radius: 2px;
        position: relative;
        cursor: pointer;
        .fan_btn {
          width: 240px;
          height: 50px;
          background: rgba(42, 198, 109, 0);
          box-shadow: 0px 15px 18px 0px rgba(42, 198, 109, 0.3);
          border-radius: 2px;
          outline: none;
          position: absolute;
          top: 0px;
          left: 30px;
          border: none;
          font-size: 16px;
          font-family: "Microsoft YaHei";
          font-weight: bold;
          color: #ffffff;
          line-height: 50px;
          cursor: pointer;
        }
      }
    }
  }
}
/*报名接口弹框*/
.bao_tan {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
  display: block;
  cursor: pointer;
  .liu_tel {
    width: 480px;
    height: 400px;
    background: rgba(255, 255, 255, 1);
    border-radius: 6px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .liu_top {
      width: 480px;
      height: 160px;
      position: relative;
      background: #2fcb72;
      border-radius: 6px 6px 0 0;
      img {
        width: 480px;
        height: 160px;
        position: absolute;
        top: 0px;
        left: 0px;
        border-radius: 6px 6px 0 0;
      }
      h2 {
        font-size: 22px;
        font-weight: bold;
        color: #ffffff;
        line-height: 24px;
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        top: 18px;
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
      .guan:hover {
        transform: rotate(90deg);
        transition: all 0.6s;
      }
    }
    .liu_top_kaipan {
      width: 480px;
      height: 160px;
      position: relative;
      background: #2fcb72;
      border-radius: 6px 6px 0 0;
      .kaipan_box {
        img {
          width: 480px;
          height: 160px;
          position: absolute;
          top: 0px;
          left: 0px;
          border-radius: 6px 6px 0 0;
        }
        .jiatui {
          width: 100px;
          height: 40px;
          background: #d6f5e3;
          border-radius: 4px;
          position: absolute;
          top: 114px;
          left: 42px;
          span {
            font-size: 14px;
            font-family: "Microsoft YaHei";
            font-weight: bold;
            color: #30cb72;
            line-height: 20px;
            text-align: center;
            display: block;
            margin-top: 5px;
            line-height: 14px;
          }
          p {
            font-size: 12px;
            font-family: "Microsoft YaHei";
            font-weight: 400;
            color: #30cb72;
            line-height: 20px;
            text-align: center;
          }
        }
        .jiatui::before {
          width: 0;
          height: 0;
          position: absolute;
          content: "";
          right: 43px;
          top: -7px;
          border-right: 7px dashed transparent;
          border-bottom: 7px solid currentColor;
          border-left: 7px dashed transparent;
          color: #d6f5e3;
        }

        .kaipan {
          width: 100px;
          height: 40px;
          background: #d6f5e3;
          border-radius: 4px;
          position: absolute;
          left: 340px;
          top: 44px;
          span {
            font-size: 14px;
            font-family: "Microsoft YaHei";
            font-weight: bold;
            color: #30cb72;
            line-height: 14px;
            text-align: center;
            display: block;
            margin-top: 5px;
          }
          p {
            font-size: 12px;
            font-family: "Microsoft YaHei";
            font-weight: 400;
            color: #30cb72;
            line-height: 22px;
            text-align: center;
          }
        }
        .kaipan::before {
          width: 0;
          height: 0;
          position: absolute;
          content: "";
          right: 43px;
          top: 40px;
          border-right: 7px dashed transparent;
          border-top: 7px solid currentColor;
          border-left: 7px dashed transparent;
          color: #d6f5e3;
        }
      }

      h2 {
        font-size: 22px;
        font-weight: bold;
        color: #ffffff;
        line-height: 24px;
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        top: 18px;
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
      .guan:hover {
        transform: rotate(90deg);
        transition: all 0.6s;
      }
    }
    .newcheng_jia {
      width: 480px;
      height: 160px;
      background: #2ecb71;
      border-radius: 6px 6px 0px 0px;
      position: relative;
      .jia_box {
        table {
          float: left;
          width: 384px;
          border: 1px solid rgba(242, 242, 242, 1);
          border-collapse: collapse;
          background: #24bf66;
          position: absolute;
          top: 49px;
          left: 40px;
          thead {
            tr {
              th {
                font-size: 14px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: #fff;
              }
            }
          }
          tr {
            height: 24px;
            td {
              font-size: 14px;
              text-align: center;
              color: #fff;
            }
          }
        }
        img {
          position: absolute;
          right: 76px;
          bottom: 0px;
        }
      }
      h2 {
        font-size: 22px;
        font-weight: bold;
        color: #ffffff;
        line-height: 24px;
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        top: 18px;
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
      .guan:hover {
        transform: rotate(90deg);
        transition: all 0.6s;
      }
    }

    .liu_con {
      padding-left: 40px;
      padding-right: 40px;
      .img_box {
        width: 320px;
        height: 80px;
        background: rgba(255, 252, 247, 1);
        position: relative;
        img {
          position: absolute;
          top: 0px;
          left: 0px;
        }
        .nadi,
        .jiatui,
        .shoukai {
          width: 90px;
          height: 30px;
          position: absolute;
          p:first-child {
            font-size: 12px;
            font-family: "Microsoft YaHei";
            font-weight: 400;
            color: rgba(171, 129, 37, 1);
            line-height: 12px;
            text-align: center;
          }
          p:last-child {
            font-size: 10px;
            font-family: "Microsoft YaHei";
            font-weight: 400;
            color: rgba(171, 129, 37, 1);
            line-height: 12px;
            text-align: center;
          }
        }
        .jiaofang {
          width: 90px;
          height: 30px;
          position: absolute;
          p:first-child {
            font-size: 12px;
            font-family: "Microsoft YaHei";
            font-weight: 400;
            color: #e7cf99;
            line-height: 12px;
            text-align: center;
          }
          p:last-child {
            font-size: 10px;
            font-family: "Microsoft YaHei";
            font-weight: 400;
            color: #e7cf99;
            line-height: 12px;
            text-align: center;
          }
        }
        .nadi {
          position: absolute;
        }
        .jiatui {
          position: absolute;
          right: 75px;
        }
        .shoukai {
          position: absolute;
          left: 77px;
          top: 54px;
        }
        .jiaofang {
          position: absolute;
          top: 54px;
          right: 0px;
        }
      }
      .tip {
        font-size: 14px;
        font-family: "Microsoft YaHei";
        font-weight: 400;
        color: #323233;
        line-height: 20px;
        margin: 0 auto;
        margin-top: 23px;
        margin-bottom: 23px;
        span {
          font-size: 14px;
          font-family: "Microsoft YaHei";
          font-weight: 400;
          color: #2ac66d;
          padding: 6px 11px;
          background: #eff8f3;
          float: right;
        }
      }
      .fan_kuang {
        width: 400px;
        height: 35px;
        border-radius: 4px;
        text-indent: 1em;
        font-size: 14px;
        font-family: "Microsoft YaHei";
        font-weight: 400;
        color: #323233;
        line-height: 34px;
        border: 1px solid rgba(235, 235, 242, 1);
        outline: none;
      }
      .placeholderColor(#7d7e80);
      .xieyi {
        position: relative;
        margin-bottom: 9px;
        p {
          font-size: 14px;
          font-family: "Microsoft YaHei";
          font-weight: 400;
          color: #999999;
          line-height: 14px;
          margin-left: 21px;
          margin-top: 10px;
        }
        em {
          color: #2ac66d;
          a {
            color: #2ac66d;
          }
        }
        input[type="checkbox"] {
          width: 14px;
          height: 14px;
          background-color: #fff;
          -webkit-appearance: none;
          border: 1px solid #e8e8e8;
          border-radius: 3px;
          outline: none;
          cursor: pointer;
          position: absolute;
          top: 0px;
        }
        input[type="checkbox"]:checked {
          background: url("../assets/tankuang/bao_dui.png") no-repeat center;
        }
        .checkbox {
          margin-right: 5px;
        }
      }
      .fan_btn {
        width: 400px;
        height: 34px;
        background: #2ac66d;
        border-radius: 4px;
        font-size: 14px;
        font-family: "Microsoft YaHei";
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        line-height: 34px;
        text-align: center;
        border: none;
        cursor: pointer;
        outline: none;
        margin-top: 20px;
      }
    }
    .tishi {
      font-size: 14px;
      font-family: "Microsoft YaHei";
      font-weight: 400;
      color: #f23030;
      line-height: 14px;
      margin-bottom: 9px;
    }
  }
}
/*报名接口弹框--输入验证码*/
.bao_tan_yan {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
  display: block;
  cursor: pointer;
  .liu_tel {
    width: 480px;
    height: 400px;
    background: rgba(255, 255, 255, 1);
    border-radius: 6px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .liu_top {
      width: 480px;
      height: 160px;
      position: relative;
      background: #2fcb72;
      border-radius: 6px 6px 0 0;
      img {
        width: 480px;
        height: 160px;
        position: absolute;
        top: 0px;
        left: 0px;
        border-radius: 6px 6px 0 0;
      }
      h2 {
        font-size: 22px;
        font-weight: bold;
        color: #ffffff;
        line-height: 24px;
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        top: 18px;
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
      .guan:hover {
        transform: rotate(90deg);
        transition: all 0.6s;
      }
    }
    .liu_top_kaipan {
      width: 480px;
      height: 160px;
      position: relative;
      background: #2fcb72;
      border-radius: 6px 6px 0 0;
      .kaipan_box {
        img {
          width: 480px;
          height: 160px;
          position: absolute;
          top: 0px;
          left: 0px;
          border-radius: 6px 6px 0 0;
        }
        .jiatui {
          width: 100px;
          height: 40px;
          background: #d6f5e3;
          border-radius: 4px;
          position: absolute;
          top: 114px;
          left: 42px;
          span {
            font-size: 14px;
            font-family: "Microsoft YaHei";
            font-weight: bold;
            color: #30cb72;
            line-height: 20px;
            text-align: center;
            display: block;
            margin-top: 5px;
            line-height: 14px;
          }
          p {
            font-size: 12px;
            font-family: "Microsoft YaHei";
            font-weight: 400;
            color: #30cb72;
            line-height: 20px;
            text-align: center;
          }
        }
        .jiatui::before {
          width: 0;
          height: 0;
          position: absolute;
          content: "";
          right: 43px;
          top: -7px;
          border-right: 7px dashed transparent;
          border-bottom: 7px solid currentColor;
          border-left: 7px dashed transparent;
          color: #d6f5e3;
        }

        .kaipan {
          width: 100px;
          height: 40px;
          background: #d6f5e3;
          border-radius: 4px;
          position: absolute;
          left: 340px;
          top: 44px;
          span {
            font-size: 14px;
            font-family: "Microsoft YaHei";
            font-weight: bold;
            color: #30cb72;
            line-height: 14px;
            text-align: center;
            display: block;
            margin-top: 5px;
          }
          p {
            font-size: 12px;
            font-family: "Microsoft YaHei";
            font-weight: 400;
            color: #30cb72;
            line-height: 22px;
            text-align: center;
          }
        }
        .kaipan::before {
          width: 0;
          height: 0;
          position: absolute;
          content: "";
          right: 43px;
          top: 40px;
          border-right: 7px dashed transparent;
          border-top: 7px solid currentColor;
          border-left: 7px dashed transparent;
          color: #d6f5e3;
        }
      }

      h2 {
        font-size: 22px;
        font-weight: bold;
        color: #ffffff;
        line-height: 24px;
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        top: 18px;
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
      .guan:hover {
        transform: rotate(90deg);
        transition: all 0.6s;
      }
    }
    .newcheng_jia {
      width: 480px;
      height: 160px;
      background: #2ecb71;
      border-radius: 6px 6px 0px 0px;
      position: relative;
      .jia_box {
        table {
          float: left;
          width: 384px;
          border: 1px solid rgba(242, 242, 242, 1);
          border-collapse: collapse;
          background: #24bf66;
          position: absolute;
          top: 49px;
          left: 40px;
          thead {
            tr {
              th {
                font-size: 14px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: #fff;
              }
            }
          }
          tr {
            height: 24px;
            td {
              font-size: 14px;
              text-align: center;
              color: #fff;
            }
          }
        }
        img {
          position: absolute;
          right: 76px;
          bottom: 0px;
        }
      }
      h2 {
        font-size: 22px;
        font-weight: bold;
        color: #ffffff;
        line-height: 24px;
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        top: 18px;
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
      .guan:hover {
        transform: rotate(90deg);
        transition: all 0.6s;
      }
    }

    .liu_con {
      padding-left: 40px;
      padding-right: 40px;
      .tip {
        font-size: 14px;
        font-family: "Microsoft YaHei";
        font-weight: 400;
        color: #323233;
        line-height: 26px;
        margin: 0 auto;
        margin-top: 35px;
        margin-bottom: 20px;
        span {
          font-size: 14px;
          font-family: "Microsoft YaHei";
          font-weight: 400;
          color: #2ac66d;
          padding: 4px 11px;
          background: #eff8f3;
          float: right;
        }
      }
      .fan_kuang {
        width: 400px;
        height: 35px;
        border-radius: 4px;
        text-indent: 1em;
        font-size: 14px;
        font-family: "Microsoft YaHei";
        font-weight: 400;
        color: #323233;
        line-height: 34px;
        border: 1px solid rgba(235, 235, 242, 1);
        outline: none;
      }
      .placeholderColor(#7d7e80);
      // .xieyi {
      //   position: relative;
      //   p{
      //     font-size: 14px;
      //     font-family: "Microsoft YaHei";
      //     font-weight: 400;
      //     color: #999999;
      //     line-height: 14px;
      //     margin-left: 21px;
      //     margin-top: 10px;
      //   }
      //   em{
      //     color:#2AC66D;
      //   }
      //     input[type="checkbox"] {
      //     width: 14px;
      //     height: 14px;
      //     background-color: #fff;
      //     -webkit-appearance: none;
      //     border: 1px solid #E8E8E8;
      //     border-radius: 3px;
      //     outline: none;
      //     cursor: pointer;
      //     position: absolute;
      //     top: 0px;
      //     }
      //     input[type="checkbox"]:checked {
      //         background: url("../assets/tankuang/bao_dui.png") no-repeat center;
      //     }
      //   .checkbox{
      //       margin-right:5px ;
      //   }
      // }
      .fan_btn {
        width: 400px;
        height: 34px;
        background: #2ac66d;
        border-radius: 4px;
        font-size: 14px;
        font-family: "Microsoft YaHei";
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        line-height: 34px;
        text-align: center;
        border: none;
        cursor: pointer;
        outline: none;
        margin-top: 30px;
      }
    }
    .tishi {
      font-size: 14px;
      font-family: "Microsoft YaHei";
      font-weight: 400;
      color: #f23030;
      line-height: 14px;
      margin-top: 20px;
    }
  }
}
/*留言弹框*/
.liuyan_box {
  // width: 100%;
  // height: 100%;
  width: 300px;
  height: 385px;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 2000;
  display: block;
  border-radius: 4px;
  cursor: pointer;
  .liuyan {
    width: 300px;
    height: 400px;
    background: rgba(255, 255, 255, 1);
    position: absolute;
    border-radius: 4px;
    box-shadow: 0px 0px 30px 0px rgba(4, 0, 0, 0.08);
    overflow: hidden;
    // top: 50%;
    bottom: 0px;
    right: 0px;
    // transform: translate(-50%, -50%);
    // padding-left: 40px;
    // padding-right: 40px;
    .tit {
      height: 100px;
      background: url(~assets/liutopimg.png);
    }
    .top {
      height: 50px;
      position: relative;
      h1 {
        font-size: 16px;
        font-weight: bold;
        color: #ffffff;
        line-height: 24px;
        position: absolute;
        transform: translate(-50%);
        left: 50%;
        top: 20px;
      }
      .guan {
        width: 24px;
        height: 24px;
        background: rgba(0, 0, 0, 0.12);
        border-radius: 50%;
        text-align: center;
        position: absolute;
        top: 12px;
        right: 20px;
        i {
          font-size: 18px;
          text-align: center;
          line-height: 24px;
          color: #fff;
        }
      }
      .guan:hover {
        transform: rotate(90deg);
        transition: all 0.6s;
      }
    }
    p {
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #ffffff;
      line-height: 18px;
      width: 256px;
      position: relative;
      left: 50%;
      margin-left: -128px;
    }
    .liu_content {
      padding: 0 20px;
      h1 {
        font-size: 14px;
        font-family: "Microsoft YaHei";
        font-weight: bold;
        color: #323232;
        line-height: 14px;
        margin-top: 13px;
        margin-bottom: 10px;
      }
      h2 {
        font-size: 14px;
        font-family: "Microsoft YaHei";
        font-weight: bold;
        color: #333333;
        line-height: 14px;
        margin-top: 14px;
        margin-bottom: 10px;
      }
      input {
        width: 100%;
        height: 35px;
        border: 1px solid #cccccc;
        border-radius: 4px;
        color: #333334;
        font-size: 14px;
        text-indent: 1em;
      }
      .placeholderColor(#7d7f80);
      button {
        width: 100%;
        height: 34px;
        background: linear-gradient(45deg, #2ac682, #46c4ab);
        border-radius: 4px;
        font-size: 14px;
        font-family: "Microsoft YaHei";
        font-weight: bold;
        color: #ffffff;
        line-height: 34px;
        border: none;
        margin-top: 20px;
        outline: none;
      }
    }
  }
}

/*活动规则弹框*/
.rules_box {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
  display: block;
  .rules {
    width: 360px;
    height: 400px;
    background: rgba(255, 255, 255, 1);
    border-radius: 12px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    h4 {
      font-size: 23px;
      font-family: "Microsoft YaHei";
      font-weight: bold;
      color: rgba(47, 49, 51, 1);
      line-height: 69px;
      height: 69px;
      text-align: center;
      position: relative;
      span {
        color: #746e6e;
        font-size: 18px;
        font-weight: 300;
        position: absolute;
        right: 17px;
        top: 17px;
        display: block;
        line-height: 18px;
        cursor: pointer;
      }
    }
    .content_box {
      width: 300;
      padding: 0px 30px 0px 30px;
      p {
        font-size: 14px;
        font-family: "Microsoft YaHei";
        font-weight: 400;
        color: rgba(97, 99, 101, 1);
        line-height: 20px;
        margin-bottom: 15px;
        span {
          color: #616165;
          font-size: 14px;
          font-weight: bold;
        }
      }
    }
  }
  .rules1 {
    width: 480px;
    height: 240px;
  }
}

/*恒大身份证弹框*/
.hengda {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
  display: block;
  cursor: pointer;
  .heng {
    width: 360px;
    height: 400px;
    background: rgba(255, 255, 255, 1);
    border-radius: 3px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .top {
      height: 150px;
      width: 360px;
      position: relative;
      border-radius: 3px;
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
      .guan:hover {
        transform: rotate(90deg);
        transition: all 0.6s;
      }
      img {
        width: 360px;
        height: 150px;
        position: absolute;
        top: 0px;
        left: 0px;
        border-radius: 3px;
      }
    }
    .bottom {
      padding-left: 30px;
      padding-right: 30px;
      input {
        width: 300px;
        height: 40px;
        border: 1px solid #e6e6e6;
        border-radius: 2px 2px 0px 0px;
        font-size: 16px;
        font-family: "Microsoft YaHei";
        font-weight: 400;
        color: #7d7f80;
        line-height: 40px;
        text-indent: 1em;
        margin-top: 46px;
      }
      p {
        font-size: 14px;
        font-family: "Microsoft YaHei";
        font-weight: 400;
        color: #ff3333;
        line-height: 20px;
        margin-top: 15px;
        margin-bottom: 30px;
      }
      button {
        width: 299px;
        height: 40px;
        background: #2ac66e;
        border-radius: 4px;
        font-size: 16px;
        font-family: "Microsoft YaHei";
        font-weight: bold;
        color: #ffffff;
        line-height: 40px;
        border: none;
      }
    }
  }
}
</style>
