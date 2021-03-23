<template>
  <div class="search">
    <my-header
      :all="city.all"
      :telphone="phone"
      ref="header"
    ></my-header>
    <my-mianbao :router_data="routerData"></my-mianbao>
    <div class="search_page">
      <!-- 所有条件 -->
      <div class="tiaojian_box">
        <!-- 位置-->
        <div class="weizhi">
          <strong>位置</strong>
          <div class="right_wei">
            <span :class="{ active: quyu_show_class }" @click="showQu">
              <em class="iconfont iconarea"></em>区域
            </span>
            <span :class="{ active: ditie_show_class }" @click="showDitie">
              <em class="iconfont iconditie1"></em>地铁
            </span>
          </div>
        </div>
        <!-- 区域 可多选-->
        <div class="quyu" v-show="quyu_show">
          <div class="show_qu">
            <el-checkbox-group v-model="cities_model" @change="changeCities">
              <template v-for="(item, index) in cities">
                <el-checkbox
                  v-if="index < length.qu_leng"
                  :label="item.id"
                  :key="index"
                  >{{ item.name }}</el-checkbox
                >
              </template>
            </el-checkbox-group>
          </div>
          <div class="addmore" @click="getMoreXuan">{{ gengduo_text }}</div>
        </div>
        <!-- 地铁 可多选-->
        <div class="ditie" v-show="ditie_show">
          <div class="show_tie">
            <el-checkbox-group v-model="dities_model" @change="changeDities">
              <template v-for="(item, index) in dities">
                <el-checkbox :label="item.id" :key="index">{{
                  item.name
                }}</el-checkbox>
              </template>
            </el-checkbox-group>
          </div>
        </div>
        <!-- 户型 可多选-->
        <div class="huxing">
          <strong>户型</strong>
          <div class="huxing_option">
            <el-checkbox-group v-model="huxings_model" @change="changeHuxings">
              <el-checkbox
                v-for="city in huxings"
                :label="city.id"
                :key="city.id"
                >{{ city.name }}</el-checkbox
              >
            </el-checkbox-group>
          </div>
        </div>
        <!-- 单价 单选-->
        <div class="danjia">
          <strong>单价</strong>
          <div class="danjia_option">
            <div class="tiaojian">
              <el-radio-group v-model="danjias_model" @change="changeDanjias">
                <el-radio
                  v-for="city in danjias"
                  :label="city.id"
                  :key="city.id"
                  >{{ city.name }}</el-radio
                >
              </el-radio-group>
            </div>
            <div class="dan_input_box">
              <input type="text" placeholder v-model="danPrice_min" /> —
              <input type="text" placeholder v-model="danPrice_max" />元
              <span @click="danjiaRange">确定</span>
            </div>
          </div>
        </div>
        <!-- 总价 单选-->
        <div class="zongjia">
          <strong>总价</strong>
          <div class="zongjia_option">
            <div class="hastiao">
              <el-radio-group v-model="zongjias_model" @change="changeZongjias">
                <el-radio
                  v-for="city in zongjias"
                  :label="city.id"
                  :key="city.id"
                  >{{ city.name }}</el-radio
                >
              </el-radio-group>
            </div>
            <div class="dan_input_box">
              <input type="text" placeholder v-model="zongPrice_min" /> —
              <input type="text" placeholder v-model="zongPrice_max" />万
              <span @click="zongJiaRange">确定</span>
            </div>
          </div>
        </div>
        <!-- 面积 单选-->
        <div class="mianji">
          <strong>面积</strong>
          <div class="mianji_option">
            <div class="hastiao">
              <el-radio-group v-model="mianjis_model" @change="changeMianjis">
                <el-radio
                  v-for="city in mianjis"
                  :label="city.id"
                  :key="city.id"
                  >{{ city.name }}</el-radio
                >
              </el-radio-group>
            </div>
            <div class="dan_input_box">
              <input type="text" placeholder v-model="area_min" /> —
              <input type="text" placeholder v-model="area_max" />m²
              <span @click="areaRange">确定</span>
            </div>
          </div>
        </div>
        <!-- 特色 可多选-->
        <div class="tese" v-show="get_more_tiao">
          <strong>特色</strong>
          <div class="tese_option">
            <el-checkbox-group v-model="teses_model" @change="changeTeses">
              <el-checkbox
                v-for="city in teses"
                :label="city.id"
                :key="city.id"
                >{{ city.name }}</el-checkbox
              >
            </el-checkbox-group>
          </div>
        </div>
        <!-- 分类 单选-->
        <div class="fenlei" v-show="get_more_tiao">
          <strong>分类</strong>
          <div class="fenlei_option">
            <el-radio-group v-model="fenleis_model" @change="changeFenleis">
              <el-radio
                v-for="(city, index) in fenleis"
                :label="city.type"
                :key="index"
                >{{ city.type }}</el-radio
              >
            </el-radio-group>
          </div>
        </div>
        <!--更多条件 -->
        <div class="more">
          <span @click="getMoreTiao">
            {{ more_text }}
            <em class="iconfont iconjiantou8"></em>
          </span>
          <span class="qingkong" @click="clearTiao">
            <em class="el-icon-delete"></em>清空条件
          </span>
        </div>
      </div>
      <!-- 项目列表部分 -->
      <div class="project_box_box">
        <div class="left_project">
          <div class="top_tiaojian">
            <ul>
              <li
                :class="index == active_order ? 'active' : ''"
                @click="orderDefault(index)"
                v-for="(item, index) in data_order"
                :key="index"
              >
                {{ item.name }}
              </li>
            </ul>
            <p>
              为您找到
              <em>{{ total }}</em
              >套楼盘
            </p>
          </div>


          <ul class="project_box_m">
            <template v-if="info.length>0">
                <li v-for="item in info" :key="item.id">
                  <nuxt-link :to="`/content/${item.id}`">
                    <img :src="item.img" alt />
                  </nuxt-link>
                  <div class="content">
                    <h2>
                      <strong>
                        <nuxt-link :to="`/content/${item.id}`"
                          >{{ item.name }}
                        </nuxt-link></strong
                      >
                      <span>
                        <nuxt-link :to="`/content/${item.id}`"
                          >{{ item.state }}
                        </nuxt-link></span
                      >
                      <em v-if="item.collect == 0" @click="getShou(item.id,1)"
                        >收藏</em
                      >
                      <em
                        v-if="item.collect == 1"
                        class="active"
                        @click="getShou(item.id,1)"
                        >已收藏</em
                      >
                    </h2>
                    <p class="address">
                      <nuxt-link :to="`/content/${item.id}`"
                        >{{ item.country }} | {{ item.address }}</nuxt-link
                      >
                    </p>
                    <p class="huxing">
                      <nuxt-link :to="`/content/${item.id}`">
                        户型：{{ item.house_types }} | 面积 {{ item.area }}m²
                        <span>
                          均价
                          <em>{{ item.price }}</em
                          >元/m²
                        </span>
                      </nuxt-link>
                    </p>
                    <p class="zixun">
                      <nuxt-link :to="`/content/${item.id}`">
                        新房咨询师:{{ item.staff }}
                      </nuxt-link>
                      <span @click="bianTong(104, item.id)">
                        <em class="iconfont iconzixunbeifen"></em>向他咨询
                      </span>
                      <nuxt-link :to="`/content/${item.id}`">
                        <i>参考总价：{{ item.total_price }}万元/套起</i>
                      </nuxt-link>
                    </p>
                    <p class="tese">
                      <nuxt-link :to="`/content/${item.id}`">
                        <span class="jingzhuang">{{ item.decorate }}</span>
                        <span class="zhu">{{ item.type }}</span>
                        <span
                          class="tedian"
                          v-for="(ite, index) in item.features"
                          :key="index"
                          >{{ ite }}</span
                        >
                      </nuxt-link>
                    </p>
                  </div>
                </li>
            </template>
            <template v-else>
                 <div class="nosou">
                      <p class="zanwu"><i class="el-icon-warning"></i>没有找到相关房源，可调整搜索条件</p>
                      <template>
                        <ul class="tuijian">
                            <li v-for="item in nosou_pro" :key="item.id">
                              <nuxt-link :to="`/content/${item.id}`">
                                <img :src="item.img" alt />
                              </nuxt-link>
                              <div class="content">
                                <h2>
                                  <strong>
                                    <nuxt-link :to="`/content/${item.id}`"
                                      >{{ item.name }}
                                    </nuxt-link></strong
                                  >
                                  <span>
                                    <nuxt-link :to="`/content/${item.id}`"
                                      >{{ item.state }}
                                    </nuxt-link></span
                                  >
                                  <em v-if="item.my_collect == 0" @click="getShou(item.id,2)"
                                    >收藏</em
                                  >
                                  <em
                                    v-if="item.my_collect == 1"
                                    class="active"
                                    @click="getShou(item.id,2)"
                                    >已收藏</em
                                  >
                                </h2>
                                <p class="address">
                                  <nuxt-link :to="`/content/${item.id}`"
                                    >{{ item.country }} | {{ item.address }}</nuxt-link
                                  >
                                </p>
                                <p class="huxing">
                                  <nuxt-link :to="`/content/${item.id}`">
                                    户型：{{ item.house_types }} | 面积 {{ item.area }}m²
                                    <span>
                                      均价
                                      <em>{{ item.price }}</em
                                      >元/m²
                                    </span>
                                  </nuxt-link>
                                </p>
                                <p class="zixun">
                                  <nuxt-link :to="`/content/${item.id}`">
                                    新房咨询师:{{ item.staff }}
                                  </nuxt-link>
                                  <span @click="bianTong(104, item.id)">
                                    <em class="iconfont iconzixunbeifen"></em>向他咨询
                                  </span>
                                  <nuxt-link :to="`/content/${item.id}`">
                                    <i>参考总价：{{ item.total_price_min }}万元/套起</i>
                                  </nuxt-link>
                                </p>
                                <p class="tese">
                                  <nuxt-link :to="`/content/${item.id}`">
                                    <span class="jingzhuang">{{ item.decorate }}</span>
                                    <span class="zhu">{{ item.type }}</span>
                                    <span
                                      class="tedian"
                                      v-for="(ite, index) in item.features"
                                      :key="index"
                                      >{{ ite }}</span
                                    >
                                  </nuxt-link>
                                </p>
                              </div>
                            </li>
                        </ul>
                      </template>
                </div>
            </template>
          </ul>



          <div class="yema">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="total"
              :hide-on-single-page="true"
              @current-change="pageChange"
              :current-page.sync="currentPage1"
            ></el-pagination>
          </div>
        </div>
        <div class="right_hot">
          <div class="topbox">
            <img src="~/assets/big_data.jpg" alt />
            <button @click="show_zhaoafng">帮我找房</button>
          </div>
          <ul>
            <h3>热门楼盘</h3>
            <li v-for="item in hots_building" :key="item.id">
              <nuxt-link :to="`/content/${item.id}`">
                <img :src="item.img" alt />
                <div class="project_box">
                  <h2>
                    <i>{{ item.name }}</i>
                    <em>{{ item.type }}</em>
                    <span>{{ item.state }}</span>
                  </h2>
                  <p class="price">
                    <em>{{ item.price }}</em
                    >元/m²
                  </p>
                </div>
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
      <!-- 大数据匹配找房 弹框-->
      <div class="zhao" v-show="bigdata_option.tan_flag">
        <div class="big_data">
          <div class="img_box">
            <img src="~/assets/big_data_top.jpg" alt />
            <div class="guan" @click="closeTelTan">
              <i class="iconfont iconchahao" id="fan_close"></i>
            </div>
          </div>
          <div class="buzhou">
            <div class="buzhou_box">
              <ul>
                <li :class="{ active: bigdata_option.zongjia_flag }">
                  <span>
                    <i></i>
                  </span>
                  <em>总价范围</em>
                </li>
                <li :class="{ active: bigdata_option.huxing_flag }">
                  <span>
                    <i></i>
                  </span>
                  <em>户型选择</em>
                </li>
                <li :class="{ active: bigdata_option.quyu_flag }">
                  <span>
                    <i></i>
                  </span>
                  <em>意向区域</em>
                </li>
                <li :class="{ active: bigdata_option.concat_flag }">
                  <span>
                    <i></i>
                  </span>
                  <em>联系方式</em>
                </li>
              </ul>
            </div>
          </div>
          <!-- /您能接受的总价范围是多少？/ -->
          <div class="zongjia_fan" v-show="bigdata_option.zongjia_flag">
            <h2>您能接受的总价范围是多少？</h2>
            <div class="block">
              <div class="left_value">
                <h6>{{ value[0] }}万</h6>
              </div>
              <div class="right_value">
                <h6>{{ value[1] }}万</h6>
              </div>
              <el-slider
                v-model="value"
                range
                show-stops
                show-tooltip
                :max="1000"
                tooltip-class="xianshi"
                :format-tooltip="formatTooltip"
              ></el-slider>
            </div>
            <button @click="next_one">下一步</button>
          </div>
          <!-- 您意向购买的户型是？ -->
          <div class="huxing_fan" v-show="bigdata_option.huxing_flag">
            <h2>您意向购买的户型是？</h2>
            <ul>
              <li class="buxian1" @click="huxing_sel(0, 0)">不限</li>
              <li
                v-for="(item, index) in huxings"
                :class="index == bang_hu_active ? 'active' : ''"
                :key="item.id"
                @click="huxing_sel(item.name, index)"
              >
                {{ item.name }}
              </li>
            </ul>
            <div class="btn">
              <button class="shang" @click="shangOne">上一步</button>
              <button @click="next_two" class="next">下一步</button>
            </div>
          </div>
          <!-- 您意向购买的区域是？ -->
          <div class="quyu_fan" v-show="bigdata_option.quyu_flag">
            <h2>您意向购买的区域是？</h2>
            <ul>
              <li class="buxian2" @click="quyu_sel(0, 0)">不限</li>
              <li
                v-for="(item, index) in cities"
                :key="item.id"
                :class="index == bang_qu_active ? 'active' : ''"
                @click="quyu_sel(item.name, index)"
              >
                {{ item.name }}
              </li>
            </ul>
            <div class="btn">
              <button class="shang" @click="shangTwo">上一步</button>
              <button @click="next_three" class="next">下一步</button>
            </div>
          </div>
          <!-- 您的联系方式是？ -->
          <div class="concat" v-show="bigdata_option.concat_flag">
            <h2>您的联系方式是？</h2>
            <input
              type="text"
              placeholder="输入您的联系方式"
              v-model="telphone"
              maxlength="11"
            />
            <p>会有专业人士向您发送您需要的楼盘信息</p>
            <button @click="bangZhaoFang">确定</button>
          </div>
        </div>
      </div>
    </div>
    <my-footer
      :c_zhi_citys="city.all"
      :c_hot_search="hots_search"
      :c_friendlink="friends"
      :footer_tel="phone"
    ></my-footer>
  </div>
</template>
<script>
import header from "~/components/header.vue";
import mianbao from "~/components/mianbao.vue";
import footer from "~/components/footer.vue";
import axios from "axios";
import $ from "jquery";
export default {
  components: {
    "my-header": header,
    "my-mianbao": mianbao,
    "my-footer": footer,
  },
  head() {
    return {
      title: `${this.logo_text}新房-新房查询`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `${this.logo_text}新房-新房查询`,
        },
        { hid: "Keywords", name: "Keywords", content: `${this.logo_text}新房-新房查询` },
      ],
    };
  },
  async asyncData({ app, query, params, store }) {
    let order_all = params.order;
    var arr_need = {};
    if (order_all) {
      let params_order = order_all.split("+");
      for (let i = 0; i < params_order.length; i++) {
        var item = params_order[i].split("-");
        arr_need[item[0]] = item[1];
      }
    }
    let country = "";
    let quyu_show_class = false;
    if (arr_need.qyu) {
      country = arr_need.qyu;
      quyu_show_class = true;
    } else {
      country = "";
      quyu_show_class = true;
    }

    let type = "";

    if (arr_need.type) {
      type = arr_need.type;
    } else {
      type = "";
    }

    let total_price = "";
    if (arr_need.zprice) {
      total_price = arr_need.zprice;
    } else {
      total_price = "";
    }
    let min_total_price = "";
    if (arr_need.tot_min) {
      min_total_price = arr_need.tot_min;
    } else {
      min_total_price = "";
    }

    let max_total_price = "";
    if (arr_need.tot_max) {
      max_total_price = arr_need.tot_max;
    } else {
      max_total_price = "";
    }

    let single_price = "";
    if (arr_need.dprice) {
      single_price = arr_need.dprice;
    } else {
      single_price = "";
    }

    let min_single_price = "";
    if (arr_need.dan_min) {
      min_single_price = arr_need.dan_min;
    } else {
      min_single_price = "";
    }
    let max_single_price = "";
    if (arr_need.dan_max) {
      max_single_price = arr_need.dan_max;
    } else {
      max_single_price = "";
    }
    let area = "";
    if (arr_need.area) {
      area = arr_need.area;
    } else {
      area = "";
    }
    let min_area = "";
    if (arr_need.area_min) {
      min_area = arr_need.area_min;
    } else {
      min_area = "";
    }
    let max_area = "";
    if (arr_need.area_max) {
      max_area = arr_need.area_max;
    } else {
      max_area = "";
    }

    let house_type = ""; //户型
    if (arr_need.huxing) {
      house_type = arr_need.huxing;
    } else {
      house_type = "";
    }

    let railway = ""; //地铁
    let ditie_show_class = false;
    if (arr_need.ditie) {
      railway = arr_need.ditie;
      ditie_show_class = true;
    } else {
      railway = "";
      ditie_show_class = false;
    }

    let feature = ""; //特色
    if (arr_need.tese) {
      feature = arr_need.tese;
    } else {
      feature = "";
    }

    //判断  更多条件是否显示
    let more_text = "更多条件";
    let get_more_tiao = false;
    if (type !== "" || feature !== "") {
      get_more_tiao = true;
      more_text = "收起选项";
    } else {
      get_more_tiao = false;
      more_text = "更多条件";
    }

    let order = ""; //排序
    if (arr_need.order) {
      order = arr_need.order;
    } else {
      order = "";
    }
    let page = ""; //页码
    if (arr_need.page) {
      page = arr_need.page;
    } else {
      page = 1;
    }
    //     参数
    //     token
    //     city 城市id
    let [data, project] = await Promise.all([
      app.$axios
        .get(
          `/search/condition?city=${store.state.city_id}&token=${store.state.token}`
        )
        .then((res) => {
          if (res.data.code == 200) {
            let data = res.data;
            return data;
          }
        }),
      app.$axios
        .get("/jy/search/info", {
          params: {
            city: store.state.city_id,
            page: page,
            limit: 10,
            country: country,
            type: type,
            total_price: total_price,
            min_total_price: min_total_price,
            max_total_price: max_total_price,
            single_price: single_price,
            min_single_price: min_single_price,
            max_single_price: max_single_price,
            area: area,
            min_area: min_area,
            max_area: max_area,
            house_type: house_type,
            railway: railway,
            feature: feature,
            order: order,
            token: store.state.token,
          },
        })
        .then((res) => {
          if (res.data.code == 200) {
            let data = res.data;
            return data;
          }
        }),
    ]);
    let teses = data.conditions.features;
    let arr = [];
    teses.map((p) => {
      arr.push({
        id: parseInt(p.id),
        name: p.name,
      });
    });
    return {
      cities: data.conditions.countries, //接口一
      dities: data.conditions.railways,
      huxings: data.conditions.house_types,
      danjias: data.conditions.single_prices,
      mianjis: data.conditions.areas,
      zongjias: data.conditions.total_prices,
      teses: arr,
      fenleis: data.conditions.types,
      hots_building: data.hots_building,
      phone: data.phone,
      city: data.city,
      friends: data.friends,
      hots_search: data.hots_search, //接口二
      info: project.info,
      total: project.total,
      //绑定的model
      cities_model: JSON.parse("[" + country + "]"),
      dities_model: JSON.parse("[" + railway + "]"),
      huxings_model: JSON.parse("[" + house_type + "]"),
      danjias_model: single_price,
      zongjias_model: total_price,
      mianjis_model: area,
      teses_model: JSON.parse("[" + feature + "]"),
      fenleis_model: type,
      danPrice_min: min_single_price,
      danPrice_max: max_single_price,
      zongPrice_min: min_total_price,
      zongPrice_max: max_total_price,
      area_min: min_area,
      area_max: max_area,
      active_order: order,
      currentPage1: parseInt(page),
      quyu_show_class: quyu_show_class,
      ditie_show_class: ditie_show_class,
      get_more_tiao: get_more_tiao,
      more_text: more_text,
    };
  },
  data() {
    return {
      cities: [],
      dities: [],
      huxings: [],
      danjias: [],
      zongjias: [],
      mianjis: [],
      teses: [],
      fenleis: [],

      get_more_tiao: false,
      quyu_show: true,
      ditie_show: false,

      quyu_show_class: true,
      ditie_show_class: false,

      more_text: "更多条件",
      quyu_more: false,
      gengduo_text: "+ 更多",
      value: [350, 600],
      max: 1000,
      hots_building: [],
      bigdata_option: {
        zongjia_flag: true,
        huxing_flag: false,
        quyu_flag: false,
        concat_flag: false,
        tan_flag: false,
      },
      //select绑定的model
      cities_model: [],
      dities_model: [],
      huxings_model: [],
      danjias_model: [],
      zongjias_model: "",
      mianjis_model: "",
      teses_model: [3, 4, 5, 7, 8, 6, 2],
      fenleis_model: "",

      length: {
        qu_leng: 11,
      },
      //range绑定的model
      danPrice_min: "",
      danPrice_max: "",
      zongPrice_min: "",
      zongPrice_max: "",
      area_min: "",
      area_max: "",

      phone: "",
      city: "",
      friends: [],
      hots_search: [],
      //中间数据定义
      info: [],
      total: "",
      currentPage1: 1,
      data_order: [
        { name: "默认排序" },
        { name: "单价" },
        { name: "开盘时间" },
      ],
      active_order: 0,
      //帮我找房
      telphone: "",
      bang_hu_active: -1,
      bang_qu_active: -1,
      routerData: [],

      nosou_pro:[],
      logo_text:"家园"
    };
  },
  created() {},
  beforeRouteLeave(to, from, next) {
    sessionStorage.removeItem("typearr");
    next();
  },
  watch: {},
  beforeMount(){
        let  mine = this.$store.state.style_mine;
        if(mine==1){ //易得房样式
            this.logo_text = "易得房";
        }else if(mine==2){ //家园样式
           this.logo_text = "家园";
        }
  },
  mounted() {
    if(this.info.length>0)
    {

    }else{
      this.getnoSou();
    }
    //区域 、地铁 、户型 、特色多选
    this.routerData = [
      {
        name: `${this.city.current.city}楼盘`,
        to: "",
      },
    ];
  },
  computed: {},
  methods: {
    getnoSou(){
      let city= sessionStorage.getItem("city_id");
      let token = localStorage.getItem('token');
        axios.get('/jy/recommend',{
          params:{
            city:city,
            count:6,
            token:token
          }
        }).then(res=>{
           if(res.data.code==200){
           //  console.log(res.data);
             this.nosou_pro=res.data.recommends
           }
        })
    },
    shangOne() {
      this.bigdata_option.zongjia_flag = true;
      this.bigdata_option.huxing_flag = false;
      this.bigdata_option.quyu_flag = false;
      this.bigdata_option.concat_flag = false;
    },
    shangTwo() {
      this.bigdata_option.zongjia_flag = false;
      this.bigdata_option.huxing_flag = true;
      this.bigdata_option.quyu_flag = false;
      this.bigdata_option.concat_flag = false;
    },
    formatTooltip(val) {
      return `${val}万`;
    },
    //大数据帮我找房
    huxing_sel(num, index) {
      sessionStorage.setItem("bang_hu", num);
      if (num == 0) {
        $(".buxian1").addClass("active");
        this.bang_hu_active = -1;
      } else {
        this.bang_hu_active = index;
        $(".buxian1").removeClass("active");
      }
    },
    quyu_sel(num, index) {
      sessionStorage.setItem("bang_qu", num);
      if (num == 0) {
        $(".buxian2").addClass("active");
        this.bang_qu_active = -1;
      } else {
        this.bang_qu_active = index;
        $(".buxian2").removeClass("active");
      }
    },
    bangZhaoFang() {
      //确认帮我找房
      let price = this.value;
      let quyu = "";
      let huxing = "";
      let token = localStorage.getItem("token");
      let huxing_id = sessionStorage.getItem("bang_hu");
      let qu_id = sessionStorage.getItem("bang_qu");
      let city = sessionStorage.getItem("city_id");
      var other = sessionStorage.getItem("other");
      var kid = sessionStorage.getItem("kid");
      if (qu_id == 0) {
        quyu = "不限";
      } else {
        quyu = qu_id;
      }

      if (huxing_id == 0) {
        huxing = "不限";
      } else {
        huxing = huxing_id;
      }
      let remark = `总价范围：${price[0]}万~ ${price[1]}万+户型${huxing}+区域${quyu}`;

      let number = this.telphone;
      let myreg = new RegExp("^[1][3,4,5,7,8][0-9]{9}$");
      if (number !== "") {
        if (!myreg.test(number)) {
          this.$message.error("手机号码不合法");
        } else {
          //同时报名
          axios
            .post("/front/flow/sign", {
              tel: number,
              ip: ip_arr["ip"],
              page: 10, //代表家园Pc
              project: "", //项目id
              remark: remark, // 备注
              source: "线上推广1", //线上推广3
              other: other,
              kid: kid,
              name: "", //客户名，没有传未知
              position: 110, // 报名位置
              city: 1,
            })
            .then((res) => {
              if (res.data.code == 200) {
                console.log(res.data.message);
              } else {
                console.log(res.data.message);
              }
            });
          axios({
            method: "get",
            url: "/jy/help/condition",
            params: {
              city: city,
              token: token,
              position: 110,
              remark: remark,
              tel: number,
            },
          }).then((res) => {
            if (res.data.code == 200) {
              this.$alert("信息提交成功", "提交成功", {
                confirmButtonText: "确定",
              });
              this.bigdata_option.tan_flag = false;
            } else {
              this.$message(res.data.message);
            }
          });
          //清除原始数据
          sessionStorage.removeItem("bang_hu");
          sessionStorage.removeItem("bang_qu");
        }
      } else {
        this.$message.error("手机号码不能为空");
      }
    },

    bianTong(num, project_id) {
      sessionStorage.setItem("bao_id", num);
      sessionStorage.setItem("project_id", project_id);
      switch (num) {
        case 104:
          this.$parent.$parent.baoming_tel.tan_title = "向TA咨询"; //ok
          this.$parent.$parent.baoming_tel.tan_content =
            "价格变动这么快？订阅楼盘变价通知，楼盘变价我们将第一时间通知您";
          this.$parent.$parent.baoming_tel.default_show = true;
          this.$parent.$parent.baoming_tel.kaipan_show = false;
          break;
      }
      this.$parent.$parent.baoming_tel.telflag = true;
    },
    getdata() {
      var token = localStorage.getItem("token");
      let order_all = this.$route.params.order;
      let city_id = sessionStorage.getItem("city_id");
      var arr_need = {};
      if (order_all) {
        let params_order = order_all.split("+");
        for (let i = 0; i < params_order.length; i++) {
          var item = params_order[i].split("-");
          arr_need[item[0]] = item[1];
        }
      }
      let country = "";
      if (arr_need.qyu) {
        country = arr_need.qyu;
      } else {
        country = "";
      }

      let type = "";
      if (arr_need.type) {
        type = arr_need.type;
      } else {
        type = "";
      }
      let total_price = "";
      if (arr_need.zprice) {
        total_price = arr_need.zprice;
      } else {
        total_price = "";
      }
      let min_total_price = "";
      if (arr_need.tot_min) {
        min_total_price = arr_need.tot_min;
      } else {
        min_total_price = "";
      }

      let max_total_price = "";
      if (arr_need.tot_max) {
        max_total_price = arr_need.tot_max;
      } else {
        max_total_price = "";
      }

      let single_price = "";
      if (arr_need.dprice) {
        single_price = arr_need.dprice;
      } else {
        single_price = "";
      }

      let min_single_price = "";
      if (arr_need.dan_min) {
        min_single_price = arr_need.dan_min;
      } else {
        min_single_price = "";
      }
      let max_single_price = "";
      if (arr_need.dan_max) {
        max_single_price = arr_need.dan_max;
      } else {
        max_single_price = "";
      }
      let area = "";
      if (arr_need.area) {
        area = arr_need.area;
      } else {
        area = "";
      }
      let min_area = "";
      if (arr_need.area_min) {
        min_area = arr_need.area_min;
      } else {
        min_area = "";
      }
      let max_area = "";
      if (arr_need.area_max) {
        max_area = arr_need.area_max;
      } else {
        max_area = "";
      }

      let house_type = ""; //户型
      if (arr_need.huxing) {
        house_type = arr_need.huxing;
      } else {
        house_type = "";
      }

      let railway = ""; //地铁
      if (arr_need.ditie) {
        railway = arr_need.ditie;
      } else {
        railway = "";
      }
      let feature = ""; //特色
      if (arr_need.tese) {
        feature = arr_need.tese;
      } else {
        feature = "";
      }
      let order = ""; //排序
      if (arr_need.order) {
        order = arr_need.order;
      } else {
        order = "";
      }
      let page = ""; //页码
      if (arr_need.page) {
        page = arr_need.page;
      } else {
        page = 1;
      }
      // var project = this.$route.params.id;
      // let match = project.match(/\d+/);
      // project = match[0];
      axios
        .get("/jy/search/info", {
          params: {
            city: city_id,
            page: arr_need.page,
            limit: 10,
            country: country,
            type: type,
            total_price: total_price,
            min_total_price: min_total_price,
            max_total_price: max_total_price,
            single_price: single_price,
            min_single_price: min_single_price,
            max_single_price: max_single_price,
            area: area,
            min_area: min_area,
            max_area: max_area,
            house_type: house_type,
            railway: railway,
            feature: feature,
            order: order,
            token: token,
          },
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.info = res.data.info;
          }
        });
    },
    getShou(id,val) {
      //项目收藏
      var token = localStorage.getItem("token");
      if (token !== "" && token !== null) {
        axios({
          method: "post",
          url: "/jy/collect",
          params: {
            token: token,
            id: id,
            type: 1,
          },
        })
          .then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.message);
              if(val==1){
                  this.getdata();
              }else if(val==2){
                  this.getnoSou();
              }
              
            } else {
              this.$message.error(res.data.message);
              this.$parent.$parent.loginTan = true;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.$message.error("请先登录");
        this.$parent.$parent.loginTan = true;
      }
    },
    clearTiao() {
      sessionStorage.removeItem("typearr");
      this.$router.push("/searchpro");
    },
    pageChange(num) {
      let has_arr = JSON.parse(sessionStorage.getItem("typearr"));
      let cur_page = num;
      if (has_arr) {
        has_arr.page = cur_page;
        sessionStorage.setItem("typearr", JSON.stringify(has_arr));
      } else {
        let arr = {};
        arr.page = cur_page;
        sessionStorage.setItem("typearr", JSON.stringify(arr));
        has_arr = JSON.parse(sessionStorage.getItem("typearr"));
      }
      for (var key in has_arr) {
        if (key == "page") {
          this.tostring(key, has_arr[key]);
        }
      }
    },
    show_zhaoafng() {
      this.bigdata_option.tan_flag = true;
    },
    closeTelTan() {
      $(".guan").css({
        transform: "rotate(90deg)",
        transition: " all 0.6s",
      });
      let _this = this;
      setTimeout(function () {
        _this.bigdata_option.tan_flag = false;
      }, 600);
      this.bigdata_option.zongjia_flag = true;
      this.bigdata_option.huxing_flag = false;
      this.bigdata_option.quyu_flag = false;
      this.bigdata_option.concat_flag = false;
      this.value = [0, 0];
    },
    next_one() {
      let newval = this.value;
      if (newval[0] == 0 && newval[1] == 0) {
        this.$message.error("请选择总价范围");
      } else {
        this.bigdata_option.zongjia_flag = false;
        this.bigdata_option.huxing_flag = true;
        this.bigdata_option.quyu_flag = false;
        this.bigdata_option.concat_flag = false;
      }
    },
    next_two() {
      let huxing_id = sessionStorage.getItem("bang_hu");
      if (huxing_id) {
        this.bigdata_option.zongjia_flag = false;
        this.bigdata_option.huxing_flag = false;
        this.bigdata_option.quyu_flag = true;
        this.bigdata_option.concat_flag = false;
      } else {
        this.$message.error("请选择您意向购买的户型");
      }
    },
    next_three() {
      let qu_id = sessionStorage.getItem("bang_qu");
      if (qu_id) {
        this.bigdata_option.zongjia_flag = false;
        this.bigdata_option.huxing_flag = false;
        this.bigdata_option.quyu_flag = false;
        this.bigdata_option.concat_flag = true;
      } else {
        this.$message.error("请选择您意向购买的区域");
      }
    },
    showQu() {
      this.quyu_show = true;
      this.ditie_show = false;
      this.quyu_show_class = true;
      this.ditie_show_class = false;
    },
    showDitie() {
      this.quyu_show = false;
      this.ditie_show = true;

      this.quyu_show_class = false;
      this.ditie_show_class = true;
    },
    orderDefault(val) {
      //默认排序
      var id = val;
      let has_arr = JSON.parse(sessionStorage.getItem("typearr"));
      if (has_arr) {
        has_arr.order = id;
        sessionStorage.setItem("typearr", JSON.stringify(has_arr));
        //判断是否有页码，将页码改为1
        for (var key in has_arr) {
          if (key == "page") {
            this.tostring(key, 1);
          }
        }
      } else {
        let arr = {};
        arr.order = id;
        sessionStorage.setItem("typearr", JSON.stringify(arr));
        has_arr = JSON.parse(sessionStorage.getItem("typearr"));
      }
      for (var key in has_arr) {
        if (key == "order") {
          this.tostring(key, has_arr[key]);
        }
      }
    },
    changeCities(val) {
      //城市多选
      let data_id = val;
      let has_arr = JSON.parse(sessionStorage.getItem("typearr"));
      if (has_arr) {
        //  if(has_arr.qyu){
        //     //let  zu_arr=  has_arr.qyu.concat(data_id);
        //     // has_arr.qyu = Array.from(new Set(zu_arr));
        //      sessionStorage.setItem("typearr", JSON.stringify(data_id));
        //      has_arr = JSON.parse(sessionStorage.getItem("typearr"));
        //  }else{
        has_arr.qyu = data_id;
        sessionStorage.setItem("typearr", JSON.stringify(has_arr));
        has_arr = JSON.parse(sessionStorage.getItem("typearr"));
        // }

        //判断是否有页码，将页码改为1
        for (var key in has_arr) {
          if (key == "page") {
            this.tostring(key, 1);
          }
        }
      } else {
        let arr = {};
        arr.qyu = data_id;
        sessionStorage.setItem("typearr", JSON.stringify(arr));
        has_arr = JSON.parse(sessionStorage.getItem("typearr"));
      }
      if (has_arr) {
        for (var key in has_arr) {
          if (key == "qyu") {
            this.tostring(key, has_arr[key]);
          }
        }
      }
    },
    changeDities(val) {
      //地铁多选
      let data_id = val;
      let has_arr = JSON.parse(sessionStorage.getItem("typearr"));
      if (has_arr) {
        // if(has_arr.ditie){
        //       let  zu_arr=  has_arr.ditie.concat(data_id);
        //       has_arr.ditie = Array.from(new Set(zu_arr));
        //       sessionStorage.setItem("typearr", JSON.stringify(has_arr));
        //       // //判断是否有页码，将页码改为1
        //       for(var key in has_arr){
        //           if(key=="page"){
        //             this.tostring(key,1);
        //           }
        //       }
        // }else{
        has_arr.ditie = data_id;
        sessionStorage.setItem("typearr", JSON.stringify(has_arr));
        has_arr = JSON.parse(sessionStorage.getItem("typearr"));
        //  }
      } else {
        let arr = {};
        arr.ditie = data_id;
        sessionStorage.setItem("typearr", JSON.stringify(arr));
        has_arr = JSON.parse(sessionStorage.getItem("typearr"));
      }
      if (has_arr) {
        for (var key in has_arr) {
          if (key == "ditie") {
            this.tostring(key, has_arr[key]);
          }
        }
      }
    },
    changeHuxings(val) {
      //户型多选
      let data_id = val;
      let has_arr = JSON.parse(sessionStorage.getItem("typearr"));
      if (has_arr) {
        //  if(has_arr.huxing){
        //     let  zu_arr=  has_arr.huxing.concat(data_id);
        //     has_arr.huxing = Array.from(new Set(zu_arr));
        //     sessionStorage.setItem("typearr", JSON.stringify(has_arr));
        //  }else{
        has_arr.huxing = data_id;
        sessionStorage.setItem("typearr", JSON.stringify(has_arr));
        has_arr = JSON.parse(sessionStorage.getItem("typearr"));
        //   }

        // //判断是否有页码，将页码改为1
        for (var key in has_arr) {
          if (key == "page") {
            this.tostring(key, 1);
          }
        }
      } else {
        let arr = {};
        arr.huxing = data_id;
        sessionStorage.setItem("typearr", JSON.stringify(arr));
        has_arr = JSON.parse(sessionStorage.getItem("typearr"));
      }
      if (has_arr) {
        for (var key in has_arr) {
          if (key == "huxing") {
            this.tostring(key, has_arr[key]);
          }
        }
      }
    },
    changeDanjias(val) {
      //单价单选
      var data_id = val;
      sessionStorage.setItem("danjia_id", val);
      let has_arr = JSON.parse(sessionStorage.getItem("typearr"));
      if (has_arr) {
        if (
          has_arr.hasOwnProperty("dan_min") &&
          has_arr.hasOwnProperty("dan_max")
        ) {
          delete has_arr["dan_min"];
          delete has_arr["dan_max"];
        }

        has_arr.dprice = data_id;
        sessionStorage.setItem("typearr", JSON.stringify(has_arr));
        // //判断是否有页码，将页码改为1
        // for(var key in has_arr){
        //     if(key=="page"){
        //       this.tostring(key,1);
        //     }
        // }
      } else {
        let arr = {};
        arr.dprice = data_id;
        sessionStorage.setItem("typearr", JSON.stringify(arr));
        has_arr = JSON.parse(sessionStorage.getItem("typearr"));
      }
      if (has_arr) {
        for (var key in has_arr) {
          if (key == "dprice") {
            this.tostring(key, has_arr[key]);
          }
        }
      }
    },
    danjiaRange() {
      //单价范围
      var danprice = sessionStorage.getItem("danjia_id"); //单价选项的id
      if (this.danPrice_min !== "" && this.danPrice_max !== "") {
        if (parseInt(this.danPrice_min) < parseInt(this.danPrice_max)) {
          let has_arr = JSON.parse(sessionStorage.getItem("typearr"));
          if (has_arr) {
            if (has_arr.hasOwnProperty("dprice")) {
              delete has_arr["dprice"];
            }
            has_arr.dan_max = parseInt(this.danPrice_max);
            has_arr.dan_min = parseInt(this.danPrice_min);
            sessionStorage.setItem("typearr", JSON.stringify(has_arr));
          } else {
            let arr = {};
            arr.dan_max = parseInt(this.danPrice_max);
            arr.dan_min = parseInt(this.danPrice_min);
            sessionStorage.setItem("typearr", JSON.stringify(arr));
            has_arr = JSON.parse(sessionStorage.getItem("typearr"));
          }
          for (var key in has_arr) {
            if (key == "dan_max") {
              this.tostring(key, has_arr[key]);
            }
            if (key == "dan_min") {
              this.tostring(key, has_arr[key]);
            }
          }
        } else {
          this.$message.error("请输入正确的单价区间");
        }
        sessionStorage.removeItem("zongjia_id");
        this.num2 = -1;
      } else if (danprice !== null) {
        this.danPrice_min == "";
        this.danPrice_max == "";
      } else {
        this.$message.error("范围区间内容不能为空");
      }
    },
    changeZongjias(val) {
      //总价单选
      sessionStorage.setItem("zongjia_id", val);
      var data_id = val;
      let has_arr = JSON.parse(sessionStorage.getItem("typearr"));
      if (has_arr) {
        if (
          has_arr.hasOwnProperty("tot_min") &&
          has_arr.hasOwnProperty("tot_max")
        ) {
          delete has_arr["tot_min"];
          delete has_arr["tot_max"];
        }

        has_arr.zprice = data_id;
        sessionStorage.setItem("typearr", JSON.stringify(has_arr));
        //判断是否有页码，将页码改为1
        // for(var key in has_arr){
        //     if(key=="page"){
        //       this.tostring(key,1);
        //     }
        // }
      } else {
        let arr = {};
        arr.zprice = data_id;
        sessionStorage.setItem("typearr", JSON.stringify(arr));
        has_arr = JSON.parse(sessionStorage.getItem("typearr"));
      }

      for (var key in has_arr) {
        if (key == "zprice") {
          this.tostring(key, has_arr[key]);
        }
      }
    },
    zongJiaRange() {
      //总价范围
      var totalprice = sessionStorage.getItem("zongjia_id"); //总价选项的id
      if (this.zongPrice_min !== "" && this.zongPrice_max !== "") {
        if (parseInt(this.zongPrice_min) < parseInt(this.zongPrice_max)) {
          let has_arr = JSON.parse(sessionStorage.getItem("typearr"));
          if (has_arr) {
            if (has_arr.hasOwnProperty("zprice")) {
              delete has_arr["zprice"];
            }
            has_arr.tot_max = parseInt(this.zongPrice_max);
            has_arr.tot_min = parseInt(this.zongPrice_min);
            sessionStorage.setItem("typearr", JSON.stringify(has_arr));
          } else {
            let arr = {};
            arr.tot_max = parseInt(this.zongPrice_max);
            arr.tot_min = parseInt(this.zongPrice_min);
            sessionStorage.setItem("typearr", JSON.stringify(arr));
            has_arr = JSON.parse(sessionStorage.getItem("typearr"));
          }
          for (var key in has_arr) {
            if (key == "tot_max") {
              this.tostring(key, has_arr[key]);
            }
            if (key == "tot_min") {
              this.tostring(key, has_arr[key]);
            }
          }
        } else {
          this.$message.error("请输入正确的总价区间");
        }
        sessionStorage.removeItem("zongjia_id");
        this.num2 = -1;
      } else if (totalprice !== null) {
        this.zongPrice_min == "";
        this.zongPrice_max == "";
      } else {
        this.$message.error("范围区间内容不能为空");
      }
    },
    changeMianjis(val) {
      //面积单选
      sessionStorage.setItem("area_id", val);
      var data_id = val;
      let has_arr = JSON.parse(sessionStorage.getItem("typearr"));
      if (has_arr) {
        if (
          has_arr.hasOwnProperty("area_min") &&
          has_arr.hasOwnProperty("area_max")
        ) {
          delete has_arr["area_min"];
          delete has_arr["area_max"];
        }
        has_arr.area = data_id;
        sessionStorage.setItem("typearr", JSON.stringify(has_arr));
        //判断是否有页码，将页码改为1
        // for(var key in has_arr){
        //     if(key=="page"){
        //       this.tostring(key,1);
        //     }
        // }
      } else {
        let arr = {};
        arr.area = data_id;
        sessionStorage.setItem("typearr", JSON.stringify(arr));
        has_arr = JSON.parse(sessionStorage.getItem("typearr"));
      }

      for (var key in has_arr) {
        if (key == "area") {
          this.tostring(key, has_arr[key]);
        }
      }
    },
    areaRange() {
      //面积范围
      var area_id = sessionStorage.getItem("area_id"); //面积选项的id
      if (this.area_min !== "" && this.area_max !== "") {
        if (parseInt(this.area_min) < parseInt(this.area_max)) {
          let has_arr = JSON.parse(sessionStorage.getItem("typearr"));
          if (has_arr) {
            if (has_arr.hasOwnProperty("area")) {
              delete has_arr["area"];
            }
            has_arr.area_max = parseInt(this.area_max);
            has_arr.area_min = parseInt(this.area_min);
            sessionStorage.setItem("typearr", JSON.stringify(has_arr));
          } else {
            let arr = {};
            arr.area_max = parseInt(this.area_max);
            arr.area_min = parseInt(this.area_min);
            sessionStorage.setItem("typearr", JSON.stringify(arr));
            has_arr = JSON.parse(sessionStorage.getItem("typearr"));
          }
          for (var key in has_arr) {
            if (key == "area_min") {
              this.tostring(key, has_arr[key]);
            }
            if (key == "area_max") {
              this.tostring(key, has_arr[key]);
            }
          }
        } else {
          this.$message.error("请输入正确的面积区间");
        }
        sessionStorage.removeItem("zongjia_id");
        this.num2 = -1;
      } else if (totalprice !== null) {
        this.area_min == "";
        this.area_max == "";
      } else {
        this.$message.error("范围区间内容不能为空");
      }
    },
    changeTeses(val) {
      //特色多选
      let data_id = val;
      let has_arr = JSON.parse(sessionStorage.getItem("typearr"));
      if (has_arr) {
        //  if(has_arr.tese){
        //     let  zu_arr=  has_arr.tese.concat(data_id);
        //     has_arr.tese = Array.from(new Set(zu_arr));
        //     sessionStorage.setItem("typearr", JSON.stringify(has_arr));
        //     //判断是否有页码，将页码改为1
        //     for(var key in has_arr){
        //         if(key=="page"){
        //           this.tostring(key,1);
        //         }
        //     }
        // }else{
        has_arr.tese = data_id;
        sessionStorage.setItem("typearr", JSON.stringify(has_arr));
        has_arr = JSON.parse(sessionStorage.getItem("typearr"));
        // }
      } else {
        let arr = {};
        arr.tese = data_id;
        sessionStorage.setItem("typearr", JSON.stringify(arr));
        has_arr = JSON.parse(sessionStorage.getItem("typearr"));
      }
      if (has_arr) {
        for (var key in has_arr) {
          if (key == "tese") {
            this.tostring(key, has_arr[key]);
          }
        }
      }
    },
    changeFenleis(val) {
      //类型单选
      var data_id = val;
      let has_arr = JSON.parse(sessionStorage.getItem("typearr"));
      if (has_arr) {
        has_arr.type = data_id;
        sessionStorage.setItem("typearr", JSON.stringify(has_arr));
        //判断是否有页码，将页码改为1
        // for(var key in has_arr){
        //     if(key=="page"){
        //       this.tostring(key,1);
        //     }
        // }
      } else {
        let arr = {};
        arr.type = data_id;
        sessionStorage.setItem("typearr", JSON.stringify(arr));
        has_arr = JSON.parse(sessionStorage.getItem("typearr"));
      }
      for (var key in has_arr) {
        if (key == "type") {
          this.tostring(key, has_arr[key]);
        }
      }
    },
    tostring(name, val) {
      let url = this.$route.path;
      let type = JSON.parse(sessionStorage.getItem("typearr"));
      type[name] = val;
      sessionStorage.setItem("typearr", JSON.stringify(type));
      let str = "";
      for (let key in type) {
        str += key + "-" + type[key] + "+";
      }
      str = str.substring(0, str.length - 1);
      this.$router.push(`/searchpro/${str}`);
    },
    getMoreTiao() {
      if (this.more_text == "更多条件") {
        this.get_more_tiao = true;
        this.more_text = "收起选项";
      } else if (this.more_text == "收起选项") {
        this.get_more_tiao = false;
        this.more_text = "更多条件";
      }
    },
    getMoreXuan() {
      if (this.gengduo_text == "+ 更多") {
        this.length.qu_leng = this.cities.length;
        this.gengduo_text = "- 收起";
      } else if (this.gengduo_text == "- 收起") {
        this.length.qu_leng = 11;
        this.gengduo_text = "+ 更多";
      }
    },
  },
};
</script>
<style lang="less" scoped>
/deep/
.yema{
    .el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: #20C658;
        color: #FFF;
    }
}
/deep/ .block {
  position: relative;
  .left_value {
    width: 80px;
    height: 36px;
    background: #ffffff;
    border: 1px solid #f5f5f5;
    box-shadow: 1px 3px 10px 0px rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    position: absolute;
    left: 132px;
    h6 {
      font-size: 20px;
      font-family: "Microsoft YaHei";
      font-weight: bold;
      color: #2ac66e;
      line-height: 19px;
      text-align: center;
      line-height: 36px;
      height: 36px;
    }
  }
  .left_value::before {
    width: 0;
    height: 0;
    position: absolute;
    content: "";
    right: 33px;
    top: 38px;
    border-right: 7px dashed transparent;
    border-top: 7px solid currentColor;
    border-left: 7px dashed transparent;
    color: #fff;
    box-shadow: 1px 3px 10px 0px rgba(0, 0, 0, 0.05);
  }
  .right_value {
    width: 80px;
    height: 36px;
    background: #ffffff;
    border: 1px solid #f5f5f5;
    box-shadow: 1px 3px 10px 0px rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    position: absolute;
    right: 115px;
    h6 {
      font-size: 20px;
      font-family: "Microsoft YaHei";
      font-weight: bold;
      color: #2ac66e;
      line-height: 19px;
      text-align: center;
      line-height: 36px;
      height: 36px;
    }
  }
  .right_value::before {
    width: 0;
    height: 0;
    position: absolute;
    content: "";
    right: 34px;
    top: 38px;
    border-right: 7px dashed transparent;
    border-top: 7px solid currentColor;
    border-left: 7px dashed transparent;
    color: #fff;
    box-shadow: 1px 3px 10px 0px rgba(0, 0, 0, 0.05);
  }
  .el-slider__bar {
    background: #2ac66e;
  }
  .el-slider__button {
    border: 2px solid #2ac66e;
  }
}
/deep/ .el-slider__stop {
  background: #ededed;
}
/deep/ .el-slider__runway {
  margin: 60px 0;
}
/deep/.xianshi {
  width: 100px;
  height: 50px;
  display: block;
}
/deep/.show_qu {
  .el-checkbox-group {
    .el-checkbox {
      margin-bottom: 5px;
    }
  }
}
/deep/.tiaojian_box {
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
    background-color: #409eff !important;
  }
  .el-radio__input.is-checked .el-radio__inner::after {
    transform: rotate(45deg) scaleY(1) !important;
  }
}

@import "../../assets/css/search.less";
</style>

