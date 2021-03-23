<template>
  <div>
    <!-- <el-radio-group v-model="area">
      <el-radio
        @click.native.prevent="clickitem(item.AreaName)"
        :label="item.AreaName"
        v-for="(item, index) in areaItem"
        :key="index"
        >{{ item.AreaName }}</el-radio
      >
    </el-radio-group> -->
    <!-- 右侧导航栏 -->
    <div class="right_fixed">
      <ul class="right_li">
        <li
          @mouseenter="liu_hover"
          :class="{ active: bg_flag.flag1 }"
          @mouseleave="liu_leave"
        >
          <img :src="img_bg.img_01" alt="" />
          <span>留言</span>
        </li>
        <li
          :class="{ active: bg_flag.flag2 }"
          @mouseenter="online_hover"
          @mouseleave="online_leave"
          class="zixun"
          @mousedown.stop="showChatBox"
          v-show="zixun_show"
        >
        <el-badge :is-dot="nav_show_hong" class="item">
          <img :src="img_bg.img_02" alt="" />
         </el-badge> 
          <span>在线</span>
          <em>咨询</em>
          <div class="yewuyuan" v-show="yewu_show">
            <div class="top">
              <img src="~/assets/content_pro.png" alt="" class="head_img" />
              <div class="right_name">
                <h2>{{ye_box.name}} <i>新房咨询</i></h2>
                <p>从业咨询服务{{ye_box.year}}年</p>
              </div>
            </div>
            <div class="fenshu">
              <div class="fen_list">
                <strong>{{ye_box.user_num}} <i>人</i></strong>
                <p>服务客户</p>
              </div>
              <div class="fen_list">
                <strong>{{ye_box.look_num}} <i>次</i></strong>
                <p>带看客户</p>
              </div>
              <div class="fen_list">
                <strong>{{ye_box.rate}} <i>%</i></strong>
                <p>好评率</p>
              </div>
            </div>
            <div class="bottom">
              <button class="btn_zixun" @click="goChat">在线咨询</button>
              <button class="shao_zixuxn">稍后咨询</button>
            </div>
          </div>
        </li>
        <li class="new_news"  v-show="xiaoxi_show" @click="showBox">
             <el-badge :is-dot="nav_show_hong" class="item">
                <img src="~/assets/im/xiaoxi.gif" alt="" />
            </el-badge> 
              <span>有新</span>
              <em>消息</em>
               <div class="yewuyuan" v-show="yewu_show">
                    <div class="top">
                      <img src="~/assets/content_pro.png" alt="" class="head_img" />
                      <div class="right_name">
                        <h2>{{ye_box.name}} <i>新房咨询</i></h2>
                        <p>从业咨询服务{{ye_box.year}}年</p>
                      </div>
                    </div>
                    <div class="fenshu">
                      <div class="fen_list">
                        <strong>{{ye_box.user_num}} <i>人</i></strong>
                        <p>服务客户</p>
                      </div>
                      <div class="fen_list">
                        <strong>{{ye_box.look_num}} <i>次</i></strong>
                        <p>带看客户</p>
                      </div>
                      <div class="fen_list">
                        <strong>{{ye_box.rate}} <i>%</i></strong>
                        <p>好评率</p>
                      </div>
            </div>
            <div class="bottom">
              <button class="btn_zixun" @click="goChat">在线咨询</button>
              <button class="shao_zixuxn">稍后咨询</button>
            </div>
          </div>
        </li>

        <li
          @mouseover="saoma_hover"
          :class="{ active: bg_flag.flag3 }"
          @mouseleave="saoma_leave"
        >
          <img :src="img_bg.img_03" alt="" />
          <span>扫码</span>
          <em>拨号</em>
        </li>
        <li
          @mouseover="xiaoChengXu_hover"
          :class="{ active: bg_flag.flag4 }"
          @mouseleave="xiaoChengXu_leave"
        >
          <img :src="img_bg.img_04" alt="" />
          <span>小程</span>
          <em>序</em>
        </li>
        <li
          @mouseover="fan_hui"
          :class="{ active: bg_flag.flag5 }"
          @mouseleave="fan_leave"
          class=".up-btn"
        >
          <img :src="img_bg.img_05" alt="" />
          <span>返回</span>
          <em> 顶部</em>
        </li>
      </ul>
    </div>
    <!-- 聊天框 -->
    <div id="parent">
        <div class="dragBox" v-if="visible" 
          v-drag
          id="child"
        >
          <div class="kehu_list">
            <div class="zixun_tou">
              <span class="iconfont iconzixun1"></span>
              <p>在线咨询</p>
            </div>
            <div class="people_list">
              <ul>
                <li
                  @mousedown.stop="bianSe(item)"
                  :class="active_id == item.id ? 'active' : ''"
                  v-for="item in people"
                  :key="item.id"
                >
                  <div class="list_box">
                    <el-badge
                      :is-dot="item.isshow"
                      class="item"
                    >
                      <img :src="decodeURIComponent(item.img)" alt  v-if="item.img"/>
                      <img
                      v-else
                      src="https://static.runoob.com/images/mix/img_avatar.png"
                    />
                    </el-badge>
                    <div class="text_list">
                      <h3>
                        <em>{{ item.name }}</em>
                        <span>{{ item.time }}</span>
                      </h3>
                      <p v-html="item.content"></p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="content_list">
            <div class="content_title">
              <span><i></i>家园-{{ online_name }}为您服务</span>
              <em class="iconfont iconchahao" @mousedown.stop="closebox"></em>
            </div>
            <div class="chat_list">
              <!-- 默认的发送的项目-顾客发送 -->
              <div class="left_project new" v-if="this.project_content.isshow">
                <div class="head_image">
                  <img :src="customer_head_img" />
                </div>
                <div class="left_chat">
                  <div class="left_triangle"></div>
                  <div class="project">
                    <img :src="project_content.img" alt />
                    <div class="pro_text">
                      <h3>{{ project_content.name }}</h3>
                      <p>建面 {{ project_content.area }}m²</p>
                      <p>均价 {{ project_content.price }}元/m²</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <template v-for="(item, index) in right_chat">
                <!-- 业务员-聊天-left -->
                <div
                  class="sender newcom"
                  v-if="item.from == active_id && item.content!=='%get your phone%' &&  item.content!=='%put my card%' "
                  :key="index + 'left'"
                >
                  <div class="head_image">
                    <img
                      :src="yewu_head_img"
                      v-if="yewu_head_img"
                    />
                    <img
                      v-else
                      src="https://static.runoob.com/images/mix/img_avatar.png"
                    />
                  </div>
                  <div class="left_chat">
                    <div class="left_triangle"></div>
                    <span v-html="item.content"></span>
                  </div>
                </div>
                <!-- 业务员-发送分析报告-left -->
                <div class="sender_fenxi newcom" 
                v-if="item.from == active_id && item.content=='%get your phone%'"
                :key="index+'fenxi'">
                    <div class="head_image">
                        <img
                          :src="yewu_head_img"
                          v-if="yewu_head_img"
                        />
                          <img
                          v-else 
                          src="https://static.runoob.com/images/mix/img_avatar.png"
                        />
                    </div>
                  <div class="left_chat_fenxi">
                    <div class="send_box">
                        <img src="/_nuxt/assets/im/fenxi.png" alt="">
                        <div class="text_box">
                            <h3>免费为您制定专属分析报告</h3>
                            <p>向允家咨询师免费领取分析报告,内附有购房流 程全盘解读</p>
                            <button @mousedown.stop="showBaoGao">免费领取</button>
                        </div>
                        
                    </div>
                  </div>
                </div>
                <!--客户-聊天-right-->
                <div
                  class="receiver newcom"
                  v-if="(item.from == customer_id) &&  item.content.indexOf('data:image')==-1"
                  :key="index + 'right'"
                >
                  <div class="head_image">
                    <img :src="customer_head_img" />
                  </div>
                  <div class="left_chat">
                    <div class="left_triangle"></div>
                    <span v-html="item.content"></span>
                  </div>
                </div>
                <!--客户-图片-right-->
                <div
                  class="receiver_img newcom"
                  v-if="item.content.indexOf('data:image')!==-1"
                  :key="index * 9 + 3"
                >
                  <div class="head_image">
                    <img :src="customer_head_img" />
                  </div>
                  <div class="left_chat">
                    <div class="left_triangle"></div>
                    <img :src="item.content" class="pic" />
                  </div>
                </div>
              </template>
            </div>
            <!-- 发送框样式 -->
            <div class="send_box">
              <div class="gong_btn">
                <span
                  class="iconfont iconxiaolian"
                  @mousedown.stop="BiaoShow"
                ></span>
                <em class="iconfont icontupian">
                  <input type="file" id="file" @change="img_Updated" />
                </em>
                <strong
                  class="iconfont iconzixun"
                  @mousedown.stop="optenBoxShow"
                ></strong>
              </div>
              <textarea
                name
                id="talk_content"
                cols="30"
                rows="10"
                placeholder="在这里输入你需要咨询的内容"
                @keyup.enter="submit"
                v-model="content"
                @change="content_Change"
              ></textarea>
              <div class="send_text">
                <p>按 Enter 提交</p>
                <!-- <el-tooltip
                  class="item"
                  effect="dark"
                  content="不能发送空白信息"
                  placement="top"
                > -->
                  <button @mousedown.stop="send">发送</button>
                <!-- </el-tooltip> -->
              </div>
              <!-- 常用语弹框 -->
              <div class="opten_talk" v-show="optenShow">
                <div class="opten_title">
                  <h4>大家都在问</h4>
                  <!-- <span
                    class="iconfont iconchahao"
                    @mousedown.stop="optenBoxhide"
                  ></span> -->
                </div>
                <ul>
                  <li
                    @mousedown.stop="Sel_changYongyu"
                    v-for="item in result"
                    :key="item.id"
                  >
                    {{ item.content }}
                  </li>
                </ul>
              </div>
              <!-- 常用表情包弹框 -->
              <div class="opten_talk_biao" v-show="biao_show">
                <!-- <div class="biao_title">
                  <h4>选择表情</h4>
                  <span
                    class="iconfont iconchahao"
                    @mousedown.stop="Biaohide"
                  ></span>
                </div> -->
                <ul>
                  <li v-for="(item, index) in imgList" :key="index">
                    <img
                      :src="item.src"
                      :alt="item.alt"
                      :title="item.alt"
                      @mousedown.stop="selBiao(item)"
                    />
                  </li>
                </ul>
              </div>
              <!-- 分析报告 输入手机号 -->
              <div class="bao_tel_box" v-show="baogao_show">
                <div class="bao_title">
                  <h3>分析报告</h3>
                  <span class="iconfont iconchahao" @mousedown.stop="hideBaoBox"></span>
                </div>
                <div class="bao_box">
                  <input type="text" placeholder="请输入手机号" v-model="baogao_tel"/>
                  <div class="xieyi">
                    <input type="checkbox" v-model="checked" class="checkbox" />
                    <p>
                      我已阅读并同意
                      <em><nuxt-link to="/we/fuwu">《家园用户协议》</nuxt-link></em>
                    </p>
                  </div>
                  <button>确定</button>
                </div>
              </div>
            </div>
          </div>

          <!-- 没有业务员的提示 -->
          <div class="tootip" v-show="tootip_show">
            <p>正在发起聊天，请稍后...</p>
          <img src="~/assets/dian.gif" alt="">
          </div>
        </div>
    </div>

  </div>
</template>
<script>
import $ from "jquery";
import ReconnectingWebSocket from "reconnecting-websocket";
export default {
  directives: {
    drag (el) {
      const oDiv = el
      // 拖拽时间标识
      let firstTime = ''
      let lastTime = ''
      document.onselectstart = function () {
        return false
      }
      oDiv.onmousedown = function (e) {
        // 为了区分点击还是拖拽，使用时间差来判断，200毫秒内为点击，200毫秒外为拖拽，初始化为点击
        document.getElementById('parent').setAttribute('drag-flag', false)
        firstTime = new Date().getTime()

        console.log(oDiv);
        // oDiv.offsetParent.offsetWidth - oDiv.offsetLeft - oDiv.offsetWidth
        // 表示元素距离父元素右边距的距离
        const disX =
          oDiv.offsetParent.offsetWidth -
          oDiv.offsetLeft -
          oDiv.offsetWidth +
          e.clientX
        // oDiv.offsetTop 表示距离父元素顶边距的距离
        const disY = oDiv.offsetTop - e.clientY
        // 设置最大右边距
        const maxRight = oDiv.offsetParent.offsetWidth - oDiv.offsetWidth
        // 设置最大顶边距
        const maxTop = oDiv.offsetParent.offsetHeight - oDiv.offsetHeight
        document.onmousemove = function (e) {
          // 计算当前右边距并设置
          const r = Math.min(maxRight, Math.max(disX - e.clientX, 0))
          oDiv.style.right = r + 'px'
          // 计算当前顶边距并设置
          const t = Math.min(maxTop, Math.max(disY + e.clientY, 0))
          oDiv.style.top = t + 'px'

          // 判断下当前时间与初始时间差，大于200毫秒则判断状态为拖拽
          lastTime = new Date().getTime()
          if (lastTime - firstTime > 200) {
            document.getElementById('parent').setAttribute('drag-flag', true)
          }
        }
        // 鼠标抬起时清除事件
        document.onmouseup = function (e) {
          document.onmousemove = null
          document.onmouseup = null
        }
        return false
      }
    }
  },
  data() {
    return {
      area: [],
      areaItem: [
        { AreaName: "东北", ID: 1 },
        { AreaName: "华南", ID: 2 },
        { AreaName: "西北", ID: 3 },
      ],
      img_bg: {
        img_01: require("~/assets/im/chat_hei.png"),
        img_02: require("~/assets/im/online_liang.png"),
        img_03: require("~/assets/im/sao_hei.png"),
        img_04: require("~/assets/im/xiao_hei.png"),
        img_05: require("~/assets/im/fan_top_hei.png"),
      },
      bg_flag: {
        flag1: false,
        flag2: false,
        flag3: false,
        flag4: false,
        flag5: false,
      },
      yewu_show: false,
      visible: true,
      active_id: 1,
      right_chat: [],
      optenShow: false,
      online_name: "李华",
      people: [],
      project_content: {
        img:
          "",
        name: "",
        area: "",
        price: "",
        isshow: false,
      },
      result: [
        { id: 1, content: "您好，我想咨询项目详情？" },
        { id: 2, content: "您好，项目什么时候开盘？" },
        { id: 3, content: "首付大概是多少？" },
        { id: 4, content: "现在有优惠吗？" },
        { id: 5, content: "请问是毛坯还是精装？" },
        { id: 6, content: "什么时候可以看房？" },
      ],
      biao_show: false,
      imgList: [],
      tootip_show: false,
      content: "",
      biaoQing: [
        "[微笑]",
        "[嘻嘻]",
        "[哈哈]",
        "[可爱]",
        "[可怜]",
        "[挖鼻]",
        "[吃惊]",
        "[害羞]",
        "[挤眼]",
        "[闭嘴]",
        "[鄙视]",
        "[爱你]",
        "[泪]",
        "[偷笑]",
        "[亲亲]",
        "[生病]",
        "[太开心]",
        "[白眼]",
        "[右哼哼]",
        "[左哼哼]",
        "[嘘]",
        "[衰]",
        "[委屈]",
        "[吐]",
        "[哈欠]",
        "[抱抱]",
        "[怒]",
        "[疑问]",
        "[馋嘴]",
        "[拜拜]",
        "[思考]",
        "[汗]",
        "[困]",
        "[睡]",
        "[钱]",
        "[失望]",
        "[酷]",
        "[色]",
        "[哼]",
        "[鼓掌]",
        "[晕]",
        "[悲伤]",
        "[抓狂]",
        "[黑线]",
        "[阴险]",
        "[怒骂]",
        "[互粉]",
        "[心]",
        "[伤心]",
        "[猪头]",
        "[熊猫]",
        "[兔子]",
        "[ok]",
        "[耶]",
        "[good]",
        "[NO]",
        "[赞]",
        "[来]",
        "[弱]",
        "[草泥马]",
        "[神马]",
        "[囧]",
        "[浮云]",
        "[给力]",
        "[围观]",
        "[威武]",
        "[奥特曼]",
        "[礼物]",
        "[钟]",
        "[话筒]",
        "[蜡烛]",
        "[蛋糕]",
      ],
      checked: true,
      baogao_show: false,
      nav_show_hong:true,
      baogao_tel:'',
      ye_box:{
          name:'',
          year:'',
          look_num:'',
          rate:'',
          user_num:'',
      },
      customer_id:'',
      customer_head_img:"",
      yewu_head_img:'',
      xiaoxi_show:false,
      zixun_show:true,
    };
  },
  created() {},
  head() {
    return {
      title:"客户端-IM" ,
      meta: [
        {
          hid: "description",
          name: "description",
          content: "客户端-IM"
        },
        { hid: "Keywords", name: "Keywords", content: "客户端-IM" }
      ]
    };
  },
  computed: {},
  methods: {
     //转化时间
  getDateDiff: function(time) {
      // 当前时间
      var nowTime = new Date();
      var day = nowTime.getDate();
      var hours = parseInt(nowTime.getHours());
      var minutes = nowTime.getMinutes();
      // 传来time 2018-05-25 18:14:02 分解
      var timeday = time.substring(8, 10);
      var timehours = parseInt(time.substring(11, 13));
      var timeminutes = time.substring(14, 16);
      var d_day = Math.abs(day - timeday);
      var d_hours = hours - timehours;
      var d_minutes = Math.abs(minutes - timeminutes);
      if(d_day <= 1){
        switch(d_day){
          case 0:
            if(d_hours==0 && d_minutes > 0){
              return d_minutes + '分钟前';
            }else if(d_hours==0 && d_minutes==0){
              return '1分钟前';
            }else{
              return d_hours + '小时前';
            }
            break;
          case 1:
            if(d_hours<0){
              return (24+d_hours) + '小时前';
            }else{
              return d_day + '天前';
            }
            break;
        }
      }else if(d_day > 1 && d_day<10){
        return d_day + '天前';
      }else{
        return time;
      }
    },
    showBox(){
        this.visible = true;
        this.xiaoxi_show =false;
        this.zixun_show =true;
    },
    goChat(){
        this.visible = false;
    },
    submit() {
      this.fasong();
    },
    showChatBox(){
        this.visible = true;
        this.tootip_show = true;
        //此时再注册一次确保，弹框显示时，没有业务员接洽时，调用自动回复
                let  yewu_yuan  = localStorage.getItem('yewu_yuan');
                if(this.active_id!==1){
                }else{
                       let city = this.$cookies.get('city_id');
                      let ip = ip_arr["ip"];
                      let data_shang ={
                              controller:"Info",
                              action:"register",
                              params:{"city":city,
                              project:"954",
                              ip:ip,
                              url:"http://hangzhou.jy8006.com/"}
                              };
                    this.websocketsend(JSON.stringify(data_shang));
                }
               
    },
    initWebSocket() {
     let uuid = localStorage.getItem('uuid');
      console.log(uuid);
      if(uuid!=="undefined" && uuid!=="null"){
          const wsurl = `ws://39.98.227.114:9509?uuid=${uuid}`;
          this.websock = new ReconnectingWebSocket(wsurl);
          this.websock.onmessage = this.websocketonmessage;
          this.websock.onopen = this.websocketonopen;
          this.websock.onerror = this.websocketonerror;
          this.websock.onclose = this.websocketclose;
      }
    },
    websocketonopen(){
         console.log("连接成功了");
    },
    websocketonerror(e){
         console.log("已经断线,链接错误");
    },
    websocketclose(e){
         console.log("断开连接", e);
    },
    //数据发送
    websocketsend(Data) {
      this.websock.send(Data);
    },
    websocketonmessage(e){
          let res ={};
          if(e.data){
              res  = JSON.parse(e.data);
              console.log(res);
          if(res.action==203){
               let  head_img = res.info.avatar;
               let uuid = localStorage.getItem('uuid');
               //保存用户的头像
               if(res.info.username==uuid){
                  this.customer_head_img = head_img;
               }
               
          }else if(res.action==101){
              //表示用户登录成功
              //105：客户打开看到的业务员列表
              let uuid = localStorage.getItem('uuid');
              let  data ={
                  controller:"Staff",
                  action:"lists",
                  params:{"uuid":uuid}
              }
              this.websocketsend(JSON.stringify(data));

                let city = this.$cookies.get('city_id');
                let ip = ip_arr["ip"];
                let data_shang ={
                        controller:"Info",
                        action:"register",
                        params:{"city":city,
                        project:"954",
                        ip:ip,
                        url:"http://hangzhou.jy8006.com/"}
                        };
               this.websocketsend(JSON.stringify(data_shang));
          }else if(res.action ==105){
                if(res.data.length==0){
                     console.log("左侧业务员列表为空");
                      this.people = res.data; 
                }else{
                    this.people = res.data; 
                    let  id = res.data.id;
                    //聊天框左侧的业务员
                }
          }else if(res.action ==301){
               this.tootip_show = false;
               let msg = this.zhuanBiao(res.content);
               let head_img = this.yewu_head_img;
               //  返回业务员聊天
                if(this.visible==false){
                    this.zixun_show = false;
                    this.xiaoxi_show= true;
                }

                let  yewu_id = localStorage.getItem('yewu_yuan');

                if(yewu_id!=="null" && yewu_id!==null && yewu_id!==((res.fromUserName)+'')){
                      this.active_id = yewu_id;
                      console.log( this.active_id,'this.active_id')

                      let  uuid = localStorage.getItem('uuid');
                       //获取历史聊天记录
                      this.getChatliao(yewu_id,uuid);


                      let  data = {
                      "controller":"chat",
                      "action":"index",
                      "params":{
                        "staff":res.fromUserName,
                        "customer":uuid
                      }}
                    this.websocketsend(JSON.stringify(data));
                        let  msg ='';
                        if(res.content=="%put my card%"){
                            msg="[收到名片]";
                        }else if(res.content=="%get your phone%"){
                            msg="[获取分析报告]";
                        }else if(res.content.indexOf('data:image')!==-1){
                            msg="[图片]";
                        }else{
                            msg=res.content;
                        }
                        let flag = false;
                        this.people.map((p, q) => {
                          if (p.id == res.fromUserName) {
                            p.content = this.zhuanBiao(msg);
                            p.time = res.sendTime;
                            p.isshow = true;
                            flag = true;
                          } else {
                          }
                        });
                        if (flag == false) {
                          this.people.unshift({
                            id: res.fromUserName,
                            name: '',
                            content: this.zhuanBiao(msg),
                            time: res.sendTime,
                            img: "",
                            isshow:true
                          });
                        }
                  console.log(this.people);
                }else{ //第一次进入
                      console.log(222,yewu_id);
                      this.active_id = res.fromUserName;
                      let  uuid = localStorage.getItem('uuid');
                      //获取历史聊天记录
                      this.getChatliao(res.fromUserName,uuid);

                       var chat_list = document.querySelector(".chat_list");
                       let  dv = document.createElement('div');
                       if(res.content=="%get your phone%"){
                             dv.className = "sender_fenxi newcom";
                             dv.innerHTML=`<div class="head_image">
                                          <img
                                            src="${head_img}"
                                          />
                                      </div>
                                         <div class="left_chat_fenxi">
                                  <div class="send_box">
                                      <img src="/_nuxt/assets/im/fenxi.png" alt="">
                                      <div class="text_box">
                                          <h3>免费为您制定专属分析报告</h3>
                                          <p>向允家咨询师免费领取分析报告,内附有购房流 程全盘解读</p>
                                          <button @mousedown.stop="showBaoGao">免费领取</button>
                                      </div>
                                      
                                  </div>
                                </div>    
                             `;
                             chat_list.appendChild(dv);
                             dv.scrollIntoView();
                       }else if(res.content=="%put my card%"){
                             console.log(res.content);
                             let data = {
                              "controller":"Staff",
                             "action":"info",
                             "params":{"uuid":res.fromUserName}};
                              this.websocketsend(JSON.stringify(data));

                       }else{
                                  dv.className = "sender newcom chuang";
                                  dv.innerHTML =`<div class="head_image">
                                    <img
                                      src="${head_img}"
                                    /> </div>
                                    <div class="left_chat">
                                    <div class="left_triangle"></div>
                                    <span >${res.content}</span>
                                  </div>
                                    `;
                                    chat_list.appendChild(dv);
                                    dv.scrollIntoView();
                       }
                     
                
                      //获取首页面加载信息
                     // let  uuid = localStorage.getItem('uuid');
                      let  data = {
                      "controller":"chat",
                      "action":"index",
                      "params":{
                        "staff":res.fromUserName,
                        "customer":uuid
                      }}
                    this.websocketsend(JSON.stringify(data));
                   

                        let  msg ='';
                        if(res.content=="%put my card%"){
                            msg="[收到名片]";
                        }else if(res.content=="%get your phone%"){
                            msg="[获取分析报告]";
                        }else{
                            msg=res.content;
                        }
                        let flag = false;
                        this.people.map((p, q) => {
                          if (p.id == res.fromUserName) {
                            p.content = this.zhuanBiao(msg);
                            p.time = res.sendTime;
                            p.isshow = false;
                            flag = true;
                          } else {
                          }
                        });
                        if (flag == false) {
                          this.people.push({
                            id: res.fromUserName,
                            name: '',
                            content: this.zhuanBiao(msg),
                            time: res.sendTime,
                            img: "",
                            isshow:false
                          });
                        }
                }
              if(yewu_id){
              }else{
                   localStorage.setItem('yewu_yuan',res.fromUserName);
              }
          }else if(res.action ==302){
                   //表示注册成功,没有业务员时客户咨询窗首页加载接口
                      let  _this=this;
                      let  uuid = localStorage.getItem('uuid');
                      let data_ye ={
                      "controller":"chat",
                      "action":"index",
                      "params":{
                        "staff":"0",
                      "customer":uuid}
                      };
                  _this.websocketsend(JSON.stringify(data_ye));  
          }else if(res.action ==303){
               //返回聊天记录
                let chat_data =res.data;
                chat_data.map((p,q)=>{
                    p.content= this.zhuanBiao(p.content);
                })
                var chatlist = document.querySelector(".chat_list");
                let chuang = document.querySelector(".chuang");
                if(chuang){
                   chatlist.removeChild(chuang);
                }
                this.right_chat =[];
                this.right_chat = chat_data.reverse();


          }else if(res.action==206){ //返回的业务员名片
              console.log(res);
              this.yewu_show  = true;
              this.ye_box.name = res.staff.name;
              this.ye_box.year = res.staff.year;
              this.ye_box.look_num = res.num.look_num;
              this.ye_box.rate = res.num.rate;
              this.ye_box.user_num = res.num.user_num;
          }else if(res.action==305){
            //返回首页面聊天信息
              this.project_content.isshow  = true;
              this.project_content.img=res.project_info.img;
              this.project_content.name = res.project_info.name;
              this.project_content.area = res.project_info.area;
              this.project_content.price = res.project_info.price;
              let people = res.staff;
              var time = new Date().toLocaleTimeString();
              let timer = "";
              if (time.split(":")[0].length == 3) {
                timer = time.substring(0, 6);
              } else if (time.split(":")[0].length == 4) {
                timer = time.substring(0, 7);
              }
                  let flag = false;
                  if(res.staff.length==0){
                     if(this.visible==true){
                         let  _this=this;
                         let  uuid = localStorage.getItem('uuid');
                         setTimeout(function(){
                             let data =  {
                                "controller":"chat",
                                "action":"auto",
                                "params":{"uuid":uuid}}
                             _this.websocketsend(JSON.stringify(data));
                         },5000)
                    }
                  }else{
                      let  yewu_id = localStorage.getItem('yewu_yuan');
                      if(yewu_id!="null" && (yewu_id!==(res.staff.id)+'')){
                        console.log(305,yewu_id,'shang');
                              this.people.map((p, q) => {
                              if (p.id == res.staff.id) {
                                p.id = res.staff.id;
                                p.name = res.staff.name;
                                p.img = res.staff.head_img;
                                p.isshow =true;
                                flag = true;
                              } else {
                              }
                            });
                            if (flag == false) {
                              this.people.push({
                                id: res.staff.id,
                                name: res.staff.name,
                                content: "",
                                time: timer,
                                img: res.staff.head_img,
                                isshow:true
                              });
                            }
                      }else{
                         console.log(305,yewu_id,'xia');
                               this.people.map((p, q) => {
                              if (p.id == res.staff.id) {
                                p.id = res.staff.id;
                                p.name = res.staff.name;
                                p.img = res.staff.head_img;
                                p.isshow =false;
                                flag = true;
                              } else {
                              }
                            });
                            if (flag == false) {
                              this.people.push({
                                id: res.staff.id,
                                name: res.staff.name,
                                content: "",
                                time: timer,
                                img: res.staff.head_img,
                                isshow:false
                              });
                            }
                              this.yewu_head_img = res.staff.head_img;
                      }
                  
                  }
               // this.yewu_head_img = res.staff.head_img;
          }


      }
       
    },
    //获取聊天记录
    getChatliao(mine,customer){
        let  data ={
         controller:"chat",
         action:"history",
         params:{
           mine:mine,
           customer:customer,
           page:"1",
           limit:100
           }}
        this.websocketsend(JSON.stringify(data));
    },








    hideBaoBox(){
      this.baogao_show = false;
    },
    showBaoGao(){
        this.baogao_show =true;
    },
    Sel_changYongyu(e) {
      this.content = e.target.innerText;
      this.optenShow = false;
      this.biao_show = false;
    },
    send(){
      this.fasong();
    },
    fasong(msg) {
      let  yewu_yuan = localStorage.getItem('yewu_yuan');
      let  uuid = localStorage.getItem('uuid');
      
      if (msg) {
        this.content = msg;
      }
          //转换聊天记录的表情
         if (this.content.trim().length !== 0) {
            let uuid = localStorage.getItem('uuid');
            if(uuid && uuid!=="undefined" && uuid!=="null"){
              let data= {
                    controller:"chat",
                    action:"send",
                    params:
                    {
                        content:this.content,
                        username:this.active_id
                    }
                };
             this.websocketsend(JSON.stringify(data));

              let flag = false;
              this.people.map((p, q) => {
                    if (p.id == this.active_id) {
                      p.content= this.zhuanBiao(this.content);
                      flag = true;
                    } else {
                    }
                  });
            }

          var msg = this.content;
          var that = this;
          if (msg.split("face").length !== 0) {
            let index = msg.indexOf("face");
            while (index != -1) {
              var reg = /face\[[\u4e00-\u9fa5_a-zA-Z]+\]/s;
              var match = msg.match(reg);
              if (match) {
                var title = match[0].replace("face", "");
              }
              for (let val in that.imgList) {
                if (that.imgList[val].alt == title) {
                  let img = require(`~/assets/face/${val}.gif`);
                  let h = `<img/\src="${img}">`;
                  msg = msg.replace(`face${title}`, h);
                }
              }
              index = msg.indexOf("face", index + 4);
            }
          }

          if (msg !== "" || msg !== " ") {
            let head_img = this.customer_head_img;
            var chat_list = document.querySelector(".chat_list");
            let dv = document.createElement("div");
            dv.className = "receiver newcom chuang";
            dv.innerHTML = `<div class="head_image">
                            <img src="${head_img}">
                            </div>
                            <div class="left_chat">
                                <div class="left_triangle"></div>
                                <span>${msg}</span>
                            </div>`;
            chat_list.appendChild(dv);
            dv.scrollIntoView();
            this.biao_show = false;
            this.optenShow = false;
            this.content = "";

          };
       
         }
    },
    selBiao(num) {
      //传给后台的数据
      let str = "face";
      let tu = str + num.alt;
      //页面展示的数据
      this.biao_show = false;
      if (this.content !== "") {
        this.content = this.content + tu;
      } else {
        this.content = tu + this.content;
      }

      let zhuan = this.content;
      let biaoList = this.imgList;
      for (let i = 0; i < biaoList.length; i++) {
        if (biaoList[i].alt == num.alt) {
          zhuan.replace("face" + biaoList[i].alt, "");
          zhuan += `<img src ="${biaoList[i].src}">`;
        }
      }
      this.biao_show = false;
    },
    clickitem(e) {
      if (e === this.area) {
        this.area = [];
        console.log(e, "不选");
        //如果点击的对象是area就将v-model的值清空 radio状态为空
      } else {
        this.area = e;
        console.log(e, "选中"); //否则就把点击的值赋值给area 即绑定的radio
      }
      // console.log(e);
    },

    arrayWeightRemoval(array1, array2) {
      //临时数组存放
      var tempArray1 = []; //临时数组1
      var tempArray2 = []; //临时数组2

      for (var i = 0; i < array2.length; i++) {
        tempArray1[array2[i]] = true; //将数array2 中的元素值作为tempArray1 中的键，值为true；
      }

      for (var i = 0; i < array1.length; i++) {
        if (!tempArray1[array1[i]]) {
          tempArray2.push(array1[i]); //过滤array1 中与array2 相同的元素；
        }
      }
      return tempArray2;
    },
    liu_hover() {
      this.img_bg.img_01 = require("~/assets/im/chat.png");
      this.bg_flag.flag1 = true;
    },
    liu_leave() {
      this.img_bg.img_01 = require("~/assets/im/chat_hei.png");
      this.bg_flag.flag1 = false;
    },
    online_hover() {
       this.bg_flag.flag2 = true;
       this.img_bg.img_02 = require("~/assets/im/online.png");
    },
    online_leave() {
      this.img_bg.img_02 = require("~/assets/im/online_liang.png");
      this.bg_flag.flag2 = false;
    },

    saoma_hover() {
      this.img_bg.img_03 = require("~/assets/im/sao.png");
      this.bg_flag.flag3 = true;
    },
    saoma_leave() {
      this.img_bg.img_03 = require("~/assets/im/sao_hei.png");
      this.bg_flag.flag3 = false;
    },

    xiaoChengXu_hover() {
      this.img_bg.img_04 = require("~/assets/im/xiao.png");
      this.bg_flag.flag4 = true;
    },
    xiaoChengXu_leave() {
      this.img_bg.img_04 = require("~/assets/im/xiao_hei.png");
      this.bg_flag.flag4 = false;
    },
    fan_hui() {
      this.img_bg.img_05 = require("~/assets/im/fan_top.png");
      this.bg_flag.flag5 = true;
    },
    fan_leave() {
      this.img_bg.img_05 = require("~/assets/im/fan_top_hei.png");
      this.bg_flag.flag5 = false;
    },
    drag(e) {
      var oDiv = document.querySelector(".dragBox");
      var disX = e.clientX - oDiv.offsetLeft - 340;
      var disY = e.clientY - oDiv.offsetTop - 250;
      document.onmousemove = function (e) {
        e.preventDefault();
        var l = e.clientX - disX;
        var t = e.clientY - disY;
        oDiv.style.left = l + "px";
        oDiv.style.top = t + "px";
      };
      document.onmouseup = function () {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
    //点击用户
    bianSe(num) {
      this.active_id = num.id;
      this.yewu_head_img =num.img;
      let customer_id = localStorage.getItem('uuid');
      this.getChatliao(num.id,customer_id);
      localStorage.setItem('yewu_yuan',num.id);
      this.people.map((m,n)=>{
           if(m.id==num.id){
              m.isshow = false;
           }
      })
    },
    closebox() {
      this.visible = false;
    },
    //上传图片
    img_Updated(e) {
      var fileData = e.target.files[0]; //获取到一个FileList对象中的第一个文件(File 对象)。这是我们上传的文件         \
      var pettern = /^image/;
      if (!pettern.test(fileData.type)) {
        console.log("图片格式不正确");
        return;
      }
      var reader = new FileReader();
      reader.readAsDataURL(fileData); //异步读取文件内容，结果用data:url的字符串形式表示
      /*当读取操作成功完成时调用*/
      let that = this;
      let head_img = that.customer_head_img;
      reader.onload = function (e) {
        //保存图片到indexDB
        let staff_id = that.active_id;
        console.log(staff_id);
        let data= {
        "controller":"chat",
        "action":"send",
        "params":{
        "content":e.target.result,
        "username":staff_id}}
        that.websocketsend(JSON.stringify(data));
        var chat_list = document.querySelector(".chat_list");
        let div = document.createElement("div");
        div.className = "receiver_img newcom chuang";
        div.innerHTML = `<div class="head_image">
                         <img src="${head_img}" />
                    </div>
              <div class="left_chat">
                  <div class="left_triangle"></div>
                  <img src="${e.target.result}" class="pic"/>
              </div>`;
           chat_list.appendChild(div);
           div.scrollIntoView();
      };
    },
    content_Change() {},
    optenBoxShow() {
      this.optenShow = true;
      this.biao_show = false;
    },
    BiaoShow() {
      this.biao_show = true;
      this.optenShow = false;
    },
    Biaohide() {
      this.biao_show = false;
    },
    optenBoxhide() {
      this.optenShow = false;
    },
        //转化表情
    zhuanBiao(msg) {
      let imgall = this.imgList;
      if (msg.split("face").length !== 0) {
        let index = msg.indexOf("face");
        while (index != -1) {
          var reg = /face\[[\u4e00-\u9fa5_a-zA-Z]+\]/s;
          var match = msg.match(reg);
          if (match) {
            var title = match[0].replace("face", "");
          }
          if (imgall) {
            for (let val in imgall) {
              if (imgall[val].alt == title) {
                let img = require(`~/assets/face/${val}.gif`);
                let h = `<img/\src="${img}">`;
                msg = msg.replace(`face${title}`, h);
              }
            }
          }
          index = msg.indexOf("face", index + 1);
        }

        return msg;
      }
    },
  },
  mounted() {
       console.log(this.getDateDiff('2019-07-29 10:20:00'));

      document.getElementById('parent').style.height= document.documentElement.clientHeight+'px';
//         if (!store.state.ws) {
//         let ws = new ReconnectingWebSocket(
//           "ws://139.155.128.107:9509?uuid="+timestamp
//         );
//         ws.onopen = function () {
//           if(to.fullPath.indexOf('content')!==-1){
//             ws.send(JSON.stringify(pp))
//           }
//         }
//         store.dispatch("setws", ws);
//       }


      this.customer_id = localStorage.getItem('uuid');
      let  flag =  true;
      if(flag==true){
          var  _this = this;
          setTimeout(function(){
         //   _this.initWebSocket();
            flag =false;
          },5000)
      }
    this.biaoQing.map((m, n) => {
      this.imgList.push({
        src: require(`~/assets/face/${n}.gif`),
        alt: m,
      });
    });

    document.addEventListener("mousedown", this.Biaohide, false);

    document.addEventListener("mousedown", this.optenBoxhide, false);

    var arr1 = ["a", "b", "c", "d"];
    var arr2 = ["a", "c", "d", "f"];
    let m = this.arrayWeightRemoval(arr1, arr2);
    console.log(m);
    //返回结果 [b] ;

    //回到顶部
    $(".up-btn").click(function () {
      $("html , body").animate({ scrollTop: 0 }, "slow");
    });



  },
  updated(){
        var chatlist = document.querySelector(".chat_list");
        var all_chat_box = document.getElementsByClassName("newcom");
        var last_dom = all_chat_box[all_chat_box.length - 1];
        if (last_dom) {
          last_dom.scrollIntoView();
        }
  }
};
</script>
<style lang="less" scoped>
html,body,#app{
   height: 100%;
}
// 右侧导航
.right_fixed {
  width: 40px;
  height: 100%;
  background: #ffffff;
  box-shadow: 0px 0px 15px 0px rgba(52, 71, 87, 0.24);
  position: fixed;
  right: 0px;
  .right_li {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    li {
      width: 40px;
      height: 84px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      border-bottom: 1px solid #ededed;
      cursor: pointer;
      position: relative;
      img {
        width: 20px;
        height: 20px;
        margin-bottom: 10px;
      }
      span {
        font-size: 12px;
        font-family: "Microsoft YaHei";
        font-weight: 400;
        color: #7d7d80;
        line-height: 12px;
        margin-bottom: 5px;
      }
      em {
        font-size: 12px;
        font-family: "Microsoft YaHei";
        font-weight: 400;
        color: #7d7d80;
        line-height: 12px;
      }
      .yewuyuan {
        position: absolute;
        right: 61px;
        width: 288px;
        height: 157px;
        background: #ffffff;
        box-shadow: 0px 0px 18px 0px rgba(52, 71, 87, 0.24);
        border-radius: 2px;
        padding: 24px 28px 24px 24px;
        .top {
          .head_img {
            width: 40px;
            height: 40px;
            border-radius: 20px;
            float: left;
            margin-right: 20px;
            margin-bottom: 0px;
          }
          .right_name {
            h2 {
              font-size: 18px;
              font-family: "Microsoft YaHei";
              font-weight: bold;
              color: #1f1f1f;
              display: flex;
              line-height: 18px;
              i {
                width: 60px;
                height: 18px;
                background: #f2f8ff;
                border-radius: 2px;
                line-height: 18px;
                font-size: 12px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: #2284f4;
                margin-left: 10px;
              }
            }
            p {
              font-size: 14px;
              font-family: "Microsoft YaHei";
              font-weight: 400;
              color: #646466;
              line-height: 14px;
              margin-top: 8px;
            }
          }
        }
        .fenshu {
          display: flex;
          justify-content: space-between;
          margin-top: 14px;
          .fen_list {
            float: left;
            width: 96px;
            display: flex;
            align-items: center;
            flex-direction: column;
            strong {
              font-size: 20px;
              font-family: "Microsoft YaHei";
              font-weight: bold;
              color: #121212;
              i {
                font-size: 12px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: #121212;
              }
            }
            p {
              font-size: 14px;
              font-family: "Microsoft YaHei";
              font-weight: 400;
              color: #646466;
            }
          }
        }
        .bottom {
          .btn_zixun {
            width: 100px;
            height: 36px;
            background: linear-gradient(270deg, #20c466, #3fd6a7);
            border-radius: 2px;
            font-size: 14px;
            font-family: "Microsoft YaHei";
            font-weight: 400;
            color: #ffffff;
            border: none;
            margin-top: 24px;
            margin-right: 20px;
            cursor: pointer;
          }
          .shao_zixuxn {
            width: 100px;
            height: 36px;
            background: #f0f7f3;
            border: 1px solid #3ea66a;
            border-radius: 2px;

            font-size: 14px;
            font-family: "Microsoft YaHei";
            font-weight: 400;
            color: #3ea56a;
            margin-top: 24px;
            cursor: pointer;
          }
        }
      }
    }
    .new_news{
        span{
              color: #FF9A26;
        }
        em{
             color: #FF9A26;
        }
    }
    .zixun {
      span {
        color: #2ac66e;
      }
      em {
        color: #2ac66e;
      }
    }
    .active {
      background: #2ac66e;
      span {
        color: #fff;
      }
      em {
        color: #fff;
      }
    }
    .yellow{
       color: #FF9A26;
      span {
        color:#FF9A26;
      }
      em {
        color:#FF9A26;
      }
    }
  }
}
// 聊天框
#parent{
  width: 100%;
  min-height: 900px;
  background-color: #ccc;
  position: relative;
.dragBox {
  width: 740px;
  height: 540px;
  position: absolute;
  top: 30px;
  // top: 50%;
  // left: 50%;
  // margin-top: -270px;
  // margin-left: -370px;
  // z-index: 3000;
  // background: #f5f8f8;
  // box-shadow: 0px 0px 18px 0px rgba(52, 71, 87, 0.24);
  // border-radius: 0px 6px 0px 0px;

  .kehu_list {
    width: 260px;
    height: 540px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 32px 0px rgba(51, 70, 87, 0.08);
    float: left;
    .zixun_tou {
      width: 259px;
      height: 50px;
      background: #52c2cc;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #f2f2f2;
      border-right: 1px solid #ededed;
      cursor: move;
      span {
        color: #fff;
        font-size: 18px;
        line-height: 44px;
        margin-left: 14px;
        margin-right: 12px;
      }
      p {
        font-size: 14px;
        font-family: "Microsoft YaHei";
        font-weight: 400;
        color: #fff;
        line-height: 26px;
        margin-right: 107px;
      }
      em {
        color: #a1a1a9;
        font-size: 18px;
      }
    }

    .people_list::-webkit-scrollbar {
      width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 1px;
    }
    .people_list::-webkit-scrollbar-thumb {
      /*里面小方块*/
      border-radius: 10px;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: #ecf4fb;
    }
    .people_list::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      background: #fff;
    }
    .people_list {
      height: 489px;
      overflow-y: auto;
      overflow-x: hidden;
      border-right: 1px solid #ededed;
      ul {
        li {
          width: 260px;
          height: 62px;
          background: #fff;
          cursor: pointer;
          .list_box {
            width: 232px;
            height: 61px;
            border-bottom: 1px solid #f7f7f7;
            margin-left: 15px;
            display: flex;
            align-items: center;
            img {
              width: 40px;
              height: 40px;
              border-radius: 20px;
              display: block;
            }
            .text_list {
              height: 62px;
              width: 171px;
              margin-left: 16px;
              h3 {
                font-size: 14px;
                font-family: "Microsoft YaHei";
                font-weight: bold;
                color: #323233;
                line-height: 26px;
                height: 26px;
                width: 171px;
                em {
                  font-size: 14px;
                  font-family: "Microsoft YaHei";
                  font-weight: bold;
                  color: #323233;
                  line-height: 26px;
                  font-style: normal;
                  float: left;
                }
                span {
                  font-size: 12px;
                  font-family: "Microsoft YaHei";
                  font-weight: 400;
                  color: #989899;
                  line-height: 26px;
                  float: right;
                }
              }
              p {
                font-size: 12px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: #7e7e80;
                line-height: 26px;
                width: 171px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
            span {
              font-size: 12px;
              font-family: "Microsoft YaHei";
              font-weight: 400;
              color: rgba(174, 174, 178, 1);
              line-height: 26px;
              float: right;
            }
          }
        }
        .active {
          background: #f2f2f2;
        }
      }
    }
  }
  .content_list {
    width: 480px;
    height: 540px;
    background: #f7f7f7;
    float: left;
    display: flex;
    flex-direction: column;
    .content_title {
      width: 480px;
      height: 50px;
      background: #52c2cc;
      cursor: move;
      span {
        font-size: 14px;
        font-family: "Microsoft YaHei";
        font-weight: 400;
        color: #fff;
        line-height: 44px;
        float: left;
        margin-left: 14px;
        i {
          width: 10px;
          height: 10px;
          background: #ffffff;
          box-shadow: 0px 0px 5px 0px rgba(255, 255, 255, 0.81);
          border-radius: 50%;
          display: inline-block;
          margin-right: 10px;
        }
      }
      em {
        float: right;
        margin-top: 17px;
        margin-right: 17px;
        cursor: pointer;
        color: #fff;
      }
    }
    .chat_list::-webkit-scrollbar {
      width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 1px;
    }
    .chat_list::-webkit-scrollbar-thumb {
      /*里面小方块*/
      border-radius: 10px;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: #ecf4fb;
    }
    .chat_list::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      background: #fff;
    }
    .chat_list {
      width: 480px;
      overflow: auto;
      flex: 1;
      padding-top: 20px;
      /* bubble style */
      .sender:after {
        content: "";
        height: 0;
        clear: both;
        overflow: hidden;
        display: block;
        visibility: hidden;
      }
      /deep/ .sender {
        clear: both;
        margin-left: 14px;
        .head_image {
          float: left;
          img {
            width: 36px;
            height: 36px;
            border-radius: 18px;
          }
        }
        .left_chat {
          background-color: #e6ebeb;
          float: left;
          margin: 0 20px 10px 15px;
          padding: 10px 10px 10px 10px;
          border-radius: 0px 6px 6px 6px;
          position: relative;
          max-width: 325px;
          .left_triangle {
            height: 0px;
            width: 0px;
            border-top: 12px solid #e6ebeb;
            border-left: 12px solid transparent;
            position: absolute;
            left: -12px;
            top: 0px;
          }
          span {
            color: #4b4b4d;
            font-size: 14px;
            line-height: 18px;
          }
        }
      }
/deep/   
.sender_fenxi{
        clear: both;
        margin-left: 14px;
    .head_image {
      float: left;
      margin-right: 10px;
      img {
        width: 36px;
        height: 36px;
        border-radius: 18px;
      }
    }
     .left_chat_fenxi {
          float: left;
          position: relative;
          margin-bottom: 15px;
         .send_box{
            width: 280px;
            height: 278px;
            background: #FFFFFF;
            border-radius: 6px;
            img{
                width: 280px;
                height: 145px;
                background: #EBF9FA;
                border-radius: 6px 6px 0px 0px;
            }
            .text_box{
              padding-left:15px ;
              padding-right:15px ;
               h3{
                  font-size: 14px;
                  font-family: "Microsoft YaHei";
                  font-weight: 400;
                  color: #333333;
                  line-height: 40px;
               }
               p{
                  font-size: 12px;
                  font-family: "Microsoft YaHei";
                  font-weight: 400;
                  color: #A6A6A6;
                  line-height: 20px;
               }
               button{
                  width: 249px;
                  height: 30px;
                  background: #52C2CC;
                  border-radius: 2px;
                  font-size: 14px;
                  font-family: "Microsoft YaHei";
                  font-weight: bold;
                  color: #FFFFFF;
                  line-height: 22px;
                  border: none;
                  margin-top: 10px;
                  cursor: pointer;
                  outline: none;
               }
            }
         }
        }
}

      /*Left项目样式*/
      /deep/ .left_project {
        clear: both;
        margin-right: 14px;
        .head_image {
          float: right;
          img {
            width: 36px;
            height: 36px;
            border-radius: 18px;
          }
        }
        .left_chat {
          background-color: #52c2cc;
          float: right;
          margin: 0 20px 10px 15px;
          padding: 10px 10px 10px 10px;
          border-radius: 6px 0px 6px 6px;
          position: relative;
          max-width: 325px;
          .left_triangle {
            height: 0px;
            width: 0px;
            border-top: 12px solid #52c2cc;
            border-right: 12px solid transparent;
            position: absolute;
            right: -12px;
            top: 0px;
          }
          .project {
            width: 230px;
            height: 52px;
            img {
              width: 60px;
              height: 52px;
              float: left;
              margin-right: 9px;
            }
            .pro_text {
              width: 160px;
              height: 60px;
              float: right;
              h3 {
                font-size: 14px;
                font-family: "Microsoft YaHei";
                font-weight: bold;
                color: rgba(242, 242, 242, 1);
              }
              p {
                font-size: 12px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: rgba(242, 242, 242, 1);
              }
              p {
                font-size: 12px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: rgba(242, 242, 242, 1);
              }
            }
          }
        }
      }
      /*right项目样式*/
      /deep/.receiver {
        clear: both;
        margin-right: 14px;

        .head_image {
          float: right;
          img {
            width: 36px;
            height: 36px;
            border-radius: 18px;
          }
        }
        .left_chat {
          float: right;
          background-color: #52c2cc;
          margin: 0 24px 10px 20px;
          padding: 10px;
          border-radius: 7px 0px 7px 7px;
          position: relative;
          max-width: 260px;
          .left_triangle {
            position: absolute;
            right: -12px;
            top: 0px;
            width: 0;
            height: 0;
            border-top: 12px solid #52c2cc;
            border-right: 12px solid transparent;
          }
          .project {
            width: 230px;
            height: 52px;
            img {
              width: 60px;
              height: 52px;
              float: left;
              margin-right: 9px;
            }
            .pro_text {
              width: 160px;
              height: 60px;
              float: right;
              h3 {
                font-size: 14px;
                font-family: "Microsoft YaHei";
                font-weight: bold;
                color: rgba(242, 242, 242, 1);
              }
              p {
                font-size: 12px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: rgba(242, 242, 242, 1);
              }
              p {
                font-size: 12px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: rgba(242, 242, 242, 1);
              }
            }
          }
        }
      }

      /*right样式*/
      .receiver:after {
        content: "";
        height: 0;
        clear: both;
        overflow: hidden;
        display: block;
        visibility: hidden;
      }
      /deep/.receiver {
        clear: both;
        margin-right: 14px;

        .head_image {
          float: right;
          img {
            width: 36px;
            height: 36px;
            border-radius: 18px;
          }
        }
        .left_chat {
          float: right;
          background-color: #52c2cc;
          margin: 0 24px 10px 20px;
          padding: 10px;
          border-radius: 7px 0px 7px 7px;
          position: relative;
          max-width: 260px;
          .left_triangle {
            position: absolute;
            right: -12px;
            top: 0px;
            width: 0;
            height: 0;
            border-top: 12px solid #52c2cc;
            border-right: 12px solid transparent;
          }
          span {
            color: #fff;
            font-size: 14px;
            line-height: 18px;
          }
        }
      }

      /*right图片样式*/
      /deep/.receiver_img {
        clear: both;
        margin-right: 14px;
        .head_image {
          float: right;
          img {
            width: 36px;
            height: 36px;
            border-radius: 18px;
          }
        }
        .left_chat {
          float: right;
          background-color: #52c2cc;
          margin: 0 24px 10px 20px;
          padding: 10px;
          border-radius: 7px 0px 7px 7px;
          position: relative;
          max-width: 260px;
          .left_triangle {
            position: absolute;
            right: -12px;
            top: 0px;
            width: 0;
            height: 0;
            border-top: 12px solid #52c2cc;
            border-right: 12px solid transparent;
          }
          .pic {
            width: 160px;
            height: 160px;
          }
        }
      }
    }

    .send_box {
      width: 480px;
      min-height: 160px;
      background: rgba(255, 255, 255, 1);
      position: relative;
      .gong_btn {
        margin-top: 14px;
        span {
          font-size: 20px;
          color: #969999;
          margin-left: 14px;
          margin-right: 15px;
          cursor: pointer;
        }
        span:hover {
          color: #4b4c4d;
          font-weight: 600;
        }
        em {
          font-size: 20px;
          color: #969999;
          cursor: pointer;
          position: relative;
          margin-right: 15px;
          input {
            width: 20px;
            height: 20px;
            opacity: 0;
            position: absolute;
            left: 0px;
            right: 0px;
          }
        }
        em:hover {
          color: #4b4c4d;
          font-weight: 600;
        }
        strong {
          font-size: 21px;
          color: #969999;
          cursor: pointer;
          font-weight: 400;
        }
        strong:hover {
          color: #4b4c4d;
          font-weight: 600;
        }
      }
      textarea {
        width: 480px;
        height: 73px;
        border: none;
        outline: none;
        resize: none;
        font-size: 14px;
        font-family: "Microsoft YaHei";
        font-weight: 400;
        color: #4b4b4d;
        line-height: 26px;
        text-indent: 14px;
      }
      textarea::-webkit-input-placeholder {
        color: #979799;
        font-size: 14px;
      }
      textarea::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: #979799;
        font-size: 14px;
      }
      textarea:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: #979799;
        font-size: 14px;
      }
      textarea:-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: #979799;
        font-size: 14px;
      }

      textarea::-webkit-scrollbar {
        width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
      }
      textarea::-webkit-scrollbar-thumb {
        /*里面小方块*/
        border-radius: 10px;
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #ecf4fb;
      }
      textarea::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        background: #fff;
      }

      .send_text {
        height: 24px;
        width: 480px;
        p {
          font-size: 14px;
          font-family: "Microsoft YaHei";
          font-weight: 400;
          color: rgba(145, 145, 153, 1);
          line-height: 26px;
          float: left;
          margin-left: 14px;
        }
        button {
          width: 64px;
          height: 24px;
          background: #52c2cc;
          font-size: 14px;
          font-family: "Microsoft YaHei";
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 24px;
          text-align: center;
          border: none;
          float: right;
          margin-right: 15px;
        }
      }
      /*常用语弹框*/
      .opten_talk {
        width: 240px;
        height: 250px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 12px 0px rgba(52, 71, 87, 0.24);
        position: absolute;
        border-radius: 2px;
        left: 11px;
        top: -260px;
        .opten_title {
          height: 30px;
          width: 240px;
          border-bottom: 1px solid #f7f7f7;
          h4 {
            font-size: 14px;
            font-family: "Microsoft YaHei";
            font-weight: bold;
            color: #303033;
            line-height: 30px;
            margin-left: 14px;
          }
        }
        ul::-webkit-scrollbar {
          display: none;
        }
        ul {
          height: 210px;
          width: 240px;
          overflow-y: auto;
          overflow-x: hidden;
          li {
            width: 225px;
            height: 40px;
            font-size: 14px;
            font-family: "Microsoft YaHei";
            font-weight: 400;
            color: #7d7d80;
            line-height: 40px;
            padding-left: 15px;
            cursor: pointer;
          }
          li:hover {
            background: #f7f7f7;
          }
          .active {
            background: #f7f7f7;
          }
        }
      }
      /*常用表情包弹框*/
      .opten_talk_biao {
        width: 269px;
        height: 134px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 12px 0px rgba(52, 71, 87, 0.24);
        position: absolute;
        border-radius: 2px;
        left: 11px;
        top: -154px;
        padding-top: 10px;
        .biao_title {
          height: 28px;
          width: 220px;
          display: flex;
          justify-content: space-between;
          h4 {
            font-size: 14px;
            font-family: "Microsoft YaHei";
            font-weight: 400;
            color: rgba(48, 48, 51, 1);
            line-height: 26px;
            margin-left: 14px;
          }
          span {
            font-size: 18px;
            float: right;
            margin-right: 14px;
            margin-top: 5px;
            cursor: pointer;
          }
        }
        ul::-webkit-scrollbar {
          display: none;
        }
        ul {
          height: 134px;
          width: 257px;
          overflow: auto;
          padding-left: 12px;
          li {
            width: 24px;
            height: 24px;
            float: left;
            margin-right: 8px;
            margin-bottom: 10px;
          }
          li:hover {
            background: #f7f7f7;
          }
          .active {
            background: #f7f7f7;
          }
        }
      }
      /*分析报告弹框*/
      .bao_tel_box {
        width: 281px;
        height: 200px;
        background: #ffffff;
        box-shadow: 0px 0px 12px 0px rgba(52, 71, 87, 0.24);
        border-radius: 6px;
        position: absolute;
        top: -230px;
        left: 59px;
        .bao_title {
          height: 59px;
          width: 281px;
          position: relative;
          h3 {
            font-size: 18px;
            font-family: "Microsoft YaHei";
            font-weight: bold;
            color: #333333;
            line-height: 59px;
            text-align: center;
          }
          span {
            font-size: 18px;
            color: #7b7b7b;
            font-weight: bold;
            float: right;
            position: absolute;
            right: 18px;
            top: 18px;
            cursor: pointer;
          }
        }
        .bao_box {
          input {
            width: 250px;
            height: 40px;
            background: #f7f7f7;
            border-radius: 2px;
            outline: none;
            border: none;
            margin-left: 15px;
            color: #4b4b4d;
            text-indent: 10px;
          }
          input::-webkit-input-placeholder {
            color: #969799;
            font-size: 16px;
          }
          input::-moz-placeholder {
            /* Mozilla Firefox 19+ */
            color: #969799;
            font-size: 16px;
          }
          input:-moz-placeholder {
            /* Mozilla Firefox 4 to 18 */
            color: #969799;
            font-size: 16px;
          }
          input:-ms-input-placeholder {
            /* Internet Explorer 10-11 */
            color: #969799;
            font-size: 16px;
          }

          .xieyi {
            float: left;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 44px;
            input[type="checkbox"] {
              width: 12px;
              height: 12px;
              background-color: #fff;
              -webkit-appearance: none;
              border: 1px solid #e8e8e8;
              border-radius: 3px;
              outline: none;
              cursor: pointer;
            }
            input[type="checkbox"]:checked {
              background: url("../../assets/bao_dui.png") no-repeat center;
            }
            .checkbox {
              margin-right: 5px;
            }
            p {
              font-size: 12px;
              font-family: "Microsoft YaHei";
              font-weight: 400;
              color: #7b7b7b;
              line-height: 16px;
              em {
                color: #498de1;
                font-size: 12px;
                a {
                  color: #498de1;
                }
              }
            }
          }
          button {
            width: 250px;
            height: 30px;
            background: #52c2cc;
            border-radius: 2px;
            font-size: 14px;
            font-family: "Microsoft YaHei";
            font-weight: bold;
            color: #ffffff;
            line-height: 17px;
            border: none;
            margin-left: 16px;
            outline: none;
            cursor: pointer;
          }
        }
      }
    }
  }

  /*-- 没有业务员的提示 --*/
  .tootip {
    width: 240px;
    height: 120px;
    background: rgba(0, 0, 0, 0.4);
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -120px;
    margin-top: -60px;
    border-radius: 4px;
    p {
      color: #fff;
      line-height: 48px;
      font-size: 16px;
      text-align: center;
    }
    .loading {
      // width: 6px;
      // height: 6px;
      // background: #FFFFFF;
      // border-radius: 50%;
      color: #fff;
    }
    img{
        position: absolute;
        transform: translate(-50%,-50%);
        left: 50%;
        top: 77px;
    }
    // .loading:after {
    //   overflow: hidden;
    //   display: inline-block;
    //   vertical-align: bottom;
    //   animation: ellipsis 2s infinite;
    //   content: "\2026";
    // }
    // @keyframes ellipsis {
    //     from {
    //     width: 2px;
    //     }
    //     to {
    //     width: 15px;
    //     }
    // }
  }
}
}
</style>
