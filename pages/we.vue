<template>
  <div class="we">
    <div class="we-top">
      <my-header
              :all="common.city_info.all"
              :telphone="common.phone"
              ref="header"></my-header>
      <div class="about_nav">
           <img src="~/assets/about/guan_bg.jpg" alt="">
           <div class="nav_box">
                <ul class="nav_all">
                  <li>
                      <nuxt-link to="/we/aboutus" class="link" >关于我们</nuxt-link> 
                  </li>
                  <li>
                      <nuxt-link to="/we/advise" class="link">投诉建议</nuxt-link>
                  </li>
                  <li>
                      <nuxt-link to="/we/fuwu" class="link">服务声明</nuxt-link>
                  </li>
                  <li>
                      <nuxt-link to="/we/joinus" class="link">加入我们</nuxt-link>
                  </li>
              </ul>
           </div>
           
      </div>
    </div>
    <div class="we-bottom">
        <nuxt/>
    </div>

    <div>
      <my-footer :c_zhi_citys="common.city_info.all" 
        :c_hot_search="common.hot_search"
        :c_friendlink="common.friend_links"
        :footer_tel="common.phone"></my-footer>
    </div>
      
  </div>
</template>

<script>
import header from "~/components/header.vue";
import footer from "~/components/footer.vue";
export default {
    //  layout:'contenttConNew',
    components:{
          "my-header": header,
          "my-footer":footer
    },
    //city
    // token
  async asyncData({ app, query, params, store }) {
    let [footer] = await Promise.all([
    //       city
    //      token
       app.$axios.get(`/jy/head/foot?recommend=1&token=${store.state.token}&city=${store.state.city_id}`).then((res) => {
        if (res.data.code == 200) {
          let data = res.data;
          return data;
        }
      })
    ]);
    return {
          common:footer.common,
    };
  },
    data(){
      return{
          common:[],
      }
    },
  
   mounted(){
          var tel= sessionStorage.getItem('telphone_com');
          this.com_tel=tel;
   },
   methods:{
      showPing(){
          this.pingshow=true;
       },
     join_show_hide(){
        this.pingshow=!this.pingshow;
     },
      hidebox(){
        this.pingshow=false;
      },
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
   },
}
</script>
<style lang="less"  scoped>
.we:after{
    content: "";
    height: 0;
    clear: both;
    overflow: hidden;
    display: block;
    visibility: hidden;
}
.we {
  width: 100%;
  height: auto;
  margin:0 auto;
  .we-top{
     width: 100%;
     height: 480px;
    .header_nav{
        width: 1200px;
        height: 80px;
        margin: 0 auto;
        .logo{
           float: left;
           width: 168px;
           height: 80px;
           .top_img{
              display: block;
              margin-top: 10px;
           }
        }
        .nav_list{
          height: 80px;
          line-height: 80px;
          float: left;
            li{
              float: left;
              margin-right: 30px;
              a{
                font-size:16px;
                font-family:"Microsoft YaHei";
                font-weight:400;
                color:rgba(94,97,102,1);
              }
            }
               .ping{
                  float: left;
                  font-size: 16px;
                  position: relative;
                  cursor: pointer;
                  em{
                     font-style: normal;
                     color:#5e6166;
                  }
                  ul{ 
                     position: absolute;
                     left: -9px;
                     top: 54px;
                     z-index: 400;
                     li{
                     width: 100px;
                     height: 30px;
                     background: #fff;
                     border-radius: 3px;
                     font-size: 16px;
                     color: #000;
                     line-height: 30px;
                     text-align: center;
                     box-shadow: 15px 10px 13px 0 rgba(0,0,0,.1);
                     a{
                        color: #000;
                        line-height: 30px;
                         height: 30px;
                     }
                     }
                  }
               }
        }
        .login_box{
          float: right;
          height: 80px;
          span{
            font-size:16px;
            font-family:"Microsoft YaHei";
            font-weight:400;
            color:#5E6166;
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
                top:42px;
                left:27px;
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
            .zhu{
              font-size:16px;
              font-family:"Microsoft YaHei";
              font-weight:400;
              color:rgba(94,97,102,1);
              display: inline-block;
              line-height: 80px;
              span{
                margin-right: 10px;
              }
            }
            p{
              font-size:20px;
              font-family:"Microsoft YaHei";
              font-weight:bold;
              color:rgba(94,97,102,1);
               display: inline-block;
              line-height: 80px;
              margin-left: 38px;
            }
        }
       
    }
    .about_nav{
       width: 100%; 
       height: 400px;
       position: relative;
        img{
           width: 100%;
            height: 400px;
        }
        .nav_box{
          width: 100%;
          height: 60px;
          background:rgba(0,0,0,0.2);
          position: absolute;
          bottom: 0px;
          left: 0px;
          .nav_all{
            width: 1200px;
            height: 60px;
            margin: 0 auto;
             li{
                float: left;
                line-height: 60px;
                width: 180px;
                font-size:18px;
                font-family:"Microsoft YaHei";
                font-weight:400;
                color:rgba(255,255,255,1);
                text-align: center;
                a{
                     height: 60px;
                     width: 180px;
                    color:rgba(255,255,255,1);
                    display: inline-block;
                }
             }
             li:hover{
               background: #3AC869;
             }
              //  @keyframes mysecond {
              //   from {
              //     display:none;
              //   }
              //   to{
              //     display:block;
              //   }
              // }
             li{
              .nuxt-link-active {
                    background:#3AC869;
                    height: 60px;
                    width: 180px;
                    display: inline-block;
               }
             }
          }
          
        }
    }



  }
  .we-bottom{
    width: 100%;
    height: auto;
    margin:0 auto;
  }
  .we-bottom:after{
      content: "";
      height: 0;
      clear: both;
      overflow: hidden;
      display: block;
      visibility: hidden;
  }



}






</style>