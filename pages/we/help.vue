<template>
  <div class="uss">
    <div class="uss-son">
      <span>帮我找房</span>
    </div>
    <div class="uss-left">
      <div class="div1">
        <span class="span1">您能接受总价大概范围的区间</span>
        <p>{{value[0]}}W-{{value[1]}}W</p>
        <div class="block">
          <el-slider v-model="value" range show-stops :max="1000" :min="50" @change="changeSlider"></el-slider>
        </div>
      </div>
      <div class="div2">
        <span class="span2">选择您的有意向的区域</span>
        <ul class="div2-son">
          <li class="active buxian" @click="quYuClick" data-id="">不限</li>
          <li :class="(item.id)==num?'active' : ''" v-for="item in cities" :key="item.id"  :data-id="item.id"  @click="quYuClick">{{item.name}}</li>
        </ul>
      </div>
      <div class="div2">
        <span class="span2">选择您有意向的户型</span>
        <ul class="div2-son">
             <li class="active buxian1" @click="yiXiangClick" data-id="">不限</li>
             <li  :class="(item.id)==num1?'active' : ''"  v-for="item in apartments" :key="item.id" :data-id="item.id"  @click="yiXiangClick">{{item.name}}</li>
        </ul>
      </div>
      <div class="div2">
        <span class="span2">选择您需要的特色</span>
        <ul class="div2-son">
            <li  class="active buxian2" @click="teSeClick"  data-id="">不限</li>
            <li :class="(item.id)==num2?'active' : ''"  v-for="item in features" :key="item.id" :data-id="item.id" @click="teSeClick" >{{item.name}}</li>
        </ul>
      </div>
      <div class="tel_box">
        <span>输入您的联系号码</span>
          <div class="tel">
                <input type="text" placeholder="请输入手机号" v-model="telphone">
                <button @click="submitBtn">提交</button>
          </div>
      </div>
    </div>
    <div class="uss-right">
      <div class="junjia">
          <p class="jun">杭州{{price_trend.time}}月新房均价</p>
          <p class="jia"><strong>{{Number(price_trend.price).toFixed(0)}}</strong>元/m²</p>
          <p class="zhang">环比上月 <span>{{price_trend.rate_lastyear}}%</span></p>
      </div>
      <button @click="liaoFang(4)">了解最新房源报价</button>  
        <!-- 了解最新房源报价  4 --> 
      <div class="tui_jian">
          <h4>推荐楼盘</h4>
          <ul>
              <li v-for="item in hot" :key="item.id" @click="goDetail(item.id)">
                <nuxt-link :to="`/content/${item.id}`">
                  <div class="img_box">
                      <img :src="item.img" alt=""> 
                  </div>
                  <div class="rig_con">
                       <p class="title">{{item.name}}</p>
                       <p class="price">均价<strong>{{item.single_price}}</strong>元/m²</p>
                       <p class="dizhi">{{item.city}}-{{item.country}}</p>
                  </div>
                </nuxt-link>
              </li>
            
         </ul>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import $ from 'jquery' ;
export default {
  //  async fetch({store,params}){
  //     let {data}=await axios.get('http://ip-api.com/json')
  //     store.commit('setIp', data.query)
  // },
  // async asyncData({app,store,error}){
  //     let { data }  = await app.$axios.post('/api/project/help_me',{
  //          platform :1,
  //          ip:store.state.ip,
  //          city:store.state.city,
  //          token:store.state.token,
  //          kid:store.state.kid,
  //          other:store.state.other,
  //     }) .catch((e) => {
  //       error({ statusCode: 404, message: e })
  //     });
  //     return{
  //          cities:data.data.cities,
  //          apartments:data.data.apartments,
  //          features:data.data.features,
  //          price_trend:data.data.price_trend,
  //          hot:data.data.hot,
  //     }
  // },
    head () {
    return {
      title: `帮我找房-${this.logo_text}新房`,
      meta: [
         { hid: 'description', name: 'description', content: '帮我找房' },
         { hid: 'keywords', name: 'keywords', content: '帮我找房' }
      ]
    }
   },
  data() {
    return {
       value: [200, 400],
         ip:'',
         cities:[],
         apartments:[],
         features:[],
         price_trend:{},
         hot:[],
         num:-1,
         num1:-1,
         num2:-1,
         quyu_id:'',
         hu_xing:'',
         te_id:'',
         telphone:"",
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
         var token=  localStorage.getItem("token");
         var old_tel=localStorage.getItem("old_tel");
         if(token && old_tel){
             this.telphone=old_tel;
         }
    //  this.getUserIP((ip) => {
    //     this.ip = ip;
    //     sessionStorage.setItem('ip',ip);
    //     console.log(this.ip);
    //   });
        var  ip = ip_arr["ip"];
      //  var ip =this.$store.state.ip;
        var token =localStorage.getItem('token');
        var city= sessionStorage.getItem('city_id');
         axios.post('/api/project/help_me',{
          platform :1,
          ip:ip,
          city:city,
          token:token,
       }).then((res)=>{
             if(res.data.code==200){
                var number=res.data.data;
                this.cities=number.cities;
                this.apartments=number.apartments;
                this.features=number.features;
                this.price_trend=number.price_trend;
                this.hot=number.hot;
             }else{
                 this.$message(res.data.message);  
             }
       })
  },
  methods:{
    goDetail(id){
        this.$router.push(`/content/${id}`)
    },
    liaoFang(num){
         sessionStorage.setItem('bao_id',num);
        // console.log(this.$parent.$parent.$parent.$parent);
          switch (num){
                 case 4 : 
                 this.$parent.$parent.$parent.$parent.tan_title = "获取最近房价行情";
                 this.$parent.$parent.$parent.$parent.tan_content =
                      "获取最近房价行情，抓住买房投资好时机";
                break;
            } 
          this.$parent.$parent.$parent.$parent.telflag=true;
    },
    submitBtn(){
         var number=this.telphone;
        //  var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
          let myreg= new RegExp("^[1][3,4,5,7,8][0-9]{9}$");
              if ( number == '') {
                    $('.tel input').attr('placeholder', '手机号不能为空');
                    return;
                } else if (!myreg.test(number)) {
                     $(".tel input").val('');
                     $('.tel input').attr('placeholder', '手机号码不合法,请重新输入');
                    return;
                }
           this.submitHelp();


    },


        //提交找房建议
         submitHelp(){
            var other= sessionStorage.getItem('other');
            var kid= sessionStorage.getItem('kid')
            var token =localStorage.getItem('token');
            var  ip = ip_arr["ip"];
            //var ip =this.$store.state.ip;
            var city= sessionStorage.getItem('city_id');
            
            var params={
                  platform :1,
                  ip:ip,
                  city:city,
                  page:2,
                  position:1,
                  type:7,
                  feature:this.te_id,
                  total_price_max:this.value[1],
                  total_price_min:this.value[0],
                  country:this.quyu_id,
                  apartment:this.hu_xing,
                  tel:this.telphone,
                  token:token,
                  other:other,
                  kid:kid
            }
            if(this.te_id==''){
              delete params.feature;
            }
            if(this.quyu_id==''){
              delete params.country;
            }
             if(this.hu_xing==''){
              delete params.apartment;
            }
              axios.post('/front/flow/sign',params).then((res)=>{
              if(res.data.code==200){
                  this.$alert('信息提交成功', '提交成功', {
                    confirmButtonText: '确定',
                  });
              }else{
                  this.$message(res.data.message);  
              }
              })
         },
       getUserIP(onNewIP) {
        let MyPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
        let pc = new MyPeerConnection({
            iceServers: []
          });
        let noop = () => {
          };
        let localIPs = {};
        // let ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;
         let ipRegex = new RegExp('([0-9]{1,3}(\\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})','g')
        let iterateIP = (ip) => {
          if (!localIPs[ip]) onNewIP(ip);
          localIPs[ip] = true;
        };
        pc.createDataChannel('');
        pc.createOffer().then((sdp) => {
          sdp.sdp.split('\n').forEach(function (line) {
            if (line.indexOf('candidate') < 0) return;
            line.match(ipRegex).forEach(iterateIP);
          });
          pc.setLocalDescription(sdp, noop, noop);
        }).catch((reason) => {
          console.log(reason);
        });
        pc.onicecandidate = (ice) => {
          if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
          ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
        };
      },
         changeSlider(value){
              //console.log(value);
         },
         quYuClick(e){
              var data_id=e.target.getAttribute('data-id') ;
              this.num=data_id;
              this.quyu_id=data_id;
              if(data_id==""){
                   $('.buxian').addClass('active');
              }else{
                   $('.buxian').removeClass('active');
              }
         },
         yiXiangClick(e){
              var data_id=e.target.getAttribute('data-id') ;
              this.num1=data_id;
              this.hu_xing=data_id;
              if(data_id==""){
                   $('.buxian1').addClass('active');
              }else{
                   $('.buxian1').removeClass('active');
              }
         },
         teSeClick(e){
              var data_id=e.target.getAttribute('data-id') ;
              this.te_id=data_id;
              this.num2=data_id;
              if(data_id==""){
                   $('.buxian2').addClass('active');
              }else{
                   $('.buxian2').removeClass('active');
              }
         },


  },
};
</script>
<style scoped lang="less">
.uss {
  width: 980px;
  height: 1200px;
  margin: 0 auto;
  .uss-son{
    width: 680px;
    height: 60px;
    border-bottom: 1px solid rgba(237, 235, 235, 1);
    font-size: 20px;
    font-weight: bold;
    color: rgba(55, 58, 67, 1);
    line-height: 60px;
    text-align: center;
    margin-top:20px;
  }
  .uss-left{
      width: 680px;
      height: 800px;
      float: left;
      margin-top: 45px;
      .div1{
        width: 680px;
        height: 200px;
        .span1{
           font-weight: bold;
           color: rgba(51, 51, 51, 1);
           font-size: 24px;
           margin-top:10px;
        }
        p{
          color: rgba(81, 83, 87, 1);
          font-size: 24px;
          width: 680px;
          height: 70px;
          line-height: 70px;
          text-align: center;
        }
      }
      .div2{
        width: 680px;
        height: auto;
        .span2{
          font-size:24px;
          font-family:"Microsoft YaHei";
          font-weight:bold;
          color:rgba(51,51,51,1);
          line-height:48px;
        }
         .div2-son:after{
               content: "";
                height: 0;
                clear: both;
                overflow: hidden;
                display: block;
                visibility: hidden;
         }
        .div2-son{
            margin-top: 20px;
            margin-bottom:40px;
            li{
            float: left;
            width: 90px;
            height: 30px;
            background: #EDF0F2;
            text-align: center;
            line-height: 30px;
            margin-left: 20px;
            margin-top: 20px;
            font-size: 14px;
            color: rgba(120, 121, 127, 1);
            border-radius: 2px;
            cursor:pointer;
            }
            .active{
               color:#40A2F4;
               background:#F5FCFF;
               width:88px;
               height:28px;
               border:1px solid #40A2F4;
            }
        }
        .span{
           font-weight: bold;
          color: rgba(51, 51, 51, 1);
          font-size: 24px;
        }
      }
      .tel_box{
           
          span{
          font-size:24px;
          font-family:"Microsoft YaHei";
          font-weight:bold;
          color:rgba(51,51,51,1);
          line-height:48px;
      
          }
          .tel{
              width:680px;
              height:50px;
              background:rgba(255,255,255,1);
              border:1px solid rgba(64,162,244,1);
              border-radius:4px;
              margin-top:55px;
              display:flex;
              input{
                width:530px;
                height:48px;
                border:none;
                float:left;
                font-size:16px;
                font-family:"Microsoft YaHei";
                font-weight:400;
                color:rgba(153,153,153,1);
                line-height:20px;
                text-indent:2em;
              }
              button{
                  float:left;
                 width:150px;
                height:50px;
                background:linear-gradient(270deg,rgba(102,207,255,1),rgba(76,181,255,1));
                border-radius:4px;
                font-size:16px;
                font-family:"Microsoft YaHei";
                font-weight:400;
                color:rgba(255,255,255,1);
                line-height:20px;
                border:none;
                float:left;
                cursor:pointer;
              }
          }
      }
  }
  .uss-right {
  width: 260px;
  height: 400px;
  // background: rgb(207, 228, 207);
  float: right;
  margin-top: 30px;
       .junjia{
          width:230px;
          height:180px;
          border:1px solid rgba(220,228,236,1);
          padding-left:30px;
          .jun{
          font-size:16px;
          font-family:"Microsoft YaHei";
          font-weight:400;
          color:rgba(55,58,67,1);
          line-height:66px;
          }
          .jia{
            font-size:16px;
            font-family:"Microsoft YaHei";
            color:rgba(55,58,67,1);
            line-height:48px;
            strong{
              font-size:48px;
            }
          }
          .zhang{
            font-size:16px;
            font-family:"Microsoft YaHei";
            font-weight:400;
            color:rgba(55,58,67,1);
            line-height:20px;
            margin-top:7px;
            span{
              color:#FF6A48;
            }
          }
       }
       button{
         width:260px;
        height:44px;
        background:linear-gradient(270deg,rgba(102,207,255,1),rgba(76,181,255,1));
        font-size:16px;
        font-family:"Microsoft YaHei";
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:44px;
        border:none;
        margin-top:23px;
        cursor: pointer;
       }
       button:hover{
            background:linear-gradient(270deg,rgb(94, 204, 255),rgb(68, 174, 250));
       }
       .tui_jian{
         h4{
          font-size:16px;
          font-family:"Microsoft YaHei";
          font-weight:bold;
          color:rgba(63,64,69,1);
          margin-top:58px;
          margin-bottom:25px;
         }
         ul{
           li:after{
              content: "";
              height: 0;
              clear: both;
              overflow: hidden;
              display: block;
              visibility: hidden;
           }
           li{
             margin-bottom:20px;
             position:relative;

             .img_box{
                 width:116px;
                 height:80px;
                 overflow: hidden;
                 position:absolute;
                 border-radius:6px;
                img{
                    width:116px;
                    height:80px;
                    border-radius:6px;
                    float:left;
                  }
              }
              .rig_con{
                width:129px;
                height:80px;
                float:right;
                .title{
                  font-size:16px;
                  font-family:"Microsoft YaHei";
                  font-weight:bold;
                  color:rgba(63,64,69,1);
                  line-height:16px;
                }
                .price{
                    font-size:14px;
                    font-family:"Microsoft YaHei";
                    font-weight:400;
                    color:rgba(255,106,72,1);
                    line-height:38px;
                    strong{

                    }
                }
                .dizhi{
                  font-size:14px;
                  font-family:"Microsoft YaHei";
                  font-weight:400;
                  color:rgba(166,168,179,1);
                  line-height:14px;
                  margin-top:4px;
                }
              }
           }
           li:hover .img_box  img{
                  transform: scale(1.1);
                  transition: all 0.6s;
                  cursor: pointer;  
           }
         }
       }
  }
}






</style>