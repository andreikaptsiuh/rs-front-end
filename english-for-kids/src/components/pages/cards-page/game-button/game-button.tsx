import React, { useContext } from 'react';
import { Context } from '../../../../context';

type GameButtonProps = {
  startGame(): void;
  repeatWord(): void;
  gameStatus: boolean;
};

export const GameButton: React.FC<GameButtonProps> = (props: GameButtonProps) => {
  const play = useContext(Context);

  return (
    <>
      {props.gameStatus && play ? (
        <button onClick={props.repeatWord} className="repeat-btn" type="button">
          <div className="repeat-img" />
        </button>
      ) : (
        <button
          onClick={props.startGame}
          type="button"
          className={`start-btn ${play ? '' : 'none'}`}
        >
          Start game
        </button>
      )}
    </>
  );
};
