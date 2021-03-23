<template>
  <div class="fang_zi">
    <my-header 
              :all="common.city_info.all"
              :telphone="common.phone"
              ref="header"></my-header>
    <my-mianbao ref="mianbao" v-model="value"  :router_data="routerData"></my-mianbao>
    <div class="fangzi_page">
      <div class="left_zixun">
         <div class="sou_rasult">
            <h2>共为您搜索到<span>{{this.total}}</span>条关于“<span>{{this.value}}</span>”的资讯</h2> 
         </div>
         <!-- 中间文章 --> 
        <ul class="mid_wen">
            <li v-for="item in data" :key="item.id">
              <nuxt-link :to="`/article/${item.id}`">
                <img :src="item.img" alt="">
                <div class="text_box">
                    <h4 v-html="item.title">
                    </h4>
                    <p class="content" v-html="item.description">
                    </p>
                    <p class="time">{{item.time}}<span>来源：{{item.source}}</span></p>
                </div>
              </nuxt-link>
            </li>
        </ul>
         <!-- 页码 --> 
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
      <div class="right_zixun">
         <div class="mian_zi">
          <h3>免费咨询</h3>
          <p>对买房有疑问，投资买房会亏损？</p>
          <p>想了解房价行情，投资贷款等</p>
          <p>专业置业顾问帮您解决问题</p>
          <input type="text" placeholder="输入您手机号"
                 maxlength="11"
                 id="mianzi_phone"
                 v-model="mianzi_phone" />
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
            <li v-for="item in articles" :key="item.id">
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
            <li v-for="item in recommends" :key="item.id">
              <nuxt-link :to="`/content/${item.id}`">
                <img :src="item.img" alt />
                <div class="project_content">
                  <h3>{{item.name}}</h3>
                  <p class="jiage">{{item.price}}元/m²起</p>
                  <p class="jian_mian">建面 {{item.area}}m²</p>
                  <p class="address">{{item.address}}</p>
                </div>
              </nuxt-link>
            </li>
          </ul>
          <button>
            <nuxt-link to="/searchpro">更多楼盘
            </nuxt-link>
            </button>
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
import axios from "axios";
import $ from 'jquery';
import tuyanMa from "~/components/tuyan.vue";
export default {
  components: {
    "my-header": header,
    "my-mianbao": mianbao,
    "my-footer": footer,
     "my-tu-yan": tuyanMa,
  },
  head() {
    return {
      title:`${this.logo_text}新房-资讯搜索` ,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `${this.logo_text}新房-资讯搜索`
        },
        { hid: "Keywords", name: "Keywords", content: `${this.logo_text}新房-资讯搜索` }
      ]
    };
  },
  watchQuery:["name",'page'],
  async asyncData({ app, query, params, store }) {
      
      let name = encodeURI(query.name);
      let page = query.page;

      let uuid = query.uuid;
      if(uuid && uuid!=="undefined" && uuid!=="null"){
        uuid =uuid;
      }else{
         uuid="";
      }
      let [data,article] = await Promise.all([
        //参数
        // city 城市
        // token   ***右侧结构数据**
        app.$axios.get(`/jy/article/search?city=${store.state.city_id}&token=${store.state.token}&uuid=${uuid}`).then((res) => {
          if (res.data.code == 200) {
            let data = res.data;
            return data;
          }
        }),
      // 参数：
      // name 搜索关键词
      // limit 每页几条
      // page 第几页
        app.$axios.get(`/api/article/e_search?name=${name}&page=${page}&uuid=${uuid}`).then((res) => {
          if (res.data.code == 200) {
            let data = res.data;
            return data;
          }
        })
      ]);
       return{
         common:data.common,
         recommends:data.recommends,
         articles:data.articles,
         data:article.data,
         total: article.total,
         value:query.name,
         currentPage1:parseInt(query.page)
       }
    },
  data() {
    return {
       value:'',
       data:[],
       total:100,
       currentPage1:1,
        mianzi_phone:'',
        myremark:'',
        routerData:[],
        logo_text:"家园"
    };
  },
  beforeMount(){
       let  mine = this.$store.state.style_mine;
        if(mine==1){ //易得房样式
            this.logo_text = "易得房";
        }else if(mine==2){ //家园样式
           this.logo_text = "家园";
        }
  },
  mounted(){
     let  token = localStorage.getItem('token');
      let old_tel=localStorage.getItem("old_tel");
      if(token && old_tel){
          this.mianzi_phone=old_tel;
      }else {
      }
      
     this.myremark = "资讯搜索页+免费咨询",
    this.routerData = [
       {
         "name":"资讯搜索",
         "to":''
       }
    ];
  },
  created() {},
  updated(){
  },
  computed: {},
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
     pageChange(num){
        let str = this.$route.query.name;
         console.log(str);
         this.$router.push(`/fangzisearch?name=${str}&page=${num}`);
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
/deep/.text_box{
  h4{
    em{
       color: #FF5543;
    }
  }
   .content{
       em{
          color: #FF5543;
       }
    }
}
@import "../../assets/css/fangzisearch.less";
</style>
