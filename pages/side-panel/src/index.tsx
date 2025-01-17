import { createRoot } from 'react-dom/client';
import '@src/index.css';
import React, { useState } from 'react';
import SidePanel_short from './SidePanel_short';
import Comment from './comment';

function App() {
  const [currentView, setCurrentView] = useState(false); //true : 댓글 창 닫기 , false : 댓글 창 열기

  const handleOpenComment = () => {
    setCurrentView(false); // 댓글 창 열기
  };
  const handleCloseComment = () => {
    setCurrentView(true); // 댓글 창 닫기
  };

  return (
    <>
      <SidePanel_short onCommentOpen={currentView} />
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
