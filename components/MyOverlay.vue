<template>
  <bm-overlay
    ref="customOverlay"
    :class="{sample: sample, active:sample_active, project:project,}"
    pane="labelPane"
    @draw="draw">
    <div v-html="text"   class="dian">
    </div>
  </bm-overlay>
</template>

<script>
export default {
  props: ['text', 'position', 'active','project','sample','sample_active'],
  data(){
      return{
         
      }
  },
  watch: {
    position: {
      handler () {
        this.$refs.customOverlay.reload()
      },
      deep: true
    }
  },
  methods: {
   
    draw ({el, BMap, map}) {
      const {lng, lat} = this.position;
      const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat));
      el.style.left = pixel.x - 60 + 'px'
      el.style.top = pixel.y - 20 + 'px'
    }
  }
}
</script>

<style lang="less" scoped>

.sample {
  width:90px;
  height:90px;
  background:linear-gradient(270deg, #1FC365, #3FD6A6);
  border-radius:50%;
  box-shadow: 0px 5px 10px 0px rgba(44, 203, 128, 0.2);
  color: #fff;
  text-align: center;
  padding: 10px;
  position: absolute;
}
.project{
    width:137px;
    height:55px;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 5px 0px rgba(0, 0, 0, 0.3);
    border-radius:2px;
    position: absolute;
  /deep/  .dian{
          width:137px;
          height:55px;
          position: absolute;
        h4{
          width:127px;
          height:24px;
          background: linear-gradient(270deg, #1FC365, #3FD6A6);
          border-radius:2px 2px 0px 0px;
          font-size:14px;
          font-family:"Microsoft YaHei";
          font-weight:400;
          color:rgba(255,255,255,1);
          line-height: 24px;
          padding-left: 10px;
          overflow: hidden;
        }
        .jia_box{
             height: 31px;
            .p1{
              font-size:12px;
              font-family:"Microsoft YaHei";
              font-weight:400;
              color:rgba(137,141,161,1);
              line-height:31px;
              float: left;
              margin-left: 10px;
            }
           .p2{
              font-size:12px;
              font-family:"Microsoft YaHei";
              font-weight:400;
              color:rgba(137,141,161,1);
              line-height:31px;
              float: left;
           }
        }
        .p3{
              width: 0;
              height: 0;
              border-right:8px solid transparent;
              border-left:8px solid transparent;
              border-top:8px solid #fff;
              position: absolute;
              left: 50%;
              margin-left: -8px;
        }
        
       
    }
}
 
/deep/  .dian   h4{
        font-size:16px;
        font-family:"Microsoft YaHei";
        font-weight:bold;
        color:rgba(255,255,255,1);
        line-height: 36px;
      }
 /deep/  .dian     p{
        font-size:14px;
        font-family:"Microsoft YaHei";
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height: 22px;
      }
.active {
    width:90px;
    height:90px;
    background: linear-gradient(270deg, #FF8D41, #FFAD2D);
    box-shadow: 0px 5px 10px 0px rgba(255, 154, 57, 0.2);
    color: #fff;
    border-radius:50%;
    box-shadow: 0 0 1px #747679;
    color: #fff;
    text-align: center;
    padding: 10px;
    position: absolute;
}
</style>