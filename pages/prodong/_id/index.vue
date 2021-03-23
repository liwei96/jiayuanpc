<template>
  <div class="prodongpage">
    <my-header 
              :all="common.city_info.all"
              :telphone="common.phone"
              ref="header"></my-header>
    <my-mianbao :router_data="routerData"></my-mianbao>
    <div class="proDong">
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
          <li><nuxt-link :to="`/loudetail/${building.id}`">楼盘详情</nuxt-link></li>
          <li><nuxt-link :to="`/prohuxing/${building.id}`">主力户型</nuxt-link></li>
          <li class="active"><nuxt-link :to="`/prodong/${building.id}?page=1`">楼盘动态</nuxt-link></li>
          <li><nuxt-link :to="`/propic/${building.id}`">楼盘相册</nuxt-link></li>
          <li><nuxt-link :to="`/prowenda/${building.id}?page=1`">楼盘问问</nuxt-link></li>
          <li><nuxt-link :to="`/prodian/${building.id}?page=1`">楼盘点评</nuxt-link></li>
        </ul>
        <span>咨询热线：{{common.phone.replace(',','转')}}</span>
      </div>
      <!-- 动态部分 -->
      <div class="dong_box">
        <div class="dong_left">
            <el-timeline>
              <template v-for="(item,index) in data" >
                <el-timeline-item :timestamp="item.time" placement="top" v-if="index==0 && currentPage1==1" :key="item.id">
                  <div class="dong_content">
                      <h4>
                        <nuxt-link :to="`/loudongpage/${item.id}`">{{item.title}} <span class="new">最新</span></nuxt-link>
                      </h4>
                      <p>
                        <nuxt-link :to="`/loudongpage/${item.id}`">{{item.content}}</nuxt-link>
                      </p>
                       <nuxt-link v-if="item.content.length>68" :to="`/loudongpage/${item.id}`">查看详细>></nuxt-link>
                  </div>
              </el-timeline-item>
              </template>

             

               <template v-for="(item,index) in data">
                  <el-timeline-item :timestamp="item.time" placement="top" v-if="index>1" :key="item.id">
                      <div class="dong_content">
                        <h4>  
                          <nuxt-link :to="`/loudongpage/${item.id}`">{{item.title}} <span class="jiatui" v-if="item.type=='是'">加推</span></nuxt-link>
                        </h4>
                        <p> <nuxt-link :to="`/loudongpage/${item.id}`">{{item.content}}</nuxt-link></p>
                        <nuxt-link :to="`/loudongpage/${item.id}`" v-if="item.content.length>68">查看详细>></nuxt-link>
                    </div>
                  </el-timeline-item>
               </template>

            </el-timeline>
            <div class="yema">
                 <el-pagination
                :hide-on-single-page=true
                background
                layout="prev, pager, next"
                @current-change="pageChange"
                :current-page.sync="currentPage1"
                :total="total">
                </el-pagination>
            </div>
        </div>
        <div class="dong_right">
          <right-xiang-dao :daolist="articles"></right-xiang-dao>
          <right-bao-ming :img_bg="bgImg" :text_tishi="text" ref="right_bao"></right-bao-ming>
        </div>
         <my-tu-yan ref="imgyan"
            :point="98"
            :project_id="this.building.id"
            :name="''" 
            :myremark="myremark"
            :myphone="this.telphone"
         ></my-tu-yan>
      </div>
    </div>
    <my-footer :c_zhi_citys="common.city_info.all" 
        :c_hot_search="common.hot_search"
        :c_friendlink="common.friend_links"
        :footer_tel="common.phone"></my-footer>
  </div>
</template>
<script>
import header from "~/components/header.vue";
import mianbao from "~/components/mianbao.vue";
import rightDaogou from "~/components/danpage/xiangdao.vue";
import rightBaoMing from "~/components/danpage/yukanfang.vue";
import footer from '~/components/footer.vue';
import tuyanMa from "~/components/tuyan.vue";
export default {
   watchQuery:['page'],
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
      title: this.common.header.title ,
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
  components: {
    "my-header": header,
    "my-mianbao": mianbao,
    "right-xiang-dao": rightDaogou,
    "right-bao-ming": rightBaoMing,
    "my-footer":footer,
    'my-tu-yan':tuyanMa,
  },
    async asyncData({ app, query, params, store }) {
    //id 项目id
    // token
    // other
 
     let page = query.page;
    let  host = store.state.hostname;
     if(page==undefined){
       page=1;
     }
     let uuid = query.uuid;
        console.log(page,'page')
      if(uuid && uuid!=="undefined" && uuid!=="null"){
        uuid =uuid;
      }else{
         uuid="";
      }
    let [data] = await Promise.all([
      app.$axios.get(`/jy/dynamic/info/?token=${store.state.token}&id=${params.id}&page=${page}&uuid=${uuid}&other=${store.state.other}&host=${host}`).then((res) => {
        if (res.data.code == 200) {
          let data = res.data;
          return data;
        }
      }),
    ]);
    return {
      building:data.building,
      common: data.common,
      articles:data.articles,
      data:data.data,
      total:data.total,
      currentPage1:parseInt(page)
    };
  },
  data() {
    return {
       building:{},
       common:{},
       articles:[],
       data:[],
       total:'',
       currentPage1:1,
       bgImg: {
                backgroundImage: "url(" + require("~/assets/loudong_top.jpg") + ")",
                backgroundRepeat: "no-repeat",
          }, 
      text:'订阅最新动态，楼盘最新情报抢先知道，帮您找准买房好时机',
      telphone:'',
      myremark:'',
        routerData:[],
    };
  },
  mounted(){
    //console.log(this.$route.query.page,'page');
      this.$parent.$parent.saoma_telphone = this.common.phone;
      
      let  token = localStorage.getItem('token');
      let old_tel=localStorage.getItem("old_tel");
      if(token && old_tel){
          this.$refs.right_bao.telphone =old_tel;
      }else {
      }

      this.myremark =`楼盘动态页面+订阅楼盘动态`;
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
         "name":`${this.building.name}楼盘动态`,
         "to":''
       }
    ];
  },
  created() {},
  computed: {},
  methods: {
     pageChange(num){
         this.$router.push(`/prodong/${this.building.id}?page=${num}`);
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
.prodongpage {
  .proDong {
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
    .dong_box:after{
        content:'';
        height: 0;
        clear: both;
        display: block;
        overflow: hidden;
        visibility: hidden;
    }
    .dong_box {
      width: 1200px;
      height: auto;
      .dong_left {
        width: 860px;
        height: auto;
        float: left;
        margin-top: 40px;
        .dong_content{
            .el-timeline-item__timestamp{
                font-size: 14px;
            }
            h4{
                font-size: 16px;
                font-family: "Microsoft YaHei";
                font-weight: bold;
                color: #191919;
                line-height: 30px;
                a{
                   color: #191919;
                }
                .new{
                   width: 44px;
                  height: 20px;
                  background: #FEE7E5;
                  border-radius: 3px;
                  color: #FF5543;
                  font-size: 14px;
                  font-weight: 400;
                  display: inline-block;
                  text-align: center;
                  line-height: 20px;
                  margin-left: 10px;
                }
                .jiatui{
                width: 44px;
                height: 20px;
                background: #F0F7F3;
                border-radius: 3px;
                color:#3DA56A;
                font-size: 14px;
                font-weight: 400;
                display: inline-block;
                text-align: center;
                line-height: 20px;
                margin-left: 10px;
                }
            }
            p{
                font-size: 14px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: #636565;
                line-height: 22px;
                width:832px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                a{
                    color: #636565;
                }
               
            }
             a{
                  color: #416385;
              }
            ul:after{
                content: "";
                height: 0;
                clear: both;
                overflow: hidden;
                display: block;
                visibility: hidden; 
            }
            ul{
                li{
                     width: 160px;
                     height: 100px;
                     margin-right: 10px;
                    float: left;
                    margin-top: 13px;
                    img{
                        width: 160px;
                        height: 100px;
                        float: left;
                    }
                }
            }
        }
        .yema{
             margin-top:40px ;
             margin-bottom:100px;
        }
      }
      .dong_right {
        width: 300px;
        float: right;
           .about_dao{
               margin-top: 67px;
           }
      }
    }
  }
}
</style>
