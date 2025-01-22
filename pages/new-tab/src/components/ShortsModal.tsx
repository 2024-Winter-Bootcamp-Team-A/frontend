import React, { useState, useEffect } from 'react';
import CommentModal from './CommentModal'; // CommentModal 컴포넌트 가져오기

interface ShortsModalProps {
  onClose: () => void; // 모달 닫기 함수
  bookId: number; // 책 ID를 prop으로 받아옴
}

const ShortsModal: React.FC<ShortsModalProps> = ({ onClose, bookId }) => {
  const [isFlipped, setIsFlipped] = useState(false); // 카드 회전 상태
  const [isCommentVisible, setIsCommentVisible] = useState(false); // 댓글창 상태
  const [shortsData, setShortsData] = useState<{ videoUrl: string; title: string; bookUrl: string } | null>(null); // 숏츠 데이터 상태
  const [detailData, setDetailData] = useState<{
    views: number;
    wishes: number;
    shares: number;
    visits: number;
    quote: string;
  } | null>(null); // 상세 정보 데이터 상태

  // 숏츠 API 데이터 가져오기
  useEffect(() => {
    const fetchShortsData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/shorts/${bookId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch shorts data');
        }
        const data = await response.json();
        console.log('Shorts Data Fetched:', data);
        setShortsData({ videoUrl: data.storage_url, title: data.title, bookUrl: data.book_url }); // API 응답 수정
      } catch (error) {
        console.error('Error fetching shorts data:', error);
      }
    };

    fetchShortsData();
  }, [bookId]);

  // 설명창 데이터 가져오기
  useEffect(() => {
    const fetchDetailData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/shorts/${bookId}/detail`);
        if (!response.ok) {
          throw new Error('Failed to fetch detail data');
        }
        const data = await response.json();
        console.log('Detail Data Fetched:', data);
        setDetailData({
          views: data.views,
          wishes: data.wishes,
          shares: data.shares,
          visits: data.visits,
          quote: data.quote,
        });
      } catch (error) {
        console.error('Error fetching detail data:', error);
      }
    };

    if (isFlipped) {
      fetchDetailData(); // 카드가 뒤집힐 때만 호출
    }
  }, [bookId, isFlipped]);

  const handleVideoEnd = () => {
    console.log('쇼츠 재생 완료.');
  };

  const handleBookRedirect = () => {
    if (shortsData?.bookUrl) {
      window.location.href = shortsData.bookUrl; // 도서 페이지로 이동
    } else {
      console.error('Book URL not available.');
    }
  };

  return (
    <div
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
          {!isFlipped && shortsData && (
            <div
              className="absolute w-full h-full bg-black rounded-lg"
              style={{
                backfaceVisibility: 'hidden',
              }}>
              <video className="w-full h-full" controls autoPlay muted onEnded={handleVideoEnd}>
                <source src={shortsData.videoUrl || '/fallback-video.mp4'} type="video/mp4" />
              </video>
            </div>
          )}

          {/* 뒷면: 기본 정보 */}
          {isFlipped && detailData && (
            <div
              className="absolute w-full h-full bg-white rounded-lg flex flex-col p-6"
              style={{
                transform: 'rotateY(180deg)',
                backfaceVisibility: 'hidden',
              }}>
              {/* 책 제목 */}
              <h3 className="text-lg font-bold text-gray-800 mb-6">{shortsData?.title}</h3>

              {/* 최상단: 기본 정보 */}
              <div className="w-full flex justify-between items-center border border-orange-500 rounded-full py-2 px-4 text-center text-sm text-gray-700 mb-4">
                <div>
                  <p>Views</p>
                  <p className="text-orange-500 font-bold">{detailData.views}</p>
                </div>
                <div>
                  <p>Wishes</p>
                  <p className="text-orange-500 font-bold">{detailData.wishes}</p>
                </div>
                <div>
                  <p>Shares</p>
                  <p className="text-orange-500 font-bold">{detailData.shares}</p>
                </div>
                <div>
                  <p>Book Visits</p>
                  <p className="text-orange-500 font-bold">{detailData.visits}</p>
                </div>
              </div>

              {/* 중앙: 문구 */}
              <blockquote className="text-center text-gray-600 italic text-xl leading-relaxed flex-grow flex items-center justify-center">
                "{detailData.quote}"
              </blockquote>

              {/* 하단: 도서페이지로 이동 버튼 */}
              <div className="w-full flex justify-center mt-4">
                <button
                  className="px-6 py-2 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 shadow-lg transition-all"
                  onClick={handleBookRedirect}>
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

        {/* 아이콘 섹션 */}
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
    </div>
  );
};

export default ShortsModal;
