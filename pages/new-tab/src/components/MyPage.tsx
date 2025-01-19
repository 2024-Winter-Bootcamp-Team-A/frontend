import React, { useEffect, useState } from 'react';
import SentenceCardModal from './SentenceCardModal';
import WatchedModal from './WatchedModal';
import WishedModal from './WishedModal';

const MyPage: React.FC = () => {
  // 상태 선언
  const [name, setName] = useState(''); // 사용자 이름
  const [email, setEmail] = useState(''); // 사용자 이메일
  const [joinDate, setJoinDate] = useState(''); // 가입 날짜
  const [watchedCount, setWatchedCount] = useState(0); // 감상한 작품 수
  const [preferredCategories, setPreferredCategories] = useState<{ [key: string]: number }>({});
  const [recentImages, setRecentImages] = useState({
    watched: [],
    wished: [],
    sentence_card: [],
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSentenceCardModalOpen, setIsSentenceCardModalOpen] = useState(false);
  const [isWatchedModalOpen, setIsWatchedModalOpen] = useState(false);
  const [isWishedModalOpen, setIsWishedModalOpen] = useState(false);

  // API 데이터 가져오기
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/users/profile');
        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }
        const data = await response.json();
        setName(data.name); // "성이름"에 매핑
        setEmail(data.email); // "test1234"에 매핑
        setJoinDate(data.join_date); // 가입 날짜 매핑
        setWatchedCount(data.watched_count); // 감상 수 매핑
        setPreferredCategories(data.preferred_categories); // 선호 카테고리 매핑
        setRecentImages(data.recent_images); // 최근 이미지 데이터 매핑
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setIsLoading(false);
      }
    };

    fetchUserProfile(); // API 호출
  }, []);

  // 카테고리 퍼센트 계산
  const totalCount = watchedCount; // totalCount로 매핑
  const categoryPercentages = Object.entries(preferredCategories)
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
          {/* 사용자 정보 */}
          <div className="flex items-center space-x-4">
            <div
              className="relative ml-4 mt-4 w-12 h-12 sm:w-12 sm:h-12 rounded-full"
              style={{ backgroundColor: '#FF6A34' }}>
              <img
                src="person.svg"
                alt="Icon"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8"
              />
            </div>
            <div>
              <p className="mt-4 text-base sm:text-sm font-bold">{name}</p> {/* 이름 표시 */}
              <p className="text-xm sm:text-xm text-gray-500">@{email.split('@')[0]}</p> {/* 이메일 표시 */}
            </div>
          </div>

          {/* 감상 수 및 가입 날짜 */}
          <p className="ml-4 mt-8 text-xl sm:text-lg font-bold text-gray-600">
            <span style={{ color: '#FF6A34', fontWeight: 'bold' }}>{name}</span> 님은 {joinDate}부터{' '}
            <span style={{ color: '#FF6A34', fontWeight: 'bold' }}>{totalCount}</span>
            개의 작품을 감상하셨습니다.
          </p>
          <div className="mt-4 border-t border-[#FF6A34] w-[98%] mx-auto"></div>
        </section>

        {/* 선호 카테고리 */}
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

        {/* 미디어 데이터 */}
        <section className="mt-12 border-t border-[#FF6A34] w-[98%] mx-auto">
          <div className="flex flex-wrap justify-around mt-20">
            <button
              className="flex flex-col items-center focus:outline-none"
              onClick={() => setIsWatchedModalOpen(true)}>
              <p className="mb-2 text-sm sm:text-base font-semibold">시청 기록</p>
              <div className="relative w-[100px] sm:w-[120px] h-[150px] sm:h-[180px]">
                {recentImages.watched.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Watched ${index}`}
                    className="absolute w-full h-full rounded-lg shadow-md"
                    style={{
                      transform: `translate(${index * 5}px, ${index * 5}px)`,
                      zIndex: recentImages.watched.length - index,
                    }}
                  />
                ))}
              </div>
            </button>

            <button
              className="flex flex-col items-center focus:outline-none"
              onClick={() => setIsWishedModalOpen(true)}>
              <p className="mb-2 text-sm sm:text-base font-semibold">찜한 숏츠</p>
              <div className="relative w-[100px] sm:w-[120px] h-[150px] sm:h-[180px]">
                {recentImages.wished.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Wished ${index}`}
                    className="absolute w-full h-full rounded-lg shadow-md"
                    style={{
                      transform: `translate(${index * 5}px, ${index * 5}px)`,
                      zIndex: recentImages.wished.length - index,
                    }}
                  />
                ))}
              </div>
            </button>

            <button
              className="flex flex-col items-center focus:outline-none"
              onClick={() => setIsSentenceCardModalOpen(true)}>
              <p className="mb-2 text-sm sm:text-base font-semibold">저장 문장 카드</p>
              <div className="relative w-[100px] sm:w-[120px] h-[150px] sm:h-[180px]">
                {recentImages.sentence_card.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Sentence ${index}`}
                    className="absolute w-full h-full rounded-lg shadow-md"
                    style={{
                      transform: `translate(${index * 5}px, ${index * 5}px)`,
                      zIndex: recentImages.sentence_card.length - index,
                    }}
                  />
                ))}
              </div>
            </button>
          </div>
        </section>

        {isWatchedModalOpen && (
          <WatchedModal cards={recentImages.watched} onClose={() => setIsWatchedModalOpen(false)} />
        )}
        {isWishedModalOpen && <WishedModal cards={recentImages.wished} onClose={() => setIsWishedModalOpen(false)} />}
        {isSentenceCardModalOpen && (
          <SentenceCardModal cards={recentImages.sentence_card} onClose={() => setIsSentenceCardModalOpen(false)} />
        )}
      </div>
    </div>
  );
};

export default MyPage;
