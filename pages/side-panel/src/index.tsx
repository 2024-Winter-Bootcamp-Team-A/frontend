import { createRoot } from 'react-dom/client';
import '@src/index.css';
import React from 'react';
// import SidePanelShort from './SidePanel_short'; // 주석 처리: 필요 시 다시 활성화
// import Comment from './comment'; // 주석 처리: 필요 시 다시 활성화
import RequestShort from './request_short'; // 새로운 파일 import

function App() {
  // 기존 코드 주석 처리: 현재는 RequestShort만 렌더링
  const [currentView, setCurrentView] = useState<'panel' | 'Comment'>('panel');


  const handleOpenComment = () => {
    setCurrentView(false); // 댓글 창 열기
  };
  const handleCloseComment = () => {
    setCurrentView(true); // 댓글 창 닫기
  };

  return (
    <>
      {currentView === 'panel' && (
        <div>
          <SidePanelShort
            onCommentOpen={() => {
              setCurrentView('Comment');
              console.log('comment open');
            }}
          />
        </div>
      )}
      {currentView === 'Comment' && <Comment onClose={handleCloseComment} />}
    </>
  );
  */

  // RequestShort 파일만 렌더링
  return <RequestShort />;
}

function init() {
  const appContainer = document.querySelector('#app-container');
  if (!appContainer) {
    throw new Error('Can not find #app-container');
  }
  const root = createRoot(appContainer);
  root.render(<App />);
}

init();
