<template>
  <div class="login_tuyan"  v-show="show1">
         <slide-verify 
            :w="310"
            :h="255"
            @success="onSuccess"
            @fail="onFail"
            @refresh="onRefresh"
            :slider-text="text"
            :imgs="imgs"
             ref="slideblock"
            ></slide-verify>
           <div class="massage">{{msg}}</div>
  </div>
</template>
<script>
import axios from 'axios'; 
import img1 from '~/assets/b1.jpg';
import img2 from '~/assets/b2.jpg';
import img3 from '~/assets/b3.jpg';
import img4 from '~/assets/b4.jpg';
import img5 from '~/assets/b5.jpg';
import img6 from '~/assets/b6.jpg';
//import returnCitySN from 'returnCitySN';
export default {
  name: "login",
  props:['point','project_id','name','myremark','myphone'],
  data() {
    return {
            msg: '',
            text: '向右滑',
            imgs:[
                img1,
                img2,
                img3,
                img4,
                img5,
                img6
           ],
            show1:false,
    };
  },
 
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  methods: {
     onSuccess(){
            this.msg = '验证成功';
            var  ip = ip_arr["ip"];
            var phone= this._props.myphone;
            var city=sessionStorage.getItem('city_id');
            var token=localStorage.getItem('token');
            var project=this._props.project_id;
            var posit=this._props.point; 
            var other= sessionStorage.getItem('other');
            var kid= sessionStorage.getItem('kid');
            let name = this._props.name;
            let remark =  this._props.myremark;

           // var pattern = new RegExp('^1[345678]\\d{9}$');
             var pattern = new RegExp('^1[345678]\\d{9}$');
                 if(phone==''){
                      this.$message.error("手机号不能为空");
                 }else if(!pattern.test(phone)){
                      this.$message.error("请输入正确的手机号");
                 }else {
                        axios.post('/front/flow/sign',{
                          tel:phone,
                          ip:ip,
                          page:10 ,  //家园PC端
                          project:project,
                          city:city,
                          position:posit,
                          remark: remark,
                          source:"线上推广1",
                          other:other,
                          kid:kid,
                          name:name                          
                          }).then(res=>{
                              if(res.data.code==200){
                                   this.$message.success(res.data.message);
                                   this.show1 =false; 
                                    this.$refs.slideblock.reset();
                              }
                              else{
                                 console.log(res.data.message);
                              }

                               if(res.data.code==500  && res.data.message=="已成功为您订阅了该服务"){
                                   this.$message.success(res.data.message);
                                   this.show1 =false; 
                                   this.$refs.slideblock.reset();
                              }
                          
                          })
            }     
          },
        onFail(){
            this.msg = ''
        },
        onRefresh(){
            this.msg = ''
        }
}

}
</script>
<style lang="less">
   .login_tuyan{
      position:fixed;
      background:rgba(0,0,0,0.4);
      width:100%;
      height:100%;
      top:0px;
      left:0px;
      z-index:1000;
      #slideVerify{
         position:absolute;
         top:50%;
         left:50%;
         margin-left:-155px;
         margin-top:-130px;
      }
      .massage{
         position:absolute;
         top:50%;
         left:50%;
         margin-left:-155px;
         margin-top:190px;
         color:#000;
      }
   }
</style>    
