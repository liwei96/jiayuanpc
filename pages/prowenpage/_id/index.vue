<template>
  <div class="prowenpage">
    <my-header 
              :all="common.city_info.all"
              :telphone="common.phone"
              ref="header"></my-header>
    <my-mianbao :router_data="routerData"></my-mianbao>
    <div class="type_wen">
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
            <nuxt-link :to="`/content/${building.id}`">楼盘主页</nuxt-link>
          </li>
          <li>
            <nuxt-link :to="`/loudetail/${building.id}`">楼盘详情</nuxt-link>
          </li>
          <li>
            <nuxt-link :to="`/prohuxing/${building.id}`">主力户型</nuxt-link>
          </li>
          <li>
            <nuxt-link :to="`/prodong/${building.id}?page=1`">楼盘动态</nuxt-link>
          </li>
          <li>
            <nuxt-link :to="`/propic/${building.id}`">楼盘相册</nuxt-link>
          </li>
          <li>
            <nuxt-link :to="`/prowenda/${building.id}?page=1`">楼盘问问</nuxt-link>
          </li>
          <li>
            <nuxt-link :to="`/prodian/${building.id}?page=1`">楼盘点评</nuxt-link>
          </li>
        </ul>
        <span>咨询热线：{{common.phone.replace(",","转")}}</span>
      </div>

      <div class="type_con">
        <div class="lou_wen">
          <!-- 标题 -->
          <div class="title">
            <h5>
              <span>问</span>
              {{data.question}}
            </h5>
            <div class="title_box">
              <p>
                <span>{{data.time}}</span>
                <em>相关楼盘：{{building.name}}</em>
              </p>
              <!-- <button>
                <span class="iconfont"></span>我来回答
              </button> -->
            </div>
            <h6>
              共
              <em v-if="data.answer==''">0</em>
              <em v-else>1</em>个回答
            </h6>
          </div>
          <!-- 问答-->
          <div class="wen_list">
            <div class="wen_da">
              <ul class="wen">
                <li v-if="data.answer!==''">
                  <p>{{data.answer}}</p>
                  <p class="zan">
                    <span
                      class="iconfont icondianzan active"
                      v-if="data.my_like==1"
                      @click="getLike(data.id)"
                    ></span>
                    <span
                      class="iconfont icondianzan"
                      v-if="data.my_like==0"
                      @click="getLike(data.id)"
                    ></span>
                    <span @click="getLike(data.id)">{{data.like_num}}点赞</span>
                  </p>
                </li>
                <li v-else>
                  <p>暂无回答,我们会尽快为您解答这个问题</p></li>
              </ul>
              <div class="zixun_peo">
                        <img :src="staff.staff.head_img" alt="" :onerror="errorImg">
                        <p class="p_name">{{staff.staff.name}}<span>新房咨询</span></p>
                        <p class="fu">服务人数<em>{{staff.staff.ServeNum}}</em>人</p>
                        <button @click="kanZhuan(104)"><span class="iconfont iconzixun1"></span>向TA咨询</button>
              </div>
            </div>
            <!-- 单个项目 -->
            <div class="pro_box" >
                    <img :src="building.img" alt @click="goContent(building.id)" :onerror="errorImg"/>
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
                      <p class="tel">
                        {{common.phone.replace(",","转")}}
                      </p>
                      <p class="more">致电售楼处了解更多</p>
                  </div>
                  <div class="name_form">
                    <span>姓名:</span>
                    <input type="text" placeholder="请输入姓名" v-model="name" class="i_name" />
                    <br />
                    <span>电话:</span>
                    <input type="text" placeholder="请输入电话" v-model="phone" maxlength="11"/>
                    <br />
                    <p><el-checkbox v-model="checked_left" ></el-checkbox>我已阅读并同意 <a @click="goYongxie">《{{logo_text}}用户协议》</a></p>
                    <button @click="baoMing(103)">我要报名</button>
                  </div>
            </div>
          </div>
          <!-- 相关问答 -->
          <div class="about_wen">
            <h4>相关问答</h4>
              <ul>
                  <li v-for="item in relevant" :key="item.id">
                    <nuxt-link :to="`/prowenpage/${item.id}`">
                      <p class="wen"><span>问</span>{{item.question}}</p>
                      <p class="da">
                          <span>{{item.time}}</span>
                          <em><strong class="iconfont "></strong>1个回答</em>
                      </p>
                    </nuxt-link>
                  </li>
              </ul>
          </div>
        </div>

        <div class="rig_dingyue">
                <right-dao :daolist="articles"></right-dao>
                <div class="yukanfang">
                    <div class="yu_title" :style="bgImg">
                    </div>
                    <div class="form_box">
                          <textarea name="" id="area" cols="30" rows="10" placeholder="输入您不懂的楼盘问题开始问问吧"
                          v-model="tiwen_text"
                           @focus="focusTextarea"
                           ></textarea>
                          <p class="xieyi">
                              <input type="checkbox" v-model="checked" class="checkbox"/>
                              <span>我已阅读并同意<em><nuxt-link to="/we/fuwu">《{{logo_text}}用户协议》</nuxt-link></em></span>
                          </p>
                          <button @click="tijiao_tiwen">确定</button>
                    </div>
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
    </div>
    <my-footer :c_zhi_citys="common.city_info.all" 
        :c_hot_search="common.hot_search"
        :c_friendlink="common.friend_links"
        :footer_tel="common.phone"></my-footer>
  </div>
</template>
<script>
import axios from "axios";
import header from "~/components/header.vue";
import mianbao from "~/components/mianbao.vue";
import footer from "~/components/footer.vue";
import rightdao from "~/components/danpage/xiangdao.vue";
import rightbaoming from "~/components/danpage/yukanfang.vue";
import img1 from "~/assets/b1.jpg";
import img2 from "~/assets/b2.jpg";
import img3 from "~/assets/b3.jpg";
import img4 from "~/assets/b4.jpg";
import img5 from "~/assets/b5.jpg";
import img6 from "~/assets/b6.jpg";
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
        { hid: "Keywords", name: "Keywords", content:this.common.header.keywords}
      ]
    };
  },
  components: {
    "my-header": header,
    "my-mianbao":mianbao,
    "my-footer":footer,
    "right-dao" :rightdao,
    "right-bao-ming":rightbaoming,
  },
  data() {
    return {
      activeName: "first",
      questions: [],
      tag: "",
      com_tel: "",
      total: 0,
      tonglou: [],
      pageName: 1,
      name: "",
      phone: "",
      checked_left:true,
      checked: true,
      staffs: {},
      tuYanFlag: false,
      textt: "向右滑",
      imgs: [img1, img2, img3, img4, img5, img6],
      msg: "", //图形验证码
      features: [],
      header: {},
      errorImg: 'this.src="' + require("~/assets/kong_pic.png") + '"',
      comtel: "",
      project_city: {},

      common: {},
      building: {},
      articles: {},
      data: {},
      relevant: {},
      staff:{},
      bgImg: {
        backgroundImage: "url(" + require("~/assets/louti.jpg") + ")",
        backgroundRepeat: "no-repeat",
      },
      text: "看照片怎么够，预约看房我们将提供免费专车接送和专业楼盘讲解",
      tiwen_text:'',
      routerData:[],

      logo_text:"家园"
    };
  },
  //     head () {
  //     return {
  //       title:this.header.title,
  //       meta: [
  //           { hid: 'description', name: 'description', content:this.header.description },
  //           { hid: 'keywords', name: 'keywords', content:this.header.keywords }
  //       ]
  //     }
  //   },

  async asyncData({ app, params, error, store,query }) {
    var token = store.state.token;
    var kid = store.state.kid;
    var other = store.state.other;
      let  host = store.state.hostname;
    //         参数
    // id 问答id
    // other
    // token

    // if(kid=="undefined"){
    //    kid=""
    // }else{
    //   kid=kid
    // }
    // if(other=="undefined"){
    //    other=""
    // }else{
    //   other=other;
    // }
     let uuid = query.uuid;
      if(uuid && uuid!=="undefined" && uuid!=="null"){
        uuid =uuid;
      }else{
         uuid="";
      }
    let [data4] = await Promise.all([
      app.$axios
        .get(`/jy/question/detail?id=${params.id}&token=${store.state.token}&uuid=${uuid}&other=${store.state.other}&host=${host}`)
        .then((res) => {
          if (res.data.code == 200) {
            let data = res.data;
            return data;
          }
        })
        .catch((e) => {
          error({ statusCode: 404, message: e });
        }),
    ]);
    let common = {};
    let building = {};
    let articles = {};
    let data = {};
    let relevant = {};
    let  staff ={};
    if (data4) {
      data = data4.data;
      building = data4.building;
      common = data4.common;
      articles = data4.articles;
      relevant = data4.relevant;
      staff = data4.common.staff;
    }
    return {
      data: data,
      building: building,
      common: common,
      articles: articles,
      relevant: relevant,
      staff:staff
    };
  },

  methods: {
    goContent(num){
        this.$router.push(`/content/${num}`);
    },
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
                          this.$router.push(`/prowenda/${this.building.id}?page=1`)
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
      //   console.log(id);
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
          // console.log( this.$parent.$parent.$parent);
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
    kanZhuan(num) {
      sessionStorage.setItem("bao_id", num);
      switch (num) {
        case 104:
         this.$parent.$parent.baoming_tel.tan_title = "向TA咨询"; //1
          this.$parent.$parent.baoming_tel.tan_content =
            "20分内回应、一对一专业服务，了解更多有关房源信息周边动态";
          this.$parent.$parent.baoming_tel.default_show = true;
          break;
      }
     this.$parent.$parent.baoming_tel.telflag = true;
    },
    //图形验证码
    onSuccess() {
      this.msg = "验证通过";
      let ip = ip_arr["ip"];
      var phone = this.phone;
      var city = sessionStorage.getItem("city_id");
      var token = localStorage.getItem("token");
      var project = this.building.id;
      var posit = sessionStorage.getItem("bao_id");
      var other = sessionStorage.getItem("other");
      var kid = sessionStorage.getItem("kid");
      let name = this.name;
      let remark  = "单个楼盘问答+我要报名"
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
              //  this.phone = "";
              this.$refs.slideblock.reset();
            } else {
             cosnole.log(res.data.message);
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
      var tel = this.phone;
      var name = this.name;
      var pattern = new RegExp("^1[345678]\\d{9}$");
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
    },
    goYongxie() {
      this.$router.push("/we/fuwu");
    },
    pageChange(num) {
      var pid = this.$route.params.id;
      this.getLouWen(pid, num);
      this.pageName = num;
    },
    //扫码拨号
    saomaShow() {
      this.$refs.sao.saoma = true;
      this.$refs.sao.saoma_url = `http://ll.edefang.net//index/weichat/code?tel=${this.comtel}`;
    },
    saomaHide() {
      this.$refs.sao.saoma = false;
    },
    getLouWen(id, page) {
      var token = localStorage.getItem("token");
      var city = sessionStorage.getItem("city_id");
      var ip = ip_arr["ip"];
      //  var ip =this.$store.state.ip;
      axios
        .post("/api/project/question_info", {
          platform: 1,
          ip: ip,
          city: city,
          page: page,
          id: id, //项目id
          token: token,
          limit: 10,
        })
        .then((res) => {
          if (res.data.code == 200) {
            var list = res.data.data;
            if (list.length > 0) {
              this.questions = list;
              this.total = res.data.total;
            } else {
              this.questions = "";
            }

            //  console.log(list)
          } else {
            this.$message(res.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getHuDetail(id) {
      var ip = sessionStorage.getItem("ip");
      var token = localStorage.getItem("token");
      var city = sessionStorage.getItem("city_id");
      axios
        .post("/api/project/apartments", {
          id: id,
          city: city,
          token: token, //选填
          ip: ip,
          platform: 1,
        })
        .then((res) => {
          if (res.data.code == 200) {
            var detail = res.data.detail;
            this.detail = detail;
            this.tag = res.data.detail.tag;
            //  console.log(detail);
          } else {
            this.$message(res.data.message);
          }
        });
    },
    getLike(id) {
      var ip = ip_arr["ip"];
      var token = localStorage.getItem("token");
      if(token !=='' && token !== null){
           axios({
              method:'post',
              url:'/jy/question/like',
              params:{
                  token:token,
                  id:id
              }
            })
            .then((res) => {
              if (res.data.code == 200) {
                this.$message.success(res.data.message);
                this.$router.go(0);
              } else {
                this.$message.error(res.data.message);
              }
            })
            .catch((error) => {
              console.log(error);
            });
      }else{
          this.$message.error("请先登录...");
          this.$parent.$parent.loginTan = true;
      }
    },
  },
  beforeMount() {
    //   let  city_head_arr =this.$store.state.city_list;
    //   let has_city=this.$cookies.get('city_id');
    //   let  str ='www.jy8006.com';
    //   let host=window.location.host;
    //   if(host.indexOf(str)!==-1){
    //     if(!city_head_arr.hasOwnProperty(has_city)){
    //         console.log(111)
    //     }else{
    //           window.location.href ="http://" + city_head_arr[has_city] + ".jy8006.com"+this.$route.fullPath;
    //     }
    //   }
    //     //项目域名和城市一致
    //   let local_str = "localhost:3001";
    //   let ceshi_str = "xiaoyan.jy8006.com";
    //   let  now_city_pin  = this.project_city.pinyin;
    //    if(now_city_pin!==''){
    //       if(host.indexOf(now_city_pin)!==-1){
    //           //域名正确
    //       }else{
    //           if(host.indexOf(local_str)!==-1){
    //               console.log(local_str); //本地地址时不跳转
    //           }else if(host.indexOf(ceshi_str)!==-1){
    //               console.log(host); //测试地址时不跳转
    //           }else{
    //               window.location.href ="http://" + now_city_pin + ".jy8006.com"+decodeURIComponent(this.$route.fullPath);
    //           }
    //       }
    //   }
       let  mine = this.$store.state.style_mine;
        if(mine==1){ //易得房样式
            this.logo_text = "易得房";
        }else if(mine==2){ //家园样式
           this.logo_text = "家园";
        }
  },
  mounted() {
       this.$parent.$parent.heng_name = this.building.name;
       this.$parent.$parent.project_id_im = this.building.id;
      this.$parent.$parent.saoma_telphone = this.common.phone;
       
     let  token = localStorage.getItem('token');
      let old_tel=localStorage.getItem("old_tel");
      if(token && old_tel){
          this.phone=old_tel;
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
         "name":`${this.building.name}问答`,
         "to":`/prowenda/${this.building.id}?page=1`
       },
        {
         "name":`${this.data.question}`,
         "to":""
       }
    ];
    //    this.getPhone();
    //    this.$parent.$parent.project_id_wen =  this.building.id;
    //      let  features = this.building.features;
    //      let  data = [];
    //      features.map((p,q)=>{
    //          if(p!==''){
    //              data.push(p)
    //          }
    //      })
    //      this.features = data;
    //     var tel=sessionStorage.getItem("telphone_com");
    //       this.com_tel=tel;
    //       this.$router.afterEach((to, from, next) => {
    //         window.scrollTo(0, 0)
    //     })
    //     var id=this.$route.params.id;
  },
  computed: {
  },
};
</script>
<style  lang="less" scoped>
.prowenpage{
    .type_wen {
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
        .lou_wen {
        width: 860px;
        height: auto;
        float: left;
        .title {
            height: auto;
            width: 860px;
            border-bottom: 1px solid #ededed;
            h5 {
            font-size: 32px;
            font-family: "Microsoft YaHei";
            font-weight: 400;
            color: rgba(49, 50, 51, 1);
            line-height: 72px;
            margin-top: 19px;
            span {
                font-size: 16px;
                font-family: "Microsoft YaHei";
                font-weight: bold;
                color: rgba(255, 255, 255, 1);
                width: 24px;
                height: 24px;
                background: linear-gradient(
                -45deg,
                rgba(255, 191, 52, 1),
                rgba(255, 144, 63, 1)
                );
                border-radius: 6px 0px 6px 0px;
                display: inline-block;
                line-height: 24px;
                text-align: center;
                margin-right: 9px;
            }
            }
            .title_box {
            height: 36px;
            width: 860px;
            p {
                font-size: 14px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: rgba(150, 151, 153, 1);
                line-height: 36px;
                float: left;
                span {
                margin-right: 27px;
                }
                em {
                font-style: normal;
                }
            }
            button {
                width: 112px;
                height: 36px;
                background: rgba(42, 198, 109, 1);
                font-size: 16px;
                font-family: "Microsoft YaHei";
                font-weight: bold;
                color: rgba(255, 255, 255, 1);
                line-height: 20px;
                border: none;
                float: right;
            }
            }
            h6 {
            font-size: 18px;
            font-family: "Microsoft YaHei";
            font-weight: bold;
            color: rgba(49, 50, 51, 1);
            margin-top: 25px;
            margin-bottom: 20px;
            em {
                font-style: normal;
                color: #ff5543;
            }
            }
        }
        .wen_list:after {
            content: "";
            height: 0;
            clear: both;
            overflow: hidden;
            display: block;
            visibility: hidden;
        }
        .wen_list {
            width: 860px;
            height: auto;

            .wen_da:after {
            content: "";
            height: 0;
            clear: both;
            overflow: hidden;
            display: block;
            visibility: hidden;
            }
            .wen_da {
            border-bottom: 1px solid #ededed;
            padding-bottom: 40px;
            .wen {
                margin-top: 29px;
                float: left;
                li {
                width: 540px;
                height: auto;
                background: rgba(247, 247, 247, 1);
                padding: 0px 24px;
                padding-top: 17px;
                padding-bottom: 15px;
                p {
                    font-size: 14px;
                    font-family: "Microsoft YaHei";
                    font-weight: 400;
                    color: rgba(100, 101, 102, 1);
                    line-height: 26px;
                    span {
                    margin-right: 6px;
                    }
                }
                .zan {
                    text-align: right;
                    border-top: 1px solid #ededed;
                    margin-top: 17px;
                    padding-top: 8px;
                    span {
                    cursor: pointer;
                    }
                    .active {
                    color: #4cb5ff;
                    }
                }
                }
            }
            .zixun_peo {
                width: 200px;
                height: 182px;
                float: right;
                img {
                width: 48px;
                height: 48px;
                border-radius: 24px;
                margin-left: 80px;
                margin-top: 30px;
                }
                .p_name {
                font-size: 16px;
                font-family: "Microsoft YaHei";
                font-weight: bold;
                color: rgba(31, 31, 31, 1);
                text-align: center;
                margin-top: 14px;
                line-height: 16px;
                span {
                    font-size: 12px;
                    font-family: "Microsoft YaHei";
                    font-weight: 400;
                    color: rgba(34, 132, 244, 1);
                    width: 60px;
                    height: 18px;
                    background: rgba(242, 248, 255, 1);
                    border-radius: 2px;
                    text-align: center;
                    line-height: 18px;
                    margin-left: 6px;
                }
                }
                .fu {
                font-size: 14px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: rgba(143, 143, 143, 1);
                text-align: center;
                line-height: 36px;
                em {
                    font-style: normal;
                    color: #ff5543;
                }
                }
                button {
                width: 82px;
                height: 30px;
                background: #F0F7F3;
                border: 1px solid #3EA66A;
                border-radius: 2px;
                font-size: 12px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: #3EA56A;
                margin-left: 60px;
                margin-top: 9px;
                outline: none;
                cursor: pointer;
                span {
                    font-size: 14px;
                }
                }
            }
            }
            .pro_box {
            width: 828px;
            height: 173px;
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
                width: 278px;
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
                padding-left: 66px;
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
        .about_wen {
            margin-bottom: 100px;
            h4 {
            font-size: 24px;
            font-family: "Microsoft YaHei";
            font-weight: bold;
            color: rgba(49, 50, 51, 1);
            line-height: 24px;
            margin-top: 72px;
            margin-bottom: 22px;
            }
            ul {
            li {
                width: 860px;
                height: 60px;
                border-bottom: 1px solid #ededed;
                padding-top: 16px;
                .wen {
                font-size: 16px;
                font-family: "Microsoft YaHei";
                font-weight: bold;
                color: rgba(49, 50, 51, 1);
                span {
                    font-size: 14px;
                    font-family: "Microsoft YaHei";
                    font-weight: 400;
                    color: rgba(255, 255, 255, 1);
                    width: 20px;
                    height: 20px;
                    background: linear-gradient(
                    -45deg,
                    rgba(255, 191, 52, 1),
                    rgba(255, 144, 63, 1)
                    );
                    border-radius: 6px 0px 6px 0px;
                    font-style: normal;
                    display: inline-block;
                    text-align: center;
                    margin-right: 11px;
                }
                }
                .da {
                margin-top: 8px;
                span {
                    font-size: 14px;
                    font-family: "Microsoft YaHei";
                    font-weight: 400;
                    color: rgba(150, 151, 153, 1);
                    line-height: 20px;
                    float: left;
                    margin-left: 32px;
                }
                em {
                    font-size: 14px;
                    font-family: "Microsoft YaHei";
                    font-weight: 400;
                    color: rgba(100, 101, 102, 1);
                    line-height: 20px;
                    float: right;
                    font-style: normal;
                    strong {
                    }
                }
                }
            }
            }
        }
        }

        .rig_dingyue {
        width: 340px;
        height: auto;
        float: right;
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