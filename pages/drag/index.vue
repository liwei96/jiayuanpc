<template>
  <div>
    <div id="parent">
      <div
        v-drag
        id="child"
        @click="handleClick"
      >
          可滑动框框
      </div>
    </div>
  </div>
</template>

<script>
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
  methods: {
    handleClick () {
      // 点击事件触发时，判断当前状态是拖拽还是点击，若是拖拽，直接返回不继续执行
      const isDrag = document.getElementById('parent').getAttribute('drag-flag')
      if (isDrag === 'true') {
        return
      }
      alert('点击事件')
    }
  }
}
</script>

<style lang="less" scoped>
//   html{
//          height:100%;
//          margin:0;
//         }
        
// body{
//             height:100%;
//             margin:0; 
//     }
 html{
       height:100%;
       body{
            height:100%;
       }
        #parent {
            width: 100%;
            height: 900px;
            background-color: #ccc;
            z-index: 1;
            position: relative;
            #child {
                width: 50px;
                height: 50px;
                background-color: red;
                position: absolute;
                right: 0;
                cursor: pointer;
            }
       }
 }   

</style>
