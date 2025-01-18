import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import '@src/index.css';
import SidePanelShort from './SidePanel_short';
import Comment from './comment';

function App() {
  const [currentView, setCurrentView] = useState('panel'); // 'panel' or 'Comment'

  const handleOpenComment = () => {
    setCurrentView('Comment');
    console.log('comment open');
  };

  const handleCloseComment = () => {
    setCurrentView('panel');
  };

  return (
    <>
      {currentView === 'panel' && (
        <div>
          <SidePanelShort onCommentOpen={handleOpenComment} />
        </div>
      )}
      {currentView === 'Comment' && <Comment onClose={handleCloseComment} />}
    </>
  );
}

function init() {
  const appContainer = document.querySelector('#app-container');
  if (!appContainer) {
    throw new Error('Cannot find #app-container');
  }

  const root = createRoot(appContainer);
  root.render(<App />);
}

init();
