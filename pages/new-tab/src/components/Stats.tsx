import React, { useState } from 'react';

const slides = [
  {
    id: 0,
    label: 'Most wished',
    content: 'Book 1',
    img: 'images/너의이름은표지.png',
    StatInfo: { views: 100, wished: 50, Shares: 20, BookVisit: 30 },
  },
  {
    id: 1,
    label: 'Most Commented',
    content: 'Book 2',
    img: 'images/소년이온다표지.png',
    StatInfo: { views: 110, wished: 60, Shares: 30, BookVisit: 40 },
  },
  {
    id: 2,
    label: 'Most views',
    content: 'Book 3',
    img: 'images/채식주의자표지.png',
    StatInfo: { views: 120, wished: 70, Shares: 40, BookVisit: 50 },
  },
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

  return (
    <div className="h-[100vh] w-screen bg-white flex justify-center items-center">
      <div className="relative w-full max-w-5xl flex justify-center items-center">
        {/* 왼쪽 화살표 */}
        <button
          onClick={handlePrev}
          className="absolute left-[-2rem] top-1/2 transform -translate-y-1/2 bg-gray-300 w-10 h-10 rounded-full flex justify-center items-center hover:bg-gray-400 z-10"
          aria-label="Previous Slide">
          <span className="text-black text-lg">{'<'}</span>
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
              <button
                key={slide.id}
                className="absolute transition-transform duration-700 ease-in-out"
                style={{
                  transform: `translateX(${translateX}px) scale(${scale})`,
                }}
                onClick={() => handleCardClick(index)}>
                <h3 className={`text-center text-black mb-2 ${isActive ? 'text-[30px]' : 'text-[24px]'}`}>
                  {slide.label}
                </h3>
                <div
                  className={`${
                    isActive ? 'w-[320px] h-[500px]' : 'w-[208px] h-[340px]'
                  } bg-white border border-gray-200 shadow-lg rounded-2xl flex justify-center items-center cursor-pointer transition-all duration-700`}>
                  <p className={`${isActive ? 'text-[30px]' : 'text-[24px]'} text-gray-600`}>{slide.content}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* 오른쪽 화살표 */}
        <button
          onClick={handleNext}
          className="absolute right-[-2rem] top-1/2 transform -translate-y-1/2 bg-gray-300 w-10 h-10 rounded-full flex justify-center items-center hover:bg-gray-400 z-10"
          aria-label="Next Slide">
          <span className="text-black text-lg">{'>'}</span>
        </button>
      </div>

      {/* 모달 창 */}
      {isModalOpen && (
        <div>
          <button
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={handleModalClick} // 배경 클릭 시 닫기
          >
            <section className="bg-[#FCE8E1] w-[1240px] h-[640px] rounded-4xl shadow-lg  relative flex">
              <img src={slides[0].img} alt="StatsImg" />
              <div className="flex flex-col justify-around w-32 h-4/5 rounded-4xl bg-white ml-2 my-3">
                <div>
                  <h3 className="text-xl font-dm-serif">VIews</h3>
                  <p className="text-lg text-[#FF6F3A]">{slides[0].StatInfo.views}</p>
                </div>
                <div>
                  <h3 className="text-xl font-dm-serif">Wished</h3>
                  <p className="text-lg text-[#FF6F3A]">{slides[0].StatInfo.wished}</p>
                </div>
                <div>
                  <h3 className="text-xl font-dm-serif">Shared</h3>
                  <p className="text-lg text-[#FF6F3A]">{slides[0].StatInfo.Shares}</p>
                </div>
                <div>
                  <h3 className="text-xl font-dm-serif">BookVisits</h3>
                  <p className="text-lg text-[#FF6F3A]">{slides[0].StatInfo.BookVisit}</p>
                </div>
              </div>
              <button className="absolute top-4 right-4 text-black text-2xl font-bold" onClick={handleCloseModal}>
                ✖
              </button>
            </section>
          </button>
        </div>
      )}
    </div>
  );
};

export default Stats;
