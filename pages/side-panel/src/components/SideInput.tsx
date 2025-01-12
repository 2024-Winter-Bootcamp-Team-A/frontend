import { useState } from 'react';
const SideInput = ({ placeholder, isPassWord }: { placeholder: string; isPassWord?: boolean }) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false); // 포커스 상태 관리
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  return (
    <div>
      <input
        type={isPassWord ? 'password' : 'text'}
        className="text-black text-base font-normal font-dm-serif border rounded-3xl px-8 py-2 text-center border-black"
        placeholder={!isFocused ? placeholder : ''}
        value={isPassWord ? inputValue.replace(/./g, '*') : inputValue}
        onChange={handleInputChange}
        onFocus={() => setIsFocused(true)} // 포커스 시 상태 변경
        onBlur={() => setIsFocused(false)} // 포커스 해제 시 상태 변경
      />
    </div>
  );
};

export default SideInput;
