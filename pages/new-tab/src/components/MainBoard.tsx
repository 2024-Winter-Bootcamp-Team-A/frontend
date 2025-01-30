import React from 'react';

export default function MainBoard() {
  return (
    <div>
      {/* 이미지, 비디오, 버튼 */}
      <div className="pt-28 bg-black min-h-screen relative">
        {/* 텍스트 섹션 */}
        <div className="absolute left-10 right-[40%] top-[30%] text-white z-10 flex flex-col items-center space-y-4">
          {/* BEST SHORT */}
          <h1 className="text-3xl md:text-2lg lg:text-4xl text-center font-dm-serif mb-10">BEST SHORT</h1>

          {/* 소년이 온다 및 인용문 */}
          <div className="text-lg md:text-xl text-center mt-5 font-myungjo">
            <p className="mb-10 font-bold">세상의 마지막 기차역</p>
            <p className="mb-12">작가 무라세 다케시</p>
            <div className="leading-relaxed space-y-2">
              <p>"</p>
              <p>만약 그 사람을</p>
              <p>한 번 더 만날 수 있다면</p>
              <p>어떻게 할래요?</p>
              <p>"</p>
            </div>
          </div>
        </div>

        {/* 전광판 및 비디오 섹션 */}
        <div className="flex items-center justify-center z-0">
          <img src={'길거리 배경.png'} alt="전광판 이미지" className="w-full max-w-[1790px] h-[700px]" />
          <video
            src={'final.mp4'}
            className="absolute left-[77%] top-[60%] transform -translate-x-1/2 -translate-y-1/2 w-60 md:w-80 lg:w-[400px] aspect-[5/8] rounded-lg shadow-lg bg-black py-4"
            controls
            autoPlay
            loop
            muted
          />
        </div>
      </div>
    </div>
  );
}
