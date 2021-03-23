<template>
  <div class="jian_box">
    <!-- 缺少总价--具体地址  几居 -->
      <div class="suggest">我的收藏</div>
      <ul>
         <template  v-if="list.length>0" >
              <li v-for="item in list" :key="item.id">
                <nuxt-link :to="`/content/${item.id}`">
                    <img :src="item.img" alt="" @click="goDetail(item.id)">
                </nuxt-link>
                  <div class="rig">
                        <p class="title">  <nuxt-link :to="`/content/${item.id}`">{{item.name}} <span>{{item.state}}</span>  </nuxt-link> </p>
                        <p class="dizhi">{{item.country}}  |  {{item.address}} </p>
                        <p class="hu">{{JSON.stringify(item. house_types).replace(/\[|]/g, "")}}  {{item.type}}  |  
                            <em >面积：{{item.area}}m²</em>
                           <span>均价<strong>{{item.price}}</strong>元/m²</span></p>
                        <p class="gu">新房咨询师：{{item.staff}} <span @click.stop="bianTong(104,item.id)"><strong  class="iconfont iconzixun1"></strong>向他咨询</span> <i>参考总价：{{item.total}}万元/套起</i></p>
                        <p class="te"> <span>{{item.decorate}}</span> <span>{{item.type}}</span></p>
                  </div>
              </li>
         </template>
           <div  class='no_project' v-else>
            您暂时没有收藏的项目哦
          </div>
      </ul> 
      <div class="page" >
            <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
             :page-size="5"
              :hide-on-single-page=true
               @current-change="pageChange"
              :current-page.sync="currentPage1">
          </el-pagination>
      </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
      watchQuery:["page"],
      head () {
        return {
          title: "我的收藏",
          meta: [
            { hid: 'description', name: 'description', content: '我的收藏' },
          ]
        }
      },
     async asyncData({app,store,error,query}){
        let uuid = query.uuid;
      if(uuid && uuid!=="undefined" && uuid!=="null"){
        uuid =uuid;
      }else{
         uuid="";
      }
        let {data} = await  app.$axios.get('/jy/mine/collect',{
                   params:{
                    token:store.state.token,
                    page:query.page,
                    limit:5,
                    uuid:uuid
                   }
        }).catch(e=>{
             error({ statusCode: 404, message: e })
        });
        return {
            list:data.data,
            total:data.total,
            currentPage1:parseInt(query.page)
        }
     },   
     data(){
        return{
            list:[],
            total:"",
            currentPage1:1
        }
     },
     methods:{
        bianTong(num,project_id) {
             sessionStorage.setItem("bao_id", num);
             sessionStorage.setItem("project_id", project_id);
            switch (num) {
              case 104:
                this.$parent.$parent.$parent.$parent.baoming_tel.tan_title = "向TA咨询"; //ok
                this.$parent.$parent.$parent.$parent.baoming_tel.tan_content =
                  "价格变动这么快？订阅楼盘变价通知，楼盘变价我们将第一时间通知您";
                this.$parent.$parent.$parent.$parent.baoming_tel.default_show = true;
                this.$parent.$parent.$parent.$parent.baoming_tel.kaipan_show = false;
                break;
            }
            this.$parent.$parent.$parent.$parent.baoming_tel.telflag = true;
       },
        liaoFang(num){
            sessionStorage.setItem('bao_id',num);
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
              //let ip =this.$store.state.ip;
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
            this.$router.push(`/shou/shouc?page=${num}`)
        }
     },
       beforeMount(){
       //域名中含有www.jy8006.com，直接跳对应分站
          // let city_head_arr = {
          //   112: "xuzhou",
          //   1: "hangzhou",
          //   36: "ningbo",
          //   38: "jiaxing",
          //   104: "huzhou",
          //   73: "shaoxing",
          //   93: "zhanjiang",
          //   41: "chongqing",
          //   47: "chengdu",
          //   3: "guiyang",
          //    149:"wuxi"
          // };
           let  city_head_arr =this.$store.state.city_list;
         //  console.log(city_head_arr);

          let has_city=this.$cookies.get('city_id');
          //   let str="www.jy8006.com";
          let  str ='www.jy8006.com';
          let host=window.location.host;
          if(host.indexOf(str)!==-1){
            if(!city_head_arr.hasOwnProperty(has_city)){
                console.log(111)
            }else{
                  window.location.href ="http://" + city_head_arr[has_city] + ".jy8006.com"+this.$route.fullPath;
            }
          
          }
      },
     mounted(){
       
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
            height: 28px;
            em{
              font-style:normal;
            }
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
              cursor: pointer;
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
    .no_project{
       font-size:18px;
       color:#000;
       line-height: 383px;
       text-align: center;
    }

  }
  .page{
    margin-bottom: 100px;
  }
 


}




</style>