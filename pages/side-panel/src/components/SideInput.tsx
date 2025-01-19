import { useState } from 'react';

interface SideInputProps {
  placeholder: string;
  isPassWord?: boolean;
  id?: string;
  name?: string;
  autoComplete?: string; // autocomplete 속성 추가
}

const SideInput = ({ placeholder, isPassWord, id, name, autoComplete }: SideInputProps) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
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
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoComplete={autoComplete} // autocomplete 속성 추가
      />
    </div>
  );
};

export default SideInput;
