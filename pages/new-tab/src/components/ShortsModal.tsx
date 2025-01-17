import React from 'react';

interface ShortsModalProps {
  onClose: () => void; // 모달 닫기 함수 정의
}

const ShortsModal: React.FC<ShortsModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow-lg">
        {/* 닫기 버튼 */}
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
          ×
        </button>
        {/* 모달 내용 */}
        <div className="h-[680px] relative bg-black rounded-lg overflow-hidden mt-10">
          <video className="w-[360px] h-full" controls autoPlay muted>
            {/* autoPlay: 자동 재생, muted: 음소거 (자동 재생 보장) */}
            <source src="/video.mp4" type="video/mp4" />
          </video>
          <p className="absolute bottom-20 left-4 text-white text-sm bg-black/50 rounded p-1">
            오늘 밤, 세계에서 이 사랑이 사라진다고
          </p>
          {/* 아이콘 추가 */}
          <div className="absolute bottom-16 right-4 flex flex-col items-center space-y-4">
            <img src="/wish.svg" alt="Wish" className="w-8 h-8 cursor-pointer" />
            <img src="/share.svg" alt="Share" className="w-8 h-8 cursor-pointer" />
            <img src="/comment.svg" alt="Comment" className="w-8 h-8 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShortsModal;
