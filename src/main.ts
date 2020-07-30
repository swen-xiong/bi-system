import Vue from 'vue';
import { DirectiveOptions } from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import splitPane from 'vue-splitpane'
import vueDraggable from 'vuedraggable'
import splitPaneCustom from './components/split-pane/index.vue'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'
// import contextmenu from 'v-contextmenu'
// import 'v-contextmenu/dist/index.css'
import router from './router'
import store from './store'
import * as directives from '@/directives'
import * as filters from '@/filters'

Vue.use(ElementUI);
Vue.use(VXETable);
Vue.component('split-pane', splitPane);
Vue.component('split-pane-custom', splitPaneCustom);
Vue.component('draggable', vueDraggable);

// Register global directives
Object.keys(directives).forEach((key) => {
  Vue.directive(key, (directives as { [key: string ]: DirectiveOptions })[key])
})

// Register global filters functions
Object.keys(filters).forEach((key) => {
  Vue.filter(key, (filters as { [key: string ]: Function })[key])
})

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
