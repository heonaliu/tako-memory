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
  const [flippedCards, setFlippedCards] = useState([]); // will only have 0-2 in length
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const initializeGame = () => {
    //SHUFFLE CARDS

    const finalCards = cardValues.map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }));
    //reset the game!
    setCards(finalCards);
    setMoves(0);
    setIsLocked(false);
    setScore(0);
    setMatchedCards([]);
    setFlippedCards([]);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (card) => {
    //don't allow clicking if it's already flipped or already matched
    if (card.isFlipped || card.isMatched || isLocked) {
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
    const newFlippedCards = [...flippedCards, card.id]; // list of 2 IDS
    setFlippedCards(newFlippedCards);

    //check if 2 cards are flipped
    if (flippedCards.length === 1) {
      setIsLocked(true);
      const firstCard = cards[flippedCards[0]];
      if (firstCard.value === card.value) {
        setTimeout(() => {
          setMatchedCards((prev) => [...prev, firstCard.id, card.id]);

          setCards((prev) =>
            prev.map((c) => {
              if (c.id === card.id || c.id === firstCard.id) {
                return { ...c, isMatched: true };
              } else {
                return c;
              }
            })
          );
          setScore((prev) => prev + 1);
          setFlippedCards([]);
          setIsLocked(false);
        }, 500);
      } else {
        setTimeout(() => {
          // flip back card 1 and flip back card 2
          const flippedBackCards = newCards.map((c) => {
            if (newFlippedCards.includes(c.id) || c.id === card.id) {
              //second part just checks if card we flipped over, is clicked again
              return { ...c, isFlipped: false };
            } else {
              return c;
            }
          });
          setCards(flippedBackCards);
          // reset the state for the flipped cards
          setFlippedCards([]);
          setIsLocked(false);
        }, 1000);
      }

      setMoves((prev) => prev + 1);
    }
  };

  return (
    <div className="app">
      <GameHeader score={score} moves={moves} onReset={initializeGame} />
      <div className="cards-grid">
        {cards.map((card) => (
          <Card card={card} onClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
}

export default App;
