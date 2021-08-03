import React from 'react';
import { Link } from 'react-router-dom';
import { EnglishCardTypes } from '../../../../../shared/interfaces';

export const MainCard: React.FC<EnglishCardTypes> = (props: EnglishCardTypes) => {
  const src = `./cards/${props.cover}`;
  return (
    <Link to={props.href} className="main-page-card">
      <img src={src} alt={props.type} className="main-card-img" />
      <h4 className="main-card-title">{props.type}</h4>
    </Link>
  );
};
