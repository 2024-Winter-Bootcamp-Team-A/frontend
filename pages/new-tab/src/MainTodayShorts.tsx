import BookCard from './components/BookCard';
import React, { useState } from 'react';
import './MainTodayShorts.css';
import ShortsModal from './components/ShortsModal';

const sentences = {
  left: ['눈처럼 가볍다고 ', '보배 화이팅.', '그러나 눈에도 무게가 있다.', '이 물방울처럼'],
  right: ['눈처럼 가볍다고', '사람들은 말한다.', '그러나 눈에도 무게가 있다.', '이 물방울처럼'],
};

export default function MainTodayShorts() {
  const [selected, setSelected] = useState<'left' | 'right' | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리

  const handleCardClick = (direction: 'left' | 'right') => {
    if (selected === direction) {
      setFlipped(false);
      setTimeout(() => setSelected(null), 600);
    } else {
      setSelected(direction);
      setFlipped(true);
    }
  };
  const handlePrimaryAction = () => {
    console.log('Primary button clicked');
  };

  const handleSecondaryAction = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col">
      <div className="pt-40 bg-white h-300px flex justify-center text-2xl font-dm-serif md:text-lg lg:text-2xl sm:text-base">
        Today's Shorts!
      </div>
      <section className="container">
        <div className="flex justify-center pb-20 mb-60 h-full lg:scale-100 md:scale-75 sm:scale-50">
          {/* Left Card */}
          <div
            className={`animate-card -translate-x-72 ${
              selected === 'left' ? 'card-center card-selected' : selected ? 'hidden card-left' : ''
            }`}>
            <BookCard
              sentences={sentences}
              direction="left"
              backImage="images/소년이온다표지.png"
              onClick={() => handleCardClick('left')}
              isFlipped={selected === 'left' ? flipped : false}
            />
          </div>

          <span
            className={`text-6xl vs-text font-dm-serif ml-56 pt-56 translate-x-5 xl:pt-56 ${selected ? 'hidden' : 'block sm:block'}`}>
            VS
          </span>

          {/* Right Card */}
          <div
            className={`animate-card translate-x-100 ${
              selected === 'right' ? 'card-center card-selected' : selected ? 'hidden card-right' : ''
            }`}>
            <BookCard
              sentences={sentences}
              direction="right"
              backImage="images/채식주의자표지.png"
              onClick={() => handleCardClick('right')}
              isFlipped={selected === 'right' ? flipped : false}
            />
          </div>
        </div>
      </section>
      <div className={`flex justify-center md:scale-75 sm:scale-50`}>
        {!selected ? (
          <button className="mb-20">
            <img src="리롤버튼.svg" alt="리롤버튼" />
          </button>
        ) : (
          <div className="flex gap-4 mb-20 mt-80">
            <button className="bg-[#ff5213] text-white py-2 px-4 rounded" onClick={handlePrimaryAction}>
              카드 저장하기
            </button>
            <button className="bg-[#ff5213] text-white py-2 px-4 rounded" onClick={handleSecondaryAction}>
              숏츠 보러가기
            </button>
          </div>
        )}
      </div>
      {isModalOpen && <ShortsModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
