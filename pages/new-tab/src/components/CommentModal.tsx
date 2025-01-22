import React, { useState, useEffect, useRef } from 'react';

interface CommentData {
  id: number;
  username: string;
  content: string;
}

interface CommentModalProps {
  onClose: () => void; // 모달 닫기 함수 정의
  bookId: number; // 책 ID를 prop으로 받아옴
}

const CommentModal: React.FC<CommentModalProps> = ({ onClose, bookId }) => {
  const [comments, setComments] = useState<CommentData[]>([]); // 댓글 리스트 상태
  const [newComment, setNewComment] = useState<string>(''); // 새로운 댓글 입력 상태
  const inputRef = useRef<HTMLInputElement>(null); // 입력 필드 포커스 관리

  // 댓글 조회 함수
  const fetchComments = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/shorts/${bookId}/comments`);
      if (response.ok) {
        const data = await response.json();
        setComments(data); // 댓글 데이터를 상태에 저장
        console.log('댓글 목록:', data); // 댓글 목록을 콘솔에 출력
      } else {
        console.error('댓글 조회 실패');
      }
    } catch (error) {
      console.error('댓글 조회 중 오류 발생:', error);
    }
  };

  // 댓글 추가 함수
  const addComment = async () => {
    if (newComment.trim() === '') return;

    try {
      const response = await fetch(`http://localhost:8000/api/v1/shorts/${bookId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newComment }),
      });

      if (response.ok) {
        fetchComments(); // 댓글 추가 후 최신 댓글 목록을 불러옴
        setNewComment(''); // 입력 필드 초기화
      } else {
        console.error('댓글 추가 실패');
      }
    } catch (error) {
      console.error('댓글 추가 중 오류 발생:', error);
    }
  };

  // Enter 키 핸들러
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addComment(); // Enter 키로 댓글 추가
    }
  };

  // 댓글 목록을 처음부터 불러옵니다.
  useEffect(() => {
    fetchComments();
  }, [bookId]);

  return (
    <div className="bg-white w-full h-full p-4 rounded-lg shadow-lg flex flex-col">
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <h2 className="text-lg font-bold">댓글 {comments.length}개</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
          ×
        </button>
      </div>

      {/* 댓글 입력창 */}
      <div className="flex items-center mb-4">
        <input
          ref={inputRef}
          type="text"
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
          onKeyPress={handleKeyPress} // Enter 키로 댓글 추가
          placeholder="댓글 추가"
          className="flex-1 border-b  bg-gray-100 border-none border-gray-300 p-2"
        />
        <button onClick={addComment} className="ml-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
          등록
        </button>
      </div>

      {/* 댓글 리스트 */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {comments.length > 0 ? (
          comments.map(comment => (
            <div key={comment.id} className="p-2 border-b border-gray-200">
              <p className="font-bold">{comment.username}</p>
              <p>{comment.content}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">아직 댓글이 없습니다. 첫 댓글을 남겨보세요!</p>
        )}
      </div>
    </div>
  );
};

export default CommentModal;
