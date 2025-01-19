import React, { useState } from 'react';

const slides = [
  { id: 0, label: 'Most wished', content: 'Book 1' },
  { id: 1, label: 'Most Commented', content: 'Book 2' },
  { id: 2, label: 'Most views', content: 'Book 3' },
];

const Stats: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(1); // 기본 중앙 카드 설정

  const handlePrev = () => {
    setActiveSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="h-[100vh] w-screen bg-white flex justify-center items-center">
      <div className="relative w-full max-w-5xl flex justify-center items-center">
        {/* 왼쪽 화살표 */}
        <button
          onClick={handlePrev}
          className="absolute left-[16rem] top-1/2 transform -translate-y-1/2 bg-gray-300 w-10 h-10 rounded-full flex justify-center items-center hover:bg-gray-400 z-10"
          aria-label="Previous Slide">
          <img src="왼쪽화살표.svg" alt="Previous Slide" className="w-4 h-4" />
        </button>

        {/* 카드 그룹 */}
        <div className="w-full flex justify-center items-center relative mt-[2rem]">
          {slides.map((slide, index) => {
            const isActive = index === activeSlide;
            const isPrev = index === (activeSlide === 0 ? slides.length - 1 : activeSlide - 1);
            const isNext = index === (activeSlide === slides.length - 1 ? 0 : activeSlide + 1);

            const translateX = isActive ? 0 : isPrev ? -400 : 400;
            const scale = isActive ? 1 : 0.8;

            return (
              <div
                key={slide.id}
                className="absolute transition-transform duration-700 ease-in-out"
                style={{
                  transform: `translateX(${translateX}px) scale(${scale})`,
                }}>
                <h3 className={`text-center text-black mb-2 ${isActive ? 'text-[30px]' : 'text-[24px]'}`}>
                  {slide.label}
                </h3>
                <div
                  className={`${
                    isActive ? 'w-[320px] h-[500px]' : 'w-[208px] h-[340px]'
                  } bg-white border border-gray-200 shadow-lg rounded-2xl flex justify-center items-center cursor-pointer transition-all duration-700`}>
                  <p className={`${isActive ? 'text-[30px]' : 'text-[24px]'} text-gray-600`}>{slide.content}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 오른쪽 화살표 */}
        <button
          onClick={handleNext}
          className="absolute right-[16rem] top-1/2 transform -translate-y-1/2 bg-gray-300 w-10 h-10 rounded-full flex justify-center items-center hover:bg-gray-400 z-10"
          aria-label="Next Slide">
          <img src="오른쪽화살표.svg" alt="Next Slide" className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Stats;
