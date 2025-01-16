import React, { useEffect, useState } from 'react';
import MainNav from './MainNav'; // 헤더 컴포넌트 import
import SentenceCardModal from './SentenceCardModal'; // 문장 카드 모달 컴포넌트 import
import WatchedModal from './WatchedModal'; // 시청 기록 모달 컴포넌트 import
import WishedModal from './WishedModal'; // 찜한 숏츠 모달 컴포넌트 import

const MyPage: React.FC = () => {
  // 카테고리 데이터를 상태로 관리 (API에서 받아오는 데이터)
  const [categoryData, setCategoryData] = useState<{ [key: string]: number }>({});

  // 미디어 데이터를 상태로 관리 (시청 기록, 찜한 숏츠, 저장 문장 카드)
  const [mediaData, setMediaData] = useState({
    watched: ['watched1', 'watched2'], // 시청 기록 mock 데이터
    shorts: ['wished1', 'wished2'], // 찜한 숏츠 mock 데이터
    savedCards: ['sentence1', 'sentence2'], // 저장 문장 카드 mock 데이터
  });
  4;
  // 로딩 상태를 관리
  const [isLoading, setIsLoading] = useState(true);

  // 모달 상태 관리
  const [isSentenceCardModalOpen, setIsSentenceCardModalOpen] = useState(false);
  const [isWatchedModalOpen, setIsWatchedModalOpen] = useState(false);
  const [isWishedModalOpen, setIsWishedModalOpen] = useState(false);

  useEffect(() => {
    // 더미 데이터 (API 호출 대신 사용)
    setTimeout(() => {
      // 카테고리 데이터 예시 설정
      setCategoryData({
        시: 3,
        소설: 7,
        과학: 2,
      });

      // 미디어 데이터 예시 설정
      setMediaData({
        watched: ['watched1', 'watched2'],
        shorts: ['wished1', 'wished2'],
        savedCards: ['sentence1', 'sentence2'],
      });

      setIsLoading(false); // 로딩 상태 해제
    }, 500); // API 지연 시뮬레이션
  }, []);

  // 총합 계산 (카테고리 데이터의 값 합산)
  const totalCount = Object.values(categoryData).reduce((sum, count) => sum + count, 0);

  // 퍼센트 계산 (카테고리별 비율 계산) 및 내림차순 정렬
  const categoryPercentages = Object.entries(categoryData)
    .map(([category, count]) => ({
      category,
      percentage: ((count / totalCount) * 100).toFixed(1), // 소수점 1자리까지
    }))
    .sort((a, b) => parseFloat(b.percentage) - parseFloat(a.percentage)); // 내림차순 정렬

  if (isLoading) {
    return <div>Loading...</div>; // 로딩 중일 때 표시
  }

  return (
    <div className="min-h-screen w-screen bg-white">
      <MainNav /> {/* 헤더 컴포넌트 */}
      <div className="w-full max-w-[1280px] px-4 mx-auto mt-36">
        {' '}
        {/* 전체 간격을 아래로 살짝 조정 */}
        {/* 프로필 섹션 */}
        <section className="py-6">
          <div className="flex items-center space-x-4">
            {/* 프로필 이미지 */}
            <div className="w-16 h-16 bg-orange-300 rounded-full"></div>

            {/* 사용자 정보 */}
            <div>
              <p className="text-lg font-semibold">성이름</p>
              <p className="text-sm text-gray-500">shfui@naver.com</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-600">
            <span className="text-orange-500 font-semibold">성이름</span> 님은 2025.01.01일부터{' '}
            <span className="font-semibold">{totalCount}개의 작품</span>을 감상하셨습니다.
          </p>
        </section>
        {/* 선호 카테고리 */}
        <section className="py-4">
          <h2 className="text-lg font-bold mb-2">선호 카테고리</h2>
          <div className="relative h-6 w-full bg-gray-200 rounded-lg">
            {
              categoryPercentages.reduce(
                (acc, { category, percentage }, index) => {
                  const color = `hsl(${30 + index * 30}, 70%, 70%)`;
                  const width = `${percentage}%`;
                  const element = (
                    <div
                      key={index}
                      className="absolute h-full rounded-l-lg flex justify-start items-center pl-2"
                      style={{
                        left: acc.totalWidth,
                        width,
                        backgroundColor: color,
                      }}>
                      <span className="text-xs text-gray-700">
                        {category} {percentage}%
                      </span>{' '}
                      {/* 카테고리명과 퍼센트 */}
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
          <div className="flex justify-between mt-3 text-sm text-gray-600">
            {' '}
            {/* 간격 아래로 약간 조정 */}
            {categoryPercentages.map(({ category }) => (
              <span key={category}></span>
            ))}
          </div>
        </section>
        {/* 버튼 섹션 */}
        <section className="py-8 border-t">
          <div className="flex justify-around mt-12">
            {/* 버튼 - 시청 기록 */}
            <button
              className="flex flex-col items-center focus:outline-none"
              onClick={() => setIsWatchedModalOpen(true)}>
              <div className="relative w-[120px] h-[180px]">
                {' '}
                {/* 기존 크기의 1.3배 */}
                {mediaData.watched.map((image, index) => (
                  <div
                    key={index}
                    className="absolute w-full h-full bg-gray-200 flex items-center justify-center text-white text-sm font-bold bg-cover bg-center rounded-lg shadow-md"
                    style={{
                      transform: `translate(${index * 5}px, ${index * 5}px)`, // 겹치도록 배치
                      zIndex: mediaData.watched.length - index, // 뒤쪽 이미지가 위로 보이도록 설정
                    }}>
                    {image}
                  </div>
                ))}
              </div>
              <p className="mt-2 text-sm font-semibold">시청 기록</p>
            </button>

            {/* 버튼 - 찜한 숏츠 */}
            <button
              className="flex flex-col items-center focus:outline-none"
              onClick={() => setIsWishedModalOpen(true)}>
              <div className="relative w-[120px] h-[180px]">
                {' '}
                {/* 기존 크기의 1.3배 */}
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
              <p className="mt-2 text-sm font-semibold">찜한 숏츠</p>
            </button>

            {/* 버튼 - 저장 문장 카드 */}
            <button
              className="flex flex-col items-center focus:outline-none"
              onClick={() => setIsSentenceCardModalOpen(true)}>
              <div className="relative w-[120px] h-[180px]">
                {' '}
                {/* 기존 크기의 1.3배 */}
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
              <p className="mt-2 text-sm font-semibold">저장 문장 카드</p>
            </button>
          </div>
        </section>
        {/* 모달 섹션 */}
        {isWatchedModalOpen && (
          <WatchedModal
            cards={mediaData.watched} // 시청 기록 데이터 전달
            onClose={() => setIsWatchedModalOpen(false)} // 모달 닫기 함수
          />
        )}
        {isWishedModalOpen && (
          <WishedModal
            cards={mediaData.shorts} // 찜한 숏츠 데이터 전달
            onClose={() => setIsWishedModalOpen(false)} // 모달 닫기 함수
          />
        )}
        {isSentenceCardModalOpen && (
          <SentenceCardModal
            cards={mediaData.savedCards} // 저장된 모든 문장 카드 전달
            onClose={() => setIsSentenceCardModalOpen(false)} // 모달 닫기 함수
          />
        )}
      </div>
    </div>
  );
};

export default MyPage;
