<template>
  <div class="fang_zi">
    <my-header 
              :all="common.city_info.all"
              :telphone="common.phone"
              ref="header"></my-header>
    <my-mianbao  :router_data="routerData"></my-mianbao>
    <div class="fangzi_page">
      <div class="left_zixun">
        <!-- 顶部轮播 -->
        <div class="top_lun">
          <div class="left_lun">
            <el-carousel height="340px" v-if="focus_1.length!==0 && focus_1!==null">
              <el-carousel-item v-for="item in focus_1" :key="item.id">
                <nuxt-link :to="`/article/${item.id}`">
                <div class="lun_img" >
                  <img :src="item.img" alt />
                  <p>{{item.title}}</p>
                </div>
                </nuxt-link>
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="right_img">
            <div class="top_zi">
              <div class="small" v-if="focus_2!==null">
                <nuxt-link :to="`/article/${focus_2.id}`">
                  <img :src="focus_2.img" alt />
                  <p>{{focus_2.title}}</p>
                </nuxt-link>
              </div>
              <div class="small" v-if="focus_3!==null">
                  <nuxt-link :to="`/article/${focus_3.id}`">
                      <img
                        :src="focus_3.img"
                        alt
                      />
                      <p>{{focus_3.title}}</p>
                  </nuxt-link>
              </div>
            </div>
            <div class="bottom_zi" v-if="focus_4!==null">
               <nuxt-link :to="`/article/${focus_4.id}`">
                  <img :src="focus_4.img" alt />
                  <p>{{focus_4.title}}</p>
               </nuxt-link>
            </div>
          </div>
        </div>
        <!-- nav部分 -->
        <ul class="nav_list">
            <li :class="item.id==active?'active':''" v-for="item in type" :key="item.id"
             @click="selectZixunSSR(item.id)">{{item.name}}</li>
        </ul>
         <!-- 中间文章 --> 
        <ul class="mid_wen">
            <li v-for="item in data" :key="item.id">
              <nuxt-link :to="`/article/${item.id}`">
                  <img :src="item.img" alt="">
                  <div class="text_box">
                      <h4>{{item.title}}</h4>
                      <p class="content">{{item.description}}</p>
                      <p class="time"> {{item.begin}}<span>来源：{{item.source}}</span></p>
                  </div>
              </nuxt-link>
            </li>
        </ul>
         <!-- 页码 --> 
        <div class="yema">
             <el-pagination
            background
            layout="prev, pager, next"
             :hide-on-single-page=true
            :total="com_total"
            :current-page.sync="currentPage1"
            @current-change="changePage">
            </el-pagination>
         </div>
      </div>
      <div class="right_zixun">
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
        <!-- 热点新闻10条 -->
        <div class="hot_news">
          <h3>买房百科 <span>
              <nuxt-link to="/baike?type=56&page=1">
              更多>
              </nuxt-link>
              </span></h3>
          <ul>
            <li v-for="item in wikis" :key="item.id">
              <nuxt-link :to="`/article/${item.id}`">
                {{item.title}}
              </nuxt-link>
            </li>
          </ul>
        </div>
        <!-- 推荐楼盘 -->
        <div class="tui_lou">
          <h2>推荐楼盘</h2>
          <ul>
            <li v-for="item in recommands" :key="item.id">
              <nuxt-link :to="`/content/${item.id}`">
                  <img :src="item.img" alt />
                  <div class="project_content">
                    <h3>{{item.name}}</h3>
                    <p class="jiage">{{item.price}}元/m²起</p>
                    <p class="jian_mian">建面 {{item.price}}m²</p>
                    <p class="address">{{item.address}}</p>
                  </div>
              </nuxt-link>
            </li>
          </ul>
          <button>
            <nuxt-link to="/searchpro">
            更多楼盘
            </nuxt-link></button>
        </div>
      </div>
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
import mianbao from "~/components/mianbaoZi.vue";
import footer from "~/components/footer.vue";
import tuyanMa from "~/components/tuyan.vue";
import $ from 'jquery';
import axios from 'axios';

export default {
    middleware: 'metaTitle',
    meta: {title: '房产资讯'},
    head() {
    return {
      title:this.common.header.title ,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.common.header.description
        },
        { hid: "Keywords", name: "Keywords", content: this.common.header.keywords  }
      ]
    };
  },
  components: {
    "my-header": header,
    "my-mianbao": mianbao,
    "my-footer": footer,
    "my-tu-yan": tuyanMa,
  },
    async asyncData({ app, query, params, store }) {
      let  typeId = params.pathMatch.split("/");
      let page = typeId[1];
      let point = typeId[0];

      let uuid =query.uuid;
      if(uuid && uuid!=="undefined" && uuid!=="null"){
        uuid=uuid
      }else{
        uuid=""
      }
      let [data,article,dongtai] = await Promise.all([
        //参数
        // city 城市
        // token   ***轮播图和右侧结构部分**
        app.$axios.get(`/jy/article/news?city=${store.state.city_id}&uuid=${uuid}&token=${store.state.token}`).then((res) => {
          if (res.data.code == 200) {
            let data = res.data;
            return data;
          }
        }),
      // city
      // position 文章位置id
      // page 第几页
      // limit 每页几条    ***中间文章部分****
         app.$axios.get(`/jy/article/info?city=${store.state.city_id}&position=${point}&page=${page}&uuid=${store.state.uuid}`).then((res) => {
          if (res.data.code == 200) {
            let data = res.data;
            return data;
          }
        }),
        //  city 城市  page 页码 limit 每页几条
       //   ***楼盘动态部分***
        app.$axios.get(`/jy/dynamic/info/phone?city=${store.state.city_id}&page=${page}`).then((res) => {
          if (res.data.code == 200) {
            let data = res.data;
            return data;
          }
        }),
      ]);
       return{
          common:data.common,
          recommands:data.recommands,
          focus_1:data.articles.focus_1,
          focus_2:data.articles.focus_2,
          focus_3:data.articles.focus_3,
          focus_4:data.articles.focus_4,
          wikis:data.articles.wikis,
          data:article.data,
          total:article.total,
          active:point,
          currentPage1:parseInt(page),
          dongtai:dongtai.data,
          dongtai_total:dongtai.total,
          com_total:article.total,
       }
    },
  data() {
    return {
       common:{},
       recommands:[],
       focus_1:[],
       focus_2:{},
       focus_3:{},
       focus_4:{},
       wikis:[],
       data:[],
       total:"",
       type:[
         { "id":46,
           "name":"楼盘导购"
         },
         {"id":48,
           "name":"本地楼市"},
         {"id":49,
           "name":"房企资讯"},
         {"id":50,
           "name":"热点新闻"},
         {"id":51,
           "name":"成交报告"},
         {"id":52,
           "name":"土拍成交"},
         {"id":1,
           "name":"楼盘动态"},
       ],
       active:0,
       currentPage1:1,
       dongtai:[],
       dongtai_total:"",
       com_total:'',
       mianzi_phone:'',
       myremark:'',
       routerData:[],
    };
  },
  created() {},
  computed: {},
  mounted(){
    this.$store.commit('setCityId', this.common.city_info.current.area_id)
    $cookies.set('city_id',this.common.city_info.current.area_id)
    sessionStorage.setItem('city_name',this.common.city_info.current.short)
    sessionStorage.setItem('city_id',this.common.city_info.current.area_id)
      let  token = localStorage.getItem('token');
      let old_tel=localStorage.getItem("old_tel");
      if(token && old_tel){
          this.mianzi_phone=old_tel;
      }else {
      }


      this.myremark = "房产资讯+免费咨询",
       this.routerData = [
       {
         "name":"房产资讯",
         "to":''
       }
    ];
  },
  methods: {
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
      selectZixunSSR(id){
        sessionStorage.setItem("tab_id", id);
        if(id==1){
              this.$router.push(`/fangzidong?page=1`);
        }else{
              this.$router.push(`/fangzi/${id}/1`);
        }
      },
      changePage(num) {
            let  params = this.$route.params.pathMatch;
            let point='';
            if(params){
              point=params.split('/')[0];
            }
            this.$router.push(`/fangzi/${point}/${num}`);
        }
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
@import "../../assets/css/fangzi.less";
</style>
