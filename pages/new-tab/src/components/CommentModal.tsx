import React, { useState, useEffect, useRef } from 'react';

interface CommentData {
  id: number;
  username: string;
  content: string;
}

interface CommentModalProps {
  onClose: () => void; // 모달 닫기 함수 정의
}

const CommentModal: React.FC<CommentModalProps> = ({ onClose }) => {
  const [comments, setComments] = useState<CommentData[]>([]); // 댓글 리스트 상태
  const [newComment, setNewComment] = useState<string>(''); // 새로운 댓글 입력 상태
  const inputRef = useRef<HTMLInputElement>(null); // 입력 필드 포커스 관리

  // API를 통해 기존 댓글 가져오기
  useEffect(() => {
    const fetchComments = async () => {
      try {
        // 예시 API 호출
        const response = await new Promise<CommentData[]>(resolve =>
          setTimeout(() => {
            resolve(
              Array(5)
                .fill(null)
                .map((_, index) => ({
                  id: index + 1,
                  username: '사용자',
                  content: `기존 댓글 내용 ${index + 1}`,
                })),
            );
          }, 1000),
        );
        setComments(response);
      } catch (error) {
        console.error('댓글을 불러오는 데 실패했습니다:', error);
      }
    };

    fetchComments();
  }, []);

  // 댓글 추가 핸들러
  const handleAddComment = () => {
    if (newComment.trim() === '') return;

    // 새로운 댓글 추가
    const newCommentData: CommentData = {
      id: comments.length + 1, // 새로운 댓글 ID
      username: '나', // 댓글 작성자는 '나'로 고정
      content: newComment,
    };

    setComments([newCommentData, ...comments]); // 기존 댓글에 새 댓글 추가
    setNewComment(''); // 입력 필드 초기화
    inputRef.current?.focus(); // 입력 필드에 포커스 유지
  };

  // Enter 키 핸들러
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddComment();
    }
  };

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
        <button
          onClick={handleAddComment}
          className="ml-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
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
