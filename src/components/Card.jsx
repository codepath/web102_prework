import React, { useState } from 'react';

function Card({ pair }) {
  const [showAnswer, setShowAnswer] = useState(false);

  const flipCard = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <div className="card" onClick={flipCard}>
      <div className="card-content">
        {showAnswer ? pair.answer : pair.question}
      </div>
    </div>
  );
}

export default Card;
