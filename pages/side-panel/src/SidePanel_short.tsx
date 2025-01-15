import React, { useState } from 'react';

const SidePannel_short: React.FC = () => {
  const [isCommentVisible, setCommentVisible] = useState(false);

  const toggleCommentVisibility = () => {
    setCommentVisible(!isCommentVisible);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://via.placeholder.com/1200x800')" }}>
      {/* 모달창 */}
      <div className="bg-gray-900 text-white rounded-lg shadow-lg max-w-sm w-full relative">
        {/* 상단 텍스트 */}
        <div className="px-4 pt-6">
          <h1 className="text-orange-500 font-bold text-xl">Liverary</h1>
        </div>

        {/* 이미지/동영상 */}
        <div className="relative mt-4">
          <div className="h-96 w-full bg-black rounded-lg overflow-hidden">
            {/* 동영상 크기를 360x640으로 설정 */}
            <video width="360" height="640" controls>
              <source src="https://www.w3schools.com/html/movie.mp4" type="video/mp4" />
            </video>
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
        <div className={`transition-all duration-300 transform ${isCommentVisible ? 'translate-y-0' : 'translate-y-full'} border-t border-gray-700 px-4 py-4`}>
          <input
            type="text"
            placeholder="댓글 추가"
            className="w-full bg-gray-800 text-white rounded-full px-4 py-2 focus:outline-none focus:ring focus:ring-orange-500"
            onFocus={toggleCommentVisibility}
          />
        </div>
      </div>
    </div>
  );
};

export default SidePannel_short;
