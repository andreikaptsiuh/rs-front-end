import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './bootstrap.css';
import './App.css';
import { Footer } from './components/footer/footer';
import { Menu } from './components/menu/menu';
import { MainPage } from './components/pages/main-page/main-page';
import { CardsPage } from './components/pages/cards-page/cards-page';
import { GameSwitch } from './components/game-switch/game-switch';
import { Context, Login, ShowModal } from './context';
import { LoginModal } from './components/login-modal/login-modal';
import { AdminPage } from './components/pages/admin-page/admin-page';
import { StatisticPage } from './components/pages/statistic-page/statistic-page';

const App = (): React.ReactElement => {
  const [play, setPlay] = useState(false);
  const gamePlayHandler = (): void => {
    setPlay(!play);
  };

  const [finish, setFinish] = useState(false);
  const toFinish = (): void => {
    setFinish(true);
    setTimeout(() => setFinish(false), 7000);
  };

  const [modal, showModal] = useState(false);
  const logHandler = (): void => {
    showModal(!modal);
  };

  const [log, setLog] = useState(false);
  async function login(): Promise<void> {
    setLog(true);
    logHandler();
  }

  return (
    <BrowserRouter>
      <div className="App">
        <ShowModal.Provider value={modal}>
          <Login.Provider value={log}>
            <Menu logHandler={logHandler} />

            <div className={`finish ${finish ? '' : 'none'}`}>
              <h1>Finish game!</h1>
              <p>Errors: </p>
            </div>
            <LoginModal logHandler={logHandler} login={login} />

            <Context.Provider value={play}>
              <GameSwitch playHandler={gamePlayHandler} />

              <Switch>
                <Route component={MainPage} path="/" exact />
                <Route component={StatisticPage} path="/statistic" />
                <Route component={AdminPage} path="/admin" />
                <Route>
                  <CardsPage toFinish={toFinish} />
                </Route>
              </Switch>
            </Context.Provider>

            <Footer />
          </Login.Provider>
        </ShowModal.Provider>
      </div>
    </BrowserRouter>
  );
};

export default App;
