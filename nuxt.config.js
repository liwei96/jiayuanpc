import metaTitle from "./middleware/metaTitle";

export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    script:[
      { src : 'http://ll.edefang.net/getIp.php'},
      // { src : 'https://cache.amap.com/lbs/static/addToolbar.js'},
      { src : '/PlaceSearchRender.js'},
      {
        src: 'https://cdn.bootcdn.net/ajax/libs/babel-polyfill/6.23.0/polyfill.min.js'
      },
      { src : 'https://cdn.bootcdn.net/ajax/libs/prefixfree/1.0.7/prefixfree.min.js'}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://at.alicdn.com/t/font_1416845_l80icjbk93.css' },
      { rel: 'stylesheet',  href: 'https://at.alicdn.com/t/font_910507_hzufm6hpwxd.css' },
      { rel: 'stylesheet',  href: 'https://at.alicdn.com/t/font_1329849_7za7eo8yzvj.css' },
      { rel: 'stylesheet',  href: 'https://at.alicdn.com/t/font_1416845_r9dt4y7kjwo.css' },
      { rel: 'stylesheet',  href: 'https://at.alicdn.com/t/font_1416845_5g55q69hham.css' },
      { rel: 'stylesheet',type:"text/css", href: '//at.alicdn.com/t/font_1672562_dmvazj8pt34.css' },
      { rel: 'stylesheet',type:"text/css", href: '//at.alicdn.com/t/font_1672562_t4hdcyiqkmn.css' },
      { rel: 'stylesheet',type:"text/css", href: '//at.alicdn.com/t/font_1851272_89y7hxphad.css'},
      { rel: 'stylesheet',type:"text/css", href: '//at.alicdn.com/t/font_1672562_kt5wir3oogi.css'},
      { rel: 'stylesheet',type:"text/css", href: '//at.alicdn.com/t/font_1951207_hmgbm0jcbf6.css'},
      { rel: 'stylesheet',type:"text/css", href: '//at.alicdn.com/t/font_2003430_x0nkdwrd1z.css'},
      { rel: 'stylesheet',type:"text/css", href: '//at.alicdn.com/t/font_2130235_0yfzll6j0ox.css'}
      
    ]
  },
  loading: { color: '#40a2f4' },
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '~assets/css/base.less',
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '@/plugins/element-ui',
    { src: "~/plugins/vue-lazyload.js" ,ssr: false},
    { src: "~/plugins/vue-monoplasty-slide-verify.js" ,ssr: false},
    { src: "~/plugins/vue-cookies.js" ,ssr: false},
    { src: "~/plugins/vue-baidu-map.js" ,ssr: false},
    { src:"~/plugins/route.js",ssr:false},
    { src:"~/plugins/axios.js",ssr:true}
    // { src: "@/plugins/vue-awesome-swiper", ssr: false }
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  router:{
      middleware:['metaTitle']
  },
  axios: {
        proxy: true, // 表示开启代理
        credentials: true // 表示跨域请求时是否需要使用凭证
     },
    proxy:{
      '/jy':{
        target: 'http://39.98.227.114:9550',  // 测试环境http://39.98.227.114:9560 生产环境http://39.98.227.114:9550
        changeOrigin: true,
        pathRewrite: { '^/jy': '/jy' }
      },
      '/search/':{
        target: 'http://39.98.227.114:9550',
        changeOrigin: true,
        pathRewrite: { '^/search': '/search' }
      },
      '/api':{
        target: 'http://ll.edefang.net',
        changeOrigin: true,
        pathRewrite: { '^/api': '/api' }
      },
      "/send": {
        target: "http://39.98.227.114:9550/", // 重新映射的新地址 
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          "^/send": "/send" // 去掉接口地址中的api字符串
        }
      },
      "/sure": {
        target: "http://39.98.227.114:9550/", // 重新映射的新地址 
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          "^/sure": "/sure" // 去掉接口地址中的api字符串
        }
      },
      '/front': {
        target: 'http://ll.edefang.net/', // target host
        ws: true, // proxy websockets 
        changeOrigin: true, // needed for virtual hosted sites
        pathRewrite: {
          '^/front': '/front' // rewrite path
        }
      },
      "/comment": {
        target: "http://39.98.227.114:9550/", // 重新映射的新地址 
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          "^/comment": "/comment" // 去掉接口地址中的api字符串
        }
      },
    },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    transpile: [/^element-ui/],
  }
}
