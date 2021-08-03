import React from 'react';
import { Link } from 'react-router-dom';
import { AdminUpdateCards } from '../../../../../context';
import { Cards } from '../../../../../shared/interfaces';

type AdminCardProps = {
  card: Cards;
  words: number;
};

export const AdminCard: React.FC<AdminCardProps> = (props: AdminCardProps) => {
  return (
    <AdminUpdateCards.Consumer>
      {({ set }) => (
        <div className="admin-card-type">
          <h4>{props.card.type}</h4>
          <h6>Words: {props.words}</h6>
          <div className="admin-card-buttons">
            <Link
              to="/admin-cards-update"
              className="badge bg-info"
              onClick={() => set(props.card.type)}
            >
              Update
            </Link>
            <Link to="/admin-cards-add" className="badge bg-success">
              Add word
            </Link>
          </div>
        </div>
      )}
    </AdminUpdateCards.Consumer>
  );
};
