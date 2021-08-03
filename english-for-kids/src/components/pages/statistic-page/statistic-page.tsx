import React, { useEffect, useState } from 'react';
import { Cards } from '../../../shared/interfaces';
import { StatisticItem } from './statistic-item/statistic-item';
import './statistic-page.css';

export const StatisticPage: React.FC = () => {
  const [cards, setCards] = useState([]);
  useEffect((): void => {
    const getCards = async (): Promise<void> => {
      const response = await fetch('./english-cards.json');
      const data = await response.json();

      setCards(data);
    };

    getCards();
  }, []);

  return (
    <div className="statistic-page">
      <h2>Statistic</h2>
      <ul className="statistic-list">
        <li className="statistic-list__item">
          <p>Word</p>
          <p>Translation</p>
          <p>Category</p>
          <p>Clicks</p>
          <p>Correct</p>
          <p>Error</p>
          <p>Percent</p>
        </li>
        {cards.map((item: Cards) => (
          <StatisticItem type={item.type} cards={item.cards} key={item.key} />
        ))}
      </ul>
    </div>
  );
};
