function Card({ card, onClick }) {
  return (
    <div
      className={`card ${card.isFlipped ? "open" : ""} ${card.isMatched ? "matched" : ""}`}
      onClick={onClick}
    >
      {card.isFlipped || card.isMatched ? card.emoji : ""}
    </div>
  );
}

export default Card;
