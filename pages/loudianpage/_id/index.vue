<template>
  <div class="loudianpage_box">
    <my-header
      :all="common.city_info.all"
      :telphone="common.phone"
      ref="header"
    ></my-header>
    <my-mianbao :router_data="routerData"></my-mianbao>
    <div class="loudianpage">
      <div class="left_ping">
        <!-- 评论内容 -->
        <div class="project_box">
          <h3>
            {{ building.name }}<span>{{ building.state }}</span>
            <strong>
              参考单价<em>{{ building.price }}</em
              ><i>元/m²</i></strong
            >
          </h3>
          <ul class="pingfen">
            <li class="zong">
              <strong>{{ scores.sum }}</strong>
              <i>/分</i>
            </li>
            <li class="dan">
              <span>{{ scores.score.single_price }}</span>
              <em>价格</em>
            </li>
            <li class="dan">
              <span>{{ scores.score.height }}</span>
              <em>层高</em>
            </li>
            <li class="dan">
              <span>{{ scores.score.house_types }}</span>
              <em>户型</em>
            </li>
            <li class="dan">
              <span>{{ scores.score.education }}</span>
              <em>教育</em>
            </li>
            <li class="dan">
              <span>{{ scores.score.leisure }}</span>
              <em>休闲</em>
            </li>
            <li class="dan">
              <span>{{ scores.score.commercial }}</span>
              <em>商业</em>
            </li>
            <li class="dan">
              <span>{{ scores.score.medical }}</span>
              <em>医疗</em>
            </li>
            <li class="dan">
              <span>{{ scores.score.traffic }}</span>
              <em>交通</em>
            </li>
            <li class="dan">
              <span>{{ scores.score.quality }}</span>
              <em>品质</em>
            </li>
          </ul>
          <div class="louhua">
            <span> 楼盘画像 </span>
            <ul>
              <li>{{ building.decorate }}</li>
              <li v-for="(item, index) in building.features" :key="index">
                {{ item.value }}
              </li>
            </ul>
          </div>
          <div class="lou_address">
            楼盘地址<span>{{ building.address }}</span>
          </div>
          <div class="lou_tel">
            咨询电话<span>{{ common.phone.replace(",", "转") }}</span>
            <button>
              <nuxt-link :to="`/content/${building.id}`"
                >查看楼盘详情</nuxt-link
              >
            </button>
          </div>
        </div>
        <!-- 评论内容 -->
        <div class="ping_box">
          <div class="ping">
            <img src="~/assets/content_pro.png" alt="" class="head_img" />
            <div class="ping_text">
              <div class="user_name">
                {{ comment.name }}
                <el-rate
                  v-model="comment.score"
                  disabled
                  :colors="['#F1C25E', '#F1C25E', '#F1C25E']"
                ></el-rate>
              </div>
              <p class="pinglun">{{ comment.content }}</p>
              <div class="time">
                <span class="left_time">{{logo_text}}新房 {{ comment.time }}</span>
                <div class="zan">
                  <span
                    ><img src="~/assets/icon/ping.png" />{{
                      comment.children.length
                    }}</span
                  >
                  <em v-if="comment.my_like == 1" @click="getLike(comment.id)"
                    ><img src="~/assets/icon/haszan.png" />{{
                      comment.like_num
                    }}</em
                  >
                  <em v-if="comment.my_like == 0" @click="getLike(comment.id)"
                    ><img src="~/assets/icon/nozan.png" />{{
                      comment.like_num
                    }}</em
                  >
                </div>
              </div>
              <div
                class="huifu"
                v-for="item in comment.children"
                :key="item.id"
              >
                <span>{{ item.name }}:&nbsp;</span>
                <p>{{ item.content }}</p>
                <em v-if="item.mine==1" @click="delatePing(item.id)">删除</em>
                <em v-if="item.mine==0"></em>
              </div>
            </div>
          </div>
        </div>
        <!-- 上一条、下一条 -->
        <div class="btn">
          <span @click="shangData(pages.last)" v-if="pages.last!==''&& pages.last!==0" >上一条</span>
          <span @click="nextData(pages.next)" v-if="pages.next!==''&& pages.next!==0">下一条</span>
        </div>
        <!-- 我要回复-->
        <div class="huifu_box">
          <h3>我要回复</h3>
          <textarea
            name="huifu_text"
            id=""
            cols="30"
            rows="10"
            placeholder="评论TA的观点分享心得"
            class="huifu_text"
            v-model="huifu_text"
            @focus="focusTextarea"
          ></textarea>
          <button class="fabu" @click="tiJiaoPing">发布</button>
          <button class="other_dian" @click="goloudian">本楼盘其它点评</button>
        </div>
      </div>
      <div class="right_dao">
        <!--右侧-相关导购-->
        <right-about-dao :daolist="articles"></right-about-dao>
        <yu-kan-fang :img_bg="bgImg" :text_tishi="text" ref="right_bao"></yu-kan-fang>
      </div>
    </div>
     <my-tu-yan ref="imgyan"
            :point="103"
            :project_id="this.building.id"
            :name="''" 
            :myremark="myremark"
            :myphone="this.telphone"
    ></my-tu-yan>
    <my-footer
      :c_zhi_citys="common.city_info.all"
      :c_hot_search="common.hot_search"
      :c_friendlink="common.friend_links"
      :footer_tel="common.phone"
    ></my-footer>
  </div>
</template>

<script>
import header from "~/components/header.vue";
import mianbo from "~/components/mianbao.vue";
import footer from "~/components/footer.vue";
import xiangdao from "~/components/danpage/xiangdao.vue";
import yufang from "~/components/danpage/yukanfang.vue";
import axios from 'axios';
import tuyanMa from "~/components/tuyan.vue";
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
      title:this.common.header.title,
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
    // id 项目id
    // other
    // token
     let uuid = query.uuid;
       let  host = store.state.hostname;
      if(uuid && uuid!=="undefined" && uuid!=="null"){
        uuid =uuid;
      }else{
         uuid="";
      }
    let [data] = await Promise.all([
      app.$axios.get(`/jy/comment/detail?id=${params.id}&token=${store.state.token}&uuid=${uuid}&other=${store.state.other}&host=${host}`).then((res) => {
        if (res.data.code == 200) {
          let data = res.data;
          return data;
        }
      }),
    ]);
    return {
      common: data.common,
      building: data.building,
      articles: data.articles,
      comment: data.comment,
      pages: data.pages,
      scores: data.scores,
    };
  },
  components: {
    "my-header": header,
    "my-mianbao": mianbo,
    "my-footer": footer,
    "right-about-dao": xiangdao,
    "yu-kan-fang": yufang,
     'my-tu-yan':tuyanMa,
  },
  data() {
    return {
      value: 3,
      common: {},
      building: {},
      articles: [],
      comment: {},
      pages: {},
      scores: {},
      bgImg: {
        backgroundImage: "url(" + require("~/assets/yufang.jpg") + ")",
        backgroundRepeat: "no-repeat",
      },
      text: "看照片怎么够，预约看房我们将提供免费专车接送和专业楼盘讲解",
      huifu_text:'',
      telphone:'',
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
  mounted() {
      this.$parent.$parent.project_id_im = this.building.id;
       this.$parent.$parent.saoma_telphone = this.common.phone;

      let  token = localStorage.getItem('token');
      let old_tel=localStorage.getItem("old_tel");
      if(token && old_tel){
          this.$refs.right_bao.telphone =old_tel;
      }else {
      }

      this.myremark ='单个楼盘点评页+预约看房';
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
         "name":`${this.building.name}点评`,
         "to":`/prodian/${this.building.id}?page=1`
       }
        
    ];
  },
  methods: {
    delatePing(id) {
      var token = localStorage.getItem("token");
      // var pid = this.$route.params.id;
      axios({
        method: "post",
        url: "/comment/delete",
        params: {
          token: token,
          id: id,
        },
      })
        .then((res) => {
          if (res.data.code == 200) {
            this.$alert("评论删除成功", "提交成功", {
              confirmButtonText: "确定",
            });
           // this.dian_tan.dianPingFlag = false;
            this.getdata();
          } else {
            this.$message(res.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    shangData(num){
        if(num!==""){
           this.$router.push(`/loudianpage/${num}`);
        }
    },
     nextData(num){
          if(num!==''){
               this.$router.push(`/loudianpage/${num}`);  
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
    goloudian(){
      this.$router.push(`/prodian/${this.building.id}?page=1`)
    },
     tiJiaoPing() { //提交回复
      var token = localStorage.getItem("token");
      //  console.log(this.pingid)
      if(token){
          if(this.huifu_text!==''){
          axios({
                method: "post",
                url: "/comment/save",
                params: {
                  token: token,
                  pid: this.comment.id,
                  bid: this.building.id,  //项目id
                  content: this.huifu_text,
                  consider_buy: "",
                  score: "",
                },
              })
            .then(res => {
              if (res.data.code == 200) {
                this.$alert("信息提交成功", "提交成功", {
                  confirmButtonText: "确定"
                });
                var pid = this.$route.params.id;
                this.getdata();
              } else {
                this.$message(res.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });

          }else{
                this.$message.error("输入回复内容不能为空");
          }
      }else{
           this.dPingFlag=false;
           this.$message.error("请先登录");
           this.$parent.$parent.loginTan = true;
      }

    },
      getdata(){
          var token = localStorage.getItem('token');
          var project = this.$route.params.id;
          let match = project.match(/\d+/);
          project = match[0];
          axios.get('/jy/comment/detail',{
            params:{
                token:token,
                id:project,
                other:'',
            }
          }).then(res=>{
             if(res.data.code==200){
                console.log(res.data);
                let   comment  = res.data.comment;
                this.comment =comment;
             }
          })
      },
    getLike(id) {
      //楼盘点评点赞
      var token = localStorage.getItem("token");
      if (token !== "" && token !== null) {
        axios({
          method: "post",
          url: "/comment/like",
          params: {
            token: token,
            id: id,
          },
        })
          .then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.message);
              this.getdata();
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
  },
};
</script>

<style lang="less" scoped>
@import "../../../assets/css/loudianpage.less";
.about_dao {
  margin-top: 40px;
}
</style>