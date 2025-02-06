import './styles/main.scss';
import Handlebars from 'handlebars';
import Pages from './pages';
import Router from './modules/Router';

Handlebars.registerHelper('checkIfEqual', (value1, value2) => value1 === value2);
Handlebars.registerHelper('checkIfNotEqual', (value1, value2) => value1 !== value2);

const router = new Router();

router.setRoot('#app');

Object.values(Pages).forEach((route) => router.use(route.url, route.page));

document.addEventListener('DOMContentLoaded', () => {
  router.start();
});
