import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

// 목업 데이터 정의
const mockData = [
  { id: 1, title: 'React Basics', description: 'Learn the basics of React.' },
  { id: 2, title: 'Advanced React', description: 'Dive deep into React hooks and patterns.' },
  { id: 3, title: 'React Router', description: 'Master routing in React applications.' },
  { id: 4, title: 'React State Management', description: 'Explore state management techniques.' },
];

const Search: React.FC = () => {
  const [searchParams] = useSearchParams(); // 쿼리스트링 추출
  const query = searchParams.get('query') || ''; // 검색어
  const [filteredData, setFilteredData] = useState(mockData); // 필터링된 데이터 상태

  // 검색어에 따라 데이터 필터링
  useEffect(() => {
    if (query) {
      const results = mockData.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
      setFilteredData(results); // 검색 결과 업데이트
    } else {
      setFilteredData(mockData); // 검색어가 없으면 전체 데이터 표시
    }
  }, [query]);

  return (
    <div className="min-h-screen w-screen bg-white">
      <div className="w-full max-w-[1280px] px-4 mx-auto mt-32">
        <h2 className="text-[24px] font-bold text-left mb-6">
          <span className="text-[#FF6347]">"{query}"</span>
          <span className="text-black">을 검색하신 결과입니다.</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredData.length > 0 ? (
            filteredData.map(item => (
              <div
                key={item.id}
                className="w-[240px] h-[280px] bg-white border border-gray-200 shadow-lg flex flex-col justify-center items-center p-4">
                <h3 className="text-lg font-bold text-gray-700 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full">검색 결과가 없습니다. 다른 검색어를 입력해보세요.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
