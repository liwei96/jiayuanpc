<template>
   <div class="fan_tan_box" v-show="show_bao">
         <div class="tan_center">
                <div class="title_top">
                      <img src="~/assets/fan/tan.jpg" alt="">
                       <div class="guan" @click="hideHong">
                            <i class="iconfont iconchahao"
                            id="fan_close"
                            ></i>
                       </div>
                </div>
                <div class="tan_text" v-show ="tel_show">
                      <h4>成功申请购房补贴金后将与您手机号绑定，会有工作人员与您联系</h4>
                      <input type="text" placeholder="输入您手机号码" v-model="telphone" maxlength="11">
                      <div class="xieyi">
                            <input
                                type="checkbox"
                                v-model="checked"
                                class="checkbox"
                            />
                            <p>
                                我已阅读并同意
                                <em @click="goXie">《{{logo_text}}用户协议》</em>
                            </p>
                      </div>
                      <button @click="lingFanTie(115)">立即申请购房补贴</button>
                </div>
                <div class="yanma_box" v-show ="yan_show">
                    <div class="top">
                         <h4>验证码已发送到{{yan_tel_xing}}  请注意查看</h4>
                         <button @click="getYanMa_c">{{yan_text}}</button>
                    </div>
                     <input type="text" placeholder="输入验证码" class="text_box" v-model="yanma">
                     <button class="que" @click="subYan_c">确定</button>
                </div>
         </div>
   </div>
</template>

<script>
import axios from 'axios'
export default {
    props:["project","remark"],
    data(){
        return{
              logo_text:"家园",
              checked:true,
              show_bao :false,

              tel_show:true,
              yan_show:false,
              telphone:"",
              yanma:"",
              yan_tel_xing:"187****4376",
              yan_text:"获取验证码",
              flag:true,
        }
    },
    beforeMount(){
        let  mine = this.$store.state.style_mine;
        if(mine==1){ //易得房样式
            this.logo_text = "易得房";
        }else if(mine==2){ //家园样式
           this.logo_text = "家园";
        }
    },
    methods:{
        lingFanTie(point){
                let tel = this.telphone;
                //返乡置业优惠券弹框
                let ip = ip_arr["ip"];
                let city = sessionStorage.getItem("city_id");
                var token = localStorage.getItem("token");
                var project = this._props.project;
                var remark = this._props.remark;
                var other = sessionStorage.getItem("other");
                var kid = sessionStorage.getItem("kid");

                var pattern = new RegExp("^1[345678]\\d{9}$");
                if(this.checked ==true){
                    if (tel == "") {
                        this.$message.error("手机号不能为空");
                    } else if (!pattern.test(tel)) {
                        this.$message.error("请输入正确的手机号");
                    } else {
                        // this.tuMaFlag = true;
                        axios
                        .post("/front/flow/sign", {
                            tel: tel,
                            ip: ip,
                            page: 10, //家有PC端
                            project: project,
                            city: city,
                            position: point,
                            remark: remark, //请填写位置对应的名，如“详细楼盘信息”，如果是咨询详细户型请加上户型名
                            source: "线上推广1",
                            other: other,
                            kid: kid,
                            name: "", //客户姓名，没有就不填
                        })
                        .then((res) => {
                            if (res.data.code == 200) {
                            this.$message.success(res.data.message);
                            this.tel_show = false;
                            //验证码弹框显示
                            this.yan_show = true;
                            this.yan_tel_xing = tel;
                            this.getYanMa_c();
                            }
                            if(res.data.code==500 ){
                                    this.$message.success(res.data.message);
                                    this.show_bao =false;
                                }

                        });
                    }
                }else{
                    this.$message.error("请勾选用户协议");
                }
        },
        getYanMa_c() {
            //       let kk = parseInt(new Date().getTime()/1000)
            //       if($cookies.get('time')){
            //         let dd = kk-$cookies.get('time')
            //         if(dd<60){
            //           this.$message.error('不要频繁报名')
            //           return
            //         }else{
            //           $cookies.set('time',kk)
            //         }
            //       }else{
            //         $cookies.set('time',kk)
            //       }

                //红包获取验证码
                if (!this.flag) {
                    return;
                }
                this.flag = false;
                let that = this;
                var time = 60;
                this.sendTimer = setInterval(function () {
                    time--;
                    if (time > 0) {
                    that.yan_text = time + "秒后重送";
                    } else if (time == 0) {
                    that.flag = true;
                    clearInterval(this.sendTimer);
                    that.yan_text = "获取验证码";
                    this.sendTimer = null;
                    }
                }, 1000);
                var phone = this.telphone;
                var ip = ip_arr["ip"];
                if (phone && ip) {
                    axios({
                    method: "post",
                    url: "/send",
                    params: {
                        phone: phone,
                        ip: ip,
                        source: 3,
                    },
                    })
                    .then((res) => {
                        if (res.data.code == 200) {
                        this.$cookies.remove('time')
                        this.$message.success(res.data.message);
                        } else {
                        this.$message.error(res.data.message);
                        }
                    })
                    .catch((error) => {
                        if(error.response){
                            console.log(error.response.data);
                            this.$message.error(error.response.data.msg);
                            console.log(error.response.status);
                            console.log(error.response.headers);
                        }else{
                            console.log(error.message);
                        }
                    });
                }
        },
            //红包提交验证码
        subYan_c() {
        var phone = this.telphone;
        var code = this.yanma;
        var ip = ip_arr["ip"];
        var token = localStorage.getItem("token");
        // var ip=this.$store.state.ip;
        if (code !== "" && phone !== "") {
            axios({
            method: "post",
            url: "/sure",
            params: {
                phone: phone,
                code: code, //短信验证码
                source: 3,
                ip: ip,
            },
            })
            .then((res) => {
                if (res.data.code == 200) {
                this.$message.success(res.data.message);
                this.show_bao = false;
                this.tel_show = true;
                this.yan_show = false;
                this.yanma = "";
                if (token) {
                } else {
                    localStorage.setItem("token", res.data.token);
                    var newtel = phone.substr(0, 3) + "****" + phone.substr(7);
                    localStorage.setItem("tel", newtel);
                    localStorage.setItem("old_tel", phone);
                    this.$cookies.set("token", res.data.token, "10d");
                    this.$parent.$refs.header.login_tel = newtel;
                    this.$parent.$refs.header.exit_show = true;
                    this.$parent.$refs.header.login_show = false;

                }
                } else {
                this.$message.error(res.data.message);
                }
            })
            .catch((error) => {
                if (error.response) {
                console.log(error.response.data);
                this.$message.error(error.response.data.msg);
                console.log(error.response.status);
                console.log(error.response.headers);
                } else {
                console.log(error.message);
                }
            });
        }else{
            this.$message.error("验证码不能为空");
        }
        },
        goXie(){
             this.$router.push("/we/fuwu");
        },
        showHong(){
           this.show_bao = true;
        },
        hideHong(){
         //   this.telphone = '';
            this.tel_show = true;
            this.yan_show = false;
            this.show_bao = false;
            this.flag = true;
        }

    },
    mounted(){
         let  token = localStorage.getItem('token');
        let old_tel=localStorage.getItem("old_tel");
        if(token && old_tel){
            this.telphone=old_tel;
        }else {
        }
       //   console.log(this.$parent.$refs.header)
    },
    watch:{
        show_bao(val) {
            if(val==true) {
            sessionStorage.setItem('isliu',1)
            }else{
            sessionStorage.removeItem('isliu')
            }
        }
    }
}
</script>

<style lang="less">
.fan_tan_box{
    width: 100%;
    height: 100%;
    background:rgba(0,0,0,0.4);
    position: fixed; 
    top: 0;
    left: 0;
    z-index: 2000;
    display: block;
    .tan_center{
        width: 480px;
        height: 400px;
        background: #FFFFFF;
        border-radius: 6px;
        position:absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
         .title_top{
            width: 480px;
            height: 160px;
            img{
                 width: 480px;
                 height: 160px;
                 border-radius:6px 6px 0px 0px;
            }
            .guan{
                width: 24px;
                height: 24px;
                background:rgba(0,0,0,0.12);
                border-radius: 50%;
                text-align: center;
                position: absolute;
                top: 12px;
                right: 12px;
                i{
                    color: #FFFFFF; 
                    font-size: 18px;
                    text-align: center;
                    line-height: 24px;
                    color: #fff;
                }
            }
         }
        .tan_text{
             height: 240px;
             width: 420px;
             padding-left: 30px;
             padding-right: 30px;
             h4{
                font-size: 14px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: #323233;
                line-height: 31px;
                text-align: center;
                line-height: 66px;
                margin-bottom: 20px;
             }
             input{
                 width: 400px;
                height: 35px;
                border: 1px solid #CCCCCC;
                border-radius: 4px;
                text-indent: 1em;
             }
                   .xieyi {
                        position: relative;
                        margin-bottom: 12px;
                        p {
                        font-size: 14px;
                        font-family: "Microsoft YaHei";
                        font-weight: 400;
                        color: #999999;
                        line-height: 14px;
                        margin-left: 21px;
                        margin-top: 20px;
                        }
                        em {
                        color: #498de1;
                        a {
                            color: #498de1;
                        }
                        }
                        input[type="checkbox"] {
                        width: 14px;
                        height: 14px;
                        background-color: #fff;
                        -webkit-appearance: none;
                        border: 1px solid #e8e8e8;
                        border-radius: 3px;
                        outline: none;
                        cursor: pointer;
                        position: absolute;
                        top: 0px;
                        }
                        input[type="checkbox"]:checked {
                        background: url("../assets/tankuang/bao_dui.png") no-repeat center;
                        }
                        .checkbox {
                        margin-right: 5px;
                        }
               }
                button{
                        width: 400px;
                        height: 34px;
                        background: linear-gradient(90deg, #F34528, #FF8746);
                        border-radius: 4px;
                        color: #fff;
                        border: none;
                        outline: none;
                        margin-top: 15px;
                }
        }
        .yanma_box{
            padding-left: 40px;
            padding-right: 40px;
            .top{
                display: flex;
                justify-content: space-between;
                margin-top: 39px;
                margin-bottom: 20px;
                h4{
                    font-size: 14px;
                    font-family: "Microsoft YaHei";
                    font-weight: 400;
                    color: #323233;
                    line-height: 26px;
                }
                button{
                    width: 96px;
                    height: 26px;
                    background: #FAF5F5;
                    border-radius: 3px;
                    font-size: 14px;
                    font-family: "Microsoft YaHei";
                    font-weight: 400;
                    color: #FF4B28;
                    line-height: 26px;
                    text-align: center;
                    border: none;
                    display: inline-block;
                }
            }
            .text_box{
                width: 400px;
                height: 35px;
                border: 1px solid #CCCCCC;
                border-radius: 4px;
                text-indent: 1em;
                margin-bottom: 46px;
            }
            .que{
                width: 400px;
                height: 34px;
                background: linear-gradient(90deg, #F34528, #FF8746);
                border-radius: 4px;
                font-size: 14px;
                font-family: "Microsoft YaHei";
                font-weight: bold;
                color: #FFFFFF;
                line-height: 34px;
                border: none;
            }

        }
    }
}

</style>