import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Login } from '../../../context';
import { MenuListItem } from '../../../shared/interfaces';
import { menuListItems } from '../../../shared/menu-list-items';

type MenuListProps = {
  menuState(): void;
};

export const MenuList: React.FC<MenuListProps> = (props: MenuListProps) => {
  const menuItems: MenuListItem[] = menuListItems;

  const location = useLocation();
  const path = location.pathname;

  const login = useContext(Login);

  return (
    <ul className="menu-list">
      {menuItems.map((item) => (
        <li className="nav-item" key={item.id}>
          <Link
            to={item.href}
            className={`nav-link active ${item.href === path ? ' open' : ''}`}
            onClick={props.menuState}
          >
            {item.name}
          </Link>
        </li>
      ))}

      {login ? (
        <li className="nav-item">
          <Link
            to="/admin"
            className={`nav-link active ${path === '/admin' ? ' open' : ''}`}
            onClick={props.menuState}
          >
            Admin Page
          </Link>
        </li>
      ) : (
        ''
      )}
    </ul>
  );
};
