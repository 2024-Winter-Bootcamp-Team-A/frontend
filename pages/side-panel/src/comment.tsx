import React, { useState, useRef } from 'react';
import Comment from './Comment'; // 전체 댓글 컴포넌트

const SidePanelShort: React.FC = () => {
  const [isCommentOpen, setIsCommentOpen] = useState(false); // 전체 댓글 창 열림 상태
  const [translateY, setTranslateY] = useState(0); // 하단 입력 필드의 위치
  const startYRef = useRef<number | null>(null); // 드래그 시작 위치 참조
  const [newComment, setNewComment] = useState(''); // 댓글 입력 상태

  // 드래그 시작 핸들러
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const startY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    startYRef.current = startY;
  };

  // 드래그 중 핸들러 (위로만 슬라이드 허용)
  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (startYRef.current !== null) {
      const currentY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const deltaY = currentY - startYRef.current;

      // 위로 슬라이드하는 경우만 translateY 업데이트
      if (deltaY < 0) {
        const newTranslateY = Math.max(translateY + deltaY, -300); // 최소값 제한 (-300px)
        setTranslateY(newTranslateY);
      }
    }
  };

  // 드래그 종료 핸들러
  const handleTouchEnd = () => {
    startYRef.current = null;

    // 드래그 종료 후 상태 전환
    if (translateY < -150) {
      setTranslateY(-300); // 완전히 열린 상태
      setIsCommentOpen(true);
    } else {
      setTranslateY(0); // 닫힌 상태
      setIsCommentOpen(false);
    }
  };

  // 댓글 추가 핸들러
  const handleAddComment = () => {
    if (newComment.trim() === '') return; // 빈 입력값은 무시
    console.log('새 댓글:', newComment); // 실제 등록 로직 대체 가능
    setNewComment(''); // 입력 초기화
  };

  return (
    <div className="h-screen w-full bg-black text-white flex flex-col p-6 relative">
      {/* 상단 헤더 */}
      <h1 className="text-2xl font-bold text-orange-500 mb-6 text-left">Liverary</h1>

      {/* 동영상 영역 */}
      <div className="flex justify-center items-center flex-grow relative">
        <div className="w-[330px] h-[550px] rounded-lg overflow-hidden relative">
          <video className="w-full h-full object-cover" controls src="/final_clip(1).mp4">
            Your browser does not support the video tag.
          </video>

          {/* 텍스트 - 동영상 위 */}
          <p className="absolute bottom-16 left-4 text-sm text-gray-300 text-left whitespace-nowrap">
            한 줄, 세계에서 이 계절이 시작된다 🎈
          </p>

          {/* 하트 및 공유 버튼 - 동영상 위 */}
          <div className="absolute bottom-[100px] right-4 flex flex-col items-center space-y-4">
            <img src="wish.svg" className="w-8 h-8 cursor-pointer" alt="Like" />
            <img src="share.svg" className="w-8 h-8 cursor-pointer" alt="Share" />
          </div>
        </div>
      </div>

      {/* 댓글 입력란 - 슬라이딩 모달 */}
      <div
        className="fixed bottom-0 left-0 w-full bg-white p-4 rounded-t-lg shadow-lg transition-transform"
        style={{ transform: `translateY(${translateY}px)` }}
        onMouseDown={handleTouchStart}
        onMouseMove={handleTouchMove}
        onMouseUp={handleTouchEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}>
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-lg font-bold">댓글 입력</h2>
          <button
            onClick={() => {
              setTranslateY(0);
              setIsCommentOpen(false);
            }}
            className="text-gray-500 hover:text-gray-800 text-lg font-bold">
            ×
          </button>
        </div>
        <div className="flex items-center">
          <input
            type="text"
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            placeholder="댓글 추가"
            className="flex-1 border-b border-gray-300 p-2"
          />
          <button
            onClick={handleAddComment}
            className="ml-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
            등록
          </button>
        </div>
      </div>

      {/* 전체 댓글 창 */}
      {isCommentOpen && (
        <Comment
          onClose={() => {
            setTranslateY(0); // 댓글창 닫을 때 위치 초기화
            setIsCommentOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default SidePanelShort;
