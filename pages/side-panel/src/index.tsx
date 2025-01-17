import { createRoot } from 'react-dom/client';
import '@src/index.css';
import React, { useState } from 'react';
import SidePanelShort from './SidePanel_short';
import Comment from './comment';

function App() {
  const [currentView, setCurrentView] = useState<'panel' | 'Comment'>('panel');

  const handleCloseComment = () => {
    setCurrentView('panel'); // 댓글 창 닫기
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
