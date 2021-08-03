import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LoginButton } from './login-btn/login-btn';
import { MenuBurger } from './menu-burger/menu-burger';
import { MenuList } from './menu-list/menu-list';
import './menu.css';

type MenuProps = {
  logHandler(): void;
};

export const Menu: React.FC<MenuProps> = (props: MenuProps) => {
  const pageContainerElement = document.querySelector('.page-container');
  const [sidebar, setSidebar] = useState(false);

  const menuStateHandler = (): void => {
    setSidebar(!sidebar);
    pageContainerElement?.removeEventListener('click', () => setSidebar(!sidebar));
    if (sidebar) pageContainerElement?.addEventListener('click', () => setSidebar(!sidebar));
  };

  return (
    <>
      <div className="menu" id="menu">
        <Link to="/menu">
          <MenuBurger menuState={menuStateHandler} content={sidebar ? 'X' : 'Menu'} />
        </Link>
      </div>

      <div className={`nav-menu ${sidebar ? 'open' : ''}`}>
        <nav>
          <MenuList menuState={menuStateHandler} />
        </nav>

        <LoginButton logHandler={props.logHandler} />
      </div>
    </>
  );
};
