import React, { useState, useEffect } from 'react';
import CommentModal from './CommentModal'; // CommentModal 컴포넌트 가져오기

interface ShortsModalProps {
  onClose: () => void; // 모달 닫기 함수 정의
  bookId: number | null; // 숏츠의 ID
}

const ShortsModal: React.FC<ShortsModalProps> = ({ onClose, bookId }) => {
  const [isFlipped, setIsFlipped] = useState(false); // 카드 회전 상태
  const [isCommentVisible, setIsCommentVisible] = useState(false); // 댓글창 상태
  const [shortsData, setShortsData] = useState<{
    videoUrl: string;
    title: string;
    bookUrl: string;
    isWished: boolean;
  } | null>(null); // 숏츠 데이터 상태
  const [detailData, setDetailData] = useState<{
    views: number;
    wishes: number;
    shares: number;
    visits: number;
    quote: string;
  } | null>(null); // 상세 정보 데이터 상태
  const [isWished, setIsWished] = useState(false); // 찜하기 상태

  // 숏츠 API 데이터 가져오기
  useEffect(() => {
    const fetchShortsData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/shorts/${bookId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch shorts data');
        }
        const data = await response.json();
        setShortsData({
          videoUrl: data.storage_url,
          title: data.title,
          bookUrl: data.book_url,
          isWished: data.isWished,
        });
        setIsWished(data.isWished); // 초기 찜하기 상태 설정
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
        setDetailData({
          views: data.views || 0,
          wishes: data.wishes || 0,
          shares: data.shares || 0,
          visits: data.book_visits || 0, // visits가 숫자가 아니면 0으로 설정
          quote: data.key_sentence || '',
        });
      } catch (error) {
        console.error('Error fetching detail data:', error);
      }
    };

    fetchDetailData(); // 항상 최신 데이터 가져오기
  }, [bookId, isFlipped]);

  // 찜하기 상태 전환
  const toggleWish = async () => {
    const url = `http://localhost:8000/api/v1/shorts/${bookId}/wishes`;
    try {
      const response = await fetch(url, {
        method: isWished ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to toggle wish status: ${errorMessage}`);
      }

      setIsWished(!isWished); // 요청 성공 시 상태 반전
      console.log(isWished ? '찜하기 취소' : '찜하기');
    } catch (error) {
      console.error('Error toggling wish status:', error);
      alert('찜하기 상태를 변경하는 데 실패했습니다.');
    }
  };

  // 도서 페이지 방문 수 증가 API 호출
  const incrementVisitCount = async () => {
    const url = `http://localhost:8000/api/v1/shorts/${bookId}/visit`;
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error('Failed to increment visit count');
      }

      const responseData = await response.json(); // 서버에서 반환된 데이터 확인
      console.log('Response Data:', responseData);

      setDetailData(prevData => {
        if (prevData) {
          return { ...prevData, visits: responseData.visits || prevData.visits + 1 }; // 서버 값으로 업데이트
        }
        return prevData;
      });
    } catch (error) {
      console.error('Error incrementing visit count:', error);
    }
  };

  // 도서 페이지로 이동하는 로직
  const handleBookRedirect = async () => {
    await incrementVisitCount(); // 방문 수 증가 API 호출
    if (shortsData?.bookUrl) {
      console.log(`Redirecting to: ${shortsData.bookUrl}`);
      window.open(shortsData.bookUrl, '_blank');
    } else {
      console.error('Book URL not available.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50" onClick={onClose}>
      <div className="absolute top-10 flex justify-center w-full" onClick={e => e.stopPropagation()}>
        <button
          className="px-6 py-2 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 shadow-lg transition-all"
          onClick={() => setIsFlipped(!isFlipped)}>
          {isFlipped ? 'Back to Video' : 'Show Info'}
        </button>
      </div>

      <div
        className={`relative flex transition-transform duration-500`}
        style={{ width: isCommentVisible ? '800px' : '400px', height: '680px' }}
        onClick={e => e.stopPropagation()}>
        <div
          className={`relative bg-white rounded-lg shadow-lg transition-transform duration-500`}
          style={{
            width: '400px',
            height: '100%',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            transformStyle: 'preserve-3d',
            perspective: '1000px',
          }}>
          {!isFlipped && shortsData && (
            <div className="absolute w-full h-full bg-black rounded-lg" style={{ backfaceVisibility: 'hidden' }}>
              <video className="w-full h-full" controls autoPlay muted>
                <source src={shortsData.videoUrl || '/fallback-video.mp4'} type="video/mp4" />
              </video>
            </div>
          )}

          {isFlipped && detailData && (
            <div
              className="absolute w-full h-full bg-white rounded-lg flex flex-col p-6"
              style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}>
              <h3 className="text-lg font-bold text-gray-800 mb-6">{shortsData?.title}</h3>

              <div className="w-full flex justify-between items-center border border-orange-500 rounded-full py-2 px-4 text-center text-sm text-gray-700 mb-4">
                <div>
                  <p>Views</p>
                  <p className="text-orange-500 font-bold">{detailData?.views}</p>
                </div>
                <div>
                  <p>Wishes</p>
                  <p className="text-orange-500 font-bold">{detailData?.wishes}</p>
                </div>
                <div>
                  <p>Shares</p>
                  <p className="text-orange-500 font-bold">{detailData?.shares}</p>
                </div>
                <div>
                  <p>Book Visits</p>
                  <p className="text-orange-500 font-bold">{detailData?.visits || 0}</p>
                </div>
              </div>

              <blockquote className="text-center text-gray-600 italic text-xl leading-relaxed flex-grow flex items-center justify-center">
                "{detailData?.quote}"
              </blockquote>

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

        {isCommentVisible && (
          <div
            className="absolute bg-white w-[400px] h-full shadow-lg rounded-r-lg z-10"
            style={{ right: '0' }}
            onClick={e => e.stopPropagation()}>
            <CommentModal bookId={bookId} onClose={() => setIsCommentVisible(false)} />
          </div>
        )}

        <div
          className="absolute flex flex-col items-center space-y-4"
          style={{ right: isCommentVisible ? '-40px' : '-50px', top: '88%', transform: 'translateY(-50%)' }}
          onClick={e => e.stopPropagation()}>
          <button className="w-8 h-8" aria-label="Add to wishlist" onClick={toggleWish}>
            <img src={isWished ? 'nowish.svg' : 'wish.svg'} alt="Wish" className="w-full h-full" />
          </button>
          <button className="w-8 h-8" aria-label="Share video">
            <img src="share.svg" alt="Share" className="w-full h-full" />
          </button>
          <button className="w-8 h-8" aria-label="Open comments" onClick={() => setIsCommentVisible(true)}>
            <img src="comment.svg" alt="Comment" className="w-full h-full" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShortsModal;
