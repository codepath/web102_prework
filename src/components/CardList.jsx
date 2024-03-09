import React, { useState } from 'react';
import Card from './Card';

const cardPairs = [
  { question: 'Question 1', answer: 'Answer 1' },
  { question: 'Question 2', answer: 'Answer 2' },
  // Add more card pairs as needed
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
      <Card pair={cardPairs[currentIndex]} />
      <button onClick={nextCard}>Next</button>
    </div>
  );
}

export default CardList;
