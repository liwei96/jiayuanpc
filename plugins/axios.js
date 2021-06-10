export default function ({
    store,
    redirect,
    app: {
      $axios
    }
  }) {
    // 数据访问前缀
    // $axios.defaults.baseURL = 'http://ll.edefang.net/'
  
    $axios.onRequest(config => {
      if (config.method == 'get') {
        if (config.params) {
          config.params.pinyin = store.state.pinyin
        } else {
          config.params = {
            pinyin: store.state.pinyin
          }
        }
        
        // config.params.pinyin = store.state.pinyin
      }
        return config
    })
    $axios.onError(error => {
      console.log(error)
    })
  }