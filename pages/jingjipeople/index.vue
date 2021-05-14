<template>
  <div class="box">
      <!-- <div @mousedown="optenShow =false"  id="parent"> -->
        <div class="dragBox" v-if="visible" 
          id="child"
          >
          <div class="kehu_list">
            <div class="zixun_tou">
              <span class="iconfont iconzixun1"></span>
              <p>在线咨询</p>
            </div>
            <div class="sel_text">
                <span :class="{left_width:style_sel.flag1 , active:style_sel.flag2}"
                      @mousedown.stop="fangListShow">访客</span>

                <el-badge value="..." class="item" :hidden="gou_top_show">
                  <span :class="{ active:style_sel.flag4}"
                        @mousedown.stop="gouListShow">
                          沟通
                  </span>
                </el-badge>
            </div>
            <div class="people_list">
              <!-- 访客 -->
              <ul class="fangke_box" v-show="style_sel.flag2">
                <li @mousedown.stop="fangkeClick(item,1)" v-for="item in fangke_list" :key="item.uuid"
                 :class="item.uuid==active_id?'active':''" >
                  <div class="head_img" @mousedown.stop="peopleDetailShow(item.uuid)">
                      <el-badge :value="item.num" class="item"   :hidden="fang_Badge_show">
                         <img src="~/assets/im/on_phone.png" alt="" class="head"> 
                      </el-badge>
                  </div>
                  <div class="right_pro">
                        <div class="cus">
                            <h3>{{item.city}}</h3>   
                            <span v-if="item.connected==1">已被沟通</span>
                            <em v-if="item.createtime">{{item.createtime}}</em>
                        </div>
                      <div class="bot_pro">
                          <em>访问项目</em>
                          <i>{{item.name}}</i>
                          <!-- <img src="~/assets/icon/chat.png" alt=""> -->
                      </div>
                  </div>
                </li>
              </ul>
              <!-- 沟通 -->
              <ul class="goutong_box" v-show="style_sel.flag4">

                <li v-for="item in goutong_list" 
                  :key="item.uuid" 
                  @click="fangkeClick(item,2)"
                  :class="item.uuid==active_id?'active':''">
                  <div class="head_img" @mousedown.stop="peopleDetailShow(item.uuid)">
                    <el-badge :value="item.num" class="item"  :hidden="gou_Badge_show">
                      <img :src="item.visiting ==1? on_head_img:out_head_img" alt="" class="head"> 
                    </el-badge>
                  </div>
                  <div class="right_pro">
                        <div class="cus">
                            <h3>{{item.project}}</h3>
                            <em>{{item.time}}</em>
                        </div>
                        <p>{{item.content}}</p>
                  </div>
                </li>


              </ul>
            </div>
          </div>
          <div class="content_list">
            <div class="content_title">
                 <span>{{ online_name }}</span>
                 <!-- <em class="iconfont iconchahao" @mousedown.stop="closebox"></em> -->
            </div>
            <div class="chat_list">
             

               
               


              <template v-for="(item, index) in right_chat">
                <!-- 顾客-聊天-left-->
                <div
                  class="sender newcom"
                   v-if="item.from==active_id && item.content!=='%get your phone%' &&  item.content!=='%put my card%' &&  item.content.indexOf('data:image')==-1 && item.content.indexOf('{')==-1"
                   :key="item.id"
                >
                  <div class="head_image">
                    <img
                      src="~/assets/im/customer.png"
                    />
                  </div>
                  <div class="left_chat">
                    <div class="left_triangle"></div>
                    <span v-html="item.content"></span>
                  </div>
                </div>

                <!-- left-顾客发送 -->
                <div class="left_project new newcom"
                v-if="(item.from == active_id) &&  item.content.indexOf('{')!==-1"
                :key="item.id">
                  <div class="head_image">
                    <img src="~/assets/im/customer.png" />
                  </div>
                  <div class="left_chat">
                    <div class="left_triangle"></div>
                    <div class="project">
                      <img :src="JSON.parse(item.content).img" alt />
                      <div class="pro_text">
                        <h3>{{  JSON.parse(item.content).name }}</h3>
                        <p>建面 {{ JSON.parse(item.content).area }}m²</p>
                        <p>均价 {{ JSON.parse(item.content).price}}元/m²</p>
                      </div>
                    </div>
                  </div>
                </div>

                <!--业务员-聊天-right-->
                <div
                  class="receiver newcom"
                  v-if="item.from==staff_id_id &&  item.content!=='%get your phone%' && item.content!=='%put my card%' && item.content.indexOf('data:image')==-1"
                  :key="item.id"
                >
                  <div class="head_image">
                    <img :src="staff_head_img" />
                  </div>
                  <div class="left_chat">
                    <div class="left_triangle"></div>
                    <span v-html="item.content"></span>
                  </div>
                </div>
                 <!-- 业务员-发送名片-right -->
                <div class="sender_mingpian newcom" 
                 v-if="item.from == staff_id_id && item.content=='%put my card%'"
                 :key="item.id"
                 >
                    <div class="head_image">
                      <img
                        :src="staff_head_img"
                      />
                    </div>
                  <div class="left_chat_mingpian">
                          <div class="yewuyuan" >
                            <div class="top">
                              <img :src="staff_head_img" alt="" class="head_img" />
                              <div class="right_name">
                                <h2>{{ye_detail.name}} <i>新房咨询</i></h2>
                                <p>从业咨询服务6年</p>
                              </div>
                            </div>
                            <div class="fenshu">
                              <div class="fen_list">
                                <strong>{{ye_detail.ke_num}} <i>人</i></strong>
                                <p>服务客户</p>
                              </div>
                              <div class="fen_list">
                                <strong>{{ye_detail.dai_num}} <i>次</i></strong>
                                <p>带看客户</p>
                              </div>
                              <div class="fen_list">
                                <strong>{{ye_detail.haoping}} <i>%</i></strong>
                                <p>好评率</p>
                              </div>
                            </div>
                            <button>电话咨询</button>
                          </div>
                  </div>
                  
                </div>
                  <!-- 业务员-发送分析报告-right -->
                <div class="sender_fenxi newcom"
                    v-if="item.from == staff_id_id && item.content=='%get your phone%'"
                    :key="item.id">
                    <div class="head_image">
                      <img
                        :src="staff_head_img"
                      />
                    </div>
                  <div class="left_chat_fenxi">
                    <div class="send_box">
                        <img src="~/assets/im/fenxi.png" alt="">
                        <div class="text_box">
                            <h3>免费为您制定专属分析报告</h3>
                            <p>向允家咨询师免费领取分析报告,内附有购房流 程全盘解读</p>
                            <button>免费领取</button>
                        </div>
                    </div>
                  </div>
                </div>

                <!--业务员-图片-right-->
                <div
                  class="receiver_img newcom"
                  v-if="item.content.indexOf('data:image')!==-1 && (item.from == staff_id_id)"
                  :key="index"
                >
                  <div class="head_image">
                    <img :src="staff_head_img" />
                  </div>
                  <div class="left_chat">
                    <div class="left_triangle"></div>
                    <img :src="item.content.slice(4)" class="pic" />
                  </div>
                </div>

                 <!--顾客-图片-left-->
                <div
                  class="receiver_img_left newcom"
                  v-if="item.content.indexOf('data:image')!==-1 && (item.from == active_id)"
                  :key="index"
                >
                  <div class="head_image">
                    <img src="~/assets/im/customer.png" />
                  </div>
                  <div class="left_chat">
                    <div class="left_triangle"></div>
                    <img :src="item.content.slice(4)" class="pic" />
                  </div>
                </div>

              </template>
            </div>
            <!-- 发送框样式 -->
            <div class="send_box">
              <div class="gong_btn">
                <img src="~/assets/im/biaoqing.png" 
                    alt="" 
                    class="biaoqing"
                    @mousedown.stop="BiaoShow">
                <em class="pic">
                  <img src="~/assets/im/pic.png" alt="">
                  <input type="file" id="file" @change="img_Updated" />
                </em>
                <img src="~/assets/im/zixun.png"
                    alt="" 
                    @mousedown.stop="optenShow =true"
                    class="zixun">
                <img :src="btn_img.tel_img" 
                    alt=""
                    class="telphone"
                    @mousedown.stop="sendTelphone"
                    >
                <img :src="btn_img.ming_img" 
                    alt=""
                      @mousedown.stop="sendMingPian"
                    class="mingpian">
              </div>
              <textarea
                name
                id="talk_content"
                class="fasong_area"
                cols="30"
                rows="10"
                placeholder="在这里输入你需要咨询的内容"
                @keyup.enter="submit"
                v-model="content"
                @mousedown.stop="content_Change"
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
              <div class="opten_talk" v-show="optenShow"   @mousedown.stop="optenShow =true">
                <div class="opten_title">
                  <h4>大家都在问</h4>
                  <span @mousedown.stop="editShowClick">{{caozuo}}</span>
                </div>
                <ul  :class="{oldHeight:oldHeight,editHeight:editHeight}">
                  
                  <li
                    @mousedown.stop="Sel_changYongyu(item.word)"
                    v-for="item in result"
                    :key="item.id"
                    v-show="old_edit"
                  >
                      <em>{{ item.word }} </em>
                     <span v-show="bianji_show" @mousedown.stop="editOpenTalk(item)">编辑</span>
                     <span v-show="delete_show" @mousedown.stop="deleteChangOne(item)">删除</span>
                      <!-- <el-radio-group v-model="radio" v-show="delete_show" @change="deleteChangOne">
                        <el-radio :label="item.id" >
                       </el-radio>
                      </el-radio-group> -->
                  </li>
                
                  <div class="btn_box" v-show="edit_show">
                      <button class="add" @mousedown.stop="addChang">新增</button>
                      <button class="delete" @mousedown.stop="deleteChang">删除</button>
                  </div>
                  
                </ul>
              </div>
               <!-- 添加常用语 -->
              <div class="add_chang" v-show="add_chang_show">
                <div class="opten_title">
                  <h4>{{data_bian}}</h4>
                  <span class="iconfont iconchahao" 
                        @click="guanAddChang"></span>
                </div>
                <div class="bottom_text">
                    <textarea
                      type="textarea"
                      placeholder="编辑您的常用语"
                      v-model="textarea"
                      maxlength="30"
                      @mousedown.stop="changeChang_yu"
                    >
                    </textarea>
                    <span>{{textarea.length}}<em>/30</em></span>
                    <button @click="addChangSubmit">确定</button>
                </div>

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
                  <span class="iconfont iconchahao"></span>
                </div>
                <div class="bao_box">
                  <input type="text" placeholder="请输入手机号" />
                  <div class="xieyi">
                    <input type="checkbox" v-model="checked" class="checkbox" />
                    <p>
                      我已阅读并同意
                      <em><nuxt-link to="/we/fuwu">《{{logo_text}}用户协议》</nuxt-link></em>
                    </p>
                  </div>
                  <button>确定</button>
                </div>
              </div>
              <!-- 访客详情-->
              <div class="fangke" v-show="people_detail_show">
                  <div class="fangke_title">
                        <h4>访客详情</h4>
                        <span class="iconfont iconchahao" @mousedown.stop="peopleDetailHide"></span>
                  </div>
                  <div class="fang_detail">
                        <div class="tou_img">
                            <img :src="fangke_detail.visiting==1?on_head_img:out_head_img" alt="">
                            <span>{{fangke_detail.address}}</span>
                        </div>
                        <p>访客ID  <span>{{ fangke_detail.fang_id }}</span></p>
                        <p>IP地址  <span>{{ fangke_detail.ip_address}}</span></p>
                  </div>
                  <div class="bottom">
                        <h4>访客记录</h4>
                        <p>访问项目 <em>{{fangke_detail.project}}</em></p>
                        <p>访问时间 <em>{{ fangke_detail.fang_time}}</em></p>
                        <p>离开时间 <em>{{fangke_detail.leave_time}}</em></p>
                    </div>
              </div>
            </div>
          </div>

          <!-- 没有业务员的提示 -->
          <div class="tootip" v-show="tootip_show">
            <img src="~/assets/im/goutong.png" alt="">
            <span class="loading">访客已被沟通</span>
          </div>
          
          <!-- <div ref="div">
              您是否你翻翻你的呢
          </div> -->
          <!-- <button @click="btn">按钮</button> -->



        </div>
      <!-- </div> -->
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
      //  e.preventDefault();
        // 为了区分点击还是拖拽，使用时间差来判断，200毫秒内为点击，200毫秒外为拖拽，初始化为点击
        document.getElementById('parent').setAttribute('drag-flag', false)
        firstTime = new Date().getTime()
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
      yewu_show: true,
      visible: true,
      active_id: 1,
      right_chat: [],
      optenShow: false,
      online_name: "",
      people: [],
      project_content: {},
      result: [
        { id: 1, content: "您好，我想咨询项目详情？" },
        { id: 2, content: "您好，项目什么时候开盘？" },
        { id: 3, content: "首付大概是多少？" },
        { id: 4, content: "现在有优惠吗？" },
        { id: 5, content: "请问是毛坯还是精装？" },
        { id: 6, content: "什么时候可以看房？" },
      ],
      resultdata:[],
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


      style_sel:{
          flag1:true,
          flag2:true,
          flag3:true,
      },
      people_detail_show:false,
      btn_img:{
         tel_img:require("~/assets/im/telphone.png"),
         ming_img:require("~/assets/im/mingpian.png")
      },
      caozuo:"编辑",
      textarea:'',
      add_chang_show:false,

      edit_show:false,
      old_edit:true,
      on_head_img:require("~/assets/im/on_phone.png"),
      out_head_img:require("~/assets/im/out_phone.png"),
      fangke_list:[],
      goutong_list:[],
      gongtong_actived:'1',
      haslian:true,
      fangke_detail:{
        visiting:1,
        address:'',
        fang_id:'',
        ip_address:'',
        project:'',
        fang_time:'',
        leave_time:'-'
      },
      bianji_show:false,
      radio:'',
      delete_show:false,
      types:true,
      staff_id_id:1,
      staff_head_img:'',
      value:0,

      ye_detail:{
         name:'',
         ke_num:'',
         dai_num:'',
         haoping:'',
      },
      fang_Badge_show:true, 
      gou_Badge_show:true,
      gou_top_show:true,

      oldHeight:true,
      editHeight:false,

      data_bian:'添加常用语',
      current_bian_id:'',

      timer_line:'',
      timer_flag:true,
      //分页使用
      total:0,
      page:1,
      logo_text:"家园"


    };
  },
  head() {
    return {
      title:"经纪人端-IM" ,
      meta: [
        {
          hid: "description",
          name: "description",
          content: "经纪人端-IM"
        },
        { hid: "Keywords", name: "Keywords", content: "经纪人端-IM" }
      ]
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
  methods: {
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
    //转化时间，转化为几个小时前，今天前形式
    getDateDiff (time) {
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
    deleteChangOne(val){
         let  shan = {
           "controller":"Staff",
           "action":"delete_words",
           "params":{"id":val.id}};
         this.websocketsend(JSON.stringify(shan));

              this.optenShow = true;
              this.bianji_show = false;
              this.delete_show = false;
              this.edit_show = false;
              this.caozuo = "编辑"
    },
    submit() {
      this.fasong();
    },
    getDateTime(time){
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
            var d_hours = Math.abs(minutes - timeminutes);

             if(d_day < 1){
                //  switch(d_day){
                //    case 0 :
                //      return time.substring(11,16);
                //  }
                  // if(d_day==0){
                     return time.substring(11,16);
                //  }
             }else{
                  return time.substring(0,11);
             }

    },
    deleteChang(){
           this.delete_show = true;
           this.bianji_show = false;
    },
    addChang(){

    },
    Sel_changYongyu(word){
        this.content = word;
        this.optenShow = false;
    },
    editOpenTalk(num){
        this.add_chang_show = true;
        this.data_bian ="编辑常用语";
        //编辑常用语
        this.current_bian_id =num.id;
        this.textarea = num.word;
        //this.optenShow = true;
    }, 
    addChangSubmit(){
        let text= this.textarea;
        let  uuid = localStorage.getItem('ye_id');
        if(text.trim().length!==0){
          if(this.data_bian=="添加常用语"){
                let  data = {
                "controller":"Staff",
                "action":"add_word",
                "params":
                {"uuid":uuid,   
                "word":text}
                };
              this.websocketsend(JSON.stringify(data));
          }else if(this.data_bian=="编辑常用语"){
               let bianji = {
                "controller":"Staff",
                "action":"add_word",
                "params":
                {"uuid":uuid,
                "word":text,
                "id":this.current_bian_id
                }};
                this.websocketsend(JSON.stringify(bianji));
          }
            
              this.add_chang_show = false;
              this.optenShow = true;
              this.bianji_show = false;
              this.delete_show = false;
              this.edit_show = false;
              this.caozuo = "编辑"
        }
    },
    changeChang_yu(val){
        console.log(this.textarea,val)
    },
    hasOnline(uuid){
        let data=  {
        "controller":"talker",
        "action":"online_one",
        "params":{"uuid":uuid,
                  "host":window.location.host}
        };
       this.websocketsend(JSON.stringify(data));
    },
    initWebSocket() {
      // let  has= localStorage.getItem('has_lian');
      // if( has && has!=='undefined' && has!=='null' ){
      //     console.log('已存在');
      // }else{
      //     localStorage.setItem('has_lian',true);
      // }

      let  sid=this.$route.query.id;
      this.staff_id_id = sid;
      if(sid){
          localStorage.setItem('ye_id',sid);
      }
      if(sid && sid!=="undefined" && sid!=="null"){
          const wsurl = `ws://ws.jy1980.com?uuid=${sid}`;
          if(this.haslian==true){
              // if( localStorage.getItem('has_lian')=='true'){
                  this.websock = new ReconnectingWebSocket(wsurl);
              //}
          }
          this.websock.onmessage = this.websocketonmessage;
          this.websock.onopen = this.websocketonopen;
          this.websock.onerror = this.websocketonerror;
          this.websock.onclose = this.websocketclose;
      }
    },
     websocketonopen(){
         console.log("业务员端连接成功了");

         localStorage.setItem('has_lian',false);

         this.haslian = false;
         let uuid = localStorage.getItem('ye_id');
         this.getGoulist(uuid);
         this.getComments(uuid);

         let  staff_ming= {
           "controller":"Staff",
           "action":"info",
           "params":{"uuid":uuid}
           };
      this.websocketsend(JSON.stringify(staff_ming)); 


         let that = this;
         that.timer =setInterval(() => {
            if(that.types){
                that.types = false;
                that.getGoulist(uuid);
            }
         }, 2000);


      //常用语列表
       let chang_list={
         "controller":"Staff",
         "action":"words",
         "params":{"uuid":uuid}};
       this.websocketsend(JSON.stringify(chang_list));


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
           res= JSON.parse(e.data);
           if(res.action==205){ //访客列表
            if(this.active_id==1){
                 this.types = true;
            }
              let   has_ye = res.users;
              has_ye.map((m,n)=>{
                 m.createtime = this.getDateTime(m.createtime);
              })
              
              for(let  val of res.users){
                  if(sessionStorage.getItem(val.uuid)){
                    val.num = sessionStorage.getItem(val.uuid)
                  }
              }

              this.fangke_list =has_ye;



           }else if(res.action==203){ //客户详情
               let  data = res.info; 
               this.fangke_detail.visiting= data.visiting;
               this.fangke_detail.address= data.city;
               this.fangke_detail.fang_id= data.username;
               this.fangke_detail.ip_address= data.ip;
               this.fangke_detail.project= data.project;
               this.fangke_detail.fang_time= data.time;
               this.fangke_detail.leave_time= data.leave;
           }else if(res.action==206){ //名片
                if(res.result="success"){
                    this.ye_detail.name= res.staff.name;
                    this.ye_detail.ke_num = res.num.user_num;
                    this.ye_detail.dai_num = res.num.look_num;
                    this.ye_detail.haoping = res.num.rate;
                }
           }else if(res.action==308){  //沟通列表
               let  data = res.list;
               data.map(p=>{
                  p.time= this.getDateTime(p.time);
               })
               this.goutong_list = data;
           }else if(res.action==301){ //返回客户聊天
                  console.log(this.active_id,'active_id');
                  if(this.active_id==1 && this.active_id!==res.fromUserName){
                      let that= this;
                      let  num = 0;
                      if (sessionStorage.getItem(res.fromUserName)) {
                        num = parseInt(sessionStorage.getItem(res.fromUserName)) + 1;
                      } else {
                        num = 1;
                      }
                      sessionStorage.setItem(res.fromUserName, num);
                      for(let val of that.fangke_list) {
                        if(val.uuid == res.fromUserName) {
                          val.num = num
                            console.log('fang');
                            that.fang_Badge_show = false;
                        }
                      }
                      for(let val of that.goutong_list) {
                        if(val.uuid == res.fromUserName) {
                          val.num = num;
                            console.log('gou');
                            that.gou_Badge_show = false;
                            that.gou_top_show = false;
                        }
                      }
                  }
                 
                  if(this.active_id!==1 && this.active_id== res.fromUserName){

                              let msg = this.zhuanBiao(res.content);
                            // let  msg ='';
                              let  head_img = require('~/assets/im/customer.png');
                              // if(res.content=="%put my card%"){
                              //     msg="[收到名片]";
                              //       this.show_mingpian = true;
                              // }else if(res.content=="%get your phone%"){
                              //     msg="[获取分析报告]";
                              // }else if(res.content.indexOf('data:image')!==-1){
                              //     msg="[我发送了一张图片]";
                              // }else{
                              //     msg=this.zhuanBiao(res.content);
                              // }
                              var chat_list = document.querySelector(".chat_list");
                              let  dv = document.createElement('div');
                              let img_top = require("~/assets/im/fenxi.png");

                                if(res.content.indexOf('data:image')!==-1){
                                    dv.className = "receiver_img_left newcom chuang";
                                    dv.innerHTML= `<div class="head_image">
                                              <img src="${head_img}" />
                                            </div>
                                      <div class="left_chat">
                                        <div class="left_triangle"></div>
                                        <img src="${res.content.slice(4)}" class="pic" />
                                      </div>
                                  `;
                                    chat_list.appendChild(dv);
                                    dv.scrollIntoView();

                                     //查询历史聊天
                                   this.getHistory(res.sendToUserName,res.fromUserName);
                                }else if(res.content.indexOf('{')!==-1){
                                      dv.className="left_project new newcom chuang";
                                      dv.innerHTML=`
                                       <div class="head_image">
                                         <img src="${head_img}" />
                                       </div>
                                <div class="left_chat">
                                  <div class="left_triangle"></div>
                                  <div class="project">
                                    <img src="${JSON.parse(res.content).img}" alt />
                                    <div class="pro_text">
                                      <h3>${JSON.parse(res.content).name} </h3>
                                      <p>建面 ${JSON.parse(res.content).area}m²</p>
                                      <p>均价 ${JSON.parse(res.content).price}元/m²</p>
                                    </div>
                                  </div>
                                </div>
                                      `
                                       //查询历史聊天
                                   this.getHistory(res.sendToUserName,res.fromUserName);
                                }else{
                                   

                                  let  msg=  this.zhuanBiao(res.content);
                                  dv.className = "sender newcom chuang";
                                  dv.innerHTML =`<div class="head_image">
                                    <img
                                      src="${head_img}"
                                    /> </div>
                                    <div class="left_chat">
                                    <div class="left_triangle"></div>
                                    <span >${msg}</span>
                                  </div>
                                    `;
                                     //聊天去重
                                     var result= this.right_chat.some(item=>{
                                        if(item.id == res.message_id){
                                          return true
                                        }
                                     })

                                    if(result==true){
                                         console.log('301和303有重复')
                                    }else{
                                         if(chat_list){
                                           chat_list.appendChild(dv);
                                         }
                                    }
                                   
                                    dv.scrollIntoView();
                                  //查询历史聊天
                                   this.getHistory(res.sendToUserName,res.fromUserName);
                       }
                }


                 

           }else if(res.action==303){  //历史记录
                let  data = res.data;
                 data.map((p,q)=>{
                    p.content= this.zhuanBiao(p.content);
                })

                var chatlist = document.querySelector(".chat_list");
                let chuang = document.querySelectorAll(".chuang");
                if(chuang){
                  for (var i = chuang.length - 1; i >= 0; i--) { // 一定要倒序，正序是删不干净的，可自行尝试
                    chatlist.removeChild(chuang[i]);
                  }
                }

                //去除重复记录
                let obj = {};
                let peon = data.reduce((cur,next) => {
                    obj[next.id] ? "" : obj[next.id] = true && cur.push(next);
                    return cur;
                },[]) 
                this.right_chat = peon.reverse();
                console.log(this.right_chat,'303',this.staff_id_id);
                


                
              

           }else if(res.action==304){   //判断是否在线
               this.timer_flag = true;
           }else if(res.action==305){ //index 首次
              let  staff_head_img= res.staff.head_img;
              this.staff_head_img = staff_head_img;
              var chat_list = document.querySelector(".chat_list");
              let chuang = document.querySelectorAll(".chuang");
              if(chuang){
                  for (var i = chuang.length - 1; i >= 0; i--) { // 一定要倒序，正序是删不干净的，可自行尝试
                    chat_list.removeChild(chuang[i]);
                  }
              }
              this.getHistory(res.staff.id,this.active_id);
            
           }
           else if(res.action==306){ //占有客户
                if(res.result=="success"){
                  //type :1业务员端，0用户端
                   let staff= localStorage.getItem('ye_id');
                    let  data= {
                    "controller":"chat",
                    "action":"index",
                    "params":{"staff":staff,
                    "customer":this.active_id,
                    "type":1}};
                    this.websocketsend(JSON.stringify(data));
                }else{
                   this.tootip_show = true;
                }

           }else if(res.action==207){ //编辑添加常用语
                if(res.result=="success"){
                  let  ye_id = localStorage.getItem('ye_id');
                  let chang_list={
                    "controller":"Staff",
                    "action":"words",
                    "params":{"uuid":ye_id}
                  };
                  this.websocketsend(JSON.stringify(chang_list));
                }
           }else if(res.action==208){ //常用语列表
               let  data = res.data;
               if(data.length!==0){
                   this.result = data;
               }else{
                   this.result =[];
               }
              
           }else if(res.action==209){ //删除常用语
                if(res.result=="success"){
                  let  ye_id = localStorage.getItem('ye_id');
                  let chang_list={
                    "controller":"Staff",
                    "action":"words",
                    "params":{"uuid":ye_id}
                  };
                  this.websocketsend(JSON.stringify(chang_list));
                }
           }
       }
     },
     getGoulist(id){
        //查看我能看到的客户
        let data={
          "controller":"Talker",
          "action":"my_onlines",
          "params":{"uuid":id}
          };
       this.websocketsend(JSON.stringify(data));
     },
     getComments(id){
          //查看沟通列表
         let data_gou= {
          "controller":"Talker",
          "action":"mine",
          "params":{"uuid":id}
          };
        this.websocketsend(JSON.stringify(data_gou));
     },
    getHistory(staff,uuid){
        let data = {
          "controller":"chat",
          "action":"history",
          "params":
          {"mine":staff,
          "customer":uuid,
          "page":"1",
          "limit":150}
       };
       this.websocketsend(JSON.stringify(data));
    },
    fangkeClick(num,type){
        if(type==1){
              this.online_name = num.name;
        }else if(type==2){
              this.online_name = num.project;
              this.gou_top_show = true;
        }
        this.active_id = num.uuid;
        let  _this =this;
        this.timer_line = setInterval(function(){
          if(_this.timer_flag){
                _this.timer_flag = false;
                _this.hasOnline(_this.active_id);
          }
        },2000)
        

        sessionStorage.removeItem(num.uuid);
        let  gou=this.goutong_list;
        gou.map(p=>{
          if(p.uuid==num.uuid){
            delete p.num;
          }
        });
        let  fang=this.fangke_list;
        fang.map(p=>{
          if(p.uuid==num.uuid){
            delete p.num;
          }
        });
       
        //占有客户接口
        let   sid = localStorage.getItem('ye_id');

        let   data ={
        "controller":"Talker",
        "action":"occupy",
        "params":{"uuid":sid,
        "customer":num.uuid}
        };
        this.websocketsend(JSON.stringify(data));
        if(num.has_gou==1){
            this.tootip_show = true;
        }else{
           this.tootip_show = false;
        }

         


    },
    editShowClick(){
        this.edit_show  = true;
        this.caozuo =" ";
        this.bianji_show = true;

        this.editHeight = true;
        this.oldHeight = false;
    },
    addChang(){
         this.optenShow =false;
         this.add_chang_show =true;
    },
    guanAddChang(){
        this.add_chang_show =false;
    },
    fangListShow(){
        this.style_sel.flag4 =false;
        this.style_sel.flag2 =true;
    },
    gouListShow(){
        this.style_sel.flag2 = false;
        this.style_sel.flag4 =true;
        //let data = this.goutong_list;
        // data.map(q=>{
        //     console.log(q);
        //     let  mine = localStorage.getItem('staff');
        //     this.getHistory(mine,q.uuid);
        // })

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
    sendTelphone(){
      if(this.active_id!==1){
        this.btn_img.tel_img =require("~/assets/im/shouji_hui.png");
        var  chat_list = document.querySelector('.chat_list');
        let img_top = require("~/assets/im/fenxi.png");

        let dv = document.createElement('div');
        let  staff_img = this.staff_head_img;
        dv.className ="sender_fenxi chuang";
        dv.innerHTML = `<div class="head_image">
                  <img
                    src="${staff_img}"
                  />
                </div>
                  <div class="left_chat_fenxi">
                <div class="send_box">
                    <img src="${img_top}" alt="">
                    <div class="text_box">
                        <h3>免费为您制定专属分析报告</h3>
                        <p>向允家咨询师免费领取分析报告,内附有购房流 程全盘解读</p>
                        <button>免费领取</button>
                    </div>
                 </div>
              </div>`;
          chat_list.appendChild(dv);
          dv.scrollIntoView();

          let pp = {
          controller: "chat",
          action: "send",
          params: { content: "%get your phone%", username: this.active_id},
        };
         this.websocketsend(JSON.stringify(pp));
      }else{
          this.$message.warning('请选择您要发送的客户')
      }

    },
    sendMingPian(){
      if(this.active_id!==1){
        this.btn_img.ming_img = require("~/assets/im/mingpian_click.png");
        var chat_list = document.querySelector('.chat_list');
        let dv =  document.createElement('div');
        let staff_head_img= this.staff_head_img;
        dv.className="sender_mingpian chuang";
        dv.innerHTML=`<div class="head_image">
                 <img
                    src="${staff_head_img}"
                  />
                </div>
                 <div class="left_chat_mingpian">
                      <div class="yewuyuan" >
                        <div class="top">
                          <img src="${staff_head_img}" alt="" class="head_img" />
                          <div class="right_name">
                            <h2>${this.ye_detail.name}<i>新房咨询</i></h2>
                            <p>从业咨询服务6年</p>
                          </div>
                        </div>
                        <div class="fenshu">
                          <div class="fen_list">
                            <strong>${this.ye_detail.ke_num}<i>人</i></strong>
                            <p>服务客户</p>
                          </div>
                          <div class="fen_list">
                            <strong>${this.ye_detail.dai_num}<i>次</i></strong>
                            <p>带看客户</p>
                          </div>
                          <div class="fen_list">
                            <strong>${this.ye_detail.haoping}<i>%</i></strong>
                            <p>好评率</p>
                          </div>
                        </div>
                         <button>电话咨询</button>
                      </div>
              </div>
        `;
        chat_list.appendChild(dv);
        dv.scrollIntoView();

        let oo = {
          controller: "chat",
          action: "send",
          params: { content: "%put my card%", username: this.active_id },
        };
        this.websocketsend(JSON.stringify(oo));
       }else{
           this.$message.warning('请选择您要发送的客户')
       }
    },
    send(){
      this.fasong();
    },
        //发送功能的实现
    fasong(msg) {
      if (msg) {
        this.content = msg;
      }
          //转换聊天记录的表情
         if (this.content.trim().length !== 0 && this.active_id!==1) {
               let  data={
                    controller:"chat",
                    action:"send",
                    params:
                    {
                        content:this.content,
                        username:this.active_id
                    }
                };
            this.websocketsend(JSON.stringify(data));

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
            var chat_list = document.querySelector(".chat_list");
            let dv = document.createElement("div");
            let  head_img_staff= this.staff_head_img;
            dv.className = "receiver newcom chuang";
            dv.innerHTML = `<div class="head_image">
                            <img src="${head_img_staff}">
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
         }else{
            this.$message.warning('请选择您要发送的客户')
         }
    },
    btn(){
        this.$refs.div.contentEditable= true;
        this.$refs.div.focus();
    },
    peopleDetailHide(){
        this.people_detail_show =false;
    },
    peopleDetailShow(num){
      // if(num==1){
      //     this.head_img = require("~/assets/im/on_phone.png");
      // }else if(num==2){
      //     this.head_img = require("~/assets/im/out_phone.png");
      // }
      let   sid = localStorage.getItem('ye_id');
      let  data = {
         "controller":"Talker",
         "action":"customer",
         "params":{"uuid":num},
         "sid":sid
         };
        this.websocketsend(JSON.stringify(data));

        this.people_detail_show =true;
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
      this.img_bg.img_02 = require("~/assets/im/online.png");
      this.bg_flag.flag2 = true;
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
    // drag(e) {
    //   var oDiv = document.querySelector(".dragBox");
    //   var disX = e.clientX - oDiv.offsetLeft - 400;
    //   var disY = e.clientY - oDiv.offsetTop - 280;
    //   document.onmousemove = function (e) {
    //     e.preventDefault();
    //     var l = e.clientX - disX;
    //     var t = e.clientY - disY;
    //     oDiv.style.left = l + "px";
    //     oDiv.style.top = t + "px";
    //   };
    //   document.onmouseup = function () {
    //     document.onmousemove = null;
    //     document.onmouseup = null;
    //   };
    // },
    //点击用户
    bianSe(num) {
      this.active_id = num.id;
      localStorage.setItem("staff_id", num.id);
      num.isshow = 0;
      this.people.map((p, q) => {
        if (p.id == num.id) {
          p.isshow = 0;
        }
      });
      localStorage.setItem("staff_list", JSON.stringify(this.people));
    },
    closebox() {
      this.visible = false;
    },
    //上传图片
    img_Updated(e) {
      if(this.active_id!==1){
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
      let head_tou =  this.staff_head_img;

      reader.onload = function (e) {
        //保存图片到indexDB
        let staff_id = that.active_id;
        let data= {
        "controller":"chat",
        "action":"send",
        "params":{
        "content":`img:${e.target.result}`,
        "username":staff_id}};
        that.websocketsend(JSON.stringify(data));

        var chat_list = document.querySelector(".chat_list");
        let div = document.createElement("div");
        div.className = "receiver_img newcom chuang";
        div.innerHTML = `<div class="head_image">
                         <img src="${head_tou}" />
                    </div>
              <div class="left_chat">
                  <div class="left_triangle"></div>
                  <img src="${e.target.result}" class="pic"/>
              </div>`;
              chat_list.appendChild(div);
              div.scrollIntoView();
      };

      }else{
         this.$message.warning('请选择您要发送的客户')
      }



    },
    content_Change(val) {
        // console.log(val)
    },
    BiaoShow() {
      this.biao_show = true;
      this.optenShow = false;
    },
    Biaohide() {
      this.biao_show = false;
    },

  },
  beforeCreate(){
      if (process.server == false) {
         document.querySelector('body').setAttribute('style', 'width:800px;height:560px');
         console.log('设置宽')
      }
  },
  mounted() {
         var  _this = this;
         setTimeout(function(){
            _this.initWebSocket();
         },1000)

        // document.getElementById('parent').style.height= document.documentElement.clientHeight+'px';
        // let  width = Math.floor((document.documentElement.clientWidth)/2) - Math.floor((document.getElementById('child').offsetWidth)/2);
        // document.getElementById('child').style.marginLeft = width+'px';

    

    this.biaoQing.map((m, n) => {
      this.imgList.push({
        src: require(`~/assets/face/${n}.gif`),
        alt: m,
      });
    });

    document.addEventListener("mousedown", this.Biaohide, false);
    let  that =this;
    // var arr1 = ["a", "b", "c", "d"];
    // var arr2 = ["a", "c", "d", "f"];
    // let m = this.arrayWeightRemoval(arr1, arr2);
    // console.log(m);
    //返回结果 [b] ;

    //回到顶部
    $(".up-btn").click(function () {
      $("html , body").animate({ scrollTop: 0 }, "slow");
    });


      //滚动分页
      $(".chat_list").on("scroll", function () {
        if ($(this).scrollTop() == 0) {
          console.log(456);
          // if (that.isok && that.total > 100 * that.page) {
          //   that.isok = false;
          //   let id = sessionStorage.getItem("uuid");
          //   let userid = sessionStorage.getItem("userid");
          //   that.record(id, userid);
          // }
        }
    });

  },
  updated(){

        var chatlist = document.querySelector(".chat_list");
        var all_chat_box = document.getElementsByClassName("newcom");
        var last_dom = all_chat_box[all_chat_box.length - 1];
        if (last_dom) {
          last_dom.scrollIntoView();
        }
  },
  beforeDestroy(){
     clearInterval(this.timer);
     clearInterval(this.timer_flag);
     document.querySelector('body').removeAttribute('style')
  }
};
</script>
<style lang="less" scoped>
/deep/.opten_talk{
   ul{
      .el-radio-group{
        float: right;
        margin-top: 12px;
        .el-radio{
          .el-radio__input{
             // margin-top: 12px;
          }
           .el-radio__label{
              float: left;
              line-height: 40px;
              padding-left: 16px;
              color: #7d7d80;
              display: none;
           }
        }
      }
   }
}
// #parent{
//     width:100%;
//     min-height:900px;
//     background-color: #ffffff;
//     position: relative;
    // 聊天框
  html,body,#__nuxt{
      width: 800px;
      height: 560px;
  }
  .dragBox {
    width: 800px;
    height: 560px;
    // position: absolute;
    // top: 100px;
    // top: 50%;
    // left: 50%;
    // margin-top: -270px;
    // margin-left: -370px;
    z-index: 3000;
    background: #f5f8f8;
    box-shadow: 0px 0px 18px 0px rgba(52, 71, 87, 0.24);
    border-radius: 0px 6px 0px 0px;
    .kehu_list {
      width: 280px;
      height: 560px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 32px 0px rgba(51, 70, 87, 0.08);
      float: left;
      .zixun_tou {
        width: 279px;
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
      .sel_text{
        height: 40px;
        width:280px ;
        background: #fff;
        border-bottom: 1px solid #F3F3F3;
        span{
            font-size: 14px;
            font-family: "Microsoft YaHei";
            font-weight: bold;
            color: #323333;
            cursor: pointer;
            line-height: 36px;
        }
        .left_width{
            margin-left: 74px;
            margin-right: 80px;
        }
        .active{
            color: #52C2CC;
            font-weight: bold;
            padding-bottom: 12px;
            border-bottom: 2px solid #52C2CC;
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
        height: 468px;
        overflow-y: auto;
        overflow-x: hidden;
        border-right: 1px solid #ededed;
        .fangke_box {
          li {
            width: 280px;
            height: 69px;
            background: #fff;
            border-bottom: 1px solid #F3F3F3;
            cursor: pointer;
          .head_img{
              width: 41px;
              height: 41px;
              background: #EBF9FA;
              border-radius: 21px;
              position: relative;
              float: left;
              margin-right: 10px;
              margin-top:14px ;
              margin-left: 10px;
              .head{
                  width: 41px;
                  height: 41px;
                  float: left;
              }
              .bottom_type{
                  position: absolute;
                  right: -3px;
                  bottom: 0px;
                  float: left;
              }
          }
          .right_pro{
            float: left;
            padding-top: 14px;
                .cus{
                  width: 203px;
                  height: 18px;
                    h3{
                      font-size: 14px;
                      font-family: "Microsoft YaHei";
                      font-weight: bold;
                      color: #323233;
                      line-height: 18px;
                      float: left;
                    }
                    span{
                      width: 54px;
                      height: 18px;
                      background: #EBF9FA;
                      border-radius: 3px;
                        font-size: 12px;
                        font-family: "Microsoft YaHei";
                        font-weight: 400;
                        color: #52C2CC;
                        line-height: 18px;
                        text-align: center;
                        margin-left: 8px;
                        float: left;
                    }
                    em{
                      font-size: 11px;
                      font-family: "Microsoft YaHei";
                      font-weight: 400;
                      color: #AFAFB3;
                      line-height: 18px;
                      float: right;
                    }
                  }
                  .bot_pro{
                    // display: flex;
                    // align-items: center;
                    width: 203px;
                    em{
                        font-size: 12px;
                        font-family: "Microsoft YaHei";
                        font-weight: 400;
                        color: #7D7D80;
                        line-height: 34px;
                        float: left;
                        margin-right: 12px;
                    }
                    i{
                        font-size: 12px;
                        font-family: "Microsoft YaHei";
                        font-weight: 400;
                        color: #FF7519;
                        line-height: 34px;
                        float: left;
                        width: 120px;
                        overflow: hidden;
                        height: 34px;
                    }
                    img{
                        float: right;
                        margin-top: 6px;
                    }
                  }
          }
            
                  
              
          }
          .active{
             background: #f2f2f2;
          }
          }
        .goutong_box {
          li {
            width: 280px;
            height: 69px;
            background: #fff;
            border-bottom: 1px solid #F3F3F3;
            cursor: pointer;
          .head_img{
              width: 41px;
              height: 41px;
              background: #EBF9FA;
              border-radius: 21px;
              position: relative;
              float: left;
              margin-right: 10px;
              margin-top:14px ;
              margin-left: 10px;
              .head{
                  width: 41px;
                  height: 41px;
                  float: left;
              }
          }
          .right_pro{
            float: left;
            padding-top: 14px;
            width: 206px;
                .cus{
                    width: 206px;
                    height: 21px;
                    // overflow: hidden;
                    // white-space: nowrap;
                    // text-overflow: ellipsis;
                    h3{
                      font-size: 14px;
                      font-family: "Microsoft YaHei";
                      font-weight: bold;
                      color: #323233;
                      line-height: 18px;
                      float: left;

                      width: 135px;
                      height: 21px;
                      overflow: hidden;
                      white-space: nowrap;
                      text-overflow: ellipsis;
                    }
                    em{
                      font-size: 11px;
                      font-family: "Microsoft YaHei";
                      font-weight: 400;
                      color: #AFAFB3;
                      line-height: 18px;
                      float: right;
                    }
                  }
                p{
                  font-size: 14px;
                  font-family: "Microsoft YaHei";
                  font-weight: 400;
                  color: #7D7D80;
                  line-height: 34px;
                  width: 206px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
            }
          }
          .active{
             background: #f2f2f2;
          }
          }
          .active {
            background: #f2f2f2;
          }
        
      }
    }
    .content_list {
      width: 520px;
      height: 560px;
      background: #f7f7f7;
      float: left;
      display: flex;
      flex-direction: column;
      .content_title {
        width: 520px;
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
        width: 520px;
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
          margin-right: 14px;
      .head_image {
        float: right;
        margin-left: 19px;
        img {
          width: 36px;
          height: 36px;
          border-radius: 18px;
        }
      }
      .left_chat_fenxi {
            float: right;
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
                }
              }
          }
          }
  }
  /deep/
  .sender_mingpian{
          clear: both;
          margin-right: 14px;
          .head_image {
            float: right;
            margin-left: 19px;
            img {
              width: 36px;
              height: 36px;
              border-radius: 18px;
            }
          }
          .left_chat_mingpian{
              float: right;
              position: relative;
              margin-bottom: 15px;
              .yewuyuan {
                  background: #ffffff;
                  box-shadow: 0px 5px 12px 0px rgba(0, 0, 0, 0.05);
                  border-radius: 4px;
                  padding: 18px 15px 15px 15px;
                  width: 230px;
                  height: 135px;
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
                          background: #EBF9FA;
                          border-radius: 2px;
                          line-height: 18px;
                          font-size: 12px;
                          font-family: "Microsoft YaHei";
                          font-weight: 400;
                          color: #52C2CC;
                          margin-left: 10px;
                          text-align: center;
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
                      width: 60px;
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
                  button{
                    width: 228px;
                    height: 30px;
                    background: #52C2CC;
                    border-radius: 2px;
                    border: none;
                    font-size: 14px;
                    font-family: "Microsoft YaHei";
                    font-weight: bold;
                    color: #FFFFFF;
                    line-height: 21px;
                    margin-top:12px ;
                  }
                }
          }
  }

        /*Left项目样式*/
        /deep/ .left_project {
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
            background-color: #52c2cc;
            float: left;
            margin: 0 20px 10px 15px;
            padding: 10px 10px 4px 10px;
            border-radius: 6px 0px 6px 6px;
            position: relative;
            max-width: 325px;
            .left_triangle {
              height: 0px;
              width: 0px;
              border-top: 12px solid #52c2cc;
              border-left: 12px solid transparent;
              position: absolute;
              left: -9px;
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
           // background-color: #52c2cc;
            margin: 0 24px 10px 20px;
           // padding: 10px;
          //  border-radius: 7px 0px 7px 7px;
            position: relative;
            max-width: 260px;
            .left_triangle {
              position: absolute;
              // right: -12px;
              // top: 0px;
              // width: 0;
              // height: 0;
              // border-top: 12px solid #52c2cc;
              // border-right: 12px solid transparent;
            }
            .pic {
               width: 100%;
               height: 100%;
            }
          }
        }

      /*left图片样式*/
        /deep/.receiver_img_left {
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
            float: left;
           // background-color: #52c2cc;
            margin: 0 24px 10px 20px;
           // padding: 10px;
          //  border-radius: 7px 0px 7px 7px;
            position: relative;
            max-width: 260px;
            .left_triangle {
              position: absolute;
              // right: -12px;
              // top: 0px;
              // width: 0;
              // height: 0;
              // border-top: 12px solid #52c2cc;
              // border-right: 12px solid transparent;
            }
            .pic {
               width: 100%;
               height: 100%;
            }
          }
        }

      }

      .send_box {
        width: 520px;
        min-height: 160px;
        background: rgba(255, 255, 255, 1);
        position: relative;
        .gong_btn {
          margin-top: 14px;
          .biaoqing{
            margin-right: 14px;
            cursor: pointer;
            margin-left: 12px;
          }
          .pic {
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
          .zixun{
              margin-right: 14px;
              cursor: pointer;
          }
          .telphone{
                margin-right: 14px;
                cursor: pointer;
          }
          .mingpian{
                margin-right: 14px;
                cursor: pointer;
          }
        
        }
        .fasong_area {
          width: 520px;
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
          width: 520px;
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
          width: 260px;
          height: 250px;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0px 0px 12px 0px rgba(52, 71, 87, 0.24);
          position: absolute;
          border-radius: 2px;
          left: 11px;
          top: -260px;
          .opten_title {
            height: 30px;
            width: 260px;
            border-bottom: 1px solid #f7f7f7;
            h4 {
              font-size: 14px;
              font-family: "Microsoft YaHei";
              font-weight: bold;
              color: #303033;
              line-height: 30px;
              margin-left: 14px;
              float: left;
            }
            span{
                font-size: 14px;
                font-family: "Microsoft YaHei";
                font-weight: bold;
                color: #646466;
                line-height: 30px;
                float: right;
                margin-right:12px ;
                cursor: pointer;
            }
          }
          ul::-webkit-scrollbar {
            display: none;
          }
           .oldHeight{
            height:219px;
            width: 260px;
            overflow-y: auto;
            overflow-x: hidden;
            li:after{
                content: "";
                height: 0;
                clear: both;
                overflow: hidden;
                display: block;
                visibility: hidden; 
            }
            li {
              width: 230px;
              font-size: 14px;
              font-family: "Microsoft YaHei";
              font-weight: 400;
              color: #7d7d80;
              line-height: 18px;
              padding-left: 15px;
              cursor: pointer;
              padding-right: 15px;
              padding-top: 13px;
              padding-bottom: 13px;
              em{
                 font-size: 14px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: #7d7d80;
                line-height: 18px;
                float: left;
                width: 200px;
              }
              span{
                 color:#52C2CC ;
                 float:right;
              }
            }
            li:hover {
              background: #f7f7f7;
            }
            .active {
              background: #f7f7f7;
            }
            .el-checkbox-group{
                label{
                    .checkbox__label{
                      float: left;
                    }
                }
            }
            .btn_box{
              padding-left:16px;
              position: absolute;
              bottom: 10px;
              button{
                  width: 108px;
                  height: 30px;
                  border-radius: 2px;
                  font-size: 14px;
                  font-family: "Microsoft YaHei";
                  font-weight: bold;
                  line-height: 30px;
                  cursor: pointer;
                  border: none;
                  outline: none;
              }
              .add{
                  background: #52C2CC;
                  color: #fff;
                  margin-right: 10px;
              }
              .delete{
                  background: #EBF9FA;
                  color:#52C2CC ;
              }
            }
          }
          .editHeight{
            height:179px;
            width: 260px;
            overflow-y: auto;
            overflow-x: hidden;
            li:after{
                content: "";
                height: 0;
                clear: both;
                overflow: hidden;
                display: block;
                visibility: hidden; 
            }
            li {
              width: 230px;
              font-size: 14px;
              font-family: "Microsoft YaHei";
              font-weight: 400;
              color: #7d7d80;
              line-height: 18px;
              padding-left: 15px;
              cursor: pointer;
              padding-right: 15px;
              padding-top: 13px;
              padding-bottom: 13px;
              em{
                 font-size: 14px;
                font-family: "Microsoft YaHei";
                font-weight: 400;
                color: #7d7d80;
                line-height: 18px;
                float: left;
                width: 200px;
              }
              span{
                 color:#52C2CC ;
                 float:right;
              }
            }
            li:hover {
              background: #f7f7f7;
            }
            .active {
              background: #f7f7f7;
            }
            .el-checkbox-group{
                label{
                    .checkbox__label{
                      float: left;
                    }
                }
            }
            .btn_box{
              padding-left:16px;
              position: absolute;
              bottom: 10px;
              button{
                  width: 108px;
                  height: 30px;
                  border-radius: 2px;
                  font-size: 14px;
                  font-family: "Microsoft YaHei";
                  font-weight: bold;
                  line-height: 30px;
                  cursor: pointer;
                  border: none;
                  outline: none;
              }
              .add{
                  background: #52C2CC;
                  color: #fff;
                  margin-right: 3px;
              }
              .delete{
                  background: #EBF9FA;
                  color:#52C2CC ;
              }
            }
          }
        }
        .add_chang{
              width: 280px;
              height: 250px;
              background: #FFFFFF;
              box-shadow: 0px 0px 18px 0px rgba(52, 71, 87, 0.24);
              border-radius: 2px;
              position: absolute;
              left: 11px;
              top: -260px;
                  .opten_title {
                    height: 64px;
                    width: 280px;
                    border-bottom: 1px solid #f7f7f7;
                    position: relative;
                    h4 {
                      font-size: 16px;
                      font-weight: bold;
                      color: #323233;
                      line-height: 64px;
                      text-align: center;
                    }
                    span{
                        font-size: 18px;
                        color: #E0E0E0;
                        position: absolute;
                        top: 17px;
                        right: 17px;
                    }
                  }
                .bottom_text{
                    position: relative;
                    textarea{
                        width: 248px;
                        height: 100px;
                        margin-left: 16px;
                        border: none;
                        outline: none;
                        background: #F7F7F7;
                        font-size: 14px;
                        font-family:"MicrosoftYaHei";
                        text-indent: 1em;
                        line-height: 34px;
                        color: #4b4b4d;
                    }
                    textarea::placeholder{
                       color: #7D7E80;
                       font-size: 14px;
                       font-family:"MicrosoftYaHei";
                       text-indent: 1em;
                       line-height: 34px;
                    }
                    span{
                        position: absolute;
                        width: 31px;
                        height: 13px;
                        font-size: 14px;
                        font-family: "Microsoft YaHei";
                        font-weight: 400;
                        color: #7D7E80;
                        bottom: 69px;
                        right:25px ;
                    }
                    button{
                      width: 248px;
                      height: 34px;
                      background: #52C2CC;
                      border-radius: 4px;
                      font-size: 14px;
                      font-family: "Microsoft YaHei";
                      font-weight: bold;
                      color: #FFFFFF;
                      line-height: 34px;
                      border: none;
                      outline: none;
                      cursor: pointer;
                      margin-left: 16px;
                      margin-top: 24px;
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
  /deep/.bao_tel_box {
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
            }
          }
        }
        // 访客详情
        .fangke{
            width: 280px;
            height: 260px;
            background: #FFFFFF;
            box-shadow: 0px 0px 18px 0px rgba(52, 71, 87, 0.24);
            border-radius: 2px;
            position: absolute;
            top: -275px;
            left: 10px;
            .fangke_title{
              height: 41px;
              width: 280px;
              position: relative;
                h4{
                    font-size: 16px;
                    font-weight: bold;
                    color: #323233;
                    line-height: 41px;
                    text-align: center;
                }
                span{
                    color:#E0E0E0 ;
                    font-size:18px;
                    position: absolute;
                    right: 10px;
                    top: 10px;
                    cursor: pointer;
                }
            }
            .fang_detail{
              width: 248px;
              height: 90px;
              background: #FFFFFF;
              border: 1px solid #F5F5F5;
              box-shadow: 0px 0px 10px 0px rgba(52, 71, 87, 0.08);
              border-radius: 6px;
              margin-left: 16px;
              .tou_img{
                  display: flex;
                  margin-bottom: 5px;
                  img{
                      width: 28px;
                      height: 28px;
                      margin-top: 9px;
                      margin-left: 12px;
                      margin-right: 10px;
                  } 
                  span{
                    font-size: 14px;
                    font-family: "Microsoft YaHei";
                    font-weight: 400;
                    color: #19191A;
                    line-height: 28px;
                    margin-top: 9px;
                  }
              }
              p{
                  font-size: 12px;
                  font-family: "Microsoft YaHei";
                  font-weight: 400;
                  color: #626266;
                  line-height: 20px;
                  margin-left: 12px;
                  span{
                      color: #19191A;
                  }
              }
            }
            .bottom{
              padding-left:16px;
              h4{
                  font-size: 14px;
                  font-family: "Microsoft YaHei";
                  font-weight: bold;
                  color: #313133;
                  line-height: 30px;
                  margin-top: 8px;
              }
              p{
                  font-size: 12px;
                  font-family: "Microsoft YaHei";
                  font-weight: 400;
                  color: #626266;
                  line-height: 24px;
                  em{
                    color: #626266;
                  }
              }
            }

        }
      }
    }

    /*-- 没有业务员的提示 --*/
    .tootip {
      width: 200px;
      height: 100px;
      background: rgba(0, 0, 0, 1);
      opacity: 0.4;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -100px;
      margin-top: -50px;
      border-radius: 4px;
      img{
        margin: 0 auto;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-30px);
      }
      .loading {
        font-size: 14px;
        font-family: "Microsoft YaHei";
        font-weight: 400;
        color: #FFFFFF;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,7px);
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
// }

</style>
