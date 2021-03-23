<template>
  <div class="jian_box">
      <div class="suggest">我的足迹</div>
      <ul>
        <li v-for="item in list" :key="item.id">
            <img :src="item.img" alt="">
            <div class="rig">
                  <p class="title">{{item.name}} <span>{{item.status}}</span> <i><strong class="iconfont iconlujing"></strong>收藏</i></p>
                  <p class="dizhi">{{item.country}}  |   {{item.building_address}} </p>
                  <p class="hu">{{item.apartment}}  {{item.type}}  |  面积：{{item.area_min}}-{{item.area_max}}m² <span>均价<strong>{{item.single_price}}</strong>元/m²</span></p>
                  <p class="gu">{{logo_text}}咨询师 <span><strong  class="iconfont iconzixun1"></strong>向他咨询</span> <i>参考总价：{{item.total_price_min}}万元/套起</i></p>
                  <p class="te"> <span>{{item.decorate}}</span> <span>{{item.tag}}</span> </p>
            </div>
        </li>
      </ul> 
      <div class="page">
            <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="5"
             @current-change="pageChange">
          </el-pagination>
      </div>
  </div>
</template>
<script>
import axios from 'axios';
//import returnCitySN from 'returnCitySN';
export default {
    data(){
      return{
          list:[],
          total:'',
          logo_text:"家园"
      }
    },
    // async fetch({store,params}){
    //   let {data}=await axios.get('http://ip-api.com/json')
    //   store.commit('setIp', data.query)
    // },
    methods:{
        getData(page){
              const rLoading1 = this.openLoading();
              var token =localStorage.getItem('token');
            //  let ip=this.$store.state.ip;
              var  ip = ip_arr["ip"];
              var city= sessionStorage.getItem('city_id');
              if(token){
                 axios.post('/api/project/my_foot',{
                    token:token,
                    city:city,
                    page:page,
                    limit:5,
                    platform:1,
                    ip:ip,
                  }).then((res)=>{
                if(res.data.code==200){
                      var list=res.data.data;
                      this.list=list;
                      this.total=res.data.num;
                      rLoading1.close();
                     //   console.log(list);
                }else{
                    this.$message(res.data.message);  
                }
                })    
            }
         
        },
        pageChange(num){
              this.getData(num);
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
    mounted(){
         this.getData(1);
    }

}
</script>


<style scoped lang="less">

.jian_box   {
  .suggest{
     width: 880px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-weight: bold;
    color: rgba(55, 58, 67, 1);
    border-bottom: rgba(237, 235, 235, 1) 1px solid;
    margin-top:20px;
  }
  ul{
    margin-bottom:75px;
    li:after{
        content: "";
        height: 0;
        clear: both;
        overflow: hidden;
        display: block;
        visibility: hidden;
    }
    li{
      width:880px;
      height:auto;
      padding-top:30px;
      padding-bottom:30px;
      border-bottom:#F2F5F7 1px solid ;
      img{
        width:220px;
        height:160px;
        border-radius:4px;
        float:left;
        cursor: pointer;
      }
      .rig{
         width:630px;
         height:auto;
         float:right;
        .title{
            font-size:20px;
            font-family:"Microsoft YaHei";
            font-weight:bold;
            color:rgba(50,50,50,1);
            line-height: 20px;
            span{
                font-size:14px;
                font-family:"Microsoft YaHei";
                font-weight:400;
                color:rgba(255,255,255,1);
                width:46px;
                height:20px;
                background:rgba(41,204,114,1);
                border-radius:2px;
                display:inline-block;
                text-align: center;
                line-height: 20px;
                margin-left:30px;
            }
            i{
              font-style:normal;
              font-size:14px;
              font-family:"Microsoft YaHei";
              font-weight:400;
              color:rgba(133,141,147,1);
              float:right;
              strong{
                  color:#FF6A48;
                  font-size:16px;
                  margin-right:5px;
              }
            }
        }
        .dizhi{
            font-size:14px;
            font-family:"Microsoft YaHei";
            font-weight:400;
            color:rgba(113,117,120,1);
            line-height: 38px;
            margin-top:10px;
        }
        .hu{
            font-size:14px;
            font-family:"Microsoft YaHei";
            font-weight:400;
            color:rgba(113,117,120,1);
            line-height: 28px;
            span{
              font-size:16px;
              font-family:"Microsoft YaHei";
              font-weight:400;
              color:rgba(56,61,64,1);
              float:right;
              strong{
                 color:#FF6A48;
                 font-size:28px;
              }
            }
        }
        .gu{
            font-size:14px;
            font-family:"Microsoft YaHei";
            font-weight:400;
            color:rgba(113,117,120,1);
            line-height: 38px;
            span{
              font-size:12px;
              font-family:"Microsoft YaHei";
              font-weight:400;
              color:rgba(67,147,255,1);
              padding:4px 8px;
              border:1px solid rgba(67,147,255,1);
              margin-left:20px;
              strong{
                font-size:16px;
                color:rgba(67,147,255,1);
              }
            }
            i{
              font-style:normal;
              float:right;
            }
        }
        .te{
            span{
              font-size:14px;
              font-family:"Microsoft YaHei";
              font-weight:400;
              color:rgba(76,85,92,1);
              padding:3px 9px;
              background:#F2F5F7;
              display:inline-block;
              margin-right:10px;
            }
            span:first-child{
              background:rgba(234,243,255,1);
              border-radius:2px;
              color:#2E71CC;
            }
        }
      }
    }
  }
  .page{
    margin-bottom: 100px;
  }
 


}




</style>