import { GameHeader } from "./components/GameHeader";
import { Card } from "./components/Card";
import { useState, useEffect } from "react";

const cardValues = [
  "🌺",
  "🌻",
  "🌹",
  "🌱",
  "🪻",
  "🌸",
  "🍄",
  "💐",
  "🌺",
  "🌻",
  "🌹",
  "🌱",
  "🪻",
  "🌸",
  "🍄",
  "💐",
];

function App() {
  const [cards, setCards] = useState([]); // sets the order of the cards

  const initializeGame = () => {
    //SHUFFLE CARDS

    const finalCards = cardValues.map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }));
    setCards(finalCards);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  return (
    <div className="app">
      <GameHeader score={3} moves={10} />
      <div className="cards-grid">
        {cardValues.map((card) => (
          <Card card={card} />
        ))}
      </div>
    </div>
  );
}

export default App;
