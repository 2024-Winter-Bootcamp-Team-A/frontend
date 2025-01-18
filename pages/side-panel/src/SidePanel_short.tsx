import React, { useState } from 'react';

const SidePanelShort: React.FC = () => {
  const [isCommentOpen, setIsCommentOpen] = useState(false); // 전체 댓글 창 열림 상태
  const [newComment, setNewComment] = useState(''); // 댓글 입력 상태
  const [comments, setComments] = useState<{ user: string; text: string }[]>([]); // 댓글 목록 상태

  // 댓글 추가 핸들러
  const handleAddComment = () => {
    if (newComment.trim() === '') return; // 빈 입력값은 무시
    setComments(prevComments => [{ user: '나', text: newComment }, ...prevComments]);
    setNewComment(''); // 입력 초기화
  };

  // Enter 키 핸들러
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddComment();
    }
  };

  return (
    <div className="h-screen w-full bg-black text-white flex flex-col p-6 relative">
      {/* 상단 헤더 */}
      <h1 className="text-2xl font-bold text-orange-500 mb-6 text-left">Liverary</h1>

      {/* 동영상 영역 */}
      <div className="flex justify-center items-center flex-grow relative" style={{ marginBottom: '100px' }}>
        <div className="w-[400px] h-[650px] rounded-lg overflow-hidden relative">
          <video className="w-full h-full object-cover" controls src="/final_clip(1).mp4">
            Your browser does not support the video tag.
          </video>

          {/* 텍스트 - 동영상 위 */}
          <p className="absolute bottom-16 left-4 text-sm text-gray-300 text-left whitespace-nowrap">
            한 줄, 세계에서 이 계절이 시작된다
          </p>

          {/* 아이콘 섹션 */}
          <div className="absolute bottom-20 right-4 flex flex-col items-center space-y-4">
            <div className="relative group">
              <button className="w-8 h-8" aria-label="Add to wishlist">
                <img src="wish.svg" alt="Wish" className="w-full h-full" />
              </button>
              <span className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                찜하기
              </span>
            </div>
            <div className="relative group">
              <button className="w-8 h-8" aria-label="Share video">
                <img src="share.svg" alt="Share" className="w-full h-full" />
              </button>
              <span className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                공유하기
              </span>
            </div>
            <div className="relative group">
              <button
                className="w-8 h-8"
                aria-label="Open comments"
                onClick={() => setIsCommentOpen(prev => !prev)} // 댓글창 토글
              >
                <img src="comment.svg" alt="Comment" className="w-full h-full" />
              </button>
              <span className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                댓글창열기
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 댓글 입력란 - 기본 하단 */}
      <div className="fixed bottom-0 left-0 w-full bg-white p-4 rounded-t-lg shadow-lg">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-lg font-bold text-black">댓글 {comments.length}개</h2>
        </div>
        <div className="flex items-center">
          <input
            type="text"
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="댓글 추가"
            className="flex-1 bg-gray-100 p-2 text-black rounded"
          />
          <button
            onClick={handleAddComment}
            className="ml-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
            등록
          </button>
        </div>
      </div>

      {/* 전체 댓글 리스트 */}
      {isCommentOpen && (
        <div
          className="fixed bottom-0 left-0 w-full h-3/4 bg-white p-4 rounded-t-lg shadow-lg overflow-y-auto transition-transform duration-500 ease-in-out"
          style={{ transform: isCommentOpen ? 'translateY(0)' : 'translateY(100%)' }}>
          <div className="flex justify-between items-center border-b pb-2 mb-4">
            <h2 className="text-lg font-bold text-black">댓글 {comments.length}개</h2>
            <button
              onClick={() => setIsCommentOpen(false)}
              className="text-gray-500 hover:text-gray-800 text-lg font-bold">
              ×
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center mb-4">
              <input
                type="text"
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="댓글 추가"
                className="flex-1 bg-gray-100 p-2 text-black rounded"
              />
              <button
                onClick={handleAddComment}
                className="ml-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
                등록
              </button>
            </div>
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={index} className="p-2 border-b border-gray-200">
                  <p className="text-gray-800 font-bold">{comment.user}</p>
                  <p className="text-gray-800">{comment.text}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">아직 댓글이 없습니다. 첫 댓글을 남겨보세요!</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SidePanelShort;
