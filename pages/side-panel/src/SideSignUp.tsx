import '@src/SidePanel.css';
import { useStorage, withErrorBoundary, withSuspense } from '@extension/shared';
import SideInput from './components/SideInput';
import SideButton from './components/SideButton';

const SideSignUp = () => {
  return (
    <div className="w-full h-full flex flex-col content-around items-center  bg-white  overflow-hidden p-8 space-y-6">
      <div className=" text-[#ff5213] text-xl font-normal font-dm-serif">Email</div>
      <div className="">
        <SideInput placeholder="abcdefgh@gmail." />
      </div>
      <div className="text-[#ff5213] text-xl font-normal font-dm-serif">password</div>
      <SideInput placeholder="********" />

      <div className="text-center text-[#ff5213] text-xl font-normal font-dm-serif">sex</div>
      <SideInput placeholder="male" />
      <div className="text-center text-[#ff5213] text-xl font-normal font-dm-serif">Age</div>

      <SideInput placeholder="22" />
      <SideButton name="Sign up" path="/login" />
    </div>
  );
};

export default withErrorBoundary(withSuspense(SideSignUp, <div> Loading ... </div>), <div> Error Occur </div>);
