import './styles.scss';
import { App } from './app';

window.onload = () => {
  const body = document.getElementById('body');

  const appElement = document.getElementById('app');

  if (!appElement || !body) throw Error('App root element not found');

  new App(appElement, body).render();
};
