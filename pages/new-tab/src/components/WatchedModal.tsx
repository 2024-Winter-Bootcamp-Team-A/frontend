import React, { useState } from 'react';

const WatchedModal: React.FC<{ cards: string[]; onClose: () => void }> = ({ cards, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 캐러셀의 인덱스

  // 이전 카드로 이동
  const handlePrev = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? cards.length - 1 : prevIndex - 1));
  };

  // 다음 카드로 이동
  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex === cards.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {/* 모달 컨테이너 */}
      <div className="relative bg-white w-[300px] h-[400px] rounded-lg shadow-lg flex flex-col items-center">
        {/* 닫기 버튼 */}
        <button className="absolute top-3 right-3 text-gray-500 hover:text-black" onClick={onClose}>
          &times;
        </button>

        {/* 현재 카드 표시 */}
        <div className="w-full h-full flex justify-center items-center">
          <div
            className="w-[260px] h-[360px] bg-cover bg-center rounded-lg shadow-md"
            style={{ backgroundImage: `url(${cards[currentIndex]})` }}></div>
        </div>

        {/* 캐러셀 네비게이션 */}
        <div className="absolute bottom-3 flex justify-between w-full px-5">
          <button className="text-lg text-gray-600 hover:text-black" onClick={handlePrev}>
            &#8249;
          </button>
          <button className="text-lg text-gray-600 hover:text-black" onClick={handleNext}>
            &#8250;
          </button>
        </div>
      </div>
    </div>
  );
};

export default WatchedModal;
