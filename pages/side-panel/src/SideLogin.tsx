import '@src/SidePanel.css';
import { useStorage, withErrorBoundary, withSuspense } from '@extension/shared';
import SideInput from './components/SideInput';
import SideButton from './components/SideButton';
import { Link } from 'react-router-dom';

const SideLogin = () => {
  return (
    <div className="w-full h-full flex flex-col items-center bg-white overflow-hidden p-20 space-y-8">
      <div className="text-[#ff5213] text-2xl font-normal font-dm-serif mb-2">Welcome back</div>

      <div className="text-[#ff5213] text-xl font-normal font-dm-serif mb-2">Email</div>
      <SideInput placeholder="abcdefgh@gmail." />

      <div className="text-[#ff5213] text-xl font-normal font-dm-serif mb-2">Password</div>
      <SideInput placeholder="********" isPassWord={true} />

      <SideButton name="Login" />
      <Link to={'/signup'}>
        <div className="text-[#ff5213] text-base font-normal font-dm-serif mt-4 ">Don't have an account?</div>
      </Link>
    </div>
  );
};

export default withErrorBoundary(withSuspense(SideLogin, <div>Loading ...</div>), <div>Error Occurred</div>);
