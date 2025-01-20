import '@src/SidePanel.css';
import { useStorage, withErrorBoundary, withSuspense } from '@extension/shared';
import SideButton from './components/SideButton';
import SideNav from './components/SideNav';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
const SidePanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // 초기값을 null로 설정하여 로딩 상태를 나타냄
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
  // 로그인 처리 함수
  const handleLogin = async () => {
    try {
      // 임시 토큰 저장 (실제로는 로그인 API를 호출하여 토큰을 받아와야 함)
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
  // 로딩 중 UI
  if (isLoggedIn === null) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Link to="/">
        <SideNav />
      </Link>
      <div className="flex:1 h-full overflow-y-auto w-full bg-white overflow-hidden mt-7 ">
        {/* 비디오 관련 섹션 */}
        <div className="bg-gradient-to-t from-black via-black to-black opacity-60 mix-blend-darken" />
        {/* 비디오 배경 */}
        <div className="w-[320px] h-[640px] bg-gradient-to-b  from-[#999999] via-[#CCCCCC] to-white ml-5 mt-2 pl-3 pt-2">
          <div className="w-[324px] h-[171px]">
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
        </div>
        {/* 조건부 렌더링: 로그인 상태에 따라 버튼 표시 */}
        {isLoggedIn ? (
          // 로그인 상태: "뉴탭 이동" 버튼과 "로그아웃" 버튼 표시
          <div>
            <button
              className="w-40 h-12 mt-16 ml-24 bg-[#FF5213] rounded-2xl flex items-center justify-center shadow-md hover:bg-[#FF3F0E] transition duration-200"
              onClick={() => (window.location.href = '/new-tab')} // 뉴탭으로 이동
            >
              <SideButton name="뉴탭 이동" path="/new-tab" />
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
export default withErrorBoundary(withSuspense(SidePanel, <div> Loading ... </div>), <div> Error Occur </div>);
