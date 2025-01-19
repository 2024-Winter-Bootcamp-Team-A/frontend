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
      console.log('Sending login request...', { email, password });

      const response = await fetch('http://localhost:8000/swagger/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);

        chrome.storage.local.set({ token: data.token }, () => {
          console.log('Token saved to local storage.');
        });

        chrome.runtime.sendMessage({ action: 'userLogin', data: { token: data.token, email } }, response => {
          console.log('Message sent to new tab:', response);
        });

        navigate('/');
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData);

        // 로그인 실패 시 알람 띄우기
        alert('로그인 실패! 맞게 입력했는지 다시 한번 확인해주십시오');
      }
    } catch (err) {
      console.error('An unexpected error occurred:', err);

      // 예외 발생 시에도 알람 띄우기
      alert('로그인 실패! 맞게 입력했는지 다시 한번 확인해주십시오');
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
          <SideButton name="Login" path="/" />
        </div>

        <Link to={'/signup'}>
          <div className="text-[#ff5213] text-base font-normal font-dm-serif mt-4">Don't have an account?</div>
        </Link>
      </div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(SideLogin, <div>Loading ...</div>), <div>Error Occurred</div>);
