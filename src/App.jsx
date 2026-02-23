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

  const handleCardClick = (card) => {
    //don't allow clicking if it's already flipped or already matched
    if (card.isFlipped || card.isMatched) {
      return; //early return prevents continue of logic afterward
    }

    //update the current state of cards for flipped
    const newCards = cards.map((c) => {
      if (c.id === card.id) {
        return { ...c, isFlipped: true };
      } else {
        return c;
      }
    });

    setCards(newCards);
  };

  return (
    <div className="app">
      <GameHeader score={3} moves={10} />
      <div className="cards-grid">
        {cards.map((card) => (
          <Card card={card} onClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
}

export default App;
