import { useState } from 'react';

export default function MainBoard() {
  const [board, setBoard] = useState(false);

  return (
    <div>
      {/* 이미지, 비디오, 버튼 */}
      <div className="pt-20 bg-black min-h-screen relative">
        {/* 텍스트 및 이미지 섹션 */}
        <div className="text-white absolute flex flex-col right-10 md:right-16 lg:right-48 pt-12 md:pt-20 lg:pt-32">
          <h1 className="font-dm-serif text-4xl md:text-5xl lg:text-6xl pb-5">BEST SHORT</h1>
          <div className="flex flex-col lg:flex-row items-center">
            <img src="images/소년이온다표지.png" alt="전강판책표지" className="w-40 md:w-60 lg:w-[360px]" />
            <div className="flex flex-col items-center justify-center mt-5 lg:mt-0 lg:ml-10 text-center">
              <span className="text-lg md:text-xl font-myungjo">소년이 온다</span>
              <span className="text-lg md:text-xl font-myungjo">작가 한강</span>
              <div className="flex flex-col items-center justify-center text-center leading-none mt-4">
                <span className="text-xl md:text-2xl font-myungjo">"</span>
                <span className="text-lg md:text-xl lg:text-2xl font-myungjo">얼굴은 어떻게</span>
                <span className="text-lg md:text-xl lg:text-2xl font-myungjo">내면을 숨기는가,</span>
                <span className="text-lg md:text-xl lg:text-2xl font-myungjo">그녀는 생각한다.</span>
                <span className="text-lg md:text-xl lg:text-2xl font-myungjo">어떻게 무감각을,</span>
                <span className="text-lg md:text-xl lg:text-2xl font-myungjo">잔인성을, 살인을</span>
                <span className="text-lg md:text-xl lg:text-2xl font-myungjo">숨기는가.</span>
                <span className="text-xl md:text-2xl font-myungjo">"</span>
              </div>
            </div>
          </div>
        </div>

        {/* 전광판 및 비디오 섹션 */}
        <div
          className={`relative flex items-center justify-center transition-transform duration-500 ${
            board ? '-translate-x-3/4' : ''
          }`}>
          <img src={'New전광판2.png'} alt="전광판 이미지" className="w-full max-w-[1790px] h-auto lg:h-[856px]" />
          <video
            src={'video/final_clip.mp4'}
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 md:w-80 lg:w-[420px] h-auto rounded-lg shadow-lg bg-black py-4"
            controls
            autoPlay
            loop
            muted
          />
          <button
            className="absolute right-4 md:right-10 flex items-center justify-center rounded-full bg-[#0000004b] w-8 h-8 md:w-10 md:h-10 text-sm md:text-lg"
            onClick={() => {
              setBoard(!board);
            }}>
            {board === false ? ' ←' : '→'}
          </button>
        </div>
      </div>
      {/* -> 누르면 나오는 영역 */}
    </div>
  );
}
