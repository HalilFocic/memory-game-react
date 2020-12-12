import React from 'react';
import './Navbar.css';
const Navbar =({onNewGame})=>(
    <header>
      <h2>Memory Game</h2>
      <nav>
        <li><a className="new-game" onClick={onNewGame}>New game</a></li>
      </nav>
    </header>
  );
export default Navbar;