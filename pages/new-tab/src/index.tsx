import { createRoot } from 'react-dom/client';
import '@src/index.css';
import '@extension/ui/lib/global.css';
import { BrowserRouter as Router, BrowserRouter } from 'react-router-dom';
import MainNav from './components/MainNav';
import NewTab from '@src/NewTab';

function init() {
  // 앱 컨테이너 선택
  const appContainer = document.querySelector('#app-container');
  if (!appContainer) {
    throw new Error('Can not find #app-container'); // 컨테이너가 없으면 에러 던지기
  }

  // ReactDOM 루트 생성
  const root = createRoot(appContainer);

  root.render(
    <BrowserRouter>
      <div>
        <MainNav />
        <div className="">
          {' '}
          {/* 내비게이션과 콘텐츠 간의 간격 조정 */}
          <NewTab />
        </div>
      </div>
    </BrowserRouter>,
  );
}

// 초기화 함수 호출
init();
