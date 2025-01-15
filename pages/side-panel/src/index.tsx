import { createRoot } from 'react-dom/client';
import '@src/index.css';
import React, { useState } from 'react';
import SidePanel_short from './SidePanel_short';
//import comment from './comment';

function App() {
  const [currentView, setCurrentView] = useState<'panel' | 'comment'>('panel');

  const handleCloseComment = () => {
    setCurrentView('panel'); // 댓글 창 닫기
  };

  return (
    <>
      {currentView === 'panel' && (
        <SidePanel_short
          onCommentOpen={() => setCurrentView('comment')} // 댓글 열기 이벤트 전달
        />
      )}
      {currentView === 'comment' && <Comment onClose={handleCloseComment} />} {/* 댓글 창 닫기 이벤트 전달 */}
    </>
  );
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
