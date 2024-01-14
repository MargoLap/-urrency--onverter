import { createRouter, createWebHistory } from 'vue-router';
import CurrencyTable from '../views/CurrencyTable.vue';

// создание роутера для перехода по адресам
const routes = [
  // описание массива url адресов на которые роутер будет реагировать
  {
    path: '/',
    name: 'table',
    component: CurrencyTable,
  },
  {
    path: '/converter',
    name: 'converter',
    component: () => import('../views/CurrencyConverter.vue'), // динамический импорт
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), // способ как браузер будет хранить историю интерфейсов
  routes,
});

export default router;
