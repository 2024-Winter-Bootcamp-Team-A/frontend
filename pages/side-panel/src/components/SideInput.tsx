import { useState } from 'react';

interface SideInputProps {
  placeholder: string;
  isPassWord?: boolean;
  value: string;
  onChange: (value: string) => void; // 부모로 값을 전달하는 함수
}

const SideInput: React.FC<SideInputProps> = ({ placeholder, isPassWord, value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false); // 포커스 상태 관리

  return (
    <div>
      <input
        type={isPassWord ? 'password' : 'text'}
        id={id}
        name={name}
        className="text-black text-base font-normal font-dm-serif border rounded-3xl px-8 py-2 text-center border-black"
        placeholder={!isFocused ? placeholder : ''}

        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)} // 포커스 시 상태 변경
        onBlur={() => setIsFocused(false)} // 포커스 해제 시 상태 변경
      />
    </div>
  );
};

export default SideInput;
