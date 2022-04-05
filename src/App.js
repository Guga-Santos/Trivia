import React from 'react';
import { Route, Switch } from 'react-router-dom';
import FeedBack from './pages/FeedBack';
import Login from './pages/Login';
import Ranking from './pages/Ranking';
import Game from './pages/Trivia';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/trivia" component={ Game } />
      <Route path="/ranking" component={ Ranking } />
      <Route path="/feedback" component={ FeedBack } />
    </Switch>
  );
}
