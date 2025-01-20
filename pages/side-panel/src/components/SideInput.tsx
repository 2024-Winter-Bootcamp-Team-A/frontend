import { useState } from 'react';

interface SideInputProps {
  placeholder: string;
  isPassWord?: boolean;
  value?: string; // 부모로부터 전달받은 값 (선택적으로 사용)
  onChange?: (value: string) => void; // 부모로 값을 전달하는 함수 (선택적으로 사용)
  id?: string;
  name?: string;
  autoComplete?: string; // autocomplete 속성 추가
}

const SideInput: React.FC<SideInputProps> = ({
  placeholder,
  isPassWord,
  value = '', // 초기값 설정
  onChange = () => {}, // 기본 빈 함수 설정
  id,
  name,
  autoComplete,
}) => {
  const [inputValue, setInputValue] = useState(value); // 로컬 상태 관리
  const [isFocused, setIsFocused] = useState(false); // 포커스 상태 관리

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue); // 부모로 값 전달
  };

  return (
    <div>
      <input
        type={isPassWord ? 'password' : 'text'}
        id={id}
        name={name}
        className="text-black text-base font-normal font-dm-serif border rounded-3xl px-8 py-2 text-center border-black"
        placeholder={!isFocused ? placeholder : ''}
        value={isPassWord ? inputValue.replace(/./g, '*') : inputValue}
        onChange={handleInputChange}
        onFocus={() => setIsFocused(true)} // 포커스 시 상태 변경
        onBlur={() => setIsFocused(false)} // 포커스 해제 시 상태 변경
        autoComplete={autoComplete} // autocomplete 속성 추가
      />
    </div>
  );
};

export default SideInput;
