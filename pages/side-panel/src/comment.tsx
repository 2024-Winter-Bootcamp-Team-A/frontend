import React, { useState, useEffect, useRef } from 'react';

interface CommentData {
  id: number;
  username: string;
  content: string;
}

interface CommentProps {
  onClose: () => void; // 댓글창 닫기 이벤트
}

const Comment: React.FC<CommentProps> = ({ onClose }) => {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newComment, setNewComment] = useState<string>(''); // 새로운 댓글 입력 상태
  const inputRef = useRef<HTMLInputElement>(null); // 입력 필드 포커스 관리

  useEffect(() => {
    // API 요청 시뮬레이션
    const fetchComments = async () => {
      try {
        setIsLoading(true);
        const response = await new Promise<CommentData[]>(resolve =>
          setTimeout(() => {
            resolve(
              Array(10)
                .fill(null)
                .map((_, index) => ({
                  id: index + 1,
                  username: `아이디 ${index + 1}`,
                  content: '가독성은 있으나 급하게 마무리 되는 느낌이라 아쉬워요..',
                })),
            );
          }, 1000),
        );
        setComments(response);
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, []);

  const handleAddComment = () => {
    if (newComment.trim() === '') return;

    const newCommentData: CommentData = {
      id: comments.length + 1,
      username: '나',
      content: newComment,
    };

    setComments([newCommentData, ...comments]);
    setNewComment('');
    inputRef.current?.focus();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end z-50">
      <div className="bg-white text-gray-900 rounded-t-lg shadow-lg w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
          ✕
        </button>
        <div className="w-full flex justify-between items-center border-b border-gray-300 pb-2">
          <h2 className="text-lg font-bold text-gray-800">댓글 {comments.length}개</h2>
          <div className="h-1 w-10 bg-gray-300 rounded-full"></div>
        </div>
        <div className="w-full my-4 flex items-center space-x-2">
          <input
            ref={inputRef}
            type="text"
            placeholder="댓글 추가"
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            className="flex-1 bg-gray-100 border-b border-gray-400 text-gray-800 py-2 px-2"
          />
          <button
            onClick={handleAddComment}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
            입력
          </button>
        </div>
        <div className="w-full overflow-y-auto space-y-4 max-h-[70vh]">
          {isLoading ? (
            <p className="text-center text-gray-500">댓글을 불러오는 중...</p>
          ) : (
            comments.map(comment => (
              <div key={comment.id} className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-500 rounded-full"></div>
                <div>
                  <p className="text-sm text-gray-500">{comment.username}</p>
                  <p>{comment.content}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
