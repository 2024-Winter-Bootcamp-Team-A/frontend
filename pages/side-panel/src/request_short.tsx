import React, { useState } from 'react';
import { MakeShorts } from './API/MakeShorts';
import LoadingModal from './LoadingModal';

interface RequestShortProps {
  currentURL: string | null;
}

const Request_short: React.FC<RequestShortProps> = ({ currentURL }) => {
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태

  // "영상 만들기" 버튼 클릭 시
  const handleMaking = async () => {
    if (!currentURL) {
      alert('URL이 없습니다. 다시 시도해주세요.');
      return;
    }

    console.log('📢 쇼츠 생성 요청 시작');
    setIsLoading(true); // 로딩 시작

    try {
      await MakeShorts(currentURL); // 쇼츠 생성 요청
      console.log('✅ 쇼츠 생성 완료');

      // 쇼츠 생성 완료 알람 후 자동 새로고침
      setTimeout(() => {
        alert('쇼츠 생성이 완료되었습니다.');
        window.location.reload(); // 새로고침
      }, 1000); // 1초 후 새로고침
    } catch (error) {
      console.log('⚠️ 쇼츠 생성 실패 (무시하고 새로고침)');
      setTimeout(() => {
        window.location.reload(); // 오류가 있어도 무조건 새로고침
      }, 1000);
    }
  };

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
