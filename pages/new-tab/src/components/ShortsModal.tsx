import React, { useState } from 'react';
import CommentModal from './CommentModal'; // CommentModal 컴포넌트를 가져옵니다.

interface ShortsModalProps {
  onClose: () => void; // 모달 닫기 함수 정의
}

const ShortsModal: React.FC<ShortsModalProps> = ({ onClose }) => {
  const [isFlipped, setIsFlipped] = useState(false); // 카드 회전 상태
  const [isCommentVisible, setIsCommentVisible] = useState(false); // 댓글창 상태

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
      onClick={onClose} // 모달 배경 클릭 시 모달 닫기
    >
      <div
        className={`relative bg-white rounded-lg shadow-lg flex transition-transform duration-500`}
        style={{
          width: '400px',
          height: '680px',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transformStyle: 'preserve-3d',
          perspective: '1000px',
        }}
        onClick={e => e.stopPropagation()} // 이벤트 전파 방지
      >
        {/* 댓글창 */}
        {isCommentVisible && (
          <div
            className="absolute inset-0 bg-white z-20 p-4 rounded-lg shadow-lg"
            onClick={e => e.stopPropagation()} // 댓글창 클릭 시 이벤트 전파 방지
          >
            <CommentModal
              onClose={() => setIsCommentVisible(false)} // 댓글창 닫기
            />
          </div>
        )}

        {/* 앞면: 비디오 */}
        {!isFlipped && (
          <div
            className="absolute w-full h-full bg-black rounded-lg"
            style={{
              backfaceVisibility: 'hidden',
            }}>
            <video className="w-full h-full" controls autoPlay muted>
              <source src="/video.mp4" type="video/mp4" />
            </video>
            {/* 아이콘 섹션 */}
            <div className="absolute bottom-20 right-4 flex flex-col items-center space-y-4">
              <button className="w-8 h-8" aria-label="Add to wishlist">
                <img src="wish.svg" alt="Wish" className="w-full h-full" />
              </button>
              <button className="w-8 h-8" aria-label="Share video">
                <img src="share.svg" alt="Share" className="w-full h-full" />
              </button>
              <button
                className="w-8 h-8"
                aria-label="Open comments"
                onClick={() => setIsCommentVisible(true)} // 댓글창 열기
              >
                <img src="comment.svg" alt="Comment" className="w-full h-full" />
              </button>
            </div>
            <button className="absolute bottom-4 right-4 p-2 bg-white rounded" onClick={() => setIsFlipped(true)}>
              Show Info
            </button>
          </div>
        )}

        {/* 뒷면: 기본 정보 */}
        {isFlipped && (
          <div
            className="absolute w-full h-full bg-white rounded-lg flex flex-col items-center justify-between p-6"
            style={{
              transform: 'rotateY(180deg)',
              backfaceVisibility: 'hidden',
            }}>
            {/* 기본 정보 */}
            <h2 className="text-xl font-bold text-orange-500">너의 이름은</h2>
            <div className="w-full flex justify-between items-center border border-orange-500 rounded-full py-2 px-4 text-center text-sm text-gray-700">
              <div>
                <p>Views</p>
                <p className="text-orange-500 font-bold">34</p>
              </div>
              <div>
                <p>Wishes</p>
                <p className="text-orange-500 font-bold">34</p>
              </div>
              <div>
                <p>Shares</p>
                <p className="text-orange-500 font-bold">34</p>
              </div>
              <div>
                <p>Book Visits</p>
                <p className="text-orange-500 font-bold">34</p>
              </div>
            </div>
            <blockquote className="text-center text-gray-600 italic mt-4">
              "눈처럼 가볍다고 사람들은 말한다.
              <br /> 그러나 눈에도 무게가 있다. <br /> 이 물방울처럼"
            </blockquote>

            {/* 아이콘 섹션 */}
            <div className="absolute bottom-20 right-4 flex flex-col items-center space-y-4">
              <button className="w-8 h-8" aria-label="Add to wishlist">
                <img src="wish.svg" alt="Wish" className="w-full h-full" />
              </button>
              <button className="w-8 h-8" aria-label="Share video">
                <img src="share.svg" alt="Share" className="w-full h-full" />
              </button>
              <button
                className="w-8 h-8"
                aria-label="Open comments"
                onClick={() => setIsCommentVisible(true)} // 댓글창 열기
              >
                <img src="comment.svg" alt="Comment" className="w-full h-full" />
              </button>
            </div>

            {/* 닫기 버튼 */}
            <button
              className="mt-4 py-2 px-6 bg-gray-200 text-gray-600 rounded-full text-sm font-bold"
              onClick={() => setIsFlipped(false)}>
              Back to Video
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShortsModal;
