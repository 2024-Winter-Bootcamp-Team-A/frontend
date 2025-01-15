import React from 'react';
import MainNav from './MainNav'; // 헤더 컴포넌트 import

const Search: React.FC = () => {
  return (
    <div className="min-h-screen w-screen bg-white">
      <MainNav /> {/* 헤더 추가 */}
      <div className="w-full max-w-[1280px] px-4 mx-auto mt-32">
        <h2 className="text-[24px] font-bold text-left mb-6">
          <span className="text-[#FF6347]">"한강"</span>
          <span className="text-black">을 검색하신 결과입니다.</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
            <div
              key={index}
              className="w-[240px] h-[280px] bg-white border border-gray-200 shadow-lg flex justify-center items-center">
              <span className="text-gray-500">사진 {item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;