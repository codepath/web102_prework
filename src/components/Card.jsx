import React, { useState } from 'react';

function Card({ pair, onFlip }) {
  const [showAnswer, setShowAnswer] = useState(false);

  const flipCard = () => {
    setShowAnswer(!showAnswer);
    onFlip();
  };

  return (
    <div className={`card ${showAnswer ? '.card.flipped' : ''}`} onClick={flipCard}>
      <div className="card-content">
        {showAnswer ? pair.answer : pair.question}
      </div>
    </div>
  );
}

export default Card;
