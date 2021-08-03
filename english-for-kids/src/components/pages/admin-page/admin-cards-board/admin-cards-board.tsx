import React, { useEffect, useState } from 'react';
import { getCardsFromApi } from '../../../../shared/api';
import { Cards } from '../../../../shared/interfaces';
import { AdminCard } from './admin-card/admin-card';

export const AdminCardsBoard: React.FC = () => {
  const [cards, setCards] = useState([]);

  useEffect((): void => {
    async function getCards(): Promise<void> {
      const data = await getCardsFromApi();

      setCards(data.map((item: Cards) => item) as never);
    }
    if (cards.length === 0) getCards();
  });

  return (
    <div className="admin-cards-board">
      {cards.map((card: Cards) => (
        <AdminCard card={card} words={card.cards.length} key={card.key} />
      ))}
    </div>
  );
};
