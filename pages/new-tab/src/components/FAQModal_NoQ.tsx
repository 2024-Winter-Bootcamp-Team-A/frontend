import React, { useState } from 'react';

interface FAQModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FAQModal: React.FC<FAQModalProps> = ({ isOpen, onClose }) => {
  const [showInquiry, setShowInquiry] = useState(false); // true면 "문의하기", false면 "질문 검색"

  if (!isOpen) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
      onClick={onClose}>
      <div
        className="bg-white w-[654px] h-[537px] p-8 rounded-lg shadow-lg relative"
        onClick={e => e.stopPropagation()}>
        {/* 모달 헤더 */}
        <div className="flex justify-between items-center mb-6">
          <button
            className="text-[24px] font-semibold text-black cursor-pointer"
            onClick={() => {
              if (showInquiry)
                setShowInquiry(false); // "문의하기" 화면일 경우 "질문 검색" 화면으로 돌아감
              else onClose(); // "질문 검색" 화면일 경우 모달 닫기
            }}>
            ◀
          </button>
          <h2 className="text-[24px] text-black font-bold">{showInquiry ? '문의하기' : '질문 검색'}</h2>
          <button className="text-[24px] text-black cursor-pointer" onClick={onClose}>
            ✖
          </button>
        </div>

        {/* 화면 전환 */}
        {!showInquiry ? (
          <>
            {/* 질문 검색 화면 */}
            <div className="flex justify-center items-center gap-2 mb-6">
              <input
                type="text"
                className="w-[404px] h-8 rounded-full bg-[#FCE8E1] px-4 text-[16px] text-black placeholder-gray-500"
                placeholder="질문을 검색해 보세요"
              />
              <button className="w-[68px] h-8 bg-[#FF6347] text-white rounded-full text-[16px] flex justify-center items-center cursor-pointer">
                검색
              </button>
            </div>

            <h3 className="text-[20px] text-black font-semibold pl-4">검색 결과</h3>
            <hr className="border-gray-300 border-2 my-2 mx-1" />
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-4">
                <span className="text-[32px] font-bold text-gray-500">!</span>
              </div>
              <p className="text-[16px] font-semibold text-gray-500">
                <span className="text-[#FF6347] font-bold">"검색어"</span>와 일치하는 내용이 없습니다.
              </p>
              <p className="text-gray-500 mt-2">이런 검색어는 어떠신가요?</p>

              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {['검색어1', '검색어2', '검색어3', '검색어4'].map((word, index) => (
                  <button
                    key={index}
                    className="bg-[#FCE8E1] text-[#FF6347] px-4 py-2 rounded-full text-[14px] cursor-pointer">
                    {word}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-4">
              <button
                className="bg-[#FF6347] text-white px-4 py-2 rounded-full text-[16px] cursor-pointer"
                onClick={() => setShowInquiry(true)} // "문의하기" 화면으로 전환
              >
                문의하기
              </button>
            </div>
          </>
        ) : (
          <>
            {/* 문의하기 화면 */}
            <div className="space-y-6 mt-6">
              <div className="flex items-center">
                <label className="w-[60px] pl-2 text-[16px] text-black font-semibold">제목</label>
                <input
                  type="text"
                  className="flex-grow h-12 rounded-full bg-[#FCE8E1] px-4 text-[16px] text-black border-none outline-none"
                  placeholder="제목을 입력해 주세요"
                />
              </div>

              <div className="flex items-start">
                <label className="w-[60px] pl-2 text-[16px] text-black font-semibold mt-2">내용</label>
                <textarea
                  className="flex-grow h-[280px] rounded-2xl bg-[#FCE8E1] px-4 py-2 text-[16px] text-black border-none outline-none resize-none"
                  placeholder="내용을 입력해 주세요"
                />
              </div>
            </div>

            <div className="flex justify-center mt-4">
              <button
                className="bg-[#FF6347] text-white px-4 py-2 rounded-full text-[16px] cursor-pointer"
                onClick={onClose}>
                문의하기
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FAQModal;
