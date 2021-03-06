// import 'core-js/stable';
// import 'regenerator-runtime/runtime';
import '@babel/polyfill';
import Vue from 'vue';
import App from 'components/App';

import heyuiConfig from 'js/config/heyui-config';
import routerConfig from 'js/config/router-config';
import store from 'js/vuex/store';
import 'js/vue/components';
import 'js/vue/filters';
import ImageUpload from './components/common/image';
import Warn from './components/common/warn';
import PButton from './components/common/button';
import PDelButton from './components/common/del-button';
import CopyText from './components/common/copytext';
import InputDuration from './components/common/duration';

import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
Vue.use(mavonEditor);

require('./css/app.less');

// 开发环境判断
// process.env.NODE_ENV == 'development'

// HeyUI已经设定为全局变量，无需引用
// 设定全局变量请参考根目录下的hey.conf.js文件

heyuiConfig();
Vue.use(HeyUI);

Vue.component('ImageUpload', ImageUpload);
Vue.component('Warn', Warn);
Vue.component('PButton', PButton);
Vue.component('PDelButton', PDelButton);
Vue.component('copytext', CopyText);
Vue.component('InputDuration', InputDuration);

const router = routerConfig();

export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
