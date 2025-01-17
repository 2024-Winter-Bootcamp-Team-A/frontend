import { useStorage, withErrorBoundary, withSuspense } from '@extension/shared';
import { t } from '@extension/i18n';
import { useState } from 'react';
import MainBookcase from './components/MainBookcase';
import MainBoard from './components/MainBoard';

const NewTab = () => {
  // 이미지 경로를 chrome.runtime.getURL로 생성
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
