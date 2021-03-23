<template>
  <div class="homeright">
    <div class="mianbao">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>关于我们</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="guan_title">
      <h1>ABOUT US</h1>
      <h2>关于我们</h2>
      <p>ABOUT US</p>
    </div>

    <div class="homeright1-right">
      <p>{{logo_text}}新房是{{msg}}打造的一手房信息平台，集房源展示、实时咨询、房产动态跟踪、价格对比等功能于一体。</p>
      <p v-if="$store.state.style_mine==2">
        www.jy1980.com是我们专属的网站域名，其中“jy”是{{logo_text}}的缩写，“1980”则是为了纪念1980年6月我国开始正式实施住房商品化政策，
        这两个简写也是{{logo_text}}的初衷，为让更多购房者买到属于自己的{{logo_text}}而努力。
      </p>
      <p>
        {{logo_text}}正在打造一个全面的房产信息库，让购房这件事更透明、更简单。目前平台内汇集了碧桂园，恒大，融创，融信、绿城等众多知名房企开发的优质项目。
        这些楼盘的近期动态和房价变化也都能够做到第一时间更新，
        为购房者分享着新鲜、全面的房产资讯。而且这些项目信息全部存放在项目数据库中，通过平台的智能搜索便能快速直达。
      </p>
      <p>
        我们欢迎有想法有资源的人士以任意方式加入我们平台，你可以选择以分站合作运营、媒体合作，开发商直接推广合作等方式加入我们，
        古人云“海内存知己，天涯若比邻”，希望我们能有这个机会一起努力，共创房产新时代
      </p>
      <p>公司位于：{{address}}</p>
      <p>联系电话：400-718-6686</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      com_tel: "",
      logo_text:"家园",
      msg:'杭州亚汉网络科技有限公司',
      address: '浙江省杭州市萧山区宁围街道杭州国际办公中心嘉润铭座7幢2单元1303室-1'
    };
  },
  //为了避免子组件中的meta标签不能正确覆盖父组件中相同的标签而产生重复的现象，建议利用 hid 键为meta标签配一个唯一的标识编号
  head() {
    return {
      title: `${this.logo_text}新房-关于我们`,
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            `${this.logo_text}新房-关于我们`,
        },
        { hid: "Keywords", name: "Keywords", content: `${this.logo_text}新房-关于我们` },
      ],
    };
  },
  methods: {
  },
  beforeMount() {
    //域名中含有www.jy8006.com，直接跳对应分站
    // let  city_head_arr =this.$store.state.city_list;
    // let has_city=this.$cookies.get('city_id');
    // let  str ='www.jy8006.com';
    // let host=window.location.host;
    // if(host.indexOf(str)!==-1){
    //   if(!city_head_arr.hasOwnProperty(has_city)){
    //       console.log(111)
    //   }else{
    //         window.location.href ="http://" + city_head_arr[has_city] + ".jy8006.com"+this.$route.fullPath;
    //   }
    // }
       let  mine = this.$store.state.style_mine;
        if(mine==1){ //易得房样式
            this.logo_text = "易得房";
            this.msg="杭州易得房科技有限公司"
            this.address="浙江省杭州市西湖区三墩镇池华街332号丰盛九玺天城9号楼6层611室"
        }else if(mine==2){ //家园样式
           this.logo_text = "家园";
           this.msg = "杭州亚汉网络科技有限公司"
           this.address="浙江省杭州市萧山区宁围街道杭州国际办公中心嘉润铭座7幢2单元1303室-1"
        }
  },
  mounted() {
    var tel = sessionStorage.getItem("telphone_com");
    this.com_tel = tel;
  },
};
</script>

<style lang="less" scoped>
.homeright {
  .mianbao {
    width: 1200px;
    height: auto;
    margin: 0 auto;
    margin-top: 40px;
  }
  .guan_title {
    width: 280px;
    height: 90px;
    margin: 0 auto;
    position: relative;
    top: 38px;
    margin-bottom: 80px;
    h1 {
      font-size: 42px;
      font-family: "Microsoft YaHei";
      font-weight: bold;
      color: #f3f3f3;
      text-align: center;
      width: 280px;
      height: 42px;
      line-height: 42px;
    }
    h2 {
      font-size: 40px;
      font-family: "Microsoft YaHei";
      font-weight: bold;
      color: #2a2a2a;
      text-align: center;
      position: absolute;
      left: 50%;
      transform: translate(-50%);
      top: 9px;
      width: 280px;
    }

    p {
      font-size: 14px;
      font-family: "Microsoft YaHei";
      font-weight: 400;
      color: #2a2a2a;
      text-align: center;
      position: absolute;
      left: 50%;
      transform: translate(-50%);
      top: 62px;
    }
  }

  .homeright1-right {
    width: 1200px;
    height: auto;
    margin: 0 auto;
    margin-bottom: 84px;
    p {
      font-size: 16px;
      font-family: "Microsoft YaHei";
      font-weight: 400;
      color: #4d4d4d;
      line-height: 30px;
      margin-bottom: 16px;
    }
  }
}
</style>