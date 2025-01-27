import React from 'react';
import { Link } from 'react-router-dom';
import { MakeShorts } from './API/MakeShorts';
interface RequestShortProps {
  currentURL: string | null;
}
const Request_short: React.FC<RequestShortProps> = ({ currentURL }) => {
  const handleMaking = async () => {
    if (!currentURL) {
      console.log(currentURL);
      alert('URL이 없습니다. 다시 시도해주세요.');
      return;
    }

    try {
      const result = await MakeShorts(currentURL); // MakeShorts 함수 호출
      console.log('MakeShorts 결과:', result);
      alert('책 저장 및 숏츠 생성 요청이 완료되었습니다.');
      window.close();
    } catch (error: any) {
      alert(error.message || '요청 처리 중 오류가 발생했습니다.');
      console.error('MakeShorts 오류:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-[330px] h-[550px] bg-gradient-to-b from-white to-gray-300 border border-gray-300 rounded-lg shadow-md overflow-hidden">
        <button
          onClick={() => {
            chrome.tabs.create({});
          }}
          className="text-orange-500 text-center text-xl mt-8 font-bold">
          Liverary
        </button>
        <div className="text-black p-5 m-5 rounded-md text-center mt-16">
          <p className="text-xl leading-relaxed">
            아직 이 도서는 <br />
            생성된 숏츠가 없습니다.
            <br />
            당신의 요청 한마디로 쇼츠의 <br />
            마법이 시작 될 거예요! <br />
            1분 내에 완성됩니다!! 확인 완료 창이 뜰때까지 조금 기다려주세요!
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
            다른 즐거리 구경하러 가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Request_short;
