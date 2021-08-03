import React, { MouseEvent } from 'react';

type MenuBurgerProps = {
  menuState(): void;
  content: string;
};

export const MenuBurger: React.FC<MenuBurgerProps> = (props: MenuBurgerProps) => {
  const menuStateHandler = (event: MouseEvent): void => {
    props.menuState();
    event.preventDefault();
  };

  return (
    <button onClick={menuStateHandler} type="button" className="menu-burger">
      {props.content}
    </button>
  );
};
