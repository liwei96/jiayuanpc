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
        console.log(config.query);
        config.params.host = store.state.hostname
      }
        return config
    })
    $axios.onError(error => {      
    	console.log(error)
    })
  }