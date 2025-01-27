import '@src/SidePanel.css';
import { useStorage, withErrorBoundary, withSuspense } from '@extension/shared';
import SideButton from './components/SideButton';
import SideNav from './components/SideNav';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

type BestShort = {
  title: string;
  author: string;
  point: string;
  image: string;
  storage_url: string;
};
const SidePanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); // 초기값을 null로 설정하여 로딩 상태를 나타냄
  const [bestShorts, setBestShorts] = useState<BestShort | null>(null); // 베스트 숏츠 데이터를 저장
  const navigate = useNavigate(); // useNavigate 훅 사용

  // 로그인 상태 확인
  useEffect(() => {
    const checkLoginStatus = async () => {
      chrome.storage.local.get(['token'], result => {
        console.log('Token from storage:', result.token); // 디버깅 로그
        if (result.token) {
          setIsLoggedIn(true); // 토큰이 있으면 로그인 상태로 설정
        } else {
          setIsLoggedIn(false); // 토큰이 없으면 로그아웃 상태로 설정
        }
      });
    };
    checkLoginStatus();
  }, []);
  //베스트 숏츠 불러오는ㄴ api임
  useEffect(() => {
    const fetchBestShorts = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/shorts/best', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json(); // JSON 응답 파싱
        setBestShorts(data); // 응답 데이터를 상태에 저장
      } catch (error) {
        console.error('Failed to fetch best shorts:', error);
      }
    };

    fetchBestShorts();
  }, []);

  // 로그인 처리 함수
  const handleLogin = async () => {
    try {
      await chrome.storage.local.set({ token: 'your-token' });
      setIsLoggedIn(true); // 토큰 저장 후 로그인 상태로 업데이트
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  // 로그아웃 처리 함수
  const handleLogout = async () => {
    try {
      await chrome.storage.local.remove('token'); // 토큰 삭제
      setIsLoggedIn(false); // 로그아웃 상태로 업데이트
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // 쇼츠 재생 페이지로 이동 처리 함수
  const handleShortPageNavigation = () => {
    navigate('/sidepanel_short'); // React Router를 사용한 경로 이동
  };

  // 로딩 중 UI
  if (isLoggedIn === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button
        onClick={() => {
          chrome.tabs.create({});
        }}>
        <SideNav />
      </button>
      <div className="flex:1 h-full overflow-y-auto w-full bg-white overflow-hidden mt-7 ">
        {/* 비디오 관련 섹션 */}
        {/* <div className="bg-gradient-to-t from-black via-black to-black opacity-60 mix-blend-darken" /> */}
        {/* 비디오 배경 */}
        <div className="w-[320px] h-[620px] bg-gradient-to-b from-[rgba(0,0,0,0.2)] via-[rgba(204,204,204,0.5)] to-black ml-3 mt-2  pt-2 absolute top-[100px] z-20 bg-opacity-0" />
        <video src={bestShorts?.storage_url} controls className="w-[320px] h-[640px] z-10 bg-black ml-3"></video>

        <div className="w-[324px] h-[171px] absolute top-28 pl-5">
          <span className="font-['AppleSDGothicNeoEB00'] text-3xl font-normal text-white">
            어떤 책을 읽을까
            <br />
          </span>
          <span className="font-['AppleSDGothicNeoEB00'] text-3xl font-normal text-[#FF5111]">고민</span>
          <span className="font-['AppleSDGothicNeoEB00'] text-3xl font-normal text-white">
            하셨나요?
            <br />
            그러지말고,
            <br />
          </span>
          <span className="font-['AppleSDGothicNeoEB00'] text-3xl font-normal text-[#FF5313]">쇼츠</span>
          <span className="font-['AppleSDGothicNeoEB00'] text-3xl font-normal text-white">
            로 즐겨보세요!
            <br />
          </span>
        </div>

        {/* 조건부 렌더링: 로그인 상태에 따라 버튼 표시 */}
        {isLoggedIn ? (
          // 로그인 상태: "쇼츠 페이지 이동" 버튼과 "로그아웃" 버튼 표시
          <div>
            <button
              className="w-40 h-12 mt-16 ml-24 bg-[#FF5213] rounded-2xl flex items-center justify-center shadow-md hover:bg-[#FF3F0E] transition duration-200"
              onClick={handleShortPageNavigation} // 쇼츠 페이지로 이동
            >
              <SideButton name="쇼츠 페이지 이동" path="/sidepanel_short" />
            </button>
            <button
              className="w-40 h-12 mt-4 ml-24 bg-[#FF5213] rounded-2xl flex items-center justify-center shadow-md hover:bg-[#FF3F0E] transition duration-200"
              onClick={handleLogout} // 로그아웃 처리
            >
              <SideButton name="로그아웃" />
            </button>
          </div>
        ) : (
          // 로그아웃 상태: "Login / Sign up" 버튼 표시
          <button
            className="w-40 h-12 mt-16 ml-24 bg-[#FF5213] rounded-2xl flex items-center justify-center shadow-md hover:bg-[#FF3F0E] transition duration-200"
            onClick={handleLogin} // 로그인 처리
          >
            <SideButton name="Login / Sign up" path="/login" />
          </button>
        )}
      </div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(SidePanel, <div>Loading...</div>), <div>Error Occur</div>);
