import React from 'react';
import { Card } from '../../../../shared/interfaces';

type StatisticItemProps = {
  type: string;
  cards: Card[];
};

export const StatisticItem: React.FC<StatisticItemProps> = (props: StatisticItemProps) => {
  return (
    <>
      {props.cards.map((card: Card) => (
        <li className="statistic-list__item" key={card.id}>
          <p>{card.word}</p>
          <p>{card.translation}</p>
          <p>{props.type}</p>
          <p>0</p>
          <p>0</p>
          <p>0</p>
          <p>0</p>
        </li>
      ))}
    </>
  );
};
