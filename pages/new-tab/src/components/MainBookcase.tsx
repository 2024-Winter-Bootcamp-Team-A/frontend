import { Card, CardContent } from './ui/card';
import { useState } from 'react';
import ShortsModal from './ShortsModal'; // ShortsModal 컴포넌트 가져오기

export default function MainBookcase({ title, direction = 'right' }: { title: string; direction?: 'left' | 'right' }) {
  const totalItems = 10; // 전체 항목 수
  const visibleItems = 4; // 화면에 보이는 항목 수
  const initialIndex = direction === 'right' ? 0 : totalItems - visibleItems; // 초기 인덱스 설정
  const [currentIndex, setCurrentIndex] = useState(initialIndex); // 현재 인덱스 상태 관리

  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
  const products = [
    '길s',
    '시녀 이야기',
    '1984',
    '멋진 신세계',
    '화씨 451',
    '듄',
    '어둠의 왼손',
    '뉴로맨서',
    '눈보라',
    '소유된 자들',
  ]; // 캐러셀에 표시될 제품 목록

  const handleNext = () => {
    // 다음 버튼 클릭 시 호출
    if (currentIndex < totalItems - visibleItems) {
      setCurrentIndex(currentIndex + 1); // 인덱스를 증가시켜 다음 항목 표시
    }
  };

  const handlePrevious = () => {
    // 이전 버튼 클릭 시 호출
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1); // 인덱스를 감소시켜 이전 항목 표시
    }
  };

  const handleCardClick = () => {
    setIsModalOpen(true); // 카드 클릭 시 모달 열기
  };

  return (
    <div className="w-full max-w-full relative mb-40">
      {/* 제목 */}
      <h2 className={`text-2xl font-bold font-dm-serif mb-2 ml-[160px]`}>{title}</h2>

      {/* 캐러셀 컨테이너 */}
      <div
        className={`relative overflow-hidden z-10 ${direction === 'right' ? 'ml-[50px]' : 'mr-[50px]'}`} // 방향에 따른 마진 조정
      >
        <div
          className="flex transition-transform duration-500 ease-in-out gap-4"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`,
          }}>
          {products.map((product, index) => (
            <div
              key={index}
              className="flex-shrink-0"
              style={{
                width: `${100 / visibleItems}%`,
              }}>
              <button
                className="w-full h-full transform scale-[0.6] transition-transform hover:scale-[0.75] focus:outline-none"
                onClick={handleCardClick}>
                <Card>
                  <CardContent className="flex flex-col aspect-[3/4] items-center justify-center p-4 bg-gray-100 space-y-2 shadow-2xl hover:bg-gray-200">
                    <span className="text-3xl font-semibold">{index + 1}</span>
                    <span className="text-sm text-gray-700">{product}</span>
                  </CardContent>
                </Card>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 이전 버튼 */}
      <button
        onClick={handlePrevious}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-200 p-3 rounded-full shadow hover:bg-gray-300 disabled:opacity-50 z-20"
        disabled={currentIndex === 0}>
        ←
      </button>

      {/* 다음 버튼 */}
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-200 p-3 rounded-full shadow hover:bg-gray-300 disabled:opacity-50 z-20"
        disabled={currentIndex >= totalItems - visibleItems}>
        →
      </button>

      {/* 받침대 */}
      <div className="w-full h-[60px] relative mt-4">
        <div
          className={`absolute w-[1800px] h-7 bg-gray-300 ${direction === 'right' ? 'left-[50px]' : 'right-[50px]'}`} // 받침대 위치 조정
          style={{
            clipPath: 'polygon(3% 0%, 97% 0%, 100% 100%, 0% 100%)',
            top: '-30px',
            zIndex: 0,
          }}
        />
        <div
          className={`absolute w-[1800px] h-7 bg-white shadow-[2px_7px_30px_10px_rgba(0,0,0,0.25)] ${
            direction === 'right' ? 'left-[50px]' : 'right-[50px]'
          }`} // 받침대 그림자 위치 조정
        />
      </div>

      {/* 모달 컴포넌트 */}
      {isModalOpen && <ShortsModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
