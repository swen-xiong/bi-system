import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import splitPane from 'vue-splitpane'
import vueDraggable from 'vuedraggable'
// import contextmenu from 'v-contextmenu'
// import 'v-contextmenu/dist/index.css'
import router from './router';
import store from './store';

Vue.use(ElementUI);
Vue.component('split-pane', splitPane);
Vue.component('draggable', vueDraggable);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
