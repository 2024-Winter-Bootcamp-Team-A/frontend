import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const MainNav = () => {
  const [isScrolled, setIsScrolled] = useState(false); // 스크롤 여부 상태 관리
  const location = useLocation(); // 현재 경로 확인

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true); // 스크롤이 0보다 크면 상태 변경
    } else {
      setIsScrolled(false); // 스크롤이 맨 위로 올라가면 원래 상태로
    }
  };

  // 컴포넌트가 마운트될 때 스크롤 이벤트 리스너 추가
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll); // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 flex items-center justify-between font-dm-serif py-5 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}>
      {/* 로고 */}
      <Link to="/" className="text-5xl font-dm-serif text-[#ff5213] pl-16 mt-2">
        Liver
      </Link>

      {/* 네비게이션 메뉴 */}
      <div className="flex items-center space-x-24 mt-4">
        <NavLink to="/recommend" currentPath={location.pathname} label="TODAY's SHORTS" />
        <NavLink to="/stats" currentPath={location.pathname} label="STATS" />
        <NavLink to="/mypage" currentPath={location.pathname} label="MY PAGE" />
      </div>

      {/* 검색창 */}
      <MainInput />
    </nav>
  );
};

// 네비게이션 링크 컴포넌트
const NavLink = ({ to, currentPath, label }: { to: string; currentPath: string; label: string }) => {
  const isActive = currentPath === to; // 현재 경로와 일치 여부 확인
  return (
    <Link to={to} className={`text-xl font-dm-serif text-[#ff5213] relative ${isActive ? 'font-bold' : 'font-normal'}`}>
      {label}
      {isActive && (
        <span className="absolute bottom-[-5px] left-0 right-0 h-[2px] bg-[#ff5213]" style={{ width: '100%' }} />
      )}
    </Link>
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
    <div className="relative pr-24 mt-1">
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
