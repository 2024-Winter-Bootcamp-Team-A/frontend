import { useState } from 'react';
export default function MainBoard() {
  const [board, setBoard] = useState(true);
  return (
    <div>
      {/* 이미지, 비디오, 버튼 */}
      <div className="pt-40 bg-black h-1124px relative ">
        <div className="text-white absolute flex  flex-col right-60 pt-32 ">
          <h1 className="font-dm-serif text-6xl pb-5">BEST SHORT</h1>
          <div className="flex">
            <img src="images/소년이온다표지.png" alt="전강판책표지" className="w-[360px]"></img>
            <div className="flex flex-col items-center justify-center ml-10">
              <span className="text-xl font-myungjo">소년이 온다</span>
              <br />
              <span className="text-xl font-myungjo">작가 한강</span>
              <br />
              <div className="flex flex-col items-center justify-center text-center leading-none">
                <span className="text-2xl font-myungjo">"</span> <br />
                <span className="text-2xl font-myungjo">얼굴은 어떻게</span> <br />{' '}
                <span className="text-2xl font-myungjo">내면을 숨기는가, </span>
                <br /> <span className="text-2xl font-myungjo">그녀는 생각한다. </span>
                <br /> <span className="text-2xl font-myungjo">어떻게 무감각을, </span>
                <br /> <span className="text-2xl font-myungjo">잔인성을, 살인을 </span>
                <br />
                <span className="text-2xl font-myungjo">숨기는가.</span>
                <br />
                <span className="text-2xl font-myungjo">"</span>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`relative flex items-center transition-transform duration-500 ${board ? '-translate-x-1/2' : ''}`}>
          <img src={'전광판이미지.png'} alt="전광판 이미지" className="w-screen h-856px" />
          <video
            src={chrome.runtime.getURL('sample-video.mp4')} // 비디오 경로 설정
            className="absolute left-52  inset-0 ml-96  w-800px h-864px rounded-lg shadow-lg"
            controls
            autoPlay
            loop
            muted
          />
          <button
            className="text-black absolute right-10 flex items-center justify-center rounded-full bg-[#0000004b] w-10 h-10 text-xl"
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
