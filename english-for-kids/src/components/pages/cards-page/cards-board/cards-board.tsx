import React from 'react';
import { Card } from '../../../../shared/interfaces';
import { CardWord } from './card/card-word';

type CardBoardProps = {
  cards: Card[];
};

export const CardsBoard: React.FC<CardBoardProps> = (props: CardBoardProps) => {
  return (
    <div className="cards-board">
      {props.cards.map((card: Card) => (
        <CardWord card={card} key={card.id} />
      ))}
    </div>
  );
};
