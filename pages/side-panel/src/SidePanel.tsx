import '@src/SidePanel.css';
import { useStorage, withErrorBoundary, withSuspense } from '@extension/shared';
import SideButton from './components/SideButton';

const SidePanel = () => {
  return (
    <div className="flex-1 h-full overflow-y-auto w-full bg-white overflow-hidden">
      {/*vieo 들어가는 부분 */}
      <div className="bg-gradient-to-t from-black via-black to-black opacity-60 mix-blend-darken" />
      {/* video 들어가는 부분 */}
      <div className="w-[320px] h-[500px]  bg-gradient-to-b from-[#999999] via-[#cccccc] to-white ml-5 mt-2 pl-3 pt-2">
        <div className=" w-[324px] h-[171px]">
          <span className="font-['AppleSDGothicNeoEB00'] text-3xl font-normal text-white">
            어떤 책을 읽을까
            <br />
          </span>
          <span className="font-['AppleSDGothicNeoEB00'] text-3xl font-normal text-[#ff5111]">고민</span>
          <span className="font-['AppleSDGothicNeoEB00'] text-3xl font-normal text-white">
            하셨나요?
            <br />
            그러지말고,
            <br />
          </span>
          <span className="font-['AppleSDGothicNeoEB00'] text-3xl font-normal text-[#ff5313]">쇼츠</span>
          <span className="font-['AppleSDGothicNeoEB00'] text-3xl font-normal text-white">
            로 즐겨보세요!
            <br />
          </span>
        </div>
      </div>

      <button className="w-40 h-12 left-[100px] top-[600px] absolute bg-[#ff5213] rounded-2xl flex items-center justify-center shadow-md hover:bg-[#ff3f0e] transition duration-200">
        <SideButton name="Login / Sign up" path="/login" />
      </button>
    </div>
  );
};
export default withErrorBoundary(withSuspense(SidePanel, <div> Loading ... </div>), <div> Error Occur </div>);
