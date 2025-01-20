import { useStorage, withErrorBoundary, withSuspense } from '@extension/shared';
import { t } from '@extension/i18n';
import { useState, useEffect } from 'react';
import MainBookcase from './components/MainBookcase';
import MainBoard from './components/MainBoard';

const NewTab = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // chrome.runtime.onMessage를 통해 메시지 수신
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === 'newTabUserInfo' && message.data) {
        setUserInfo(message.data);
        console.log('User info received in new tab:', message.data);
        sendResponse({ status: 'success' });
      }
    });
  }, []);

  return (
    <div>
      <MainBoard />
      <div>
        <MainBookcase title="Top 10" direction="right" />
        <MainBookcase title="Trending Now" direction="left" />
        <MainBookcase title="Editor's Choice" direction="right" />
      </div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(NewTab, <div>{t('loading')}</div>), <div>Error Occur</div>);
