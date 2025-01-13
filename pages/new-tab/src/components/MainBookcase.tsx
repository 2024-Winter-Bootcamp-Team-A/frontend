import { Card, CardContent } from './ui/card';
import { useState } from 'react';

export default function MainBookcase({ title, direction = 'right' }: { title: string; direction?: 'left' | 'right' }) {
  const totalItems = 10; // 아이템의 총 개수
  const visibleItems = 4; // 한 화면에 보여줄 아이템 개수
  const initialIndex = direction === 'right' ? 0 : totalItems - visibleItems; // 방향에 따라 초기 인덱스 설정
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

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
  ];

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

  return (
    <div className="w-full max-w-full relative mb-40  ">
      <h2 className={`text-2xl font-bold ml-60px mt-40 font-dm-serif mb-2 ml-[160px]`}>{title}</h2>

      {/* Carousel Content */}
      <div className={`relative overflow-hidden z-10  ${direction === 'right' ? 'ml-[100px]' : 'mr-[100px]'}`}>
        {/* 내용 */}

        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`,
          }}>
          {products.map((product, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-16 py-2"
              style={{
                width: `${100 / visibleItems}%`,
              }}>
              <Card>
                <CardContent className="flex flex-col aspect-[3/4] items-center justify-center p-4 bg-gray-100 space-y-2 shadow">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrevious}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-200 p-3 rounded-full shadow hover:bg-gray-300 disabled:opacity-50 z-20"
        disabled={currentIndex === 0}>
        ←
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-200 p-3 rounded-full shadow hover:bg-gray-300 disabled:opacity-50 z-20"
        disabled={currentIndex >= totalItems - visibleItems}>
        →
      </button>
      <div className="w-[1500px] h-[52px] relative">
        {/* 사다리꼴 형태 */}
        <div
          className={`w-[1800px] h-7 absolute bg-gray-300 ${direction === 'right' ? 'right-0 translate-x-[400px]' : 'left-0 translate-x-[-100px]'}`}
          style={{
            clipPath: 'polygon(3% 0%, 97% 0%, 100% 100%, 0% 100%)', // 위쪽이 넓고 아래쪽이 좁은 사다리꼴 모양
            top: '-30px', // 위치 조정
            zIndex: 0, // 겹치는 순서 조정
          }}
        />

        {/* 하얀 직사각형 */}
        <div
          className={`w-[1800px] h-7 absolute bg-white shadow-[2px_7px_30px_10px_rgba(0,0,0,0.25)] ${direction === 'right' ? 'right-0 translate-x-[400px]' : 'left-0 translate-x-[-100px]'}`}
        />
      </div>
    </div>
  );
}
