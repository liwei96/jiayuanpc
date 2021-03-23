<template>
    <div class="yukanfang">
           <div class="yu_title" :style="this._props.img_bg">
           </div>
           <div class="form_box">
                <p class="tips">{{this._props.text_tishi}}</p>
                <input type="text" placeholder="请输入手机号码（必填）" v-model='telphone' id="phone2" maxlength="11">
                <p class="xieyi">
                     <input type="checkbox" v-model="checked" class="checkbox"/>
                     <span>我已阅读并同意<em><nuxt-link to="/we/fuwu">《{{this.$store.state.style_mine==0?'家园':'易得房'}}用户协议》</nuxt-link></em></span>
                </p>
                <button @click="tijiaoDong">确定</button>
           </div>
    </div>
</template>

<script>
import $ from 'jquery';
import axios from 'axios'
export default {
    props:["img_bg","text_tishi"],
    data(){
        return{
            checked:true,
            bgImg: {
                backgroundImage: "url(" + require("~/assets/loudong_top.jpg") + ")",
                backgroundRepeat: "no-repeat",
            }, 
            telphone:'',
            logo_text:'家园'
        }
    },
     beforeMount(){
        let  mine = this.$store.state.style_mine;
      //  console.log(mine,'mine');
        if(mine==1){ //易得房样式
            this.logo_text = "易得房";
        }else if(mine==2){ //家园样式
           this.logo_text = "家园";
        }
   },
   mounted(){
        let  mine = this.$store.state.style_mine;
      //  console.log(mine,'mine');
   },
    methods:{
       tijiaoDong(){ //右侧报名
           var number=this.telphone;
           let myreg = new RegExp('^[1][3,4,5,7,8][0-9]{9}$');
                if(number!==""){
                    if(!myreg.test(number)){
                        $("#phone2").val('');
                        $('#phone2').attr('placeholder', '手机号码不合法');
                    }else{
                         this.$parent.$refs.imgyan.show1 = true;
                         this.$parent.telphone= number;
                        // this.telphone ='';
                       //  this.$parent.myremark= `主力户型页面+下方免费咨询框`;
                       // $("#phone2").val('');
                    }
                }else{
                    $('#phone2').attr('placeholder', '手机号不能为空');
                }
       },
    }
}
</script>

<style lang="less" scoped>
  .yukanfang{
        width: 300px;
        height: 320px;
        border: 1px solid #EDEDED;
        float: right;
        margin-top: 40px;
      .yu_title{
        width: 300px;
        height: 70px;
        font-size: 18px;
        font-family: "Microsoft YaHei";
        font-weight: bold;
        color: #FFFFFF;
        line-height: 70px;
        background: url("../../assets/icon2.png") no-repeat;
        h3{
             font-size: 18px;
            font-family: "Microsoft YaHei";
            font-weight: bold;
            color: #FFFFFF;
            line-height: 70px;
            margin-left: 14px;
        }
      }
      .form_box{
        padding-left: 16px;
        padding-right:16px;
        .tips{
            font-size: 14px;
            font-family: "Microsoft YaHei";
            font-weight: 400;
            color: #313233;
            line-height: 20px;
            margin-top: 21px;
            margin-bottom: 18px;
        }
        input{
            width: 267px;
            height: 40px;
            border: 1px solid #EDEDED;
            color: #646566;
            font-size: 14px;
            font-weight: 400;
            text-indent: 1em;
        }
        .xieyi{
            float: left;
            display: flex;
            justify-content: center;
            align-items: center;
            input[type="checkbox"] {
                width: 16px;
                height: 16px;
                background-color: #fff;
                -webkit-appearance: none;
                border: 1px solid #E8E8E8;
                border-radius: 3px;
                outline: none;
                cursor: pointer;
                }
            input[type="checkbox"]:checked {
                background: url("../../assets/bao_dui.png") no-repeat center;
            }
            .checkbox{
                margin-right:5px ;
            }
            span{
                 font-size: 12px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: #7A7A7A;
                line-height: 40px;
                 em{
                    color: #498DE1;
                    font-size: 12px;
                    a{
                         color: #498DE1;
                    }
                }
            }
           
        }
        button{
            width: 267px;
            height: 40px;
            border: 1px solid #EDEDED;
            font-size: 16px;
            font-family: "Microsoft YaHei";
            font-weight: 400;
            color: #FFFFFF;
            line-height: 20px;
            background: #FF9A26;
            outline: none;
            margin-top: 20px;
        }
      }
  }
</style>