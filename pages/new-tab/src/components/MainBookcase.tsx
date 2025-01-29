import { Card, CardContent } from './ui/card';
import { useState, useEffect } from 'react';
import ShortsModal from './ShortsModal'; // ShortsModal 컴포넌트 가져오기

export default function MainBookcase({
  name,
  title = '조회수', // 기본값 설정
  direction = 'right',
}: {
  name: string;
  title: '조회수' | '위시' | '댓글'; // 가능한 title 값 지정
  direction?: 'left' | 'right';
}) {
  const totalItems = 10; // 전체 항목 수
  const visibleItems = 4; // 화면에 보이는 항목 수
  const initialIndex = direction === 'right' ? 0 : totalItems - visibleItems; // 초기 인덱스 설정
  const [currentIndex, setCurrentIndex] = useState(initialIndex); // 현재 인덱스 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null); // 선택된 책 ID 상태
  const [products, setProducts] = useState<{ book_id: number; image: string }[]>([]); // API 데이터 상태 관리

  // API 요청 함수
  const fetchShortsData = async (queryTitle: string, limit: number = 10) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/shorts/shorts?title=${encodeURIComponent(queryTitle)}&limit=${limit}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        },
      );
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setProducts(data); // API 데이터를 상태로 설정
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('데이터를 불러오는 데 실패했습니다. 다시 시도해주세요.');
    }
  };

  useEffect(() => {
    // 컴포넌트 마운트 시 또는 title 변경 시 API 호출
    fetchShortsData(title); // title을 동적으로 전달
  }, [title]); // title 변경 시 useEffect 재실행

  const handleNext = () => {
    if (currentIndex < totalItems - visibleItems) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleCardClick = (bookId: number) => {
    console.log('선택된 책 ID:', bookId);
    setSelectedBookId(bookId);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full max-w-full relative mb-4 overflow-hidden">
      <h2 className={`text-2xl font-dm-serif mt-20 ml-8`}>{name}</h2>
      <div className={`overflow-hidden z-10 ${direction === 'right' ? 'ml-[40px]' : 'mr-[40px]'}`}>
        <div
          className="flex transition-transform duration-500 ease-in-out "
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`,
          }}>
          {products.map(product => (
            <div
              key={product.book_id}
              className="flex-shrink-0"
              style={{
                width: `${100 / visibleItems}%`,
              }}>
              <button
                className="w-full h-full transform scale-[0.6] transition-transform hover:scale-[0.75] focus:outline-none"
                onClick={() => handleCardClick(product.book_id)}>
                <Card>
                  <CardContent className="flex flex-col aspect-[3/4] items-center justify-center p-4 bg-gray-100 space-y-2 shadow-2xl hover:bg-gray-200">
                    <img src={product.image} alt={`Book ${product.book_id}`} className="w-full h-full object-contain" />
                  </CardContent>
                </Card>
              </button>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={handlePrevious}
        className="absolute top-[60%] left-4 transform -translate-y-1/2 bg-gray-200 p-3 rounded-full shadow hover:bg-gray-300 disabled:opacity-50 z-20"
        disabled={currentIndex === 0}>
        <img src="왼쪽화살표.svg" alt="왼쪽 화살표" className="w-4 h-4" />
      </button>
      <button
        onClick={handleNext}
        className="absolute top-[60%] right-4 transform -translate-y-1/2 bg-gray-200 p-3 rounded-full shadow hover:bg-gray-300 disabled:opacity-50 z-20"
        disabled={currentIndex >= totalItems - visibleItems}>
        <img src="오른쪽화살표.svg" alt="오른쪽 화살표" className="w-4 h-4" />
      </button>

      {isModalOpen && selectedBookId !== null && (
        <ShortsModal onClose={() => setIsModalOpen(false)} bookId={selectedBookId} />
      )}
    </div>
  );
}
