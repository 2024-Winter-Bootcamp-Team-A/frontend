import '@src/SidePanel.css';
import { useStorage, withErrorBoundary, withSuspense } from '@extension/shared';
import SideInput from './components/SideInput';
import SideButton from './components/SideButton';
import { Link } from 'react-router-dom';
import SideNav from './components/SideNav';

const SideSignUp = () => {
  return (
    <div>
      <Link to="/">
        <SideNav />
      </Link>
      <div className="mt-16">
        <div className="w-full h-full flex flex-col content-around items-center mt-5 bg-white  overflow-hidden p-8 space-y-10">
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
        </div>
        <div className="ml-32 mt-10">
          <SideButton name="Sign up" path="/login" />
          <Link to={'/sidepanel_short'}>목업쇼츠보기</Link>
        </div>
      </div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(SideSignUp, <div> Loading ... </div>), <div> Error Occur </div>);
