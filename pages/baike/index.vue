<template>
  <div class="page">
    <my-header 
              :all="common.city_info.all"
              :telphone="common.phone" ref="header"></my-header>
    <my-mianbao :router_data="routerData"></my-mianbao>
    <div class="baike">
      <div class="baike_left">
        <h3>
          买房
          <span>小知识</span>
        </h3>
        <div class="select_box">
          <h4>买房前</h4>
          <ul>
            <li v-for="(item,index) in before" :key="index" 
              :class="item.id==num ? 'active' : '' "
               @click="selType(item.id,index)"
              >{{item.name}}</li>
          </ul>
          <h4>买房中</h4>
          <ul>
            <li v-for="(item,index) in buying" :key="index"
             :class="item.id==num ? 'active' : '' "
             @click="selType(item.id,index)">{{item.name}}</li>
          </ul>
          <h4>买房后</h4>
          <ul>
            <li  v-for="(item,index) in after" :key="index" 
             :class="item.id==num ? 'active' : '' "
             @click="selType(item.id,index)">{{item.name}}</li>
          </ul>
        </div>
      </div>
      <div class="baike_right">
        <!-- 中间百科 -->
        <div class="middle_wen">
          <div class="img_box">
            <div class="left_img">
              <nuxt-link :to="`/article/${focus_1.id}`">
              <img :src="focus_1.img" alt />
              <p>{{focus_1.title}}</p>
              </nuxt-link>
            </div>
            <div class="right_img">
              <div class="top_img">
                <div class="small_box">
                   <nuxt-link :to="`/article/${focus_2.id}`">
                      <img :src="focus_2.img" alt />
                      <p>{{focus_2.title}}</p>
                   </nuxt-link>
                </div>
                <div class="small_box">
                    <nuxt-link :to="`/article/${focus_3.id}`">
                      <img :src="focus_3.img" alt />
                      <p>{{focus_3.title}}</p>
                    </nuxt-link>
                </div>
              </div>
              <div class="bottom_img">
                 <nuxt-link :to="`/article/${focus_4.id}`">
                    <img :src="focus_4.img" alt />
                    <p>{{focus_4.title}}</p>
                 </nuxt-link>
              </div>
            </div>
          </div>
          <ul class="wen_list">
            <li v-for="item in article_list" :key="item.id">
              <nuxt-link :to="`/article/${item.id}`">
                <img :src="item.img" alt="">
                <div class="content">
                    <h3>{{item.title}}</h3>
                    <p class="neirong">{{item.description}}</p>
                    <p class="time">{{item.begin}}</p>
                    <p class="tag">
                        <span v-for="ite in item.tags" :key="ite.id">{{ite}}</span>
                    </p>
                </div>
              </nuxt-link>
            </li>
          </ul>
          <div class="yema">
                <el-pagination
                background
                :hide-on-single-page=true
                layout="prev, pager, next"
                :total="total"
                 @current-change="pageChange"
                :current-page.sync="currentPage1"
                >
              </el-pagination>
          </div>
        </div>
        <!-- 免费咨询 -->
        <div class="right_news">
            <div class="mian_zi">
               <h3>免费咨询</h3>
               <p>对买房有疑问，投资买房会亏损？</p>
               <p>想了解房价行情，投资贷款等</p>
               <p>专业置业顾问帮您解决问题</p>
               <input type="text" placeholder="输入您手机号"
                 maxlength="11"
                 id="mianzi_phone"
                 v-model="mianzi_phone"
                 >
               <button @click="tijiaoDong(104)">免费咨询</button>
            </div>
               <!-- 热点新闻10条 -->
              <div class="hot_news">
                  <h3>热点新闻</h3>
                  <ul>
                    <li v-for="item in hot_news" :key="item.id">
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
                       <img :src="item.img" alt="">
                       <div class="project_content">
                           <h3>{{item.name}}</h3>
                           <p class="jiage">{{item.price}}元/m²起</p>
                           <p class="jian_mian">建面 {{item.area}}m²</p>
                           <p class="address">{{item.address}}</p>
                       </div>
                        </nuxt-link>
                    </li>
                  </ul>
                  <button><nuxt-link to="/searchpro">更多楼盘</nuxt-link></button>
              </div>
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
import soubox from "~/components/mianbaoZi.vue";
import footer from '~/components/footer.vue';
import tuyanMa from "~/components/tuyan.vue";
import axios from 'axios';
import $ from 'jquery';
export default {
    middleware: 'metaTitle',
    head() {
    return {
      title:this.common.header.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.common.header.description
        },
        { hid: "Keywords", name: "Keywords", content: this.common.header.keywords}
      ]
    };
  },
    meta: {title: '买房百科'},
    watchQuery:['page','type'],
    async asyncData({ app, query, params, store }) {
      let  uuid =query.uuid;
      if(uuid && uuid!=="undefined" && uuid!=="null"){
        uuid= uuid;
      }else{
         uuid="";
      }
      let type= query.type;
      let page =query.page;
      if(page==undefined){
         page=1;
      }
      let [data,article] = await Promise.all([
        //参数
        // city
        // token
        app.$axios.get(`/jy/wiki/condition?city=${store.state.city_id}&token=${store.state.token}&uuid=${uuid}`).then((res) => {
          if (res.data.code == 200) {
            let data = res.data;
            return data;
          }
        }),
        //参数
      //  city
      // position 文章位置id
      // page 第几页
      // limit 每页几条
         app.$axios.get(`/jy/article/info?position=${type}&city=${store.state.city_id}&page=${page}&uuid=${store.state.uuid}`).then((res) => {
          if (res.data.code == 200) {
            let data = res.data;
            return data;
          }
        }),
      ]);
      return{
            common:data.common,
            recommands:data.recommands,
            hot_news:data.articles.hot_news,
            focus_1:data.articles.focus_1,
            focus_2:data.articles.focus_2,
            focus_3:data.articles.focus_3,
            focus_4:data.articles.focus_4,
            total:article.total,
            article_list:article.data,
            num:query.type,
            currentPage1:parseInt(query.page),
      }
    },
  data() {
    return {
      common:{},
      recommands:[],
      hot_news:[],
      focus_1:{},
      focus_2:{},
      focus_3:{},
      focus_4:{},
      total:'',
      article_list:[],
      num:0,
      before:[
        { "id":'56',
          "name":'买房资格',
        },
         { "id":'57',
          "name":'买房能力',
         },
          { "id":'58',
          "name":'买房政策',
         },
          { "id":'59',
          "name":'买房流程',
         }],
      buying:[
        { "id":'60',
          "name":'新房签约',
        },
         { "id":'61',
          "name":'交纳定金',
         },
          { "id":'62',
          "name":'贷款政策',
         },
          { "id":'63',
          "name":'商业贷款',
         },
          { "id":'64',
          "name":'公积金贷款',
         },
         { "id":'65',
          "name":'还款',
          },
          { "id":'66',
          "name":'全款',
          },
         ],
      after:[
        { "id":'67',
          "name":'新房验房',
        },
         { "id":'68',
          "name":'物业',
         },
          { "id":'69',
          "name":'退房流程',
         },
          { "id":'70',
          "name":'落户',
         },
         ],
      currentPage1:1,
      mianzi_phone:'',
      myremark:'',
      routerData:[],

    };
  },
  components: {
    "my-header": header,
    "my-mianbao": soubox,
    "my-footer" : footer,
     "my-tu-yan": tuyanMa,
  },
  methods:{
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
     selType(type, ind) {
      this.num = type;
      this.$router.push(`/baike?type=${type}&page=1`);
    }, 
    pageChange(num) {
     // var point = sessionStorage.getItem("sel-type");
      this.page = num;
      let path=this.$route.fullPath;
      let str=path.split('?')[1].split('&');
      let arr={};
      for(let i=0 ;i<str.length;i++){
         var item=str[i].split('=');
         arr[item[0]]=item[1];
      }
      this.$router.push(`/baike?type=${arr.type}&page=${num}`)

    },
  },
  mounted() {
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

     this.routerData = [
       {
         "name":"买房百科",
         "to":''
       }
    ];

      this.myremark = "买房百科+免费咨询"
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
@import "../../assets/css/baike.less";
</style>