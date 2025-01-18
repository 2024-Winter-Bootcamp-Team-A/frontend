import React, { useEffect, useState } from 'react';
import SentenceCardModal from './SentenceCardModal';
import WatchedModal from './WatchedModal';
import WishedModal from './WishedModal';

const MyPage: React.FC = () => {
  const [categoryData, setCategoryData] = useState<{ [key: string]: number }>({});
  const [mediaData, setMediaData] = useState({
    watched: ['watched1', 'watched2'],
    shorts: ['wished1', 'wished2'],
    savedCards: ['sentence1', 'sentence2'],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSentenceCardModalOpen, setIsSentenceCardModalOpen] = useState(false);
  const [isWatchedModalOpen, setIsWatchedModalOpen] = useState(false);
  const [isWishedModalOpen, setIsWishedModalOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setCategoryData({
        시: 3,
        소설: 7,
        과학: 2,
      });
      setMediaData({
        watched: ['watched1', 'watched2'],
        shorts: ['wished1', 'wished2'],
        savedCards: ['sentence1', 'sentence2'],
      });
      setIsLoading(false);
    }, 500);
  }, []);

  const totalCount = Object.values(categoryData).reduce((sum, count) => sum + count, 0);
  const categoryPercentages = Object.entries(categoryData)
    .map(([category, count]) => ({
      category,
      percentage: ((count / totalCount) * 100).toFixed(1),
    }))
    .sort((a, b) => parseFloat(b.percentage) - parseFloat(a.percentage));

  const barColors = ['#FF6A34', '#FC926C', '#FFE1D6'];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen w-screen bg-white">
      <div className="w-full max-w-[1280px] px-4 mx-auto mt-12 sm:mt-16 md:mt-20 lg:mt-24">
        <section className="py-6">
          <div className="flex items-center space-x-4">
            <div
              className="relative ml-4 mt-4 w-12 h-12 sm:w-12 sm:h-12 rounded-full"
              style={{ backgroundColor: '#FF6A34' }}>
              {/* 겹치는 이미지 */}
              <img
                src="person.svg"
                alt="Icon"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8"
              />
            </div>
            <div>
              <p className="mt-4 text-base sm:text-sm font-bold">성이름</p>
              <p className="text-xm sm:text-xm text-gray-500">@test1234</p>
            </div>
          </div>
          <p className="ml-4 mt-8 text-xl sm:text-lg font-bold text-gray-600">
            <span style={{ color: '#FF6A34', fontWeight: 'bold' }}>성이름</span> 님은 2025.01.01일부터{' '}
            <span style={{ color: '#FF6A34', fontWeight: 'bold' }}>{totalCount}</span>
            개의 작품을 감상하셨습니다.
          </p>
          <div className="mt-4 border-t border-[#FF6A34] w-[98%] mx-auto"></div>
        </section>

        <section className="py-4">
          <h2 className="ml-4 text-lg sm:text-xl font-bold mb-4">선호 카테고리</h2>
          <div className="relative h-6 w-[97%] max-w-[1200px] bg-gray-200 rounded-lg mx-auto">
            {
              categoryPercentages.reduce(
                (acc, { category, percentage }, index) => {
                  const color = barColors[index % barColors.length];
                  const width = `${percentage}%`;
                  const element = (
                    <div
                      key={index}
                      className="absolute h-full rounded-l-lg flex justify-start items-center"
                      style={{
                        left: acc.totalWidth,
                        width,
                        backgroundColor: color,
                      }}>
                      <span className="text-xs font-bold sm:text-sm" style={{ transform: 'translateY(110%)' }}>
                        {category} {percentage}%
                      </span>
                    </div>
                  );
                  acc.elements.push(element);
                  acc.totalWidth = `calc(${acc.totalWidth} + ${width})`;
                  return acc;
                },
                { elements: [], totalWidth: '0%' },
              ).elements
            }
          </div>
        </section>

        <section className="mt-12 border-t border-[#FF6A34] w-[98%] mx-auto">
          <div className="flex flex-wrap justify-around mt-20">
            <button
              className="flex flex-col items-center focus:outline-none"
              onClick={() => setIsWatchedModalOpen(true)}>
              <p className="mb-2 text-sm sm:text-base font-semibold">시청 기록</p>
              <div className="relative w-[100px] sm:w-[120px] h-[150px] sm:h-[180px]">
                {mediaData.watched.map((image, index) => (
                  <div
                    key={index}
                    className="absolute w-full h-full bg-gray-200 flex items-center justify-center text-white text-sm font-bold bg-cover bg-center rounded-lg shadow-md"
                    style={{
                      transform: `translate(${index * 5}px, ${index * 5}px)`,
                      zIndex: mediaData.watched.length - index,
                    }}>
                    {image}
                  </div>
                ))}
              </div>
            </button>

            <button
              className="flex flex-col items-center focus:outline-none"
              onClick={() => setIsWishedModalOpen(true)}>
              <p className="mb-2 text-sm sm:text-base font-semibold">찜한 숏츠</p>
              <div className="relative w-[100px] sm:w-[120px] h-[150px] sm:h-[180px]">
                {mediaData.shorts.map((image, index) => (
                  <div
                    key={index}
                    className="absolute w-full h-full bg-gray-200 flex items-center justify-center text-white text-sm font-bold bg-cover bg-center rounded-lg shadow-md"
                    style={{
                      transform: `translate(${index * 5}px, ${index * 5}px)`,
                      zIndex: mediaData.shorts.length - index,
                    }}>
                    {image}
                  </div>
                ))}
              </div>
            </button>

            <button
              className="flex flex-col items-center focus:outline-none"
              onClick={() => setIsSentenceCardModalOpen(true)}>
              <p className="mb-2 text-sm sm:text-base font-semibold">저장 문장 카드</p>
              <div className="relative w-[100px] sm:w-[120px] h-[150px] sm:h-[180px]">
                {mediaData.savedCards.map((image, index) => (
                  <div
                    key={index}
                    className="absolute w-full h-full bg-gray-200 flex items-center justify-center text-white text-sm font-bold bg-cover bg-center rounded-lg shadow-md"
                    style={{
                      transform: `translate(${index * 5}px, ${index * 5}px)`,
                      zIndex: mediaData.savedCards.length - index,
                    }}>
                    {image}
                  </div>
                ))}
              </div>
            </button>
          </div>
        </section>

        {isWatchedModalOpen && <WatchedModal cards={mediaData.watched} onClose={() => setIsWatchedModalOpen(false)} />}
        {isWishedModalOpen && <WishedModal cards={mediaData.shorts} onClose={() => setIsWishedModalOpen(false)} />}
        {isSentenceCardModalOpen && (
          <SentenceCardModal cards={mediaData.savedCards} onClose={() => setIsSentenceCardModalOpen(false)} />
        )}
      </div>
    </div>
  );
};

export default MyPage;
