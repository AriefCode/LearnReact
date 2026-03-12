import { useState } from "react";
import Card from "./Card";
import "./App.css";

const emojis = ["🍎", "🍌", "🍇", "🍉", "🍒", "🥝"];

function shuffleCards() {
  const doubled = [...emojis, ...emojis];

  return doubled
    .sort(() => Math.random() - 0.5)
    .map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false,
    }));
}

function App() {
  const [cards, setCards] = useState(shuffleCards());
  const [firstCard, setFirstCard] = useState(null);
  const [lockBoard, setLockBoard] = useState(false);

  function handleCardClick(card) {
    if (lockBoard || card.isFlipped || card.isMatched) return;

    const newCards = cards.map((c) =>
      c.id === card.id ? { ...c, isFlipped: true } : c,
    );

    setCards(newCards);

    if (!firstCard) {
      setFirstCard(card);
      return;
    }

    setLockBoard(true);

    if (firstCard.emoji === card.emoji) {
      setCards((prev) =>
        prev.map((c) =>
          c.emoji === card.emoji ? { ...c, isMatched: true } : c,
        ),
      );

      resetTurn();
    } else {
      setTimeout(() => {
        setCards((prev) =>
          prev.map((c) =>
            c.id === card.id || c.id === firstCard.id
              ? { ...c, isFlipped: false }
              : c,
          ),
        );

        resetTurn();
      }, 800);
    }
  }

  function resetTurn() {
    setFirstCard(null);
    setLockBoard(false);
  }

  return (
    <div className="container">
      <h1>Memory Match Game</h1>

      <div className="board">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onClick={() => handleCardClick(card)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
