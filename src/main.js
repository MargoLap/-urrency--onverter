import { createRouter, createWebHistory } from 'vue-router';
import { createApp } from 'vue';
import App from './App.vue';

import CurrencyTable from './components/CurrencyTable.vue';
import CurrencyConverter from './components/CurrencyConverter.vue';
//
//import CurrencyConverter_Copy from './components/CurrencyConverter copy.vue';
//

// создание роутера для перехода по адресам
const router = createRouter({
  history: createWebHistory(), // способ как браузер будет хранить историю интерфейсов
  routes: [
    // описание массива url адресов на которые роутер будет реагировать
    {
      name: 'Table',
      path: '/',
      component: CurrencyTable,
    },
    {
      name: 'Converter',
      path: '/converter',
      component: CurrencyConverter,
    },
  ],
});

createApp(App).use(router).mount('#app'); // для подключения добавить use(router)!!
