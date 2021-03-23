<template>
  <div class="about_dao">
     <div class="dao_title">
         <h3>相关导购</h3> 
         <em><nuxt-link to="/fangzi/46/1">更多></nuxt-link></em>   
     </div>
     <ul class="dao_list">
        <li  v-for="(item,index) in this._props.daolist" :key="item.id">
            <nuxt-link :to="`/article/${item.id}`">
                <span>{{index+1}}</span>
                <p>{{item.title}}</p>
            </nuxt-link>
        </li>  
     </ul>
  </div>
</template>

<script>
export default {
   props:["daolist"],
   data(){
       return{
       }
   },
   mounted(){

   }

}
</script>

<style lang="less" scoped>
.about_dao{
    width: 300px;
    height: 280px;
    border: 1px solid #EDEDED;
    float: right;
     .dao_title{
        width: 299px;
        height: 60px;
        background: #F2F2F2;
        h3{
            font-size: 18px;
            font-family: "Microsoft YaHei";
            font-weight: 400;
            color: #313233;
            line-height: 60px;
            float: left;
            padding-left:17px ;
        }
        em{
            font-size: 16px;
            font-family: "Microsoft YaHei";
            font-weight: 400;
            color: #3A3C49;
            line-height: 60px;
            float: right;
            padding-right: 22px;
            a{
                 color: #3A3C49;
            }
        }
     }
     .dao_list{
         li:after{
            content:'';
            overflow: hidden;
            clear: both;
            height: 0;
            visibility: hidden;
            display: block;
         }
       li{
         cursor: pointer;
         span{
            width: 20px;
            height: 20px;
            background: #Fff;
            display: inline-block;
            text-align:center;
            color: #313233;
            line-height: 20px;
            margin-right: 8px;
            margin-left: 16px;
            float: left;
            margin-top: 10px;
         }
         P{
              font-size: 14px;
            font-family: "Microsoft YaHei";
            font-weight: 400;
            color: #313233;
            line-height: 42px;
            width: 233px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            float: left;
         }
       }
       li:first-child span{
             width: 20px;
            height: 20px;
            background: #FFF1BB;
            color:#FBBE1B ;
       }
        li:nth-child(2) span{
             width: 20px;
            height: 20px;
            background: #D7F3FF;
            color:#40A2F4;
       }
        li:nth-child(3) span{
             width: 20px;
            height: 20px;
            background: #FFEBCF;
            color:#FB941B;
       }
     }
}
</style>