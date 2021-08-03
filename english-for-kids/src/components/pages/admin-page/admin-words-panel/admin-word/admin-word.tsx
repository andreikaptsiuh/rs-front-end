import React from 'react';
import { Card } from '../../../../../shared/interfaces';

type AdminWordProps = {
  card: Card;
};

export const AdminWord: React.FC<AdminWordProps> = (props: AdminWordProps) => {
  const playAudio = () => {
    const audio = new Audio();
    audio.src = `./cards/${props.card.audio}`;
    audio.play();
  };
  return (
    <div className="admin-card-word">
      <p>Word: {props.card.word}</p>
      <p>Translate: {props.card.translation}</p>
      <img className="admin-card-word__img" src={`./cards/${props.card.img}`} alt="" />

      <button onClick={playAudio} className="admin-card-word__btn" type="button">
        Audio
      </button>
    </div>
  );
};
