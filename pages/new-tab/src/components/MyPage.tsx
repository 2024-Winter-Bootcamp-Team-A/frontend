import React, { useEffect, useState } from 'react';
import SentenceCardModal from './SentenceCardModal';
import WatchedModal from './WatchedModal';
import WishedModal from './WishedModal';

const MyPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [joinDate, setJoinDate] = useState('');
  const [watchedCount, setWatchedCount] = useState(0);
  const [preferredCategories, setPreferredCategories] = useState<{ [key: string]: number }>({});
  const [recentImages, setRecentImages] = useState({
    watched: [] as string[],
    wished: [] as string[],
    sentence_card: [] as string[],
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSentenceCardModalOpen, setIsSentenceCardModalOpen] = useState(false);
  const [isWatchedModalOpen, setIsWatchedModalOpen] = useState(false);
  const [isWishedModalOpen, setIsWishedModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/users/profile');
        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }
        const data = await response.json();
        setName(data.name);
        setEmail(data.email);
        setJoinDate(data.join_date);
        setWatchedCount(data.watched_count);
        setPreferredCategories(data.preferred_categories);
        setRecentImages(data.recent_images);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const totalCount = Object.values(preferredCategories).reduce((sum, count) => sum + count, 0);
  const categoryPercentages = Object.entries(preferredCategories)
    .map(([category, count]) => ({
      category,
      percentage: ((count / totalCount) * 100).toFixed(1),
    }))
    .sort((a, b) => parseFloat(b.percentage) - parseFloat(a.percentage));

  const barColors = ['#FF6A34', '#FC926C', '#FFE1D6', '#FFC4A3', '#FFD8C6', '#FFF2EB'];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen w-screen bg-white">
      <div className="w-full max-w-[1280px] px-4 mx-auto mt-12 sm:mt-16 md:mt-20 lg:mt-24">
        {/* 프로필 섹션 */}
        <section className="py-6">
          <div className="flex items-center flex-wrap space-x-4">
            <div
              className="relative ml-4 mt-4 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full"
              style={{ backgroundColor: '#FF6A34' }}>
              <img
                src="person.svg"
                alt="Icon"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8"
              />
            </div>
            <div className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
              <p className="mt-4 font-bold">{name}</p>
              <p className="text-gray-500">@{email.split('@')[0]}</p>
            </div>
          </div>

          <p className="ml-4 mt-8 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold text-gray-600">
            <span style={{ color: '#FF6A34', fontWeight: 'bold' }}>{name}</span> 님은 {joinDate}부터{' '}
            <span style={{ color: '#FF6A34', fontWeight: 'bold' }}>{watchedCount}</span>개의 작품을 감상하셨습니다.
          </p>
          <div className="mt-4 border-t border-[#FF6A34] w-full"></div>
        </section>

        {/* 선호 카테고리 */}
        <section className="py-4">
          <h2 className="ml-4 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold mb-4">선호 카테고리</h2>
          <div className="relative h-6 w-full max-w-[1200px] mx-auto">
            {
              categoryPercentages.reduce(
                (acc, { category, percentage }, index) => {
                  const color = barColors[index % barColors.length];
                  const width = `${percentage}%`;
                  const element = (
                    <div
                      key={index}
                      className="absolute h-full flex justify-start items-center"
                      style={{
                        left: acc.totalWidth,
                        width,
                        backgroundColor: color,
                      }}>
                      <span
                        className="text-[10px] sm:text-xs md:text-sm lg:text-base font-bold"
                        style={{ transform: 'translateY(110%)' }}>
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
        <section className="mt-12 border-t border-[#FF6A34] w-full">
          <div className="flex flex-wrap justify-around mt-20 gap-y-8">
            <button
              className="flex flex-col items-center focus:outline-none"
              onClick={() => setIsWatchedModalOpen(true)}>
              <p className="mb-8 text-xs sm:text-sm md:text-base lg:text-lg font-semibold">시청 기록</p>
              <div className="relative w-32 sm:w-36 h-44 sm:h-48">
                {recentImages.watched.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Watched ${index}`}
                    className="absolute w-full h-full rounded-lg shadow-md"
                    style={{
                      transform: `translate(${index * 16}px, -${index * 16}px)`,
                      zIndex: recentImages.watched.length - index,
                    }}
                  />
                ))}
              </div>
            </button>

            <button
              className="flex flex-col items-center focus:outline-none"
              onClick={() => setIsWishedModalOpen(true)}>
              <p className="mb-8 text-xs sm:text-sm md:text-base lg:text-lg font-semibold">찜한 숏츠</p>
              <div className="relative w-32 sm:w-36 h-44 sm:h-48">
                {recentImages.wished.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Wished ${index}`}
                    className="absolute w-full h-full rounded-lg shadow-md"
                    style={{
                      transform: `translate(${index * 16}px, -${index * 16}px)`,
                      zIndex: recentImages.wished.length - index,
                    }}
                  />
                ))}
              </div>
            </button>

            <button
              className="flex flex-col items-center focus:outline-none"
              onClick={() => setIsSentenceCardModalOpen(true)}>
              <p className="mb-8 text-xs sm:text-sm md:text-base lg:text-lg font-semibold">저장 문장 카드</p>
              <div className="relative w-32 sm:w-36 h-44 sm:h-48">
                {recentImages.sentence_card.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Sentence ${index}`}
                    className="absolute w-full h-full rounded-lg shadow-md"
                    style={{
                      transform: `translate(${index * 16}px, -${index * 16}px)`,
                      zIndex: recentImages.sentence_card.length - index,
                    }}
                  />
                ))}
              </div>
            </button>
          </div>
        </section>

        {isWatchedModalOpen && <WatchedModal onClose={() => setIsWatchedModalOpen(false)} />}
        {isWishedModalOpen && <WishedModal onClose={() => setIsWishedModalOpen(false)} />}
        {isSentenceCardModalOpen && (
          <SentenceCardModal
            cards={recentImages.sentence_card || []}
            onClose={() => setIsSentenceCardModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default MyPage;
