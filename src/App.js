import React from 'react';
import './App.css';
import Login from './pages/Login';
import logo from './trivia.png';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
      </header>
      <Login />
    </div>
  );
}
