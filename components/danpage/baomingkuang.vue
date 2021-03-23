<template>
    <div class="bottom_baoming">
        <div class="bao_box">
            <p>{{this._props.mytext}}</p>
            <div class="bao_input">
              <input type="text" placeholder="请输入您的手机号" maxlength="11" v-model="telphone" id="phone"/>
              <button @click='tijiaoDong'>免费咨询</button>
            </div>
         </div> 
    </div>
</template>
<script>
import $ from 'jquery';
export default {
   props:["mytext"],
   data() {
      return {
         text:"这个楼盘有什么优缺点？开发商资质如何？买房需要注意什么？更多问题，敬请免费咨询",
         telphone:''
      }
   },
   created(){
   },
   computed:{
   },
   methods:{
        tijiaoDong(){ //右侧报名
           var number=this.telphone;
           let myreg = new RegExp('^[1][3,4,5,7,8][0-9]{9}$');
                if(number!==""){
                    if(!myreg.test(number)){
                        $("#phone").val('');
                        $('#phone').attr('placeholder', '手机号码不合法');
                    }else{
                         this.$parent.$refs.imgyan.show1 = true;
                         this.$parent.telphone= number;
                         this.$parent.myremark= "主力户型页面+了解详细户型";
                        $("#phone").val('');
                    }
                }else{
                    $('#phone').attr('placeholder', '手机号不能为空');
                }
       },
   },
}
</script>
<style lang="less" scoped>
 .bao_box {
          width: 840px;
          height: 68px;
          background: #ffffff;
          border-top: 6px solid #2ac66d;
          border-bottom: 6px solid #2ac66d;
          border-left: 10px solid #2ac66d;
          border-right: 10px solid #2ac66d;
          margin-bottom: 100px;
          p {
            font-size: 14px;
            font-family: "Microsoft YaHei";
            font-weight: 400;
            color: #464955;
            line-height: 20px;
            float: left;
            width: 385px;
            margin-left: 30px;
            margin-top: 8px;
          }
          .bao_input {
            width: 300px;
            height: 36px;
            background: #f2f5f7;
            border-radius: 3px;
            float: right;
            display: flex;
            margin-right: 30px;
            margin-top: 10px;
            input {
              width: 204px;
              height: 35px;
              border: none;
              background: #f2f5f7;
              color: #464855;
              text-indent: 1em;
            }
            button {
              width: 96px;
              height: 36px;
              background: #2ac66d;
              border-radius: 3px;
              font-size: 14px;
              font-family: "Microsoft YaHei";
              font-weight: 400;
              color: #ffffff;
              line-height: 32px;
              border: none;
            }
          }
        }
</style>
