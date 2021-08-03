import { user } from '../../shared/user';

export function logIn(element: HTMLElement | null):void {
  if (user.email !== '') element?.classList.add('header-log');
  else element?.classList.remove('header-log');
}
