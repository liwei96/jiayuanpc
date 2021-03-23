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
          >
            {{ item.name }}</el-breadcrumb-item
          >
        </el-breadcrumb>
      </div>
      <div class="soubox">
        <div class="sou_project">
          <input
            type="text"
            placeholder="请输入楼盘名称、关键字"
            v-model="searchText"
            @click.stop="showSouBox"
          />
          <span class="btn" @click="getSou"
            ><img src="~/assets/icon/sou.png" alt=""
          /></span>
          <!-- 搜索结果--热门搜索 -->
          <div class="sou_list" v-show="sou_suo.hot_sou">
            <h6>热门搜索</h6>
            <ul>
              <li v-for="item in hots" :key="item.id">
                <nuxt-link :to="`/content/${item.id}`"
                  >{{ item.name }}
                </nuxt-link>
              </li>
            </ul>
          </div>
          <!-- 搜索结果--词搜索 -->
          <div class="sou_list_ci" v-show="sou_suo.ci_sou">
            <h6>
              为您找到如下“{{ this.searchText }}”相关搜索
              <!-- <span>共{{this.sou_list.length}}条相关</span> -->
            </h6>
            <ul>
              <li v-for="item in sou_list" :key="item.id">
                <nuxt-link :to="`/content/${item.id}`">
                  <span v-html="item.name"></span>
                  <p>{{ item.city }} - <i v-html="item.address"></i></p>
                  <em>{{ item.price }}元/m²</em>
                </nuxt-link>
              </li>
            </ul>
          </div>
        </div>
        <button><nuxt-link to="/bmap">地图找房</nuxt-link></button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["router_data"],
  data() {
    return {
      searchText: "",
      hots: [],
      sou_list: [],
      sou_suo: {
        hot_sou: false,
        ci_sou: false,
      },
    };
  },
  watch: {
    searchText: function (newnum) {
      if (newnum !== "") {
        this.sou_suo.hot_sou = false;
        this.sou_suo.ci_sou = true;
        var text = this.searchText;
        let city_name = sessionStorage.getItem("city_name");
        axios
          .post("/api/project/e_search", {
            name: text,
            city: city_name,
          })
          .then((res) => {
            if (res.data.code == 200) {
              let data = res.data.data;
              if (data.length > 0) {
                this.sou_list = data;
              } else {
                this.sou_list = [];
              }
            } else {
              this.sou_list = [];
            }
          })
          .catch((error) => {
            console.log(error);
          });

        // var dd = [];
        // var number = this.projects;
        // for (let val of number) {
        //   if (val["name"].indexOf(text) != -1) {
        //     dd.push(val);
        //   }
        // }
        // this.sou_list = dd;
      } else {
        this.hot_flag = false;
        this.sou_list_flag = false;
      }
    },
  },
  methods: {
    getSou() {
      if (this.searchText == "") {
        this.$message.error("请输入楼盘名称、关键字");
      }
    },
    hideSouBox() {
      this.sou_suo.hot_sou = false;
      this.sou_suo.ci_sou = false;
    },
    showSouBox() {
      this.getTextSou();
      this.sou_suo.hot_sou = true;
    },
    //热门搜索
    getTextSou() {
      var city = sessionStorage.getItem("city_id");
      axios
        .post("/api/project/project_names", {
          city: city,
        })
        .then((res) => {
          if (res.data.code == 200) {
            var number = res.data.data;
            this.hots = res.data.recommands;
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  mounted() {
    document.addEventListener("click", this.hideSouBox, false);
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
      position: relative;
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
          text-indent: 2em;
          outline: none;
        }
        .btn {
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
          img {
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
        a {
          color: rgba(255, 255, 255, 1);
          display: inline-block;
        }
      }
      .sou_list {
        width: 431px;
        height: auto;
        background: #ffffff;
        border: 1px solid #f0f1f5;
        box-shadow: 0px 5px 12px 0px rgba(0, 0, 0, 0.05);
        border-radius: 4px;
        position: absolute;
        top: 37px;
        z-index: 200;
        display: block;
        h6 {
          font-size: 14px;
          font-family: "Microsoft YaHei";
          font-weight: bold;
          color: #808080;
          line-height: 46px;
          padding-left: 19px;
        }
        ul {
          li {
            font-size: 14px;
            font-family: "Microsoft YaHei";
            font-weight: 400;
            color: #313233;
            width: 411px;
            height: 44px;
            cursor: pointer;
            line-height: 44px;
            padding-left: 20px;
            a {
              color: #313233;
              display: block;
            }
          }
          li:hover {
            width: 411px;
            height: 44px;
            background: #fafafa;
            a {
              color: #313233;
            }
          }
        }
      }
      .sou_list_ci {
        width: 535px;
        height: 320px;
        background: #ffffff;
        border: 1px solid #f0f1f5;
        box-shadow: 0px 5px 12px 0px rgba(0, 0, 0, 0.05);
        border-radius: 4px;
        position: absolute;
        top: 33px;
        z-index: 200;
        display: block;
        overflow: auto;
        h6 {
          font-size: 14px;
          font-family: "Microsoft YaHei";
          font-weight: bold;
          color: #808080;
          padding-left: 20px;
          padding-right: 20px;
          line-height: 32px;
          margin-bottom: 10px;
          span {
            font-size: 14px;
            font-family: "Microsoft YaHei";
            font-weight: bold;
            color: #969799;
            float: right;
          }
        }
        ul {
          li {
            width: 495px;
            height: 44px;
            cursor: pointer;
            line-height: 44px;
            padding-left: 20px;
            padding-right: 20px;
            a {
              height: 44px;
              display: block;
              span {
                font-size: 14px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: #313233;
                float: left;
                margin-right: 14px;
                i {
                  line-height: 44px;
                }
              }
              p {
                font-size: 12px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: #808080;
                width: 224px;
                overflow: hidden;
                white-space: normal;
                text-overflow: ellipsis;
                float: left;
                height: 44px;
                i {
                  line-height: 44px;
                }
              }
              em {
                font-size: 12px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: #313233;
                float: right;
              }
            }
            li:hover {
              width: 495px;
              height: 44px;
              background: #fafafa;
            }
          }
        }
      }
      .sou_list_ci::-webkit-scrollbar {
        width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
      }
      .sou_list_ci::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 10px;
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #ecf4fb;
      }
      .sou_list_ci::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        background: #fff;
      }
    }
  }
}
</style>