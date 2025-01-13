import React from 'react';
import { useState } from 'react';
import { Carousel } from './ui/carousel';
import { Card, CardContent } from './ui/card';
export default function MainBookcase() {
  const totalItems = 11; // 아이템의 총 개수
  const visibleItems = 5; // 화면에 보여줄 아이템 개수
  const [currentIndex, setCurrentIndex] = useState(0);

  const products = [
    'Mac',
    'iPhone',
    'iPad',
    'Apple Watch',
    'Apple Vision Pro',
    'AirPods',
    'AirTag',
    'Apple TV',
    'Apple Music',
    'Apple TV+',
    'Apple Arcade',
    'Apple Card',
    'Apple News+',
  ];

  const handleNext = () => {
    if (currentIndex <= 3) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="w-full max-w-full relative">
      {/* Carousel Content */}
      <div className="relative flex">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(calc(-${currentIndex * (100 / visibleItems)}% - 1rem))`, // 1rem 만큼 왼쪽 패딩을 넘어가도록 조정
          }}>
          {Array.from({ length: totalItems }).map((_, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-1/5 p-2"
              style={{
                width: `${100 / visibleItems}%`,
              }}>
              <Card>
                <CardContent className="flex flex-col aspect-square items-center justify-center p-1 space-y-2">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
              <span className="block text-center text-lg font-medium mt-2">{products[index]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrevious}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow hover:bg-gray-300"
        disabled={currentIndex === 0}>
        ←
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow hover:bg-gray-300"
        disabled={currentIndex >= totalItems - visibleItems}>
        →
      </button>
    </div>
  );
}
