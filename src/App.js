import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <Switch>
      <Route exact path="/" render={ () => <Login /> } />
      <Route path="/carteira" render={ () => <Wallet /> } />
    </Switch>
  );
}

export default App;
