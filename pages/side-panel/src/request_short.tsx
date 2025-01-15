import React from 'react';

const request_short: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-72 h-96 bg-gradient-to-b from-white to-gray-300 border border-gray-300 rounded-lg shadow-md overflow-hidden">
                <h1 className="text-orange-500 text-center text-xl mt-5 font-bold">Liverary</h1>
                <div className="bg-black text-white p-5 m-5 rounded-md text-center">
                    <p className="text-sm leading-relaxed">
                        아직 이 도서는 생성된 숏츠가 없습니다.<br />
                        당신의 요청 한마디로 쇼츠의 마법이 시작 될 거예요!
                    </p>
                </div>
                <div className="flex flex-col items-center mt-5">
                    <button className="bg-white text-black border border-gray-300 rounded-md px-4 py-2 mb-3 hover:bg-orange-500 hover:text-white transition-all">
                        영상 만들기
                    </button>
                    <button className="bg-white text-black border border-gray-300 rounded-md px-4 py-2 hover:bg-orange-500 hover:text-white transition-all">
                        다른 즐거리 구경하러 가기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default request_short;

