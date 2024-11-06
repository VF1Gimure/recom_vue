import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import MetricsPage from "@/views/MetricsPage.vue";
import RecommendPage from "@/views/RecommendPage.vue";


const routes = [
    { path: '/', name: 'HomePage', component: HomePage },
    { path: '/metrics', name: 'Metrics', component: MetricsPage },
    { path: '/recommend', name: 'Recommend', component: RecommendPage }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;

