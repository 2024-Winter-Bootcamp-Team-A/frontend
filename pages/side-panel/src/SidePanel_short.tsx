import React from 'react';

const SidePannel_short: React.FC = () => {
  console.log('Component is rendering!'); // 렌더링 확인을 위한 줄 추가

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-gray-900 text-white rounded-lg shadow-lg max-w-sm w-full">
        {/* 상단 텍스트 */}
        <div className="px-4 pt-6">
          <h1 className="text-orange-500 font-bold text-xl">Liverary</h1>
        </div>

        {/* 이미지/동영상 */}
        <div className="relative mt-4">
          <div className="h-96 bg-black rounded-lg overflow-hidden">
            {/* 여기에 나중에 동영상을 삽입하면 됩니다 */}
            <img src="https://via.placeholder.com/300x400" alt="placeholder" className="w-full h-full object-cover" />
          </div>
          <p className="absolute bottom-4 left-4 text-white text-sm bg-black/50 px-2 py-1 rounded">
            오늘 밤, 세계에서 이 사랑이 사라진다고 해도
          </p>
        </div>

        {/* 하단 버튼 */}
        <div className="flex justify-between px-4 py-4 items-center">
          <button className="text-red-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </svg>
          </button>
          <button className="text-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 6.75a4.5 4.5 0 00-9 0v5.25H4.5l7.5 7.5 7.5-7.5h-3.75V6.75z"
              />
            </svg>
          </button>
        </div>

        {/* 댓글 추가 */}
        <div className="border-t border-gray-700 px-4 py-4">
          <input
            type="text"
            placeholder="댓글 추가"
            className="w-full bg-gray-800 text-white rounded-full px-4 py-2 focus:outline-none focus:ring focus:ring-orange-500"
          />
        </div>
      </div>
    </div>
  );
};

export default SidePannel_short;
