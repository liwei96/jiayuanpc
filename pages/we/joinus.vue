
<template>
  <div class="joinus">
    <div class="mianbao">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>加入我们</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <p class="jieshao">
      {{logo_text}}网是一家借助云计算和专业服务团队实现地产行业新变革，创建互联网+房产成交新模式的多元化公司，
      目前涉足地产、教育、互联网等多个领域，业务不仅遍及国内华东，西南，西北等地区、
      还涉及东南亚等多个海内外地区。线下已开设杭州（总部）、贵阳、两个城市分公司。
      线上拥有强大的自主研发团队，现已开发三大获客平台，能够为线下团队提供大量精准客户。
    </p>
    <p class="huan">{{logo_text}}网欢迎各界精英加入，共谋前途：</p>
    <div class="dianxiao">
      <p>招聘岗位</p>
      <h1>(一)电话销售</h1>
      <h5>岗位职责：</h5>
      <ul>
        <li>1、每天定期完成公司提供的精准客户</li>
        <li>2、协助经理完成团队的既定目标</li>
        <li>3、邀约客户带看售楼部</li>
      </ul>
      <h5>岗位要求：</h5>
      <ul>
        <li>1、年龄21-28周岁</li>
        <li>2、有房产销售经验者优先</li>
      </ul>
      <h5>福利待遇</h5>
      <ul>
        <li>1、带看补贴，补贴金额1500-4000元</li>
        <li>2、开单奖励+月度激励方案</li>
        <li>3、五险+话补+半年度国内旅游+年度国外旅游</li>
        <li>4、年终汽车、购房首付大奖</li>
        <li>5、季度晋升机制</li>
      </ul>
      <h5>联系方式</h5>
      <p>400-718-6686 李女士</p>
    </div>
    <div class="yunzhuan">
        <h1>(一)运营专员</h1> 
        <h5>岗位职责：</h5>
        <ul>
            <li>1、每天定期完成公司提供的精准客户</li>
            <li>2、协助经理完成团队的既定目标</li>
            <li>3、邀约客户带看售楼部</li>
        </ul>
        <h5>岗位要求：</h5>
        <ul>
            <li>1、年龄21-28周岁</li>
            <li>2、有房产销售经验者优先</li>
        </ul>
         <h5>福利待遇</h5>
        <ul>
            <li>1、带看补贴，补贴金额1500-4000元</li>
            <li>2、开单奖励+月度激励方案</li>
            <li>3、五险+话补+半年度国内旅游+年度国外旅游</li>
            <li>4、年终汽车、购房首付大奖</li>
            <li>5、季度晋升机制</li>
        </ul>
        <h5>联系方式</h5>
        <p>400-718-6686 李女士</p>
    </div>
  </div>
</template>
<script>
export default {
    head() {
    return {
      title: `${this.logo_text}新房-加入我们`,
      meta: [
        { hid: "description", name: "description", content: `${this.logo_text}新房-加入我们` },
        { hid: "Keywords", name: "Keywords", content: `${this.logo_text}新房-加入我们` },
      ],
    };
  },
  data() {
    return {
      logo_text:"家园"
    };
  },
  created() {},
  beforeMount(){
        let  mine = this.$store.state.style_mine;
        if(mine==1){ //易得房样式
            this.logo_text = "易得房";
        }else if(mine==2){ //家园样式
           this.logo_text = "家园";
        }
  },
  computed: {},
  methods: {},
};
</script>
<style lang="less" scoped>
.joinus{
     width:1200px;
     height: auto;
     margin: 0 auto;
     .mianbao{
        margin-top: 41px;
        margin-bottom: 26px;
     }
     .jieshao{
        font-size: 16px;
        font-family: "Microsoft YaHei";
        font-weight: 400;
        color: #4D4D4D;
        line-height: 30px;
     }
     .huan{
        font-size: 16px;
        font-family: "Microsoft YaHei";
        font-weight: 400;
        color: #2A2A2A;
        line-height: 82px;
     }
     .dianxiao{
         p{
            font-size: 16px;
            font-family: "Microsoft YaHei";
            font-weight: 400;
            color: #2A2A2A;
            margin-top: 33px;
            line-height: 16px;
         }

         h1{
            font-size: 20px;
            font-family: "Microsoft YaHei";
            font-weight: bold;
            color: #2A2A2A;
            line-height: 80px;
         }
         h5{
            font-size: 16px;
            font-family: "Microsoft YaHei";
            font-weight: bold;
            color: #2A2A2A;  
            line-height: 16px;
            margin-bottom: 13px;
            margin-top:20px;
         }
         ul{
             li{
                font-size: 16px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: #4D4D4D;
                line-height: 30px;
             }
         }
     }
     .yunzhuan{
         margin-bottom: 100px;
         h1{
            font-size: 20px;
            font-family: "Microsoft YaHei";
            font-weight: bold;
            color: #2A2A2A;
            line-height: 80px;
         }
         h5{
            font-size: 16px;
            font-family: "Microsoft YaHei";
            font-weight: bold;
            color: #2A2A2A;  
            line-height: 16px;
            margin-bottom: 13px;
            margin-top:20px;
         }
         ul{
             li{
                font-size: 16px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: #4D4D4D;
                line-height: 30px;
             }
         }
     } 
}
</style>
