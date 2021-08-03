import React, { useContext, useState } from 'react';
import '../../bootstrap.css';
import { Context } from '../../context';

type GameSwitchProps = {
  playHandler(): void;
};

export const GameSwitch: React.FC<GameSwitchProps> = (props: GameSwitchProps) => {
  const play = useContext(Context);
  const [checkbox, setCheckbox] = useState(play);

  const checkboxHandler = (): void => {
    setCheckbox(!checkbox);
    props.playHandler();
  };

  return (
    <div className="form-check form-switch">
      <input
        onClick={checkboxHandler}
        className="form-check-input"
        type="checkbox"
        value=""
        id="flexSwitchCheckDefault"
      />
      <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
        {checkbox ? 'Play' : 'Train'}
      </label>
    </div>
  );
};
