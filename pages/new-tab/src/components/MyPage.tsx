import React, { useEffect, useState } from 'react';
import MainNav from './MainNav'; // 헤더 컴포넌트 import

const MyPage: React.FC = () => {
  // 카테고리 데이터를 상태로 관리 (API에서 받아오는 데이터)
  const [categoryData, setCategoryData] = useState<{ [key: string]: number }>({});

  // 미디어 데이터를 상태로 관리 (시청 기록, 찜한 숏츠, 저장 문장 카드)
  const [mediaData, setMediaData] = useState({
    watched: ['cover1', 'cover2'], // 시청 기록 mock 데이터
    shorts: ['shorts1', 'shorts2'], // 찜한 숏츠 mock 데이터
    savedCards: ['card1', 'card2'], // 저장 문장 카드 mock 데이터
  });

  // 로딩 상태를 관리
  const [isLoading, setIsLoading] = useState(true);

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
        watched: ['cover1', 'cover2'],
        shorts: ['shorts1', 'shorts2'],
        savedCards: ['card1', 'card2'],
      });

      setIsLoading(false); // 로딩 상태 해제
    }, 500); // API 지연 시뮬레이션
  }, []);

  // 총합 계산 (카테고리 데이터의 값 합산)
  const totalCount = Object.values(categoryData).reduce((sum, count) => sum + count, 0);

  // 퍼센트 계산 (카테고리별 비율 계산)
  const categoryPercentages = Object.entries(categoryData).map(([category, count]) => ({
    category,
    percentage: ((count / totalCount) * 100).toFixed(1), // 소수점 1자리까지
  }));

  if (isLoading) {
    return <div>Loading...</div>; // 로딩 중일 때 표시
  }

  return (
    <div className="min-h-screen w-screen bg-white">
      <MainNav /> {/* 헤더 컴포넌트 */}
      <div className="w-full max-w-[1280px] px-4 mx-auto mt-16">
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
          <h2 className="text-lg font-bold">선호 카테고리</h2>
          <div className="flex flex-col mt-2 space-y-2">
            {categoryPercentages.map(({ category, percentage }, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 w-20">{category}</span> {/* 카테고리 이름 */}
                <div
                  className="h-4 rounded-lg flex-1"
                  style={{
                    backgroundColor: `hsl(${30 + index * 30}, 70%, 70%)`, // 동적 색상
                    width: `${percentage}%`,
                  }}></div>
                <span className="text-sm text-gray-500">{percentage}%</span> {/* 퍼센트 */}
              </div>
            ))}
          </div>
        </section>

        {/* 버튼 섹션 */}
        <section className="py-8 border-t">
          <div className="flex justify-around">
            {/* 버튼 - 시청 기록 */}
            <button className="flex flex-col items-center focus:outline-none">
              <div className="relative w-24 h-32">
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
            <button className="flex flex-col items-center focus:outline-none">
              <div className="relative w-24 h-32">
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
            <button className="flex flex-col items-center focus:outline-none">
              <div className="relative w-24 h-32">
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
      </div>
    </div>
  );
};

export default MyPage;
