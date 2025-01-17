import React, { useState } from 'react';
import CommentModal from './CommentModal'; // 댓글 모달 컴포넌트 경로

interface ShortsModalProps {
  onClose: () => void; // 모달 닫기 함수 정의
}

const ShortsModal: React.FC<ShortsModalProps> = ({ onClose }) => {
  const [isCommentVisible, setIsCommentVisible] = useState(false); // 댓글창 표시 상태 관리

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
      onClick={onClose} // 배경 클릭 시 모달 닫기
    >
      <div
        className={`relative bg-white rounded-lg shadow-lg flex transition-all duration-300 ${
          isCommentVisible ? 'w-[800px]' : 'w-[400px]'
        }`}
        onClick={e => e.stopPropagation()} // 이벤트 전파 방지
      >
        {/* 비디오 섹션 */}
        <div className="relative bg-black rounded-l-lg overflow-hidden w-[400px] h-[680px]">
          <video className="w-full h-full" controls autoPlay muted>
            <source src="/video.mp4" type="video/mp4" />
          </video>
          <p className="absolute bottom-20 left-4 text-white text-sm bg-black/50 rounded p-1">
            오늘 밤, 세계에서 이 사랑이 사라진다고
          </p>
          {/* 아이콘 추가 */}
          <div className="absolute bottom-20 right-4 flex flex-col items-center space-y-4">
            <button className="w-8 h-8" aria-label="Add to wishlist">
              <img src="wish.svg" alt="Wish" className="w-full h-full" />
            </button>
            <button className="w-8 h-8" aria-label="Share video">
              <img src="share.svg" alt="Share" className="w-full h-full" />
            </button>
            <button className="w-8 h-8" aria-label="Open comments" onClick={() => setIsCommentVisible(true)}>
              <img src="comment.svg" alt="Comment" className="w-full h-full" />
            </button>
          </div>
        </div>

        {/* 댓글 섹션 */}
        {isCommentVisible && (
          <div className="bg-white w-[400px] h-[680px] p-4 rounded-r-lg shadow-lg flex flex-col">
            <CommentModal
              onClose={() => setIsCommentVisible(false)} // 댓글창 닫기
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ShortsModal;
