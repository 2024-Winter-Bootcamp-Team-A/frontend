import React from 'react';
import './BookCard.css';

interface BookCardProps {
  sentences: {
    left: string[];
    right: string[];
  };
  direction: 'left' | 'right';
  backImage: string;
  onClick: (direction: string) => void;
  isFlipped?: boolean;
}

export default function BookCard({ sentences, direction, backImage, onClick, isFlipped }: BookCardProps) {
  return (
    <button className="card-container " onClick={() => onClick(direction)}>
      <div className={`card ${isFlipped ? 'flipped' : ''}`}>
        {/* 앞면 */}
        <div className="card-front">
          <img
            src={direction === 'left' ? '왼쪽문장배경.png' : '오른쪽문장배경.png'}
            alt={direction === 'left' ? '왼쪽문장배경' : '오른쪽문장배경'}
            className="img"
          />
          <span className="text-2xl text-white card-text">
            {'"'}
            {sentences[direction].map((line, index) => (
              <span key={index} className="sentence-line">
                {line}
              </span>
            ))}
            {'"'}
          </span>
        </div>

        {/* 뒷면 */}
        <div className="card-back">
          <img src={backImage} alt="Card Back" className="w-full h-full" />
        </div>
      </div>
    </button>
  );
}
