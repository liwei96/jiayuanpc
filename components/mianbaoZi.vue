<template>
  <div class="sou_lan">
    <div class="sou_lan_cen">
      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item
            v-for="(item, index) in this._props.router_data"
            :key="index"
            :to="item.to"
            >{{ item.name }}</el-breadcrumb-item
          >
        </el-breadcrumb>
      </div>
      <div class="soubox">
        <div class="sou_project">
          <!-- <input type="text" placeholder="搜搜你想要了解的房产资讯吧"  @input="changeNumber" v-model="souzixun"> -->
          <input
            type="text"
            placeholder="搜搜你想要了解的房产资讯吧"
            v-model="souzixun"
          />
          <span @click="goSouPage"
            ><img src="~/assets/icon/sou.png" alt=""
          /></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["router_data"],
  data() {
    return {
      souzixun: "",
    };
  },
  methods: {
    changeNumber(e) {
      this.$emit("input", e.target.value);
    },
    goSouPage() {
      var str = this.souzixun;
      if (str !== "") {
        this.$router.push(`/fangzisearch?name=${str}&page=1`);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.sou_lan {
  width: 100%;
  height: 60px;
  background: rgba(248, 248, 248, 1);
  .sou_lan_cen {
    width: 1200px;
    height: 60px;
    margin: 0 auto;
    .breadcrumb {
      float: left;
      .el-breadcrumb {
        line-height: 60px;
      }
    }
    .soubox {
      margin-top: 12px;
      float: right;
      .sou_project {
        width: 432px;
        height: 36px;
        display: flex;
        float: left;
        input {
          width: 360px;
          height: 36px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(230, 230, 230, 1);
          border-radius: 3px 0px 0px 3px;
          font-size: 14px;
          font-family: "Microsoft YaHei";
          font-weight: 400;
          color: rgba(100, 101, 102, 1);
          text-indent: 1em;
          outline: none;
        }
        span {
          width: 72px;
          height: 37px;
          background: rgba(42, 198, 109, 1);
          border-radius: 0px 3px 3px 0px;
          color: #fff;
          text-align: center;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          em {
            font-size: 20px;
            line-height: 36px;
          }
        }
      }
      button {
        width: 94px;
        height: 36px;
        background: rgba(42, 198, 109, 1);
        border-radius: 3px;
        font-size: 16px;
        font-family: "Microsoft YaHei";
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        text-align: center;
        line-height: 36px;
        border: none;
        float: right;
        margin-left: 10px;
        outline: none;
        cursor: pointer;
      }
    }
  }
}
</style>