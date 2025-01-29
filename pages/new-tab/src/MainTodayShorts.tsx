import React, { useState, useEffect } from 'react';
import BookCard from './components/BookCard';
import ShortsModal from './components/ShortsModal';
import './MainTodayShorts.css';

export default function MainTodayShorts() {
  const [selected, setSelected] = useState<'left' | 'right' | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shortsData, setShortsData] = useState<{ id: number; sentence: string; image: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);

  const fetchTodayShorts = async () => {
    setIsLoading(true);
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
      setShortsData(data.shorts || []);
    } catch (error) {
      console.error('Error fetching today shorts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodayShorts();
  }, []);

  const handleCardClick = (direction: 'left' | 'right') => {
    if (selected) return;

    const selectedBook = shortsData[direction === 'left' ? 0 : 1];
    setSelected(direction);
    setFlipped(true);
    setSelectedBookId(selectedBook.id);
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

      alert(`저장이 완료되었습니다! ${bookId}`);
    } catch (error) {
      console.error('Error saving today short:', error);
      alert('저장에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleSecondaryAction = () => {
    setIsModalOpen(true); // "쇼츠 보러가기" 버튼 클릭 시 모달 열기
  };

  const handleReroll = () => {
    fetchTodayShorts();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main-container mt-28">
      <div className="title">Today's Shorts!</div>
      <section className="cards-container">
        {/* Left Card */}
        {shortsData[0] && (
          <div className={`card ${selected === 'left' ? 'card-selected flipped' : selected ? 'hidden card-left' : ''}`}>
            <BookCard
              sentences={{ left: [shortsData[0].sentence], right: [] }}
              direction="left"
              backImage={shortsData[0].image}
              onClick={direction => handleCardClick(direction as 'left' | 'right')}
              isFlipped={selected === 'left' ? flipped : false}
            />
          </div>
        )}

        {/* VS Text */}
        <span className={`vs-text font-dm-serif ${selected ? 'hidden' : ''}`}>VS</span>

        {/* Right Card */}
        {shortsData[1] && (
          <div
            className={`card ${selected === 'right' ? 'card-selected flipped' : selected ? 'hidden card-right' : ''}`}>
            <BookCard
              sentences={{ left: [], right: [shortsData[1].sentence] }}
              direction="right"
              backImage={shortsData[1].image}
              onClick={direction => handleCardClick(direction as 'left' | 'right')}
              isFlipped={selected === 'right' ? flipped : false}
            />
          </div>
        )}
      </section>
      <div className="button-container mb-10 rounded-3xl">
        {!selected ? (
          <button className="reroll-button" onClick={handleReroll}>
            <img src="리롤버튼.svg" alt="리롤버튼" />
          </button>
        ) : (
          <div className="action-buttons">
            <button
              className="save-button rounded-3xl"
              style={{ borderRadius: '1.5rem' }} // 스타일 강제로 적용
              onClick={() => selectedBookId && handlePrimaryAction(selectedBookId)}>
              카드 저장하기
            </button>
            <button
              className="shorts-button rounded-3xl"
              style={{ borderRadius: '1.5rem' }} // 스타일 강제로 적용
              onClick={handleSecondaryAction}>
              쇼츠 보러가기
            </button>
          </div>
        )}
      </div>
      {isModalOpen && selectedBookId !== null && (
        <ShortsModal bookId={selectedBookId} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
