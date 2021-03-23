<template>
<div class="dian">
   <!-- 楼盘点评弹框 -->
      <div class="fan_tan_dian" v-show="dian_tan.dianPingFlag">
        <div class="fan_tel">
          <div class="fan_top">
            <h2>楼盘点评</h2>
            <div class="guan"  @click="closePing">
                 <i class="iconfont iconchahao" id="fan_close"></i>
            </div>
          </div>
          
          <div class="fan_con">
            <div class="fen_tit">
              <p class="quest">
                您看过该楼盘吗？
              </p>
              <ul>
                <li
                  @click="selTaidu"
                  :data-v="item.id"
                  :class="item.id==dian_tan.num ? 'active' :''"
                  v-for="item in dian_tan.taidu"
                  :key="item.id"
                >{{item.name}}</li>
              </ul>
            </div>
            <div class="ping_fen">
              <p class="zong">
                楼盘评价
              </p>
              <div class="star">
                  <el-rate
                    v-model="dian_tan.values"
                    show-text>
                  </el-rate>
              </div>
            </div>
           <el-input
            type="textarea"
            placeholder="这个楼盘怎么样？我来说两句"
            v-model="dian_tan.textarea"
            maxlength="50"
            show-word-limit
          >
          </el-input>

            <input type="button" class="fan_btn" value="发表" @click="submitPing" />
          </div>
        </div>
      </div>
       <!-- 楼盘点评成功 弹框-->
      <div class="dian_success_bg"  v-show="ping_cheng.dian_succ">
          <div class="dian_success">
               <div class="top">
                   <h3>点评成功</h3>
                   <div class="guan"  @click="closePingCheng">
                        <i class="iconfont iconchahao" id="fan_close"></i>
                   </div>
               </div>
               <div class="content">
                     <img src="~/assets/two.png" alt="">
                     <p>如需了解更多房产相关资讯
                       关注{{logo_text}}公众号
                      </p>
                      <button>确定</button>
               </div>

          </div>
      </div>
</div>
</template>
<script>
export default {
   data() {
      return {
       dian_tan:{
         dianPingFlag:false,
          taidu: [
            {
              id: "1",
              name: "未看房"
            },
            {
              id: "2",
              name: "已看房"
            },
        ],
       num: 0,
       values: 0,
       textarea:"",
      },
       ping_cheng:{
          dian_succ:false
       },
      logo_text:'家园'

      }
   },
   created(){
   },
   beforeMount(){
        let  mine = this.$store.state.style_mine;
        if(mine==1){ //易得房样式
            this.logo_text = "易得房";
        }else if(mine==2){ //家园样式
           this.logo_text = "家园";
        }
   },
   computed:{
   },
   methods:{
    selTaidu(e){
      var id = e.target.getAttribute("data-v");
      sessionStorage.setItem("ping_tai", id);
      this.dian_tan.num = id;
    },
    submitPing(){
    //提交评价
      var token = localStorage.getItem("token");
      var pid = this.basic.id;
      var score = this.dian_tan.values;
      //项目id
      var consider = sessionStorage.getItem("ping_tai");
      var content = this.dian_tan.textarea;
      let ip = ip_arr["ip"];
      if (token !== null) {
        if (consider !== null) {
          if (score !== 0) {
            if (content !== "") {
              axios({
                    method: "post",
                    url: "/comment/save",
                    params: {
                      token: token,
                      pid: "", //被评论id
                      bid: pid, //项目id
                      content: content,
                      consider_buy: consider,
                      score: score,
                    },
                  })
                .then(res => {
                  if (res.data.code == 200) {
                    // console.log(res.data.data);
                    this.dian_tan.dianPingFlag = false;
                    this.ping_cheng.dian_succ= true;
                    // this.$alert(res.data.message, "提交成功", {
                    //   confirmButtonText: "确定"
                    // });
                    sessionStorage.removeItem("ping_tai");
                    this.dian_tan.textarea= "";
                    this.dian_tan.values = 0;
                    this.num = 0;

                    this.getdata();
                  } else {
                    this.$message(res.data.message);
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            } else {
              this.$message.error("评论内容不能为空");
            }
          } else {
            this.$message.error("请选择您要打的分数");
          }
        } else {
          this.$message.error("请选择是否看过该楼盘");
        }
      } else {
        this.dianPingFlag = false;
        this.$message.error("请先登录......");
        this.$parent.$parent.loginTan = true;
      }
    },
       closePingCheng(){
           $('.guan').css({
              "transform":"rotate(90deg)",
              "transition":" all 0.6s"
          })
          let _this =this;
          setTimeout(function(){
            _this.ping_cheng.dian_succ = false;
          },600)
       },
         closePing(){
         $('.guan').css({
               "transform":"rotate(90deg)",
                "transition":" all 0.6s"
           })
           let _this =this;
           setTimeout(function(){
              _this.dian_tan.dianPingFlag = false;
           },600)
         
    },
   },
}
</script>
<style lang="less" scoped>
 //楼盘点评弹框
      .fan_tan_dian {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.4);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 2000;
        display: block;
        cursor: pointer;
        .fan_tel {
          width: 480px;
          height: 400px;
          background: rgba(255, 255, 255, 1);
          border-radius: 6px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          .fan_top {
            position: relative;
            height: 55px;
            h2 {
              font-size: 22px;
              font-weight: bold;
              color: #333334;
              line-height: 22px;
              position: absolute;
              left: 50%;
              transform: translate(-50%);
              top: 17px;
            }
            .guan{
              width: 24px;
              height: 24px;
              background: rgba(0, 0, 0, 0.12);
              border-radius: 50%;
              text-align: center;
              position: absolute;
              top: 12px;
              right: 12px;
               i {
                font-size: 18px;
                text-align: center;
                line-height:24px ;
                color: #fff;
              }
            }
          }
        }
        .fan_con {
          padding-left: 40px;
          padding-right: 40px;
          .fen_tit {
            .quest {
              font-size: 14px;
              font-family: "Microsoft YaHei";
              font-weight: bold;
              color: #323333;
              line-height: 14px;
            }
            ul:after {
              content: "";
              height: 0;
              clear: both;
              overflow: hidden;
              display: block;
              visibility: hidden;
            }
            ul {
              padding-top: 14px;
              li {
                font-size: 14px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: #7D7D80;
                width: 72px;
                height: 26px;
                background: #F8F8F8;
                line-height: 26px;
                border-radius: 13px;
                text-align: center;
                float: left;
                margin-right: 14px;
              }
              .active {
                color: #2AC66E;
                background:#F1F8F4;
                border: none;
                font-weight: bold;
              }
            }
          }
          .ping_fen {
            .zong {
              font-size: 14px;
              font-family: "Microsoft YaHei";
              font-weight: bold;
              color: #323333;
              line-height: 14px;
              margin-top: 18px;
              span {
                color: #ff6a48;
                font-size: 36px;
                font-weight: bold;
              }
            }
            .star{
               margin-top: 11px;
               margin-bottom: 20px;
            }
          }
    
          .fan_kuang {
            width: 400px;
            height: 120px;
            border-radius: 4px;
            padding-left: 12px;
            border: none;
            font-size: 16px;
            font-family: "Microsoft YaHei";
            font-weight: 400;
            color: #F8F8F8;
            line-height: 34px;
            margin-top: 31px;
            outline: none;
            background:#F8F8F8 ;
          //  margin-bottom: 28px;
          }
          .fan_btn {
            width: 400px;
            height: 34px;
            background: #2AC66E;
            border-radius: 4px;
            font-size: 14px;
            font-family: "Microsoft YaHei";
            font-weight: bold;
            color: rgba(255, 255, 255, 1);
            line-height: 36px;
            text-align: center;
            border: none;
            margin-top: 28px;
          }
        }
      }
       //楼盘点评成功 弹框
      .dian_success_bg{
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.4);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 2000;
        display: block;
        cursor: pointer;
         .dian_success{
          width: 360px;
          height: 400px;
          background: rgba(255, 255, 255, 1);
          border-radius: 6px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
             .top{
               height: 61px;
                h3{
                  font-size: 24px;
                  font-weight: bold;
                  color: #333334;
                  line-height: 24px;
                  transform:translate(-50%) ;
                  left: 50%;
                  top: 37px;
                  position: absolute;
                }
                  .guan{
                    width: 24px;
                    height: 24px;
                    background: rgba(0, 0, 0, 0.12);
                    border-radius: 50%;
                    text-align: center;
                    position: absolute;
                    top: 12px;
                    right: 12px;
                     i {
                      font-size: 18px;
                      text-align: center;
                      line-height:24px ;
                      color: #fff;
                    }
                }
             }
             .content{
               padding-left: 60px;
               padding-right: 60px;
                 img{
                  width: 160px;
                  height: 160px;
                  margin-top: 28px;
                  margin-left: 40px;
                 }
                 p{
                  font-size: 14px;
                  font-family: "Microsoft YaHei";
                  font-weight: 400;
                  color: #333334;
                  line-height: 20px;
                  width: 168px;
                  text-align: center;
                  margin-left: 36px;
                  margin-top: 20px;
                  margin-bottom: 28px;
                 }
                 button{
                  width: 240px;
                  height: 34px;
                  background: #2AC66E;
                  border-radius: 4px;
                  font-size: 14px;
                  font-family: "Microsoft YaHei";
                  font-weight: bold;
                  color: #FFFFFF;
                  line-height: 22px;
                  border: none;
                 }
             }
         }  
      }
</style>
