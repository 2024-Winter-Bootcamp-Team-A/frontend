import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const Search: React.FC = () => {
  const [searchParams] = useSearchParams(); // 쿼리스트링 추출
  const query = searchParams.get('query') || ''; // 검색어
  const [filteredData, setFilteredData] = useState<any[]>([]); // 필터링된 데이터 상태
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState<string | null>(null); // 에러 상태

  // 검색어에 따라 API 호출
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) {
        setFilteredData([]); // 검색어가 없으면 빈 배열로 초기화
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null); // 기존 에러 초기화

      try {
        const response = await fetch(`http://localhost:8000/api/v1/shorts/search?search=${encodeURIComponent(query)}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'X-CSRFTOKEN': 'Zo5cPxYa22NXMnBHb7GzJECmCAyOmSmVyUdVPPDikypYhGBEQxzbrRVODrPDNB8o',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch search results');
        }

        const data = await response.json();
        setFilteredData(data); // API 응답 데이터 설정
      } catch (error) {
        console.error('Error fetching search results:', error);
        setError('검색 결과를 가져오는 데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="min-h-screen w-screen bg-white">
      <div className="w-full max-w-[1280px] px-4 mx-auto mt-32">
        <h2 className="text-[24px] font-bold text-left mb-6">
          <span className="text-[#FF6347]">"{query}"</span>
          <span className="text-black">을 검색하신 결과입니다.</span>
        </h2>

        {isLoading ? (
          <p className="text-gray-500">로딩 중...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : filteredData.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredData.map((item: any) => (
              <div
                key={item.book_id}
                className="w-full max-w-[240px] h-[320px] bg-white border border-gray-200 shadow-lg mx-auto">
                <img src={item.image} alt={item.book_id} className="w-full h-full object-cover rounded" />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 col-span-full">검색 결과가 없습니다. 다른 검색어를 입력해보세요.</p>
        )}
      </div>
    </div>
  );
};

export default Search;
