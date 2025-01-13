import React from 'react';

interface FAQModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FAQItem {
  question: string;
  answer: string;
}

const FAQModal: React.FC<FAQModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const faqList: FAQItem[] = [
    { question: '어떻게 이용하면 될까요?', answer: '서비스 사용 방법에 대한 자세한 설명입니다.' },
    { question: '더 많은 소스를 보려면 어떻게 할까요?', answer: '많은 데이터를 얻기 위한 팁과 방법입니다.' },
    { question: 'Trending Now란?', answer: '현재 인기 있는 트렌드에 대한 설명입니다.' },
    { question: '제 컴퓨터에서 작동이 되지 않아요.', answer: '해결 방법을 위한 지원 페이지 링크가 포함됩니다.' },
    { question: '어떻게 만들었나요?', answer: '서비스의 개발 프로세스에 대한 설명입니다.' },
    { question: '누가 만들었나요?', answer: '개발자와 회사 소개 정보가 포함되어 있습니다.' },
  ];

  const renderFAQItem = (item: FAQItem, index: number) => (
    <details key={index} className="border-b border-gray-300 py-4">
      {' '}
      {/* 질문과 질문 사이 간격 추가 */}
      <summary className="flex justify-between items-center cursor-pointer text-[16px] text-black">
        <div className="flex items-center gap-4">
          {' '}
          {/* 동그라미(Q)와 질문 사이 간격 조정 */}
          <div className="ml-4 w-[30px] h-[30px] bg-[#FF6347] rounded-full flex justify-center items-center">
            <span className="text-white text-[20px] font-bold ">Q</span>
          </div>
          <span>{item.question}</span>
        </div>
        <span className="text-gray-400 group-open:rotate-180 transition-transform mr-4">▼</span>
      </summary>
      <p className="pl-12 text-[16px] text-black mt-1">{item.answer}</p>
    </details>
  );

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
      onClick={onClose}>
      <div
        className="bg-white w-[654px] h-[537px] p-5 rounded-lg shadow-lg relative"
        onClick={e => e.stopPropagation()}>
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-4">
          <button className="text-[24px] text-black bg-none border-none cursor-pointer" onClick={onClose}>
            ◀
          </button>
          <h2 className="text-[24px] text-black font-bold text-center">질문 검색</h2>
          <button className="text-[24px] text-black bg-none border-none cursor-pointer" onClick={onClose}>
            ✖
          </button>
        </div>

        {/* 검색창 섹션 */}
        <div className="flex justify-center items-center gap-2 mb-4">
          <input
            type="text"
            className="w-[404px] h-8 rounded-full bg-[#FCE8E1] border-none px-4 text-[16px] placeholder-gray-500 text-black"
            placeholder="질문을 검색해 보세요"
          />
          <button className="w-[68px] h-8 bg-[#FF6347] text-white rounded-full text-[16px] flex justify-center items-center cursor-pointer">
            검색
          </button>
        </div>

        {/* 고정된 제목과 구분선 */}
        <div className="sticky top-0 bg-white z-10">
          <h3 className="text-[20px] text-black font-semibold text-left pl-4">많이 묻는 질문들</h3>
          <hr className="border-gray-300 border-2 my-2 mx-1" />
        </div>

        {/* 스크롤 가능한 FAQ 리스트 */}
        <div className="overflow-y-auto max-h-[350px] scrollbar-hide">{faqList.map(renderFAQItem)}</div>
      </div>
    </div>
  );
};

export default FAQModal;
