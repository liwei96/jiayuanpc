<template>
  <div class="hudetail_box">
    <my-header 
              :all="common.city_info.all"
              :telphone="common.phone"
              ref="header"></my-header>
    <my-mianbao :router_data="routerData"></my-mianbao>
    <div class="hudetail">
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
          <li> <nuxt-link :to="`/content/${building.id}`">楼盘主页</nuxt-link></li>
          <li> <nuxt-link :to="`/loudetail/${building.id}`">楼盘详情</nuxt-link></li>
          <li><nuxt-link :to="`/prohuxing/${building.id}`">主力户型</nuxt-link></li>
          <li><nuxt-link :to="`/prodong/${building.id}?page=1`">楼盘动态</nuxt-link></li>
          <li><nuxt-link :to="`/propic/${building.id}`">楼盘相册</nuxt-link></li>
          <li><nuxt-link :to="`/prowenda/${building.id}?page=1`">楼盘问问</nuxt-link></li>
          <li><nuxt-link :to="`/prodian/${building.id}?page=1`">楼盘点评</nuxt-link></li>
        </ul>
        <span>咨询热线：{{common.phone.replace(",","转")}}</span>
      </div>
      <div class="hu_left">
        <div class="sel_box">
          <div class="like-pic">
            <div class="boutique-ul3">
              <ul class="ul3-long">
                <li
                  v-for="(item,index ) in rooms"
                  :key="item.id"
                  :class="index==num?'active':''"
                  @click="qiehuan(item.id,index)"
                >
                  <span>{{item.title}}</span>
                  <em>建面{{item.area}}m²</em>
                 </li>
              </ul>
            </div>
          </div>
          <button class="leftBtn3">
            <span class="el-icon-arrow-left"></span>
          </button>
          <button class="rightBtn3">
            <span class="el-icon-arrow-right"></span>
          </button>
        </div>
        <div class="hu_img_box">
          <img :src="departments_one.big" :alt="`${building.name}${departments_one.title}`" :title="`${building.name}${departments_one.title}`"/>
        </div>
        <!-- 项目介绍 -->
        <div class="project_intro">
              <h3>项目介绍</h3>
              <p>{{building.introduce}}</p>
        </div>
        <!-- 最新户型详情 -->
        <div class="hu_bao">
          <div class="detail_bao">
            <div class="left_bao">
              <p> 这个楼盘有什么优缺点？开发商资质如何？我有没有购房
资质？更多问题，咨询师帮您答疑解惑</p>
            </div>
            <div class="right_bao">
              <input type="text" placeholder="输入订阅手机号码" v-model="xiangtel" maxlength="11"/>
              <button @click="tijiaoTel(108)">了解更多</button>
            </div>
          </div>
        </div>
      </div>
      <div class="hu_right">
        <div class="bang_box_home_h">
          <div class="project_top">
            <h3>
              {{departments_one.title}}
              <span>{{departments_one.state}}</span>
            </h3>
            <ul class="big_text">
              <li class="cankao">
                参考总价：
                <span>
                  <strong v-if="departments_one.price>0 && departments_one.price!==0">{{departments_one.price}}</strong>
                  <strong v-else>待定</strong>万元
                </span>
              </li>
              <ul class="small_text">
                <li>
                  建面:
                  <span>{{departments_one.area}}m²</span>
                </li>
                <li>
                  单价:
                  <span v-if="departments_one.single>0 && departments_one.single!==0">{{departments_one.single}}元/m²</span>
                  <span v-else>待定元/m²</span>
                </li>
                <li>
                  层高:
                  <span>{{departments_one.height}}米</span>
                </li>
                <li>
                  类型:
                  <span>{{building.type}}</span>
                </li>
                <li>
                  特色:
                  <span>{{departments_one.special}}</span>
                </li>
              </ul>
            </ul>
            <div class="btn_two">
              <span @click="bianTong(105)">
                <i class="iconfont iconzhuzhuangtutubiao"></i>咨询楼盘底价
              </span>
              <span @click="bianTong(109)">
                <i class="iconfont iconlaba"></i>剩余房源查询
              </span>
            </div>
          </div>
          <div class="pro_zixun">
            <div class="fenxishi">
              <h4>楼盘分析师</h4>
              <ul class="tese">
                <li>
                  <span class="iconfont iconanquan"></span>专业服务
                </li>
                <li>
                  <span class="iconfont iconanquan"></span>区域解读
                </li>
                <li>
                  <span class="iconfont iconanquan"></span>户型分析
                </li>
              </ul>
            </div>
            <div class="kefu">
              <ul>
                <template v-for="(item,index ) in staffs">
                  <li :key="item.id" v-if="index==0">
                    <img :src="item. staff.head_img" alt  class="head_img"/>
                    <div class="name_box">
                      <h6>
                        {{item.staff.name}}
                        <span>新房咨询</span>
                      </h6>
                      <p>了解房源特色，专业挑好房</p>
                    </div>
                    <button @click="bianTong(104)">
                      <img src="~/assets/icon/chat.png" alt="">
                      向TA咨询</button>
                  </li>
                </template>
              </ul>
            </div>
          </div>
          <div class="fenxi">
            <h6>户型分析</h6>
            <p>
              <span>{{fenxi_data}}</span>
              <a href="javascript:;" v-if="departments_one.analysis.length>47" @click="showAll" v-show="all_show">详细</a>
            </p>
            <button @click="bianTong(97)">更详细的户型分析</button>
          </div>
        </div>
      </div>
      <!-- 图形验证码弹框 -->
      <div class="login" v-show="tuMaFlag">
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
import axios from "axios";
import $ from "jquery";
import header from "~/components/header.vue";
import mianbao from "~/components/mianbao.vue";
import footer from "~/components/footer.vue";
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
    "my-footer": footer,
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
  async asyncData({ app, query, params, store }) {
    //id 项目id
    // token
    // other
     let uuid = query.uuid;
       let  host = store.state.hostname;
      if(uuid && uuid!=="undefined" && uuid!=="null"){
        uuid =uuid;
      }else{
         uuid="";
      }
    let [data] = await Promise.all([
      app.$axios.get(`/jy/room/pc/list?token=${store.state.token}&id=${params.id}&uuid=${uuid}&other=${store.state.other}&host=${host}`).then((res) => {
        if (res.data.code == 200) {
          let data = res.data;
          return data;
        }
      }),
    ]);
    return {
      building:data.building,
      rooms: data.rooms,
      common: data.common,
      departments_one:data.rooms[0],
      staffs:data.common.staffs
    };
  },
  data() {
    return {
      title: [],
      hu_list: [],
      departments: [],
      departments_one: {},
      staffs: [],
      num: 0,
      tuMaFlag: false,
      textt: "向右滑",
      imgs: [img1, img2, img3, img4, img5, img6],
      msg: "", //图形验证码
      xiangtel: "",

      building:{},
      rooms:[],
      common:{},
      routerData:[],
      fenxi_data:"",
      all_show:true,
    };
  },
  methods: {
    showAll(){
        this.fenxi_data = this.departments_one.analysis;
        this.all_show = false;
    },
    qiehuan(num, ind) {
      this.num = ind;
      this.departments_one = this.rooms[ind];
    },
    bianTong(num) {
      sessionStorage.setItem("bao_id", num);
      sessionStorage.setItem("project_id", this.building.id);
      switch (num) {
        case 105:
          this.$parent.$parent.baoming_tel.tan_title = "咨询楼盘底价"; //ok
          this.$parent.$parent.baoming_tel.tan_content =
            "获取最新成交价格，看看房友都是什么价格买的房";
          this.$parent.$parent.baoming_tel.default_show = true;
          this.$parent.$parent.baoming_tel.kaipan_show = false;
          break;
        case 104:
          this.$parent.$parent.baoming_tel.tan_title = "在线咨询"; //ok
          this.$parent.$parent.baoming_tel.tan_content =
            "20分内回应、一对一专业服务，了解更多有关房源信息周边动态";
          this.$parent.$parent.baoming_tel.default_show = true;
          break;
        case 109:
          this.$parent.$parent.baoming_tel.tan_title = "剩余房源查询"; //ok
          this.$parent.$parent.baoming_tel.tan_content =
            "价格变动这么快？订阅楼盘变价通知，楼盘变价我们将第一时间通知您";
          this.$parent.$parent.baoming_tel.default_show = true;
        this.$parent.$parent.baoming_tel.kaipan_show = false;
          break;
        case 97:
          this.$parent.$parent.baoming_tel.tan_title = "咨询详细户型"; //ok
          this.$parent.$parent.baoming_tel.tan_content =
            "好楼盘户型是关键，咨询详细户型信息，安安心心买房";
          this.$parent.$parent.baoming_tel.default_show = true;
          break;
      }
      this.$parent.$parent.baoming_tel.telflag = true;
    },
    onSuccess() { //108 了解更多
      this.msg = "验证通过";
      let ip = ip_arr["ip"];
      var phone = this.xiangtel;
      var project = this.building.id;
      var posit = sessionStorage.getItem("bao_id");
      var other = sessionStorage.getItem("other");
      var kid = sessionStorage.getItem("kid");
      var city = sessionStorage.getItem("city_id");
      var pattern = new RegExp("^1[345678]\\d{9}$");
      let  remark = "单个楼盘户型页+了解更多";
      let name = "";

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
              this.tuMaFlag = false;
              // this.xiangtel = "";
              this.$refs.slideblock.reset();
            } else {
              console.log(res.data.message);
            }

            if(res.data.code==500  && res.data.message=="已成功为您订阅了该服务"){
                    this.$message.success(res.data.message);
                    this.tuMaFlag =false; 
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
    //图形验证码
    tijiaoTel(num) {
      sessionStorage.setItem("bao_id", num);
      var tel = this.xiangtel;
      // var pattern = new RegExp('^1[345678]\\d{9}$');
      var pattern = new RegExp("^1[345678]\\d{9}$");
      if (tel == "") {
        this.$message.error("手机号不能为空");
      } else if (!pattern.test(tel)) {
        this.$message.error("请输入正确的手机号");
      } else {
        this.tuMaFlag = true;
      }
    },
  },
  mounted() {
     this.fenxi_data = this.departments_one.analysis.slice(0,47);

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
         "name":`${this.building.name}主力户型`,
         "to":''
       }
    ];
    let login_tel = localStorage.getItem("old_tel");
    let token = localStorage.getItem("token");
    if (login_tel && token) {
      this.xiangtel = login_tel;
    }

    this.$router.afterEach((to, from, next) => {
      window.scrollTo(0, 0);
      console.log(to, from, next);
    });

    // var id = this.$route.params.id;
    // let match = id.match(/\d+/);
    // id = match[0];
    // axios
    //   .get(`/pc/departments?id=${id}`)
    //   .then((res) => {
    //     if (res.data.code == 200) {
    //       console.log(res);
    //       this.departments = res.data.departments;
    //       this.departments_one = res.data.departments[0];
    //       this.staffs = res.data.common.staffs;
    //       this.$parent.$children[0].com_tel = res.data.common.phone;
    //       this.$parent.$children[4].com_phone = res.data.common.phone;
    //       this.$parent.$children[5].com_phone = res.data.common.phone;
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    let _this = this;
    $(".rightBtn3")
      .eq(0)
      .click(function () {
        var num = _this.rooms.length;
        var speed = 116;
        var long = (num - 6) * speed;
        if (parseInt($(".ul3-long").eq(0).css("left")) <= -long) {
          $(".rightBtn3").children().css({
            color: "rgba(153,153,153,1)",
          });
          speed = 0;
        }
        $(".leftBtn3").children().css({
          color: "#000",
        });
        console.log($(".ul3-long").eq(0));
        $(".ul3-long")
          .eq(0)
          .animate(
            {
              left: parseInt($(".ul3-long").eq(0).css("left")) - speed + "px",
            },
            200
          );

        console.log($(".ul3-long").eq(0).css("left"));
      });

    $(".leftBtn3")
      .eq(0)
      .click(function () {
        var speed = 116;
        if (parseInt($(".ul3-long").eq(0).css("left")) >= -1) {
          $(".leftBtn3").children().css({
            color: "rgba(153,153,153,1)",
          });
          speed = 0;
        }
        $(".rightBtn3").children().css({
          color: "#000",
        });
        $(".ul3-long")
          .eq(0)
          .animate(
            {
              left: parseInt($(".ul3-long").eq(0).css("left")) + speed + "px",
            },
            200
          );
      });
  },
};
</script>

<style lang="less" scoped>
.hudetail:after {
  content: "";
  height: 0;
  clear: both;
  overflow: hidden;
  display: block;
  visibility: hidden;
}
.hudetail_box {
  .hudetail {
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
    .hu_left {
      width: 800px;
      height: auto;
      float: left;
      .sel_box {
        width: 800px;
        height: 50px;
        position: relative;
        margin-top: 34px;
        .like-pic {
          width: 720px;
          height: 50px;
          position: relative;
          margin: 0 auto;
          .boutique-ul3 {
            position: absolute;
            overflow: hidden;
            width: 720px;
            height: 50px;
            .ul3-long {
              height: 50px;
              width: 3000px;
              position: absolute;
              li {
                width: 100px;
                height: 50px;
                background: #f2f2f2;
                float: left;
                margin-left: 16px;
                position: relative;
                overflow: hidden;
                font-size: 14px;
              //  line-height: 50px;
                text-align: center;
                cursor: pointer;
                 display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                span{
                  font-size: 14px;
                  font-family: "Microsoft YaHei";
                  font-weight: bold;
                  color: #666666;
                  line-height: 26px;
                  text-align: center;
                }
                em{
                  font-size: 12px;
                  font-family: "Microsoft YaHei";
                  font-weight: 400;
                  color:#999999;
                  line-height: 12px;
                   text-align: center;
                }
              }
              .active {
                background: #2AC66D;
                color: #fff;
                font-weight: bold;
                span{
                  color: #fff;
                }
                em{
                  color: #fff;
                }
              }
            }
          }
        }
        .leftBtn3 {
          position: absolute;
          left: 0px;
          top: 0px;
          width: 20px;
          height: 50px;
          background: rgba(242, 242, 242, 1);
          border: 0px;
        }
        .rightBtn3 {
          position: absolute;
          width: 20px;
          height: 50px;
          background: rgba(242, 242, 242, 1);
          right: 0px;
          top: 0px;
          border: 0px;
        }
      }
      .hu_img_box {
        width: 800px;
        height: 552px;
        background: rgba(247, 247, 247, 1);
        margin-top: 24px;
        position: relative;
        overflow: hidden;
        img {
          // width: 379px;
          // height: 540px;
          // margin: 0 auto;
         
          // left: 50%;
          // margin-left: -190px;
          max-width: 800px;
          max-height: 552px;
          position: absolute;
          left: 50%;
          transform:translate(-50%,0) ;
        }
      }
      .project_intro{
          h3{
            font-size: 24px;
            font-family: "Microsoft YaHei";
            font-weight: 400;
            color: #323334;
            line-height: 72px;
            margin-top: 26px;
          }
          p{
                font-size: 14px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: #646666;
                line-height: 24px;
          }
      }
      //  最新户型详情
      .hu_bao {
        margin-top: 38px;
        margin-bottom: 100px;
        .detail_bao {
          width: 780px;
          height: 68px;
          background:#fff;
          position: relative;
          border-top:6px solid #2AC66D;
          border-bottom:6px solid #2AC66D;
          border-left:10px solid #2AC66D;
          border-right:10px solid #2AC66D;
          .left_bao {
            width: 456px;
            height: 68px;
            float: left;
            p {
             width: 350px;
            font-size: 14px;
            font-family: "Microsoft YaHei";
            font-weight: 400;
            color: #464955;
            line-height: 20px;
            margin-left:30px;
            margin-top:8px;
            }
          }
          .right_bao {
            width: 300px;
            height: 36px;
            display: flex;
            position: absolute;
            right: 24px;
            top: 10px;
            input::-webkit-input-placeholder {
              color: #464855;
              font-size: 14px;
            }
            input::-moz-placeholder {
              /* Mozilla Firefox 19+ */
              color: #464855;
              font-size: 14px;
            }
            input:-moz-placeholder {
              /* Mozilla Firefox 4 to 18 */
              color: #464855;
              font-size: 14px;
            }
            input:-ms-input-placeholder {
              /* Internet Explorer 10-11 */
              color:#464855;
              font-size: 14px;
            }
            input {
              width: 240px;
              height: 36px;
              background: #F2F5F7;
              text-indent: 1em;
              outline: none;
              border: none;
            }
            button {
              width: 100px;
              height: 36px;
              background: #2AC66D;
              font-size: 14px;
              font-family: "Microsoft YaHei";
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
              line-height: 36px;
              text-align: center;
              border: none;
              cursor: pointer;
            }
          }
        }
      }
    }
    .hu_right {
      width: 360px;
      height: auto;
      background: #FFFFFF;
      box-shadow: 0px 0px 7px 1px rgba(6, 0, 1, 0.04);
      border-radius: 8px;
      float: right;
      margin-top: 50px;
      .bang_box_home_h {
        float: right;
        width: 312px;
        height: auto;
        background: rgba(255, 255, 255, 1);
      //  box-shadow: 0px 0px 7px 1px rgba(6, 0, 1, 0.04);
        border-radius: 8px;
        padding-left: 24px;
        padding-top: 33px;
        padding-right: 24px;
        .project_top {
          height: 239px;
          border-bottom: 1px solid #f5f5f5;
          h3 {
            font-size: 24px;
            font-family: "Microsoft YaHei";
            font-weight: bold;
            color: rgba(26, 26, 26, 1);
            line-height: 24px;
            margin-bottom: 14px;
            span {
              margin-left: 20px;
              width: 50px;
              height: 24px;
              background: rgba(41, 204, 114, 1);
              border-radius: 3px;
              font-size: 14px;
              font-family: "Microsoft YaHei";
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
              text-align: center;
              line-height: 24px;
              display: inline-block;
              margin-right: 10px;
            }
          }
          .big_text {
            .cankao {
              font-size: 14px;
              font-family: "Microsoft YaHei";
              font-weight: 400;
              color: #808080;
              line-height: 30px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              margin-bottom: 8px;
            }
            .cankao span {
              font-size: 16px;
              font-family: "Microsoft YaHei";
              font-weight:bold;
              color: #ff6666;
              line-height: 30px;
            }
            .cankao span strong {
              font-size: 30px;
              font-family: "Microsoft YaHei";
              font-weight: 400;
              color: #ff6666;
              line-height: 30px;
              font-weight: bold;
            }
            .cankao em {
              width: 102px;
              height: 24px;
              border: 1px solid rgba(209, 161, 61, 1);
              font-size: 14px;
              font-family: "Microsoft YaHei";
              font-weight: 400;
              color: rgba(209, 161, 61, 1);
              line-height: 26px;
              display: inline-block;
              text-align: center;
              margin-left: 31px;
              cursor: pointer;
            }
            .small_text:after {
              content: "";
              height: 0;
              clear: both;
              overflow: hidden;
              display: block;
              visibility: hidden;
            }
            .small_text {
              li {
                font-size: 14px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: rgba(127, 127, 127, 1);
                line-height: 20px;
                width: 154px;
                float: left;
                line-height: 30px;
                span {
                  color: #191919;
                  font-weight: bold;
                  margin-left: 15px;
                }
              }
              li:last-child {
                width: 350px;
              }
            }
          }
          .btn_two {
            margin-top:10px;
            display: flex;
            justify-content: space-between;
            span {
              width: 144px;
              height: 34px;
              background: #F0F7F3;
              border-radius: 2px;
              font-size: 14px;
              font-family: "Microsoft YaHei";
              font-weight: bold;
              color: #3DA56A;
              text-align: center;
              line-height: 34px;
              display: inline-block;
              cursor: pointer;
            }
            span {
              i {
                font-size: 20px;
                line-height: 34px;
                margin-right: 5px;
                font-weight: 400;
              }
            }
          }
        }
        .pro_zixun {
          .fenxishi {
            height: 63px;
            padding-top: 20px;
            h4 {
              font-size: 16px;
              font-family: "Microsoft YaHei";
              font-weight: bold;
              color: rgba(31, 31, 31, 1);
              line-height: 16px;
            }
            .tese {
              li {
                font-size: 14px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: rgba(98, 100, 102, 1);
                float: left;
                margin-right: 19px;
                margin-top: 9px;
                line-height: 14px;
              }
            }
          }
          .kefu {
            width: 311px;
            height: 50px;
            margin-bottom: 20px;
            ul {
              li {
                margin-bottom: 24px;
                width: 311px;
                .head_img{
                  width: 40px;
                  height: 40px;
                  border-radius: 20px;
                  margin-right: 12px;
                  float: left;
                }
                .name_box {
                  width: 179px;
                  float: left;
                  h6 {
                    font-size: 16px;
                    font-family: "Microsoft YaHei";
                    font-weight: bold;
                    color: rgba(31, 31, 31, 1);
                    line-height: 16px;
                    margin-bottom: 10px;
                    span {
                      font-size: 12px;
                      font-family: "Microsoft YaHei";
                      font-weight: 400;
                      color: #2284F4;
                      width: 60px;
                      height: 18px;
                      background: #F2F8FF;
                      border-radius: 2px;
                      text-align: center;
                      margin-left: 6px;
                      display: inline-block;
                    }
                  }
                  p {
                    font-size: 14px;
                    font-family: "Microsoft YaHei";
                    font-weight: 400;
                    color: rgba(143, 143, 143, 1);
                    line-height: 14px;
                  }
                }
                button {
                  float: left;
                  font-size: 14px;
                  font-family: "Microsoft YaHei";
                  font-weight: 400;
                  color: #3DA56A;
                  width: 80px;
                  height: 30px;
                  border: 1px solid #3DA56A;
                  border-radius: 4px;
                  text-align: center;
                  line-height: 30px;
                  background: #fff;
                  float: right;
                  cursor: pointer;
                  outline: #3DA56A;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  img{
                    width: 16px;
                    height: 16px;
                  }
                }
              }
            }
          }
        }
        .fenxi {
          h6 {
            font-size: 16px;
            font-family: "Microsoft YaHei";
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
            margin-bottom: 22px;
          }
          p {
            font-size: 14px;
            font-family: "Microsoft YaHei";
            font-weight: 500;
            color: rgba(143, 143, 143, 1);
            // overflow : hidden;
            // text-overflow: ellipsis;
            // display: -webkit-box;
            // -webkit-line-clamp: 2; /* 可以显示的行数，超出部分用...表示*/
            // -webkit-box-orient: vertical;
          }
          a{
              font-size: 14px;
              color:#4393ff;
          }
          button {
            width: 309px;
            height: 30px;
            background: #F0F7F3;
            border-radius: 2px;
            font-size: 14px;
            font-family: "Microsoft YaHei";
            font-weight: bold;
            color: #3DA56A;
            border: none;
            text-align: center;
            margin-top: 25px;
            cursor: pointer;
            margin-bottom: 20px;
          }
        }
      }
    }
    /*图形验证二维码*/
    .login {
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