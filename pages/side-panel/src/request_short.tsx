import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MakeShorts } from './API/MakeShorts';
import LoadingModal from './LoadingModal';

interface RequestShortProps {
  currentURL: string | null;
}

const Request_short: React.FC<RequestShortProps> = ({ currentURL }) => {
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [storage_url, setStorage_url] = useState<string | null>(null); // 쇼츠 영상 URL
  const [title, setTitle] = useState<string>(''); // 책 제목
  const [bookId, setBookId] = useState<number>(0); // 책 ID
  const [is_wish, setIs_wish] = useState<boolean>(false); // 찜 상태
  const [BookImg, setBookImg] = useState<string | undefined>(undefined); // 책 이미지
  const navigate = useNavigate();

  // API 호출: 현재 URL 기반으로 숏츠 데이터 확인
  const fetchShortsData = async (url: string) => {
    try {
      console.log(`📡 숏츠 데이터 확인: ${url}`);

      const response = await fetch(`http://localhost:8000/api/v1/shorts/side?book_url=${encodeURIComponent(url)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log('✅ 기존 숏츠 데이터 있음:', data);
        setStorage_url(data.storage_url || null);
        setTitle(data.title || '');
        setBookId(data.book_id || 0);
        setIs_wish(data.is_wish || false);
        setBookImg(data.image || null);
      } else {
        console.log('🚫 기존 숏츠 없음, 새로 생성해야 함.');
        setStorage_url(null);
      }
    } catch (error) {
      console.error('❌ 숏츠 데이터 확인 중 오류 발생:', error);
      setStorage_url(null);
    }
  };

  // "영상 만들기" 버튼 클릭 시
  const handleMaking = async () => {
    if (!currentURL) {
      alert('URL이 없습니다. 다시 시도해주세요.');
      return;
    }

    console.log('📢 쇼츠 요청 시작');
    setIsLoading(true);

    try {
      const result = await MakeShorts(currentURL); // 쇼츠 생성 요청
      console.log('✅ 쇼츠 요청 완료:', result);

      if (result?.shorts?.data?.videoUrl) {
        console.log('🎬 쇼츠 생성 완료:', result.shorts.data.videoUrl);

        // 쇼츠 정보 저장 후 이동
        setStorage_url(result.shorts.data.videoUrl);
        setTitle(result.book.title);
        setBookId(result.book.id);
        setIs_wish(result.book.is_wish);
        setBookImg(result.book.image);

        setTimeout(() => {
          setIsLoading(false);
          navigate('/shorts', {
            state: {
              storage_url: result.shorts.data.videoUrl,
              title: result.book.title,
              bookId: result.book.id,
              is_wish: result.book.is_wish,
              BookImg: result.book.image,
            },
          });
        }, 1000); // 1초 후 이동
      } else {
        throw new Error('쇼츠 생성 실패: 응답 데이터 없음');
      }
    } catch (error: any) {
      alert(error.message || '쇼츠 생성 중 오류가 발생했습니다.');
      console.error('❌ 쇼츠 요청 오류:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!currentURL) return;

    fetchShortsData(currentURL); // 현재 URL 기반 숏츠 데이터 확인
  }, [currentURL]);

  // 기존 숏츠가 있는 경우 자동 이동
  useEffect(() => {
    if (storage_url) {
      console.log('🚀 기존 쇼츠 페이지로 이동:', storage_url);
      navigate('/shorts', { state: { storage_url, title, bookId, is_wish, BookImg } });
    }
  }, [storage_url, navigate]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-800 relative">
      {/* 로딩 모달 */}
      <LoadingModal isOpen={isLoading} />

      {/* 로고 */}
      <button
        onClick={() => {
          chrome.tabs.create({});
        }}
        className="absolute top-4 left-4 text-orange-500 text-2xl font-bold z-10">
        <img src="북클립글자.png" alt="Logo" className="w-[120px] h-[60px] pl-2 pt-2" />
      </button>

      {/* 카드 상자 */}
      <div className="w-[330px] h-[550px] bg-black border border-black rounded-lg shadow-md overflow-hidden">
        <div className="text-white p-5 m-5 rounded-md text-center mt-16">
          <p className="text-xl leading-relaxed">
            아직 이 도서는 <br />
            생성된 숏츠가 없습니다.
            <br />
            <br />
            당신의 요청 한마디로 쇼츠의 <br />
            마법이 시작될 거예요! <br />
            <br />
            잠시만 기다려주세요!
          </p>
        </div>
        <div className="flex flex-col items-center mt-8">
          <button
            className="bg-white text-black border border-gray-300 rounded-2xl px-4 py-2 mb-3 hover:bg-orange-500 hover:text-white transition-all"
            onClick={handleMaking}>
            영상 만들기
          </button>
          <button
            className="bg-white text-black border border-gray-300 rounded-2xl px-4 py-2 hover:bg-orange-500 hover:text-white transition-all"
            onClick={() => {
              chrome.tabs.create({});
            }}>
            줄거리 보러 가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Request_short;
