import { useNavigate } from 'react-router-dom';

interface SideButtonProps {
  name: string; // name은 문자열 타입
  path: string;
}

const SideButton: React.FC<SideButtonProps> = ({ name, path }: SideButtonProps) => {
  const nav = useNavigate();
  const ButtonClick = () => {
    nav(path);
  };
  return (
    <div>
      <button className="bg-[#ff5213] rounded-3xl py-2 px-5 whitespace-nowrap" onClick={ButtonClick}>
        {' '}
        {/* whitespace-nowrap 추가 */}
        <span className="text-white text-xl font-normal font-dm-serif">{name}</span>
      </button>
    </div>
  );
};

export default SideButton;
