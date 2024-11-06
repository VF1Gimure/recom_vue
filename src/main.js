import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import the router
import './global.css'; // Import global styles

createApp(App)
    .use(router) // Use the router
    .mount('#app');
