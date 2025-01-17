import React from 'react';

interface SidePanelShortProps {
  onCommentOpen: () => void; // 댓글 열기 이벤트
}

const SidePanelShort: React.FC<SidePanelShortProps> = ({ onCommentOpen }) => {
  return (
    <div className="h-screen w-full bg-black text-white flex flex-col p-6">
      {/* 상단 헤더 */}
      <h1 className="text-2xl font-bold text-orange-500 mb-6 text-left">Liverary</h1>

      {/* 동영상 영역 */}
      <div className="flex justify-center items-center flex-grow relative">
        <div className="w-[330px] h-[550px] rounded-lg overflow-hidden relative">
          <video className="w-full h-full object-cover" controls src="/final_clip(1).mp4">
            Your browser does not support the video tag.
          </video>

          {/* 텍스트 - 동영상 위 */}
          <p className="absolute bottom-16 left-4 text-sm text-gray-300 text-left whitespace-nowrap">
            한 줄, 세계에서 이 계절이 시작된다 🎈
          </p>

          {/* 하트 및 공유 버튼 - 동영상 위 */}
          <div className="absolute bottom-[100px] right-4 flex flex-col items-center space-y-4">
            {/* 하트 버튼 */}
            <img src="/wish.svg" className="w-8 h-8 cursor-pointer" />
            {/* 공유 버튼 */}
            <img src="/share.svg" className="w-8 h-8 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* 댓글 작성 버튼 */}
      <div className="text-center mb-8">
        <button
          className="text-blue-500 text-2xl"
          onClick={onCommentOpen} // 상위 컴포넌트에서 전달된 prop 호출
        >
          댓글 작성
        </button>
      </div>
    </div>
  );
};

export default SidePanelShort;
