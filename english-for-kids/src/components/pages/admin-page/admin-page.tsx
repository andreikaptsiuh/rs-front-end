import React, { useContext } from 'react';
import './admin-page.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AdminUpdateCards, Login } from '../../../context';
import { AdminCardsBoard } from './admin-cards-board/admin-cards-board';
import { AdminWordsPanel } from './admin-words-panel/admin-words-panel';

export const AdminPage: React.FC = () => {
  const login = useContext(Login);

  const cont = {
    typeCards: '',
    set: function setType(type: string): void {
      cont.typeCards = type;
    },
  };

  return (
    <>
      <BrowserRouter>
        {login ? (
          <div className="admin-page">
            <h2>Admin Page</h2>
            <AdminUpdateCards.Provider value={cont}>
              <Switch>
                <Route component={AdminCardsBoard} path="/admin" />
                <Route component={AdminWordsPanel} path="/admin-cards-update" />
              </Switch>
            </AdminUpdateCards.Provider>
          </div>
        ) : (
          <div className="admin-page">
            <h2>Page is not found</h2>
          </div>
        )}
      </BrowserRouter>
    </>
  );
};
