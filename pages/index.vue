<template>
  <div class="container">
    <div class="home">
      <my-header
        :all="common.city_info.all"
        :telphone="common.phone"
        :butie ="activity_project.length>0"
        :name="common.city_info.current.short"
        ref="header"
      ></my-header>
      <div class="back" >
        <div class="back_cen">
           <img :src="old_pic" alt="" class="beijing" v-if="this.$store.state.style_mine==0" @click="goPage(banner.url)">
           <img :src="old_pic" alt="" class="beijing" v-if="this.$store.state.style_mine==1" @click="goPage(banner.url)">
          <!-- 搜索框 -->
          <div class="sou_suo_box">
            <input
              type="text"
              placeholder="请输入楼盘名称、关键字"
              v-model="searchText"
              @click.stop="showSouBox"
            />
            <span @click="goMap">
              <img src="~/assets/icon/home_map.png" />地图
            </span>
            <button @click="getSou" :class="banner.length!=0?'hong':'green'">立即找房</button>
          </div>
          <!-- 搜索结果--热门搜索 -->
          <div class="sou_list" v-show="sou_suo.hot_sou">
            <h6>热门搜索</h6>
            <ul>
              <li v-for="item in hots" :key="item.id">
                <nuxt-link :to="`/content/${item.id}`">{{
                  item.name
                }}</nuxt-link>
              </li>
            </ul>
          </div>
          <!-- 搜索结果--词搜索 -->
          <div class="sou_list_ci" v-show="sou_suo.ci_sou">
            <h6>
              为您找到如下“{{ this.searchText }}”相关搜索
              <!-- <span>共{{ this.sou_list.length }}条相关</span> -->
            </h6>
            <ul>
              <li v-for="item in sou_list" :key="item.id">
                <nuxt-link :to="`/content/${item.id}`">
                  <span v-html="item.name"></span>
                  <p>{{ item.city }} - <i v-html="item.address"></i></p>
                  <em>{{ item.price }}元/m²</em>
                </nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 返乡置业 -->
      <div class="fanxiang" v-if="activity_project.length>0">
          <div class="left">
                <img src="~/assets/fan/home_left.jpg" alt="">
                <button @click="goSearch(-1, -1)">去选房</button>
                <span @click="showRules">活动介绍></span>
          </div>
          <div class="right_project">
                <div class="top_title">
                    <p>共<em v-html="zong_num_01"></em>位用户已领取，累计领取补贴<em v-html="zong_num_02"></em>万元</p>
                    <div class="xiaoxi">
                       <img src="~/assets/fan/la.png" alt="">
                        <el-carousel height="32px" direction="vertical" :autoplay="true" :interval = "1500">
                          <el-carousel-item v-for="item in activity_received.carousel" :key="item.id">
                            <h3 class="medium">用户{{item.tel}}成功领取{{item.name}}购房补贴</h3>
                          </el-carousel-item>
                       </el-carousel>
                    </div>
                </div>
                <div class="project_list_fan">
                  <el-carousel indicator-position="outside" height="350px"  trigger="click" @change="qieLun" :autoplay="true" :interval = "5000">
                          <el-carousel-item  v-for="item in other_lun_page" :key="item" >
                            <ul>
                                  <li class="hongbao_top" v-for="item in activity_project" :key="item.id">
                                      <img src="~/assets/fan/home_pro.png" alt="" @click="lingBox(item.id,'首页返乡置业+补贴金额'+item.money)">
                                    <nuxt-link :to="`/content/${item.id}`">
                                        <h4>¥{{item.money}}</h4>
                                        <p>{{item.name}}</p>
                                    </nuxt-link>
                                  </li>
                            </ul>
                          </el-carousel-item>
                  </el-carousel>
                </div>
          </div>
      </div>
      <!-- 特惠房源 -->
      <div class="tehui" >
        <div class="tehui_left">
          <div class="zaishou" v-if="common.city_info.current">
            <span class="iconfont iconfont iconlaba"></span>
            {{ common.city_info.current.short }}在售新房 <em>{{ sale_num }}</em
            >个
          </div>
          <div class="remen_area">
            <h5>热门区域</h5>
            <ul>
              <template  v-for="(item,index ) in areas">
              <li
                v-if="index<9"
                :key="item.id"
                @click="goSearch(item.id, 1)"
              >
                {{ item.name }}
              </li>
              </template>
            </ul>
            <p @click="goSearch(0, 0)">更多热门区域></p>
            <div class="xian"></div>
          </div>
          <div class="jun">
            <h5>楼盘均价</h5>
            <ul>
              <li
                v-for="item in prices"
                :key="item.id"
                @click="goSearch(item.id, 2)"
              >
                {{ item.name }}
              </li>
            </ul>
            <p @click="goSearch(0, 0)">更多均价></p>
            <div class="xian"></div>
          </div>
          <div class="huxing">
            <h5>楼盘户型</h5>
            <ul>
              <li
                v-for="item in house_types"
                :key="item.id"
                @click="goSearch(item.id, 3)"
              >
                {{ item.name }}
              </li>
            </ul>
            <p @click="goSearch(0, 0)">更多户型></p>
          </div>
        </div>
        <div class="tehui_right">
          <h2>特惠房源</h2>
          <ul>
            <li v-for="(item, index) in project" :key="index">
              <nuxt-link :to="`/content/${item.id}`">
                <div class="img_box">
                  <img :src="item.img" :alt="item.name" :title="item.name"/>
                  <span class="name">{{ item.name }}</span>
                  <span class="bu" v-if="item.money!==0">补贴<em>￥{{item.money}}</em></span>
                  <em>
                    <strong class="iconfont icondizhi1"></strong>
                    {{ item.city }}-{{ item.country }}
                  </em>
                  <div class="bg"></div>
                </div>
                <div class="price_box">
                  <div class="price">
                    <span>
                      均价：
                      <em>{{ item.price }}元/m²</em>
                    </span>
                    <strong>{{ item.type }}</strong>
                  </div>
                  <p>面积 {{ item.area }}m²</p>
                </div>
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
      <!-- 家园严选 -->
      <div class="jia_yan" v-if="stricts.length>0">
        <div class="jia_yuan_sel">
          <h2>{{logo_text}}严选</h2>
          <ul v-if="stricts.length>0">
            <li v-for="(item, index) in stricts" :key="index" >
              <nuxt-link :to="`/content/${item.id}`">
                <img :src="item.img" :alt="item.name" :title="item.name"/>
                <h3>{{ item.name }}</h3>
                <div class="bg"></div>
                <div class="bottom">
                  <span class="country">{{ item.country }}</span>
                  <span class="area">面积 {{ item.area }}m²</span>
                  <span class="junjia">均价：{{ item.price }}元/m²</span>
                </div>
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
      <!--热门楼盘-->
      <div class="hot_lou" v-if="hots.length>0">
        <h2>热门楼盘</h2>
        <ul>
          <li v-for="(item, index) in hots" :key="index">
            <nuxt-link :to="`/content/${item.id}`">
              <div class="top_img">
                <span>TOP{{ index + 1 }}</span>
                <img :src="item.img" :alt="item.name" :title="item.name"/>
                <div class="bg"></div>
              </div>
              <div class="bottom_xin">
                <h3>{{ item.name }}</h3>
                <p class="address">{{ item.city }}-{{ item.country }}</p>
                <p class="jianmian">
                  <span>建面 {{ item.area }}m²</span>
                  <em>
                    均价:
                    <i>{{ item.price }}</i
                    >元/m²
                  </em>
                </p>
              </div>
            </nuxt-link>
          </li>
        </ul>
      </div>
      <!--成交案例-->
      <div class="chengjiao_big" v-if="chengjiao.length>0&&$store.state.style_mine!=1">
        <div class="chengjiao">
          <div class="title">
            <h4>
              成交案例
              <span>来至于买房者的自述</span>
            </h4>
            <em><nuxt-link to="/allchengjiao">了解更多></nuxt-link></em>
          </div>
          <ul v-if="chengjiao.length>0">
            <li v-for="(item, index) in chengjiao" :key="index">
              <nuxt-link :to="`/danchengjiao/${item.id}`">
                <div class="img_box">
                  <img :src="item.img" alt />
                  <div class="bg"></div>
                </div>

                <div class="tit_bottom">
                  <h6>{{ item.title }}</h6>
                  <p>{{ item.description }}</p>
                </div>
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
      <!--新房资讯-->
      <div class="zixun">
        <h2>新房资讯</h2>
        <div class="con_bottom">
          <div class="left_dong">
            <div class="dong_title">
              <h5>新房动态</h5>
              <span
                ><nuxt-link :to="`/fangzidong?page=1`"
                  >更多动态></nuxt-link
                ></span
              >
            </div>
            <ul>
              <li v-for="(item, index) in dynamics" :key="index">
                <nuxt-link :to="`/loudongpage/${item.id}`">
                  <img :src="item.img" alt="" />
                  <div class="right_content">
                    <h6>{{ item.name }}最新房源动态</h6>
                    <p class="time">{{ item.time }}</p>
                    <p class="content">{{ item.introduce }}</p>
                  </div>
                </nuxt-link>
              </li>
            </ul>
          </div>
          <div class="news">
            <div class="top_news">
              <nuxt-link :to="`/article/${focus_1.id}`" v-if="focus_1">
                <img :src="focus_1.img" alt="" />
                <p>{{ focus_1.title }}</p>
              </nuxt-link>
            </div>
            <ul>
              <li>
                <nuxt-link :to="`/article/${focus_2.id}`" v-if="focus_2">
                  <img :src="focus_2.img" alt="" />
                  <p>{{ focus_2.title }}</p>
                  <div class="bg"></div>
                </nuxt-link>
              </li>
              <li>
                <nuxt-link :to="`/article/${focus_3.id}`" v-if="focus_3">
                  <img :src="focus_3.img" alt="" />
                  <p>{{ focus_3.title }}</p>
                  <div class="bg"></div>
                </nuxt-link>
              </li>
              <li>
                <nuxt-link :to="`/article/${focus_4.id}`" v-if="focus_4">
                  <img :src="focus_4.img" alt="" />
                  <p>{{ focus_4.title }}</p>
                  <div class="bg"></div>
                </nuxt-link>
              </li>
            </ul>
          </div>
          <div class="lou_dao">
            <div class="lou_title">
              <h5>楼盘导购</h5>
              <span><nuxt-link :to="`/fangzi/46/1`">更多></nuxt-link></span>
            </div>
            <ul v-if="building_guides.length>0">
              <li v-for="(item, index) in building_guides" :key="index">
                <nuxt-link :to="`/article/${item.id}`">
                  <h5><span>楼盘导购</span> {{ item.title }}</h5>
                  <p>{{ item.description }}</p>
                </nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <my-footer
        :c_zhi_citys="common.city_info.all"
        :c_hot_search="common.hot_search"
        :c_friendlink="common.friend_links"
        :footer_tel="common.phone"
      >
      </my-footer>
    </div>
    <fan-tan  ref="hong" :project="project_id"  :remark="remark"></fan-tan>
    <rules-fan ref="rules"></rules-fan>
  </div>
</template>

<script>
import header from "../components/header";
import footer from "../components/footer";
import fantan from "../components/fanTan.vue";
import rulesfan from "~/components/activityrule.vue";
import axios from "axios";
export default {
  middleware: "metaTitle",
  meta: { title: "首页" },
  head() {
    return {
      title: this.common.header.title ,
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
  async asyncData({ app, query, params, store, error }) {
    let uuid = query.uuid;
      if(uuid && uuid!=="undefined" && uuid!=="null"){
        uuid =uuid;
      }else{
         uuid="";
      }
      console.log(store.state.pinyin)
    let [data,lunbo] = await Promise.all([
      app.$axios
        .get(
          // `/jy/pc/first?token=${store.state.token}&city=${store.state.city_id}&uuid=${uuid}`
          `/jy/pc/first`
        ,{
          params: {
            token: store.state.token,
            city: store.state.city_id,
            uuid: uuid,
            // token: store.state.token,
          }
        })
        .then((res) => {
          if (res.data.code == 200) {
            let data = res.data;
            return data;
          }
        }).catch(e=>{
             error({ statusCode: 404, message: 'Post not found' })
        }),
        //返乡置业轮播
        // city 47
        // type 1 返乡置业 默认
        // page 第几页 默认1
        // limit 每页几条 默认6
     app.$axios
        .get(
          `/jy/mobile/activity_info?type=1&city=${store.state.city_id}&page=1&limit=6`
        )
        .then((res) => {
          if (res.data.code == 200) {
            let data = res.data;
            return data;
          }
        }).catch(e=>{
            error({ statusCode: 404, message: 'Post not found' })
        }),
    ]


    );
    let  old_pic ='';
    let banner = data.common.banner;
    if(banner.length!==0){
        old_pic = banner.img
    }else{
      old_pic = require('~/assets/index.jpg');
    }

    return {
      project: data.projects.specials,
      stricts: data.projects.stricts,
      hots: data.projects.hots,
      areas: data.lefts.areas,
      prices: data.lefts.prices,
      house_types: data.lefts.house_types,
      chengjiao: data.articles.deal_examples,
      dynamics: data.articles.dynamics,
      focus_1: data.articles.focus_1,
      focus_2: data.articles.focus_2,
      focus_3: data.articles.focus_3,
      focus_4: data.articles.focus_4,
      building_guides: data.articles.building_guides,
      common: data.common,
      sale_num: data.lefts.sale_num[0].num,
      current_city:data.common.city_info.current,
      banner: data.common.banner,
      old_pic:old_pic,
      activity : data.common.activity,
      activity_project: lunbo.data,
      activity_received: data.common.activity.received,
      other_lun:lunbo.data,
      other_lun_total: lunbo.total,
      other_lun_page : lunbo.page_total_num
    };
  },
  data() {
    return {
      bgImg: {
        backgroundImage: "url(" + require("../assets/index.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 480px",
      },
      project: [],
      stricts: [],
      hots: [],
      chengjiao: [],
      areas: [],
      prices: [],
      house_types: [],
      sou_suo: {
        hot_sou: false,
        ci_sou: false,
      },
      dynamics: [],
      building_guides: [],
      focus_1: [],
      focus_2: [],
      focus_3: [],
      focus_4: [],
      common: {},
      sale_num: [],
      searchText: "",
      hots: [],
      sou_list: [],
      routerData: [],
      logo_text:'家园',
      mine:0,
      current_city:{},

      animate:false,
      
      items:[
         
      ],
      //返乡置业
      old_pic:require('~/assets/index.jpg'),
      banner:{},
      activity:{},
      activity_project:{},
      activity_received:{},
      other_lun:[],
      other_lun_total:'',
      other_lun_page:'',
      zong_num_01:'',
      zong_num_02:'',

      project_id:"",
      remark:""


      


    };
  },
  watch: {
    $route(to,form) {
      this.$router.go(0);
    //  this.routerData = this.$route.matched;
    },
    searchText: function (newnum) {
      if (newnum !== "") {
        this.sou_suo.hot_sou = false;
        this.sou_suo.ci_sou = true;
        var text = this.searchText;
        let city_name = sessionStorage.getItem('city_name')
        axios
          .post("/api/project/e_search", {
            name: text,
            city:city_name
          })
          .then((res) => {
            if (res.data.code == 200) {
              let data = res.data.data;
              if (data.length > 0) {
                this.sou_list = data;
              } else {
                this.sou_list = [];
              }
            } else {
              this.sou_list = [];
            }
          })
          .catch((error) => {
            console.log(error);
          });

        // var dd = [];
        // var number = this.projects;
        // for (let val of number) {
        //   if (val["name"].indexOf(text) != -1) {
        //     dd.push(val);
        //   }
        // }
        // this.sou_list = dd;
      } else {
        this.hot_flag = false;
        this.sou_list_flag = false;
      }
    },
  },
  components: {
    "my-header": header,
    "my-footer": footer,
    "fan-tan" : fantan,
    "rules-fan": rulesfan
  },
  beforeMount(){
        let  mine = this.$store.state.style_mine;
        this.mine = mine;
        if(mine==1){ //易得房样式
            this.logo_text = "易得房";
        }else if(mine==2){ //家园样式
           this.logo_text = "家园";
          
        }

      //跳转手机端
      this.getWidth();
      //转化数据
      let  data = this.activity_received.num;
      let  data2 = this.activity_received.money;
      data = data.toString() //把数bai字转du换zhi成dao字符zhuan串shu
      data2 = data2.toString()
      for (var i = 0; i < data.length; i++) {
          this.zong_num_01 += `<span>${data[i]}</span>`
      }
      for (var i = 0; i < data2.length; i++) {
          this.zong_num_02 += `<span>${data2[i]}</span>`
      }

  },
  // beforeMount(){ 
  //   //根据ip条对应域名
  //   let city_name_arr = {
  //     112: "徐州市",
  //     1: "杭州市",
  //     36: "宁波市",
  //     38: "嘉兴市",
  //     104: "湖州市",
  //     73: "绍兴市",
  //     93: "湛江市",
  //     41: "重庆市",
  //     47: "成都市",
  //     3: "贵阳市",
  //     149:"无锡市",
  //     181:"肇庆市",
  //   };
   
  //   let  city_head_arr = this.$store.state.city_list;
  //   var host = window.location.host;
  //   let local = "localhost:3012";
  //   let kid = this.$cookies.get('kid');
  //   let other = this.$cookies.get('other');

  //   if (host.indexOf(local) !== -1) {
  //       console.log(host); //测试环境
  //   } else {
  //     var city_id = this.$cookies.get("city_id");
  //     if (city_id && city_id!== '0') {
  //       //第二次执行
  //       if (!city_head_arr.hasOwnProperty(city_id)) {
  //         city_id = 1;
  //       }
  //       let head = city_head_arr[city_id];
  //       if (host.indexOf(head) === -1) {
  //         //不是分站域名则跳分站
  //         this.$cookies.set("city_id", city_id);
  //         sessionStorage.setItem("city_id", city_id);
  //         sessionStorage.setItem("city_name", head);
  //         window.location.href = "http://" + head + ".jy1980.com";
  //       }
  //     } else {
  //       //是第一次执行
  //       var ip = ip_arr["ip"];
  //       axios
  //         .post("/api/location/get_city", {
  //           ip: ip,
  //         })
  //         .then((res) => {
  //           if (res.data.code == 200) {
  //             let city = res.data.city.id;
  //             let name = res.data.city.name;
  //             let pinyin =res.data.city.pinyin;
  //             if (city) {
  //               sessionStorage.setItem("city_id", city);
  //               this.$cookies.set("city_id", city);
  //               sessionStorage.setItem("city_name", name);
  //               let head = city_head_arr[city];
  //               if (head) {
  //                 if (host.indexOf(head) === -1) {
  //                  window.location.href = "http://" + pinyin + ".jy1980.com";
  //                 }
  //               }
  //             }
  //           } else {
  //             console.log(res.data.message);
  //             this.$message(res.data.message);
  //           }
  //         });
  //     }
  //   }
  // },
  methods: {
    goPage(url){
          console.log(url,'url')
          if(url==null){
               console.log(url,'url')
          }else{
              window.location.href=url;
          }
    },
    lingBox(pid,remark){
        this.project_id = pid;
        this.remark = remark;
        this.$refs.hong.showHong();
    },
    showRules(){
        this.$refs.rules.showRules();
    },
    qieLun(e){
        var city_id = this.$cookies.get("city_id");
        axios.get('/jy/mobile/activity_info',{
            params:{
                type:1,
                city:city_id,
                limit:6,
                page:e+1
            }
        }).then(res=>{
          if(res.data.code == 200){
             this.activity_project = res.data.data;
          }
        })
    },
    getWidth(){
        //跳转手机端 
          let host = window.location.host;
          let city_current = this.current_city;
          let width=document.body.clientWidth;
        window.onresize=()=>{
            if(width<490){
              if(host.indexOf('www.jy1980.com') != -1){
                  window.location.href="http://m.jy1980.com"
              }else if(host.indexOf('www.edefang.net') != -1){
                  window.location.href="http://mobile.edefang.net"
              }else if(host.indexOf(city_current.pinyin+'.jy1980.com')!=-1){
                   window.location.href="http://m.jy1980.com/"+ city_current.pinyin
              }else if(host.indexOf(city_current.pinyin+'.edefang.net')!=-1){
                  window.location.href="http://mobile.edefang.net/"+city_current.pinyin
              }
            }
        }

        let liu_width=document.body.clientWidth;
        if(liu_width<490){
             if(host.indexOf('www.jy1980.com') != -1){
                  window.location.href="http://m.jy1980.com"
              }else if(host.indexOf('www.edefang.net') != -1){
                  window.location.href="http://mobile.edefang.net"
              }else if(host.indexOf(city_current.pinyin+'.jy1980.com')!=-1){
                  window.location.href="http://m.jy1980.com/"+ city_current.pinyin
              }else if(host.indexOf(city_current.pinyin+'.edefang.net')!=-1){
                   window.location.href="http://mobile.edefang.net/"+city_current.pinyin
              }
        }
    },
    getSou(){
        if(this.searchText==''){
          this.$message.error("请输入楼盘名称、关键字");
        }
    },
    goMap() {
      this.$router.push("/bmap");
    },
    tostring(name, val) {
      let url = this.$route.path;
      let type = JSON.parse(sessionStorage.getItem("typearr"));
      if (val == "0") {
        if (type.hasOwnProperty(name)) {
          delete type[name];
        }
      } else {
        type[name] = val;
      }
      sessionStorage.setItem("typearr", JSON.stringify(type));
      let str = "";
      for (let key in type) {
        str += key + "-" + type[key] + "+";
      }
      str = str.substring(0, str.length - 1);
      this.$router.push(`/searchpro/${str}`);
    },
    goSearch(ind, typ) {
      if (ind == 0 && typ == 0) {
        if(this.activity_project.length>0){
          this.$router.push("/searchpro/?fan=1");
        }else{
           this.$router.push("/searchpro/");
        }
       
      }else if(ind == -1 && typ == -1){
           this.$router.push("/searchpro/?fan=1");
      }
      let has_arr = JSON.parse(sessionStorage.getItem("typearr"));
      let arr = {};
      if (ind && typ) {
        switch (typ) {
          case 1: //代表区域
            arr.qyu = ind;
            sessionStorage.setItem("typearr", JSON.stringify(arr));
            has_arr = JSON.parse(sessionStorage.getItem("typearr"));
            break;
          case 2: //代表均价
            arr.dprice = ind;
            sessionStorage.setItem("typearr", JSON.stringify(arr));
            has_arr = JSON.parse(sessionStorage.getItem("typearr"));
            break;
          case 3: //代表户型
            arr.huxing = ind;
            sessionStorage.setItem("typearr", JSON.stringify(arr));
            has_arr = JSON.parse(sessionStorage.getItem("typearr"));
            break;
        }
      }

      for (var key in has_arr) {
        if (key == "qyu") {
          this.tostring(key, has_arr[key]);
        } else if (key == "dtie") {
          this.tostring(key, has_arr[key]);
        } else if (key == "zprice") {
          this.tostring(key, has_arr[key]);
        } else if (key == "huxing") {
          this.tostring(key, has_arr[key]);
        } else if (key == "tese") {
          this.tostring(key, has_arr[key]);
        } else if (key == "dprice") {
          this.tostring(key, has_arr[key]);
        } else if (key == "type") {
          this.tostring(key, has_arr[key]);
        } else if (key == "mji") {
          this.tostring(key, has_arr[key]);
        }
      }

      //原代码
      // if (ind && typ) {
      //   this.top_num = ind;
      //   this.$router.push(`/sou/?id=${ind}&type=${typ}`);
      // } else {
      //   this.$router.push(`/sou`);
      // }
    },
    hideSouBox() {
      this.sou_suo.hot_sou = false;
      this.sou_suo.ci_sou = false;
    },
    showSouBox() {
      this.getTextSou();
      this.sou_suo.hot_sou = true;
    },
    //热门搜索
    getTextSou() {
      var city = sessionStorage.getItem("city_id");
      axios
        .post("/api/project/project_names", {
          city: city,
        })
        .then((res) => {
          if (res.data.code == 200) {
            var number = res.data.data;
            //     this.projects = number;
            // localStorage.setItem(city,JSON.stringify(number));
            this.hots = res.data.recommands;
            // localStorage.setItem(city,JSON.stringify(res.data.recommands));
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  mounted() {
    this.$store.commit('setCityId', this.current_city.area_id)
    $cookies.set('city_id',this.current_city.area_id)
    sessionStorage.setItem('city_name',this.current_city.short)
    sessionStorage.setItem('city_id',this.current_city.area_id)
    document.addEventListener("click", this.hideSouBox, false);
    this.routerData = this.$route.matched;
    console.log(ip_arr["ip"]);

       let  mine = this.$store.state.style_mine;
       this.mine = mine;
        if(mine==1){ //易得房样式
            this.logo_text = "易得房";
        }else if(mine==2){ //家园样式
           this.logo_text = "家园";
        }
  },
};
</script>

<style lang="less" scoped>
/deep/
.project_list_fan{
    .el-carousel__arrow--right {
      display: none;
  }
  .el-carousel__arrow--left {
     display: none;
  }
}

/deep/
.fanxiang .right_project  .top_title{
    em{
      margin-left:3px ;
      span{
              width: 14px;
              height: 17px;
              background: #FF4B28;
              border-radius: 3px;
              font-size: 14px;
              font-family: "Microsoft YaHei";
              font-weight: bold;
              color: #FFFFFF;
              line-height: 17px;
              text-align: center;
              display: inline-block;
              margin-right: 3px;
         }
    }
}
/deep/
.xiaoxi .el-carousel__indicators {
  display: none;
}
/deep/
.project_list_fan{
      .el-carousel__indicators--horizontal {
        width: 600px;
        text-align: center;
        .el-carousel__button {
          width: 12px;
          height: 6px;
          background: #58585a;
          border-radius: 3px;
        }
     }
     .is-active{
         .el-carousel__button {
          width: 30px;
          height: 6px;
          background: #FF4B28;
          border-radius: 3px;
        }
     }
}

@import "../assets/css/home.less";
</style>
