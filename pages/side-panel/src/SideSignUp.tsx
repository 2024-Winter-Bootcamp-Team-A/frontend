import React, { useState } from 'react';
import { signUp } from './api/SignUp'; // API 함수 가져오기
import '@src/SidePanel.css';
import { useStorage, withErrorBoundary, withSuspense } from '@extension/shared';
import type { SignUpData } from './api/SignUp';
import SideInput from './components/SideInput';
import { Link, useNavigate } from 'react-router-dom';
import SideNav from './components/SideNav';

const SideSignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sex, setSex] = useState('');
  const [age, setAge] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // 페이지 이동용

  const handleSignUp = async () => {
    const userData: SignUpData = {
      name,
      email,
      password,
      sex,
      age: Number(age), // 숫자로 변환
    };
    console.log('전송 데이터:', userData);
    try {
      const result = await signUp(userData);
      console.log('회원가입 성공:', result);
      navigate('/login'); // 회원가입 성공 후 로그인 페이지로 이동
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      <Link to="/">
        <SideNav />
      </Link>
      <div className="mt-8">
        <div className="w-full h-full flex flex-col content-around items-center bg-white overflow-hidden p-8 space-y-10">
          <div className="text-[#ff5213] text-xl font-normal font-dm-serif">Name</div>
          <SideInput placeholder="홍길동" value={name} onChange={setName} />

          <div className="text-[#ff5213] text-xl font-normal font-dm-serif">Email</div>
          <SideInput placeholder="abcdefgh@gmail.com" value={email} onChange={setEmail} />

          <div className="text-[#ff5213] text-xl font-normal font-dm-serif">Password</div>
          <SideInput placeholder="********" isPassWord value={password} onChange={setPassword} />

          <div className="text-center text-[#ff5213] text-xl font-normal font-dm-serif">Sex</div>
          <SideInput placeholder="male" value={sex} onChange={setSex} />

          <div className="text-center text-[#ff5213] text-xl font-normal font-dm-serif">Age</div>
          <SideInput placeholder="22" value={age} onChange={setAge} />
        </div>
        <div className="ml-32 mt-10">
          <button className="bg-[#ff5213] rounded-3xl py-2 px-5 whitespace-nowrap" onClick={handleSignUp}>
            <span className="text-white text-xl font-normal font-dm-serif">Sign Up</span>
          </button>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <Link to="/sidepanel_short">목업쇼츠보기</Link>
        </div>
      </div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(SideSignUp, <div> Loading ... </div>), <div> Error Occur </div>);
