import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminUpdateCards } from '../../../../context';
import { getCardsFromApi } from '../../../../shared/api';
import { Card, Cards } from '../../../../shared/interfaces';
import { AdminWord } from './admin-word/admin-word';

export const AdminWordsPanel: React.FC = () => {
  const [cards, setCards] = useState([]);
  const adminCards = useContext(AdminUpdateCards);

  useEffect((): void => {
    async function updateCards(): Promise<void> {
      const data = await getCardsFromApi();

      const cardsType: Cards | undefined = data.find(
        (item: Cards) => item.type === adminCards.typeCards
      );

      if (cardsType) {
        setCards(cardsType.cards.map((item: Card) => item) as never);
      }
    }

    if (cards.length === 0) updateCards();
  }, [adminCards]);

  return (
    <>
      <Link to="/admin" className="btn btn-warning">
        Go to admin page
      </Link>
      <div className="admin-cards-board">
        {cards.map((item: Card) => (
          <AdminWord card={item} key={item.id} />
        ))}
      </div>
    </>
  );
};
