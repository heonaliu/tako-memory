import { GameHeader } from "./components/GameHeader";
import { Card } from "./components/Card";
import { useState, useEffect } from "react";
import { WinMessage } from "./components/WinMessage";
import { useGameLogic } from "./hooks/useGameLogic";
import tako1 from "./assets/tako1.png";
import tako2 from "./assets/tako2.png";
import tako3 from "./assets/tako3.png";
import tako4 from "./assets/tako4.png";
import tako5 from "./assets/tako5.png";
import tako6 from "./assets/tako6.png";
import tako7 from "./assets/tako7.png";
import tako8 from "./assets/tako8.png";

const cardValues = [
  tako1,
  tako2,
  tako3,
  tako4,
  tako5,
  tako6,
  tako7,
  tako8,
  tako1,
  tako2,
  tako3,
  tako4,
  tako5,
  tako6,
  tako7,
  tako8,
];

function App() {
  const {
    cards,
    score,
    moves,
    handleCardClick,
    initializeGame,
    isGameComplete,
  } = useGameLogic(cardValues);
  return (
    <div className="app">
      <GameHeader score={score} moves={moves} onReset={initializeGame} />
      {isGameComplete && <WinMessage moves={moves} />}
      <div className="cards-grid">
        {cards.map((card) => (
          <Card card={card} onClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
}

export default App;
