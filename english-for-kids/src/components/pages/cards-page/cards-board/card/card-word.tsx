import React, { MouseEvent, MouseEventHandler, useContext, useState } from 'react';
import { Context } from '../../../../../context';
import { Card } from '../../../../../shared/interfaces';

type CardProps = {
  card: Card;
};

export const CardWord: React.FC<CardProps> = (props: CardProps) => {
  const src = `./cards/${props.card.img}`;

  const audio = new Audio();
  audio.src = `./cards/${props.card.audio}`;

  const play = useContext(Context);

  const playWord: MouseEventHandler = (event: MouseEvent): void => {
    if (!play) {
      event.preventDefault();
      audio.play();
    }
  };

  const [content, setContent] = useState(true);
  const showTranslate: MouseEventHandler = (event: MouseEvent): void => {
    event.preventDefault();

    const card = (event.target as HTMLElement).closest('.card-container');
    card?.classList.add('flipped');
    setContent(false);

    card?.addEventListener('mouseleave', () => {
      card?.classList.remove('flipped');
      setContent(true);
    });
  };

  return (
    <div className={`card-container ${play ? 'play' : ''}`} id={audio.src}>
      <button type="button" className="page-card" onClick={playWord}>
        <img src={src} alt={props.card.word} className="page-card-img" />
        <h4 className="page-card-title">{content ? props.card.word : props.card.translation}</h4>
      </button>

      <button type="button" className="page-card-back" onClick={playWord}>
        <img src={src} alt={props.card.word} className="page-card-img" />
        <h4 className="page-card-title">{props.card.translation}</h4>
      </button>

      <button type="button" className="page-card-rev-btn" onClick={showTranslate}>
        <div className="page-card-rev" />
      </button>
    </div>
  );
};
