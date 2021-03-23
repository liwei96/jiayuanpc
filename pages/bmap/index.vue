<template>
  <div class="map">
    <!-- 头部导航 -->
    <nav class="top-nav">
     
        <div class="left">
            <div class="header1">
               <img src="~/assets/logo.png" class="top_logo" v-if="this.$store.state.style_mine==0"/>
               <img src="~/assets/logo_yi.png" class="top_logo" v-if="this.$store.state.style_mine==1"/>
            </div>
            <ul class="nav_li">
                <router-link to="/" target="_blank">首页</router-link>
                <router-link to="/searchpro" target="_blank">新房查询</router-link>
                <nuxt-link to="/tejiafang" target="_blank">特价房源</nuxt-link>
                <router-link to="/baike?type=56&page=1" target="_blank">买房百科</router-link>
                <router-link to="/fangzi/46/1" target="_blank">房产资讯</router-link>
                <router-link to="/join" target="_blank">平台合作</router-link>
              </ul>
        </div>
        
        <div class="login">
            <div class="login_box" @click="showLogin" v-show="login_show">
              <span class="iconfont icondenglu"></span>
              <em>登录</em>
            </div>
            <div class="exit" v-show="exit_show" > 
                <em @click="goShou">{{login_tel}}</em>
                <span @click="exitTip">[退出]</span>
            </div>
            <p>咨询热线:400-718-6686</p>
      </div>
      
      
  
      
    </nav>
    <!-- 百度导航 -->
    <div class="layui-card-body">
      <baidu-map
        class="Bmap"
        :center="center_city"
        :zoom="zoom"
        @ready="handler"
        @zoomend="getzoom"
        @moving="getzoom"
        :scroll-wheel-zoom="true"
        ak="e2Af0KltDfnWPThomK6gzeKzC1ce2fRd"
        :mapClick="false"
        :max-zoom="17"
        :min-zoom="9"
      >
        <!-- 地图;类型 -->
        <bm-map-type
          :map-types="['BMAP_HYBRID_MAP','BMAP_NORMAL_MAP']"
          anchor="BMAP_ANCHOR_TOP_RIGHT"
        ></bm-map-type>
        <!-- 城市 搜索 列表 -->
        <bm-city-list anchor="BMAP_ANCHOR_TOP_RIGHT" :offset="{width:100,height:10}"></bm-city-list>
        <!-- 定位 -->
        <bm-geolocation
          anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
          :showAddressBar="true"
          :autoLocation="true"
        ></bm-geolocation>

        <!-- 标记 点 -->
        <my-overlay
          v-for="(item,index) in point"
          :key="index"
          :data-v="item.id"
          :data-le="item.level"
          :position="item.point"
          :text="`<h4 data-le=${item.level} qu-id=${item.id}>${item.name}</h4>
                  <div class='jia_box' data-le=${item.level} qu-id=${item.id}>
                    <p data-le=${item.level} class='p1' qu-id=${item.id}>${project_text.old}${item.price}${yuan_text.dan}</p>
                    <p data-le=${item.level} class='p2' qu-id=${item.id}>${item.Num}${yuan_text.ge}</p>
                 </div>
                  <p   data-le=${item.level} qu-id=${item.id} class='p3'></p>
                 `"
          :active="active"
          :sample="sample_class"
          :project="project_class"
          @mouseover.native="hoverMarker(item,$event)"
          @click.native="dianMarker(item,$event)"
          @mouseleave.native="leaveMarker(item,$event)"
          ref="overlay"
        ></my-overlay>
      </baidu-map>
    </div>
    <!-- 条件搜索 -->
    <div class="sou_boxx">
      <!-- <h4>
        可视范围内找到
        <span id="ks">{{keshi_num}}</span> 个楼盘, 当前城市共找到
        <span id="city">{{the_city_num}}</span>个
       
      </h4> -->
      <div class="sou_input_box">
        <div class="sou_input">
           <div class="sou_box_left">
               <div class="sel_box">
                  <span>{{cityname}}</span>
                  <i class="iconfont iconxiajiantou" ></i>
                  <div class="city_list" v-show="cityflag">
                      <h3>选择城市</h3>
                      <ul>
                          <li :class="item.area_id==active_num?'active':''" 
                           v-for="item in zhicity" 
                           :key="item.area_id"
                           @click="selCity(item)">{{item.city}}</li>
                      </ul>
                  </div>
               </div>
               <input type="text" placeholder="请输入楼盘名称、地域" autocomplete="off" class="text_input" v-model ="name_value" />
           </div>
          <span class="el-icon-search bg" @click="getPoint" ></span>
        </div>
      </div>

      <ul class="sou_res"></ul>
      <ul class="select">
        <li :class="{click_qu:true,active:tou_qu_active}">
          区域
          <span class="iconfont iconxiajiantou"></span>
        </li>
        <li class="click_price" :class="{active:tou_jia_active}">
          价格
          <span class="iconfont iconxiajiantou"></span>
        </li>
        <li class="click_huxing"  :class="{active:tou_hu_active}">
          户型
          <span class="iconfont iconxiajiantou"></span>
        </li>
        <li class="click_shai"  :class="{active:tou_shai_active}">
          筛选
          <span class="iconfont iconxiajiantou"></span>
        </li>
        <li class="click_pai" :class="{active:tou_pai_active}">
          <i class="iconfont iconpaixu"></i>
        </li>
         <em @click="clear_sel_tiao" class="clear_box">
          <span class="el-icon-delete"></span>
          <i class="m-go">清空条件</i>
        </em>
      </ul>

      <div class="select-list">
        <!-- 区域列表 -->
        <div class="quyu-list">
          <ul class="qu-left">
            <li class="qu_active">区域</li>
            <li>地铁</li>
          </ul>

          <ul class="qu-right qu-quyu">
            <!-- <li class="qu_active buxian" data-v @click="getCities(-2)">不限</li>
            <li
              v-for="item in cities"
              :key="item.id"
              @click="getCities(item.id)"
              :class="(item.id)==num?'qu_active' : '' "
            >{{item.name}}</li> -->
             <el-radio-group v-model="country_model">
                <el-radio :label="item.id"
                 v-for="item in cities"
                 @click.native.prevent="getCities(item.id)"
                  :key="item.id">{{item.name}}</el-radio>
            </el-radio-group>
          </ul>
          <ul class="qu-right qu-ditie">
            <!-- <li class="qu_active buxian1" data-v @click="getRailways(-2)">不限</li>
            <li
              v-for="item in railways"
              :key="item.id"
              @click="getRailways(item.id)"
              :class="(item.id)==num1?'qu_active' : '' "
            >{{item.name}}</li> -->
             <el-radio-group v-model="ditie_model">
                <el-radio :label="item.id"
                 v-for="item in railways"
                 @click.native.prevent="getRailways(item.id)"
                  :key="item.id">{{item.name}}</el-radio>
            </el-radio-group>
          </ul>
        </div>
        <!-- 价格 列表 -->
        <div class="price-list">
          <ul class="price-left">
            <li class="qu_active">总价</li>
            <li>单价</li>
          </ul>

          <ul class="price-right price-zong">
            <!-- <li class="qu_active buxian2" data-v="0" @click="getTotal_prices(-2)">不限</li>
            <li
              v-for="item in total_prices"
              :key="item.id"
              @click="getTotal_prices(item.id)"
              :class="(item.id)==num2?'qu_active' : '' "
            >{{item.name}}</li> -->
             <el-radio-group v-model="zongjia_model">
                <el-radio :label="item.id"
                 v-for="item in total_prices"
                 @click.native.prevent="getTotal_prices(item.id)"
                  :key="item.id">{{item.name}}</el-radio>
            </el-radio-group>
          </ul>
          <ul class="price-right price-dan">
            <!-- <li class="qu_active buxian3" data-v @click="getSingle_prices(-2)">不限</li>
            <li
              v-for="item in single_prices"
              :key="item.id"
              @click="getSingle_prices(item.id)"
              :class="(item.id)==num3?'qu_active' : '' "
            >{{item.name}}</li> -->
             <el-radio-group v-model="danjia_moodel">
                <el-radio :label="item.id"
                 v-for="item in single_prices"
                 @click.native.prevent="getSingle_prices(item.id)"
                  :key="item.id">{{item.name}}</el-radio>
            </el-radio-group>

          </ul>
        </div>
        <!-- 户型列表 -->
        <div class="huxing_list">
          <ul class="huxing_top">
            <!-- <li @click="getApartments(-2)">
              <label class="hu_active hu_bu" for="-2">不限</label>
            </li>
            <li v-for="item in apartments" :key="item.id" @click="getApartments(item.id)">
              <label :for="item.id" :class="item.id==num5?'hu_active':''">{{item.name}}</label>
           </li> -->
            <el-radio-group v-model="huxing_model">
                <el-radio :label="item.id"
                 v-for="item in apartments"
                 @click.native.prevent="getApartments(item.id)"
                  :key="item.id">{{item.name}}</el-radio>
            </el-radio-group>
          </ul>
         
        </div>
        <!-- 筛选列表 -->
        <div class="shaixuan_list">
          <div class="hua">
             <h2>面积</h2>
                <ul class="kaifa bgg">
                  <!-- <li class="active buxian6" @click="getArea(-2)">不限</li>
                  <li
                    v-for="item in areas"
                    :key="item.id"
                    @click="getArea(item.id)"
                    :class="item.id==num6?'active' : '' "
                  >{{item.name}}</li> -->
                  <el-radio-group v-model="mianji_model">
                    <el-radio :label="item.id"
                    v-for="item in areas"
                    @click.native.prevent="getArea(item.id)"
                      :key="item.id">{{item.name}}</el-radio>
                </el-radio-group>
                </ul>
            <h2>类型</h2>
              <ul class="type bgg">
                <!-- <li data-v class="active buxian4" @click="getFangType(-2)">不限</li>
                <li
                  v-for="item in build_types"
                  :key="item.type"
                  @click="getFangType(item.type)"
                  :class="item.type==num4?'active' : '' "
                >{{item.type}}</li> -->
                 <el-radio-group v-model="type_model">
                    <el-radio :label="item.type"
                    v-for="item in build_types"
                    @click.native.prevent="getFangType(item.type)"
                      :key="item.type">{{item.type}}</el-radio>
                </el-radio-group>
              </ul>
            <h2>特色</h2>
              <ul class="tese bgg">
                <!-- <li @click="getTese(-2)" class="active buxian5">不限</li>
                <li
                  v-for="item in features"
                  :key="item.id"
                  @click="getTese(item.id)"
                  :class="item.id==num7?'active' : '' "
                >{{item.name}}</li> -->
                <el-radio-group v-model="tese_model">
                    <el-radio :label="item.id"
                    v-for="item in features"
                    @click.native.prevent="getTese(item.id)"
                      :key="item.id">{{item.name}}</el-radio>
                </el-radio-group>
              </ul>
          </div>
        </div>
        <!-- 排序列表 -->
        <ul class="paixu_list">
          <li class="pai_active buxian7" data-v @click="getOrder(-2)">默认排序</li>
          <li
            v-for="item in orders"
            :key="item.id"
            @click="getOrder(item.id)"
            :class="item.id==num8?'pai_active' : '' "
          >{{item.name}}</li>
        </ul>
        <!-- <div class="zhao"></div> -->
      </div>

      <div class="project_list" v-show="map_show">
         <div class="num_box">可视范围内 <em>{{keshi_num}}</em> 个楼盘</div>
        <ul class="pro_list">
          <template v-if="left_project.length>0">
            <li class="pro_detail" v-for="item in left_project" :key="item.id">
              <nuxt-link :to="`/content/${item.id}`">
                  <img :src="item.img" alt />
                  <div class="pro_right">
                    <h5>
                      <span>{{item.name}}</span>
                      <i>{{item.status}}</i>
                    </h5>
                    <p class="price">
                      <span>{{item.single_price}}</span>元/m²
                    </p>
                    <p class="address">
                      <span>{{cityname}}-{{item.country}}</span>
                      <i>
                        建面
                        <em>{{item.area}}m²</em>
                      </i>
                    </p>
                    <ul>
                      <li>{{item.decorate}}</li>
                      <li>{{item.tag[0]}}</li>
                      <li>{{item.tag[1]}}</li>
                    </ul>
                  </div>
              </nuxt-link>
            </li>
            <li v-show="di_show" class="dibu">已经到底了</li>
            <div class="yema">
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :total="the_city_num"
                  :page-size="20"
                  @current-change="pageChange"
                  :current-page.sync="currentPage1">
                </el-pagination>
            </div>

          </template>
          <template v-else>
            <li class="wu">暂无数据</li>
          </template>
        </ul>
      </div>
      <div class="shou" @click="shouMapLeft">
          <span>{{shou_text}}</span>
          <i class="iconfont iconshangjiantou2"></i>
      </div>

      <div class="jiage"></div>
      <div class="huxing"></div>
      <div class="shaixuan_box"></div>
      <div class="paixu"></div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import axios from "axios";
import MyOverlay from "~/components/MyOverlaytest.vue";
export default {
  name: "",
  components: {
    "my-overlay": MyOverlay
  },
  head() {
    return {
      title: "地图找房"
    };
  },
  //layout:'defaultMap',
  data() {
    return {
      zoom: 11,
      postionMap: { lng: 0, lat: 0 },
      active: false,
      point: [],
      cities: [],
      build_types: [],
      apartments: [],
      features: [],
      total_prices: [],
      single_prices: [],
      areas: [],
      railways: [],
      orders: [],
      num: -1,
      num1: -1,
      num2: -1,
      num3: -1,
      num4: -1,
      num5: -1,
      num6: -1,
      num7: -1,
      num8: -1,
      left_project: [],
      _map: "",
      text_dom: "",
      yuan_text: {
        dan: "万元/m²",
        ge: "个楼盘"
      },
      project_text: {
        old: "",
        dan: "",
        ge: "元/m²"
      },
      com_tel: "",
      _bssw: "",
      _bsne: "",
      keshi_num: "0",
      the_city_num:'0',
      city_num: "",
      detail_: "",
      name_value:'',
      exitFlag:false,
      tou_qu_active:false,
      tou_jia_active:false,
      tou_hu_active:false,
      tou_shai_active:false,
      tou_pai_active:false,
      inum:1,

     nScrollTop:0,
     center_city:'杭州市',
     zhicity:[],
     cityflag: false,
     active_num:1,
     cityname:'',
     _left:'',
     _top:'',
     data_zong:[],
     di_show:false,
     currentPage1:1,
     is_handler:true,

      login_show:true,
      exit_show:false,
      login_tel:'154***689',
      map_show:true,
      shou_text:'收起列表',

      country_model:[],
      ditie_model:[],
      zongjia_model:[],
      danjia_moodel:[],
      huxing_model:[],
      mianji_model:[],
      type_model:[],
      tese_model:[],

      mine:0,
    };
  },
  watch:{
      
  },
  methods: {
    shouMapLeft(){
        if(this.shou_text=="收起列表"){
              this.map_show =false;
              this.shou_text =`可视范围内 ${this.keshi_num} 个楼盘`;
        }else{
             this.map_show =true;
             this.shou_text = "收起列表";
        }
    },
    clearOthers(){
         this.$cookies.remove("fangtype_id");
         $(".buxian4").addClass("active");
         this.num4 = -1;

         this.$cookies.remove("tese_id");
         $(".buxian5").addClass("active");
         this.num7 = -1;


         this.$cookies.remove("area_id");
         $(".buxian6").addClass("active");
         this.num6 = -1;
         this.$router.go(0);
    },
    clearHuXing(){
         this.$cookies.remove("huxing_id");
         $(".hu_bu").addClass("hu_active");
         this.num5 = -1;
          this.$router.go(0);
    },
     showLogin(){
      this.$parent.$parent.loginTan =true;
    },
    goShou(){
        this.$router.push("/shou/shouc?page=1");
    },
     exitTip(){
         let path_name = this.$route.name;
        if (path_name == "shou-shouc" || path_name == "shou-zu") {
          localStorage.removeItem("token");
          localStorage.removeItem("tel");
          this.$cookies.remove("token");
          this.login_show = true;
          this.exit_show =false;
          this.$router.push("/");
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("tel");
          this.$cookies.remove("token");
          this.login_show = true;
          this.exit_show =false;
          this.$router.go(0);
        }
    },
      //点击进入下一级函数
      getNextLevel(level,id){
            console.log(level, "点击进入下一级函数");
            this.is_handler =false;
            let deep = this._map.getZoom();
            let bssw = this._bssw;
            let bsne = this._bsne; 
            let ip = ip_arr["ip"];
            let city = sessionStorage.getItem("city_id");
            let token = sessionStorage.getItem("token");
            let country_id = this.$cookies.get("country_id");
            let railway_id = this.$cookies.get("railway_id");
            let zongPrice_id = this.$cookies.get("zongPrice_id");
            let danPrice_id = this.$cookies.get("danPrice_id");
            let huxing_id = this.$cookies.get("huxing_id");
            let fangtype_id = this.$cookies.get("fangtype_id");
            let tese_id = this.$cookies.get("tese_id");
            let area_id = this.$cookies.get("area_id");
            let order_id = this.$cookies.get("order_id");
            let street ='';
            let _this = this;
              if(level=="1"){
                //进入二级
                    _this.project_class = false;
                    _this.sample_class = true;
                    _this.project_text.old = "";
                    _this.yuan_text.dan = "万元/m²";
                    _this.yuan_text.ge = "个楼盘";
                    _this.zoom =13;
                    level =2;
                    country_id = id;
              }else if(level=="2"){
                   //进入三级
                    _this.sample_class = false;
                    _this.yuan_text.ge = "";
                    _this.project_class = true;
                    _this.project_text.old = _this.project_text.dan;
                    _this.yuan_text.dan = "元/m²";
                    _this.zoom =17;
                    // _this.zoom =_this._map.getZoom()+2;
                     level =3;
                     street=id;
              }
              axios
              .post("/api/map/map_info", {
                // 参数	示例	必填	注释
                page: 1, //	是	页码
                limit: 10, //	是	每页几条
                city: city, //是	城市编码
                country: country_id, //	 	否	区域
                railway: railway_id, //	否	地铁
                totalprice: zongPrice_id, //	否	总价范围
                apartment: huxing_id, //	 	否	户型
                build_type: fangtype_id, //	否	建筑类型
                single_price: danPrice_id, //	否	单价
                area: area_id, //否	面积
                feature: tese_id, // 	否	特色
                name:this.name_value, //	否	项目名
                order_type: order_id, // 	否	排序类型
                left_bottom_lng: bssw.lng, //	119.255401	是	左下边界经度
                left_bottom_lat: bssw.lat, //29.39381	是	左下边界纬度
                right_top_lng: bsne.lng, //121.014643	是	右上边界经度
                right_top_lat: bsne.lat, //	30.954314	是	右下边界纬度
                level: level, //是	1区县 2 街道 3 项目
                street:street, //	否	街道id
              })
              .then(res => {
                if (res.data.code == 200) {
                  console.log("=====getNextLevel=====");
                  let numdata = res.data.data.datas;
                  let center =res.data.center;
                  if(center){
                     if(center.longitude!=="" && center.latitude!=="" ){
                      let  num ={lng:center.longitude, lat:center.latitude};
                      this.center_city =num;
                     }
                  }
                 
                  let point = [];

                  if (level == 3) {
                    numdata.map((m, n) => {
                      point.push({
                        id: m.id,
                        name: m.name,
                        point: { lng: m.longitude, lat: m.latitude },
                        price: m.price,
                        Num: "",
                        level:level,
                      });
                    });
                  } else {
                    numdata.map((m, n) => {
                      point.push({
                        id: m.id,
                        name: m.name,
                        point: { lng: m.longitude, lat: m.latitude },
                        price: (m.price / 10000).toFixed(1),
                        Num: m.Num,
                        level:level,
                      });
                    });
                  }
                  if (point.length > 0) {
                    this.point = point;
                    this.keshi_num = res.data.num;
                  } else {
                    this.point = [];
                    this.keshi_num = res.data.num;
                  }
               this.is_handler = true;
                } else {
                  this.$message.error(res.data.message);
                }
              })
              .catch(error => {
                console.log(error);
              });
      },
      scrollToBottom(){
          this.$nextTick(() => {
              $('.project_list').animate({scrollTop:0},{seep:500,easing:'swing'})
          });
      },
       pageChange(num){
          this.getSouResult(num);
       },
      // 对比两个对象的值是否完全相等 返回值 true/false
      isObjectValueEqual (a, b) {   
        //取对象a和b的属性名
        var aProps = Object.getOwnPropertyNames(a);
        var bProps = Object.getOwnPropertyNames(b);
        //判断属性名的length是否一致
        if (aProps.length != bProps.length) {
            return false;
        }
        //循环取出属性名，再判断属性值是否一致
        for (var i = 0; i < aProps.length; i++) {
          var propName = aProps[i];
          if (a[propName] !== b[propName]) {
              return false;
          }
        }
        return true;
      },
      showCity(){
        console.log('111',this);
        this.cityflag = true;
      },
      cityHide() {
        this.cityflag = false;
      },
      selCity(item) {
          sessionStorage.setItem("city_name", item.city);
          this.$cookies.set("city_id", item.area_id);
          sessionStorage.setItem("city_id", item.area_id);
          this.cityname = item.city;
          if (!item.area_id) {
            item.area_id = 1;
          }
          let pinyin = item.pinyin;
          let uuid = this.$route.query.uuid;
          let mine = this.$store.state.style_mine;
          if(mine==0){
               if(uuid && uuid!=="undefined" && uuid!=="null"){
                  if (pinyin !== "") {
                    window.location.href = "http://" + pinyin + ".jy1980.com/bmap?uuid="+uuid;
                  }
                }else{
                      if (pinyin !== "") {
                        window.location.href = "http://" + pinyin + ".jy1980.com/bmap";
                      }
                }
          }else if(mine==1){
               if(uuid && uuid!=="undefined" && uuid!=="null"){
                  if (pinyin !== "") {
                    window.location.href = "http://" + pinyin + ".edefang.net/bmap?uuid="+uuid;
                  }
                }else{
                      if (pinyin !== "") {
                        window.location.href = "http://" + pinyin + ".edefang.net/bmap";
                      }
                }
          }
          //let uuid = localStorage.getItem('uuid');
         
     },
     //无限滚动代码
      projectScroll(){
            var nScrollHight = 0; //滚动距离总长(注意不是滚动条的长度bai)
            var nScrollTop = 0; //滚动到的当du前位置
            var nDivHight = $(".project_list").height();
            let num =1;
            var _this =this;
            $(".project_list").scroll(function(){
             nScrollHight = $(this)[0].scrollHeight;
             nScrollTop = $(this)[0].scrollTop;
              if(nScrollTop + nDivHight >= nScrollHight){
                  console.log("滚动条到底部了");
                  localStorage.setItem('hua',1);
                  let  sou_data = sessionStorage.getItem('sou_data');
                  let limit =parseInt(sou_data / 20);
                     if (_this.inum < limit) {
                          _this.inum++;
                          _this.getSouResult(_this.inum);
                    } else if (_this.inum == limit) {
                          _this.di_show = true;
                    }

              }
          });
      },
    //清除所有的搜索条件
     loginTanShow(){
        var tel=localStorage.getItem("tel");
        var token=localStorage.getItem("token");
        if(tel!==null && token!==null){
              this.$router.push('/shou/shouc?page=1')
        }else{
            this.$parent.$parent.loginTan=!this.$parent.$parent.loginTan;
        }
    },
    showExit(){
        var token=  localStorage.getItem("token");
        var tel= localStorage.getItem("tel");
        if(token && tel){
             this.exitFlag=true;
        }
      },
     exitTip(){
      let path_name=  this.$route.name;
        if(path_name =='shou-shouc' || path_name =='shou-zu'){
              localStorage.removeItem('token');
              localStorage.removeItem('tel');
              this.$cookies.remove('token');
              this.$parent.loginTan=false;
              this.$router.push('/');
        }else{
              localStorage.removeItem('token');
              localStorage.removeItem('tel');
              this.$cookies.remove('token');
              this.$parent.loginTan=false;
              this.$router.go(0);
        }
     },
    clear_sel_tiao() {
      this.$cookies.remove("country_id");
      this.$cookies.remove("railway_id");
      this.$cookies.remove("zongPrice_id");
      this.$cookies.remove("danPrice_id");
      this.$cookies.remove("huxing_id");
      this.$cookies.remove("fangtype_id");
      this.$cookies.remove("tese_id");
      this.$cookies.remove("order_id");
      this.$cookies.remove("area_id");
      this.$router.go(0);
    },
    hoverMarker(num,e) {
      if (this.project_class == false && this.sample_class == true) {
        e.target.className = "active";
      }
      
      let data_d =e.target.getAttribute('data-d');
      let data_t =e.target.getAttribute('data-t');
      if(data_d==1){
           if(data_t==2){
               if(e.target.tagName=='EM'){
                 let dom= e.target.parentNode.nextSibling.nextSibling;
                  dom.style.display='block';
                  dom.onmouseout = function(){
                      dom.style.display='none';
                  }
               }else{
                 let dom =e.target.nextSibling.nextSibling;
                   dom.style.display='block';
                  dom.onmouseout = function(){
                      dom.style.display='none';
                  }
               }
           }else{
           }
     
      }

    },
    dianMarker(num, e) {
      let  deep = this._map.getZoom();
      localStorage.setItem('dian_zoom',deep);
      if (this.project_class == false && this.sample_class == true) {
        e.target.className = "active";
        let  target = e.target;
        let level = target.getAttribute('data-le');
        let id =  target.getAttribute('qu-id');
        this.getNextLevel(level,id);
      }else{
            let data_d =e.target.getAttribute('data-d');
            let data_t =e.target.getAttribute('data-t');
            if(data_d==1){
                if(data_t==2){
                    if(e.target.tagName=='EM'){
                      let dom= e.target.parentNode.nextSibling.nextSibling;
                        dom.style.display='block';
                        dom.onmouseout = function(){
                            dom.style.display='none';
                        }
                    }else{
                      let dom =e.target.nextSibling.nextSibling;
                        dom.style.display='block';
                        dom.onmouseout = function(){
                            dom.style.display='none';
                        }
                    }
                }
                    
                
            }else{
                  let shang = sessionStorage.getItem("yuan_dian");
                  if (this.project_class == true && this.sample_class == false) {
                    sessionStorage.setItem("yuan_dian", num.id);
                    let kidd='';
                    let otherr ='';
                    let kid = sessionStorage.getItem('kid');
                    let other = sessionStorage.getItem('other');
                    if(kid){
                        kidd  = kid;
                    }
                     if(other){
                        otherr  = other;
                    }
                    if (shang !== num.id) {
                      let target = e.target;
                      while (target.parentNode.className != "project") {
                        target = target.parentNode ? target.parentNode : ""; //不断取父节点来替换target
                      }
                      axios.post("/api/map/single",{
                          id:num.id
                      }).then(res => {
                        if (res.data.code == 200) {
                          let item = res.data.data;
                          this.detail_ = item;
                          if(target.parentNode!==null){
                            //left 746px top 302px;
                          // console.log(target.parentNode,target.parentNode.style.left,'style',target.parentNode.style.top);
                          let left = target.parentNode.style.left;
                          let top = target.parentNode.style.top;
                          var num_left = left.replace(/\s+|px/gi,"");
                          var num_top = top.replace(/\s+|px/gi,"");
                          this._left =num_left;
                          this._top =num_top;
                      //   console.log(num);
                          target.parentNode.className = "project_hover";
                          target.parentNode.style.left =(num_left-72)+'px';
                          target.parentNode.style.top =(num_top-195)+'px';
                          target.parentNode.innerHTML = `<div class="pro_detail_dan" data-d="1">
                                <div class="pro_box" data-d="1">
                                    <div class="pro_img" data-d="1">
                                      <a href="/content/${item.id}" data-d="1">
                                        <img src="${item.img}" alt="" data-d="1">
                                      </a>
                                    </div>
                                    <div class="pro_right" data-d="1">
                                        <div class="pro_name" data-d="1"><em data-d="1">${item.name}</em> <span data-d="1">约<i data-d="1">${item.price}</i>元/m²</span></div>
                                        <div class="pro_jian" data-d="1">面积：<em data-d="1">${item.area}m²</em></div>
                                        <div class="pro_di"  data-d="1"><span data-d="1">地址：</span><em data-d="1">${item.address}</em></div>
                                    </div>
                                </div>
                                <div class="jiao" data-d="1"></div>
                            </div>`;
                          }
                        }
                      }).catch(error=>{
                         console.log(error)
                      });

                      // let allNodes = target.parentNode.parentNode.childNodes;
                      // for (let i = 0; i < allNodes.length; i++) {
                      //   let dom_data_v = allNodes[i].getAttribute("data-v");
                      //   if (dom_data_v == shang) {
                      //     if (allNodes[i]) {
                      //       axios.post(`/api/map/single?id=${shang}`).then(res => {
                      //         if (res.data.code == 200) {
                      //           let old = res.data.data;
                      //           let old_dom = `<div class="dian">
                      //                           <h4>${old.name}</h4>
                      //                           <div class='jia_box'>
                      //                             <p class='p1'>价格:&nbsp;约${old.price}元/m²</p>
                      //                           </div>
                      //                           <p  class='p3'></p>
                      //                           </div>`;
                      //           allNodes[i].className = "project";
                      //           allNodes[i].innerHTML = old_dom;
                      //         }
                      //       });
                      //     }
                      //   }
                      // }

                    } else {
                      
                    }
                  }
                
          }
      }
    },
    leaveMarker(num,e) {
      if (this.project_class == false && this.sample_class == true) {
        e.target.className = "sample";
      }
      let  deep = this._map.getZoom();
      let dian_zoom = localStorage.getItem('dian_zoom');
      if(e.target.className=="project_hover"){
       
              axios.post("/api/map/single",{
                  id:num.id
              }).then(res => {
                  if (res.data.code == 200) {
                    let old = res.data.data;
                    let old_dom = `<div class="dian">
                                      <h4>${old.name}</h4>
                                      <div class='jia_box'>
                                        <p class='p1'>${old.price}元/m²</p>
                                      </div>
                                      <p  class='p3'></p>
                                      </div>`;
                    var num_left = this._left;
                    var num_top = this._top;  
                    e.target.style.left =num_left+'px';
                    e.target.style.top =num_top+'px';               
                    e.target.className = "project";
                    e.target.innerHTML = old_dom;
                  }
                }).catch(error=>{
                   console.log(error);
                });
         
      }

    },
    initialize({ el, BMap, map }) {
      const pixel = map.pointToOverlayPixel(new BMap.Point(116.404, 39.915)); //pointToOverlayPixel可以将地理坐标转换到覆盖物的所需要的像素坐标
      //  console.log(pixel);
      el.style.left = pixel.x - 60 + "px";
      el.style.top = pixel.y - 20 + "px";
    },
    draw() {},
    //获取搜素条件
    //搜索条件--城市
    getCities(num) {
        if(num === this.country_model){
           this.country_model =[];

            this.$cookies.remove("country_id");
            this.tou_qu_active =false;
            this.getSouResult(1);
            this.getPoint();
           console.log('不中')
        }else{
            this.country_model = num;

            this.$cookies.set("country_id", num);
            this.num = num;
            this.tou_qu_active =true;
            $(".buxian").removeClass("qu_active");
            this.getSouResult(1);
            this.getPoint();
        }

      let   railway_id = this.$cookies.get("railway_id");
      // if (num == -2) {
      //   //不限
      //   $(".buxian").addClass("qu_active");
      //   this.$cookies.remove("country_id");
      //   if(railway_id){
      //   }else{
      //       this.tou_qu_active = false;
      //   }
       
      //   this.getSouResult(1);
      //   this.getPoint();
      // } else {
      //   this.$cookies.set("country_id", num);
      //   this.num = num;
      //   this.tou_qu_active =true;
      //   $(".buxian").removeClass("qu_active");
      //   this.getSouResult(1);
      //   this.getPoint();
      // }
      $(".zhao").hide();
      $(".quyu-list").hide();
    },
    //搜索条件--地铁
    getRailways(num) {
        if(num===this.ditie_model){
           this.ditie_model =[];
            this.$cookies.remove('railway_id');
             this.tou_qu_active =false;
            this.getSouResult(1);
            this.getPoint();
        }else{
              this.ditie_model = num;

              this.$cookies.set("railway_id", num);
              this.num1 = num;
              this.tou_qu_active =true;
              $(".buxian1").removeClass("qu_active");
              this.getSouResult(1);
              this.getPoint();
        }


      // let  country_id = this.$cookies.get("country_id");
      // if (num == -2) {
      //   $(".buxian1").addClass("qu_active");
      //   this.$cookies.remove("railway_id");
      //   if(country_id){
      //   }else{
      //        this.tou_qu_active = false;
      //   }
      //   this.getSouResult(1);
      //   this.getPoint();
      // } else {
      //   this.$cookies.set("railway_id", num);
      //   this.num1 = num;
      //   this.tou_qu_active =true;
      //   $(".buxian1").removeClass("qu_active");
      //   this.getSouResult(1);
      //   this.getPoint();
      // }
      $(".zhao").hide();
      $(".quyu-list").hide();
    },
    //搜索条件--总价
    getTotal_prices(num) {
        if(num===this.zongjia_model){
           this.zongjia_model =[];
           this.$cookies.remove("zongPrice_id");
           this.tou_jia_active =false;
           this.getSouResult(1);
           this.getPoint();
        }else{
            this.zongjia_model = num;
            this.$cookies.set("zongPrice_id", num);
            this.num2 = num;
            this.tou_jia_active =true;
            $(".buxian2").removeClass("qu_active");
            this.getSouResult(1);
            this.getPoint();
        }


      // let danPrice_id =  this.$cookies.get("danPrice_id"); 
      // if (num == -2) {
      //   $(".buxian2").addClass("qu_active");
      //   this.$cookies.remove("zongPrice_id");
      //   if(danPrice_id){
      //   }else{
      //       this.tou_jia_active = false;
      //   }
      //   this.getSouResult(1);
      //   this.getPoint();
      // } else {
      //   this.$cookies.set("zongPrice_id", num);
      //   this.num2 = num;
      //   this.tou_jia_active =true;
      //   $(".buxian2").removeClass("qu_active");
      //   this.getSouResult(1);
      //   this.getPoint();
      // }
      $(".zhao").hide();
      $(".price-list").hide();
    },
    //搜索条件--单价
    getSingle_prices(num) {
       if(num===this.danjia_moodel){
           this.danjia_moodel =[];
           this.$cookies.remove("danPrice_id");
           this.tou_jia_active =false;
           this.getSouResult(1);
           this.getPoint();
        }else{
            this.danjia_moodel = num;
            this.$cookies.set("danPrice_id", num);
            this.num3 = num;
            this.tou_jia_active =true;
            this.getSouResult(1);
            this.getPoint();
            $(".buxian3").removeClass("qu_active");
        }


      // let  zongPrice_id = this.$cookies.get("zongPrice_id");
      // if (num == -2) {
      //   $(".buxian3").addClass("qu_active");
      //   this.getSouResult(1);
      //   this.$cookies.remove("danPrice_id");
      //   if(zongPrice_id){
      //   }else{
      //      this.tou_jia_active =false;
      //   }
      //   this.getPoint();
      // } else {
      //   this.$cookies.set("danPrice_id", num);
      //   this.num3 = num;
      //   this.tou_jia_active =true;
      //   this.getSouResult(1);
      //   this.getPoint();
      //   $(".buxian3").removeClass("qu_active");
      // }
      $(".zhao").hide();
      $(".price-list").hide();
    },
    //搜索条件--户型
    getApartments(num) {
        if(num===this.huxing_model){
           this.huxing_model =[];
           this.$cookies.remove("huxing_id");
           this.getSouResult(1);
           this.getPoint();
        }else{
              this.huxing_model = num;
              this.num5 = num;
              this.tou_hu_active =true;
              $(".hu_bu").removeClass("hu_active");
              this.$cookies.set("huxing_id", num);
              this.getSouResult(1);
              this.getPoint();
        }
      $('.huxing_list').hide();
      $('.zhao').hide();
      // if (num == -2) {
      //   this.num5 = -1;
      //   this.$cookies.remove("huxing_id");
      //   $(".hu_bu").addClass("hu_active");
      //   this.tou_hu_active =false;
      //   this.getSouResult(1);
      //   this.getPoint();
      // } else {
      //   this.num5 = num;
      //   this.tou_hu_active =true;
      //   $(".hu_bu").removeClass("hu_active");
      //   this.$cookies.set("huxing_id", num);
      //   this.getSouResult(1);
      //   this.getPoint();
      // }
    },
    //搜索条件- 筛选-房子类型
    getFangType(num) {
      let tese_id =    this.$cookies.get("tese_id");
      let  area_id =  this.$cookies.get("area_id")
        if(num===this.type_model){
            this.type_model =[];
            this.$cookies.remove("fangtype_id");
            this.getSouResult(1);
            this.getPoint();
               if(tese_id||area_id){
                }else{
                    this.tou_shai_active = false;
                }
        }else{
            this.type_model = num;
            $(".buxian4").removeClass("active");
            this.num4 = num;
            this.tou_shai_active =true;
            this.$cookies.set("fangtype_id", num);
            this.getSouResult(1);
            this.getPoint();
        }
      $('.shaixuan_list').hide();
      $('.zhao').hide();
      
      // if (num == -2) {
      //   this.num4 = -1;
      //   $(".buxian4").addClass("active");
      //   this.$cookies.remove("fangtype_id");
      //   if(tese_id||area_id){
      //   }else{
      //       this.tou_shai_active = false;
      //   }
      //   this.getSouResult(1);
      //   this.getPoint();
      // } else {
      //   $(".buxian4").removeClass("active");
      //   this.num4 = num;
      //   this.tou_shai_active =true;
      //   this.$cookies.set("fangtype_id", num);
      //   this.getSouResult(1);
      //   this.getPoint();
      // }
    },
    //搜索条件-筛选-特色
    getTese(num) {
       let  area_id =  this.$cookies.get("area_id");
      let  fangtype_id = this.$cookies.get("fangtype_id");
         if(num===this.tese_model){
           this.tese_model =[];
           this.$cookies.remove("tese_id");
            if(area_id||fangtype_id){
            }else{
                  this.tou_shai_active =false;
            }
            this.getSouResult(1);
            this.getPoint();
        }else{
            this.tese_model = num;
            $(".buxian5").removeClass("active");
            this.num7 = num;
            this.tou_shai_active =true;
            this.$cookies.set("tese_id", num);
            this.getSouResult(1);
            this.getPoint();
        }
      $('.shaixuan_list').hide();
      $('.zhao').hide();
      // let  area_id =  this.$cookies.get("area_id");
      // let  fangtype_id = this.$cookies.get("fangtype_id");
      // if (num == -2) {
      //   //代表不限
      //   this.num7 = -1;
      //   $(".buxian5").addClass("active");
      //   this.$cookies.remove("tese_id");
      //   if(area_id||fangtype_id){
      //   }else{
      //         this.tou_shai_active =false;
      //   }
      //   this.getSouResult(1);
      //   this.getPoint();
      // } else {
      //   $(".buxian5").removeClass("active");
      //   this.num7 = num;
      //   this.tou_shai_active =true;
      //   this.$cookies.set("tese_id", num);
      //   this.getSouResult(1);
      //   this.getPoint();
      // }
    },
    //搜索条件-筛选-面积
    getArea(num) {
        let  tese_id =  this.$cookies.get("tese_id");
        let  fangtype_id = this.$cookies.get("fangtype_id");
        if(num===this.mianji_model){
           this.mianji_model =[];
           this.$cookies.remove("area_id");
            if(tese_id||fangtype_id){
            }else{
                this.tou_shai_active =false;
            }
           this.getSouResult(1);
           this.getPoint();
        }else{
            this.mianji_model = num;
              this.$cookies.set("area_id", num);
              $(".buxian6").removeClass("active");
              this.num6 = parseInt(num);
              this.tou_shai_active =true;
              this.getSouResult(1);
              this.getPoint();
        }
       $('.shaixuan_list').hide();
       $('.zhao').hide();
    
      // if (num == -2) {
      //    this.num6 = -1;
      //   this.$cookies.remove("area_id");
      //   $(".buxian6").addClass("active");
      //   if(tese_id||fangtype_id){
      //   }else{
      //       this.tou_shai_active =false;
      //   }
      //   this.getSouResult(1);
      //   this.getPoint();
      // } else {
      //   this.$cookies.set("area_id", num);
      //   $(".buxian6").removeClass("active");
      //   this.num6 = parseInt(num);
      //   console.log(this.num6);

      //   this.tou_shai_active =true;
      //   this.getSouResult(1);
      //   this.getPoint();
      // }
    },
    //搜索条件--排序方式
    getOrder(num) {
      if (num == -2) {
        this.$cookies.remove("order_id");
        this.tou_pai_active =false;
        this.getSouResult(1);
        this.getPoint();
        $(".buxian7").addClass("pai_active");
      } else {
        this.$cookies.set("order_id", num);
        this.getSouResult(1);
        this.getPoint();
        this.num8 = num;
        this.tou_pai_active =true;
        $(".buxian7").removeClass("pai_active");
      }
      $(".zhao").hide();
      $(".paixu_list").hide();
    },
    handler({ BMap, map }) {
           let city_id = sessionStorage.getItem('city_id');
          let city_name_arr = {
              112: "徐州市",
              1: "杭州市",
              36: "宁波市",
              38: "嘉兴市",
              104: "湖州市",
              73: "绍兴市",
              93: "湛江市",
              41: "重庆市",
              47: "成都市",
              3: "贵阳市",
              149: "无锡市",
              181: "肇庆市",
            };
            if(city_id){
                if(city_name_arr[city_id]) {
                    this.center_city =city_name_arr[city_id];
                    console.log( this.center_city,'this.center_city');
                }else{
                    this.center_city = sessionStorage.getItem("city_name");
                }
            }
          map.clearOverlays();
        // this.center.lng = 116.404;
        // this.center.lat = 39.915;
        // this.zoom = 15;
        // this.center.lng = 106.636577;
        // this.center.lat = 26.653325;
       var _this = this;
       var bs = map.getBounds(); //获取可视区域
       var bssw = bs.getSouthWest(); //可视区域左下角
       var bsne = bs.getNorthEast(); //可视区域右上角
        _this._bssw = bssw;
        _this._bsne = bsne;
       this._map = map;
      
      //搜索条件
      let ip = ip_arr["ip"];
       //   let city_id = sessionStorage.getItem("city_id");
      let token = sessionStorage.getItem("token");
      let country_id = this.$cookies.get("country_id");
      let railway_id = this.$cookies.get("railway_id");
      let zongPrice_id = this.$cookies.get("zongPrice_id");
      let danPrice_id = this.$cookies.get("danPrice_id");
      let huxing_id = this.$cookies.get("huxing_id");
      let fangtype_id = this.$cookies.get("fangtype_id");
      let tese_id = this.$cookies.get("tese_id");
      let order_id = this.$cookies.get("order_id");
      let area_id = this.$cookies.get("area_id");
      map.addEventListener("tilesloaded", function() {
        //   function remove_overlay(){
        //     map.clearOverlays();
        //  }
       var bs = map.getBounds(); //获取可视区域
       var bssw = bs.getSouthWest(); //可视区域左下角
       var bsne = bs.getNorthEast(); //可视区域右上角
        _this._bssw = bssw;
        _this._bsne = bsne;
      });
     
    },
    // map_tilesloaded(){
    //     var  map =this._map;
    // },
    getzoom(e) {
      if(this.is_handler==true){
        let  pro_dom= document.querySelectorAll('.project_hover');
        if(pro_dom){
             for(let i= 0;i<pro_dom.length;i++){
                 let   name =pro_dom[i].childNodes[0].childNodes[1].childNodes[3].childNodes[1].childNodes[0].innerHTML;
                 let   price =pro_dom[i].childNodes[0].childNodes[1].childNodes[3].childNodes[3].childNodes[1].innerHTML;
                    let old_dom = `<div class="dian">
                                      <h4>${name}</h4>
                                      <div class='jia_box'>
                                        <p class='p1'>${price}元/m²</p>
                                      </div>
                                      <p  class='p3'></p>
                                      </div>`;
                   pro_dom[i].className = "project";
                   pro_dom[i].innerHTML = old_dom;
                 
             }
        }
       

        
      let all = e.target.getZoom();
            
      let con = e.target.getBounds();
      var bssw = con.getSouthWest(); //可视区域左下角
      var bsne = con.getNorthEast(); //可视区域右上角
      var _this = this;
      //搜索条件
      let ip = ip_arr["ip"];
      let city_id = sessionStorage.getItem("city_id");
      let token = sessionStorage.getItem("token");
      let country_id = this.$cookies.get("country_id");
      let railway_id = this.$cookies.get("railway_id");
      let zongPrice_id = this.$cookies.get("zongPrice_id");
      let danPrice_id = this.$cookies.get("danPrice_id");
      let huxing_id = this.$cookies.get("huxing_id");
      let fangtype_id = this.$cookies.get("fangtype_id");
      let tese_id = this.$cookies.get("tese_id");
      let order_id = this.$cookies.get("order_id");

      let area_id = this.$cookies.get("area_id");
      //     var bs = map.getBounds(); //获取可视区域
      //  var bssw = bs.getSouthWest(); //可视区域左下角
      //  var bsne = bs.getNorthEast(); //可视区域右上角
        _this._bssw = bssw;
        _this._bsne = bsne;
      //   console.log(map.getZoom());
        var deep = this._map.getZoom();
        let level = "";

        if (deep > 15) {
          level = 3;
          axios
            .post("/api/map/map_info", {
              // 参数	示例	必填	注释
              page: 1, //	是	页码
              limit: 10, //	是	每页几条
              city: city_id, //是	城市编码
              country: country_id, //	 	否	区域
              railway: railway_id, //	否	地铁
              totalprice: zongPrice_id, //	否	总价范围
              apartment: huxing_id, //	 	否	户型
              build_type: fangtype_id, //	否	建筑类型
              single_price: danPrice_id, //	否	单价
              area: area_id, //否	面积
              feature: tese_id, // 	否	特色
              name:this.name_value, //	否	项目名
              order_type: order_id, // 	否	排序类型
              left_bottom_lng: bssw.lng, //	119.255401	是	左下边界经度
              left_bottom_lat: bssw.lat, //29.39381	是	左下边界纬度
              right_top_lng: bsne.lng, //121.014643	是	右上边界经度
              right_top_lat: bsne.lat, //	30.954314	是	右下边界纬度
              level: level //是	1区县 2 街道 3 项目
              //   street	:, //	否	街道id
            })
            .then(res => {
              if (res.data.code == 200) {
                console.log("=====handler=====", level);
                // this._map.clearOverlays();
                let numdata = res.data.data.datas;
                // let center =res.data.center;
                // if(center){
                //     if(center.longitude!=="" && center.latitude!=="" ){
                //       let  num ={lng:center.longitude, lat:center.latitude};
                //       this.center_city =num;
                //      }
                // }
                // console.log(center);
                let point = [];
                numdata.map((m, n) => {
                  point.push({
                    id: m.id,
                    name: m.name,
                    point: { lng: m.longitude, lat: m.latitude },
                    price: m.price,
                    Num: "",
                    level:level
                  });
                });
              
                _this.sample_class = false;
                _this.project_class = true;
                _this.project_text.old = _this.project_text.dan;
                _this.yuan_text.dan = "元/m²";
                _this.yuan_text.ge = "";
                _this.keshi_num = res.data.num;
                if (point.length > 0) {
                  _this.point = point;
                  _this.keshi_num = res.data.num;
                } else {
                  _this.point = [];
                   _this.keshi_num = res.data.num;
                }

              
                this._map.clearOverlays();
              } else {
                _this.$message.error(res.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
        } else if (deep > 9 && deep <=12) {
          level = 1;

          axios
            .post("/api/map/map_info", {
              // 参数	示例	必填	注释
              page: 1, //	是	页码
              limit: 10, //	是	每页几条
              city: city_id, //是	城市编码
              country: country_id, //	 	否	区域
              railway: railway_id, //	否	地铁
              totalprice: zongPrice_id, //	否	总价范围
              apartment: huxing_id, //	 	否	户型
              build_type: fangtype_id, //	否	建筑类型
              single_price: danPrice_id, //	否	单价
              area: area_id, //否	面积
              feature: tese_id, // 	否	特色
              name:this.name_value, //	否	项目名
              order_type: order_id, // 	否	排序类型
              left_bottom_lng: bssw.lng, //	119.255401	是	左下边界经度
              left_bottom_lat: bssw.lat, //29.39381	是	左下边界纬度
              right_top_lng: bsne.lng, //121.014643	是	右上边界经度
              right_top_lat: bsne.lat, //	30.954314	是	右下边界纬度
              level: level //是	1区县 2 街道 3 项目
              //   street	:, //	否	街道id
            })
            .then(res => {
              if (res.data.code == 200) {
                console.log("=====handler=====");
                let numdata = res.data.data.datas;
                // let center =res.data.center;
                // if(center){
                //     if(center.longitude!=="" && center.latitude!=="" ){
                //       let  num ={lng:center.longitude, lat:center.latitude};
                //       this.center_city =num;
                //    //   console.log(center);
                //      }
                // }
                let point = [];
                numdata.map((m, n) => {
                  point.push({
                    id: m.id,
                    name: m.name,
                    point: { lng: m.longitude, lat: m.latitude },
                    price: (m.price / 10000).toFixed(1),
                    Num: m.Num,
                    level:level
                  });
                });
                if (point.length > 0) {
                  _this.point = point;
                   _this.keshi_num = res.data.num;
                } else {
                  _this.point = [];
                   _this.keshi_num = res.data.num;
                }
                _this.project_class = false;
                _this.sample_class = true;

                _this.project_text.old = "";
                _this.yuan_text.dan = "万元/m²";
                _this.yuan_text.ge = "个楼盘";
                _this.keshi_num = res.data.num;
                this._map.clearOverlays();
              } else {
                _this.$message.error(res.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
        } else if (deep > 12 && deep <= 15) {
          level = 2;
          axios
            .post("/api/map/map_info", {
              // 参数	示例	必填	注释
              page: 1, //	是	页码
              limit: 10, //	是	每页几条
              city: city_id, //是	城市编码
              country: country_id, //	 	否	区域
              railway: railway_id, //	否	地铁
              totalprice: zongPrice_id, //	否	总价范围
              apartment: huxing_id, //	 	否	户型
              build_type: fangtype_id, //	否	建筑类型
              single_price: danPrice_id, //	否	单价
              area: area_id, //否	面积
              feature: tese_id, // 	否	特色
              name:this.name_value, //	否	项目名
              order_type: order_id, // 	否	排序类型
              left_bottom_lng: bssw.lng, //	119.255401	是	左下边界经度
              left_bottom_lat: bssw.lat, //29.39381	是	左下边界纬度
              right_top_lng: bsne.lng, //121.014643	是	右上边界经度
              right_top_lat: bsne.lat, //	30.954314	是	右下边界纬度
              level: level //是	1区县 2 街道 3 项目
              //   street	:, //	否	街道id
            })
            .then(res => {
              if (res.data.code == 200) {
                console.log("=====handler=====");
                let numdata = res.data.data.datas;
                // let center =res.data.center;
                // if(center){
                //     if(center.longitude!=="" && center.latitude!=="" ){
                //     let  num ={lng:center.longitude, lat:center.latitude};
                //     this.center_city =num;
                //     }
                // }
                let point = [];
                numdata.map((m, n) => {
                  point.push({
                    id: m.id,
                    name: m.name,
                    point: { lng: m.longitude, lat: m.latitude },
                    price: (m.price / 10000).toFixed(1),
                    Num: m.Num,
                    level:level
                  });
                });
                if (point.length > 0) {
                  _this.point = point;
                  _this.keshi_num = res.data.num;
                } else {
                  _this.point = [];
                 _this.keshi_num = res.data.num;
                }
                _this.project_class = false;
                _this.sample_class = true;
                _this.project_text.old = "";
                _this.yuan_text.dan = "万元/m²";
                _this.yuan_text.ge = "个楼盘";
                _this.keshi_num = res.data.num;
               this._map.clearOverlays();
              } else {
                _this.$message.error(res.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
     }
    },
    //初始化查询条件
    getInitSouList() {
      var ip = ip_arr["ip"];
      let city = sessionStorage.getItem("city_id");
      axios
        .post("/api/project/search", {
          platform: 1,
          ip: ip,
          city: city
        })
        .then(res => {
          if (res.data.code == 200) {
            let num = res.data.data.conditions;
            this.cities = num.cities;
            this.build_types = num.build_types;
            this.apartments = num.apartments;
            this.features = num.features;
            this.total_prices = num.total_prices;
            this.single_prices = num.single_prices;
            this.areas = num.areas;
            this.railways = num.railways;
            this.orders = num.orders;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getPoint() {
      let deep = this._map.getZoom();
      let bssw = this._bssw;
      let bsne = this._bsne;
      console.log(deep, "getPoint函数");

      let ip = ip_arr["ip"];
      let city = sessionStorage.getItem("city_id");
      let token = sessionStorage.getItem("token");
      let country_id = this.$cookies.get("country_id");
      let railway_id = this.$cookies.get("railway_id");
      let zongPrice_id = this.$cookies.get("zongPrice_id");
      let danPrice_id = this.$cookies.get("danPrice_id");
      let huxing_id = this.$cookies.get("huxing_id");
      let fangtype_id = this.$cookies.get("fangtype_id");
      let tese_id = this.$cookies.get("tese_id");
      let area_id = this.$cookies.get("area_id");
      let order_id = this.$cookies.get("order_id");

      let _this = this;
      let level = "";

      if (deep > 9 && deep <=12) {
        level = 1;
        _this.project_class = false;
        _this.sample_class = true;

        _this.project_text.old = "";
        _this.yuan_text.dan = "万元/m²";
        _this.yuan_text.ge = "个楼盘";
      } else if (deep > 12 && deep <= 15) {
        level = 2;
        _this.project_class = false;
        _this.sample_class = true;
        _this.project_text.old = "";
        _this.yuan_text.dan = "万元/m²";
        _this.yuan_text.ge = "个楼盘";
      } else if (deep > 15) {
        level = 3;
        _this.project_class = true;
        _this.sample_class = false;

        _this.project_text.old = _this.project_text.dan;
        _this.yuan_text.dan = "元/m²";
        _this.yuan_text.ge = "";
      }

      axios
        .post("/api/map/map_info", {
          // 参数	示例	必填	注释
          page: 1, //	是	页码
          limit: 10, //	是	每页几条
          city: city, //是	城市编码
          country: country_id, //	 	否	区域
          railway: railway_id, //	否	地铁
          totalprice: zongPrice_id, //	否	总价范围
          apartment: huxing_id, //	 	否	户型
          build_type: fangtype_id, //	否	建筑类型
          single_price: danPrice_id, //	否	单价
          area: area_id, //否	面积
          feature: tese_id, // 	否	特色
          name:this.name_value, //	否	项目名
          order_type: order_id, // 	否	排序类型
          left_bottom_lng: bssw.lng, //	119.255401	是	左下边界经度
          left_bottom_lat: bssw.lat, //29.39381	是	左下边界纬度
          right_top_lng: bsne.lng, //121.014643	是	右上边界经度
          right_top_lat: bsne.lat, //	30.954314	是	右下边界纬度
          level: level //是	1区县 2 街道 3 项目
          //   street	:, //	否	街道id
        })
        .then(res => {
          if (res.data.code == 200) {
            console.log("=====getPoint=====");
            let numdata = res.data.data.datas;
            let center =res.data.center;
                if(center){
                    if(center.longitude!=="" && center.latitude!=="" ){
                    let  num ={lng:center.longitude, lat:center.latitude};
                    this.center_city =num;
                    }
                }
            let point = [];

            if (level == 3) {
              numdata.map((m, n) => {
                point.push({
                  id: m.id,
                  name: m.name,
                  point: { lng: m.longitude, lat: m.latitude },
                  price: m.price,
                  Num: "",
                  level:level,
                });
              });
            } else {
              numdata.map((m, n) => {
                point.push({
                  id: m.id,
                  name: m.name,
                  point: { lng: m.longitude, lat: m.latitude },
                  price: (m.price / 10000).toFixed(1),
                  Num: m.Num,
                  level:level,
                });
              });
            }
            _this._map.clearOverlays();
            if (point.length > 0) {
              this.point = point;
              this.keshi_num = res.data.num;
            } else {
              this.point = [];
              this.keshi_num = res.data.num;
            }
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
        this.getSouResult(1);
    },
    //左侧侧边栏搜索结果
    getSouResult(pagenum) {
      let country_id = this.$cookies.get("country_id");
      let railway_id = this.$cookies.get("railway_id");
      let zongPrice_id = this.$cookies.get("zongPrice_id");
      let danPrice_id = this.$cookies.get("danPrice_id");
      let huxing_id = this.$cookies.get("huxing_id");
      let fangtype_id = this.$cookies.get("fangtype_id");
      let tese_id = this.$cookies.get("tese_id");
      let order_id = this.$cookies.get("order_id");
      let area_id = this.$cookies.get("area_id");
      let  city_id = sessionStorage.getItem('city_id')
      sessionStorage.setItem('page',pagenum);
      let data_ = {
        page: pagenum, //	是	页码
        limit: 20, //是	每页几条
        city: city_id, //是	城市编码
        country: country_id, //否	区域
        railway: railway_id, //否	地铁
        totalprice: zongPrice_id, //	否	总价范围
        apartment: huxing_id, //否	户型
        build_type: fangtype_id, //否	建筑类型
        single_price: danPrice_id, //	否	单价
        area: area_id, //否	面积
        feature: tese_id, //否	特色
        name:this.name_value,	 	//否	项目名
        order_type: order_id //	否	排序类型
      };
      // let data_no_page ={
      //     limit: 20, //是	每页几条
      //     city: city_id, //是	城市编码
      //     country: country_id, //否	区域
      //     railway: railway_id, //否	地铁
      //     totalprice: zongPrice_id, //	否	总价范围
      //     apartment: huxing_id, //否	户型
      //     build_type: fangtype_id, //否	建筑类型
      //     single_price: danPrice_id, //	否	单价
      //     area: area_id, //否	面积
      //     feature: tese_id, //否	特色
      //     name:this.name_value,	 	//否	项目名
      //     order_type: order_id //	否	排序类型
      // }
      //  let  sou_tiao =  JSON.parse(localStorage.getItem('sou_tiao'));
      //  if(sou_tiao!==undefined && sou_tiao!==null){
      //      console.log(sou_tiao,data_no_page);
      //    if(this.isObjectValueEqual(sou_tiao,data_no_page)==false){
      //         localStorage.removeItem('data_zong');
      //         console.log('不相等');
      //    }
      //  }
      axios
        .post("/api/map/search_info", data_)
        .then(res => {
          if (res.data.code == 200) {
            let data = res.data.data.datas;
         //   localStorage.setItem('sou_tiao',JSON.stringify(data_no_page));
            if(data.length>0){
                  this.the_city_num = res.data.data.num;
                  this.left_project = data;
                  this.scrollToBottom();
                  this.currentPage1 = pagenum;
                  // console.log(res.data.phone);
                  this.com_tel =  res.data.phone;
            }else{
                  this.left_project = [];
                  this.the_city_num = res.data.data.num;
                  this.com_tel =  res.data.phone;
            }
            // if (data.length > 0) {
            //    if(localStorage.getItem('hua')==1){
            //        let  data_zong =  JSON.parse(localStorage.getItem('data_zong'));
            //       if(data_zong==undefined){
            //               localStorage.setItem('data_zong',JSON.stringify(data));
            //               data_zong =  JSON.parse(localStorage.getItem('data_zong'));
            //       }else{
            //               let number = data_zong.concat(data);
            //               console.log(222)
            //               localStorage.setItem('data_zong',JSON.stringify(number));
            //       }
            //       console.log(data_zong);
            //       if(data_zong==null){
            //         //  this.left_project = data;
            //       }else{
            //         this.left_project = data_zong;
            //       }
                  
            //    }else{
            //        this.left_project = data;
            //    }
            
              
            //   this.the_city_num = res.data.data.num;
            //   sessionStorage.setItem('sou_data',res.data.data.num);
            // } else {
            //   this.left_project = [];
            // }



          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount(){
    let name_arr = {
      112: "徐州市",
      1: "杭州市",
      36: "宁波市",
      38: "嘉兴市",
      104: "湖州市",
      73: "绍兴市",
      93: "湛江市",
      41: "重庆市",
      47: "成都市",
      3: "贵阳市"
    };
    var city_name = sessionStorage.getItem("city_name");
    var city_id = sessionStorage.getItem("city_id");
    if (city_name) {
      this.cityname = city_name;
    } else if (city_id) {
      sessionStorage.setItem("city_id", city_id);
      this.$cookies.set("city_id", city_id);
      this.cityname = name_arr[city_id];
      sessionStorage.setItem("city_name", name_arr[city_id]);
    } else {
        //嘉兴注释
      this.cityname = "杭州市";
      sessionStorage.setItem("city_id", 1);
      this.$cookies.set("city_id", 1);
      // this.cityname = "杭州市";
      // sessionStorage.setItem("city_id", 1);
      // this.$cookies.set("city_id", 1);
    }

   //域名中含有www.jy8006.com，直接跳对应分站
      //  let city_head_arr = {
      //     112: "xuzhou",
      //     1: "hangzhou",
      //     36: "ningbo",
      //     38: "jiaxing",
      //     104: "huzhou",
      //     73: "shaoxing",
      //     93: "zhanjiang",
      //     41: "chongqing",
      //     47: "chengdu",
      //     3: "guiyang",
      //     149:"wuxi"
      //   };
       let  city_head_arr = this.$store.state.city_list;
     //      console.log(city_head_arr);
       let has_city=this.$cookies.get('city_id');
       //   let str="www.jy8006.com";
       let  str ='www.jy8006.com';
       let host=window.location.host;
       if(host.indexOf(str)!==-1){
            if(!city_head_arr.hasOwnProperty(has_city)){
                console.log(111)
            }else{
                window.location.href ="http://" + city_head_arr[has_city] + ".jy8006.com"+this.$route.path;
            }
       }


        let  mine = this.$store.state.style_mine;
        this.mine = mine;
  },
  //调用
  mounted() {
       let  mine = this.$store.state.style_mine;
       this.mine = mine;



     $('.sel_box').click(function(){
         $('.city_list').show();
     })
// 　   $(document).bind("click",function(e){
// 　　　　　　  var target  = $(e.target);
// 　　　　　  　if(target.closest(".sel_box").length == 0){
// 　　　　　　   $(".city_list").hide();
// 　　　　　　     }　　　　
//  　　　})
    let city_id = sessionStorage.getItem('city_id') ;
     this.active_num = city_id;

      let  token =  localStorage.getItem('token');
      var tel= localStorage.getItem("tel");
      if(token && tel){
         this.login_show =false;
         this.exit_show = true;
         this.login_tel=tel;
      }else {
          this.login_show =true;
      }


        this.$cookies.remove("country_id");
        this.$cookies.remove("railway_id");
        this.$cookies.remove("zongPrice_id");
        this.$cookies.remove("danPrice_id");
        this.$cookies.remove("huxing_id");
        this.$cookies.remove("fangtype_id");
        this.$cookies.remove("tese_id");
        this.$cookies.remove("order_id");
        this.$cookies.remove("area_id");
      document.addEventListener("click", this.cityHide, false);
      // let city_all = JSON.parse(localStorage.getItem("city_all"));
      // if (city_all) {
      //     let num = city_all;
      //     this.city = num.city;
      //     this.province = num.province;
      //     this.zhicity = num.hots;
      //   } else {
          axios
            .post("/api/first/city?support=1", {
                platform: 1
            })
            .then(res => {
              if (res.data.code == 200) {
                var num = res.data.data;
                this.zhicity = num.hots;

              } else {
                this.$message(res.data.message);
              }
            });
       // }




   // this.projectScroll();
      //初始化样式
    let country_id = this.$cookies.get("country_id");
    let railway_id = this.$cookies.get("railway_id");
    let zongPrice_id = this.$cookies.get("zongPrice_id");
    let danPrice_id = this.$cookies.get("danPrice_id");
    let huxing_id = this.$cookies.get("huxing_id");
    let fangtype_id = this.$cookies.get("fangtype_id");
    let tese_id = this.$cookies.get("tese_id");
    let area_id = this.$cookies.get("area_id");
    let order_id = this.$cookies.get("order_id");
    if(country_id!==null){
        this.num = country_id;
        this.tou_qu_active =true;
    }
    if(railway_id!==null){
        this.num1 = railway_id;
        this.tou_qu_active =true;
    }
    if(zongPrice_id!==null){
        this.num2 = zongPrice_id;
        this.tou_jia_active =true;
    }
    if(danPrice_id!==null){
        this.num3 = danPrice_id;
        this.tou_jia_active =true;
    }
    if(huxing_id!==null){
        this.num5 = huxing_id;
        this.tou_hu_active =true;
    }
    if(fangtype_id!==null){
        this.num4 = fangtype_id;
        this.tou_shai_active =true;
    }
    if(tese_id!==null){
        this.num7 = tese_id;
        this.tou_shai_active =true;
    }
     if(area_id!==null){
        this.num6 = area_id;
        this.tou_shai_active =true;
    }
    if(order_id!==null){
        this.num8 = order_id;
        this.tou_pai_active =true;
    }

   



    let com_tel = sessionStorage.getItem("telphone_com");
    this.com_tel = com_tel;



    this.getSouResult(1);
    this.$cookies.config("0");
    //初始化地图找房条件
    this.getInitSouList();
    window.end = 0;
    window.p = 1;
    $(".type li").click(function() {
      $(this)
        .addClass("active")
        .siblings("li")
        .removeClass("active");
    });
    $(".kaifa li").click(function() {
      $(this)
        .addClass("active")
        .siblings("li")
        .removeClass("active");
    });
    $(".tese li").click(function() {
      $(this)
        .addClass("active")
        .siblings("li")
        .removeClass("active");
    });
   
    /*区域和地铁*/
    $(".qu-quyu li").click(function() {
      $(this)
        .addClass("qu_active")
        .siblings("li")
        .removeClass("qu_active");
      // var str=$(this).attr("data_v");
      // send(str,1);
      window.end = 0;
      window.p = 1;
      $(".quyu-list").hide();
      $(".zhao").hide();
    });
    $(".qu-ditie li").click(function() {
      $(this)
        .addClass("qu_active")
        .siblings("li")
        .removeClass("qu_active");
      // var str=$(this).attr("data-v");
      // send(str,2);
      window.end = 0;
      window.p = 1;
      $(".quyu-list").hide();
      $(".zhao").hide();
    });
    /*单价和总价*/
    $(".price-zong li").click(function() {
      // var str=$(this).attr("data_v");
      // console.log(str);
      // send(str,4);
      window.end = 0;
      window.p = 1;
      $(".price-list").hide();
      $(".zhao").hide();
    });
    $(".price-dan li").click(function() {
      // var str=$(this).attr("data_v");
      // console.log(str);
      window.end = 0;
      // send(str,3);
      window.p = 1;
      $(".price-list").hide();
      $(".zhao").hide();
    });

    $(".price-left li").click(function() {
      var con = $(this).html();
      //  console.log(con);
      window.end = 0;
      window.p = 1;
      if (con == "总价") {
        $(".price-zong").show();
        $(".price-dan").hide();
      } else if (con == "单价") {
        $(".price-zong").hide();
        $(".price-dan").show();
      }
      $(this)
        .addClass("qu_active")
        .siblings("li")
        .removeClass("qu_active");
    });

    $(".price-right li").click(function() {
      $(this)
        .addClass("qu_active")
        .siblings("li")
        .removeClass("qu_active");
      // console.log($(this).html())
    });
    $(".huxing_top li").click(function() {
      if (
        $(this)
          .find("input")
          .prop("checked")
      ) {
        $(this)
          .find("input")
          .prop("checked", false);
      } else {
        $(this)
          .find("input")
          .prop("checked", true);
      }
      //    console.log($(this).children('span').html())
      $(this)
        .children("span")
        .addClass("hu_active");
      $(this)
        .siblings("li")
        .children("span")
        .removeClass("hu_active");

      //   console.log($(this).children('span').html())
    });
    /*户型*/
    $(".huxing_que  .m-h-r").click(function() {
      var dom = $(this)
        .parent()
        .prev()
        .children()
        .children("input");
      var arr = [];
      dom.each(function() {
        var ke = $(this).prop("checked");
        var data_key = $(this).prop("value");
        if (ke == true) {
          arr.push(data_key);
        } else {
        }
      });
      // var str=arr;
      window.end = 0;
      window.p = 1;
      // send(str,5);
      $(".huxing_list").hide();
      $(".zhao").hide();
      // console.log(arr);
    });
    $(".huxing_que .m-h-l").click(function() {
      $(this)
        .parent()
        .prev()
        .children()
        .children("input")
        .attr("checked", false);
    });
    /*筛选*/
    $(".shaixuan .m-h-r").click(function() {
      var type = $(".type  .active").text();
      var kaifa = $(".kaifa  .active").text();
      var tese = $(".tese  .active").text();
      var str = [];
      str[0] = type;
      str[1] = tese;
      str[2] = kaifa;
      // send(str,6);
      window.end = 0;
      window.p = 1;
      $(".shaixuan_list").hide();
      $(".zhao").hide();
    });
    $(".shaixuan .m-h-l").click(function() {
      $(this)
        .parent()
        .prev()
        .children(".bgg")
        .children()
        .removeClass("active");
    });

    /*排序*/
    $(".paixu_list li").click(function() {
      $(this)
        .addClass("pai_active")
        .siblings("li")
        .removeClass("pai_active");
      // console.log($(this).attr("data_v"))
      // var str=$(this).attr("data_v");
      // send(str,7);
      // var p=1;
      window.end = 0;
      $(".paixu_list").hide();
      $(".zhao").hide();
    });

    var flag = true;
    var flag1 = true;
    var flag2 = true;
    var flag3 = true;
    var flag4 = true;
 
    $(".click_qu").click(function() {
      flag1 = true;
      flag2 = true;
      flag3 = true;
      flag4 = true;
      $(".price-list").hide();
      $(".huxing_list").hide();
      $(".shaixuan_list").hide();
      $(".paixu_list").hide();
      $(".click_price")
        .children()
        .attr("class", "iconfont iconxiajiantou");
      $(".click_huxing")
        .children()
        .attr("class", "iconfont iconxiajiantou");
      $(".click_shai")
        .children()
        .attr("class", "iconfont iconxiajiantou");
      if (flag == true) {
        $(this)
          .children()
          .attr("class", "iconfont iconshangjiantou");  //上
        $(".quyu-list").slideDown("fast");
        $(".zhao").show();

        flag = false;
        console.log(flag);
      } else {
        $(this)
          .children()
          .attr("class", "iconfont iconxiajiantou");
        $(".quyu-list").slideUp("fast");
        $(".zhao").hide();
        flag = true;
      }
       flag = true;
    });

    $(".click_price").click(function() {
      flag = true;
      flag2 = true;
      flag3 = true;
      flag4 = true;
      $(".quyu-list").hide();
      $(".huxing_list").hide();
      $(".shaixuan_list").hide();
      $(".paixu_list").hide();
      $(".click_qu")
        .children()
        .attr("class", "iconfont iconxiajiantou");
      $(".click_huxing")
        .children()
        .attr("class", "iconfont iconxiajiantou");
      $(".click_shai")
        .children()
        .attr("class", "iconfont iconxiajiantou");
      if (flag1 == true) {
        $(this)
          .children()
          .attr("class", "iconfont iconshangjiantou"); //shang
        $(".price-list").slideDown("fast");
        $(".zhao").show();
        flag1 = false;
      } else {
        $(this)
          .children()
          .attr("class", "iconfont iconxiajiantou");
        $(".price-list").slideUp("fast");
        $(".zhao").hide();
        flag1 = true;
      }
       flag1 = true;
    });

    $(".click_huxing").click(function() {
      flag = true;
      flag1 = true;
      flag3 = true;
      flag4 = true;
      $(".quyu-list").hide();
      $(".price-list").hide();
      $(".shaixuan_list").hide();
      $(".paixu_list").hide();
      $(".click_qu")
        .children()
        .attr("class", "iconfont iconxiajiantou");
      $(".click_price")
        .children()
        .attr("class", "iconfont iconxiajiantou");
      $(".click_shai")
        .children()
        .attr("class", "iconfont iconxiajiantou");
      if (flag2 == true) {
        $(this)
          .children()
          .attr("class", "iconfont iconshangjiantou"); //shang
        $(".huxing_list").slideDown("fast");
        $(".zhao").show();
        flag2 = false;
      } else {
        $(this)
          .children()
          .attr("class", "iconfont iconxiajiantou");
        $(".huxing_list").slideUp("fast");
        $(".zhao").hide();
        flag2 = true;
      }
       flag2 = true;
    });

    $(".click_shai").click(function() {
      flag1 = true;
      flag2 = true;
      flag = true;
      flag4 = true;
      $(".quyu-list").hide();
      $(".price-list").hide();
      $(".huxing_list").hide();
      $(".paixu_list").hide();
      $(".click_qu")
        .children()
        .attr("class", "iconfont iconxiajiantou");
      $(".click_price")
        .children()
        .attr("class", "iconfont iconxiajiantou");
      $(".click_huxing")
        .children()
        .attr("class", "iconfont iconxiajiantou");
      if (flag3 == true) {
        $(this)
          .children()
          .attr("class", "iconfont iconshangjiantou"); //shang
        $(".shaixuan_list").slideDown("fast");
        $(".zhao").show();
        flag3 = false;
      } else {
        $(this)
          .children()
          .attr("class", "iconfont iconxiajiantou");
        $(".shaixuan_list").slideUp("fast");
        $(".zhao").hide();
        flag3 = true;
      }
       flag3 = true;
    });

    $(".click_pai").click(function() {
      flag = true;
      flag2 = true;
      flag3 = true;
      flag1 = true;
      $(".quyu-list").hide();
      $(".price-list").hide();
      $(".huxing_list").hide();
      $(".shaixuan_list").hide();
      $(".click_qu")
        .children()
        .attr("class", "iconfont iconxiajiantou");
      $(".click_price")
        .children()
        .attr("class", "iconfont iconxiajiantou");
      $(".click_huxing")
        .children()
        .attr("class", "iconfont iconxiajiantou");
      $(".click_shai")
        .children()
        .attr("class", "iconfont iconxiajiantou");
      if (flag4 == true) {
        $(".paixu_list").slideDown("fast");
        $(".zhao").show();
        flag4 = false;
      } else {
        $(".paixu_list").slideUp("fast");
        $(".zhao").hide();
        flag4 = true;
      }
      flag4 = true;
    });
    $(".zhao").click(function() {
      $(".quyu-list").hide();
      $(".price-list").hide();
      $(".huxing_list").hide();
      $(".shaixuan_list").hide();
      $(".paixu_list").hide();
      $(this).hide();
    });

    //背景地图
    // 百度地图API功能
    // var BMap = window.BMap;
    // var map = new BMap.Map("allmap", { minZoom: 10, maxZoom: 19 });
    // var myCity = new BMap.LocalCity();
    // myCity.get(myFun);
    // function myFun(result) {
    //   var cityName = result.name;
    //   map.setCenter(cityName);
    //   map.centerAndZoom(cityName, 12); // 初始化地图,用城市名设置地图中心点
    // }
  },
  updated() {
      $(document).bind("click",function(e){
　　　　　　  var target  = $(e.target);
　　　　　  　if(target.closest(".click_qu").length == 0 && target.closest(".quyu-list").length == 0 ){
　　　　　　       $(".quyu-list").hide();
　　　　　　  }　
//             if(target.closest(".qu-left").length == 0  ){
// 　　　　　　       $(".quyu-list").show();
// 　　　　　　  }　

            if(target.closest(".click_price").length == 0 && target.closest(".price-list").length == 0){
　　　　　　       $(".price-list").hide();
　　　　　　  }　

            if(target.closest(".click_huxing").length == 0){
　　　　　　       $(".huxing_list").hide();
　　　　　　  }　

            if(target.closest(".click_shai").length == 0){
　　　　　　       $(".shaixuan_list").hide();
　　　　　　  }　
 　　　})
  $(".qu-left li").click(function() {
      var con = $(this).html();
      if (con == "区域") {
        $(".quyu-list").show();
        $(".qu-quyu").show();
        $(".qu-ditie").hide();
      } else if (con == "地铁") {
        $(".quyu-list").show();
        $(".qu-ditie").show();
        $(".qu-quyu").hide();
      }
      $(this)
        .addClass("qu_active")
        .siblings("li")
        .removeClass("qu_active");
    });

    $(".saoma").hover(
      function() {
        $(".ma_box").show();
      },
      function() {
        $(".ma_box").hide();
      }
    );
    $(".saoma").click(function(event) {
      event.stopPropagation();
    });
   //滑动到底部
   
 
 



  }
};
</script>

<style lang="less" scoped>
/deep/
.qu-quyu{
   .el-radio{
     width: 98px;
     margin-bottom: 7px;
     margin-top: 10px;
     .el-radio__input{
        width: 16px;
        height: 16px;
        border-radius: 2px;
     }
  
     .el-radio__input.is-checked .el-radio__inner {
        border-color: #2AC66E;
        background: #2AC66E;
      //  background: url("../../assets/bao_dui.png") no-repeat center;
    }
    .el-radio__input.is-checked+.el-radio__label {
    color:  #2AC66E;
     }
    
     .el-radio__label{
        font-size: 14px;
        font-family: "Microsoft YaHei";
        font-weight: 400;
        color: #313233;
     }
   }
}
/deep/
.qu-ditie{
   .el-radio{
     width: 98px;
     margin-bottom: 7px;
     margin-top: 10px;
     .el-radio__input{
        width: 16px;
        height: 16px;
       // border: 2px solid #EEEDED;
        border-radius: 2px;
     }
  
     .el-radio__input.is-checked .el-radio__inner {
        border-color: #2AC66E;
        background: #2AC66E;
      //  background: url("../../assets/bao_dui.png") no-repeat center;
    }
    .el-radio__input.is-checked+.el-radio__label {
    color:  #2AC66E;
     }
    
     .el-radio__label{
        font-size: 14px;
        font-family: "Microsoft YaHei";
        font-weight: 400;
        color: #313233;
     }
   }
}
/deep/
.price-zong{
   .el-radio{
     width: 110px;
     margin-bottom: 7px;
     margin-top: 10px;
     .el-radio__input{
        width: 16px;
        height: 16px;
       // border: 2px solid #EEEDED;
        border-radius: 2px;
     }
  
     .el-radio__input.is-checked .el-radio__inner {
        border-color: #2AC66E;
        background: #2AC66E;
      //  background: url("../../assets/bao_dui.png") no-repeat center;
    }
    .el-radio__input.is-checked+.el-radio__label {
    color:  #2AC66E;
     }
    
     .el-radio__label{
        font-size: 14px;
        font-family: "Microsoft YaHei";
        font-weight: 400;
        color: #313233;
     }
   }
}
/deep/
.price-dan{
   .el-radio{
     width: 110px;
     margin-bottom: 7px;
     margin-top: 10px;
     .el-radio__input{
        width: 16px;
        height: 16px;
       // border: 2px solid #EEEDED;
        border-radius: 2px;
     }
  
     .el-radio__input.is-checked .el-radio__inner {
        border-color: #2AC66E;
        background: #2AC66E;
      //  background: url("../../assets/bao_dui.png") no-repeat center;
    }
    .el-radio__input.is-checked+.el-radio__label {
    color:  #2AC66E;
     }
    
     .el-radio__label{
        font-size: 14px;
        font-family: "Microsoft YaHei";
        font-weight: 400;
        color: #313233;
     }
   }
}
/deep/
.huxing_top{
   .el-radio{
     width: 98px;
     margin-bottom: 7px;
     margin-top: 10px;
     .el-radio__input{
        width: 16px;
        height: 16px;
       // border: 2px solid #EEEDED;
        border-radius: 2px;
     }
  
     .el-radio__input.is-checked .el-radio__inner {
        border-color: #2AC66E;
        background: #2AC66E;
      //  background: url("../../assets/bao_dui.png") no-repeat center;
    }
    .el-radio__input.is-checked+.el-radio__label {
    color:  #2AC66E;
     }
    
     .el-radio__label{
        font-size: 14px;
        font-family: "Microsoft YaHei";
        font-weight: 400;
        color: #313233;
     }
   }
}
/deep/
.shaixuan_list{
   .el-radio{
     width: 105px;
     margin-bottom: 7px;
     margin-top: 10px;
     .el-radio__input{
        width: 16px;
        height: 16px;
       // border: 2px solid #EEEDED;
        border-radius: 2px;
     }
  
     .el-radio__input.is-checked .el-radio__inner {
        border-color: #2AC66E;
        background: #2AC66E;
      //  background: url("../../assets/bao_dui.png") no-repeat center;
    }
    .el-radio__input.is-checked+.el-radio__label {
    color:  #2AC66E;
     }
    
     .el-radio__label{
        font-size: 14px;
        font-family: "Microsoft YaHei";
        font-weight: 400;
        color: #303233;
     }
   }
}

/deep/
.quyu-list{  //区域单选框样式
  .el-radio__inner {
    border-radius: 2px;
  }
  .el-radio__inner:after {
    box-sizing: content-box !important;
    content: "" !important;
    border: 1px solid #fff !important;
    border-left: 0 !important;
    border-top: 0 !important;
    height: 7px !important;
    left: 4px !important;
    position: absolute !important;
    top: 1px !important;
    transform: rotate(45deg) scaleY(0) !important;
    width: 3px !important;
    transition: transform 0.15s ease-in 0.05s !important;
    transform-origin: center !important;
    border-radius: 0 !important;
    background-color:  #2AC66E!important;
  }
  .el-radio__input.is-checked .el-radio__inner::after {
    transform: rotate(45deg) scaleY(1) !important;
  }
}
/deep/
.huxing_top{  //户型单选框样式
  .el-radio__inner {
    border-radius: 2px;
  }
  .el-radio__inner:after {
    box-sizing: content-box !important;
    content: "" !important;
    border: 1px solid #fff !important;
    border-left: 0 !important;
    border-top: 0 !important;
    height: 7px !important;
    left: 4px !important;
    position: absolute !important;
    top: 1px !important;
    transform: rotate(45deg) scaleY(0) !important;
    width: 3px !important;
    transition: transform 0.15s ease-in 0.05s !important;
    transform-origin: center !important;
    border-radius: 0 !important;
    background-color:  #2AC66E!important;
  }
  .el-radio__input.is-checked .el-radio__inner::after {
    transform: rotate(45deg) scaleY(1) !important;
  }
}
/deep/
.price-list{  //价格单选框样式
  .el-radio__inner {
    border-radius: 2px;
  }
  .el-radio__inner:after {
    box-sizing: content-box !important;
    content: "" !important;
    border: 1px solid #fff !important;
    border-left: 0 !important;
    border-top: 0 !important;
    height: 7px !important;
    left: 4px !important;
    position: absolute !important;
    top: 1px !important;
    transform: rotate(45deg) scaleY(0) !important;
    width: 3px !important;
    transition: transform 0.15s ease-in 0.05s !important;
    transform-origin: center !important;
    border-radius: 0 !important;
    background-color:  #2AC66E!important;
  }
  .el-radio__input.is-checked .el-radio__inner::after {
    transform: rotate(45deg) scaleY(1) !important;
  }
}
/deep/
.shaixuan_list{  //筛选单选框样式
  .el-radio__inner {
    border-radius: 2px;
  }
  .el-radio__inner:after {
    box-sizing: content-box !important;
    content: "" !important;
    border: 1px solid #fff !important;
    border-left: 0 !important;
    border-top: 0 !important;
    height: 7px !important;
    left: 4px !important;
    position: absolute !important;
    top: 1px !important;
    transform: rotate(45deg) scaleY(0) !important;
    width: 3px !important;
    transition: transform 0.15s ease-in 0.05s !important;
    transform-origin: center !important;
    border-radius: 0 !important;
    background-color:  #2AC66E!important;
  }
  .el-radio__input.is-checked .el-radio__inner::after {
    transform: rotate(45deg) scaleY(1) !important;
  }
}

/deep/ //页码
.yema{
    .el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: #20C658;
        color: #FFF;
    }
}
//区域
 
@import "../../assets/css/map_newtest.less";
body,
html {
  width: 100%;
  height: 100%;
  margin: 0;
  font-family: "微软雅黑";
  font-family: "微软雅黑";
}

.Bmap {
  width: 100%;
  height: 1000px;
}
.sample {
  width: 90px;
  height: 90px;
  
background: linear-gradient(270deg, #1FC365, #3FD6A6);
box-shadow: 0px 5px 10px 0px rgba(44, 203, 128, 0.2);
 // background: rgba(64, 162, 244, 0.9);
  border-radius: 50%;
  box-shadow: 0 0 5px #000;
  color: #fff;
  text-align: center;
  padding: 10px;
  position: absolute;
}
.dian h4 {
  font-size: 16px;
  font-family: "Microsoft YaHei";
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
  line-height: 36px;
}
.dian p {
  font-size: 14px;
  font-family: "Microsoft YaHei";
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 22px;
}
// .sample.active {
//   background: rgba(255,76,76,0.9);
//   color: #fff;
// }
.sou_boxx {
  position: fixed;
  top: 0;
  h4 {
    img {
      margin-top: 5px;
    }
    .m-go {
      font-style: normal;
    }
    em {
      .kong {
        height: 15px;
      }
    }
  }
}
/*搜索列表*/
.sou_res {
  width: 420px;
  height: 300px;
  overflow-y: auto;
  background: #fff;
  /* border:1px solid #D9D9D9; */
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.05);
  position: absolute;
  left: 20px;
  top: 97px;
  cursor: pointer;
  z-index: 30000;
  display: none;
  border-radius: 0 0 0px 2px;
}
// /deep/.sou_res{
//     .select{
//        .click_qu{
//         color:#40A2F4;
//        }
//     }
// }
.sou_res li {
  line-height: 36px;
  font-size: 14px;
  padding-left: 20px;
}
.sou_res li:hover {
  background: rgba(139, 138, 138, 0.1);
  color: #2dd264;
}
.sou_res::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  border-radius: 10px;
}

.sou_res::-webkit-scrollbar {
  width: 10px;
  height: 20px;
  background-color: #f5f5f5;
}

.sou_res::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #fff;
  background-image: -webkit-gradient(
    linear,
    40% 0%,
    75% 84%,
    from(rgb(238, 238, 238)),
    to(rgb(238, 238, 238)),
    color-stop(0.6, rgb(238, 238, 238))
  );
}
.layui-card-body {
  padding: 0;
}

/* 顶部导航 */
.top-nav {
  height: 80px;
  width: 100%;
  background-color:#fff;
  position: fixed;
  z-index: 2;
  top: 0px;
  .left{
    height: 80px;
    width: 70%;
    float: left;
       .header1{
          width: 135px;
          height: 80px;
          float: left;
          margin-right: 60px;
          img {
            display: block;
            margin-left: 34px;
            margin-top: 13px;
          
          }
       }
       .nav_li{
            a{
                font-size: 16px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: #303233;
                float: left;
                line-height: 80px;
                margin-right: 35px;
            }
         }
    
  }
      .login{
        float: right;
        width: 400px;
        .login_box{
             float: left;
             line-height: 80px;
             margin-right: 30px;
             cursor: pointer;
             span{
               margin-right: 10px;
               font-weight: bold;
             }
        }
        .exit{
             float: left;
             line-height: 80px;
             margin-right: 13px;
             cursor: pointer;
        }
        p{
             float: left;
            font-size:18px;
            font-family:"Microsoft YaHei";
            font-weight:bold;
            color:rgba(15,18,19,1); 
             line-height: 80px;
             margin-right: 40px;
        }
    }
}

.box .city{
         position: absolute;
         width: 117px;
         height: 280px;
         background: rgba(255, 255, 255, 1);
         box-shadow: 0px 0px 13px 0px rgba(6, 0, 1, 0.08);
         border-radius: 2px;
         left: 100px;
         top: 80px;
         z-index:200;
         padding-left:32px ;
         padding-right: 31px;
         h5 {
            font-size: 16px;
            font-family: "Microsoft YaHei";
            font-weight: 400;
            color: #1A1A1A;
            line-height: 58px;
            border-bottom: 1px solid #edf0f2;
            width: 116px;
         }
         ul{
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            li{
                  font-size: 14px;
                  font-family: "Microsoft YaHei";
                  font-weight: 400;
                  color: rgba(75, 79, 97, 1);
                  cursor: pointer;
                  line-height: 34px;
                  float: left;
            }
            .active{
                color: #3EACF0;
            }
            li:hover{
                color: #3EACF0;
            }
         }
         h6 {
            font-size: 14px;
            font-family: "Microsoft YaHei";
            font-weight: 400;
            color: #666666;
            line-height: 42px;
            border-top: 1px solid #edf0f2;
            cursor: pointer;
            width: 116px;
         }
}
// .box img {
//   margin-right: 30px !important;
// }
.box  
.box .sel_dizhi {
  line-height: 60px;
  font-size: 16px;
  color: #fff;
}
.box .sel_dizhi em{
    font-style: normal;
    line-height: 60px;
    font-size: 16px;
    color: #fff;
    width: 50px;
    overflow: hidden;
    display: inline-block;
    height: 60px;
}
.box .sel_dizhi strong{
    font-style: normal;
    line-height: 60px;
    font-size: 16px;
    color: #fff;
    overflow: hidden;
    display: inline-block;
    height: 60px;
}
.box .login_btn {
  line-height: 60px;
  color: #fff;
}
.box .tel {
  line-height: 60px;
}
.top-nav .nav_li {
  margin-right: 30px;
}
.top-nav .nav_li li {
  float: left;
  line-height: 60px;
  font-size: 16px;
  padding: 0 16px;
  color: #fff;
  cursor: pointer;
}
.router-link-active {
  background: #3894e2;
  color: #fff;
}
.top-nav .nav_li li a {
  color: rgba(102, 102, 102, 1);
  font-size: 16px;
  line-height: 60px;
}
.top-nav .nav_li li a:hover {
  color: #333333;
  font-weight: bold;
}
.top-nav .nav_li li a.active {
  color: #333333;
  border-bottom: 3px solid #1cb64f;
  font-weight: bold;
  padding-bottom: 28px;
}
.top-nav p {
  float: right;
  color: #fff;
  font-size: 20px;
  line-height: 80px;
  font-weight: bold;
  position: absolute;
  right: 0;
}
.top-nav span {
  color: #9a9a9a;
  font-size: 16px;
  line-height: 80px;
  margin-right: 19px;
  cursor: pointer;
}
// .top-nav img {
//   width: 102px;
//   float: left;
//   margin-right: 50px;
//   margin-top: 10px;
// }
.top-nav .register {
  margin-right: 7px;
}
.top-nav img.jk {
  margin-left: 33px;
}
.top-nav .user {
  color: #2dd264;
}
.top-nav .login_text{
      font-size:16px;
            font-family:"Microsoft YaHei";
            font-weight:400;
            color: #fff;
            line-height: 60px;
            margin-right:39px;
            cursor:pointer;
            position:relative;
            strong{
              margin-right:10px;
            }
            .exitLogin{
                width:89px;
                height:32px;
                background:rgba(255,255,255,0.9);
                box-shadow:0px 5px 12px 0px rgba(0, 0, 0, 0.05);
                border-radius:4px;
                line-height: 32px;
                text-align: center;
                position:absolute;
                font-style: normal;
                top:46px;
                left:18px;
                cursor: pointer;
                color:#46494D;
                border:1px solid rgb(177, 177, 177);
                z-index: 400;
              }
              .exitLogin:hover{
              background:rgba(242,242,242,1);
              opacity:0.8;
              box-shadow:0px 5px 12px 0px rgba(0, 0, 0, 0.05);
              }
}

.project_hover {
  position: absolute;
  z-index: 1000;
  /deep/ .pro_detail_dan {
    z-index: 500;
    display: block;
    .pro_box {
      padding-top: 13px;
      padding-left: 16px;
      padding-right: 16px;
      width: 228px;
      height: 177px;
      background: rgba(255, 255, 255, 1);
      border-radius: 2px;
      .pro_img {
        width: 228px;
        height: 100px;
        border-radius: 2px;
        img {
          width: 228px;
          height: 100px;
          border-radius: 2px;
        }
      }
      .pro_right {
        .pro_name {
          font-size: 14px;
          font-family: "Microsoft YaHei";
          font-weight: 400;
          color: rgba(137, 141, 161, 1);
          line-height: 20px;
          display: flex;
          margin-top: 5px;
          em {
            font-size: 14px;
            font-family: "Microsoft YaHei";
            font-weight: bold;
            color: #323232;
            font-style: normal;
            width: 138px;
            overflow: hidden;
            height: 20px;
            display: inline-block;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          span {
            font-size: 12px;
            font-family: "Microsoft YaHei";
            font-weight: 400;
            color: #FF5353;
            float: right;
            i{
                font-size: 14px;
                font-weight: bold;
            }
          }
        }
        .pro_jia {
          font-size: 14px;
          font-family: "Microsoft YaHei";
          font-weight: 400;
          color: rgba(137, 141, 161, 1);
          line-height: 30px;
          em {
            color: #ff6666;
            font-style: normal;
          }
        }
        .pro_jian {
          font-size: 12px;
          font-family: "Microsoft YaHei";
          font-weight: 400;
          color:#666666;
          line-height: 20px;
          em {
            color: #8C8C8C;
            font-style: normal;
          }
        }
        .pro_di {
          font-size: 12px;
          font-family: "Microsoft YaHei";
          font-weight: 400;
          color: #666666;
          line-height: 20px;
          height: 20px;
          display: flex;
          span {
            font-size: 12px;
            font-family: "Microsoft YaHei";
            font-weight: 400;
            color:#666666;
            line-height: 20px;
            display: inline-block;
          }
          em {
            color: #8C8C8C;
            font-style: normal;
            display: inline-block;
            width: 190px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .pro_tel {
          line-height: 30px;
          height: 30px;
          span {
            font-size: 20px;
            font-family: "Microsoft YaHei";
            font-weight: bold;
            color: rgba(75, 79, 97, 1);
            margin-right: 19px;
          }
          button {
            width: 100px;
            height: 26px;
            background: rgba(90, 194, 255, 1);
            border-radius: 2px;
            border: none;
            font-size: 14px;
            font-family: "Microsoft YaHei";
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            em {
              font-size: 14px;
            }
          }
          .ma_box {
            width: 100px;
            height: 114px;
            position: absolute;
            right: 13px;
            background: #fff;
            display: none;
            h5 {
              font-size: 12px;
              color: #000;
              line-height: 18px;
              text-align: center;
            }
            img {
              width: 95px;
              height: 95px;
              margin-left: 2px;
            }
          }
        }
        .liao {
          font-size: 12px;
          font-family: "Microsoft YaHei";
          font-weight: 400;
          color: rgba(137, 141, 161, 1);
        }
      }
    }
    .jiao {
      width: 0;
      height: 0;
      border-right: 8px solid transparent;
      border-left: 8px solid transparent;
      border-top: 8px solid #fff;
      position: absolute;
      left: 50%;
      margin-left: -8px;
    }
  }
}
</style>
