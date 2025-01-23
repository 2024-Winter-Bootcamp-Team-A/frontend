import BookCard from './components/BookCard';
import React, { useState, useEffect } from 'react';
import './MainTodayShorts.css';
import ShortsModal from './components/ShortsModal';

export default function MainTodayShorts() {
  const [selected, setSelected] = useState<'left' | 'right' | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
  const [shortsData, setShortsData] = useState<{ id: number; sentence: string; image: string }[]>([]); // 숏츠 데이터 상태
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);

  // API 호출 함수
  const fetchTodayShorts = async () => {
    setIsLoading(true); // 로딩 시작
    try {
      const response = await fetch('http://localhost:8000/api/v1/todayshort/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch today shorts');
      }

      const data = await response.json();
      console.log(data);
      setShortsData(data.shorts || []); // 숏츠 데이터를 상태에 저장
    } catch (error) {
      console.error('Error fetching today shorts:', error);
    } finally {
      setIsLoading(false); // 로딩 완료
    }
  };

  useEffect(() => {
    fetchTodayShorts(); // 컴포넌트가 마운트될 때 API 호출
  }, []);

  const handleCardClick = (direction: 'left' | 'right') => {
    const selectedBook = shortsData[direction === 'left' ? 0 : 1];

    if (selected === direction) {
      setFlipped(false);
      setTimeout(() => {
        setSelected(null);
        setSelectedBookId(null);
      }, 600);
    } else {
      setSelected(direction);
      setFlipped(true);
      setSelectedBookId(selectedBook.id); // 선택된 카드의 책 ID 저장
    }
  };

  const handlePrimaryAction = async (bookId: number) => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/todayshort/${bookId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to save today short');
      }

      const data = await response.json();
      alert(`저장이 완료되었습니다! ${bookId}`);
      console.log('저장된 데이터:', data);
    } catch (error) {
      console.error('Error saving today short:', error);
      alert('저장에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleSecondaryAction = () => {
    setIsModalOpen(true);
  };

  const handleReroll = () => {
    fetchTodayShorts(); // 리롤 버튼 클릭 시 새로운 숏츠 데이터 요청
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col">
      {/* 상단 타이틀 */}
      <div className="bg-white flex justify-center items-center text-center font-dm-serif h-[300px] sm:h-[250px] md:h-[300px] lg:h-[350px]">
        <h1 className="text-5xl md:text-4xl sm:text-3xl">Today's Shorts!s</h1>
      </div>
      {/* 가운데 VS 텍스트 */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <span className="text-5xl md:text-4xl sm:text-3xl vs-text font-dm-serif">VS</span>
      </div>

      <section className="container">
        {/* 카드 섹션 */}
        <div className="flex justify-center pb-20 mb-60 h-full lg:scale-100 md:scale-75 sm:scale-50">
          {/* Left Card */}
          {shortsData[0] && (
            <div
              className={`animate-card -translate-x-72 ${
                selected === 'left' ? 'card-center card-selected' : selected ? 'hidden card-left' : ''
              }`}>
              <BookCard
                sentences={{ left: [shortsData[0].sentence], right: [] }}
                direction="left"
                backImage={shortsData[0].image}
                onClick={() => handleCardClick('left')}
                isFlipped={selected === 'left' ? flipped : false}
              />
            </div>
          )}

          {/* Right Card */}
          {shortsData[1] && (
            <div
              className={`animate-card translate-x-100 ${
                selected === 'right' ? 'card-center card-selected' : selected ? 'hidden card-right' : ''
              }`}>
              <BookCard
                sentences={{ left: [], right: [shortsData[1].sentence] }}
                direction="right"
                backImage={shortsData[1].image}
                onClick={() => handleCardClick('right')}
                isFlipped={selected === 'right' ? flipped : false}
              />
            </div>
          )}
        </div>
      </section>
      <div className={`flex justify-center xl:scale-100 md:scale-75 sm:scale-50`}>
        {/* 리롤 버튼 또는 액션 버튼 */}
        {!selected ? (
          <button className="mb-20" onClick={handleReroll}>
            <img src="리롤버튼.svg" alt="리롤버튼" />
          </button>
        ) : (
          <div className="flex gap-4 mb-20 mt-80">
            <button
              className="bg-[#ff5213] text-white py-2 px-4 rounded"
              onClick={() => {
                if (selectedBookId) {
                  handlePrimaryAction(selectedBookId);
                } else {
                  alert('저장할 책이 선택되지 않았습니다.');
                }
              }}>
              카드 저장하기
            </button>
            <button className="bg-[#ff5213] text-white py-2 px-4 rounded" onClick={handleSecondaryAction}>
              숏츠 보러가기
            </button>
          </div>
        )}
      </div>
      {/* 모달 */}
      {/* {isModalOpen && selectedBookId !== null && <ShortsModal bookId={selectedBookId} onClose={() => setIsModalOpen(false)} />} */}
    </div>
  );
}
