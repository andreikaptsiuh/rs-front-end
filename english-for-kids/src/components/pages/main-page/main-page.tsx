import React from 'react';
import { MainCardsBoard } from './main-cards-board/main-cards-board';
import './main-page.css';

export const MainPage: React.FC = () => {
  return (
    <div className="main-page">
      <h1>Main page</h1>
      <p>login: user password: 1111</p>
      <MainCardsBoard />
    </div>
  );
};
