import { useNavigate } from 'react-router-dom';

interface SideButtonProps {
  name: string; // 버튼 텍스트
  path: string; // 이동 경로
}

const SideButton: React.FC<SideButtonProps> = ({ name, path }: SideButtonProps) => {
  const navigate = useNavigate();
  const ButtonClick = () => {
    navigate(path);
  };
  return (
    <button
      className="bg-[#ff5213] rounded-3xl py-2 px-5 whitespace-nowrap text-white text-xl font-normal font-dm-serif"
      onClick={ButtonClick}>
      {name}
    </button>
  );
};

export default SideButton;
