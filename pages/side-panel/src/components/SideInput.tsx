import React from 'react';

interface SideInputProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  id?: string;
  autoComplete?: string;
  isPassWord?: boolean;
}

const SideInput: React.FC<SideInputProps> = ({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  name,
  id,
  autoComplete,
  isPassWord = false,
}) => {
  return (
    <input
      type={isPassWord ? 'password' : type} // 비밀번호 입력 필드 지원
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      id={id}
      autoComplete={autoComplete}
      className="w-full p-2 border rounded"
    />
  );
};

export default SideInput;
