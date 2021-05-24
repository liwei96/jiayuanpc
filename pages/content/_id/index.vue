<template>
  <div class="content">
    <my-header
      :all="common.city_info.all"
      :telphone="common.phone"
      :butie="Object.keys(activity).length !== 0"
      ref="header"
    ></my-header>
    <my-mianbao :router_data="routerData"></my-mianbao>
    <div class="content_center">
      <no-ssr>
        <remote-js
          src="https://webapi.amap.com/maps?v=1.4.14&key=729ac4d779c7e625bc11bd5ba3ff3112"
        ></remote-js>
      </no-ssr>
      <!-- 返乡置业 -->
      <div
        class="banner"
        v-if="Object.keys(banner).length !== 0"
        @click="goAdv(banner.url)"
      >
        <img :src="banner.img" alt="" />
      </div>
      <div class="title">
        <h1>
          {{ basic.name }}
          <span class="status">{{ basic.status }}</span>
          <span class="type">{{ basic.type }}</span>
        </h1>
        <ul>
          <li>{{ basic.decorate }}</li>
          <li v-for="item in basic.features" :key="item.id">{{ item }}</li>
        </ul>
      </div>
      <!-- 轮播图 -->
      <div class="lun_box">
        <div class="lunbo">
          <a class="go_pic" @click="goLouPic"> 楼盘相册 </a>
          <span
            class="butie"
            v-if="activity.money !== 0 && Object.keys(activity).length !== 0"
            >补贴<em>￥{{ activity.money }}</em></span
          >
          <div class="xiao_lun" v-if="xiaoLun">
            <el-carousel
              indicator-position="inside"
              arrow="always"
              height="360px"
              :popper-append-to-body="false"
              class="top_lun"
            >
              <el-carousel-item v-for="(item, index) in xiaoGuo" :key="index">
                <img
                  :src="item.big"
                  :key="index"
                  :onerror="errorImg"
                  :alt="`${basic.name}效果图`"
                  :title="`${basic.name}效果图`"
                />
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="shi_lun" v-if="shiLun">
            <el-carousel
              indicator-position="inside"
              arrow="always"
              height="360px"
              :popper-append-to-body="false"
              class="top_lun"
            >
              <el-carousel-item v-for="item in shiJing" :key="item.id">
                <img
                  :src="item.big"
                  :key="item.id"
                  :onerror="errorImg"
                  :alt="`${basic.name}实景图`"
                  :title="`${basic.name}实景图`"
                />
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="yang_lun" v-if="yangLun">
            <el-carousel
              indicator-position="inside"
              arrow="always"
              height="360px"
              :popper-append-to-body="false"
              class="top_lun"
            >
              <el-carousel-item v-for="item in yangBan" :key="item.id">
                <img
                  :src="item.big"
                  :key="item.id"
                  :onerror="errorImg"
                  :alt="`${basic.name}样板房`"
                  :title="`${basic.name}样板房`"
                />
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="jiao_lun" v-if="jiaoLun">
            <el-carousel
              indicator-position="inside"
              arrow="always"
              height="360px"
              :popper-append-to-body="false"
              class="top_lun"
            >
              <el-carousel-item v-for="(item, index) in jiaoTong" :key="index">
                <img
                  :src="item.big"
                  :key="index"
                  :onerror="errorImg"
                  :alt="`${basic.name}交通图`"
                  :title="`${basic.name}交通图`"
                />
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="hu_lun" v-if="huLun">
            <el-carousel
              indicator-position="inside"
              arrow="always"
              height="360px"
              :popper-append-to-body="false"
              class="top_lun"
            >
              <el-carousel-item v-for="item in peiTao" :key="item.id">
                <img
                  :src="item.big"
                  :key="item.id"
                  :onerror="errorImg"
                  :alt="`${basic.name}配套图`"
                  :title="`${basic.name}配套图`"
                />
              </el-carousel-item>
            </el-carousel>
          </div>
          <ul class="lun_xuan">
            <li @click="xiaoGuoLun">
              <img
                :src="xiaoGuo[0].small"
                :alt="`${basic.name}效果图`"
                :title="`${basic.name}效果图`"
                v-if="xiaoGuo.length > 0"
              />
              <p class="active">效果图({{ xiaoGuo.length }})</p>
            </li>
            <li @click="shiJingLun">
              <img
                :src="shiJing[0].small"
                :alt="`${basic.name}实景图`"
                :title="`${basic.name}实景图`"
                v-if="shiJing.length > 0"
              />
              <p>实景图({{ shiJing.length }})</p>
            </li>
            <li @click="yangBanLun">
              <img
                :src="yangBan[0].small"
                :alt="`${basic.name}样板房`"
                :title="`${basic.name}样板房`"
                v-if="yangBan.length > 0"
              />
              <p>样板房({{ yangBan.length }})</p>
            </li>
            <li @click="jiaoTongLun">
              <img
                :src="jiaoTong[0].small"
                :alt="`${basic.name}交通图`"
                :title="`${basic.name}交通图`"
                v-if="jiaoTong.length > 0"
              />
              <p>交通图({{ jiaoTong.length }})</p>
            </li>
            <li @click="huXingLun" v-if="peiTao.length > 0">
              <img
                :src="peiTao[0].small"
                :alt="`${basic.name}配套图`"
                :title="`${basic.name}配套图`"
                v-if="peiTao[0].small"
              />
              <p>配套图({{ peiTao.length }})</p>
            </li>
          </ul>
        </div>
        <div class="lun_right">
          <!-- 返乡置业 -->
          <div class="fan_zhi" v-if="Object.keys(activity).length !== 0">
            <img src="~/assets/fan/detail_jin.jpg" alt="" />
            <h6>¥{{ activity.money }}</h6>
            <button
              @click="
                lingFan(
                  basic.id,
                  '项目落地页返乡置业+补贴金额' + activity.money
                )
              "
            >
              立即领取
            </button>
          </div>
          <ul>
            <li>
              <span class="one">参考单价：</span>
              <span class="price">
                {{ basic.single_price }}
                <em>元/m²</em>
              </span>
              <span class="bian bian_te" @click="bianTong(91)">
                <img src="~/assets/icon/bian.png" alt="" />
                变价通知
              </span>
            </li>
            <li>
              <span class="left">参考总价：</span>
              <span class="shi">{{ basic.total_price }}万元</span>
              <span class="liao" @click="bianTong(91.1)">房源降价通知</span>
            </li>
            <li>
              <span class="left">楼盘户型：</span>
              <span class="shi">{{
                JSON.stringify(basic.rooms).replace(/\[|]/g, "")
              }}</span>
              <span class="liao" @click="bianTong(97)">了解户型详情</span>
            </li>
            <li class="dizhi">
              <span class="left">楼盘地址：</span>
              <span class="shi address">{{ basic.saler_address }}</span>
            </li>
            <li>
              <span class="left kaipan">开盘时间:</span>
              <span class="shi kaitime">{{ basic.opentime }}</span>
              <span class="bian kai_te" @click="bianTong(92)">
                <img src="~/assets/icon/tixing.png" alt="" />
                开盘提醒
              </span>
            </li>
          </ul>
          <div class="godetail">
            <p class="left">
              <nuxt-link :to="`/loudetail/${basic.id}`">
                查看更多楼盘详情
                <span class="el-icon-arrow-right"></span>
              </nuxt-link>
            </p>
            <p class="right">
              <span @mousemove="showFen" @mouseleave="hideFen"
                ><em class="iconfont iconweixin"></em>分享</span
              >
              <strong v-if="collect == 0" @click="getShou(basic.id)"
                ><em class="iconfont iconaixin"></em>关注</strong
              >
              <strong v-if="collect == 1" @click="getShou(basic.id)"
                ><em class="iconfont iconaixin1 active"></em>关注</strong
              >
            </p>
            <div class="saomama" v-show="fenxiang">
              <img :src="fenxiang_url" alt v-if="project_id !== ''" />
              <h5>微信"扫一扫",分享</h5>
            </div>
          </div>
          <div class="kefu">
            <div class="left_kefu">
              <div class="img_box">
                <img :src="staffs[0].head_img" alt />
              </div>
              <div class="right_kefu">
                <h2>
                  {{ staffs[0].name }}
                  <span class="zixun">新房咨询</span>
                </h2>
                <p class="jian">为客户提供专业的购房建议</p>
                <p class="tel">{{ common.phone.replace(",", "转") }}</p>
              </div>
            </div>
            <div class="button" @click="gotalk()">
              <img src="~/assets/icon/chat.png" alt="" />
              在线咨询
            </div>
            <div class="erma" v-if="common.phone">
              <img
                :src="`http://ll.edefang.net//index/weichat/code?tel=${common.phone}`"
                alt
              />
              <p>微信扫码拨号</p>
            </div>
          </div>
          <div class="yohui">
            <div class="youhui_left">
              <div class="left">
                <h4>年终大促 限时房源优惠</h4>
                <p>{{ logo_text }}专享优惠</p>
              </div>
              <span @click="youhuiShow">领取优惠</span>
            </div>
            <div class="yuyue_fang">
              <div class="left">
                <h4>您预约、免费小车上门接送</h4>
                <p>专业咨询师1V1服务</p>
              </div>
              <span @click="bianTong(103)">预约看房</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 导航栏 -->
      <div class="nav_box">
        <ul>
          <li class="active">
            <nuxt-link to="/">楼盘主页</nuxt-link>
          </li>

          <li>
            <nuxt-link :to="`/loudetail/${basic.id}`">楼盘详情</nuxt-link>
          </li>

          <li>
            <nuxt-link :to="`/prohuxing/${basic.id}`">主力户型</nuxt-link>
          </li>

          <li>
            <nuxt-link :to="`/prodong/${basic.id}?page=1`">楼盘动态</nuxt-link>
          </li>
          <li>
            <nuxt-link :to="`/propic/${basic.id}`">楼盘相册</nuxt-link>
          </li>
          <li>
            <nuxt-link :to="`/prowenda/${basic.id}?page=1`">楼盘问问</nuxt-link>
          </li>
          <li>
            <nuxt-link :to="`/prodian/${basic.id}?page=1`">楼盘点评</nuxt-link>
          </li>
        </ul>

        <span>咨询热线：{{ common.phone.replace(",", "转") }}</span>
      </div>
      <div class="mid_box">
        <div class="mid_box_left">
          <!-- 返乡置业 -->
          <div class="bu_box" v-if="Object.keys(activity).length !== 0">
            <div class="title">
              <h3>返乡置业&nbsp;&nbsp;1亿购房补贴大放送</h3>
              <span @click="activityShow">活动介绍></span>
            </div>
            <div class="box_bu_btn">
              <div class="left">
                <img src="~/assets/fan/bao.png" alt="" />
                <div class="bu">
                  <h3>￥{{ activity.money }}购房补贴金</h3>
                  <p>购房补贴金后将与您手机号绑定</p>
                </div>
              </div>
              <div class="right">
                <button
                  @click="
                    lingFan(
                      basic.id,
                      '项目落地页返乡置业+补贴金额' + activity.money
                    )
                  "
                >
                  立即领取
                </button>
                <p>{{ activity.num }}人已领取</p>
              </div>
            </div>
          </div>
          <!-- 主力户型 -->
          <div class="zhuHu">
            <div class="hu_title">
              <h2>主力户型</h2>
              <div class="kefu">
                <div class="kefu_box">
                  <img :src="staffs[1].head_img" alt />
                  <div class="name_box">
                    <p class="name">
                      {{ staffs[1].name }}
                      <span>新房咨询</span>
                    </p>
                    <p class="fuwu">
                      服务人数
                      <em>{{ staffs[1].ServeNum }}</em
                      >人
                    </p>
                  </div>
                </div>
                <span class="zixun_btn" @click="gotalk()">
                  <img src="~/assets/icon/chat.png" alt="" />
                  在线咨询
                </span>
              </div>
            </div>
            <div class="hu_box">
              <div class="sel_box">
                <div class="like-pic">
                  <div class="boutique-ul3">
                    <ul class="ul3-long">
                      <li v-for="item in appartments" :key="item.id">
                        <div class="top_hu">
                          <nuxt-link :to="`/hudetail/${basic.id}`">
                            <img
                              :src="item.img"
                              :alt="`${basic.name}${item.title}`"
                              :title="`${basic.name}${item.title}`"
                            />
                          </nuxt-link>
                        </div>
                        <no-ssr>
                          <div class="buttom_hu">
                            <nuxt-link :to="`/hudetail/${basic.id}`">
                              <h4>
                                <h6>{{ item.title }}</h6>
                                <span>{{ item.status }}</span>
                              </h4>
                              <p class="hu_name">面积{{ item.area }}m²</p>
                              <p class="hu_mian">
                                约
                                <em
                                  v-if="
                                    parseInt(item.price) > 0 &&
                                    parseInt(item.price) !== 0
                                  "
                                  >{{ item.price }}</em
                                >
                                <em v-else>待定</em>
                                万/套
                              </p>
                            </nuxt-link>
                            <button @click="bianTong(97.1)">
                              咨询详细户型
                            </button>
                          </div>
                        </no-ssr>
                      </li>
                    </ul>
                  </div>
                </div>
                <button class="leftBtn3" v-show="appartments.length >= 3">
                  <span class="el-icon-arrow-left"></span>
                </button>
                <button class="rightBtn3" v-show="appartments.length >= 3">
                  <span class="el-icon-arrow-right"></span>
                </button>
              </div>
            </div>
          </div>
          <!-- 送手机 -->
          <div class="phone-huo" v-if="participate!=0">
            <div class="title">
              <h4>活动优惠</h4>
              <span @click="showguizi"
                >活动规则</span
              >
            </div>
            <div class="imgbox">
              <img src="~/assets/phone-huo.jpg" alt="">
              <p>{{participate}}人抢到</p>
              <button @click="bianTong(121)">立即去抢</button>
            </div>
          </div>
          <!-- 楼盘动态 -->
          <div class="loudong">
            <div class="title">
              <h4>楼盘动态</h4>
              <span
                ><nuxt-link :to="`/prodong/${basic.id}?page=1`"
                  >更多动态></nuxt-link
                ></span
              >
            </div>
            <div class="dong_list">
              <el-timeline>
                <el-timeline-item
                  placement="top"
                  :timestamp="dynamics[0].time"
                  v-if="dynamics[0]"
                >
                  <div class="dong com">
                    <strong class="z_new">最新</strong>
                    <h3>
                      <nuxt-link :to="`/loudongpage/${dynamics[0].id}`"
                        >最新房源动态</nuxt-link
                      >
                    </h3>
                    <div class="duan">
                      <p v-if="dynamics[0] !== undefined">
                        <nuxt-link :to="`/loudongpage/${dynamics[0].id}`">{{
                          dynamics[0].content
                        }}</nuxt-link>
                      </p>
                      <nuxt-link :to="`/loudongpage/${dynamics[0].id}`"
                        >查看更多</nuxt-link
                      >
                    </div>
                  </div>
                </el-timeline-item>
                <el-timeline-item
                  v-if="dynamics[1]"
                  placement="top"
                  :timestamp="dynamics[1].time"
                >
                  <div class="com">
                    <strong class="z_tui">加推</strong>
                    <h3>
                      <nuxt-link :to="`/loudongpage/${dynamics[1].id}`"
                        >最新加推楼盘</nuxt-link
                      >
                    </h3>
                    <div class="duan">
                      <p>
                        <nuxt-link :to="`/loudongpage/${dynamics[1].id}`">{{
                          dynamics[1].content
                        }}</nuxt-link>
                      </p>
                      <nuxt-link :to="`/loudongpage/${dynamics[1].id}`"
                        >查看更多</nuxt-link
                      >
                    </div>
                  </div>
                </el-timeline-item>
              </el-timeline>
              <button @click="bianTong(98)">
                <img src="~/assets/icon/dingyue.png" alt="" />
                订阅楼盘动态
              </button>
            </div>
          </div>
          <!-- 楼盘分析资料 -->
          <div class="fenxi">
            <div class="fen_title">
              <span>热</span>
              {{ basic.name }}：楼盘分析资料
            </div>
            <div class="content">
              <div class="img_box">
                <img :src="basic.img" alt />
                <p>省时 省心 省力</p>
              </div>
              <div class="fenxi_content">
                <div class="tou_fenxi">
                  <h1>投资分析</h1>
                  <p class="text" v-if="analysises[0]">
                    1.{{ analysises[0].content }}
                  </p>
                  <p class="yin">
                    <img src="~/assets/yinying.png" alt="" />
                  </p>
                </div>
                <div class="yiju_fenxi">
                  <h1>宜居分析</h1>
                  <p class="text" v-if="analysises[1]">
                    1.{{ analysises[1].content }}
                  </p>
                  <p class="yin">
                    <img src="~/assets/yinying.png" alt="" />
                  </p>
                </div>
                <div class="lingqu">
                  <p>
                    已有
                    <em>{{ count.get_count }}</em
                    >人获取
                  </p>
                  <span @click="bianTong(99)">免费领取</span>
                </div>
              </div>
            </div>
          </div>
          <!--查询真实最低成交价  -->
          <div class="new_price" v-show="price_show">
            <h2>
              查询真实最低成交价
              <span>
                已有
                <i>{{ count.search_count }}</i
                >人查询
              </span>
            </h2>
            <div class="price-box">
              <div id="main" style="width: 400px; height: 210px"></div>
              <div class="tab_box">
                <table width="320" border="1">
                  <thead>
                    <tr>
                      <th>日期</th>
                      <th>成交套数</th>
                      <th>成交金额(万)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in truePrice" :key="index">
                      <td>{{ item.date }}</td>
                      <td>{{ item.num }}套</td>
                      <td>***万</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="bao_box">
              <div class="left">
                <div class="ling">
                  <span class="el-icon-bell"></span>
                </div>
                <p v-if="last_date">
                  本楼盘自开盘之日起共签约xx套，最新成交日期：{{
                    last_date
                  }}；如需了解真实最低成交价，请填写接收短信的手机号码
                </p>
              </div>
              <div class="tel_box">
                <input
                  type="text"
                  placeholder="请输入您的手机号"
                  maxlength="11"
                  v-model="li_tel"
                  id="li_phone"
                />
                <button @click="li_baoming(105)">立即查询</button>
              </div>
            </div>
          </div>
          <!--楼盘问问  -->
          <div class="louwen" v-if="questions.length !== 0">
            <h3>
              楼盘问问
              <span
                ><nuxt-link :to="`/prowenda/${basic.id}?page=1`"
                  >更多问问></nuxt-link
                ></span
              >
            </h3>
            <div class="wenwen_box">
              <div class="wen_box">
                <ul>
                  <li v-for="item in questions" :key="item.id">
                    <div class="wen">
                      <nuxt-link :to="`/prowenpage/${item.id}`">
                        <span>问</span>
                        <h4>{{ item.question }}</h4>
                      </nuxt-link>
                    </div>
                    <div class="da">
                      <nuxt-link :to="`/prowenpage/${item.id}`">
                        <span>答</span>
                        <p>{{ item.answer }}</p>
                      </nuxt-link>
                    </div>
                    <p class="dianzan">
                      <span>相关楼盘:{{ basic.name }}</span>
                      <strong @click="getLikeWen(item.id)">
                        <img
                          src="~/assets/icon/nozan.png"
                          alt=""
                          v-if="item.my_like == 0"
                        />
                        <img
                          src="~/assets/icon/haszan.png"
                          alt=""
                          v-if="item.my_like == 1"
                        />
                        点赞({{ item.number }})
                      </strong>
                    </p>
                  </li>
                </ul>
              </div>
              <div class="right_kefu">
                <ul>
                  <template v-for="(item, index) in staffs">
                    <li v-if="index >= 3" :key="item.id">
                      <img :src="item.head_img" alt="" class="head_img" />
                      <div class="kefu_name">
                        <h5>{{ item.name }}<span>新房咨询</span></h5>
                        <p>
                          服务人数<em>{{ item.ServeNum }}</em
                          >人
                        </p>
                      </div>
                      <span class="btn" @click="gotalk">
                        <img src="~/assets/icon/chat.png" alt="" />
                        向TA咨询</span
                      >
                    </li>
                  </template>
                </ul>
              </div>
            </div>
            <button>
              <nuxt-link :to="`/prowenda/${basic.id}?page=1`">
                <img src="~/assets/icon/wen.png" alt="" />
                更多问问
              </nuxt-link>
            </button>
          </div>
          <!--楼盘点评 -->
          <div class="dianPing">
            <h3>
              楼盘点评<span
                ><nuxt-link :to="`/prodian/${basic.id}?page=1`"
                  >更多评论></nuxt-link
                ></span
              >
            </h3>
            <template v-if="comments.length > 0">
              <div class="div1" v-for="item in comments" :key="item.id">
                <div class="div1-son1">
                  <nuxt-link :to="`/loudianpage/${item.id}`">
                    <img src="~/assets/content_pro.png" alt />
                  </nuxt-link>
                </div>
                <div class="div1-son2">
                  <span class="span1">
                    <nuxt-link :to="`/loudianpage/${item.id}`">
                      {{ item.mobile }}
                      <el-rate
                        v-model="item.score"
                        disabled
                        :colors="['#F1C25E', '#F1C25E', '#F1C25E']"
                      ></el-rate>
                    </nuxt-link>
                  </span>
                  <p>
                    <nuxt-link :to="`/loudianpage/${item.id}`">{{
                      item.content
                    }}</nuxt-link>
                  </p>
                  <div class="ping">
                    <div class="ping_left">
                      <span class="span2"
                        >{{ logo_text }}新房 {{ item.time }}</span
                      >
                      <span
                        class="span3"
                        v-if="item.mine == 1"
                        @click="delatePing(item.id)"
                        >删除</span
                      >
                      <span class="span3" v-if="item.mine == 0"></span>
                    </div>
                    <div class="ping_rig">
                      <span class="span5" @click="huiFu(item.id)">
                        <img src="~/assets/icon/ping.png" alt="" />
                        <span>({{ item.children.length }})</span>
                      </span>
                      <!-- 点亮 -->
                      <span
                        class="span4"
                        v-if="item.my_like == 1"
                        @click="getLike(item.id)"
                      >
                        <img
                          src="~/assets/icon/haszan.png"
                          alt=""
                          v-if="item.my_like == 1"
                        />
                        <span class="active">({{ item.like_num }})</span>
                      </span>
                      <!-- 未点亮 -->
                      <span
                        class="span4"
                        v-if="item.my_like == 0"
                        @click="getLike(item.id)"
                      >
                        <img
                          src="~/assets/icon/nozan.png"
                          alt=""
                          v-if="item.my_like == 0"
                        />
                        <span>({{ item.like_num }})</span>
                      </span>
                    </div>
                  </div>
                  <!-- <div class="huifu" v-for="ite in item.children" :key="ite.id">
                      <span>{{ite.mobile}}</span>
                      <i>: {{ite.content}}</i>
                      <span class="span3" v-if="ite.mine==1" @click="delatePing(ite.id)">删除</span>
                      <span class="span3" v-if="ite.mine==0"></span>
                    </div> -->
                </div>
              </div>
            </template>
            <template v-else>
              <p class="wuping">暂无评论，快来点评吧</p>
            </template>
            <span class="ping_btn" @click="textDianPing">
              <em class="iconfont iconhuifu"></em>我要点评</span
            >
          </div>
          <!--楼盘地图资料 -->
          <div class="ling_map">
            <h3><span>热</span>{{ basic.name }}:5公里内楼盘地图资料</h3>
            <div class="ling_map_box">
              <div class="leftimg">
                <div id="container_small"></div>
                <p>全新 精准 可靠</p>
              </div>
              <div class="content">
                <h4>为什么大家在准备买房的时候领一份资料？</h4>
                <p>1.没领地图，许多人后悔买错了房子</p>
                <p>2.领地图可以给想买房的朋友</p>
                <p>3.没领地图，一天只能看3个楼盘，领地图可以看7个楼盘</p>
                <p>4.楼盘价格走势及商业分析报告相关资料</p>
                <div class="right_btn">
                  <span
                    >已有<em>{{ count.travel_count }}</em
                    >人获取</span
                  >
                  <button @click="bianTong(96)">免费领取</button>
                </div>
              </div>
            </div>
          </div>
          <!-- 周边配套-->
          <div class="map">
            <h5>周边配套</h5>
            <div class="nearby-map">
              <!-- <div class="yuyue" @click="bianTong(5)">
                  <span>预约</span>
                  <span>看房</span>
                </div>-->
              <div id="container"></div>
              <div id="map_box">
                <div id="list">
                  <ul>
                    <li class="active" id="2">交通</li>
                    <li>教育</li>
                    <li>医疗</li>
                    <li>购物</li>
                    <li>生活</li>
                    <li>娱乐</li>
                  </ul>
                </div>
                <div class="bus">
                  <ul>
                    <li class="dian">公交站</li>
                    <li>地铁站</li>
                  </ul>
                </div>
                <div id="panel"></div>
              </div>
            </div>
          </div>
          <!-- 看过该楼盘的人还看过-->
          <div class="kanguo">
            <h2>看过该楼盘的人还看过</h2>
            <ul>
              <li v-for="item in same_areas" :key="item.id">
                <nuxt-link :to="`/content/${item.id}`">
                  <div class="img_box">
                    <img :src="item.img" :alt="item.name" :title="item.name" />
                    <div class="bg"></div>
                    <span class="butie" v-if="item.money !== 0">
                      补贴
                      <em>￥{{ item.money }}</em>
                    </span>
                  </div>
                  <div class="project_content">
                    <h3>{{ item.name }}</h3>
                    <p class="address">{{ item.city }}-{{ item.country }}</p>
                    <p class="jianmian">
                      <span>面积&nbsp;&nbsp;{{ item.area }}m²</span>
                      <strong>
                        均价: <em>{{ item.single_price }}元/m²</em></strong
                      >
                    </p>
                  </div>
                </nuxt-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="box_right_fixed">
          <div class="bang_box_home_de">
            <div class="project_top">
              <h3>
                {{ basic.name }}
                <span>{{ basic.status }}</span>
                <em>{{ basic.type }}</em>
              </h3>
              <ul>
                <li>
                  参考单价：
                  <span>
                    <strong>{{ basic.single_price }}</strong
                    >元/m²
                  </span>
                </li>
                <li>
                  楼盘地址：
                  <span>{{ basic.address }}</span>
                </li>
                <li>
                  开盘时间：
                  <span v-if="basic.opentime">{{ basic.opentime }}</span>
                </li>
              </ul>
              <div class="btn_two">
                <span @click="bianTong(91)">
                  <img src="~/assets/icon/bianjia.png" alt="" />变价通知我
                </span>
                <span @click="bianTong(92)">
                  <img src="~/assets/icon/kaipan.png" alt="" />开盘提醒我
                </span>
              </div>
            </div>
            <div class="pro_zixun">
              <div class="fenxishi">
                <h4>楼盘分析师</h4>
                <ul class="tese">
                  <li>
                    <span class="iconfont iconanquan"></span>
                    专业服务
                  </li>
                  <li><span class="iconfont iconanquan"></span>区域解读</li>
                  <li><span class="iconfont iconanquan"></span>户型分析</li>
                </ul>
              </div>
              <div class="kefu">
                <ul>
                  <li>
                    <div class="kefu_img_box">
                      <img :src="staffs[3].head_img" alt class="head_img" />
                    </div>
                    <div class="name_box">
                      <h6>
                        {{ staffs[3].name }}
                        <span>新房咨询</span>
                      </h6>
                      <p class="fuwu">
                        服务人数
                        <em>{{ staffs[3].ServeNum }}</em
                        >人
                      </p>
                      <p class="tel">
                        {{ common.phone.replace(",", "转") }}
                        <img
                          src="~/assets/icon/erma.png"
                          alt=""
                          @mousemove="saomaShow"
                          @mouseleave="saomaHide"
                        />
                      </p>
                      <my-sao-ma
                        ref="saoma"
                        :saoma_lian="this.saoma_url"
                      ></my-sao-ma>
                    </div>
                    <button @click="gotalk()">
                      <img src="~/assets/icon/chat.png" alt="" />在线咨询
                    </button>
                  </li>
                </ul>
              </div>
              <div class="youhui">
                <div class="left_you">
                  <h4>年终大促 限时房源优惠</h4>
                  <p>{{ logo_text }}专享优惠</p>
                </div>
                <span @click="youhuiShow">领取优惠</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 楼盘点评弹框 -->
      <div class="fan_tan_dian" v-show="dian_tan.dianPingFlag">
        <div class="fan_tel">
          <div class="fan_top">
            <h2>楼盘点评</h2>
            <div class="guan" @click="closePing">
              <i class="iconfont iconchahao" id="fan_close"></i>
            </div>
          </div>

          <div class="fan_con">
            <div class="fen_tit">
              <p class="quest">您看过该楼盘吗？</p>
              <ul>
                <li
                  @click="selTaidu"
                  :data-v="item.id"
                  :class="item.id == dian_tan.num ? 'active' : ''"
                  v-for="item in dian_tan.taidu"
                  :key="item.id"
                >
                  {{ item.name }}
                </li>
              </ul>
            </div>
            <div class="ping_fen">
              <p class="zong">楼盘评价</p>
              <div class="star">
                <el-rate v-model="dian_tan.values" show-text> </el-rate>
              </div>
            </div>
            <el-input
              type="textarea"
              placeholder="这个楼盘怎么样？我来说两句"
              v-model="dian_tan.textarea"
              maxlength="50"
              show-word-limit
            >
            </el-input>

            <input
              type="button"
              class="fan_btn"
              value="发表"
              @click="submitPing"
            />
          </div>
        </div>
      </div>
      <!-- 楼盘点评成功 弹框-->
      <div class="dian_success_bg" v-show="ping_cheng.dian_succ">
        <div class="dian_success">
          <div class="top">
            <h3>点评成功</h3>
            <div class="guan" @click="closePingCheng">
              <i class="iconfont iconchahao" id="fan_close"></i>
            </div>
          </div>
          <div class="content">
            <img src="~/assets/two.png" alt="" />
            <p>如需了解更多房产相关资讯 关注{{ logo_text }}公众号</p>
            <button @click="closePingCheng">确定</button>
          </div>
        </div>
      </div>
      <!-- 红包 弹框-->
      <div class="tuangou_tan" v-show="hongbao.hong_tan">
        <div class="tuan_box">
          <span class="iconfont iconguanbi" @click="guanTuanTan"></span>
          <div class="img_box">
            <div class="hongbao_tit">
              <h1>恭喜你！获得</h1>
              <p class="youhui">{{ logo_text }}专享大促购房优惠券</p>
              <p class="p01">已有<em>861</em>人领取</p>
            </div>
            <img src="~/assets/tankuang/hongbao_tan.png" alt />
            <!-- 输入手机号 -->
            <div class="hong_tel" v-show="hongbao.hong_tel_flag">
              <div class="input_box">
                <input
                  type="text"
                  placeholder="请输入您手机号"
                  v-model="hongbao.tuan_text_tel"
                  maxlength="11"
                />
                <button @click="lingYouHui(94)">抢优惠券</button>
              </div>
              <p class="p02">
                活动说明：领取成功后优惠编码将与您手机号绑定，会有工作人员与您联系
              </p>
              <p class="p03">注：活动最终解释权归{{ logo_text }}所有</p>
            </div>
            <!-- 输入验证码 -->
            <div class="hong_yan" v-show="hongbao.hong_yan_flag">
              <p class="yanzheng">
                验证码已发送到{{ hongbao.yan_tel_xing }} 请注意查看
              </p>
              <div class="input_box">
                <input
                  type="text"
                  placeholder="请输入您的验证码"
                  v-model="hongbao.tuan_input_code"
                />
                <button @click="getYanMa_c">{{ hongbao.yan_text }}</button>
              </div>
              <button class="queren" @click="subYan_c">确定</button>
              <p class="tip">注：活动最终解释权归{{ logo_text }}所有</p>
            </div>
          </div>
        </div>
      </div>
      <!-- 楼盘点评回复弹框 -->
      <div class="fan_tan_hui" v-show="dPingFlag">
        <div class="fan_tel">
          <div class="fan_top">
            <h2>点评回复</h2>
            <i class="iconfont iconchahao" @click="closePinglun"></i>
          </div>
          <div class="fan_con">
            <textarea
              type="text"
              placeholder="请在这里输入您的回复"
              class="fan_kuang"
              v-model="content_hui"
            ></textarea>
            <input
              type="button"
              class="fan_btn"
              value="发表"
              @click="tiJiaoPing"
            />
          </div>
        </div>
      </div>
      <!-- 图形验证码弹框 -->
      <div class="loginyans" v-show="tuYanFlags">
        <slide-verify
          :w="310"
          :h="255"
          @success="onSuccess"
          @fail="onFail"
          @refresh="onRefresh"
          :slider-text="textt"
          :imgs="imgs"
          ref="slideblock"
        ></slide-verify>
        <div class="massage">{{ msg }}</div>
      </div>
    </div>
    <my-footer
      :c_zhi_citys="common.city_info.all"
      :c_hot_search="common.hot_search"
      :c_friendlink="common.friend_links"
      :footer_tel="common.phone"
    ></my-footer>
    <activity-rule ref="rules"></activity-rule>
    <fan-zhi-hong
      ref="hong"
      :project="project_id_fan"
      :remark="remark_fan"
    ></fan-zhi-hong>
  </div>
</template>

<script>
import axios from "axios";
import header from "~/components/header.vue";
import soubox from "~/components/mianbao.vue";
import $ from "jquery";
import footer from "~/components/footer.vue";
import echarts from "echarts";
import img1 from "~/assets/b1.jpg";
import img2 from "~/assets/b2.jpg";
import img3 from "~/assets/b3.jpg";
import img4 from "~/assets/b4.jpg";
import img5 from "~/assets/b5.jpg";
import img6 from "~/assets/b6.jpg";
import saoma from "~/components/saoma.vue";
import activityrule from "~/components/activityrule.vue";
import fanzhi from "~/components/fanTan.vue";

export default {
  layout: "default",
  meta: { title: "项目详情页" },
  head() {
    return {
      title: this.header.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.header.description,
        },
        { hid: "Keywords", name: "Keywords", content: this.header.keywords },
      ],
    };
  },
  components: {
    "my-header": header,
    "my-mianbao": soubox,
    "my-footer": footer,
    "my-sao-ma": saoma,
    "activity-rule": activityrule,
    "fan-zhi-hong": fanzhi,
    "remote-js": {
      render(createElement) {
        return createElement("script", {
          attrs: { type: "text/javascript", src: this.src },
        });
      },
      props: {
        src: { type: String, required: true },
      },
    },
  },
  validate({ params }) {
    // 必须是number类型
    let match = params.id.match(/\d+/);
    if (match) {
      params.id = match[0];
      return params.id;
    } else {
      return false;
    }
  },
  async asyncData({ app, query, params, store, req }) {
    let host = store.state.hostname;
    let uuid = query.uuid;
    if (uuid && uuid !== "undefined" && uuid !== "null") {
      uuid = uuid;
    } else {
      uuid = "";
    }
    let other = query.other;
    let str = "";
    if (other) {
      other = other;
      str = `/jy/pc/detail?token=${store.state.token}&id=${params.id}&other=${other}&ip=${store.state.ip}&uuid=${uuid}&host=${host}`;
    } else {
      other = "null";
      str = `/jy/pc/detail?token=${store.state.token}&id=${params.id}&ip=${store.state.ip}&uuid=${uuid}&host=${host}`;
    }
    //  console.log(other,store.state.ip);
    //     参数
    // token
    // id
    // other
    // ip
    // 请求方式 get
    let [data] = await Promise.all([
      app.$axios
        .get(str)
        .then((res) => {
          if (res.data.code == 200) {
            let data = res.data;
            //      console.log(data,'data');
            return data;
          }
        })
        .catch((e) => {
          console.log(e);
        }),
    ]);
    let data1 = {};
    let basic = {};
    let dynamics = {};
    let truePrice = [];
    let comments = [];
    let same_areas = [];
    let activity = {};
    let banner = {};
    if (data) {
      data1 = data;
      basic = data.data.basic;
      dynamics = data.data.dynamics;
      truePrice = data.data.deals;
      comments = data.data.comments;
      same_areas = data.same_areas;
      if (data.common.activity == null) {
        activity = {};
      } else {
        activity = data.common.activity;
      }

      if (data.common.banner.length == 0) {
        banner = {};
      } else {
        banner = data.common.banner;
      }
    }
    return {
      xiaoGuo: data1.data.basic.imgs.effect,
      shiJing: data1.data.basic.imgs.real,
      yangBan: data1.data.basic.imgs.example,
      jiaoTong: data1.data.basic.imgs.traffic,
      peiTao: data1.data.basic.imgs.matching,
      appartments: data1.data.appartments,
      basic: basic,
      dynamics: dynamics,
      truePrice: truePrice,
      comments: comments,
      same_areas: same_areas,
      questions: data1.data.questions,
      analysises: data1.data.analysises,
      staffs: data1.common.staffs,
      common: data1.common,
      count: data1.data.basic.count,
      collect: data1.collect,
      header: data1.common.header,
      participate: data1.participate,
      current_city: data1.common.city_info.current,
      activity: activity,
      banner: banner,
    };
  },
  data() {
    return {
      xiaoLun: true,
      shiLun: false,
      yangLun: false,
      jiaoLun: false,
      huLun: false,
      xiaoGuo: [],
      shiJing: [],
      yangBan: [],
      peiTao: [],
      yangBan: [],
      jiaoTong: [],
      errorImg: 'this.src="' + require("~/assets/kong_pic.png") + '"',
      appartments: [],
      basic: {},
      dynamics: [],
      truePrice: [],
      staffs: [],
      comments: [],
      same_areas: [],
      dian_tan: {
        dianPingFlag: false,
        taidu: [
          {
            id: "1",
            name: "未看房",
          },
          {
            id: "2",
            name: "已看房",
          },
        ],
        num: 0,
        values: 0,
        textarea: "",
      },
      ping_cheng: {
        dian_succ: false,
      },
      hongbao: {
        hong_tan: false,
        tuan_text_tel: "",
        hong_tel_flag: true,
        yan_tel_xing: "187****4376",
        yan_text: "获取验证码",
        hong_yan_flag: false,
        tuan_input_code: "",
      },
      questions: [],
      analysises: [],
      common: {},
      count: {},
      flag: true,
      dPingFlag: false,
      pingid: "",
      content_hui: "",
      routerData: [],
      collect: 0, //是否收藏
      //立即查询
      li_tel: "",
      //图形验证码部分
      tuYanFlags: false,
      textt: "向右滑",
      imgs: [img1, img2, img3, img4, img5, img6],
      msg: "",
      saoma_url: "",

      fenxiang: false,
      fenxiang_url: "",
      project_id: "",
      last_date: "",
      price_show: true,

      header: {},
      logo_text: "家园",
      current_city: {},
      //返乡置业
      activity: {},
      banner: {},
      remark_fan: "",
      project_id_fan: "",
    };
  },

  computed: {
    price: function () {
      var price = [];
      this.truePrice.map((m) => {
        price.push(m.money);
      });
      return price;
    },
    date: function () {
      var date = [];
      this.truePrice.map((m) => {
        date.push(m.date);
      });
      return date;
    },
  },
  methods: {
    showliu(){
      if ($(window).scrollTop()>=$(document).height()-$(window).height() ) {
        this.$parent.$parent.liuShow()
      }
    },
    gotalk() {
      this.$parent.$parent.showChatBox()
    },
    goAdv(url) {
      if (url !== "" && url !== null) {
        window.location.href = url;
      } else {
        console.log(url, "url");
      }
    },
    lingFan(pid, remark) {
      this.remark_fan = remark;
      this.project_id_fan = pid;

      this.$refs.hong.showHong();
    },
    showguizi() {
      this.$parent.$parent.guizi = true
    },
    activityShow() {
      this.$refs.rules.showRules();
    },
    getWidth() {
      //跳转手机端
      let host = window.location.host;
      let city_current = this.current_city;
      let width = document.body.clientWidth;
      window.onresize = () => {
        if (width < 490) {
          if (host.indexOf("www.jy1980.com") != -1) {
            window.location.href =
              "http://m.jy1980.com/" +
              city_current.pinyin +
              "/content/" +
              this.$route.params.id;
          } else if (host.indexOf("www.edefang.net") != -1) {
            window.location.href =
              "http://mobile.edefang.net/" +
              city_current.pinyin +
              "/content/" +
              this.$route.params.id;
          } else if (host.indexOf(city_current.pinyin + ".jy1980.com") != -1) {
            window.location.href =
              "http://m.jy1980.com/" +
              city_current.pinyin +
              "/content/" +
              this.$route.params.id;
          } else if (host.indexOf(city_current.pinyin + ".edefang.net") != -1) {
            window.location.href =
              "http://mobile.edefang.net/" +
              city_current.pinyin +
              "/content/" +
              this.$route.params.id;
          }
        }
      };

      let liu_width = document.body.clientWidth;
      if (liu_width < 490) {
        if (host.indexOf("www.jy1980.com") != -1) {
          window.location.href =
            "http://m.jy1980.com/" +
            city_current.pinyin +
            "/content/" +
            this.$route.params.id;
        } else if (host.indexOf("www.edefang.net") != -1) {
          window.location.href =
            "http://mobile.edefang.net/" +
            city_current.pinyin +
            "/content/" +
            this.$route.params.id;
        } else if (host.indexOf(city_current.pinyin + ".jy1980.com") != -1) {
          window.location.href =
            "http://m.jy1980.com/" +
            city_current.pinyin +
            "/content/" +
            this.$route.params.id;
        } else if (host.indexOf(city_current.pinyin + ".edefang.net") != -1) {
          window.location.href =
            "http://mobile.edefang.net/" +
            city_current.pinyin +
            "/content/" +
            this.$route.params.id;
        }
      }
    },
    goLouPic() {
      var pid = this.$route.params.id;
      this.$router.push(`/propic/${pid}`);
    },
    showFen() {
      let id = "";
      let match = this.$route.params.id.match(/\d+/);
      if (match) {
        id = match[0];
        this.project_id = id;
      }
      if (id !== "") {
        this.fenxiang_url = `http://ll.edefang.net/api/project/transfer_m?id=${id}`;
        this.fenxiang = true;
      }
    },
    hideFen() {
      this.fenxiang = false;
    },
    getSmallmap(cpoint, name) {
      var AMap = window.AMap;
      AMap.convertFrom(cpoint, "baidu", function (status, result) {
        if (result.info === "ok") {
          var lnglats = result.locations;
          cpoint = [lnglats[0].lng, lnglats[0].lat];
          var map = new AMap.Map("container_small", {
            // eslint-disable-line no-unused-vars
            resizeEnable: true,
            zoom: 15,
            center: cpoint,
            zoomEnable: false,
            dragEnable: false,
          });
          var content = `<div class="marker-route_s">${name} <div class="box_b"><div class="box_c"></div></div></div>`;
          // function addMarker() {     // eslint-disable-line no-unused-vars
          var marker = new AMap.Marker({
            // eslint-disable-line no-unused-vars
            content: content,
            position: cpoint,
            offset: new AMap.Pixel(-70, -44),
          });
          marker.setMap(map); // eslint-disable-line no-unused-vars
        }
      });
    },
    saomaShow() {
      if (this.common.phone !== "") {
        this.saoma_url = `http://ll.edefang.net//index/weichat/code?tel=${this.common.phone}`;
        this.$refs.saoma.saoma = true;
      }
    },
    saomaHide() {
      this.$refs.saoma.saoma = false;
    },
    onFail() {
      this.msg = "验证失败";
    },
    onRefresh() {
      this.msg = "";
    },
    onSuccess() {
      //免费咨询104
      this.msg = "验证通过";
      var posit = sessionStorage.getItem("bao_id");
      let phone = "";
      let remark = "";
      let name = "";
      if (posit == 105) {
        phone = this.li_tel;
        remark = "项目落地页+立即查询";
        name = "";
      } else if (posit == 103) {
        phone = this.phone;
        remark = "单个楼盘动态页+报名看房";
        name = this.name;
      }

      let ip = ip_arr["ip"];
      var city = sessionStorage.getItem("city_id");
      var token = localStorage.getItem("token");
      var project = this.basic.id;
      var posit = sessionStorage.getItem("bao_id");
      var other = sessionStorage.getItem("other");
      var kid = sessionStorage.getItem("kid");
      var pattern = new RegExp("^1[345678]\\d{9}$");
      if (phone == "") {
        this.$message.error("手机号不能为空");
      } else if (!pattern.test(phone)) {
        this.$message.error("请输入正确的手机号");
      } else {
        axios
          .post("/front/flow/sign", {
            tel: phone,
            ip: ip,
            page: 10, //、家园PC 必传
            project: project, //  项目id
            city: city, //城市id
            position: posit, //位置（见下面 position位置表格）
            remark: remark, //请填写位置对应的名，如“详细楼盘信息”，如果是咨询详细户型请加上户型名
            source: "线上推广1",
            other: other,
            kid: kid,
            name: name, // 客户姓名，没有就不填
          })
          .then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.message);
              this.tuYanFlags = false;
              this.$refs.slideblock.reset();
            } else {
              console.log(res.data.message);
            }

            if (
              res.data.code == 500 &&
              res.data.message == "已成功为您订阅了该服务"
            ) {
              this.$message.success(res.data.message);
              this.tuYanFlags = false;
              this.$refs.slideblock.reset();
            }
          });
      }
    },
    li_baoming(num) {
      //立即查询
      sessionStorage.setItem("bao_id", num);
      var number = this.li_tel;
      let myreg = new RegExp("^[1][3,4,5,7,8][0-9]{9}$");
      if (number !== "") {
        if (!myreg.test(number)) {
          $("#li_phone").val("");
          $("#li_phone").attr("placeholder", "手机号码不合法");
        } else {
          this.tuYanFlags = true;
        }
      } else {
        $("#li_phone").attr("placeholder", "手机号不能为空");
      }
    },
    getShou(id) {
      //项目收藏
      var token = localStorage.getItem("token");
      if (token !== "" && token !== null) {
        axios({
          method: "post",
          url: "/jy/collect",
          params: {
            token: token,
            id: id,
            type: 1,
          },
        })
          .then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.message);
              this.getdata();
            } else {
              this.$message.error(res.data.message);
              this.$parent.$parent.loginTan = true;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.$message.error("请先登录");
        this.$parent.$parent.loginTan = true;
      }
    },
    getLikeWen(num) {
      //楼盘问问点赞
      var token = localStorage.getItem("token");
      if (token !== "" && token !== null) {
        axios({
          method: "post",
          url: "/jy/question/like",
          params: {
            token: token,
            id: num,
          },
        })
          .then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.message);
              this.getdata();
            } else {
              this.$message.error(res.data.message);
              this.$parent.$parent.loginTan = true;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.$message.error("请先登录");
        this.$parent.$parent.loginTan = true;
      }
    },
    delatePing(id) {
      var token = localStorage.getItem("token");
      // var pid = this.$route.params.id;
      axios({
        method: "post",
        url: "/comment/delete",
        params: {
          token: token,
          id: id,
        },
      })
        .then((res) => {
          if (res.data.code == 200) {
            this.$alert("评论删除成功", "提交成功", {
              confirmButtonText: "确定",
            });
            this.dian_tan.dianPingFlag = false;
            this.getdata();
          } else {
            this.$message(res.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    tiJiaoPing() {
      //提交回复
      var token = localStorage.getItem("token");
      var bid = this.$route.params.id;
      let match = bid.match(/\d+/);
      bid = match[0];
      if (token) {
        if (this.content_hui !== "") {
          axios({
            method: "post",
            url: "/comment/save",
            params: {
              token: token,
              pid: this.pingid,
              bid: bid,
              content: this.content_hui,
              consider_buy: "",
              score: "",
            },
          })
            .then((res) => {
              if (res.data.code == 200) {
                this.$alert("回复信息提交成功", "提交成功", {
                  confirmButtonText: "确定",
                });
                this.dPingFlag = false;
                var pid = this.$route.params.id;
                this.getdata();
              } else {
                this.$message(res.data.message);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          this.$message("回复内容不能为空");
        }
      } else {
        this.dPingFlag = false;
        this.$message.error("请先登录");
        this.$parent.$parent.loginTan = true;
      }
    },
    closePinglun() {
      this.dPingFlag = !this.dPingFlag;
    },
    huiFu(id) {
      var token = localStorage.getItem("token");
      if (token !== null) {
        this.dPingFlag = true;
        this.pingid = id;
      } else {
        this.$message.error("请先登录......");
        this.$parent.$parent.loginTan = true;
      }
    },
    getdata() {
      var token = localStorage.getItem("token");
      var project = this.$route.params.id;
      let match = project.match(/\d+/);
      project = match[0];
      axios
        .get("/jy/pc/detail", {
          params: {
            token: token,
            id: project,
            other: "",
            ip: ip_arr["ip"],
          },
        })
        .then((res) => {
          if (res.data.code == 200) {
            console.log(res.data);
            let comments = res.data.data.comments;
            this.comments = comments;
            this.questions = res.data.data.questions;
            this.collect = res.data.collect;
          }
        });
    },
    getLike(id) {
      //楼盘点评点赞
      var token = localStorage.getItem("token");
      if (token !== "" && token !== null) {
        axios({
          method: "post",
          url: "/comment/like",
          params: {
            token: token,
            id: id,
          },
        })
          .then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.message);
              this.getdata();
            } else {
              this.$message.error(res.data.message);
              this.$parent.$parent.loginTan = true;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.$message.error("请先登录");
        this.$parent.$parent.loginTan = true;
      }
    },
    //红包提交验证码
    subYan_c() {
      var phone = this.hongbao.tuan_text_tel;
      var code = this.hongbao.tuan_input_code;
      var ip = ip_arr["ip"];
      var token = localStorage.getItem("token");
      // var ip=this.$store.state.ip;
      if (code !== "" && phone !== "") {
        axios({
          method: "post",
          url: "/sure",
          params: {
            phone: phone,
            code: code, //短信验证码
            source: 3,
            ip: ip,
          },
        })
          .then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.message);
              this.hongbao.hong_tan = false;
              this.hongbao.tuan_input_code = "";
              if (token) {
              } else {
                localStorage.setItem("token", res.data.token);
                var newtel = phone.substr(0, 3) + "****" + phone.substr(7);
                localStorage.setItem("tel", newtel);
                localStorage.setItem("old_tel", phone);
                this.$cookies.set("token", res.data.token, "10d");
              }
            } else {
              this.$message.error(res.data.message);
            }
          })
          .catch((error) => {
            if (error.response) {
              console.log(error.response.data);
              this.$message.error(error.response.data.msg);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else {
              console.log(error.message);
            }
          });
      }
    },
    getYanMa_c() {
      //       let kk = parseInt(new Date().getTime()/1000)
      //       if($cookies.get('time')){
      //         let dd = kk-$cookies.get('time')
      //         if(dd<60){
      //           this.$message.error('不要频繁报名')
      //           return
      //         }else{
      //           $cookies.set('time',kk)
      //         }
      //       }else{
      //         $cookies.set('time',kk)
      //       }

      //红包获取验证码
      if (!this.flag) {
        return;
      }
      this.flag = false;
      let that = this;
      var time = 60;
      this.sendTimer = setInterval(function () {
        time--;
        if (time > 0) {
          that.hongbao.yan_text = time + "秒后重送";
        } else if (time == 0) {
          that.flag = true;
          clearInterval(this.sendTimer);
          that.hongbao.yan_text = "获取验证码";
          this.sendTimer = null;
        }
      }, 1000);
      var phone = this.hongbao.tuan_text_tel;
      var ip = ip_arr["ip"];
      if (phone && ip) {
        axios({
          method: "post",
          url: "/send",
          params: {
            phone: phone,
            ip: ip,
            source: 3,
          },
        })
          .then((res) => {
            if (res.data.code == 200) {
              this.$cookies.remove("time");
              this.$message.success(res.data.message);
            } else {
              this.$message.error(res.data.message);
            }
          })
          .catch((error) => {
            if (error.response) {
              console.log(error.response.data);
              this.$message.error(error.response.data.msg);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else {
              console.log(error.message);
            }
          });
      }
    },
    youhuiShow() {
      sessionStorage.setItem('isliu',1)
      this.hongbao.hong_tan = true;
    },
    lingYouHui(num) {
      //红包显示

      let tel = this.hongbao.tuan_text_tel;
      //32抢优惠券弹层 团购优惠券弹框
      sessionStorage.setItem("bao_id", num);
      let ip = ip_arr["ip"];
      let city = sessionStorage.getItem("city_id");
      var token = localStorage.getItem("token");
      var project = this.$route.params.id;
      var other = sessionStorage.getItem("other");
      var kid = sessionStorage.getItem("kid");

      var pattern = new RegExp("^1[345678]\\d{9}$");
      if (tel == "") {
        this.$message.error("手机号不能为空");
      } else if (!pattern.test(tel)) {
        this.$message.error("请输入正确的手机号");
      } else {
        // this.tuMaFlag = true;
        axios
          .post("/front/flow/sign", {
            tel: tel,
            ip: ip,
            page: 10, //家有PC端
            project: project,
            city: city,
            position: num,
            remark: "项目落地页+5000元-领取优惠 ", //请填写位置对应的名，如“详细楼盘信息”，如果是咨询详细户型请加上户型名
            source: "线上推广1",
            other: other,
            kid: kid,
            name: "", //客户姓名，没有就不填
          })
          .then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.message);
              this.hongbao.hong_tel_flag = false;
              //验证码弹框显示
              this.hongbao.hong_yan_flag = true;
              this.hongbao.yan_tel_xing = tel;
              // this.tan_content_c = "专享限时优惠折扣，家园专场推出，早抢早优惠";
              // this.tan_title_c = "抢优惠券";
              this.getYanMa_c();
            }
            if (
              res.data.code == 500 &&
              res.data.message == "已成功为您订阅了该服务"
            ) {
              this.$message.success(res.data.message);
              this.hongbao.hong_tan = false;
            }
          });
      }
    },
    //红包提交手机号

    bianTong(num) {
      sessionStorage.setItem("project_id", this.basic.id);
      if (num == 91.1) {
        sessionStorage.setItem("bao_id", 91);
      } else {
        sessionStorage.setItem("bao_id", num);
      }

      if (num == 97.1) {
        sessionStorage.setItem("bao_id", 97);
      } else {
        sessionStorage.setItem("bao_id", num);
      }

      switch (num) {
        case 91:
          this.$parent.$parent.baoming_tel.tan_title = "变价通知"; //ok
          this.$parent.$parent.baoming_tel.tan_content =
            "价格变动这么快？订阅楼盘变价通知，楼盘变价我们将第一时间通知您";
          this.$parent.$parent.baoming_tel.default_show = true;
          this.$parent.$parent.baoming_tel.kaipan_show = false;
          this.$parent.$parent.btntxt = '立即订阅'
          break;
        case 91.1:
          this.$parent.$parent.baoming_tel.tan_title = "房源降价通知"; //ok
          this.$parent.$parent.baoming_tel.tan_content =
            "价格变动这么快？订阅楼盘变价通知，楼盘变价我们将第一时间通知您";
          this.$parent.$parent.baoming_tel.default_show = true;
          this.$parent.$parent.baoming_tel.kaipan_show = false;
          this.$parent.$parent.btntxt = '立即订阅'
          break;
        case 91.2:
          this.$parent.$parent.baoming_tel.tan_title = "变价通知我"; //ok
          this.$parent.$parent.baoming_tel.tan_content =
            "价格变动这么快？订阅楼盘变价通知，楼盘变价我们将第一时间通知您";
          this.$parent.$parent.baoming_tel.default_show = true;
          this.$parent.$parent.baoming_tel.kaipan_show = false;
          this.$parent.$parent.btntxt = '立即订阅'
          break;
        case 97:
          this.$parent.$parent.baoming_tel.tan_title = "了解户型详情"; //ok
          this.$parent.$parent.baoming_tel.tan_content =
            "好楼盘户型是关键，咨询详细户型信息，安安心心买房";
          this.$parent.$parent.baoming_tel.default_show = true;
          this.$parent.$parent.baoming_tel.kaipan_show = false;
          this.$parent.$parent.baoming_tel.tan_img = require("~/assets/tankuang/huxing.png");
          this.$parent.$parent.btntxt = '立即订阅'
          break;
        case 97.1:
          this.$parent.$parent.baoming_tel.tan_title = "咨询详细户型"; //ok
          this.$parent.$parent.baoming_tel.tan_content =
            "好楼盘户型是关键，咨询详细户型信息，安安心心买房";
          this.$parent.$parent.baoming_tel.default_show = true;
          this.$parent.$parent.baoming_tel.kaipan_show = false;
          this.$parent.$parent.baoming_tel.tan_img = require("~/assets/tankuang/huxing.png");
          this.$parent.$parent.btntxt = '立即咨询'
          break;
        case 92:
          this.$parent.$parent.baoming_tel.tan_title = "开盘提醒"; //ok
          this.$parent.$parent.baoming_tel.kaipan_show = true;
          this.$parent.$parent.baoming_tel.jiatui_time = this.basic.push_time;
          this.$parent.$parent.baoming_tel.kaipan_time = this.basic.opentime;

          this.$parent.$parent.baoming_tel.default_show = false;
          this.$parent.$parent.btntxt = '立即订阅'
          break;
        case 104:
          this.$parent.$parent.baoming_tel.tan_title = "在线咨询"; //ok
          this.$parent.$parent.baoming_tel.tan_content =
            "20分内回应、一对一专业服务，了解更多有关房源信息周边动态";
          this.$parent.$parent.baoming_tel.default_show = true;
          this.$parent.$parent.baoming_tel.kaipan_show = false;
          this.$parent.$parent.baoming_tel.tan_img = require("~/assets/tankuang/bianjia.png");
          this.$parent.$parent.btntxt = '立即订阅'
          break;
        case 94:
          this.$parent.$parent.baoming_tel.tan_title = "领取优惠"; //ok
          this.$parent.$parent.baoming_tel.tan_content =
            "价格变动这么快？订阅楼盘变价通知，楼盘变价我们将第一时间通知您";
          this.$parent.$parent.baoming_tel.default_show = true;
          this.$parent.$parent.baoming_tel.kaipan_show = false;
          this.$parent.$parent.btntxt = '立即领取'
          break;
        case 103:
          this.$parent.$parent.baoming_tel.tan_title = "预约看房"; //ok
          this.$parent.$parent.baoming_tel.tan_content =
            "提前预约看房，我们将提供免费专车接送和专业楼盘讲解";
          this.$parent.$parent.baoming_tel.default_show = true;
          this.$parent.$parent.baoming_tel.kaipan_show = false;
          this.$parent.$parent.baoming_tel.tan_img = require("~/assets/tankuang/yukanfang.png");
          this.$parent.$parent.btntxt = '立即预约'
          break;
        case 97:
          this.$parent.$parent.baoming_tel.tan_title = "咨询详细户型"; //ok
          this.$parent.$parent.baoming_tel.tan_content =
            "好楼盘户型是关键，咨询详细户型信息，安安心心买房";
          this.$parent.$parent.baoming_tel.default_show = true;
          this.$parent.$parent.baoming_tel.kaipan_show = false;
          this.$parent.$parent.btntxt = '立即咨询'
          break;
        case 91:
          this.$parent.$parent.baoming_tel.tan_title = "变价通知我"; //ok
          this.$parent.$parent.baoming_tel.tan_content =
            "价格变动这么快？订阅楼盘变价通知，楼盘变价我们将第一时间通知您";
          this.$parent.$parent.baoming_tel.default_show = true;
          this.$parent.$parent.baoming_tel.kaipan_show = false;
          this.$parent.$parent.btntxt = '立即订阅'
          break;
        case 92:
          this.$parent.$parent.baoming_tel.tan_title = "开盘提醒我"; //ok
          this.$parent.$parent.baoming_tel.tan_content =
            "一键订阅最新开盘通知，我们会第一时间通知您，不再错过开盘时间";
          this.$parent.$parent.baoming_tel.default_show = true;
          this.$parent.$parent.baoming_tel.kaipan_show = false;
          this.$parent.$parent.btntxt = '立即订阅'
          break;
        case 98:
          this.$parent.$parent.baoming_tel.tan_title = "订阅楼盘动态"; //ok
          this.$parent.$parent.baoming_tel.tan_content =
            "订阅最新动态，楼盘最新情报抢先知道，帮您找准买房好时机";
          this.$parent.$parent.baoming_tel.default_show = true;
          this.$parent.$parent.baoming_tel.kaipan_show = false;
          this.$parent.$parent.baoming_tel.tan_img = require("~/assets/tankuang/dingdong.png");
          this.$parent.$parent.btntxt = '立即订阅'
          break;
        case 99:
          this.$parent.$parent.baoming_tel.tan_title = "楼盘资料免费领"; //ok
          this.$parent.$parent.baoming_tel.tan_content =
            "最新楼盘分析资料，看看房产专家对楼盘的投资分析和宜居分析解读";
          this.$parent.$parent.baoming_tel.default_show = true;
          this.$parent.$parent.baoming_tel.kaipan_show = false;
          this.$parent.$parent.baoming_tel.tan_img = require("~/assets/tankuang/fenzi.png");
          this.$parent.$parent.btntxt = '立即领取'
          break;
        case 104:
          this.$parent.$parent.baoming_tel.tan_title = "向TA咨询"; //1
          this.$parent.$parent.baoming_tel.tan_content =
            "20分内回应、一对一专业服务，了解更多有关房源信息周边动态";
          this.$parent.$parent.baoming_tel.default_show = true;
          this.$parent.$parent.baoming_tel.kaipan_show = false;
          break;
        case 96:
          this.$parent.$parent.baoming_tel.tan_title = "楼盘地图免费领"; //1
          this.$parent.$parent.baoming_tel.tan_content =
            "领取电子楼盘地图，优质地段，快捷交通、一眼明了";
          this.$parent.$parent.baoming_tel.default_show = true;
          this.$parent.$parent.baoming_tel.kaipan_show = false;
          this.$parent.$parent.baoming_tel.tan_img = require("~/assets/tankuang/map.png");
          this.$parent.$parent.btntxt = '立即领取'
          break;
        case 105:
          this.$parent.$parent.baoming_tel.tan_title = "最低真实成交价"; //1
          this.$parent.$parent.baoming_tel.tan_content =
            "获取最新成交价格，看看房友都是什么价格买的房";
          this.$parent.$parent.baoming_tel.default_show = true;
          this.$parent.$parent.baoming_tel.kaipan_show = false;
          this.$parent.$parent.btntxt = '立即获取'
          break;
        case 121:
          this.$parent.$parent.baoming_tel.tan_title = ""; //1
          this.$parent.$parent.baoming_tel.tan_content =
            "本平台成交项目即送苹果 <strong>12 pro max</strong> 一台，平台合计1000台手机送完为止";
          this.$parent.$parent.baoming_tel.default_show = true;
          this.$parent.$parent.baoming_tel.kaipan_show = false;
          this.$parent.$parent.baoming_tel.tan_img = require("~/assets/tankuang/tan-phone.jpg");
          this.$parent.$parent.btntxt = '立即抢'
          break;
      }

      this.$parent.$parent.baoming_tel.telflag = true;
    },
    guanTuanTan() {
      this.hongbao.hong_tan = false;
      this.hongbao.hong_tel_flag = true;
      this.hongbao.hong_yan_flag = false;
    },
    closePingCheng() {
      $(".guan").css({
        transform: "rotate(90deg)",
        transition: " all 0.6s",
      });
      let _this = this;
      setTimeout(function () {
        _this.ping_cheng.dian_succ = false;
      }, 600);
    },
    closePing() {
      $(".guan").css({
        transform: "rotate(90deg)",
        transition: " all 0.6s",
      });
      let _this = this;
      setTimeout(function () {
        _this.dian_tan.dianPingFlag = false;
      }, 600);
    },
    selTaidu(e) {
      var id = e.target.getAttribute("data-v");
      sessionStorage.setItem("ping_tai", id);
      this.dian_tan.num = id;
    },
    submitPing() {
      //提交评价
      var token = localStorage.getItem("token");
      var pid = this.basic.id;
      var score = this.dian_tan.values;
      //项目id
      var consider = sessionStorage.getItem("ping_tai");
      var content = this.dian_tan.textarea;
      let ip = ip_arr["ip"];
      if (token !== null) {
        if (consider !== null) {
          if (score !== 0) {
            if (content !== "") {
              axios({
                method: "post",
                url: "/comment/save",
                params: {
                  token: token,
                  pid: "", //被评论id
                  bid: pid, //项目id
                  content: content,
                  consider_buy: consider,
                  score: score,
                },
              })
                .then((res) => {
                  if (res.data.code == 200) {
                    // console.log(res.data.data);
                    this.dian_tan.dianPingFlag = false;
                    this.ping_cheng.dian_succ = true;
                    // this.$alert(res.data.message, "提交成功", {
                    //   confirmButtonText: "确定"
                    // });
                    sessionStorage.removeItem("ping_tai");
                    this.dian_tan.textarea = "";
                    this.dian_tan.values = 0;
                    this.num = 0;

                    this.getdata();
                  } else {
                    this.$message(res.data.message);
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              this.$message.error("评论内容不能为空");
            }
          } else {
            this.$message.error("请选择您要打的分数");
          }
        } else {
          this.$message.error("请选择是否看过该楼盘");
        }
      } else {
        this.dianPingFlag = false;
        this.$message.error("请先登录......");
        this.$parent.$parent.loginTan = true;
      }
    },
    drawLine(id) {
      this.charts = echarts.init(document.getElementById(id));
      this.charts.setOption({
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(255,255,255,0.9)",
          borderRadius: 6,
          borderColor: "#EDEDED",
          borderShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
          borderWidth: 1,
          extraCssText: "box-shadow:0px 0px 10px 0px rgba(0, 0, 0, 0.1);",
          textStyle: {
            color: "#666666",
          },
          formatter: function (params) {
            // console.log(params);
            return (
              params[0].name +
              "<br>" +
              params[0].seriesName +
              params[0].data +
              "万"
            );
          },
        },
        grid: {
          left: "1%",
          right: "4%",
          bottom: "1%",
          top: "10%",
          containLabel: true,
        },

        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.date,
          axisLine: {
            lineStyle: {
              color: "#E8E8ED",
            },
          },
          axisLabel: {
            textStyle: {
              color: "#898DA1",
              fontSize: 12,
            },
          },
        },
        yAxis: [
          {
            // name:"成交价:(万元)",
            // boundaryGap: false,
            textColor: "#000",
            type: "value",
            splitLine: {
              lineStyle: {
                type: "dashed", //设置为网格线
              },
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#E8E8ED",
              },
            },
            axisLabel: {
              margin: 40,
              show: true,
              textStyle: {
                color: "#898DA1",
                fontSize: 12,
              },
              formatter: "{value} (万元)",
            },
          },
        ],

        series: [
          {
            name: "成交价",
            type: "bar",
            stack: "总量",
            barWidth: 27,
            data: this.price,
            color: "#2CD264",
          },
        ],
      });
    },
    getZhouPei(cpoint, name) {
      //周边附近
      var AMap = window.AMap;
      AMap.convertFrom(cpoint, "baidu", function (status, result) {
        if (result.info === "ok") {
          var lnglats = result.locations;
          cpoint = [lnglats[0].lng, lnglats[0].lat];
          var map = new AMap.Map("container", {
            // eslint-disable-line no-unused-vars
            resizeEnable: true,
            zoom: 15,
            center: cpoint,
          });

          var content = `<div class="marker-route">${name} <div class="box_b"><div class="box_c"></div></div></div>`;
          // function addMarker() {     // eslint-disable-line no-unused-vars
          var marker = new AMap.Marker({
            // eslint-disable-line no-unused-vars
            content: content,
            position: cpoint,
            offset: new AMap.Pixel(-70, -44),
          });
          marker.setMap(map); // eslint-disable-line no-unused-vars
          // }
          // addMarker();
          let c = cpoint;
          AMap.service(["AMap.PlaceSearch"], function () {
            //构造地点查询类
            var placeSearch = new AMap.PlaceSearch({
              pageSize: 10, // 单页显示结果条数
              pageIndex: 1, // 页码
              city: "", // 兴趣点城市
              citylimit: false, //是否强制限制在设置的城市内搜索
              map: map, // 展现结果的地图实例
              panel: "panel", // 结果列表将在此容器中进行展示。
              autoFitView: true, // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
              renderStyle: "default",
            });
            var p2 = c;

            var s = AMap.GeometryUtil.distance(cpoint, p2);
            console.log(s);
            placeSearch.searchNearBy(
              "公交站",
              cpoint,
              2000,
              function (status, result) {
                console.log(status, result);
                // eslint-disable-line no-unused-vars
                //测试验证
                // var pois=result.poiList.pois;
                // pois.forEach(element => {
                //      var location=element.location;
                //      var cpoint = [Number(location.lng), Number(location.lat)];
                //      var marker = new AMap.Marker({
                //       icon: require("~/assets/bus_xin.png"),    //中心点的坐标
                //       position: cpoint,
                //       offset: new AMap.Pixel(-13, -30)
                //     });
                //     marker.setMap(map);
                // });
              }
            );

            $(document).ready(function () {
              $("#list ul li").on("click", function () {
                $(this).addClass("active");
                /* eslint-disable */ $(this).siblings().removeClass("active");
                if ($(this).attr("id") == 2) {
                  $(".bus").css("display", "block");
                  $("#panel").css("top", 89);
                  $("#panel").css("height", "369px");
                } else {
                  $(".bus").css("display", "none");
                  $("#panel").css("top", 40);
                  $("#panel").css("height", "417px");
                  placeSearch.searchNearBy(
                    $(this).html(),
                    cpoint,
                    2000,
                    function (status, result) {
                      console.log(status, result);
                      // eslint-disable-line no-unused-vars
                    }
                  );
                }
              });

              $(".bus ul li").on("click", function () {
                $(this).addClass("dian");
                $(this).siblings().removeClass("dian");
                placeSearch.searchNearBy(
                  $(this).html(),
                  cpoint,
                  2000,
                  function (status, result) {
                    console.log(status, result);
                    // eslint-disable-line no-unused-vars
                  }
                );
              });
            });
          });
        }
      });
    },
    xiaoGuoLun() {
      this.xiaoLun = true;
      this.shiLun = false;
      this.yangLun = false;
      this.jiaoLun = false;
      this.huLun = false;
    },
    shiJingLun() {
      this.xiaoLun = false;
      this.shiLun = true;
      this.yangLun = false;
      this.jiaoLun = false;
      this.huLun = false;
    },
    yangBanLun() {
      this.xiaoLun = false;
      this.shiLun = false;
      this.yangLun = true;
      this.jiaoLun = false;
      this.huLun = false;
    },
    jiaoTongLun() {
      this.xiaoLun = false;
      this.shiLun = false;
      this.yangLun = false;
      this.jiaoLun = true;
      this.huLun = false;
    },
    huXingLun() {
      this.xiaoLun = false;
      this.shiLun = false;
      this.yangLun = false;
      this.jiaoLun = false;
      this.huLun = true;
    },
    textDianPing() {
      var token = localStorage.getItem("token");
      if (token !== null) {
        this.dian_tan.dianPingFlag = true;
      } else {
        this.$message.error("请先登录......");
        this.$parent.$parent.loginTan = true;
      }
    },
  },
  beforeMount() {
    let mine = this.$store.state.style_mine;
    if (mine == 1) {
      //易得房样式
      this.logo_text = "易得房";
    } else if (mine == 2) {
      //家园样式
      this.logo_text = "家园";
    }
    this.getWidth();
  },
  mounted() {
    this.$store.commit('setCityId', this.current_city.area_id)
    $cookies.set('city_id',this.current_city.area_id)
    sessionStorage.setItem('city_name',this.current_city.short)
    sessionStorage.setItem('city_id',this.current_city.area_id)
    window.addEventListener("scroll", this.showliu);
    let truePrice = this.truePrice;
    if (truePrice.length !== 0) {
      if (this.basic.status == "在售") {
        this.last_date = truePrice[truePrice.length - 1].date;
        this.price_show = true;

        this.$nextTick(function () {
          //  console.log(this);
          let _this = this;
          setTimeout(function () {
            _this.drawLine("main");
          }, 2000);
        });
      } else if (this.basic.status == "待售") {
        this.price_show = false;
      } else if (this.basic.status == "售空") {
        this.price_show = false;
      }
    } else {
      this.price_show = false;
    }

    //    kid和other
    let other = this.$router.currentRoute.query.other;
    let kid = this.$router.currentRoute.query.kid;
    if (kid == undefined && other == undefined) {
    } else {
      sessionStorage.setItem("other", other);
      sessionStorage.setItem("kid", kid);
      this.$cookies.set("kid", kid);
      this.$cookies.set("other", other);
    }

    this.$parent.$parent.heng_name = this.basic.name;

    this.$parent.$parent.saoma_telphone = this.common.phone;

    let token = localStorage.getItem("token");
    let old_tel = localStorage.getItem("old_tel");
    if (token && old_tel) {
      this.hongbao.tuan_text_tel = old_tel;
      this.li_tel = old_tel;
    } else {
    }

    this.routerData = [
      {
        name: `${this.common.city_info.current.city}楼盘`,
        to: "/searchpro",
      },
      {
        name: `${this.basic.name}`,
        to: "",
      },
    ];

    //改speed long  num
    let _this = this;
    $(".rightBtn3")
      .eq(0)
      .click(function () {
        var num = _this.appartments.length;
        console.log(num);
        var speed = 246;
        var long = (num - 3) * speed;
        if (parseInt($(".ul3-long").eq(0).css("left")) <= -long) {
          $(".rightBtn3").children().css({
            color: "rgba(153,153,153,1)",
          });
          speed = 0;
        }
        $(".leftBtn3").children().css({
          color: "#000",
        });
        $(".ul3-long")
          .eq(0)
          .animate(
            {
              left: parseInt($(".ul3-long").eq(0).css("left")) - speed + "px",
            },
            200
          );
      });
    console.log(parseInt($(".ul3-long").eq(0).css("left")));

    $(".leftBtn3")
      .eq(0)
      .click(function () {
        var speed = 246;
        if (parseInt($(".ul3-long").eq(0).css("left")) >= -1) {
          $(".leftBtn3").children().css({
            color: "rgba(153,153,153,1)",
          });
          speed = 0;
        }
        $(".rightBtn3").children().css({
          color: "#000",
        });
        $(".ul3-long")
          .eq(0)
          .animate(
            {
              left: parseInt($(".ul3-long").eq(0).css("left")) + speed + "px",
            },
            200
          );
      });

    //周边配套
    let long = this.basic.longitude;
    let lat = this.basic.latitude;
    if (long !== undefined && lat !== undefined) {
      var cpoint = [Number(long), Number(lat)];
      setTimeout(() => {
        this.getZhouPei(cpoint, this.basic.name);
        this.getSmallmap(cpoint, this.basic.name);
      }, 500);
    } else {
      cpoint = [120.144496, 30.318836];
      setTimeout(() => {
        this.getZhouPei(cpoint, this.basic.name);
        this.getSmallmap(cpoint, this.basic.name);
      }, 500);
    }

    ////轮播图点击
    $(".lun_xuan li").click(function () {
      $(this).children("p").addClass("active");
      $(this).siblings().children("p").removeClass("active");
    });
    if (!sessionStorage.getItem('isliu')) {
      setTimeout(()=>{
        this.$parent.$parent.liuShow()
      },10000)
    }
  },
  watch: {
    $route() {
      this.routerData = this.$route.matched;
    },
    hongbao: {
      handler(val){
        if(val.hong_tan==true) {
          sessionStorage.setItem('isliu',1)
        }else{
          sessionStorage.removeItem('isliu')
        }
      },
      deep: true
    }
  },
  updated() {
    //右侧悬浮框
    console.log($(".mid_box_left").offset(), $(".map").offset());
    //    console.log($(".mid_box_left").offset().top, $(".map").offset().top);

    if (
      $(".mid_box_left").offset() !== undefined &&
      $(".map").offset() !== undefined
    ) {
      let xuan_top = $(".mid_box_left").offset().top;
      let hu_top = $(".map").offset().top;

      let chazhi = hu_top - xuan_top;
      window.onscroll = function () {
        var top1 =
          document.documentElement.scrollTop || document.body.scrollTop; //浏览器兼容
        if (top1 <= 800) {
          $(".bang_box_home_de")
            .css("position", "absolute")
            .css({ top: "52px", right: "0", margin: 0 });
        } else if (top1 >= 800 && top1 <= chazhi + 165) {
          $(".bang_box_home_de").css("position", "fixed").css({
            top: 10,
            right: "50%",
            "margin-right": "-600px",
          });
        } else if (top1 >= chazhi + 265) {
          $(".bang_box_home_de")
            .css("position", "absolute")
            .css({
              top: chazhi - 530,
              right: "0",
              margin: 0,
            });
        }
      };
    }

    //展开查看详情
    // let tap = 1;
    // $(".sel_more").click(function() {
    //   if (tap == 1) {
    //     console.log($(this));
    //     $(this)
    //       .prev()
    //       .css({
    //         "white-space": "inherit"
    //       });
    //     tap = 2;
    //     $(this).html("收起");
    //   } else if (tap == 2) {
    //     $(this)
    //       .prev()
    //       .css({
    //         "white-space": "nowrap"
    //       });
    //     tap = 1;
    //     $(this).html("查看更多");
    //   }
    // });
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.showliu);
  },
};
</script>

<style  lang="less" scoped>
/deep/ .el-textarea {
  height: 120px;
  .el-textarea__inner {
    height: 120px;
    border: none;
    background: #f8f8f8;
  }
}
/deep/ .marker-route_s {
  position: relative;
  width: 150px;
  height: 34px;
  background: rgba(255, 255, 255, 1);
  border-radius: 3px;
  font-size: 16px;
  font-family: "Microsoft YaHei";
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  line-height: 34px;
  text-align: center;
  .box_b {
    position: absolute;
    width: 29px;
    height: 15px;
    background: rgba(62, 172, 240, 0.2);
    border-radius: 50%;
    left: 50%;
    margin-left: -15px;
    .box_c {
      position: absolute;
      width: 16px;
      height: 7px;
      background: #3eacf0;
      border-radius: 50%;
      top: 4px;
      left: 6px;
      z-index: 100;
    }
  }
}
/deep/ .marker-route {
  position: relative;
  width: 150px;
  height: 34px;
  background: rgba(255, 255, 255, 1);
  border-radius: 3px;
  font-size: 16px;
  font-family: "Microsoft YaHei";
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  line-height: 34px;
  text-align: center;
  .box_b {
    position: absolute;
    width: 29px;
    height: 15px;
    background: rgba(42, 198, 110, 0.2);
    border-radius: 50%;
    left: 50%;
    margin-left: -15px;
    .box_c {
      position: absolute;
      width: 16px;
      height: 7px;
      background: #2ac66e;
      border-radius: 50%;
      top: 4px;
      left: 6px;
      z-index: 100;
    }
  }
}
/deep/.marker-route::before {
  display: inline-block;
  content: "";
  position: absolute;
  border: 6px solid transparent;
}
/deep/.marker-route::after {
  display: inline-block;
  content: "";
  position: absolute;
  border: 6px solid transparent;
}
/deep/.marker-route::before {
  left: 46%;
  top: 34px;
  border-top-color: #fff;
  z-index: 200;
}
/deep/.marker-route::after {
  left: 46%;
  bottom: -13px;
  border-top-color: #fff;
}
//轮播样式
/deep/ .top_lun {
  .el-carousel__arrow {
    width: 24px;
    height: 60px;
    background: rgba(0, 0, 0, 0.5);
    //  opacity:0.5;
    border-radius: 0;
    i {
      color: #fff;
      font-size: 20px;
    }
  }
  .el-carousel__arrow--right {
    right: 0px;
  }
  .el-carousel__arrow--left {
    left: 0px;
  }
  .el-carousel__indicators--horizontal {
    width: 560px;
    text-align: center;
    .el-carousel__button {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }
  }
}
@import "../../../assets/css/content.less";
</style>