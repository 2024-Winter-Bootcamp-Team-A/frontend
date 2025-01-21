import '@src/SidePanel.css';
import { useStorage, withErrorBoundary, withSuspense } from '@extension/shared';
import SideInput from './components/SideInput';
import SideButton from './components/SideButton';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SideNav from './components/SideNav';

const SideLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // 전송 데이터 출력
      const loginData = { email, password };
      console.log('전송 데이터:', loginData);

      // 로그인 요청 전송
      const response = await fetch('http://localhost:8000/api/v1/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);

        const userInfo = {
          email: loginData.email, // 이메일 정보 포함
          name: data.name || 'Unknown', // 서버 응답에 name 포함
          id: data.id || 'Unknown', // 서버 응답에 id 포함
        };

        chrome.storage.local.set({ token: data.token }, () => {
          console.log('Token saved to local storage.');

          // 메시지 전송
          chrome.runtime.sendMessage(
            { action: 'newTabUserInfo', data: userInfo }, // action과 data 포함
            response => {
              if (chrome.runtime.lastError) {
                console.error('Runtime error:', chrome.runtime.lastError.message);
              } else {
                console.log('Message sent successfully to NewTab:', response);
              }
            },
          );

          navigate('/'); // 상태 저장 후 메인 페이지로 이동
        });
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData);

        // 로그인 실패 시 알림 표시
        alert('로그인 실패! 맞게 입력했는지 다시 한번 확인해주십시오');
      }
    } catch (err) {
      console.error('An unexpected error occurred:', err);

      // 예외 발생 시 알림 표시
      alert('로그인 실패! 잠시 후 다시 시도해 주십시오');
    }
  };

  return (
    <div>
      <Link to="/">
        <SideNav />
      </Link>
      <div className="w-full h-full flex flex-col items-center bg-white overflow-hidden p-20 space-y-12 mt-16">
        <div className="text-[#ff5213] text-2xl font-normal font-dm-serif mb-2">Welcome back</div>

        <div className="text-[#ff5213] text-xl font-normal font-dm-serif mb-2">Email</div>
        <SideInput
          placeholder="abcdefgh@gmail.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          name="email"
          id="email"
          autoComplete="email" // 자동완성 속성 추가
        />

        <SideInput
          placeholder="********"
          isPassWord={true}
          value={password}
          onChange={e => setPassword(e.target.value)}
          name="password"
          id="password"
          autoComplete="current-password" // 자동완성 속성 추가
        />

        {/* 로그인 버튼 */}
        <div>
          <button onClick={handleLogin} className="bg-[#ff5213] text-white py-2 px-4 rounded hover:bg-[#e64512]">
            Login
          </button>
        </div>

        {/* 회원가입 버튼 */}
        <div>
          <Link to="/signup">
            <div className="text-[#ff5213] text-base font-normal font-dm-serif mt-4 hover:underline">
              Don't have an account? Sign up here.
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(SideLogin, <div>Loading ...</div>), <div>Error Occurred</div>);
