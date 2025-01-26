import React, { useState, useEffect } from 'react';
import { StatsBar } from './StatsBar';
import StatsData from './StatsData';
import StatsPie from './StatsPie';
import StatsStacked from './StatsStacked';

const Stats: React.FC = () => {
  const [slides, setSlides] = useState<any[]>([]); // 카드 데이터
  const [activeSlide, setActiveSlide] = useState(1); // 기본 중앙 카드 설정
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
  const [chartData, setChartData] = useState<any>(null); // 차트 데이터 저장
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllStats = async () => {
      try {
        setLoading(true);

        // 1. /stats/ 호출 (카드 데이터)
        const statsResponse = await fetch('http://localhost:8000/api/v1/stats/');
        if (!statsResponse.ok) throw new Error('Failed to fetch stats data');
        const statsData = await statsResponse.json();

        const slidesData = [
          {
            id: 0,
            label: 'Most wished',
            img: statsData.most_wished.image,
          },
          {
            id: 1,
            label: 'Most Commented',
            img: statsData.most_commented.image,
          },
          {
            id: 2,
            label: 'Most views',
            img: statsData.most_viewed.image,
          },
        ];
        setSlides(slidesData);

        // 2. 상세 데이터 호출
        const [commentedRes, wishedRes, viewedRes] = await Promise.all([
          fetch('http://localhost:8000/api/v1/stats/most-commented'),
          fetch('http://localhost:8000/api/v1/stats/most-wished'),
          fetch('http://localhost:8000/api/v1/stats/most-viewed'),
        ]);

        if (!commentedRes.ok || !wishedRes.ok || !viewedRes.ok) {
          throw new Error('Failed to fetch detailed stats data');
        }

        const [mostCommented, mostWished, mostViewed] = await Promise.all([
          commentedRes.json(),
          wishedRes.json(),
          viewedRes.json(),
        ]);

        setChartData({
          mostCommented,
          mostWished,
          mostViewed,
        });
      } catch (err) {
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllStats();
  }, []);

  const handlePrev = () => {
    setActiveSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handleCardClick = (index: number) => {
    setActiveSlide(index);
    setIsModalOpen(true); // 모달 열기
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  const handleModalClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.target === e.currentTarget) {
      handleCloseModal(); // 모달 배경 클릭 시 닫기
    }
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const activeData =
    activeSlide === 0 ? chartData?.mostWished : activeSlide === 1 ? chartData?.mostCommented : chartData?.mostViewed;

  return (
    <div className="h-[100vh] w-screen bg-white flex justify-center items-center">
      <div className="relative w-full max-w-5xl flex justify-center items-center">
        {/* 왼쪽 화살표 */}
        <button
          onClick={handlePrev}
          className="absolute left-[16rem] top-1/2 transform -translate-y-1/2 bg-gray-300 w-10 h-10 rounded-full flex justify-center items-center hover:bg-gray-400 z-10"
          aria-label="Previous Slide">
          <img src="왼쪽화살표.svg" alt="Previous Slide" className="w-4 h-4" />
        </button>

        {/* 카드 그룹 */}
        <div className="w-full flex justify-center items-center relative mt-[2rem]">
          {slides.map((slide, index) => {
            const isActive = index === activeSlide;
            const isPrev = index === (activeSlide === 0 ? slides.length - 1 : activeSlide - 1);
            const isNext = index === (activeSlide === slides.length - 1 ? 0 : activeSlide + 1);

            const translateX = isActive ? 0 : isPrev ? -400 : 400;
            const scale = isActive ? 1 : 0.8;
            return (
              <button
                key={slide.id}
                className="absolute transition-transform duration-700 ease-in-out"
                style={{
                  transform: `translateX(${translateX}px) scale(${scale})`,
                }}
                onClick={() => handleCardClick(index)}>
                <h3 className={`text-center text-black mb-2 ${isActive ? 'text-[30px]' : 'text-[24px]'}`}>
                  {slide.label}
                </h3>
                <div
                  className={`${
                    isActive ? 'w-[320px] h-[500px]' : 'w-[208px] h-[340px]'
                  } bg-white border border-gray-200 shadow-lg rounded-2xl flex justify-center items-center cursor-pointer transition-all duration-700`}>
                  <img src={slide.img} alt={slide.label} className="w-full h-full object-cover" />
                </div>
              </button>
            );
          })}
        </div>

        {/* 오른쪽 화살표 */}
        <button
          onClick={handleNext}
          className="absolute right-[16rem] top-1/2 transform -translate-y-1/2 bg-gray-300 w-10 h-10 rounded-full flex justify-center items-center hover:bg-gray-400 z-10"
          aria-label="Next Slide">
          <img src="오른쪽화살표.svg" alt="Previous Slide" className="w-4 h-4" />
        </button>
      </div>

      {/* 모달 창 */}
      {isModalOpen && activeData && (
        <div>
          <button
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={handleModalClick}>
            <section className="bg-[#FCE8E1] w-[1300px] h-[640px] rounded-4xl shadow-lg relative flex">
              <img src={slides[activeSlide]?.img} alt={slides[activeSlide]?.label} />
              <div className="flex flex-col justify-around w-31 h-4/5 rounded-4xl bg-white ml-10 mt-16">
                <StatsData title="Views" data={activeData.views} />
                <StatsData title="Wished" data={activeData.wishes} />
                <StatsData title="Shared" data={activeData.shares} />
                <StatsData title="BookVisits" data={activeData.book_visits} />
              </div>
              <div className="flex flex-col justify-normal">
                {/* 상단 차트 두 개 */}
                <div className="flex">
                  {/* 왼쪽 바 차트 */}
                  <div className="bg-white w-[300px] h-[300px] mt-16 rounded-4xl ml-4 flex justify-center items-center shadow-md">
                    <StatsBar
                      data={[
                        {
                          label: 'Gender Stats',
                          male: activeData.gender_stats.male,
                          female: activeData.gender_stats.female,
                        },
                      ]}
                    />
                  </div>
                  {/* 오른쪽 원형 차트 */}
                  <div className="bg-white w-[300px] h-[300px] mt-16 rounded-4xl ml-4 flex justify-center items-center shadow-md">
                    <StatsPie
                      data={[
                        { category: '10s', count: activeData.age_stats['10s'] },
                        { category: '20s', count: activeData.age_stats['20s'] },
                        { category: '30s', count: activeData.age_stats['30s'] },
                        { category: '40s', count: activeData.age_stats['40s'] },
                        { category: '50+', count: activeData.age_stats['50s+'] },
                      ]}
                    />
                  </div>
                </div>

                {/* 하단 스택 차트 */}
                <div className="bg-white w-[620px] h-[200px] mt-4 rounded-4xl ml-4 shadow-md">
                  <StatsStacked data={activeData.date_stats} />
                </div>
              </div>

              <button className="absolute top-4 right-4 text-black text-2xl font-bold" onClick={handleCloseModal}>
                ✖
              </button>
            </section>
          </button>
        </div>
      )}
    </div>
  );
};

export default Stats;
