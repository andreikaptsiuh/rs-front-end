import React, { useEffect, useState } from 'react';
import { getCardsFromApi } from '../../../../shared/api';
import { Cards } from '../../../../shared/interfaces';
import { MainCard } from './main-card/main-card';

export const MainCardsBoard: React.FC = () => {
  const [cards, setCards] = useState([]);

  useEffect((): void => {
    async function getCards(): Promise<void> {
      const data = await getCardsFromApi();

      setCards(data.map((item: Cards) => item) as never);
    }

    if (cards.length === 0) getCards();
  });

  return (
    <div className="main-cards-board">
      {(cards as Cards[]).map((card) => (
        <MainCard type={card.type} cover={card.cover} href={card.href} key={card.key} />
      ))}
    </div>
  );
};
