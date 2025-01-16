import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

const MainNav = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 flex items-center justify-between font-dm-serif text-[#ff5213] bg-opacity-100 mt-0 mb-2 pt-12 z-50">
      <Link to="/" className="text-5xl font-dm-serif text-[#ff5213] pl-16">
        Liver
      </Link>
      <div className="flex items-center space-x-24">
        <Link to="/recommend" className="text-xl font-dm-serif text-[#ff5213]">
          TODAY's SHORTS
        </Link>
        <Link to="/stats" className="text-xl font-dm-serif text-[#ff5213]">
          STATS
        </Link>
        <Link to="/mypage" className="text-xl font-dm-serif text-[#ff5213]">
          MY PAGE
        </Link>
      </div>
      <MainInput />
    </nav>
  );
};

const MainInput = () => {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅

  // 입력 값 변경 시 상태 업데이트
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // 검색 동작을 하나의 함수로 통합
  const handleSearch = () => {
    if (inputValue.trim()) {
      navigate(`/Search?query=${encodeURIComponent(inputValue)}`); // URL에 쿼리스트링 추가 후 이동
    }
  };

  // Enter 키 입력 시 검색 동작 수행
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(); // Enter 키와 버튼 클릭 모두 handleSearch 함수 호출
    }
  };

  return (
    <div className="relative pr-24">
      <input
        type="text"
        className="text-black text-base font-normal font-dm-serif border rounded-3xl px-12 py-2 mt-2 bg-[#FCE8E1] w-96"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown} // Enter 키 입력 이벤트 추가
      />
      <button
        onClick={handleSearch} // 돋보기 버튼 클릭 시 검색 실행
        className="absolute left-3 top-7 transform -translate-y-1/2 text-[#ff5213] text-lg">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </div>
  );
};

export default MainNav;
