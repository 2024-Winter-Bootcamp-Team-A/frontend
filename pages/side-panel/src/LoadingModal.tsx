import React from 'react';

interface LoadingModalProps {
  isOpen: boolean;
}

const LoadingModal: React.FC<LoadingModalProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-100 flex justify-center items-center z-50">
      <img src="loading.gif" alt="loading" className="w-32 h-32" />
      <p className="text-lg font-bold text-center text-white absolute mt-36">
        당신만을 위한 쇼츠를 제작중입니다
        <br />
        잠시만 기다려 주세요
      </p>
    </div>
  );
};

export default LoadingModal;
