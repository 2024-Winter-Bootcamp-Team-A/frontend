import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

const MainNav = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 flex items-center justify-between font-dm-serif text-[#ff5213] bg-opacity-100 mt-0 mb-2 pt-12 z-50">
      {' '}
      {/* 고정된 내비게이션 바 */}
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
  const navigate = useNavigate(); // 엔터 키 입력 시 페이지 이동을 위한 네비게이트 함수

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      navigate(`/Search?query=${encodeURIComponent(inputValue)}`); // 엔터 입력 시 검색 페이지로 이동
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
      <Link
        to={`/Search?query=${encodeURIComponent(inputValue)}`}
        className="absolute left-3 top-7 transform -translate-y-1/2 text-[#ff5213] text-lg">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </Link>
    </div>
  );
};

export default MainNav;
