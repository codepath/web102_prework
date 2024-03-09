import React, { useState } from 'react';
import Card from './Card';

const cardPairs = [
  { question: 'Question 1', answer: 'Answer 1' },
  { question: 'Question 2', answer: 'Answer 2' },
  { question: 'Question 3', answer: 'Answer 3' },
  { question: 'Question 4', answer: 'Answer 4' },
];

function CardList() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCard = () => {
    const newIndex = Math.floor(Math.random() * cardPairs.length);
    setCurrentIndex(newIndex);
  };

  return (
    <div className="card-list">
      <p>Total cards: {cardPairs.length}</p>
      <Card pair={cardPairs[currentIndex]} onFlip={nextCard} />
      <button onClick={nextCard}>Next</button>
    </div>
  );
}

export default CardList;
