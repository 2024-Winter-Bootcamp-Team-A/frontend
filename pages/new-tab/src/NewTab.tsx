import { useStorage, withErrorBoundary, withSuspense } from '@extension/shared';
import { t } from '@extension/i18n';
import { useState, useEffect } from 'react';
import MainBookcase from './components/MainBookcase';
import MainBoard from './components/MainBoard';

const NewTab = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const handleMessage = (message, sender, sendResponse) => {
      console.log('Message received in NewTab:', message); // 메시지 내용 확인

      if (message.action === 'newTabUserInfo' && message.data) {
        setUserInfo(message.data); // 상태 업데이트
        console.log('User info updated in NewTab:', message.data);
        sendResponse({ status: 'success' });
      }
    };

    chrome.runtime.onMessage.addListener(handleMessage);

    // 컴포넌트 unmount 시 listener 제거
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  return (
    <div>
      <MainBoard />
      <div>
        <MainBookcase title="Top 10" direction="right" />
        <MainBookcase title="Trending Now" direction="left" />
        <MainBookcase title="Editor's Choice" direction="right" />
      </div>
      {/* 디버깅용 유저 정보 출력 */}
      {userInfo && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3>User Info</h3>
          <pre>{JSON.stringify(userInfo, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default withErrorBoundary(withSuspense(NewTab, <div>{t('loading')}</div>), <div>Error Occur</div>);
