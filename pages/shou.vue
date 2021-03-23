<template>
<div class="page">
  <my-header  
              :all="common.city_info.all"
              :telphone="common.phone"
              ref="header"></my-header>
  <div class="we">
    <div class="we-left">
      <ul>
        <li>
             <nuxt-link to="/shou/shouc?page=1" class="link">我的收藏</nuxt-link> 
        </li>
        <li>
             <nuxt-link to="/shou/zu?page=1" class="link">我的足迹</nuxt-link>
        </li>
      </ul>
    </div>
    <div class="we-right">
      <nuxt></nuxt>
    </div>
  </div>
   
    <my-footer :c_zhi_citys="common.city_info.all" 
        :c_hot_search="common.hot_search"
        :c_friendlink="common.friend_links"
        :footer_tel="common.phone"></my-footer>

</div>
</template>

<script>
import header from "~/components/header.vue";
import footer from "~/components/footer.vue";
export default{
   // layout:'contentt',
    components:{
          "my-header": header,
           "my-footer":footer
    },
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
  }
}
</script>
<style lang="less"  scoped>
.page{
  width: 100%;
  height: auto;

.we:after{
    content: "";
    height: 0;
    clear: both;
    overflow: hidden;
    display: block;
    visibility: hidden;
}
.we {
  width: 1200px;
  height: auto;
  margin:0 auto;
  .we-left{
      width: 160px;
      height: 132px;
      margin-top:40px;
      float:left;
      ul{
          list-style: none;  
          li{
              width:160px;
              height: 44px;
              text-align: center;
              cursor:pointer;
                margin-bottom:2px ;
                a{
                 width:160px;
                 height: 44px;
                 display:inline-block;
                 line-height: 44px;
                 border-left:2px solid #fff;
                 font-size: 14px;
                  background:#F2F2F2;
                  color: #333334;
                
              }
              .nuxt-link-active{
                  background:#2AC66E;
                  color: #fff;
                  width:160px;
                  height: 44px;
                  display:inline-block;
                  font-size: 14px;
                  line-height: 44px;
              }
              
          }
      }
  }
  .we-right{
        width: 880px;
        height: auto;
        margin-left: 50px;
          float:right;
  }
}

}




</style>