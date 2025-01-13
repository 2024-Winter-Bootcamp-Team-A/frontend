export default function MainFooter() {
  return (
    <div className="bg-gray-300 h-48 pl-10 pt-10 pb-10 flex justify-between items-center relative">
      <div className="text-black text-opacity-24">
        <span className="text-xl font-dm-serif text-[#ff5213]">Livarary</span>
        <br />
        @(주)라이브러리 | 대표자: 김보배 | 사업자번호: 202001590 사업자 정보 확인
        <br />
        통신판매업: 2021-대구성심당B-0062 | 개인정보보호책임자: 김보배 | 이메일: bobae@bobae.com
        <br />
        전화번호: 070-111-1111 | 주소: 경기도 성남시 분당구 판교로289번길 203동 5층
        <br />
        ©대 보 배. ALL RIGHTS RESERVED
      </div>

      {/* 중앙 텍스트를 위한 절대 위치 설정 */}
      <span className="absolute left-1/2 transform -translate-x-1/2 text-black text-opacity-24 mt-32">
        @designed by hyun seul jiwoo
      </span>

      <div className="flex h-10 mr-20 space-x-7">
        <img src="메세지.svg" alt="메세지" />
        <img src="블로그.svg" alt="블로그" />
        <img src="인스타.svg" alt="인스타" />
        <img src="노션.svg" alt="노션" />
        <img src="깃허브.svg" alt="깃허브" />
      </div>
    </div>
  );
}
