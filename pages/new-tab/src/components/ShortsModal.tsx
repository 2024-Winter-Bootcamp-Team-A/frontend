import React, { useState, useEffect } from 'react';
// import axios from 'axios';

interface ShortsModalProps {
  onClose: () => void; // 모달 닫기 함수 정의
  bookId: number; // 숏츠의 ID
}

const ShortsModal: React.FC<ShortsModalProps> = ({ onClose, bookId }) => {
  const [isFlipped, setIsFlipped] = useState(false); // 카드 회전 상태
  const [isCommentVisible, setIsCommentVisible] = useState(false); // 댓글창 상태
  const [videoData, setVideoData] = useState<any>(null); // 동영상 데이터
  const [comments, setComments] = useState<string[]>([]); // 댓글 리스트 상태
  const [newComment, setNewComment] = useState(''); // 새 댓글 입력값 상태

  // 동영상 데이터 로드
  //   useEffect(() => {
  //     axios
  //       .get(`http://localhost:8000/api/v1/shorts/${bookId}/individual`)
  //       .then(response => {
  //         setVideoData(response.data); // API에서 가져온 동영상 데이터
  //       })
  //       .catch(error => {
  //         console.error('Failed to fetch video data:', error);
  //       });
  //   }, [bookId]);

  //   // 댓글 리스트 가져오기
  //   useEffect(() => {
  //     if (isCommentVisible) {
  //       axios
  //         .get(`http://localhost:8000/api/v1/shorts/${bookId}/comments`)
  //         .then(response => {
  //           setComments(response.data); // API에서 가져온 댓글 데이터
  //         })
  //         .catch(error => {
  //           console.error('Failed to fetch comments:', error);
  //         });
  //     }
  //   }, [isCommentVisible, bookId]);

  // 댓글 생성하기
  const handleAddComment = () => {
    if (!newComment.trim()) return; // 빈 댓글 방지
    axios
      .post(`http://localhost:8000/api/v1/shorts/${bookId}/comments`, {
        content: newComment,
      })
      .then(response => {
        setComments(prevComments => [...prevComments, response.data]); // 새로운 댓글 추가
        setNewComment(''); // 입력값 초기화
      })
      .catch(error => {
        console.error('Failed to add comment:', error);
      });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
      onClick={onClose} // 모달 배경 클릭 시 모달 닫기
    >
      {/* 모달 컨테이너 */}
      <div
        className={`relative flex transition-transform duration-500`}
        style={{
          width: isCommentVisible ? '800px' : '400px', // 댓글창 열리면 전체 너비 조정
          height: '680px',
        }}
        onClick={e => e.stopPropagation()} // 모달 내부 클릭 시 이벤트 전파 방지
      >
        {/* 동영상 카드 */}
        <div
          className={`relative bg-white rounded-lg shadow-lg transition-transform duration-500`}
          style={{
            width: '400px',
            height: '100%',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            transformStyle: 'preserve-3d',
            perspective: '1000px',
          }}>
          {/* 동영상 화면 */}
          {!isFlipped && videoData && (
            <div
              className="absolute w-full h-full bg-black rounded-lg"
              style={{
                backfaceVisibility: 'hidden',
              }}>
              <video className="w-full h-full" controls autoPlay muted>
                <source src={videoData.video_url} type="video/mp4" />
              </video>
            </div>
          )}

          {/* 댓글창 */}
          {isCommentVisible && (
            <div
              className="absolute bg-white w-[400px] h-full shadow-lg rounded-r-lg z-10"
              style={{
                right: '0',
              }}
              onClick={e => e.stopPropagation()} // 댓글창 클릭 시 이벤트 전파 방지
            >
              <div className="p-4">
                <h2 className="text-lg font-bold">Comments</h2>
                <ul className="my-4 space-y-2">
                  {comments.map((comment, index) => (
                    <li key={index} className="border-b pb-2">
                      {comment}
                    </li>
                  ))}
                </ul>
                <textarea
                  className="w-full p-2 border rounded mb-2"
                  rows={3}
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                />
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={handleAddComment}>
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShortsModal;
