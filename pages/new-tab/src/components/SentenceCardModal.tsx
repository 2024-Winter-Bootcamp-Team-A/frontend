import React, { useState, useEffect } from 'react';

const SentenceCardModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [cards, setCards] = useState<any[]>([]); // API에서 가져온 문장 카드 데이터
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 캐러셀의 인덱스
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태

  // 저장된 문장 카드 API 호출
  const fetchSentenceCards = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/todayshort/cards', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'X-CSRFTOKEN': 'lwqlaW2JJYwMLeN7XJR7SDbMLjrN68ElU2y4aeHR1u8NgxN4C9KJAQueMaICxRqO',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch sentence cards');
      }

      const data = await response.json();
      setCards(data.data); // API에서 받은 데이터 설정
      setIsLoading(false); // 로딩 완료
    } catch (error) {
      console.error('Error fetching sentence cards:', error);
      setIsLoading(false); // 로딩 중 오류 발생
    }
  };

  // 컴포넌트가 렌더링될 때 API 호출
  useEffect(() => {
    fetchSentenceCards();
  }, []);

  // 이전 카드로 이동
  const handlePrev = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + cards.length) % cards.length);
  };

  // 다음 카드로 이동
  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % cards.length);
  };

  // 로딩 중일 때 표시
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose} // 외부 클릭 시 모달 닫기
    >
      {/* 모달 컨테이너 */}
      <div
        className="relative w-[400px] h-[500px] rounded-lg shadow-lg flex flex-col items-center"
        onClick={e => e.stopPropagation()} // 내부 클릭 시 이벤트 버블링 방지
      >
        {/* 닫기 버튼 */}
        <button
          className="absolute top-3 right-3 text-2xl font-bold text-white hover:text-black z-50"
          onClick={onClose}>
          &times;
        </button>

        {/* 캐러셀 콘텐츠 */}
        <div className="w-full h-full flex overflow-hidden relative items-center justify-center">
          <div
            className="flex transition-transform duration-500"
            style={{
              transform: `translateX(calc(50% - ${currentIndex * 296 + 130}px))`,
            }}>
            {cards.map((card, index) => (
              <div
                key={index}
                className={`w-[260px] h-[360px] bg-cover bg-center rounded-lg shadow-md mx-4 ${
                  index === currentIndex ? 'scale-110' : 'scale-100 opacity-70'
                } transition-transform duration-300`}
                style={{
                  backgroundImage: `url(${card.image})`,
                }}></div>
            ))}
          </div>
        </div>

        {/* 캐러셀 네비게이션 */}
        <div className="absolute inset-y-0 flex justify-between w-full px-5">
          {/* 이전 버튼 */}
          <button
            onClick={handlePrev}
            className="absolute left-5 top-1/2 transform -translate-y-1/2 hover:opacity-80 z-20">
            <img
              src="왼쪽화살표.svg"
              alt="이전"
              className="w-6 h-6"
              style={{ filter: 'brightness(0) saturate(100%) invert(100%)' }}
            />
          </button>

          {/* 다음 버튼 */}
          <button
            onClick={handleNext}
            className="absolute right-5 top-1/2 transform -translate-y-1/2 hover:opacity-80 z-20">
            <img
              src="오른쪽화살표.svg"
              alt="다음"
              className="w-6 h-6"
              style={{ filter: 'brightness(0) saturate(100%) invert(100%)' }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SentenceCardModal;
