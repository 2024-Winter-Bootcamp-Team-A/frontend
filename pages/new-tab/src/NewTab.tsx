import { useStorage, withErrorBoundary, withSuspense } from '@extension/shared';
import { t } from '@extension/i18n';

import MainBookcase from './components/MainBookcase';
import MainFooter from './components/MainFooter';

const NewTab = () => {
  // 이미지 경로를 chrome.runtime.getURL로 생성
  return (
    <div>
      <div className="pt-40 bg-black h-1124px">
        {/* 경로를 동적으로 설정 */}
        <img src={'전광판이미지.png'} alt="전광판 이미지" className="w-screen h-856px" />
        <video
          src={chrome.runtime.getURL('sample-video.mp4')} // 비디오 경로 설정
          className="absolute left-52 top-[180px] inset-0 m-auto w-800px h-864px rounded-lg shadow-lg"
          controls
          autoPlay
          loop
          muted
        />
      </div>
      <div>
        <MainBookcase title="Top 10" direction="right" />
        <MainBookcase title="Trending Now" direction="left" />
        <MainBookcase title="Editor's Choice" direction="right" />
      </div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(NewTab, <div>{t('loading')}</div>), <div>Error Occur</div>);
