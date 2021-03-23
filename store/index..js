import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
const store = () => new Vuex.Store({
  state: {
    token: '',
    ip: '',
    city_id: '',
    bottom_tui_san: '',
    com_all_tel: '',
    apartments_leng: '',
    city_list:{
      112: "xuzhou",
      1: "hangzhou",
      36: "ningbo",
      38: "jiaxing",
      104: "huzhou",
      73: "shaoxing",
      93: "zhanjiang",
      41: "chongqing",
      47: "chengdu",
      3: "guiyang",
      149:"wuxi",
      181:'zhaoqing',
      216:"shangrao",
      229:"nanchang",
      242:"langfang",
      253: "nantong",
      191: "yichang",
      129: 'qiannan'
    },
     kid:'',
     other:'',
     uuid:'',
     style_mine:0,
     hostname:""
  },
  mutations: {
    setToken(state, data) {
      state.token = data;
    },
    setIp(state, data) {
      state.ip = data;
    },
    setCityId(state, data) {
      state.city_id = data;
    },
    getTui(state, data) { //底部推荐三组数据
      state.bottom_tui_san = data;
    },
    saveTelphone(state, data) {
      state.com_all_tel = data;
    },
    setLouPanLength(state, data) {
      state.apartments_leng == data;
    },
    setCityList(state, data) {
      state.city_list == data;
    },
    setKid(state,data){
       state.kid = data;
    },
    setOther(state,data){
      state.other = data;
    },
    setUuid(state,data){
      state.uuid =data;
    },
    setStyle(state,data){
        state.style_mine = data;
    },
    setHost(state,data){
       state.hostname = data;
    }

  },
  actions: {
    getBottomSan({
      commit
    }) {
      axios.post('http://ll.edefang.net/api/first/feature_second', {
          platform: 1,
          ip: this.$cookies.get('ip'),
          city: this.$cookies.get('city_id'),
          token: this.$cookies.get('token'),
        }).then((res) => {
          commit('bottom_tui_san', res.data)
        })
        .catch((e) => {
          console.log(e)
        })
    },
    nuxtServerInit({
      commit,
      dispatch
    }, {
      req,
      app,
      store
    }) {
      let city_name_arr = {
          112: "徐州市",
          1: "杭州市",
          36: "宁波市",
          38: "嘉兴市",
          104: "湖州市",
          73: "绍兴市",
          93: "湛江市",
          41: "重庆市",
          47: "成都市",
          3: "贵阳市",
          149: "无锡市",
          191: "宜昌市",
          129: '黔南市'
        };
        let city_head_arr = {
          112: "xuzhou",
          1: "hangzhou",
          36: "ningbo",
          38: "jiaxing",
          104: "huzhou",
          73: "shaoxing",
          93: "zhanjiang",
          41: "chongqing",
          47: "chengdu",
          3: "guiyang",
          149: "wuxi",
          191: "yichang",
          129: 'qiannan'
        };
      let token = null;
      let city_id = null;
      let ip = null;
      let kid = null;
      let other =null;
      let uuid =null;

      let cookiesList = req.headers.cookie;
      if (cookiesList) {
        let cookies = cookiesList.split(';');
        let obj = {};
        cookies.forEach(element => {
          let i = element.split('=');
          obj[i[0].trim()] = i[1];
        });
        token = obj['token'];
        city_id = obj['city_id'];
        kid = obj['kid'];
        other = obj['other'];
        uuid  = obj['uuid'];
        if(!city_id){
          commit('setCityId', 1);
          console.log('默认')
        }else{
          commit('setCityId', city_id);
        }
     

        ip = obj['ip'];
        if(ip){
          commit('setIp', ip);
        }else{
          axios.get('http://ip-api.com/json').then(res=>{
              console.log(res.data.query,'ip')
              commit('setIp', res.data.query);
           })
        }
       // commit('setCityId', city_id);
        commit('setToken', token);
        commit('setKid',kid);
        commit('setOther',other);
        commit('setUuid',uuid);
      
      }


      let host = req.headers.host;
      commit("setHost",host);
      console.log(host,'store_host')
      //嘉兴注释
      // if(host.indexOf('www.jy1980') != -1){
      //   commit('setCityId', 1);
      // }else if(host.indexOf('localhost:3001') != -1){
      //   commit('setCityId', 1);
      // }//测试用
      // else
      
      if(host.indexOf('www.jy1980') != -1){ //审核用
         commit('setCityId', 1);
      }
       else 
      if ((host.indexOf('xuzhou') != -1) == true) { //包含徐州
         commit('setCityId', 112);
      } else
      if ((host.indexOf('hangzhou') != -1) == true) { //包含杭州
        commit('setCityId', 1);
      } else
      if ((host.indexOf('ningbo') != -1) == true) { //包含宁波
        commit('setCityId', 36);
      } else
      if ((host.indexOf('jiaxing') != -1) == true) { //包含嘉兴
        commit('setCityId', 38);
      } else
      if ((host.indexOf('huzhou') != -1) == true) { //包含湖州
        commit('setCityId', 104);
      } else
      if ((host.indexOf('shaoxing') != -1) == true) { //包含绍兴
        commit('setCityId', 73);
      } else
      if ((host.indexOf('zhanjiang') != -1) == true) { //包含湛江
        commit('setCityId', 93);
      } else if ((host.indexOf('chongqing') != -1) == true) { //包含重庆
        commit('setCityId', 41);
      } else if ((host.indexOf('chengdu') != -1) == true) { //包含成都
        commit('setCityId', 47);
      } else if ((host.indexOf('guiyang') != -1) == true) { //包含贵阳
        commit('setCityId', 3);
      }
      else if ((host.indexOf('wuxi') != -1) == true) { //包含无锡
        commit('setCityId', 149);
      }
      else if ((host.indexOf('zhaoqing') != -1) == true) { //包含肇庆
        commit('setCityId', 181);
      } else if ((host.indexOf('shangrao') != -1) == true) { //包含上饶
        commit('setCityId', 216);
      } else if ((host.indexOf('nanchang') != -1) == true) { //包含南昌
        commit('setCityId', 229);
      } else if ((host.indexOf('langfang') != -1) == true) { //包含廊坊
        commit('setCityId', 242);
      }else if ((host.indexOf('nantong') != -1) == true) { //包含南通
        commit('setCityId', 253);
      } else if ((host.indexOf('yichang') != -1) == true) { //包含南通
        commit('setCityId', 191);
      } else if ((host.indexOf('qiannan') != -1) == true) { //包含南通
        commit('setCityId', 129);
      }
        
        if(host.indexOf('www.jy1980') != -1){
            console.log('家园样式');
            commit('setStyle',0);
        }else if(host.indexOf('edefang.net') != -1){
            console.log('易得房样式');
            commit('setStyle',1);
        }
      //  axios.get('http://ip-api.com/json').then(res=>{
      //  //  console.log(res.data.query,'ip')
      //    commit('setIp', res.data.query);
      // })
    
      // console.log(token,city_id,ip);
      // 将cookie转成json对象（自己实现该方法）
      //let token = cookieparse(cookie).token;

      // dispatch('getBottomSan');
      //  console.log(app.store.state)
    },
  }
})
export default store
