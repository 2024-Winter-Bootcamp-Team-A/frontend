import React, { useState } from 'react';

const slides = [
  { id: 0, label: 'Most wished', content: 'Book 1' },
  { id: 1, label: 'Most Commented', content: 'Book 2' },
  { id: 2, label: 'Most views', content: 'Book 3' },
];

const Stats: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(1); // 기본 중앙 카드 설정
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리

  const handlePrev = () => {
    setActiveSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handleCardClick = (index: number) => {
    if (index === activeSlide) {
      setIsModalOpen(true); // 모달 열기
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleCloseModal(); // 모달 배경 클릭 시 닫기
    }
  };

  return (
    <div className="h-screen w-screen bg-white flex justify-center items-center">
      <div className="relative w-full max-w-5xl flex justify-center items-center">
        {/* 왼쪽 화살표 */}
        <button
          onClick={handlePrev}
          className="absolute left-0 bg-gray-300 w-10 h-10 rounded-full flex justify-center items-center hover:bg-gray-400 z-10"
          style={{
            top: '50%',
            transform: 'translateY(-50%)',
          }}>
          <span className="text-black text-lg">{`<`}</span>
        </button>

        {/* 카드 그룹 */}
        <div className="w-full flex justify-center items-center relative">
          {slides.map((slide, index) => {
            const isActive = index === activeSlide;
            const translateX = (index - activeSlide) * 350;

            return (
              <button
                key={slide.id}
                className={`absolute transition-transform duration-700 ease-[cubic-bezier(0.4, 0, 0.2, 1)] ${
                  isActive ? 'z-10' : 'z-0'
                }`}
                style={{
                  transform: `translateX(${translateX}px) translateY(-50%)`,
                  top: '50%',
                }}
                onClick={() => handleCardClick(index)}>
                <h3 className={`text-center text-black mb-2 ${isActive ? 'text-[30px]' : 'text-[24px]'}`}>
                  {slide.label} {/* 카드 위에 글자 */}
                </h3>
                <div
                  className={`${
                    isActive ? 'w-[320px] h-[500px]' : 'w-[208px] h-[340px]'
                  } bg-white border border-gray-200 shadow-lg rounded-2xl flex justify-center items-center cursor-pointer`}>
                  <p className={`${isActive ? 'text-[30px]' : 'text-[24px]'} text-gray-600`}>{slide.content}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* 오른쪽 화살표 */}
        <button
          onClick={handleNext}
          className="absolute right-0 bg-gray-300 w-10 h-10 rounded-full flex justify-center items-center hover:bg-gray-400 z-10"
          style={{
            top: '50%',
            transform: 'translateY(-50%)',
          }}>
          <span className="text-black text-lg">{`>`}</span>
        </button>
      </div>

      {/* 모달 창 */}
      {isModalOpen && (
        <button
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleModalClick} // 배경 클릭 시 닫기
        >
          <div className="bg-white w-[1240px] h-[640px] rounded-lg shadow-lg p-6 relative">
            <button className="absolute top-4 right-4 text-black text-2xl font-bold" onClick={handleCloseModal}>
              ✖
            </button>
          </div>
        </button>
      )}
    </div>
  );
};

export default Stats;
