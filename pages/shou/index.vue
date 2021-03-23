<template>
  <div class="jian_box">
    <!-- 缺少总价--具体地址  几居 -->
      <div class="suggest">我的收藏</div>
      <ul>
        <template  v-if="list.length>0" >
            <li :key="item.id"  v-for="item in list">
               <nuxt-link :to="`/content/${item.id}`">
                  <img :src="item.img" alt="" @click="goDetail(item.id)">
                </nuxt-link>
                <div class="rig">
                      <p class="title"> <nuxt-link :to="`/content/${item.id}`">{{item.name}}</nuxt-link> <span>{{item.status}}</span>
                       <!-- <i><strong class="iconfont iconlujing"></strong>收藏</i> -->
                       </p>
                      <p class="dizhi">{{item.country}}  |  {{item.building_address}} </p>
                      <p class="hu">{{item.apartment}}  {{item.type}}  | 
                            <em v-if="item.area_min!==null && item.area_max!==null">面积：{{parseInt(item.area_min)}}-{{parseInt(item.area_max)}}m²</em>
                            <em v-else>面积：{{isNaN(parseInt(item.area_min))?'': parseInt(item.area_min)}}{{isNaN(parseInt(item.area_max))?'':parseInt(item.area_max)}}m²</em>

                         <span>均价<strong>{{item.single_price}}</strong>元/m²</span></p>
                      <p class="gu">新房咨询师 <span @click.stop="liaoFang(7)"><strong  class="iconfont iconzixun1"></strong>向他咨询</span> <i>参考总价：{{Number(item.total_price_min)}}万元/套起</i></p>
                      <p class="te"> <span>{{item.decorate}}</span> <span>{{item.tag}}</span></p>
                </div>
            </li>
        </template>
        <div  class='no_project' v-else>
            您暂时没有收藏的项目哦
        </div>


         
      </ul> 
      <div class="page" v-show="showflag">
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
///import returnCitySN from 'returnCitySN';
export default {
    // async fetch({store,params}){
    //     let {data}=await axios.get('http://ip-api.com/json')
    //     store.commit('setIp', data.query)
    // },
     async asyncData({app,store,error,query}){
        let uuid = query.uuid;
      if(uuid && uuid!=="undefined" && uuid!=="null"){
        uuid =uuid;
      }else{
         uuid="";
      }
        let {data} = await  app.$axios.post('/api/project/my_collects',{
                    token:store.state.token,
                    city:store.state.city_id,
                    page:1,
                    limit:5,
                    platform:1,
                    ip:store.state.ip,
                    kid:store.state.kid,
                    other:store.state.other,
                    uuid:uuid
        }).catch(e=>{
             error({ statusCode: 404, message: e })
        });
        return {
            list:data.data,
            total:data.num,
        }
     },   
     data(){
        return{
            list:[],
            total:"",
            showflag:false,
        }
     },
     methods:{
         liaoFang(num){
            sessionStorage.setItem('bao_id',num);
           // console.log(this.$parent.$parent.$parent.$parent);
              switch (num){
                    case 7 : 
                    this.$parent.$parent.$parent.$parent.tan_title = "咨询服务";
                    this.$parent.$parent.$parent.$parent.tan_content =
                          "20分内回应、一对一专业服务，了解更多有关房源信息周边动态";
                    break;
                } 
              this.$parent.$parent.$parent.$parent.telflag=true;
        },
        getData(page){
             // const rLoading2 = this.openLoading();
              var token =localStorage.getItem('token');
              var  ip = ip_arr["ip"];
              //var ip=this.$store.state.ip;
              var city= sessionStorage.getItem('city_id');
              if(token){
                 axios.post('/api/project/my_collects',{
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
                     // rLoading2.close();
                     //   console.log(list);
                }else{
                    this.$message(res.data.message);  
                }
                })    
            }
         
        },
        goDetail(id){
            this.$router.push(`/content/${id}`);
        },
        pageChange(num){
            //  console.log(num);
             this.getData(num);
        }
     },
     mounted(){
       console.log(this.list.length);
       if(this.list.length>0){
          this.showflag=true;
       }else{
          this.showflag=false;
       }
        //this.getData(1);
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
            a{
            color:rgba(50,50,50,1);
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
            height:28px;
            span{
              font-size:16px;
              font-family:"Microsoft YaHei";
              font-weight:400;
              color:rgba(56,61,64,1);
              float:right;
              height: 28px;
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