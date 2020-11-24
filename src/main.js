import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
// import VueNumerals from 'vue-numerals';


Vue.config.productionTip = false



// Vue.use(VueNumerals, {
  //   locale: 'fr'
  // });
  
  new Vue({
    render: h => h(App),
  }).$mount('#app')


  // Vue.use(VueNumerals); // default locale is 'en'
