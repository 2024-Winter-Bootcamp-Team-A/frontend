import { createRoot } from 'react-dom/client';
import '@src/index.css';
import '@extension/ui/lib/global.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import MainNav from './components/MainNav';
import NewTab from '@src/NewTab';
import MainTodayShorts from './MainTodayShorts';
import MainFooter from './components/MainFooter';
import Stats from './components/Stats';

function init() {
  // 앱 컨테이너 선택
  const appContainer = document.querySelector('#app-container');
  if (!appContainer) {
    throw new Error('Can not find #app-container'); // 컨테이너가 없으면 에러 던지기
  }

  // ReactDOM 루트 생성
  const root = createRoot(appContainer);

  root.render(
    <Router>
      <div>
        <MainNav />
        <div className="">
          <Routes>
            {/* 기본 경로 */}
            <Route path="/" element={<NewTab />} />
            {/* 다른 경로 추가 */}
            <Route path="/recommend" element={<MainTodayShorts />} />
            <Route path="/stats" element={<Stats />} />
          </Routes>
        </div>
        <MainFooter />
      </div>
    </Router>,
  );
}

// 초기화 함수 호출
init();
