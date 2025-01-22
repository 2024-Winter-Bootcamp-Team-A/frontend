
import React, { useState, useEffect } from 'react';
// import axios from 'axios';

interface ShortsModalProps {
  onClose: () => void; // 모달 닫기 함수 정의
  bookId: number | null; // 숏츠의 ID

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
    // if (!newComment.trim()) return; // 빈 댓글 방지
    // axios
    //   .post(`http://localhost:8000/api/v1/shorts/${bookId}/comments`, {
    //     content: newComment,
    //   })
    //   .then(response => {
    //     setComments(prevComments => [...prevComments, response.data]); // 새로운 댓글 추가
    //     setNewComment(''); // 입력값 초기화
    //   })
    //   .catch(error => {
    //     console.error('Failed to add comment:', error);
    //   });
  };


  return (
    <button
      className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
      onClick={onClose} // 모달 배경 클릭 시 모달 닫기
    >
      {/* 카드 플립 버튼 */}
      <div
        className="absolute top-10 flex justify-center w-full"
        onClick={e => e.stopPropagation()} // 버튼 클릭 시 이벤트 전파 방지
      >
        <button
          className="px-6 py-2 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 shadow-lg transition-all"
          onClick={() => setIsFlipped(!isFlipped)}>
          {isFlipped ? 'Back to Video' : 'Show Info'}
        </button>
      </div>

      {/* 모달 컨테이너 */}
      <div
        className={`relative flex transition-transform duration-500`}
        style={{
          width: isCommentVisible ? '800px' : '400px', // 댓글창 열리면 전체 너비 조정
          height: '680px',
        }}
        onClick={e => e.stopPropagation()} // 모달 내부 클릭 시 이벤트 전파 방지
      >
        {/* 비디오/기본 정보 모달 */}
        <div
          className={`relative bg-white rounded-lg shadow-lg transition-transform duration-500`}
          style={{
            width: '400px',
            height: '100%',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            transformStyle: 'preserve-3d',
            perspective: '1000px',
          }}>
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
            </div>
          )}

          {/* 뒷면: 기본 정보 */}
          {isFlipped && (
            <div
              className="absolute w-full h-full bg-white rounded-lg flex flex-col p-6"
              style={{
                transform: 'rotateY(180deg)',
                backfaceVisibility: 'hidden',
              }}>
              {/* 책 제목 */}
              <h3 className="text-lg font-bold text-gray-800 mb-6">너의 이름은</h3>

              {/* 최상단: 기본 정보 */}
              <div className="w-full flex justify-between items-center border border-orange-500 rounded-full py-2 px-4 text-center text-sm text-gray-700 mb-4">
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

              {/* 중앙: 문구 */}
              <blockquote className="text-center text-gray-600 italic text-xl leading-relaxed flex-grow flex items-center justify-center">
                "눈처럼 가볍다고 사람들은 말한다.
                <br /> 그러나 눈에도 무게가 있다. <br /> 이 물방울처럼"
              </blockquote>

              {/* 하단: 도서페이지로 이동 버튼 */}
              <div className="w-full flex justify-center mt-4">
                <button className="px-6 py-2 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 shadow-lg transition-all">
                  도서페이지로 이동
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 댓글창 */}
        {isCommentVisible && (
          <div
            className="absolute bg-white w-[400px] h-full shadow-lg rounded-r-lg z-10"
            style={{
              right: '0',
            }}
            onClick={e => e.stopPropagation()} // 댓글창 클릭 시 이벤트 전파 방지
          >
            <CommentModal
              bookId={bookId} // 책 ID 전달
              onClose={() => setIsCommentVisible(false)} // 댓글창 닫기
            />
          </div>
        )}

        {/* 아이콘 섹션 (모달 컨테이너의 오른쪽) */}
        <div
          className="absolute flex flex-col items-center space-y-4"
          style={{
            right: isCommentVisible ? '400px' : '-50px', // 댓글창이 열리면 댓글창의 오른쪽에 위치
            top: '88%',
            transform: 'translateY(-50%)',
          }}
          onClick={e => e.stopPropagation()} // 아이콘 클릭 시 이벤트 전파 방지
        >
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
      </div>
    </button>
  );
};

export default ShortsModal;
