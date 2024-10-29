import { createApp } from 'vue';

import '@/assets/styles/index.scss';

import router from './router';
import App from './app';

createApp(App).use(router).mount('#wm-app');
